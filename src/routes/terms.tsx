import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  CreditCard,
  Globe,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Dotie" },
      {
        name: "description",
        content:
          "Global Terms of Service for Dotie, governed by Indian law and designed for worldwide use.",
      },
      { property: "og:title", content: "Terms of Service — Dotie" },
      {
        property: "og:description",
        content:
          "Global Terms of Service for Dotie, with India as the base jurisdiction and mandatory local law carveouts.",
      },
    ],
  }),
  component: TermsPage,
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

function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Last updated: June 20, 2026
            </p>
            <p className="mt-6 text-sm md:text-base text-muted-foreground">
              These Terms apply worldwide. If local law gives you additional non-waivable rights,
              those rights apply to the extent required by law.
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
                  These Terms of Service (&quot;Terms&quot;) are a binding agreement between you and
                  Slashy (&quot;Slashy&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) for
                  your access to and use of our website, applications, APIs, and related services
                  (together, the &quot;Service&quot;).
                </p>
                <p>
                  By creating an account, clicking to accept, or otherwise using the Service, you
                  agree to these Terms. If you are using the Service on behalf of a company or other
                  entity, you represent that you have authority to bind that entity, and then
                  &quot;you&quot; means that entity.
                </p>
                <p>If you do not agree to these Terms, do not use the Service.</p>
              </div>

              <Section number="1" title="Eligibility and Accounts" icon={Globe}>
                <p>
                  You must be at least the age of majority in your jurisdiction and able to enter
                  into a binding contract to use the Service. The Service is not directed to
                  children and is not intended for use by anyone under 18.
                </p>
                <p>
                  To use the Service, you may need to create an account and connect third-party
                  services such as Google. You agree to provide accurate information, keep your
                  credentials secure, and notify us promptly of any unauthorized access or security
                  incident.
                </p>
                <p>
                  You are responsible for all activity that occurs under your account, except to the
                  extent caused by our own security failure or unlawful conduct.
                </p>
              </Section>

              <Section number="2" title="The Service" icon={Sparkles}>
                <p>
                  The Service is an AI-powered email and productivity product. It may include inbox
                  management, drafting, search, scheduling, calendar workflows, and related tools,
                  including beta or experimental features that may change or be removed at any time.
                </p>
                <p>
                  We may modify, suspend, or discontinue any part of the Service in our discretion,
                  provided that we will not intentionally remove paid core functionality during a
                  paid term without offering a commercially reasonable alternative where required by
                  law.
                </p>
              </Section>

              <Section number="3" title="Third-Party Services and Google Access" icon={ShieldCheck}>
                <p>
                  The Service may connect to third-party services, including Google Workspace
                  services. When you connect a third-party account, you authorize us to access and
                  process that data only as needed to provide the features you enable.
                </p>
                <p>
                  You are responsible for complying with the third party&apos;s terms and for having
                  any permissions needed to connect the account. If you revoke access, some features
                  may stop working.
                </p>
                <p>
                  You must not use the Service to access any account or data without authorization.
                </p>
              </Section>

              <Section number="4" title="AI Features" icon={Bot}>
                <p>
                  The Service may generate summaries, drafts, suggestions, classifications, and
                  other content using machine learning or third-party model providers. AI output is
                  for convenience only and may be inaccurate, incomplete, or inappropriate.
                </p>
                <p>
                  You are solely responsible for reviewing, editing, and approving any AI-generated
                  content before relying on it or sending it to others. We do not provide legal,
                  financial, medical, or tax advice.
                </p>
                <p>
                  Our use of personal data and model providers is described in our privacy materials
                  and DPA, and is limited to providing and securing the Service.
                </p>
              </Section>

              <Section number="5" title="Subscriptions, Billing, and Taxes" icon={CreditCard}>
                <p>
                  Some parts of the Service may require a paid subscription. If a plan renews
                  automatically, we will disclose the renewal terms, price, and cancellation method
                  before you complete checkout or at the point of signup where the law requires.
                </p>
                <p>
                  You authorize us and our payment processors to charge the payment method you
                  provide for subscription fees, taxes, and other amounts due. Unless a
                  plan-specific policy or applicable law says otherwise, fees are non-refundable.
                </p>
                <p>
                  We may change subscription prices on renewal with advance notice where required by
                  law. You may cancel a subscription through your account settings or any other
                  cancellation method we make available.
                </p>
              </Section>

              <Section number="6" title="Acceptable Use" icon={TriangleAlert}>
                <p>You may not, and may not help anyone else, to:</p>
                <div className="space-y-2 pl-5">
                  <p>
                    (a) use the Service for spam, phishing, fraud, malware, or unlawful activity;
                  </p>
                  <p>(b) violate any law, regulation, or third-party right;</p>
                  <p>
                    (c) access or attempt to access accounts, data, or systems without
                    authorization;
                  </p>
                  <p>
                    (d) scrape, copy, probe, or reverse engineer the Service except where law
                    permits;
                  </p>
                  <p>(e) interfere with, degrade, or disrupt the Service or its security;</p>
                  <p>
                    (f) use the Service to train competing models or build a competing product from
                    our output or data without permission.
                  </p>
                </div>
              </Section>

              <Section number="7" title="Content, Data, and Privacy" icon={ShieldCheck}>
                <p>
                  You retain your rights in the content you submit to the Service. You grant us a
                  limited, worldwide, royalty-free license to host, store, process, transmit,
                  display, and create technical copies of your content solely to provide, secure,
                  support, and improve the Service, to comply with law, and to enforce these Terms.
                </p>
                <p>
                  You are responsible for the accuracy, legality, and rights clearance of the
                  content you submit. Do not upload or share content you do not have the right to
                  use.
                </p>
                <p>
                  Our collection and use of personal data are described in our privacy materials and
                  DPA. To the extent applicable, we comply with the Digital Personal Data Protection
                  Act, 2023 and other mandatory privacy laws.
                </p>
              </Section>

              <Section
                number="8"
                title="Security, Suspension, and Termination"
                icon={TriangleAlert}
              >
                <p>
                  We may suspend or terminate access immediately if we reasonably believe you
                  violated these Terms, created a security or legal risk, failed to pay amounts due,
                  or used the Service in a way that harms us, our users, or third parties.
                </p>
                <p>
                  You may stop using the Service at any time and, if available, delete your account
                  from your settings. On termination, we will handle retained data in accordance
                  with our privacy materials, the DPA, applicable law, and reasonable operational
                  backup practices.
                </p>
              </Section>

              <Section number="9" title="Intellectual Property" icon={Sparkles}>
                <p>
                  We and our licensors own the Service, including software, designs, logos, and
                  content we provide, and all related intellectual property rights. Except for the
                  limited rights granted in these Terms, no rights are transferred to you.
                </p>
                <p>
                  Feedback you give us may be used by us without restriction and without obligation
                  to you, unless we agree otherwise in writing.
                </p>
              </Section>

              <Section number="10" title="Disclaimers" icon={TriangleAlert}>
                <p>
                  THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
                  BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS
                  OR IMPLIED, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, TITLE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  We do not warrant that the Service will be uninterrupted, error-free, secure, or
                  that AI output or other content will be accurate or suitable for your purposes.
                </p>
              </Section>

              <Section number="11" title="Limitation of Liability" icon={ShieldCheck}>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, SLASHY WILL NOT BE LIABLE FOR ANY
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR
                  ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL.
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ALL CLAIMS
                  RELATING TO THE SERVICE WILL NOT EXCEED THE GREATER OF: (A) THE AMOUNTS YOU PAID
                  TO US FOR THE SERVICE DURING THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO THE
                  CLAIM; OR (B) INR 10,000, IF YOU DID NOT PAY US ANY FEES.
                </p>
              </Section>

              <Section number="12" title="Indemnity" icon={ArrowRight}>
                <p>
                  You agree to indemnify and hold harmless Slashy from claims, losses, liabilities,
                  damages, and expenses, including reasonable legal fees, arising out of or related
                  to your use of the Service, your content, your violation of these Terms, or your
                  violation of any law or third-party right.
                </p>
              </Section>

              <Section number="13" title="Governing Law and Disputes" icon={Globe}>
                <p>
                  These Terms are governed by the laws of India, without regard to conflict of laws
                  rules. Subject to mandatory local law, the parties will first try to resolve
                  disputes informally by contacting us.
                </p>
                <p>
                  If a dispute cannot be resolved informally, it will be subject to the exclusive
                  jurisdiction of the competent courts in India. Nothing in these Terms limits any
                  non-waivable consumer or data-protection rights you have under applicable law.
                </p>
              </Section>

              <Section number="14" title="Changes to These Terms" icon={Sparkles}>
                <p>
                  We may update these Terms from time to time. If the changes are material, we will
                  give notice by email, in-product notice, or other reasonable means before the
                  change takes effect, unless a shorter period is allowed or required by law.
                </p>
                <p>
                  Your continued use of the Service after the effective date means you accept the
                  updated Terms.
                </p>
              </Section>

              <Section number="15" title="Contact" icon={ShieldCheck}>
                <p>
                  If you have questions about these Terms, contact us at{" "}
                  <a
                    href="mailto:contact@usedotie.com"
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    contact@usedotie.com
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
