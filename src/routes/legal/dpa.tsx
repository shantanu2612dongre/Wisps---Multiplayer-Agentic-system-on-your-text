import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Footer } from "../../components/Footer";
import { Nav } from "../../components/Nav";

export const Route = createFileRoute("/legal/dpa")({
  head: () => ({
    meta: [
      { title: "Data Processing Agreement — Dotie" },
      {
        name: "description",
        content: "Data Processing Agreement for Dotie and Slashy, effective February 3, 2026.",
      },
      { property: "og:title", content: "Data Processing Agreement — Dotie" },
      {
        property: "og:description",
        content:
          "A data processing agreement covering security, subprocessors, transfers, and deletion terms.",
      },
    ],
  }),
  component: DpaPage,
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
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
        {number}. {title}
      </h2>
      <div className="space-y-3 text-sm md:text-base leading-7 text-foreground/85">{children}</div>
    </section>
  );
}

function DpaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-glow/5 via-transparent to-transparent" />
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
              Data Processing Agreement
            </h1>
            <p className="mt-4 text-sm md:text-base text-muted-foreground">
              Effective Date: February 3, 2026
            </p>
            <p className="mt-6 text-sm md:text-base text-muted-foreground">
              Looking for technical details about our security and architecture? See our{" "}
              <a
                href="https://www.slashy.com/security"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground hover:underline underline-offset-4"
              >
                Security &amp; Architecture FAQ →
              </a>
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
                  This Data Processing Agreement (&quot;Agreement&quot;) forms part of the Terms of
                  Service (&quot;Principal Agreement&quot;) between:
                </p>
                <p>You (the &quot;Company&quot; or &quot;Controller&quot;)</p>
                <p>and Slashy (the &quot;Processor&quot;)</p>
                <p>(together the &quot;Parties&quot;)</p>
                <p className="font-medium text-foreground">WHEREAS</p>
                <p>(A) The Company acts as a Data Controller.</p>
                <p>
                  (B) The Company wishes to use Services provided by the Processor, which involve
                  the processing of personal data.
                </p>
                <p>
                  (C) The Parties seek to implement a data processing agreement that complies with
                  applicable data protection laws, including the General Data Protection Regulation
                  (EU) 2016/679 (&quot;GDPR&quot;), the Digital Personal Data Protection Act, 2023,
                  and, where applicable, U.S. state privacy laws.
                </p>
                <p className="font-medium text-foreground">IT IS AGREED AS FOLLOWS:</p>
              </div>

              <Section number="1" title="Definitions">
                <p>
                  <strong>1.1</strong> &quot;Company Personal Data&quot; means any Personal Data
                  processed by Processor on behalf of Company pursuant to the Principal Agreement.
                </p>
                <p>
                  <strong>1.2</strong> &quot;Data Protection Laws&quot; means the GDPR and, to the
                  extent applicable, the Digital Personal Data Protection Act, 2023, and U.S. state
                  privacy laws including the California Consumer Privacy Act.
                </p>
                <p>
                  <strong>1.3</strong> &quot;Subprocessor&quot; means any third party appointed by
                  Processor to process Personal Data on behalf of the Company.
                </p>
                <p>
                  <strong>1.4</strong> The terms &quot;Controller&quot;, &quot;Data Subject&quot;,
                  &quot;Personal Data&quot;, &quot;Personal Data Breach&quot;, and
                  &quot;Processing&quot; shall have the same meaning as in the GDPR.
                </p>
              </Section>

              <Section number="2" title="Processing of Company Personal Data">
                <p>
                  <strong>2.1</strong> Processor shall:
                </p>
                <div className="space-y-2 pl-5">
                  <p>
                    (a) comply with all applicable Data Protection Laws in the Processing of Company
                    Personal Data; and
                  </p>
                  <p>
                    (b) not Process Company Personal Data other than on the Company&apos;s
                    documented instructions, unless required by law.
                  </p>
                </div>
                <p>
                  <strong>2.2</strong> The Company instructs Processor to process Company Personal
                  Data to provide the email, calendar, and video meeting services described in the
                  Principal Agreement.
                </p>
                <p>
                  <strong>2.3</strong> Processor shall not sell or share Company Personal Data for
                  advertising or marketing purposes.
                </p>
              </Section>

              <Section number="3" title="Processor Personnel">
                <p>
                  Processor shall ensure that persons authorized to process Company Personal Data
                  are subject to confidentiality obligations and that access is limited to those who
                  need it to perform the Services.
                </p>
              </Section>

              <Section number="4" title="Security">
                <p>
                  <strong>4.1</strong> Processor shall implement appropriate technical and
                  organizational measures to ensure a level of security appropriate to the risk,
                  including:
                </p>
                <div className="space-y-2 pl-5">
                  <p>(a) encryption of Personal Data at rest and in transit;</p>
                  <p>(b) access controls and authentication measures; and</p>
                  <p>(c) regular testing and assessment of security measures.</p>
                </div>
                <p>
                  <strong>4.2</strong> Processor maintains SOC 2 Type II compliance.
                </p>
              </Section>

              <Section number="5" title="Subprocessing">
                <p>
                  <strong>5.1</strong> Company authorizes Processor to engage Subprocessors. A
                  current list of Subprocessors is available on our{" "}
                  <a
                    href="https://www.slashy.com/security#subprocessors"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-foreground hover:underline underline-offset-4"
                  >
                    Security page
                  </a>
                  .
                </p>
              </Section>

              <Section number="6" title="Data Subject Rights">
                <p>
                  <strong>6.1</strong> Processor shall promptly notify Company if it receives a
                  request from a Data Subject and shall not respond except as instructed by Company
                  or required by law.
                </p>
                <p>
                  <strong>6.2</strong> Processor shall assist Company in responding to Data Subject
                  requests, taking into account the nature of the Processing.
                </p>
              </Section>

              <Section number="7" title="Personal Data Breach">
                <p>
                  <strong>7.1</strong> Processor shall notify Company without undue delay upon
                  becoming aware of a Personal Data Breach affecting Company Personal Data.
                </p>
                <p>
                  <strong>7.2</strong> Processor shall cooperate with Company and take reasonable
                  steps to assist in the investigation and remediation of each such breach.
                </p>
              </Section>

              <Section number="8" title="Data Transfers">
                <p>
                  <strong>8.1</strong> Company Personal Data may be transferred to and processed in
                  India, the United States, and other countries where we or our subprocessors
                  operate.
                </p>
                <p>
                  <strong>8.2</strong> For transfers of Personal Data from the EEA, the Parties
                  agree to rely on the EU Standard Contractual Clauses as the transfer mechanism.
                </p>
              </Section>

              <Section number="9" title="Deletion of Company Personal Data">
                <p>
                  Upon termination of the Services, Processor shall delete all Company Personal Data
                  within 24 hours, unless retention is required by law. Backup copies shall be
                  deleted within 7 days (up to 14 days during active incident investigations).
                </p>
              </Section>

              <Section number="10" title="General Terms">
                <p>
                  <strong>10.1</strong> This Agreement is governed by the laws of India.
                </p>
                <p>
                  <strong>10.2</strong> This Agreement shall remain in effect for as long as
                  Processor processes Company Personal Data.
                </p>
                <p>
                  <strong>10.3</strong> In the event of any conflict between this Agreement and the
                  Principal Agreement with respect to data protection, this Agreement shall prevail.
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
