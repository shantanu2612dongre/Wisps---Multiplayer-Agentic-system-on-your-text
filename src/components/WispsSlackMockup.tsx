import React, { useEffect, useRef, useState } from "react";

/**
 * WispsSlackMockup
 * ------------------------------------------------------------------
 * Animated Slack desktop-window mockup for the wisps site. Shows a
 * team channel where people ask wisps for a relationship summary
 * and it answers / drafts / confirms sends. Messages reveal one at
 * a time with a "Wisps is typing…" beat before each bot reply, then
 * the conversation resets and loops.
 *
 * Drop-in usage:
 *   <WispsSlackMockup />
 *
 * Uses the same wisps-logo.png asset as the iMessage mockup —
 * point logoSrc elsewhere if needed:
 *   <WispsSlackMockup logoSrc="/some-other-logo.png" />
 * ------------------------------------------------------------------
 */

const DEFAULT_LOGO_SRC = "/wispsmascot.png";

const CONVERSATION = [
  {
    from: "user",
    name: "Aisha",
    avatar: "aisha",
    text: "hey wisps, catch me up on Marcus before I call him",
  },
  {
    from: "bot",
    text: "last touch was 3 weeks ago — he asked about renewing after Q2, tone's stayed friendly. this time he wants a shorter contract term.",
    reaction: { emoji: "⚡", count: 2 },
  },
  {
    from: "user",
    name: "Priya",
    avatar: "priya",
    text: "did we ever follow up with the investor from March?",
  },
  {
    from: "bot",
    text: "sent a note april 2nd, no reply since. want me to nudge again?",
  },
  {
    from: "user",
    name: "Priya",
    avatar: "priya",
    text: "yes please",
  },
  {
    from: "bot",
    text: "sent ✓",
    reaction: { emoji: "🙏", count: 2 },
  },
];

// Simple illustrated placeholder avatars (not real people) — swap these
// for real teammate photos whenever you have them, via the same slot.
function Avatar({ variant }: { variant: string }) {
  if (variant === "aisha") {
    return (
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <rect width="64" height="64" fill="#e8836b" />
        <circle cx="32" cy="27" r="13" fill="#3a2418" />
        <circle cx="32" cy="29" r="11" fill="#f2c39a" />
        <path d="M19 26c0-9 6-15 13-15s13 6 13 15c-3-3-8-5-13-5s-10 2-13 5z" fill="#3a2418" />
        <circle cx="27" cy="30" r="1.6" fill="#3a2418" />
        <circle cx="37" cy="30" r="1.6" fill="#3a2418" />
        <path d="M27 36c2 2 8 2 10 0" stroke="#3a2418" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M14 64c1-11 8-17 18-17s17 6 18 17z" fill="#8a5a44" />
      </svg>
    );
  }
  if (variant === "priya") {
    return (
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <rect width="64" height="64" fill="#6fb3d2" />
        <path d="M20 44V28c0-7 5-13 12-13s12 6 12 13v16z" fill="#241b14" />
        <circle cx="32" cy="30" r="11" fill="#c98a5e" />
        <path d="M20 24c0-8 6-13 12-13s12 5 12 13c-2-4-7-6-12-6s-10 2-12 6z" fill="#241b14" />
        <path d="M20 26c-2 3-2 7 0 9" stroke="#241b14" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M44 26c2 3 2 7 0 9" stroke="#241b14" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="27" cy="31" r="1.5" fill="#241b14" />
        <circle cx="37" cy="31" r="1.5" fill="#241b14" />
        <path d="M27 37c2 1.6 8 1.6 10 0" stroke="#241b14" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M13 64c1-12 8-18 19-18s18 6 19 18z" fill="#3f2e20" />
      </svg>
    );
  }
  return null;
}

// pre = pause before the message appears; typing = "is typing…" duration
// shown first (0 for user messages, which appear instantly).
const TIMING = [
  { pre: 500, typing: 0 },
  { pre: 500, typing: 1400 },
  { pre: 900, typing: 0 },
  { pre: 500, typing: 1300 },
  { pre: 900, typing: 0 },
  { pre: 450, typing: 1000 },
];

