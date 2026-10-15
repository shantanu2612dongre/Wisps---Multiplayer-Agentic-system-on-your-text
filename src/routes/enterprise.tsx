import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Lock,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  FlaskConical,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "Enterprise — Dotie" },
      {
        name: "description",
        content:
          "Powerful, secure email for modern teams. SOC 2 Type II, encryption everywhere, and no AI training on your data.",
      },
      { property: "og:title", content: "Dotie for Enterprise" },
      {
        property: "og:description",
        content: "Enterprise-grade security, compliance, and control for your team's inbox.",
      },
    ],
  }),
  component: EnterprisePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const },
  }),
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-wash">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]"
        >
          Email that scales <br className="hidden md:block" />
          with your team
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mx-auto mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Powerful email for modern teams. Collaborate faster, stay secure, and work smarter — all
          in one place.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 flex items-center justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact Sales
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const securityItems = [
  {
    icon: Lock,
    title: "Encrypted everywhere",
    desc: "Your data is encrypted in transit with TLS 1.3+ and at rest with AES-256 encryption.",
  },
  {
    icon: BadgeCheck,
    title: "SOC 2 Type II",
    desc: "Certified compliant. Independent audits verify our controls year after year.",
  },
  {
    icon: ShieldCheck,
    title: "No AI training on your data",
    desc: "Your data is never used to train models. Our AI providers guarantee zero data retention.",
  },
  {
    icon: Sparkles,
    title: "CASA Tier 2",
    desc: "Annual Cloud Application Security Assessment audit for Google API compliance.",
  },
  {
    icon: FlaskConical,
    title: "Semi-annual pentests",
    desc: "Independent penetration testing every 6 months. Executive summaries available under NDA.",
  },
  {
    icon: Trash2,
    title: "Full data control",
    desc: "Delete your data within 24 hours on request. Backups destroyed within 7 days. Revoke access anytime.",
  },
];

function Security() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground"
        >
          Security you can trust.
        </motion.h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityItems.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-muted/50 border border-border/60 p-6"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-card text-foreground border border-border/60">
                <s.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-foreground tracking-tight">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Daniel",
    role: "Investor, Sierra Ventures",
    quote:
      "It's like having an EA who's always one step ahead. I'm walking to a meeting, text 'what do we know about this person,' and the full context shows up immediately.",
  },
  {
    name: "Priya",
    role: "COO, Northwind",
    quote:
      "Dotie quietly handles 80% of my inbox. I get to focus on the conversations that actually move the company.",
  },
  {
    name: "Marcus",
    role: "Founder, Lumen Labs",
    quote: "The drafts sound exactly like me. My team had no idea until I told them.",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-muted/60 border border-border/60 p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Don't take our word for it.
          </h2>
          <div className="mt-8 rounded-2xl bg-card border border-border/60 p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
              <p className="mt-4 text-foreground/90 leading-relaxed max-w-xl">"{t.quote}"</p>
            </motion.div>
            <div
              className="h-24 w-24 md:h-28 md:w-28 rounded-xl shrink-0"
              style={{ background: "var(--gradient-hero)" }}
              aria-hidden
            />
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-foreground" : "w-2 bg-foreground/30 hover:bg-foreground/50"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What security certifications does Dotie have?",
    a: "Dotie is SOC 2 Type II certified and CASA Tier 2 audited. We undergo independent penetration tests every six months.",
  },
  {
    q: "Do you use customer data to train AI models?",
    a: "Never. Your email content is never used to train our models, and our AI providers contractually guarantee zero data retention.",
  },
  {
    q: "How is my data encrypted?",
    a: "All data is encrypted in transit using TLS 1.3+ and at rest with AES-256. Encryption keys are rotated regularly.",
  },
  {
    q: "How does Dotie access my email?",
    a: "Dotie connects via secure OAuth tokens with the minimum scopes required. You can revoke access at any time.",
  },
  {
    q: "What control do I have over my data?",
    a: "Full control. Export anytime, delete on request within 24 hours, and backups are destroyed within 7 days.",
  },
  {
    q: "Can we get a Data Processing Agreement (DPA)?",
    a: "Yes. We provide a standard DPA for all Enterprise customers. Contact sales to receive a copy.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight"
        >
          <span className="text-foreground">Questions </span>
          <span className="text-muted-foreground">&amp; answers</span>
        </motion.h2>
        <div className="mt-8 divide-y divide-border/60 border-y border-border/60">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-sm md:text-base text-foreground font-medium pr-6">
                    {f.q}
                  </span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Have more questions? Visit our{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">
            Help Center
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function EnterprisePage() {
  return (
    <main className="min-h-screen bg-page-wash text-foreground antialiased">
      <Nav />
      <Hero />
      <Security />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
