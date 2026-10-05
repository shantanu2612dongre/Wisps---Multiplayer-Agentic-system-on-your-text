import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  Bot,
  CalendarDays,
  Cloud,
  Cookie,
  CreditCard,
  Globe,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Dotie" },
      {
        name: "description",
        content:
          "Privacy Policy for Dotie, including what we collect, how we use it, how we share it, and your rights.",
      },
      { property: "og:title", content: "Privacy Policy — Dotie" },
      {
        property: "og:description",
        content:
          "Privacy Policy for Dotie with India as the base jurisdiction and worldwide data handling disclosures.",
      },
    ],
  }),
  component: PrivacyPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Section({
  number,
  title,
  icon: Icon,
  children,
}: {
  number: string;
  title: string;
  icon?: typeof Sparkles;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        {Icon ? (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-muted/50 text-foreground">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
        ) : null}
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          {number}. {title}
        </h2>
      </div>
      <div className="space-y-3 text-sm md:text-base leading-7 text-foreground/85">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-primary-glow/10 via-transparent to-transparent pointer-events-none" />
      <Nav />
      <section className="relative py-12 md:py-16">
        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Legal</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Last updated: February 3, 2026
            </p>
            <p className="mt-6 text-sm md:text-base text-muted-foreground">
              This policy applies worldwide. If local law gives you additional rights, those rights
              apply to the extent required by law.
            </p>
          </motion.div>

          <motion.article
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-12 rounded-3xl border border-border/60 bg-card p-6 md:p-10 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          >
            <div className="space-y-10">
              <div className="space-y-4 text-sm md:text-base leading-7 text-foreground/85">
                <p>
                  Dotie is the product operated by Slashy. This Privacy Policy explains how we
                  collect, use, disclose, and protect personal data when you use Dotie, our
                  website, and related services (together, the &quot;Service&quot;).
                </p>
                <p>
                  By using the Service, you acknowledge the practices described in this Policy. If
                  you do not agree, do not use the Service.
                </p>
              </div>

              <Section number="1" title="Information We Collect" icon={Sparkles}>
                <p>
                  We collect information in three main ways: information you provide, information
                  from connected services, and information collected automatically.
                </p>
                <p>
                  <strong>Account and profile information.</strong> When you sign up, we may collect
                  your name, email address, organization name, billing details, preferences, and any
                  profile information you choose to add.
                </p>
                <p>
                  <strong>Connected Google data.</strong> If you connect Gmail, Google Calendar, or
                  Google Meet, we may access email content, attachments, metadata, calendar events,
                  attendees, scheduling details, meeting links, labels, folders, and search activity
                  needed to provide the Service. We only request and use the permissions needed for
                  the features you enable.
                </p>
                <p>
                  <strong>Usage and device data.</strong> We may collect IP address, browser and
                  device type, operating system, log data, timestamps, feature interactions,
                  diagnostics, and performance information.
                </p>
              </Section>

              <Section number="2" title="How We Use Information" icon={Bot}>
                <p>We use personal data to:</p>
                <div className="space-y-2 pl-5">
                  <p>(a) provide, operate, and maintain the Service;</p>
                  <p>(b) connect to your Google account and perform actions you request;</p>
                  <p>
                    (c) generate drafts, summaries, classifications, and other AI-powered features;
                  </p>
                  <p>(d) personalize your experience and improve product reliability;</p>
                  <p>(e) send service notices, security alerts, and support communications;</p>
                  <p>(f) investigate abuse, prevent fraud, and protect the Service; and</p>
                  <p>(g) comply with law and enforce our agreements.</p>
                </div>
                <p>
                  We do not use your email content to train models for other users. Where we use
                  third-party AI providers, they are contractually restricted from retaining or
                  training on customer content except as disclosed in the Service and allowed by
                  law. We do not use your personal data for third-party advertising.
                </p>
              </Section>

              <Section number="3" title="Legal Bases and Consent" icon={ShieldCheck}>
                <p>
                  Where required, we process personal data on the basis of your consent, to perform
                  our contract with you, to comply with legal obligations, to protect our rights and
                  users, and for other lawful purposes permitted by applicable law.
                </p>
                <p>
                  If you use the Service on behalf of an organization, you confirm that you have
                  authority to provide the necessary consents and instructions for that
                  organization&apos;s data.
                </p>
                <p>
                  For questions, requests, or complaints, contact our privacy team at{" "}
                  <a
                    href="mailto:privacy@usedotie.com"
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    privacy@usedotie.com
                  </a>
                  .
                </p>
              </Section>

              <Section number="4" title="How We Share Information" icon={Cloud}>
                <p>We do not sell your personal data.</p>
                <p>We do not share personal data for targeted advertising.</p>
                <p>We may share information with:</p>
                <div className="space-y-2 pl-5">
                  <p>
                    (a) service providers that host, secure, analyze, support, or help operate the
                    Service;
                  </p>
                  <p>(b) third-party integrations you choose to connect, including Google;</p>
                  <p>
                    (c) legal, regulatory, or law enforcement authorities when required by law or to
                    protect rights and safety; and
                  </p>
                  <p>
                    (d) a buyer or successor in connection with a merger, acquisition, or financing
                    transaction.
                  </p>
                </div>
                <p>
                  All vendors that process personal data on our behalf are bound by confidentiality
                  and data-protection obligations appropriate to their role.
                </p>
              </Section>

              <Section number="5" title="AI, Memories, and Model Data" icon={Bot}>
                <p>
                  Dotie may store AI memories, conversation history, and related contextual data
                  when you use features that rely on them. We keep that data encrypted and only as
                  needed to provide the feature or as otherwise required by law.
                </p>
                <p>
                  AI responses are suggestions only. You are responsible for reviewing and approving
                  any output before sending or relying on it.
                </p>
              </Section>

              <Section number="6" title="Data Retention" icon={CalendarDays}>
                <p>
                  We keep data only as long as needed for the purposes described in this Policy, to
                  comply with law, resolve disputes, and enforce agreements.
                </p>
                <div className="space-y-2 pl-5">
                  <p>(a) account data is retained while your account is active;</p>
                  <p>
                    (b) email data may be cached temporarily for performance and product
                    functionality;
                  </p>
                  <p>
                    (c) when you delete your account, we aim to delete or de-identify customer data
                    within 24 hours, except where retention is required by law;
                  </p>
                  <p>
                    (d) backup copies are typically deleted within 7 days, and may be retained for
                    up to 14 days during active incident investigations; and
                  </p>
                  <p>
                    (e) log and audit data may be retained for up to 1 year for security and
                    operations.
                  </p>
                </div>
              </Section>

              <Section number="7" title="Security" icon={ShieldCheck}>
                <p>
                  We use technical and organizational safeguards designed to protect personal data,
                  including access controls, authentication, encryption in transit and at rest,
                  logging, and security reviews.
                </p>
                <p>
                  However, no system is perfectly secure, and we cannot guarantee absolute security.
                </p>
              </Section>

              <Section number="8" title="International Transfers" icon={Globe}>
                <p>
                  Your information may be processed in India, the United States, and other countries
                  where we or our service providers operate.
                </p>
                <p>
                  Where required, we use contractual, technical, and organizational safeguards for
                  cross-border transfers, including standard contractual terms and other lawful
                  mechanisms.
                </p>
              </Section>

              <Section number="9" title="Your Rights" icon={Sparkles}>
                <p>
                  Depending on where you live, you may have rights to access, correct, delete, or
                  port your personal data; withdraw consent; object to or restrict certain
                  processing; and complain to a regulator or authority.
                </p>
                <p>
                  If you are in India, you may also have rights under the Digital Personal Data
                  Protection Act, 2023 and related rules, including grievance redressal rights and
                  rights to withdraw consent where applicable.
                </p>
                <p>
                  If you have a grievance about our handling of personal data, email{" "}
                  <a
                    href="mailto:privacy@usedotie.com"
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    privacy@usedotie.com
                  </a>
                  . We will acknowledge and review the request within a reasonable time and, where
                  appropriate, route it to the correct internal owner.
                </p>
                <p>
                  You can exercise rights by contacting us at{" "}
                  <a
                    href="mailto:privacy@usedotie.com"
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    privacy@usedotie.com
                  </a>
                  .
                </p>
              </Section>

              <Section number="10" title="Children" icon={TriangleAlert}>
                <p>
                  The Service is not directed to children and is not intended for anyone under 18.
                  We do not knowingly collect personal data from children. If you believe a child
                  has provided us personal data, contact us and we will take appropriate steps.
                </p>
              </Section>

              <Section number="11" title="Cookies and Similar Technologies" icon={Cookie}>
                <p>
                  We may use cookies, SDKs, and similar technologies to keep you signed in, remember
                  preferences, analyze usage, and improve security and performance. You can control
                  cookies through your browser settings, but some features may not work properly if
                  you disable them.
                </p>
              </Section>

              <Section number="12" title="Third-Party Links and Services" icon={CreditCard}>
                <p>
                  The Service may contain links to third-party websites or integrations. Their
                  privacy practices are governed by their own policies, and we are not responsible
                  for their content or practices.
                </p>
              </Section>

              <Section number="13" title="Changes to This Policy" icon={Sparkles}>
                <p>
                  We may update this Policy from time to time. If changes are material, we will
                  provide notice by email, in-product notice, or another reasonable method before
                  the change takes effect, unless a shorter period is required or permitted by law.
                </p>
              </Section>

              <Section number="14" title="Contact" icon={ShieldCheck}>
                <p>
                  Questions about this Policy can be sent to{" "}
                  <a
                    href="mailto:privacy@usedotie.com"
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    privacy@usedotie.com
                  </a>
                  .
                </p>
              </Section>
            </div>
          </motion.article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