const HOLD_AFTER_LAST = 3200;
const RESET_PAUSE = 800;

const CHANNELS = ["pilots", "deals", "support", "all-wisps", "social"];
const ACTIVE_CHANNEL = "all-wisps";
const DMS = [
  { name: "Wisps", online: true },
  { name: "Priya", online: true },
  { name: "Aisha", online: false },
];

export default function WispsSlackMockup({ logoSrc }: { logoSrc?: string }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const timers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
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
      if (index >= CONVERSATION.length) {
        schedule(() => {
          setVisibleCount(0);
          setTyping(false);
          schedule(() => runStep(0), RESET_PAUSE);
        }, HOLD_AFTER_LAST);
        return;
      }
      const { pre, typing: typingDur } = TIMING[index];
      schedule(() => {
        if (typingDur > 0) {
          setTyping(true);
          schedule(() => {
            setTyping(false);
            setVisibleCount(index + 1);
            runStep(index + 1);
          }, typingDur);
        } else {
          setVisibleCount(index + 1);
          runStep(index + 1);
        }
      }, pre);
    }
    runStep(0);
    return clearAll;
  }, []);

  return (
    <div className="wslack-stage">
      <style>{`
        .wslack-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
        }
        .wslack-window {
          width: clamp(520px, 50vw, 760px);
          background: #16181f;
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 40px 80px -30px rgba(15, 15, 30, 0.55),
            0 0 0 1px rgba(255,255,255,0.06);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }
        .wslack-titlebar {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 11px 16px;
          background: #101218;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .wslack-dots { display: flex; gap: 7px; }
        .wslack-dot { width: 11px; height: 11px; border-radius: 50%; }
        .wslack-dot--r { background: #ff5f57; }
        .wslack-dot--y { background: #febc2e; }
        .wslack-dot--g { background: #28c840; }
        .wslack-titletext {
          font-size: 12.5px;
          color: #8a8d98;
          font-weight: 500;
        }
        .wslack-body {
          display: flex;
          height: min(420px, 66vw);
          min-height: 320px;
        }
        .wslack-sidebar {
          width: 168px;
          flex-shrink: 0;
          background: #191b23;
          padding: 16px 12px;
          border-right: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
        }
        .wslack-workspace {
          font-size: 14px;
          font-weight: 700;
          color: #f1f1f3;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .wslack-caret { color: #6b6e79; font-size: 10px; }
        .wslack-section {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #6b6e79;
          margin: 12px 0 6px;
        }
        .wslack-channel {
          font-size: 12.5px;
          color: #a9acb5;
          padding: 4px 8px;
          border-radius: 5px;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .wslack-channel--active {
          background: #6b6ff0;
          color: #fff;
          font-weight: 600;
        }
        .wslack-dm {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #a9acb5;
          padding: 3px 8px;
          margin-bottom: 2px;
        }
        .wslack-dm-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .wslack-dm-dot--on { background: #2bac76; }
        .wslack-dm-dot--off { background: #4b4e58; }
        .wslack-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .wslack-header {
          padding: 12px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .wslack-header .hash {
          font-size: 14.5px;
          font-weight: 700;
          color: #f1f1f3;
        }
        .wslack-header .members {
          font-size: 11.5px;
          color: #6b6e79;
        }
        .wslack-messages {
          flex: 1;
          padding: 12px 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow: hidden;
        }
        .wslack-msg {
          display: flex;
          gap: 10px;
          animation: wslack-rise 0.28s ease-out;
        }
        @keyframes wslack-rise {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .wslack-avatar {
          width: 30px;
          height: 30px;
          border-radius: 7px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }
        .wslack-avatar--bot {
          background: #fff;
          padding: 5px;
        }
        .wslack-avatar--bot img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .wslack-avatar--photo {
          overflow: hidden;
        }
        .wslack-avatar--photo svg {
          display: block;
        }
        .wslack-avatar--photo {
          padding: 0;
        }
        .wslack-avatar--photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .wslack-msg-body { min-width: 0; }
        .wslack-msg-head {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 2px;
        }
        .wslack-msg-name {
          font-size: 13px;
          font-weight: 700;
          color: #f1f1f3;
        }
        .wslack-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #cfd0ff;
          background: rgba(107,111,240,0.22);
          padding: 1px 5px;
          border-radius: 3px;
        }
        .wslack-msg-time {
          font-size: 11px;
          color: #6b6e79;
        }
        .wslack-msg-text {
          font-size: 13px;
          line-height: 1.45;
          color: #d7d8dd;
        }
        .wslack-reaction {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 11.5px;
          color: #cfd0ff;
          background: rgba(107,111,240,0.16);
          border: 1px solid rgba(107,111,240,0.35);
          border-radius: 11px;
          padding: 2px 8px;
        }
        .wslack-typing {
          font-size: 11.5px;
          color: #6b6e79;
          font-style: italic;
          padding: 0 18px 8px;
          min-height: 16px;
        }
        .wslack-composer {
          margin: 0 18px 14px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 9px 12px;
          font-size: 12.5px;
          color: #6b6e79;
        }
        @media (prefers-reduced-motion: reduce) {
          .wslack-msg { animation: none !important; }
        }
        @media (max-width: 560px) {
          .wslack-sidebar { display: none; }
        }
      `}</style>

      <div className="wslack-window">
        <div className="wslack-titlebar">
          <div className="wslack-dots">
            <span className="wslack-dot wslack-dot--r" />
            <span className="wslack-dot wslack-dot--y" />
            <span className="wslack-dot wslack-dot--g" />
          </div>
          <span className="wslack-titletext">Slack · Wisps</span>
        </div>

        <div className="wslack-body">
          <div className="wslack-sidebar">
            <div className="wslack-workspace">
              Wisps <span className="wslack-caret">▾</span>
            </div>

            <div className="wslack-section">Channels</div>
            {CHANNELS.map((c) => (
              <div
                key={c}
                className={`wslack-channel ${c === ACTIVE_CHANNEL ? "wslack-channel--active" : ""}`}
              >
                # {c}
              </div>
            ))}

            <div className="wslack-section">Direct messages</div>
            {DMS.map((d) => (
              <div className="wslack-dm" key={d.name}>
                <span className={`wslack-dm-dot ${d.online ? "wslack-dm-dot--on" : "wslack-dm-dot--off"}`} />
                {d.name}
              </div>
            ))}
          </div>

          <div className="wslack-main">
            <div className="wslack-header">
              <span className="hash"># {ACTIVE_CHANNEL}</span>
              <span className="members">5 members</span>
            </div>

            <div className="wslack-messages">
              {CONVERSATION.slice(0, visibleCount).map((m, i) => (
                <div className="wslack-msg" key={i}>
                  {m.from === "bot" ? (
                    <div className="wslack-avatar wslack-avatar--bot">
                      <img src={logoSrc || DEFAULT_LOGO_SRC} alt="wisps" />
                    </div>
                  ) : (
                    <div className="wslack-avatar wslack-avatar--photo">
                      <Avatar variant={m.avatar || ""} />
                    </div>
                  )}
                  <div className="wslack-msg-body">
                    <div className="wslack-msg-head">
                      <span className="wslack-msg-name">{m.from === "bot" ? "Wisps" : m.name}</span>
                      {m.from === "bot" && <span className="wslack-badge">APP</span>}
                      <span className="wslack-msg-time">3:5{i} PM</span>
                    </div>
                    <div className="wslack-msg-text">{m.text}</div>
                    {m.reaction && (
                      <div className="wslack-reaction">
                        <span>{m.reaction.emoji}</span>
                        <span>{m.reaction.count}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="wslack-typing">{typing ? "Wisps is typing…" : ""}</div>
            <div className="wslack-composer">Message #{ACTIVE_CHANNEL}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
