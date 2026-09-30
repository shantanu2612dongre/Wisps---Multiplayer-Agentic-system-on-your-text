import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Clock3,
  FileText,
  Sparkles,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Wisps" },
      {
        name: "description",
        content: "Updates, product notes, and security thinking from the Wisps team.",
      },
      { property: "og:title", content: "Blog — Wisps" },
      {
        property: "og:description",
        content: "Product notes, workflow ideas, and trust updates from Wisps.",
      },
    ],
  }),
  component: BlogPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-1.5 font-semibold text-foreground tracking-tight text-xl"
        >
          <img src="/wispsmascot.png" alt="Wisps logo" className="h-9 w-9 object-contain" />
          Wisps
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm text-foreground/80">
          <a href="/#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="/enterprise" className="hover:text-foreground transition-colors">
            Enterprise
          </a>
          <a href="/for-agents" className="hover:text-foreground transition-colors">
            For Agents
          </a>
          <a href="/about" className="hover:text-foreground transition-colors">
            About
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Login
          </a>
          <a
            href={`sms:${import.meta.env.VITE_LINQ_NUMBER || "+13127195463"}?body=Hi`}
            className="inline-flex items-center rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

function SectionShell({ children }: { children: ReactNode }) {
  return <section className="max-w-7xl mx-auto px-6">{children}</section>;
}

const categories = ["All posts", "Product", "Workflow", "Security", "Company"];

const posts = [
  {
    title: "How Wisps turns busy inboxes into clear next steps",
    excerpt:
      "A look at the triage patterns behind the inbox experience, and how we keep the system useful without over-automating the user out of the loop.",
    category: "Product",
    readTime: "6 min read",
    date: "Jun 20, 2026",
    icon: Workflow,
    art: "from-[oklch(0.95_0.02_260)] via-[oklch(0.9_0.04_220)] to-[oklch(0.86_0.07_185)]",
  },
  {
    title: "Writing rules that actually help AI drafts sound human",
    excerpt:
      "The practical framework we use for prompt rules, tone guidance, and guardrails that keep drafts crisp, personal, and easy to approve.",
    category: "Workflow",
    readTime: "4 min read",
    date: "Jun 12, 2026",
    icon: Bot,
    art: "from-[oklch(0.9_0.06_285)] via-[oklch(0.88_0.08_240)] to-[oklch(0.92_0.04_170)]",
  },
  {
    title: "What security looks like when email data is involved",
    excerpt:
      "A plain-English walk-through of encryption, subprocessors, deletion windows, and the controls that matter when your inbox becomes infrastructure.",
    category: "Security",
    readTime: "5 min read",
    date: "Jun 03, 2026",
    icon: ShieldCheck,
    art: "from-[oklch(0.94_0.03_35)] via-[oklch(0.91_0.05_260)] to-[oklch(0.88_0.09_300)]",
  },
];

function Hero() {
  return (
    <SectionShell>
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
        className="relative mt-8 overflow-hidden rounded-[2rem] border border-border/60 bg-card px-6 py-20 md:px-12 md:py-28"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at top left, color-mix(in oklch, var(--pink-wash) 24%, transparent) 0%, transparent 34%), radial-gradient(circle at top right, color-mix(in oklch, var(--lavender-wash) 22%, transparent) 0%, transparent 32%), linear-gradient(180deg, color-mix(in oklch, var(--muted) 55%, transparent) 0%, transparent 100%)",
          }}
        />
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Latest updates from Wisps
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[0.98] font-serif">
            Blog
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Product notes, workflow ideas, and trust updates from the team behind Wisps.
          </p>
        </div>
      </motion.section>
    </SectionShell>
  );
}

