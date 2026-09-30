import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getSupabaseAdmin } from "../supabase.server";
import { loadServerEnv } from "../config.server";

// ─── In-memory OTP store (with attempts counter for brute-force protection) ───
const otpStore = new Map<
  string,
  { code: string; name: string; expiresAt: number; attempts: number }
>();

// ─── Rate Limiter (in-memory tracker for email send requests; max 3 per 15 mins) ───
const sendRateLimit = new Map<string, { count: number; resetAt: number }>();

// ─── Normalize email to prevent duplicate IDs via +sub-addressing or dot manipulation ───
export function normalizeEmail(rawEmail: string): string {
  const trimmed = rawEmail.trim().toLowerCase();
  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex === -1) return trimmed;

  let localPart = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex + 1);

  // Strip anything from the first '+' onwards (sub-addressing tag, e.g., user+1@gmail.com -> user)
  const plusIndex = localPart.indexOf("+");
  if (plusIndex !== -1) {
    localPart = localPart.slice(0, plusIndex);
  }

  // If Gmail or Googlemail, remove dots inside localPart and normalize domain
  if (domain === "gmail.com" || domain === "googlemail.com") {
    localPart = localPart.replace(/\./g, "");
    return `${localPart}@gmail.com`;
  }

  return `${localPart}@${domain}`;
}

// ─── Generate a random 4-digit OTP ───
function generateOtp(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// ─── Check Rate Limit (Max 3 OTP requests per 15 minutes per email) ───
function checkSendRateLimit(email: string) {
  const now = Date.now();
  const record = sendRateLimit.get(email);
  if (record && now < record.resetAt) {
    if (record.count >= 3) {
      const minutesLeft = Math.ceil((record.resetAt - now) / 60000);
      throw new Error(
        `Too many verification codes requested. Please try again in ${minutesLeft} minute(s).`,
      );
    }
    record.count += 1;
  } else {
    sendRateLimit.set(email, { count: 1, resetAt: now + 15 * 60 * 1000 });
  }
}

// ─── Send OTP Email ───
export const sendWaitlistOtp = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
    }),
  )
  .handler(async ({ data }) => {
    loadServerEnv();
    const normalizedEmail = normalizeEmail(data.email);
    checkSendRateLimit(normalizedEmail);

    // Dynamic import keeps Resend out of the client bundle
    const { Resend } = await import("resend");

    const apiKey =
      process.env.RESEND_API_KEY ||
      import.meta.env?.RESEND_API_KEY ||
      process.env.VITE_RESEND_API_KEY ||
      import.meta.env?.VITE_RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY is not configured. Please check your .env.local file and RESTART 'npm run dev'!",
      );
    }

    const resend = new Resend(apiKey);
    const otp = generateOtp();

    // Store OTP keyed by normalized email with 10-minute expiry
    otpStore.set(normalizedEmail, {
      code: otp,
      name: data.name.trim(),
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    });

    // Send the OTP email via Resend from founders@wisps.in
    const { error } = await resend.emails.send({
      from: "Wisps <founders@wisps.in>",
      to: data.email,
      subject: "Your Wisps Waitlist Verification Code",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.5px;">
            Join the Wisps Waitlist
          </h1>
          <p style="font-size: 15px; color: #555; margin-bottom: 28px; line-height: 1.5;">
            Hi ${data.name.trim()}, here is your verification code to secure your spot in line:
          </p>
          <div style="background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
            <span style="font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #111; font-family: monospace;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 13px; color: #71717a; margin-bottom: 4px;">
            This code expires in 10 minutes.
          </p>
          <p style="font-size: 13px; color: #71717a;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 32px 0 16px;" />
          <p style="font-size: 12px; color: #9f9ea6; text-align: center; margin: 0;">
            Wisps — Cursor for your professional life, inside iMessage.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send verification email");
    }

    return { success: true };
  });

// ─── Verify OTP & Save to Supabase Waitlist ───
export const verifyWaitlistOtp = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email("Invalid email address"),
      code: z.string().length(4, "Code must be 4 digits"),
    }),
  )
  .handler(async ({ data }) => {
    const normalizedEmail = normalizeEmail(data.email);
    const stored = otpStore.get(normalizedEmail);

    if (!stored) {
      return {
        success: false as const,
        error: "No verification code found. Please request a new one.",
      };
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(normalizedEmail);
      return { success: false as const, error: "Code has expired. Please request a new one." };
    }

    if (stored.attempts >= 5) {
      otpStore.delete(normalizedEmail);
      return {
        success: false as const,
        error: "Too many failed verification attempts. Please request a new code.",
      };
    }

    if (stored.code !== data.code) {
      stored.attempts += 1;
      return {
        success: false as const,
        error: `Invalid code. You have ${5 - stored.attempts} attempt(s) remaining.`,
      };
    }

    // OTP verified — clean up from memory
    otpStore.delete(normalizedEmail);

    // ─── Save to Supabase waitlist table ───
    const supabase = getSupabaseAdmin();

    // Check if normalized email already exists in Supabase
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id, position, name")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      // Already on the waitlist — return their existing position without duplicate insertion!
      return {
        success: true as const,
        name: existing.name || stored.name,
        position: existing.position as number,
        alreadyJoined: true,
      };
    }

    // Get next position (count existing + 1)
    const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true });

    const position = (count ?? 0) + 1;

    // Insert normalized email into waitlist
    const { error: insertError } = await supabase.from("waitlist").insert({
      name: stored.name,
      email: normalizedEmail,
      position,
      verified: true,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw new Error("Failed to join waitlist. Please try again.");
    }

    console.log(`✅ Waitlist #${position}: ${stored.name} <${normalizedEmail}>`);

    return {
      success: true as const,
      name: stored.name,
      position,
      alreadyJoined: false,
    };
  });
