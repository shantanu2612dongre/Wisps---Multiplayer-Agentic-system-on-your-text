import React, { useEffect, useState, useRef } from "react";



const CONVERSATION = [
  { from: "wisps", text: "hey — linda's been asking about the last PR's git issues" },
  { from: "user", text: "what is it" },
  { from: "wisps", text: "found two: the CI lint step is failing on the auth module, and the migration script conflicts with main" },
  { from: "wisps", text: "want me to let her know?" },
  { from: "user", text: "yes" },
  { from: "wisps", text: "here's what I'd send — \"hey linda, found two issues on the last PR: the CI lint step's failing on auth, and the migration script conflicts with main. want me to open tickets for both?\"" },
];
const SUGGESTIONS = ["Send it", "Let me edit"];


const TIMING = [
  { pre: 600, typing: 1200 },
  { pre: 500, typing: 0 },
  { pre: 500, typing: 1500 },
  { pre: 500, typing: 900 },
  { pre: 700, typing: 0 },
  { pre: 500, typing: 1600 },
];
const HOLD_AFTER_LAST = 3600;
const RESET_PAUSE = 700;

const AUTOPLAY_MS = 4000;

export default function WispsFeatureMockup({ activeIndex }: { activeIndex?: number }) {
  const [internalIndex, setInternalIndex] = useState(0);
  const controlled = typeof activeIndex === "number";
  const index = controlled ? activeIndex : internalIndex;

  useEffect(() => {
    if (controlled) return;
    const id = setInterval(() => {
      setInternalIndex((i) => (i + 1) % 4);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [controlled]);

  return (
    <div className="wfm-wrap">
      <style>{`
        .wfm-wrap {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wfm-phone {
          position: relative;
          height: 100%;
          max-height: 580px;
          aspect-ratio: 9 / 19.5;
          background: linear-gradient(155deg, #3a3a3f, #0b0b0d 40%);
          border-radius: 46px;
          padding: 4px;
          box-sizing: border-box;
          box-shadow:
            0 30px 60px -20px rgba(20, 20, 40, 0.5),
            0 0 0 1px rgba(255,255,255,0.08) inset;
        }
        .wfm-btn {
          position: absolute;
          background: linear-gradient(180deg, #232326, #08080a);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }
        .wfm-btn--action { left: -2px; top: 15%; width: 2px; height: 16px; border-radius: 1px 0 0 1px; }
        .wfm-btn--vol-up { left: -2px; top: 25%; width: 2px; height: 34px; border-radius: 1px 0 0 1px; }
        .wfm-btn--vol-down { left: -2px; top: 34%; width: 2px; height: 34px; border-radius: 1px 0 0 1px; }
        .wfm-btn--power { right: -2px; top: 27%; width: 2px; height: 48px; border-radius: 0 1px 1px 0; }
        .wfm-screen {
          position: relative;
          width: 100%;
          height: 100%;
          background: #f5f5f7;
          border-radius: 40px;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
        }
        .wfm-island {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 68px;
          height: 20px;
          background: #0b0b0d;
          border-radius: 16px;
          z-index: 6;
        }
        .wfm-statusbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px 2px;
          font-size: 11px;
          font-weight: 600;
          color: #0b0b0d;
        }
        .wfm-statusbar .wfm-icons {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .wfm-appbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px 6px;
        }
        .wfm-appbar .title {
          font-size: 15px;
          font-weight: 700;
          color: #0b0b0d;
        }
        .wfm-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 8.5px;
          font-weight: 600;
          color: #2b8a5e;
          background: #e3f5ea;
          padding: 3px 7px;
          border-radius: 10px;
        }
        .wfm-pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2b8a5e;
        }
        .wfm-screens {
          position: relative;
          flex: 1;
          height: calc(100% - 58px);
        }
        .wfm-screen-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.45s ease, transform 0.45s ease;
          pointer-events: none;
          display: flex;
          flex-direction: column;
        }
        .wfm-screen-layer--active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* ---- One brain, every tool ---- */
        .wfm-list { padding: 4px 12px; display: flex; flex-direction: column; gap: 1px; overflow: hidden; }
        .wfm-row { display: flex; align-items: center; gap: 7px; padding: 7px 4px; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .wfm-row--highlight { background: #e9f0fb; border-radius: 8px; }
        .wfm-dot { width: 6px; height: 6px; border-radius: 50%; background: #4c8dff; flex-shrink: 0; }
        .wfm-dot--hidden { background: transparent; }
        .wfm-row-main { flex: 1; min-width: 0; }
        .wfm-row-top { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
        .wfm-sender { font-size: 10.5px; font-weight: 700; color: #0b0b0d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .wfm-time { font-size: 8.5px; color: #9a9aa0; flex-shrink: 0; }
        .wfm-subject { font-size: 9.5px; color: #6b6e79; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .wfm-tag { font-size: 7.5px; font-weight: 700; padding: 1px 6px; border-radius: 6px; margin-top: 2px; display: inline-block; }
        .wfm-tag--important { background: #fde4e1; color: #c8503b; }
        .wfm-tag--work { background: #e2ecfd; color: #3268c9; }
        .wfm-tag--calendar { background: #efe4fb; color: #7f4bcf; }
        .wfm-tag--newsletter { background: #fbecd6; color: #b8791c; }

        
        .wfm-chat {
          flex: 1;
          padding: 10px 10px 6px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          background: #f5f5f7;
        }
        .wfm-chat::-webkit-scrollbar {
          display: none;
        }
        
        .wfm-bubble--user {
          align-self: flex-end;
          background: #007aff;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .wfm-bubble--wisps {
          align-self: flex-start;
          background: #e9e9eb;
          color: #0b0b0d;
          border-bottom-left-radius: 4px;
        }
        
        .wfm-suggestion-chip {
          font-size: 8.5px;
          font-weight: 500;
          color: #007aff;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 4px 8px;
        }
        .wfm-inputbar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px 12px;
          background: #f5f5f7;
        }
        .wfm-inputpill {
          flex: 1;
          height: 24px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.12);
          background: #fff;
          display: flex;
          align-items: center;
          padding: 0 10px;
          font-size: 9px;
          color: #9a9aa0;
        }

        
        /* ---- Chat Header ---- */
        .wfm-chat-header {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 6px 44px 8px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .wfm-back {
          position: absolute;
          left: 10px;
          top: 6px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1c1c1e;
          font-size: 15px;
          line-height: 1;
        }
        .wfm-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .wfm-avatar img {
          width: 66%;
          height: 66%;
          object-fit: contain;
        }
        .wfm-headertext {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.15;
        }
        .wfm-headertext .name {
          font-size: 11px;
          font-weight: 600;
          color: #0b0b0d;
        }
        .wfm-headertext .chevron {
          font-size: 7px;
          color: #9a9aa0;
        }
        .wfm-video {
          position: absolute;
          right: 12px;
          top: 8px;
          color: #007aff;
          width: 15px;
          height: 11px;
        }

        
        @keyframes wfm-rise {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .wfm-bubble {
          max-width: 82%;
          padding: 7px 11px;
          border-radius: 14px;
          font-size: 9.5px;
          line-height: 1.35;
          animation: wfm-rise 0.32s ease-out;
        }
        .wfm-typing {
          display: flex;
          gap: 3px;
          align-items: center;
          padding: 7px 10px;
        }
        .wfm-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #9a9aa0;
          animation: wfm-bounce 1.1s infinite ease-in-out;
        }
        .wfm-dot:nth-child(2) { animation-delay: 0.15s; }
        .wfm-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes wfm-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-2px); opacity: 1; }
        }
        .wfm-suggestions {
          display: flex;
          gap: 4px;
          padding: 0 10px 6px;
          background: #f5f5f7;
          animation: wfm-rise 0.28s ease-out;
        }

        /* ---- Tone Memory ---- */
        .wfm-compose { padding: 10px 14px; display: flex; flex-direction: column; gap: 8px; }
        .wfm-compose-meta { font-size: 9.5px; color: #9a9aa0; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 6px; }
        .wfm-compose-meta b { color: #0b0b0d; font-weight: 600; }
        .wfm-compose-body { font-size: 10px; color: #4a4a4f; line-height: 1.5; }
        .wfm-draft-card { margin-top: 4px; background: #f0eeff; border: 1px solid #d8d4ff; border-radius: 12px; padding: 9px 10px; }
        .wfm-draft-label { display: flex; align-items: center; gap: 5px; font-size: 8.5px; font-weight: 700; color: #6a63e0; margin-bottom: 5px; }
        .wfm-draft-ghost { width: 10px; height: 10px; border-radius: 50%; background: #6a63e0; flex-shrink: 0; }
        .wfm-draft-text { font-size: 9.5px; color: #2c2a3a; line-height: 1.5; }
        .wfm-draft-btn { margin-top: 8px; align-self: flex-start; font-size: 8.5px; font-weight: 700; color: #fff; background: #6a63e0; padding: 5px 11px; border-radius: 8px; }

        /* ---- Ask anything ---- */
        .wfm-ask { padding: 10px 14px; display: flex; flex-direction: column; gap: 10px; }
        .wfm-search-bar { display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 8px 10px; font-size: 10px; color: #0b0b0d; }
        .wfm-search-bar svg { flex-shrink: 0; color: #9a9aa0; }
        .wfm-answer-card { background: #fff; border-radius: 12px; padding: 10px 11px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .wfm-answer-label { font-size: 8px; font-weight: 700; letter-spacing: 0.03em; color: #9a9aa0; text-transform: uppercase; margin-bottom: 5px; }
        .wfm-answer-text { font-size: 10px; color: #2c2a3a; line-height: 1.5; }
        .wfm-answer-src { margin-top: 7px; font-size: 8.5px; color: #6a63e0; font-weight: 600; }

        /* ---- Smart follow-ups ---- */
        .wfm-follow { padding: 10px 14px; display: flex; flex-direction: column; gap: 8px; }
        .wfm-follow-card { background: #fff; border-radius: 12px; padding: 10px 11px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); display: flex; gap: 8px; }
        .wfm-follow-avatar { width: 26px; height: 26px; border-radius: 8px; background: #ffe3d6; color: #c8603a; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
        .wfm-follow-body { min-width: 0; }
        .wfm-follow-name { font-size: 10.5px; font-weight: 700; color: #0b0b0d; }
        .wfm-follow-sub { font-size: 9px; color: #6b6e79; margin-top: 1px; }
        .wfm-follow-badge { display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 8px; font-weight: 700; color: #2b8a5e; background: #e3f5ea; padding: 2px 7px; border-radius: 8px; }

        @media (prefers-reduced-motion: reduce) {
          .wfm-screen-layer { transition: none !important; }
        }
      `}</style>

      <div className="wfm-phone">
        <div className="wfm-btn wfm-btn--action" />
        <div className="wfm-btn wfm-btn--vol-up" />
        <div className="wfm-btn wfm-btn--vol-down" />
        <div className="wfm-btn wfm-btn--power" />

        <div className="wfm-screen">
          <div className="wfm-island" />

          <div className="wfm-statusbar">
            <span>9:41</span>
            <span className="wfm-icons">
              <svg width="14" height="10" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4.5" y="5" width="3" height="6" rx="0.5"/><rect x="9" y="3" width="3" height="8" rx="0.5"/><rect x="13.5" y="0" width="3" height="11" rx="0.5"/></svg>
              <svg width="13" height="10" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 10.5c.6 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM4.3 6.8a4.5 4.5 0 016.4 0l-1 1a3 3 0 00-4.3 0l-1-1zM2 4.5a7.8 7.8 0 0111 0l-1 1a6.3 6.3 0 00-9 0l-1-1z"/></svg>
              <svg width="21" height="10" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="15" height="7" rx="1.2" fill="currentColor"/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.7" fill="currentColor"/></svg>
            </span>
          </div>

          <div className="wfm-screens">
            {/* 0 — Tone Memory */}
            <AnimatedChatScreen active={index === 0} title="wisps" pill="Tone Memory" conversation={CONVERSATION} suggestions={SUGGESTIONS} timing={TIMING} />

            {/* 1 — One brain, every tool */}
            <AnimatedChatScreen active={index === 1} title="wisps" pill="One brain, every tool" conversation={ONE_BRAIN_CONVERSATION} suggestions={ONE_BRAIN_SUGGESTIONS} timing={ONE_BRAIN_TIMING} />

            {/* 2 — Ask anything */}
            <AnimatedChatScreen active={index === 2} title="wisps" pill="Ask anything" conversation={ASK_ANYTHING_CONVERSATION} suggestions={ASK_ANYTHING_SUGGESTIONS} timing={ASK_ANYTHING_TIMING} />

            {/* 3 — Smart follow-ups */}
            <AnimatedChatScreen active={index === 3} title="wisps" pill="Smart follow-ups" conversation={SMART_FOLLOWUP_CONVERSATION} suggestions={SMART_FOLLOWUP_SUGGESTIONS} timing={SMART_FOLLOWUP_TIMING} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Screen({ active, title, pill, hideAppBar, children }: { active: boolean, title: string, pill: string, hideAppBar?: boolean, children: React.ReactNode }) {
  return (
    <div className={`wfm-screen-layer ${active ? "wfm-screen-layer--active" : ""}`}>
      {!hideAppBar && (
        <div className="wfm-appbar">
          <span className="title">{title}</span>
          <span className="wfm-pill">
            <span className="wfm-pill-dot" />
            {pill}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

function Row({ sender, time, subject, tag, dot, highlight }: { sender: string, time: string, subject: string, tag: string, dot?: boolean, highlight?: boolean }) {
  return (
    <div className={`wfm-row ${highlight ? "wfm-row--highlight" : ""}`}>
      <span className={`wfm-dot ${dot ? "" : "wfm-dot--hidden"}`} />
      <div className="wfm-row-main">
        <div className="wfm-row-top">
          <span className="wfm-sender">{sender}</span>
          <span className="wfm-time">{time}</span>
        </div>
        <div className="wfm-subject">{subject}</div>
        <span className={`wfm-tag wfm-tag--${tag}`}>
          {tag === "important" ? "Important" : tag === "work" ? "Work" : tag === "calendar" ? "Calendar" : "Newsletter"}
        </span>
      </div>
    </div>
  );
}


function TypingBubble() {
  return (
    <div className="wfm-bubble wfm-bubble--wisps wfm-typing">
      <span className="wfm-dot" />
      <span className="wfm-dot" />
      <span className="wfm-dot" />
    </div>
  );
}


function AnimatedChatScreen({ active, title, pill, conversation, suggestions, timing }: { active: boolean, title: string, pill: string, conversation: any[], suggestions: string[], timing: any[] }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingFrom, setTypingFrom] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timers = useRef<NodeJS.Timeout[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
       setVisibleCount(0);
       setTypingFrom(null);
       setShowSuggestions(false);
       return;
    }

    function clearAll() {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    }

    function schedule(fn: () => void, delay: number) {
      const id = setTimeout(fn, delay);
      timers.current.push(id);
      return id;
    }

    function runStep(index: number) {
      if (index >= conversation.length) {
        schedule(() => setShowSuggestions(true), 450);
        schedule(() => {
          setVisibleCount(0);
          setTypingFrom(null);
          setShowSuggestions(false);
          schedule(() => runStep(0), RESET_PAUSE);
        }, HOLD_AFTER_LAST);
        return;
      }

      const { pre, typing } = timing[index];
      const msg = conversation[index];

      schedule(() => {
        if (typing > 0) {
          setTypingFrom(msg.from);
          schedule(() => {
            setTypingFrom(null);
            setVisibleCount(index + 1);
            runStep(index + 1);
          }, typing);
        } else {
          setVisibleCount(index + 1);
          runStep(index + 1);
        }
      }, pre);
    }

    runStep(0);
    return clearAll;
  }, [active, conversation, timing]);

  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  }, [visibleCount, typingFrom, showSuggestions]);

  return (
    <Screen active={active} title={title} pill={pill} hideAppBar>
      <div className="wfm-chat-header">
        <span className="wfm-back">‹</span>
        <div className="wfm-avatar">
          <img src="/wispsmascot.png" alt="wisps" />
        </div>
        <div className="wfm-headertext">
          <span className="name">wisps</span>
          <span className="chevron">›</span>
        </div>
        <svg className="wfm-video" viewBox="0 0 20 15" fill="currentColor">
          <rect x="0" y="1.5" width="13" height="12" rx="2.5" />
          <path d="M13 5.5l6-3.5v11l-6-3.5z" />
        </svg>
      </div>
      <div className="wfm-chat" ref={chatRef}>
        {conversation.slice(0, visibleCount).map((m, i) => (
          <div key={i} className={`wfm-bubble wfm-bubble--${m.from}`}>
            {m.text}
          </div>
        ))}
        {typingFrom === "wisps" && <TypingBubble />}
      </div>
      {showSuggestions && (
        <div className="wfm-suggestions">
          {suggestions.map((s) => (
            <span className="wfm-suggestion-chip" key={s}>{s}</span>
          ))}
        </div>
      )}
      <div className="wfm-inputbar">
        <div className="wfm-inputpill">iMessage</div>
      </div>
    </Screen>
  );
}


const ASK_ANYTHING_CONVERSATION = [
  { from: "user", text: "when does our AWS reserved instance renewal come up" },
  { from: "wisps", text: "found it — it's in the invoice AWS sent on July 14th" },
  { from: "wisps", text: "renewal date is Sept 30, auto-renews unless cancelled 7 days before" },
  { from: "wisps", text: "from: billing@aws.com · attachment: invoice-9042.pdf" },
  { from: "user", text: "perfect, thanks" },
];

const ASK_ANYTHING_SUGGESTIONS: string[] = [];

const ASK_ANYTHING_TIMING = [
  { pre: 500, typing: 0 },
  { pre: 600, typing: 1400 },
  { pre: 400, typing: 1600 },
  { pre: 400, typing: 1200 },
  { pre: 1000, typing: 0 },
];


const ONE_BRAIN_CONVERSATION = [
  { from: "wisps", text: "morning — cleared 47 notifications overnight across slack, email, and github" },
  { from: "wisps", text: "newsletters, CI pings, standup bot messages — none of it needed you" },
  { from: "wisps", text: "2 things actually do:" },
  { from: "wisps", text: "1. priya asked on slack if staging's ready for the demo" },
  { from: "wisps", text: "2. github flagged a merge conflict on the pricing-page branch" },
  { from: "user", text: "staging's ready, tell priya" },
  { from: "wisps", text: "sent — \"hey priya, staging's ready whenever you want to walk through it\"" },
];

const ONE_BRAIN_SUGGESTIONS: string[] = [];

const ONE_BRAIN_TIMING = [
  { pre: 500, typing: 1500 },
  { pre: 500, typing: 1200 },
  { pre: 400, typing: 600 },
  { pre: 400, typing: 1400 },
  { pre: 400, typing: 1500 },
  { pre: 1000, typing: 0 },
  { pre: 500, typing: 1600 },
];

const SMART_FOLLOWUP_CONVERSATION = [
  { from: "wisps", text: "hey — remember Sarah from Nimbus? she emailed 3 weeks ago asking about enterprise pricing, never got a reply" },
  { from: "user", text: "oh damn, totally forgot about that" },
  { from: "wisps", text: "she just posted on LinkedIn that they're finalizing a vendor by friday" },
  { from: "wisps", text: "might be worth closing the loop today" },
  { from: "user", text: "yeah, send something" },
  { from: "wisps", text: "here's what I'd send — \"hi sarah, sorry for the delay! here's our enterprise pricing: [link]. happy to hop on a call before friday if that's useful.\"" },
];

const SMART_FOLLOWUP_SUGGESTIONS = ["Use draft", "Edit"];

const SMART_FOLLOWUP_TIMING = [
  { pre: 600, typing: 1500 },
  { pre: 500, typing: 0 },
  { pre: 500, typing: 1200 },
  { pre: 400, typing: 800 },
  { pre: 700, typing: 0 },
  { pre: 500, typing: 1800 },
];