function FilterBar() {
  return (
    <SectionShell>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={1}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        {categories.map((category, index) => (
          <button
            key={category}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              index === 0
                ? "border-foreground bg-foreground text-background"
                : "border-border/70 bg-background text-foreground/75 hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>
    </SectionShell>
  );
}

function ArtBlock({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-accent/20">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
          }}
        />
        <div className="absolute left-6 top-8 grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-9 w-7 rounded-sm border border-border/40 ${
                i % 2 === 0 ? "bg-primary-glow/20" : "bg-muted/70"
              }`}
            />
          ))}
        </div>
        <div className="absolute left-10 right-10 top-20 h-24 rounded-full bg-gradient-to-r from-primary-glow/10 via-accent/40 to-pink-wash/30 blur-xl" />
        <div className="absolute inset-x-8 bottom-20 h-16 rounded-full border border-primary-glow/25 bg-gradient-to-r from-primary-glow/20 via-transparent to-pink-wash/20" />
        <div className="absolute right-8 top-20 h-28 w-28 rounded-full bg-primary-glow/25 blur-2xl" />
        <div className="absolute bottom-6 left-10 h-12 w-12 rounded-lg bg-foreground/10 border border-border/40" />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-background via-lavender-wash/20 to-primary-glow/20">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.65),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.45),transparent_22%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.3),transparent_26%)]" />
        <div className="absolute left-4 right-4 top-12 h-28 rounded-full border border-background/60 bg-background/30 backdrop-blur-sm" />
        <div className="absolute left-8 top-20 h-3 w-2/3 rounded-full bg-primary-glow/40" />
        <div className="absolute left-12 top-28 h-3 w-1/2 rounded-full bg-foreground/15" />
        <div className="absolute left-16 top-36 h-3 w-3/5 rounded-full bg-accent/40" />
        <div className="absolute right-12 top-10 h-24 w-24 rounded-full border border-foreground/10 bg-primary-glow/20" />
        <div className="absolute right-24 bottom-16 h-16 w-16 rounded-full bg-foreground/10 blur-[1px]" />
        <div className="absolute left-10 bottom-8 right-10 h-10 rounded-full bg-gradient-to-r from-pink-wash/30 via-primary-glow/30 to-accent/20 blur-lg" />
      </div>
    );
  }

  return (
    <div className="relative h-72 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-pink-wash/20">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_24%_24%,rgba(255,255,255,0.75),transparent_18%),radial-gradient(circle_at_77%_28%,rgba(255,255,255,0.45),transparent_18%),radial-gradient(circle_at_58%_72%,rgba(255,255,255,0.35),transparent_28%)]" />
      <div className="absolute left-8 top-8 h-16 w-16 rounded-full bg-primary-glow/30" />
      <div className="absolute left-28 top-12 h-8 w-32 rounded-full bg-foreground/10" />
      <div className="absolute right-14 top-14 h-20 w-20 rounded-full border border-foreground/10 bg-accent/40" />
      <div className="absolute left-10 top-24 right-10 h-16 rounded-full bg-gradient-to-r from-primary-glow/30 via-pink-wash/30 to-accent/20 blur-md" />
      <div className="absolute left-20 bottom-16 h-24 w-24 rounded-full bg-foreground/8" />
      <div className="absolute right-12 bottom-10 h-14 w-48 rounded-full bg-primary/15" />
      <div className="absolute inset-x-12 bottom-8 h-1 rounded-full bg-foreground/10" />
    </div>
  );
}

function PostCard({ post, index }: { post: (typeof posts)[number]; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      custom={index + 1}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-[0_10px_30px_-24px_rgba(0,0,0,0.18)]"
    >
      <ArtBlock index={index} />
      <div className="space-y-4 p-6 md:p-7">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-foreground/75">
            <post.icon className="h-3.5 w-3.5" />
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {post.date}
          </span>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl md:text-[1.8rem] font-semibold tracking-tight leading-tight text-foreground">
            {post.title}
          </h2>
          <p className="text-sm md:text-base leading-7 text-muted-foreground">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between pt-2 text-sm">
          <span className="text-muted-foreground">{post.readTime}</span>
          <span className="inline-flex items-center gap-2 font-medium text-foreground transition-transform group-hover:translate-x-0.5">
            Read more
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function BlogPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-primary-glow/10 via-transparent to-transparent pointer-events-none" />
      <Nav />
      <div className="relative overflow-hidden pb-16">
        <Hero />
        <FilterBar />
        <SectionShell>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard key={post.title} post={post} index={index} />
            ))}
          </div>
        </SectionShell>
        <SectionShell>
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={4}
            className="mt-16 rounded-[2rem] border border-border/60 bg-muted/40 p-8 md:p-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5" />
                  New posts soon
                </div>
                <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  Want product notes and security updates in your inbox?
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  We&apos;ll keep publishing short posts about Wisps&apos;s product direction,
                  trust model, and the systems behind the inbox.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition-opacity"
              >
                Subscribe for updates
                <FileText className="h-4 w-4" />
              </a>
            </div>
          </motion.section>
        </SectionShell>
      </div>
      <Footer />
    </main>
  );
}
