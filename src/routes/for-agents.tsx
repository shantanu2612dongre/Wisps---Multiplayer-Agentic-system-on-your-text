import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Plug, Zap, Lock, Code2, Workflow, Boxes, ArrowRight, Check } from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/for-agents")({
  head: () => ({
    meta: [
      { title: "For Agents — Wisps" },
      {
        name: "description",
        content:
          "Your inbox, now a tool call. Connect once and use Wisps from Claude, ChatGPT, Cursor, or any agent via MCP.",
      },
      { property: "og:title", content: "Wisps for Agents" },
      { property: "og:description", content: "Connect once. Use Wisps from any agent." },
    ],
  }),
  component: ForAgentsPage,
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
    <section className="relative overflow-hidden">
      {/* Soft sunrise wash, echoing the Wisps palette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.95 0.045 55) 0%, oklch(0.94 0.04 35) 35%, oklch(0.9 0.06 340) 70%, oklch(0.85 0.08 300) 100%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" /> MCP-ready · Works with any
          agent
        </motion.div>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.02]"
        >
          Your inbox,
          <br />
          now a tool call.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Connect once. Use Wisps from Claude, ChatGPT, Cursor — or any agent that speaks MCP.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <a
            href={`sms:${import.meta.env.VITE_LINQ_NUMBER || "+13127195463"}?body=Hi`}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Started for Free <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#docs"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Read the docs
          </a>
        </motion.div>

        {/* Agent mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-16 mx-auto max-w-3xl rounded-2xl border border-border bg-card overflow-hidden"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/70 bg-muted/40">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="p-10 text-left">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2 text-2xl font-serif tracking-tight text-foreground">
                <span
                  className="h-5 w-5 rounded-sm"
                  style={{ background: "var(--gradient-hero)" }}
                />
                Claude
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-sm text-foreground/90">What’s in my inbox today?</div>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <button className="rounded-md border border-border h-7 w-7 grid place-items-center">
                  +
                </button>
                <div className="flex items-center gap-2">
                  <span>Sonnet 4.6</span>
                  <span className="grid place-items-center h-7 w-7 rounded-md bg-foreground text-background">
                    ↑
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Plug className="h-3.5 w-3.5" /> Connected to{" "}
              <span className="text-foreground font-medium">wisps.inbox</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Agents() {
  const agents = [
    "Claude",
    "ChatGPT",
    "Cursor",
    "Windsurf",
    "Zed",
    "Raycast",
    "Perplexity",
    "Cline",
  ];
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Works everywhere you work
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {agents.map((a, i) => (
            <motion.div
              key={a}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="h-12 rounded-lg border border-border bg-background grid place-items-center text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {a}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const items = [
    {
      icon: Plug,
      title: "Connect once",
      desc: "OAuth into Gmail in seconds — every agent you authorize gets the same secure handle.",
    },
    {
      icon: Zap,
      title: "Real-time tool calls",
      desc: "Read, search, draft, send, snooze, label — exposed as fast, typed tools.",
    },
    {
      icon: Workflow,
      title: "Background agents",
      desc: "Hand off long-running flows: triage, follow-ups, weekly digests, auto-replies.",
    },
    {
      icon: Boxes,
      title: "Structured context",
      desc: "Threads, labels, contacts and drafts returned as clean JSON, not raw HTML.",
    },
    {
      icon: Code2,
      title: "MCP native",
      desc: "Drop into Claude Desktop, Cursor, or any MCP client with one URL.",
    },
    {
      icon: Lock,
      title: "Scoped permissions",
      desc: "Granular per-agent scopes. Revoke anytime. We never train on your data.",
    },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            One inbox. Every agent.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Wisps turns your email into a first-class surface for AI agents — with the safety rails
            to actually let them act.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-2xl border border-border bg-card p-6 hover:bg-muted/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-muted grid place-items-center text-foreground">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-base font-semibold text-foreground">{it.title}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Connect your inbox",
      d: "Authorize Wisps with Gmail in one click. No mailbox copy, no exports.",
    },
    {
      n: "02",
      t: "Add the MCP endpoint",
      d: "Paste a single URL into Claude, Cursor or your own agent runtime.",
    },
    {
      n: "03",
      t: "Let agents act",
      d: "Triage, reply, schedule and follow up — under scopes you control.",
    },
  ];
  return (
    <section className="py-24 bg-muted/30 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-2xl"
        >
          Wired up in under a minute.
        </motion.h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="rounded-2xl border border-border bg-background p-7"
            >
              <div className="text-xs font-semibold tracking-wider text-muted-foreground">
                {s.n}
              </div>
              <div className="mt-3 text-xl font-semibold text-foreground">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeBlock() {
  return (
    <section id="docs" className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            A tool call, not a SDK.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Wisps speaks MCP out of the box. Point any compliant client at the endpoint and the
            tools show up — typed, documented, ready.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground/90">
            {[
              "Typed schemas for every action",
              "Streaming results for long lists",
              "Per-agent rate limits & audit log",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-foreground" /> {x}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="rounded-2xl border border-border overflow-hidden bg-[oklch(0.16_0.01_260)]"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-white/50">claude_desktop_config.json</span>
          </div>
          <pre className="p-6 text-[13px] leading-relaxed text-white/90 overflow-x-auto">
            {`{
  "mcpServers": {
    "wisps": {
      "url": "https://mcp.wisps.inbox/v1",
      "headers": {
        "Authorization": "Bearer sk_live_••••"
      }
    }
  }
}`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden pt-28 pb-0">
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f4f7ff 25%, #e3ecff 55%, #c9ddff 85%, #b6d2ff 100%)",
        }}
      />
      <Cloud className="left-[6%] top-[18%] w-40 opacity-70" delay={0} />
      <Cloud className="left-[78%] top-[10%] w-28 opacity-60" delay={1.2} />
      <Cloud className="left-[68%] top-[34%] w-36 opacity-55" delay={0.6} />
      <Cloud className="left-[14%] top-[42%] w-24 opacity-50" delay={1.8} />
      <Birds className="left-[82%] top-[26%]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-semibold tracking-tight"
          style={{ color: "oklch(0.32 0.18 270)" }}
        >
          Regain focus
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="mt-5 text-lg md:text-xl text-foreground/70 max-w-xl mx-auto"
        >
          Let Wisps handle your inbox so you can focus on what matters most.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="mt-9 flex justify-center"
        >
          <a
            href={`sms:${import.meta.env.VITE_LINQ_NUMBER || "+13127195463"}?body=Hi`}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-white/80 px-6 py-3.5 text-sm font-medium text-foreground shadow-[0_10px_40px_-10px_rgba(80,100,200,0.35)] hover:shadow-[0_14px_50px_-10px_rgba(80,100,200,0.45)] transition-shadow"
          >
            <span className="grid place-items-center h-5 w-5 rounded-sm bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 text-[10px] font-bold text-white">
              M
            </span>
            Get Started for Free
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-20 mx-auto max-w-4xl rounded-t-2xl border border-white/70 bg-white/90 backdrop-blur overflow-hidden text-left"
          style={{ boxShadow: "0 -10px 60px -20px rgba(80,100,200,0.35)" }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border/60 text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
              <img src="/wispsmascot.png" alt="Wisps logo" className="h-3.5 w-3.5 object-contain" />
              Wisps Inbox
            </span>
            <div className="ml-2 flex-1 rounded-md bg-muted/60 px-2.5 py-1 text-muted-foreground">
              Search
            </div>
          </div>
          <div className="grid grid-cols-[160px_1fr]">
            <aside className="border-r border-border/60 py-3 text-xs">
              {[
                "Inbox",
                "Needs Reply",
                "Follow Ups",
                "Starred",
                "Snoozed",
                "Sent",
                "Scheduled",
                "Drafts",
                "Spam",
                "Trash",
              ].map((l, i) => (
                <div
                  key={l}
                  className={`px-4 py-1.5 ${i === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                >
                  {l}
                </div>
              ))}
            </aside>
            <div>
              <div className="flex items-center gap-5 px-4 py-2.5 border-b border-border/60 text-xs">
                <span className="font-semibold text-foreground border-b-2 border-foreground pb-1">
                  Important <span className="text-muted-foreground font-normal">5</span>
                </span>
                <span className="text-muted-foreground">Needs Reply 2</span>
                <span className="text-muted-foreground">Follow ups</span>
                <span className="text-muted-foreground">Newsletters</span>
                <span className="text-muted-foreground">VIP</span>
                <span className="text-muted-foreground">Other</span>
              </div>
              {[
                {
                  who: "me, Jonathan",
                  subj: "Does the Snooze mention go away after some time?",
                  time: "12m",
                },
                { who: "Me, Patryk, Louis", tag: "Draft", subj: "Coffee Machines", time: "1h" },
                {
                  who: "Romaine, Re...Jon",
                  tag: "Follow Up",
                  subj: "Wisps + Anthropic - YC Credits",
                  time: "3h",
                },
                { who: "Arthur, Louis", subj: "Feedback Beta tester", time: "4:50 PM" },
                {
                  who: "me, Joseph, Patryk",
                  tag: "Draft",
                  subj: "Channels rules launch",
                  time: "11:53 AM",
                },
              ].map((r) => (
                <div
                  key={r.subj}
                  className="grid grid-cols-[140px_90px_1fr_60px] gap-3 items-center px-4 py-2 border-b border-border/40 text-xs hover:bg-muted/30"
                >
                  <div className="truncate text-foreground/90">{r.who}</div>
                  <div>
                    {r.tag && (
                      <span className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-muted text-foreground/80">
                        {r.tag}
                      </span>
                    )}
                  </div>
                  <div className="truncate text-foreground/80">{r.subj}</div>
                  <div className="text-right text-muted-foreground">{r.time}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Cloud({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 200 80"
      className={`absolute -z-10 ${className}`}
      initial={{ x: -20 }}
      animate={{ x: [0, 20, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <defs>
        <linearGradient id={`c${delay}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#e6c7e0" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M30,55 C10,55 8,30 30,30 C32,12 60,12 64,28 C70,16 95,18 96,32 C115,28 122,52 102,55 Z"
        fill={`url(#c${delay})`}
      />
    </motion.svg>
  );
}

function Birds({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 120 40"
      className={`absolute -z-10 w-20 text-foreground/40 ${className}`}
      initial={{ x: 0, y: 0 }}
      animate={{ x: [0, 12, 0], y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {[10, 35, 60, 85].map((x, i) => (
        <path
          key={i}
          d={`M${x},20 q5,-6 10,0 q5,-6 10,0`}
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </motion.svg>
  );
}

function ForAgentsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Agents />
      <Capabilities />
      <HowItWorks />
      <CodeBlock />
      <CTA />
      <Footer />
    </main>
  );
}
