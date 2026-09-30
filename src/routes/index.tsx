import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, createContext, useContext } from "react";
import WispsMockup from "../components/WispsMockup";
import WispsSlackMockup from "../components/WispsSlackMockup";
import WispsFeatureMockup from "../components/WispsFeatureMockup";
import { motion } from "motion/react";
import {
  Inbox,
  Sparkles,
  Zap,
  Shield,
  Search,
  Bot,
  Check,
  Star,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Send,
  Clock,
  FileText,
  Trash2,
  MousePointer2,
  Bell,
  Ghost,
  Users,
  Eye,
  Handshake,
  ArrowRight,
  Timer,
  Lock,
  Database,
} from "lucide-react";
import { SiGooglecalendar, SiGmail } from "react-icons/si";
import { Footer } from "../components/Footer";
import { Testimonials } from "../components/Testimonials";
import { Nav } from "../components/Nav";
import { WaitlistModal } from "../components/WaitlistModal";
import { trackEvent } from "../lib/utils";

// Context to share modal open handler across sections
const WaitlistContext = createContext<{ openWaitlist: (location?: string) => void }>({
  openWaitlist: () => { },
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wisps • Cursor for your professional life, inside iMessage" },
      {
        name: "description",
        content:
          "Wisps learns how you write, drafts your replies, and handles the busywork — so you can focus on what matters.",
      },
      { property: "og:title", content: "Wisps — The Copilot for Your Professional Relationships" },
      {
        property: "og:description",
        content: "An AI inbox that learns your tone and handles the busywork.",
      },
    ],
  }),
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Hero() {
  const { openWaitlist } = useContext(WaitlistContext);
  const [activeMockup, setActiveMockup] = useState<'imessage' | 'slack'>('imessage');
  return (
    <section className="relative overflow-hidden min-h-[100dvh] lg:min-h-[85vh] 2xl:min-h-0 2xl:aspect-[16/9] flex items-center justify-center py-24 z-0 bg-textured-paper">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero_mesh_gradient.jpg')",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.2) 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.2) 90%, transparent 100%)",
        }}
      />

      {/* Replaced fixed max-width with clamped fluid width constraints */}
      <div className="relative w-[clamp(320px,92vw,1600px)] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[clamp(3rem,6vw,8rem)] items-center h-full max-w-[1500px]">
        {/* Left Column: Text */}
        <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left z-10 -mt-8 lg:-mt-16">


          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            style={{ fontFamily: 'var(--font-season)', fontWeight: 'inherit' }}
            // Fixed Headline Size
            className="tracking-tighter text-foreground leading-[1.05] text-[64px]"
          >
            Cursor for your professional life, inside iMessage.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            // Fluid Paragraph Size
            className="mt-[clamp(1rem,2vw,1.5rem)] max-w-xl font-medium text-foreground/80 leading-relaxed text-[clamp(1rem,1.2vw+0.25rem,1.25rem)]"
          >
            Wisps learns how you write, drafts your replies, and handles the busywork, so you can focus on what matters.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-[clamp(2rem,3vw,3rem)] flex items-center justify-center lg:justify-start gap-4"
          >
            <a
              href={`sms:${import.meta.env.VITE_LINQ_NUMBER || "+13127195463"}?body=Hi`}
              // Fluid Button Size
              className="inline-flex items-center rounded-full bg-foreground text-background px-[clamp(1.5rem,2.5vw,2.5rem)] py-[clamp(0.75rem,1.25vw,1.25rem)] text-[clamp(0.9rem,1vw,1.1rem)] font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xl shadow-black/10"
            >
              Join Waitlist
            </a>
          </motion.div>
        </div>

        {/* Right Column: Mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="relative flex flex-col items-center justify-center w-full mt-12 lg:mt-0"
        >
          {/* Removed scale hack, fluid width is now handled by components themselves */}
          <div className="flex flex-col items-center w-full origin-center">
            {/* iMessage / Slack toggle — temporarily hidden */}
            {/* <div className="flex items-center p-0.5 mb-2 rounded-full bg-white/70 border border-white/60 dark:bg-black/40 dark:border-white/10 shadow-md backdrop-blur-md z-20 relative translate-y-6 lg:translate-y-12">
              <button
                onClick={() => setActiveMockup('imessage')}
                className={`flex items-center gap-1.5 px-[clamp(0.75rem,1vw,1rem)] py-[clamp(0.35rem,0.5vw,0.5rem)] rounded-full text-[clamp(0.7rem,0.75vw,0.8rem)] font-medium transition-all ${activeMockup === 'imessage'
                  ? 'bg-[#1D1C20] text-white shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/50'
                  }`}
              >
                <img src="/imessage.svg" className="w-[14px] h-[14px] object-contain" alt="iMessage" />
                iMessage
              </button>
              <button
                onClick={() => setActiveMockup('slack')}
                className={`flex items-center gap-1.5 px-[clamp(0.75rem,1vw,1rem)] py-[clamp(0.35rem,0.5vw,0.5rem)] rounded-full text-[clamp(0.7rem,0.75vw,0.8rem)] font-medium transition-all ${activeMockup === 'slack'
                  ? 'bg-[#1D1C20] text-white shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/50'
                  }`}
              >
                <img src="/slack.svg" className="w-[14px] h-[14px] object-contain" alt="Slack" />
                Slack
              </button>
            </div> */}

            <div className="relative w-full flex justify-center z-10">
              <WispsMockup />
              {/* activeMockup === 'imessage' ? <WispsMockup /> : <WispsSlackMockup /> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const heroThreads = [
  {
    id: "tuan",
    from: "Huỳnh Anh Tuấn",
    email: "tuan@breezeway.io",
    subject: "Partnership Opportunity – AI Email",
    preview: "Hi team, I wanted to reach out about…",
    time: "12:21 PM",
    tag: "Important",
    body: [
      "Hi team,",
      "I've been following Wisps and love what you are building. We have an active developer base that uses automated agents, and we'd love to partner to enable Wisps's email tools for them.",
      "Let me know if you have time for a quick intro call next week to discuss details.",
    ],
    chatPrompt: "Draft an enthusiastic acceptance reply proposing Wednesday at 3 PM PST",
    draftLines: [
      "Hi Tuấn,",
      "Thanks for reaching out! This sounds like a great fit. Wisps's MCP native integration makes it super easy for developer agents to query and write emails.",
      "Let's jump on a quick call next week. Would Wednesday at 3 PM PST work for you?",
    ],
  },
  {
    id: "neil",
    from: "Neil Patel",
    email: "neil@npdigital.com",
    subject: "Have you optimized for agents yet?",
    preview: "AI agents are fast becoming the primary consumers of email newsletters...",
    time: "12:07 PM",
    tag: "Newsletter",
    body: [
      "Hey Alex,",
      "AI agents are fast becoming the primary consumers of email newsletters and digests. If your headers and metadata aren't structured cleanly, agents miss key insights.",
      "Would love to share our latest benchmark report on agent readability if you're interested.",
    ],
    chatPrompt: "Draft a concise reply asking for the benchmark report PDF",
    draftLines: [
      "Hi Neil,",
      "Thanks for reaching out! We're actively optimizing Wisps for agent readability, so I'd love to check out the benchmark report.",
      "Please send over the PDF whenever you have a chance.",
    ],
  },
  {
    id: "bi",
    from: "Business Insider",
    email: "news@businessinsider.com",
    subject: "Ending soon — 1 year for only $29",
    preview: "Limited time offer for digital subscribers...",
    time: "12:01 PM",
    tag: "Newsletter",
    body: ["Get unlimited access to tech news and analysis across all your devices..."],
    chatPrompt: "",
    draftLines: [],
  },
];

function InboxMockup() {
  const [selectedId, setSelectedId] = useState("tuan");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "wisps"; text: string }>>([
    {
      sender: "wisps",
      text: "I'm wisps, your email copilot. Ask me to draft a reply, schedule calls, or summarize threads!",
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [visibleDraftLines, setVisibleDraftLines] = useState<string[]>(heroThreads[0].draftLines);
  const [cursorState, setCursorState] = useState<{
    x: number;
    y: number;
    clicking: boolean;
    opacity: number;
  }>({ x: 38, y: 15, clicking: false, opacity: 0 });
  const [clickPulse, setClickPulse] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runSequence = async () => {
      while (!cancelled) {
        // Step 0: Reset to Tuấn email thread
        setSelectedId("tuan");
        setVisibleDraftLines(heroThreads[0].draftLines);
        setChatInput("");
        setMessages([
          {
            sender: "wisps",
            text: "I'm Wisps, your email copilot. Ask me to draft a reply, schedule calls, or summarize threads!",
          },
        ]);
        setCursorState({ x: 38, y: 15, clicking: false, opacity: 0 });
        await sleep(1500);

        // Step 1: Cursor fades in and glides to Neil Patel in email list
        if (cancelled) return;
        setCursorState({ x: 38, y: 15, clicking: false, opacity: 1 });
        await sleep(300);

        if (cancelled) return;
        // Move to Neil Patel row (approx 32% x, 32% y)
        setCursorState({ x: 32, y: 32, clicking: false, opacity: 1 });
        await sleep(700);

        // Step 2: Click Neil Patel row
        if (cancelled) return;
        setCursorState({ x: 32, y: 32, clicking: true, opacity: 1 });
        setClickPulse(true);
        await sleep(180);
        if (cancelled) return;
        setCursorState({ x: 32, y: 32, clicking: false, opacity: 1 });
        setClickPulse(false);
        setSelectedId("neil");
        setVisibleDraftLines([]);
        setMessages([
          {
            sender: "wisps",
            text: "Viewing thread from Neil Patel. What would you like me to draft?",
          },
        ]);
        await sleep(800);

        // Step 3: Cursor glides to Wisps Copilot Chat Input at bottom right
        if (cancelled) return;
        setCursorState({ x: 86, y: 92, clicking: false, opacity: 1 });
        await sleep(800);

        // Step 4: Type instruction into Chat Input
        if (cancelled) return;
        const targetPrompt = heroThreads[1].chatPrompt;
        for (let i = 1; i <= targetPrompt.length; i++) {
          if (cancelled) return;
          setChatInput(targetPrompt.slice(0, i));
          await sleep(28);
        }

        // Step 5: Cursor clicks Send button
        if (cancelled) return;
        await sleep(300);
        setCursorState({ x: 96, y: 92, clicking: true, opacity: 1 });
        setClickPulse(true);
        await sleep(180);
        if (cancelled) return;
        setCursorState({ x: 96, y: 92, clicking: false, opacity: 1 });
        setClickPulse(false);

        // Add user message to chat & show AI generating status
        setChatInput("");
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: targetPrompt },
          { sender: "wisps", text: "Drafting response using Tone Memory..." },
        ]);
        setIsGenerating(true);

        // Fade cursor out while AI works
        setCursorState((prev) => ({ ...prev, opacity: 0 }));
        await sleep(1000);

        if (cancelled) return;
        setIsGenerating(false);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { sender: "wisps", text: "Draft generated and placed in your reply editor below!" },
        ]);

        // Step 6: Type draft lines into view inside email pane
        const targetLines = heroThreads[1].draftLines;
        for (let l = 1; l <= targetLines.length; l++) {
          if (cancelled) return;
          setVisibleDraftLines(targetLines.slice(0, l));
          await sleep(400);
        }

        // Hold completed state for 5.5s
        await sleep(5500);
      }
    };

    void runSequence();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedThread = heroThreads.find((t) => t.id === selectedId) || heroThreads[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
      style={{ perspective: 1400 }}
      className="relative mx-auto mt-10 max-w-7xl"
    >
      <motion.div
        animate={{
          y: clickPulse ? [0, -5, 0] : 0,
          scale: clickPulse ? [1, 1.03, 1] : 1,
          x: clickPulse ? [0, 3, 0, -3, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          repeat: clickPulse ? 1 : 0,
          ease: "easeInOut",
        }}
        className="relative rounded-2xl p-3 md:p-4"
        style={{
          background: "var(--gradient-hero)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div className="rounded-xl overflow-hidden bg-card border border-border/60 flex flex-col h-[560px] relative">
          {/* Animated Mouse Cursor Overlay */}
          <motion.div
            animate={{
              left: `${cursorState.x}%`,
              top: `${cursorState.y}%`,
              scale: cursorState.clicking ? 0.85 : 1,
              opacity: cursorState.opacity,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <MousePointer2 className="h-5 w-5 text-foreground fill-foreground drop-shadow-lg" />
              {cursorState.clicking && (
                <motion.span
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -inset-1 rounded-full border-2 border-primary-glow pointer-events-none"
                />
              )}
            </div>
          </motion.div>

          {/* Window Chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-muted/20">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[oklch(0.72_0.18_25)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.82_0.14_85)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_145)]" />
              <div className="ml-4 flex items-center gap-2 text-xs font-medium text-foreground/70">
                <Mail className="h-3.5 w-3.5" />
                <span>Inbox</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/50 border border-border/60 px-2.5 py-1 rounded-md max-w-xs w-48">
              <Search className="h-3.5 w-3.5" />
              <span>Search mail...</span>
            </div>
          </div>

          {/* 4 Main Panes Layout */}
          <div className="flex flex-1 min-h-0 divide-x divide-border/60">
            {/* Pane 1: Left Navigation Sidebar */}
            <aside className="hidden md:flex flex-col w-44 flex-shrink-0 bg-muted/10 py-3 text-xs text-left">
              <div className="px-3 mb-4">
                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-foreground text-background py-2 font-medium hover:opacity-90 transition-opacity">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Compose</span>
                </button>
              </div>
              <div className="space-y-1 px-2">
                {[
                  { icon: Inbox, label: "Inbox", count: 12, active: true },
                  { icon: Clock, label: "Snoozed" },
                  { icon: Send, label: "Sent" },
                  { icon: FileText, label: "Drafts", count: 3 },
                  { icon: Trash2, label: "Trash" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md font-medium transition-colors ${item.active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="text-[10px] bg-muted-foreground/10 px-1.5 py-0.5 rounded-full text-foreground/80">
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </aside>

            {/* Pane 2: Email List Pane */}
            <section className="flex flex-col w-full md:w-64 lg:w-72 flex-shrink-0 bg-card divide-y divide-border/60 overflow-y-auto">
              {heroThreads.map((r) => {
                const isActive = r.id === selectedId;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`p-3.5 text-xs text-left transition-colors relative cursor-pointer ${isActive ? "bg-muted/50" : "hover:bg-muted/20"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-foreground" />
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-semibold ${isActive ? "text-foreground" : "text-foreground/90"}`}
                      >
                        {r.from}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{r.time}</span>
                    </div>
                    <div className="font-medium text-foreground truncate mb-1">{r.subject}</div>
                    <div className="text-muted-foreground truncate text-[11px]">{r.preview}</div>
                    {r.tag && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="rounded bg-pink-wash/15 text-foreground/90 text-[10px] px-1.5 py-0.5 border border-pink-wash/30 font-medium">
                          {r.tag}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </section>

            {/* Pane 3: Email Thread Detail & AI Draft Pane */}
            <section className="hidden sm:flex flex-col flex-1 bg-muted/5 p-5 overflow-y-auto text-left min-w-0">
              <div className="border-b border-border/60 pb-3 mb-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h3 className="text-xs md:text-sm font-bold text-foreground truncate">
                      {selectedThread.subject}
                    </h3>
                    <div className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <span className="font-medium text-foreground">{selectedThread.from}</span>
                      <span className="truncate">&lt;{selectedThread.email}&gt;</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                    {selectedThread.time}
                  </span>
                </div>
              </div>

              {/* Email Body */}
              <div className="text-xs text-foreground/90 leading-relaxed mb-5 space-y-2">
                {selectedThread.body.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Wisps AI Draft Section */}
              <div className="mt-auto rounded-xl border border-border/70 p-3.5 bg-card relative overflow-hidden shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-foreground" />
                    <span>Drafted by Wisps</span>
                    <span className="text-[10px] font-normal text-muted-foreground">
                      (Tone Memory)
                    </span>
                  </div>
                  <span className="text-[9px] rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 font-medium border border-emerald-500/20 font-sans">
                    {visibleDraftLines.length > 0
                      ? "Ready to send"
                      : isGenerating
                        ? "Generating..."
                        : "Waiting for prompt"}
                  </span>
                </div>

                <div className="text-xs text-foreground/90 leading-relaxed space-y-1.5 min-h-[72px] bg-muted/30 p-3 rounded-lg border border-border/40 font-serif italic">
                  {visibleDraftLines.length > 0 ? (
                    visibleDraftLines.map((line, lIdx) => <p key={lIdx}>{line}</p>)
                  ) : isGenerating ? (
                    <div className="flex items-center gap-2 text-muted-foreground py-2 font-sans not-italic">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-ping" />
                      <span>Drafting customized response...</span>
                    </div>
                  ) : (
                    <p className="text-muted-foreground font-sans not-italic text-[11px]">
                      Use the Wisps Copilot sidebar on the right to prompt a response...
                    </p>
                  )}
                </div>

                {visibleDraftLines.length > 0 && (
                  <div className="flex items-center justify-between text-xs mt-3">
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-3 py-1.5 font-medium text-xs hover:opacity-90 transition-opacity">
                        <span>Approve &amp; Send</span>
                      </button>
                      <button className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 font-medium text-xs text-foreground hover:bg-muted transition-colors">
                        <span>Edit</span>
                      </button>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">⌘Enter</span>
                  </div>
                )}
              </div>
            </section>

            {/* Pane 4: Right Wisps AI Copilot Chat Sidebar */}
            <section className="hidden lg:flex flex-col w-72 shrink-0 bg-card border-l border-border/60 p-4 justify-between text-left">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-foreground text-background flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-foreground tracking-tight">Wisps</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                    AI Active
                  </span>
                </div>

                {/* Messages Chat Stream */}
                <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {messages.map((msg, mIdx) => (
                    <motion.div
                      key={mIdx}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-2.5 rounded-xl text-xs ${msg.sender === "user"
                        ? "bg-foreground text-background ml-4 font-medium"
                        : "bg-muted/40 text-foreground border border-border/50"
                        }`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat Input Box */}
              <div className="pt-3 border-t border-border/60">
                <div className="relative rounded-xl border border-border bg-background p-2 focus-within:border-foreground/50 transition-colors flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={chatInput}
                    placeholder="Ask Wisps to draft or reply..."
                    className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none px-1"
                  />
                  <button
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${chatInput ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                      }`}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Logos() {
  const integrationLogos = [
    { name: "Breezeway", domain: "breezeway.io" },
    { name: "Stripe", domain: "stripe.com" },
    { name: "Slack", domain: "slack.com" },
    { name: "Intuit", domain: "intuit.com" },
    { name: "Zapier", domain: "zapier.com" },
    { name: "Ramp", domain: "ramp.com" },
    { name: "Lodgify", domain: "lodgify.com" },
    { name: "Hostaway", domain: "hostaway.com" },
    { name: "Airbnb", domain: "airbnb.com" },
    { name: "Vrbo", domain: "vrbo.com" },
    { name: "Guesty", domain: "guesty.com" },
    { name: "Hostfully", domain: "hostfully.com" },
  ];
  // Repeat the logos list multiple times so the track is wider than any viewport
  const marqueeLogos = [
    ...integrationLogos,
    ...integrationLogos,
    ...integrationLogos,
    ...integrationLogos,
  ];
  return (
    <section className="overflow-hidden pt-0 pb-16 bg-textured-paper">
      <div>
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground px-6">
          Early users from
        </p>
        <div className="relative mt-10 w-full overflow-hidden py-4">
          {/* Edge fade gradients for premium aesthetic */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#EEE8E0] dark:from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#EEE8E0] dark:from-background to-transparent z-10 pointer-events-none" />

          <div className="flex w-max">
            {/* First sliding track */}
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                ease: "linear",
                duration: 180,
                repeat: Infinity,
              }}
              className="flex items-center gap-20 pr-20 shrink-0"
            >
              {marqueeLogos.map((logo, i) => (
                <span
                  key={`l1-${i}`}
                  className="text-lg md:text-xl font-semibold tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors duration-300 pointer-events-none select-none"
                >
                  {logo.name}
                </span>
              ))}
            </motion.div>

            {/* Second sliding track to maintain seamless loop */}
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                ease: "linear",
                duration: 180,
                repeat: Infinity,
              }}
              className="flex items-center gap-20 pr-20 shrink-0"
              aria-hidden="true"
            >
              {marqueeLogos.map((logo, i) => (
                <span
                  key={`l2-${i}`}
                  className="text-lg md:text-xl font-semibold tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors duration-300 pointer-events-none select-none"
                >
                  {logo.name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "Tone Memory",
    desc: "Wisps studies the way you write and proposes replies that actually sound like you.",
  },
  {
    icon: Inbox,
    title: "One brain, every tool",
    desc: "LinkedIn, Email, and Slack\nWisps remembers every conversation across all of them, so you never explain context twice.",
  },
  {
    icon: Search,
    title: "Ask anything",
    desc: "Ask about any person or conversation — across LinkedIn, email, or Slack — and get the answer instantly.",
  },
  {
    icon: Shield,
    title: "Smart follow-ups",
    desc: "Wisps tracks every relationship — and resurfaces the ones that need you, right when they matter, with a draft ready to go.",
  },
];

const draftVoiceLines = [
  "Hi Sarah,",
  "Thanks for sending the updated deck — the direction feels much sharper now.",
  "I added one thought on positioning and the rollout timeline.",
  "Best,",
  "Alex",
];

const draftThreadContext = [
  {
    sender: "Maya Patel",
    time: "Yesterday at 2:09 PM",
    body: "Did you get a chance to look at the updated deck yet? Curious what you think.",
    initials: "MP",
  },
  {
    sender: "You",
    time: "Today at 1:16 PM",
    body: "Yeah, I went through it this morning. It looks strong overall — want me to tighten slide 6?",
    initials: "A",
  },
];

const autoLabelInbox = [
  {
    sender: "Maya Patel",
    subject: "Revised deck for review",
    preview: "I added the updated slides and tightened the rollout section.",
    time: "9:12 AM",
    label: "Important",
    labelClass: "bg-green-500/15 text-green-600 border-green-500/20",
  },
  {
    sender: "Stripe",
    subject: "Receipt for your March invoice",
    preview: "Your payment was processed successfully for workspace billing.",
    time: "8:41 AM",
    label: "Receipts",
    labelClass: "bg-amber-500/15 text-amber-700 border-amber-500/20",
  },
  {
    sender: "Product Hunt",
    subject: "Your weekly newsletter",
    preview: "Top launches and updates from the community this week.",
    time: "7:22 AM",
    label: "Newsletter",
    labelClass: "bg-sky-500/15 text-sky-700 border-sky-500/20",
  },
  {
    sender: "Charles Lee",
    subject: "Can we move tomorrow’s call?",
    preview: "I’m flexible after 3 PM if that works on your end.",
    time: "6:05 AM",
    label: "Follow-up",
    labelClass: "bg-violet-500/15 text-violet-700 border-violet-500/20",
  },
];

function DraftVoiceAnimation() {
  const [displayLines, setDisplayLines] = useState<string[]>(
    Array.from({ length: draftVoiceLines.length }, () => ""),
  );
  const [activeLine, setActiveLine] = useState(0);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

    const setLineText = (lineIndex: number, text: string) => {
      setDisplayLines((current) => {
        const next = [...current];
        next[lineIndex] = text;
        return next;
      });
    };

    const typeLine = async (lineIndex: number, text: string, speed: number) => {
      setActiveLine(lineIndex);
      for (let index = 1; index <= text.length; index += 1) {
        if (cancelled) {
          return;
        }
        setLineText(lineIndex, text.slice(0, index));
        await sleep(speed);
      }
      await sleep(220);
    };

    const eraseLine = async (lineIndex: number, fromText: string, speed: number) => {
      setActiveLine(lineIndex);
      for (let index = fromText.length; index >= 0; index -= 1) {
        if (cancelled) {
          return;
        }
        setLineText(lineIndex, fromText.slice(0, index));
        await sleep(speed);
      }
      await sleep(160);
    };

    const run = async () => {
      setIsSending(false);
      setDisplayLines(Array.from({ length: draftVoiceLines.length }, () => ""));

      await typeLine(0, draftVoiceLines[0], 52);
      await typeLine(1, draftVoiceLines[1], 24);
      await typeLine(2, draftVoiceLines[2], 22);

      await sleep(700);
      await eraseLine(2, draftVoiceLines[2], 20);
      await typeLine(2, "I added one thought on positioning and the rollout timeline.", 20);
      await sleep(360);
      await typeLine(3, draftVoiceLines[3], 54);
      await typeLine(4, draftVoiceLines[4], 50);
      await sleep(1100);

      if (!cancelled) {
        setActiveLine(-1);
        setIsSending(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-gradient-to-br from-card to-muted/30 border border-border rounded-2xl p-6 w-[26rem] shadow-xl">
        {/* Email Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: isSending
                  ? "0 0 20px rgba(99, 102, 241, 0.3)"
                  : "0 0 10px rgba(99, 102, 241, 0.1)",
              }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-glow/20 to-primary/10 flex items-center justify-center border border-primary-glow/30"
            >
              <Sparkles className="h-5 w-5 text-primary-glow" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">AI Draft</span>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
              </div>
              <span className="text-[10px] text-muted-foreground">Using Tone Memory</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-muted-foreground">
              {isSending ? "Ready to send" : "Drafting..."}
            </div>
            <motion.div
              animate={{
                scale: isSending ? [1, 1.1, 1] : 1,
                backgroundColor: isSending ? "#22c55e" : "#6366f1",
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Email Body */}
        <div className="space-y-4">
          {/* From/To/Subject */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-12">From:</span>
              <span className="text-foreground font-medium">alex@company.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-12">To:</span>
              <span className="text-foreground font-medium">sarah@partner.io</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-12">Subject:</span>
              <span className="text-foreground">Re: Partnership update</span>
            </div>
          </div>

          {/* Context Preview */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-lg bg-muted/30 border border-border/40 p-3"
          >
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
              <span className="font-medium">Thread context</span>
              <span className="text-muted-foreground/60">•</span>
              <span>2 messages</span>
            </div>
            <div className="space-y-2">
              {draftThreadContext.map((message, messageIndex) => (
                <div
                  key={`${message.sender}-${messageIndex}`}
                  className="flex items-start gap-2 text-[10px]"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold shrink-0 ${message.sender === "You"
                      ? "bg-foreground text-background"
                      : "bg-primary/20 text-primary"
                      }`}
                  >
                    {message.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground truncate">{message.sender}</span>
                      <span className="text-muted-foreground/60 truncate">{message.body}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Draft Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="rounded-xl border-2 border-dashed border-border/60 bg-background/50 p-4 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary-glow/5 to-transparent"
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative space-y-2 text-sm leading-relaxed text-foreground">
              {displayLines.map((line, lineIndex) => (
                <motion.div
                  key={`draft-line-${lineIndex}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: lineIndex * 0.1, duration: 0.3 }}
                  className="min-h-[1.5rem] flex items-start"
                >
                  <span className={lineIndex >= 3 ? "font-medium" : ""}>{line}</span>
                  {lineIndex === activeLine && !isSending && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1 inline-block h-4 w-[2px] rounded-full bg-primary-glow align-middle"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isSending ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 10 }}
          transition={{ duration: 0.4 }}
          className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: isSending ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5, repeat: isSending ? Infinity : 0 }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-green-500/30"
            >
              <Check className="h-4 w-4 text-green-500" />
            </motion.div>
            <span className="text-xs text-muted-foreground">
              {isSending ? "Sounds like you" : "Generating..."}
            </span>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-foreground to-foreground/90 px-4 py-2 text-xs font-medium text-background shadow-lg hover:shadow-xl transition-shadow"
          >
            <Send className="h-3.5 w-3.5" />
            Send
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AutoOrganizedInboxAnimation() {
  const [labeledIndex, setLabeledIndex] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);

  const emails = [
    {
      unread: true,
      sender: "Product Hunt",
      subject: "You're featured today!",
      label: "Important",
      time: "3:45 PM",
      badgeStyle:
        "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50",
    },
    {
      unread: true,
      sender: "Figma",
      subject: "Design system updates",
      label: "Work",
      time: "3:15 PM",
      badgeStyle:
        "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/50",
    },
    {
      unread: true,
      sender: "Jira",
      subject: "Sprint review in 30 mins",
      label: "Calendar",
      time: "2:45 PM",
      badgeStyle:
        "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50",
    },
    {
      unread: true,
      sender: "Alex Chen",
      subject: "Q4 Report ready for review",
      label: "Important",
      time: "2:15 PM",
      badgeStyle:
        "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50",
    },
    {
      unread: false,
      sender: "Y Combinator",
      subject: "Demo Day reminder",
      label: "Important",
      time: "2:00 PM",
      badgeStyle:
        "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50",
    },
    {
      unread: false,
      sender: "Sarah Kim",
      subject: "Meeting notes from standup",
      label: "Work",
      time: "1:42 PM",
      badgeStyle:
        "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/50",
    },
    {
      unread: true,
      sender: "Sentry",
      subject: "5 new errors in production",
      label: "Important",
      time: "1:30 PM",
      badgeStyle:
        "bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50",
    },
    {
      unread: false,
      sender: "Calendly",
      subject: "New meeting scheduled",
      label: "Calendar",
      time: "12:00 PM",
      badgeStyle:
        "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50",
    },
    {
      unread: false,
      sender: "Notion",
      subject: "Your weekly digest is ready",
      label: "Newsletter",
      time: "11:30 AM",
      badgeStyle:
        "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
    },
  ];

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runAnimation = async () => {
      while (!cancelled) {
        setIsCompleted(false);
        setLabeledIndex(-1);
        await sleep(500);

        for (let i = 0; i < emails.length; i++) {
          if (cancelled) return;
          setLabeledIndex(i);
          await sleep(650);
        }

        if (cancelled) return;
        setIsCompleted(true);
        await sleep(3500);
      }
    };

    void runAnimation();

    return () => {
      cancelled = true;
    };
  }, [emails.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-lg"
    >
      <div className="bg-card border border-border rounded-2xl p-4 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/60">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-foreground tracking-tight">All Mail</h3>
          </div>
          <motion.div
            animate={isCompleted ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all duration-300 ${isCompleted
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400"
              : "bg-primary-glow/10 text-primary-glow border-primary-glow/30"
              }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-primary-glow animate-pulse"
                }`}
            />
            <span>{isCompleted ? "Inbox One brain, every tool" : "Wisps AI Auto-Labeling..."}</span>
          </motion.div>
        </div>

        {/* Email Rows List */}
        <div className="space-y-1">
          {emails.map((email, index) => {
            const isLabeled = index <= labeledIndex;
            const isProcessing = index === labeledIndex;

            return (
              <motion.div
                key={`${email.sender}-${index}`}
                animate={{
                  backgroundColor: isProcessing ? "var(--accent)" : "transparent",
                }}
                transition={{ duration: 0.2 }}
                className={`relative flex items-center justify-between py-1.5 px-2 rounded-lg border transition-colors ${isProcessing
                  ? "border-primary-glow/40 shadow-sm"
                  : "border-transparent hover:bg-muted/40"
                  }`}
              >
                {/* Left side: Unread dot + Sender + Subject */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                  {/* Blue unread dot */}
                  <div className="w-2 flex justify-center shrink-0">
                    {email.unread ? (
                      <span className="h-2 w-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-transparent" />
                    )}
                  </div>

                  {/* Sender Name */}
                  <span
                    className={`truncate text-xs shrink-0 w-24 ${email.unread
                      ? "font-semibold text-foreground"
                      : "font-medium text-foreground/80"
                      }`}
                  >
                    {email.sender}
                  </span>

                  {/* Subject Line */}
                  <span
                    className={`truncate text-xs flex-1 ${email.unread ? "font-medium text-foreground/90" : "text-muted-foreground"
                      }`}
                  >
                    {email.subject}
                  </span>
                </div>

                {/* Right side: Badge label + Time */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Label slot */}
                  <div className="w-20 flex justify-end items-center h-5">
                    {isLabeled ? (
                      <motion.span
                        initial={{ scale: 0, opacity: 0, y: 3 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${email.badgeStyle}`}
                      >
                        {email.label}
                      </motion.span>
                    ) : isProcessing ? (
                      <div className="flex items-center justify-center h-4 w-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-12 h-3.5 rounded bg-muted/30 border border-border/30 opacity-40" />
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] text-muted-foreground/80 w-14 text-right font-sans">
                    {email.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function AskYourInboxAnimation() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [typedQuery, setTypedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchDemos = [
    {
      query: "Find receipts for last month's SF trip",
      answer: "Found 2 verified expense receipts totaling $592.50 for your San Francisco trip.",
      sources: [
        {
          title: "Delta Air Lines E-Receipt #DL-9482",
          sender: "Delta Air Lines",
          time: "May 18",
          snippet: "Flight receipt confirmed: $480.00 (SFO ➔ JFK) charged to corporate Visa...",
          badge: "Receipt",
        },
        {
          title: "Uber Trip: SFO Airport to Downtown",
          sender: "Uber Receipts",
          time: "May 18",
          snippet: "Ride total: $112.50 — Business travel profile applied automatically...",
          badge: "Receipt",
        },
      ],
    },
    {
      query: "What was the budget approved for Q3 marketing?",
      answer:
        "The approved Q3 marketing budget is $45,000, with $12,000 earmarked for industry events.",
      sources: [
        {
          title: "Q3_Marketing_Budget_Final.pdf",
          sender: "Sarah Miller",
          time: "Yesterday",
          snippet:
            "Total approved budget for Q3 marketing is set at $45,000 across digital and events...",
          badge: "PDF Attachment",
        },
        {
          title: "Re: Event sponsorship allocation",
          sender: "David Chen",
          time: "3 days ago",
          snippet: "Confirmed $12,000 allocated for upcoming industry events in September...",
          badge: "Email Thread",
        },
      ],
    },
  ];

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runLoop = async () => {
      let currentIndex = 0;
      while (!cancelled) {
        setDemoIndex(currentIndex);
        setTypedQuery("");
        setIsSearching(false);
        setShowResults(false);
        await sleep(300);

        const targetQuery = searchDemos[currentIndex].query;
        for (let i = 1; i <= targetQuery.length; i++) {
          if (cancelled) return;
          setTypedQuery(targetQuery.slice(0, i));
          await sleep(30);
        }

        if (cancelled) return;
        setIsSearching(true);
        await sleep(500);

        if (cancelled) return;
        setIsSearching(false);
        setShowResults(true);
        await sleep(4000);

        currentIndex = (currentIndex + 1) % searchDemos.length;
      }
    };

    void runLoop();

    return () => {
      cancelled = true;
    };
  }, []);

  const currentDemo = searchDemos[demoIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-lg"
    >
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        {/* Search Bar Container */}
        <div className="relative rounded-xl border border-pink-wash/50 bg-background p-3.5 shadow-sm mb-4">
          <div className="flex items-center gap-2.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0 text-xs text-foreground font-medium flex items-center">
              <span>{typedQuery}</span>
              {!showResults && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-0.5 inline-block h-4 w-[2px] bg-foreground rounded-full"
                />
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {isSearching ? (
                <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
              ) : (
                <kbd className="hidden sm:inline-block text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground border border-border/60 font-mono">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>
        </div>

        {/* Searching Loader state */}
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 py-6 text-xs text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-ping" />
            <span>Analyzing inbox &amp; attachments...</span>
          </motion.div>
        )}

        {/* AI Answer Synthesis & Source Cards */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            {/* AI Synthesized Answer Card */}
            <div className="rounded-xl border border-pink-wash/40 bg-gradient-to-br from-pink-wash/15 via-background to-lavender-wash/10 p-3.5 shadow-sm text-left">
              <div className="text-[11px] font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                <span>Wisps AI Answer</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed font-medium">
                {currentDemo.answer}
              </p>
            </div>

            {/* Source Citations Title */}
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1 text-left">
              Matched Sources ({currentDemo.sources.length})
            </div>

            {/* Source items */}
            <div className="space-y-2 text-left">
              {currentDemo.sources.map((source, i) => (
                <motion.div
                  key={`${source.title}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.3 }}
                  className="rounded-xl border border-border/60 bg-background/80 p-3 hover:border-border transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="truncate text-xs font-semibold text-foreground">
                        {source.title}
                      </span>
                    </div>
                    <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium border border-border/40">
                      {source.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1.5">
                    <span className="font-medium text-foreground/80">{source.sender}</span>
                    <span>•</span>
                    <span>{source.time}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug truncate">
                    {source.snippet}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// PersonalAssistantAnimation removed — feature moved to RelationshipCopilot section

function FeatureAnimation({ activeFeature }: { activeFeature: number }) {
  const animations = [
    // Tone Memory
    <div className="w-full h-full flex items-center justify-center">
      <DraftVoiceAnimation />
    </div>,
    // One brain, every tool
    <div className="w-full h-full flex items-center justify-center">
      <AutoOrganizedInboxAnimation />
    </div>,
    // Ask anything
    <div className="w-full h-full flex items-center justify-center">
      <AskYourInboxAnimation />
    </div>,
    // Private by default
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="bg-card border border-border rounded-2xl p-6 w-80 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <Shield className="h-8 w-8 text-green-500" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-2 text-center"
          >
            <div className="text-xs font-medium text-foreground">End-to-end encrypted</div>
            <div className="text-[10px] text-muted-foreground">
              Your data never leaves your device
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-4 flex justify-center gap-1"
          >
            {["🔒", "🔒", "🔒"].map((lock, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                className="text-xl"
              >
                {lock}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>,
  ];

  return animations[activeFeature];
}

function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 16000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="features" className="relative py-28 bg-textured-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="grid md:grid-cols-12 gap-12 lg:gap-16 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left side - Title and Feature list */}
          <div className="md:col-span-5 flex flex-col h-full justify-start py-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <h2
                className="text-3xl md:text-4xl font-medium tracking-tight text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Agent that thinks ahead.
              </h2>
            </motion.div>

            <div className="flex flex-col">
              {features.map((f, i) => {
                const isActive = activeFeature === i;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    onClick={() => setActiveFeature(i)}
                    className="py-4 border-b border-border/40 cursor-pointer group"
                  >
                    <div className={`flex items-center gap-3 mb-2 transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/60"}`}>
                      <f.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      <h3 className="text-[17px] font-medium tracking-tight">
                        {f.title}
                      </h3>
                    </div>
                    <p className={`text-[15px] leading-relaxed transition-colors duration-300 ${isActive ? "text-foreground/70" : "text-foreground/30 group-hover:text-foreground/50"}`}>
                      {f.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right side - Animation box with Background Image */}
          <div className="md:col-span-7 relative rounded-3xl overflow-hidden h-full w-full flex items-center justify-center shadow-xl min-h-0">
            {/* Constant Background */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: "url('/featuresbackground.png')" }}
            />
            {/* Overlay to reduce vibrancy and increase contrast for the phone mockup */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-0" />

            {/* Animated Inner Content (Phone Mockup) */}
            <div className="relative z-10 w-full h-full p-6 md:p-8 flex items-center justify-center">
              <WispsFeatureMockup activeIndex={activeFeature} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitalAnimation() {
  const apps = [
    {
      name: "Gmail",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path
            fill="#EA4335"
            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          />
        </svg>
      ),
    },
    {
      name: "Outlook",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path
            fill="#0078D4"
            d="M19.5 3h-15C3.1 3 2 4.1 2 5.5v13C2 19.9 3.1 21 4.5 21h15c1.4 0 2.5-1.1 2.5-2.5v-13C22 4.1 20.9 3 19.5 3zm-15 2h15c.3 0 .5.2.5.5v6.5l-2.5-2-3.5 3-3.5-3-2.5 2V5.5c0-.3.2-.5.5-.5zm15 14h-15c-.3 0-.5-.2-.5-.5v-5.5l2.5-2 3.5 3 3.5-3 2.5 2v5.5c0 .3-.2.5-.5.5z"
          />
        </svg>
      ),
    },
    {
      name: "Calendar",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path
            fill="#4285F4"
            d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"
          />
        </svg>
      ),
    },
    {
      name: "HubSpot",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8">
          <path
            fill="#FF7A59"
            d="M18.164 7.93V5.086a2.572 2.572 0 0 0-2.572-2.572H8.408a2.572 2.572 0 0 0-2.572 2.572v2.844a2.572 2.572 0 0 0 0 5.14v2.844a2.572 2.572 0 0 0 2.572 2.572h7.184a2.572 2.572 0 0 0 2.572-2.572v-2.844a2.572 2.572 0 0 0 0-5.14zM8.408 4.514h7.184a1.572 1.572 0 0 1 1.572 1.572v1.844H6.836V6.086a1.572 1.572 0 0 1 1.572-1.572zm7.184 10.972H8.408a1.572 1.572 0 0 1-1.572-1.572v-1.844h10.328v1.844a1.572 1.572 0 0 1-1.572 1.572zm1.572-4.416H6.836v-3.072h10.328v3.072z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Wisps text */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-card border border-border rounded-full px-6 py-3 shadow-lg"
      >
        <span className="text-lg font-semibold tracking-tight text-foreground">Wisps</span>
      </motion.div>

      {/* Orbiting apps */}
      {apps.map((app, i) => {
        const angle = i * 90 * (Math.PI / 180);
        const radius = 70;

        return (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            className="absolute"
            style={{
              width: 40,
              height: 40,
            }}
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "center center",
              }}
              className="w-full h-full"
            >
              <motion.div
                style={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                  {app.logo}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function FollowUpAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const reminders = [
    { name: "Sarah Chen", subject: "Partnership proposal", days: "2 days ago", status: "No reply" },
    { name: "Marcus Webb", subject: "Contract renewal", days: "5 days ago", status: "Ghosted" },
    { name: "Priya Sharma", subject: "Intro call follow-up", days: "1 day ago", status: "Pending" },
  ];

  return (
    <div className="w-full space-y-2">
      {reminders.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: step === i ? 1.02 : 1,
            borderColor: step === i ? "var(--pink-wash)" : "var(--color-border)",
          }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="flex items-center justify-between p-3 rounded-xl border bg-background/80"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded-full bg-pink-wash/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-foreground">
                {r.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-foreground truncate">{r.subject}</div>
              <div className="text-[10px] text-muted-foreground">
                {r.name} · {r.days}
              </div>
            </div>
          </div>
          <motion.span
            animate={{
              backgroundColor: step === i ? "var(--pink-wash)" : undefined,
              color: step === i ? "var(--foreground)" : undefined,
            }}
            className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium shrink-0"
          >
            {step === i ? "🔔 Ping sent" : r.status}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

function UnifiedInboxAnimation() {
  const accounts = [
    { provider: "Gmail", email: "alex@gmail.com", color: "#EA4335", unread: 12 },
    { provider: "Outlook", email: "alex@company.com", color: "#0078D4", unread: 5 },
    { provider: "Gmail", email: "alex@startup.io", color: "#34A853", unread: 3 },
  ];

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="flex -space-x-2">
          {accounts.map((a, i) => (
            <motion.div
              key={a.provider + i}
              initial={{ opacity: 0, scale: 0, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="h-7 w-7 rounded-full border-2 border-card flex items-center justify-center"
              style={{ backgroundColor: a.color + "20" }}
            >
              <span className="text-[10px] font-bold" style={{ color: a.color }}>
                {a.provider[0]}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[11px] text-muted-foreground"
        >
          3 accounts synced
        </motion.span>
      </div>
      {accounts.map((a, i) => (
        <motion.div
          key={a.email}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
          className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-background/80"
        >
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: a.color }} />
            <div>
              <div className="text-xs font-medium text-foreground">{a.provider}</div>
              <div className="text-[10px] text-muted-foreground">{a.email}</div>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-foreground bg-muted px-2 py-0.5 rounded-full">
            {a.unread}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function GhostTrackerAnimation() {
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const contacts = [
    { name: "Jordan Lee", lastSent: "3 days ago", opens: 4, replied: false },
    { name: "Nina Patel", lastSent: "1 week ago", opens: 0, replied: false },
    { name: "Tom Wilson", lastSent: "2 days ago", opens: 2, replied: true },
  ];

  return (
    <div className="w-full space-y-2">
      {contacts.map((c, i) => (
        <motion.div
          key={c.name}
          animate={{
            borderColor:
              highlightIdx === i
                ? c.replied
                  ? "var(--color-border)"
                  : "var(--pink-wash)"
                : "var(--color-border)",
          }}
          className="flex items-center justify-between p-3 rounded-xl border bg-background/80"
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${c.replied ? "bg-green-500/15" : "bg-pink-wash/20"}`}
            >
              {c.replied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Ghost className="h-3.5 w-3.5 text-foreground/60" />
              )}
            </div>
            <div>
              <div className="text-xs font-medium text-foreground">{c.name}</div>
              <div className="text-[10px] text-muted-foreground">Sent {c.lastSent}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{c.opens} opens</span>
            </div>
            <div
              className={`text-[10px] font-medium mt-0.5 ${c.replied ? "text-green-600" : "text-pink-wash"}`}
            >
              {c.replied ? "Replied ✓" : "No reply"}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function RelationshipIntelAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(4), 3800),
      setTimeout(() => setPhase(0), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase === 0 ? Date.now() : 0]);

  const summaryItems = [
    { label: "Total conversations", value: "47 threads" },
    { label: "Last contacted", value: "2 days ago" },
    { label: "Relationship strength", value: "Strong" },
  ];

  const nextSteps = ["Follow up on Q3 partnership proposal", "Schedule quarterly review call"];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Search bar */}
      <div className="relative mb-4">
        <div className="flex items-center gap-2 p-3 rounded-xl border border-border bg-background/80">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <motion.div className="text-sm text-muted-foreground overflow-hidden">
            {phase >= 1 ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-foreground font-medium"
              >
                Sarah Chen
              </motion.span>
            ) : (
              <span>Search any contact...</span>
            )}
          </motion.div>
        </div>
      </div>

      {/* AI Summary Card */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-2xl p-4 shadow-lg overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60">
            <div className="h-8 w-8 rounded-full bg-pink-wash/20 flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">SC</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Sarah Chen</div>
              <div className="text-[10px] text-muted-foreground">VP of Partnerships, Acme Corp</div>
            </div>
            <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-600 text-[10px] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Strong
            </div>
          </div>

          {/* Summary */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 mb-3"
            >
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">AI Summary: </span>
                Ongoing partnership discussions since Jan 2025. Agreed on co-marketing terms in
                March. Pending: Q3 budget allocation and launch timeline.
              </div>
              <div className="grid grid-cols-3 gap-2">
                {summaryItems.map((item) => (
                  <div key={item.label} className="text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-xs font-semibold text-foreground">{item.value}</div>
                    <div className="text-[9px] text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Next steps */}
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-2 border-t border-border/60"
            >
              <div className="text-[10px] font-semibold text-foreground mb-1.5 flex items-center gap-1">
                <ArrowRight className="h-3 w-3" /> Suggested next steps
              </div>
              {nextSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[11px] text-muted-foreground py-1"
                >
                  <span className="h-1 w-1 rounded-full bg-pink-wash shrink-0" />
                  {step}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

function SmartFollowUpAnimation() {
  const [activeRow, setActiveRow] = useState(-1);

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runLoop = async () => {
      while (!cancelled) {
        for (let i = 0; i < 4; i++) {
          if (cancelled) return;
          setActiveRow(i);
          await sleep(2000);
        }
        if (cancelled) return;
        setActiveRow(-1);
        await sleep(1000);
      }
    };

    void runLoop();
    return () => {
      cancelled = true;
    };
  }, []);

  const emails = [
    {
      who: "Sarah Chen",
      tag: "Follow Up",
      tagColor: "bg-pink-wash/30 text-foreground/80 border-pink-wash/40",
      subj: "Q3 Partnership — next steps?",
      time: "Returns in 2d",
    },
    {
      who: "Me, Patryk",
      tag: "Draft",
      tagColor: "bg-muted text-foreground/70 border-border/60",
      subj: "Re: Budget allocation review",
      time: "AI draft ready",
    },
    {
      who: "Marcus, Jordan",
      tag: "Follow Up",
      tagColor: "bg-pink-wash/30 text-foreground/80 border-pink-wash/40",
      subj: "Contract renewal — awaiting sign",
      time: "Returns in 5h",
    },
    {
      who: "Nina Patel",
      tag: null,
      tagColor: "",
      subj: "Intro call with Acme team",
      time: "3:40 PM",
    },
  ];

  return (
    <div className="w-full">
      {/* Mini inbox header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 text-[10px]">
        <span className="font-semibold text-foreground border-b-2 border-foreground pb-0.5">
          Follow Ups <span className="text-muted-foreground font-normal">3</span>
        </span>
        <span className="text-muted-foreground">Important</span>
        <span className="text-muted-foreground">Drafts</span>
      </div>
      {/* Email rows */}
      <div className="divide-y divide-border/40">
        {emails.map((e, i) => (
          <motion.div
            key={e.subj}
            animate={{
              backgroundColor: activeRow === i ? "var(--accent)" : "transparent",
            }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-[90px_70px_1fr_80px] gap-2 items-center px-3 py-2 text-[11px]"
          >
            <div className="truncate text-foreground/90 font-medium">{e.who}</div>
            <div>
              {e.tag && (
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-medium border ${e.tagColor}`}
                >
                  {e.tag}
                </span>
              )}
            </div>
            <div className="truncate text-foreground/80">{e.subj}</div>
            <div className="text-right text-muted-foreground text-[10px] flex items-center justify-end gap-1">
              {e.tag === "Follow Up" && <Timer className="h-2.5 w-2.5" />}
              <span>{e.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RelationshipCopilot() {
  const copilotFeatures = [
    {
      icon: Bell,
      title: "Never miss a follow-up",
      desc: "Set reminders, track responses, and get pinged when someone ghosts you. Important deals never go cold.",
      animation: <FollowUpAnimation />,
      size: "normal" as const,
    },
    {
      icon: Inbox,
      title: "Unified inbox",
      desc: "Gmail, Outlook, and all your accounts in one place. One view, zero tab-switching.",
      animation: <UnifiedInboxAnimation />,
      size: "normal" as const,
    },
    {
      icon: Handshake,
      title: "Relationship intelligence",
      desc: "Type anyone's name and get the full story — every conversation summarized, what's pending, and what to do next. Your AI-powered CRM, built into your inbox.",
      animation: <RelationshipIntelAnimation />,
      size: "hero" as const,
    },
    {
      icon: Ghost,
      title: "See who's ignoring you",
      desc: "Wisps tracks response patterns and flags who owes you a reply — and for how long.",
      animation: <GhostTrackerAnimation />,
      size: "normal" as const,
    },
    {
      icon: Timer,
      title: "Smart follow-ups",
      desc: "Wisps tracks every relationship — and resurfaces the ones that need you, right when they matter, with a draft ready to go.",
      animation: <SmartFollowUpAnimation />,
      size: "normal" as const,
      bgImage: "/feature-card-1.jpeg",
    },
  ];

  return (
    <section className="relative py-28 bg-textured-paper">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Future of networking .
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Wisps helps you store the important details you don't want to forget:
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {copilotFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col transition-all hover:border-pink-wash/60 hover:shadow-lg overflow-hidden ${feature.size === "hero" ? "md:col-span-2" : ""
                }`}
            >
              {feature.bgImage && (
                <>
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${feature.bgImage}')` }}
                  />
                  <div className="absolute inset-0 z-0 bg-card/70 dark:bg-card/80 backdrop-blur-[2px]" />
                </>
              )}

              {/* Icon + Text */}
              <div
                className={`relative z-10 flex flex-col h-full ${feature.size === "hero" ? "md:flex-row md:gap-10" : ""}`}
              >
                <div className={`${feature.size === "hero" ? "md:w-2/5" : ""} mb-6`}>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
                    {feature.desc}
                  </p>
                </div>

                {/* Animation */}
                <div className={`${feature.size === "hero" ? "md:w-3/5" : ""} mt-auto`}>
                  <div className="rounded-xl bg-muted/30 border border-border/40 p-4 min-h-[180px] flex items-center backdrop-blur-sm">
                    {feature.animation}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataControl() {
  const points = [
    {
      icon: Shield,
      title: "Encryption and access controls",
      desc: "Your data is encrypted in transit and at rest. Access is limited, logged, and audited. We don't read your content except when you request it, for security, or where the law requires it.",
    },
    {
      icon: Lock,
      title: "No selling, no model training",
      desc: "We don't sell, rent, or trade your data. We don't use it to train or improve our providers' AI models. The AI services that process your data are contractually barred from training on it.",
    },
    {
      icon: Database,
      title: "Data control and deletion",
      desc: "Disconnect any integration or close your account at any time from settings. We remove it from active systems within 30 days.",
    }
  ];

  return (
    <section id="data-control" className="relative py-28 bg-textured-paper">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-medium tracking-tight text-foreground max-w-2xl mx-auto text-center"
        >
          You control<br />your data.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-[15px] text-muted-foreground text-center max-w-xl mx-auto leading-relaxed font-medium"
        >
          Wisps reads your email, calendar, and messages to do its job. It's encrypted, it's never sold, it's never used to train AI, and you can delete it whenever you want.
        </motion.p>

        <div className="mt-20 grid md:grid-cols-3 gap-8 md:gap-0 relative">
          {/* Subtle vertical dividers between columns for md+ screens */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-border/50 -translate-x-1/2"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-border/50 -translate-x-1/2"></div>

          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center px-4 md:px-8"
            >
              {/* Graphic Area */}
              <div className="w-full aspect-[16/9] rounded-xl border border-border/60 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden flex items-center justify-center mb-10">
                {/* Concentric Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
                  <div className="w-[120%] aspect-square rounded-full border-[2px] border-[#c98a5e] absolute"></div>
                  <div className="w-[85%] aspect-square rounded-full border-[2px] border-[#c98a5e] absolute"></div>
                  <div className="w-[50%] aspect-square rounded-full border-[2px] border-[#c98a5e] absolute"></div>
                </div>

                {/* Icon in Center */}
                <div className="relative z-10 w-11 h-11 flex items-center justify-center bg-gradient-to-b from-[#ca7e58] to-[#b35d32] rounded-[6px] shadow-[0_4px_12px_rgba(201,138,94,0.4)] text-white">
                  <p.icon className="w-5 h-5" />
                  {i === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[1.5px] h-7 bg-white/90 rotate-45 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-[17px] font-medium tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Free forever",
      price: "$0",
      interval: "",
      annualNote: "",
      features: ["1 workspace", "5 active workflows", "Community support", "Wisps AI starter"],
      cta: "Start free",
      featured: false,
      styles: {
        card: "bg-white dark:bg-card text-black dark:text-foreground border border-gray-200 dark:border-border shadow-sm",
        title: "text-black dark:text-foreground",
        desc: "text-gray-500 dark:text-muted-foreground",
        price: "text-black dark:text-foreground",
        interval: "text-gray-500 dark:text-muted-foreground",
        note: "text-gray-400 dark:text-muted-foreground",
        check: "text-green-600",
        featureText: "text-gray-700 dark:text-foreground/80",
        button: "bg-[#0a0a0a] dark:bg-foreground text-white dark:text-background hover:bg-black dark:hover:bg-foreground/90",
      }
    },
    {
      name: "Pro",
      description: "per user / month",
      price: billingCycle === "monthly" ? "$29" : "$290",
      interval: billingCycle === "monthly" ? "/month" : "/year",
      annualNote: billingCycle === "monthly" ? "Or $290/yr billed annually — 2 months free" : "",
      features: ["Unlimited workflows", "All integrations", "Priority support", "Advanced agents"],
      cta: "Start 14-day trial",
      featured: true,
      styles: {
        card: "bg-[#0a0a0a] text-white shadow-xl scale-100 md:scale-105 z-10",
        title: "text-white",
        desc: "text-gray-400",
        price: "text-white",
        interval: "text-gray-400",
        note: "text-gray-400",
        check: "text-[#D4F826]",
        featureText: "text-gray-200",
        button: "bg-[#D4F826] text-black hover:bg-[#c4e61f]",
      }
    },
    {
      name: "Enterprise",
      description: "Talk to sales",
      price: "Custom",
      interval: "",
      annualNote: "",
      features: ["SSO & SAML", "Audit logs", "Dedicated CSM", "Custom SLAs"],
      cta: "Contact sales",
      featured: false,
      styles: {
        card: "bg-white dark:bg-card text-black dark:text-foreground border border-gray-200 dark:border-border shadow-sm",
        title: "text-black dark:text-foreground",
        desc: "text-gray-500 dark:text-muted-foreground",
        price: "text-black dark:text-foreground",
        interval: "text-gray-500 dark:text-muted-foreground",
        note: "text-gray-400 dark:text-muted-foreground",
        check: "text-green-600",
        featureText: "text-gray-700 dark:text-foreground/80",
        button: "bg-[#0a0a0a] dark:bg-foreground text-white dark:text-background hover:bg-black dark:hover:bg-foreground/90",
      }
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-textured-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm text-primary font-medium">Pricing</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-muted-foreground">Start free. Scale when you're ready.</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full border border-gray-200 dark:border-border bg-white dark:bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${billingCycle === "monthly"
                ? "bg-[#0a0a0a] dark:bg-foreground text-white dark:text-background"
                : "text-gray-500 dark:text-muted-foreground hover:text-black dark:hover:text-foreground"
                }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${billingCycle === "yearly"
                ? "bg-[#0a0a0a] dark:bg-foreground text-white dark:text-background"
                : "text-gray-500 dark:text-muted-foreground hover:text-black dark:hover:text-foreground"
                }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-0 max-w-6xl mx-auto items-center">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative rounded-[2rem] p-8 md:p-10 flex flex-col h-full ${p.styles.card}`}
            >
              {p.featured && (
                <div className="mb-6">
                  <span className="inline-flex rounded-full bg-[#D4F826] text-black text-xs font-bold px-3 py-1">
                    Most popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-2xl font-bold ${p.styles.title}`}>{p.name}</h3>
                {p.description && (
                  <p className={`text-sm mt-2 font-medium ${p.styles.desc}`}>{p.description}</p>
                )}
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-bold tracking-tight ${p.styles.price}`}>{p.price}</span>
                  {p.interval && (
                    <span className={`text-base font-medium mb-1 ${p.styles.interval}`}>{p.interval}</span>
                  )}
                </div>
                {p.annualNote ? (
                  <p className={`text-xs mt-3 ${p.styles.note}`}>{p.annualNote}</p>
                ) : (
                  <p className={`text-xs mt-3 opacity-0`}>Spacer</p> // To keep alignment
                )}
              </div>

              <ul className="flex-1 space-y-4 mb-10">
                {p.features.map((ft) => (
                  <li key={ft} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 shrink-0 ${p.styles.check}`} strokeWidth={2.5} />
                    <span className={`text-sm font-medium ${p.styles.featureText}`}>
                      {ft}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all ${p.styles.button}`}
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { openWaitlist } = useContext(WaitlistContext);
  return (
    <section className="relative py-24 bg-textured-paper">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2
            className="text-5xl md:text-6xl text-foreground font-medium tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Tell your agent what you need
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground max-w-2xl mx-auto font-sans">
            Ask Wisps to draft a reply, find context, schedule a meeting, or follow up. It handles the work across your inbox.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href={`sms:${import.meta.env.VITE_LINQ_NUMBER || "+13127195463"}?body=Hi`}
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-3 text-[14px] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card text-foreground px-8 py-3 text-[14px] font-semibold hover:bg-muted transition-colors"
            >
              Book a demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Index() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const openWaitlist = (location?: string) => {
    trackEvent("join_waitlist_click", {
      event_category: "engagement",
      event_label: location
        ? `${location.toUpperCase()} Join Waitlist Button`
        : "Join Waitlist Button",
      button_location: location || "unknown",
    });
    setIsWaitlistOpen(true);
  };
  const closeWaitlist = () => setIsWaitlistOpen(false);

  return (
    <WaitlistContext.Provider value={{ openWaitlist }}>
      <main className="min-h-screen bg-background text-foreground antialiased">
        <Nav />
        <Hero />
        {/* <Logos /> */}
        <Features />
        <DataControl />
        {/* <RelationshipCopilot /> */}
        {/* Spacer to fill up the space previously occupied by RelationshipCopilot */}
        <div className="min-h-[800px] bg-textured-paper" />
        {/* <Testimonials /> */}
        <CTA />
        <Footer />
      </main>
      <WaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}

// Export the context so Nav can use it too
export { WaitlistContext };
