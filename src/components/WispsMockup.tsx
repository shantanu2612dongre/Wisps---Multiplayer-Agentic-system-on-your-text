import React, { useEffect, useRef, useState } from "react";

/**
 * WispsMockup
 * ------------------------------------------------------------------
 * Animated iPhone / iMessage mockup for the wisps hero section.
 * Messages reveal one at a time, with a typing indicator before
 * each "wisps" reply, then the conversation resets and loops.
 *
 * Drop-in usage:
 *   <WispsMockup />
 *
 * Ships with the real wisps mark baked in as a default (assumes
 * wisps-logo.png sits in /public — copy the file we generated
 * alongside this component there). Override per-instance if needed:
 *   <WispsMockup logoSrc="/some-other-logo.png" />
 * ------------------------------------------------------------------
 */

const DEFAULT_LOGO_SRC = "/wispsmascot.png";

const CONVERSATION = [
  { from: "user", text: "hey wisps, what's pending with Mark from dev team" },
  {
    from: "wisps",
    text: "hey — last he confirmed the PR is merged, now waiting on your approval",
  },
  { from: "user", text: "did he say anything about the deploy timeline" },
  {
    from: "wisps",
    text: "yeah, thursday morning if you approve today. want me to draft a reply?",
  },
];

// per-message timing: pre = pause before it appears, typing = typing-bubble
// duration shown first (0 for user messages, which appear instantly).
const TIMING = [
  { pre: 500, typing: 0 },
  { pre: 550, typing: 1300 },
  { pre: 850, typing: 0 },
  { pre: 500, typing: 1500 },
];

const HOLD_AFTER_LAST = 3000;
const RESET_PAUSE = 700;

function TypingBubble() {
  return (
    <div className="wisps-bubble wisps-bubble--wisps wisps-typing">
      <span className="wisps-dot" />
      <span className="wisps-dot" />
      <span className="wisps-dot" />
    </div>
  );
}

export default function WispsMockup({ logoSrc }: { logoSrc?: string }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingFrom, setTypingFrom] = useState<string | null>(null); // 'wisps' | null
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

    function runStep(index: number, elapsed: number) {
      if (index >= CONVERSATION.length) {
        schedule(() => {
          setVisibleCount(0);
          setTypingFrom(null);
          schedule(() => runStep(0, 0), RESET_PAUSE);
        }, HOLD_AFTER_LAST);
        return;
      }

      const { pre, typing } = TIMING[index];
      const msg = CONVERSATION[index];

      schedule(() => {
        if (typing > 0) {
          setTypingFrom(msg.from);
          schedule(() => {
            setTypingFrom(null);
            setVisibleCount(index + 1);
            runStep(index + 1, 0);
          }, typing);
        } else {
          setVisibleCount(index + 1);
          runStep(index + 1, 0);
        }
      }, pre);
    }

    runStep(0, 0);
    return clearAll;
  }, []);

  return (
    <div className="wisps-stage">
      <style>{`
        .wisps-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .wisps-glow {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,143,255,0.35) 0%, rgba(139,143,255,0) 70%);
          filter: blur(10px);
          animation: wisps-breathe 5s ease-in-out infinite;
          z-index: 0;
        }
        @keyframes wisps-breathe {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        .wisps-phone {
          position: relative;
          z-index: 1;
          width: clamp(240px, 22vw, 340px);
          aspect-ratio: 9 / 19.5;
          background:
            linear-gradient(135deg,
              #4a4b50 0%, #3a3a3e 10%,
              #1c1c1e 30%, #0a0a0b 100%);
          border-radius: 62px;
          padding: 9px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.14),
            inset 0 -2px 4px rgba(0,0,0,0.6),
            0 30px 60px -20px rgba(20, 20, 40, 0.5);
        }
        .wisps-btn {
          position: absolute;
          background: linear-gradient(90deg, #dcdde2 0%, #6c6d73 35%, #1b1b1d 100%);
          box-shadow:
            inset 0 1px 1px rgba(255,255,255,0.5),
            inset 0 -1px 1px rgba(0,0,0,0.5);
        }
        .wisps-btn--action {
          left: -5px;
          top: 15%;
          width: 5px;
          height: 22px;
          border-radius: 3px 0 0 3px;
        }
        .wisps-btn--vol-up {
          left: -5px;
          top: 25%;
          width: 5px;
          height: 46px;
          border-radius: 3px 0 0 3px;
        }
        .wisps-btn--vol-down {
          left: -5px;
          top: 34.5%;
          width: 5px;
          height: 46px;
          border-radius: 3px 0 0 3px;
        }
        .wisps-btn--power {
          right: -5px;
          top: 27%;
          width: 5px;
          height: 66px;
          background: linear-gradient(270deg, #dcdde2 0%, #6c6d73 35%, #1b1b1d 100%);
          border-radius: 0 3px 3px 0;
        }
        .wisps-screen {
          position: relative;
          width: 100%;
          height: 100%;
          background: #f5f5f7;
          border-radius: 53px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);
        }
        .wisps-island {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 92px;
          height: 27px;
          background: #0b0b0d;
          border-radius: 20px;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
        }
        .wisps-island-cam {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #3d4a6b, #0a0a0c 70%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
        }
        .wisps-statusbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 22px 4px;
          font-size: 13px;
          font-weight: 600;
          color: #0b0b0d;
        }
        .wisps-statusbar .wisps-icons {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .wisps-header {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 6px 44px 12px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .wisps-back {
          position: absolute;
          left: 14px;
          top: 6px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1c1c1e;
          font-size: 17px;
          line-height: 1;
        }
        .wisps-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .wisps-avatar img {
          width: 66%;
          height: 66%;
          object-fit: contain;
        }
        .wisps-headertext {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.2;
        }
        .wisps-headertext .name {
          font-size: 13px;
          font-weight: 600;
          color: #0b0b0d;
        }
        .wisps-headertext .chevron {
          font-size: 9px;
          color: #9a9aa0;
        }
        .wisps-video {
          position: absolute;
          right: 14px;
          top: 10px;
          color: #007aff;
        }
        .wisps-chat {
          flex: 1;
          padding: 14px 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
        }
        .wisps-bubble {
          max-width: 78%;
          padding: 9px 13px;
          border-radius: 18px;
          font-size: 13.5px;
          line-height: 1.35;
          animation: wisps-rise 0.32s ease-out;
        }
        @keyframes wisps-rise {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .wisps-bubble--user {
          align-self: flex-end;
          background: #007aff;
          color: #fff;
          border-bottom-right-radius: 5px;
        }
        .wisps-bubble--wisps {
          align-self: flex-start;
          background: #e9e9eb;
          color: #0b0b0d;
          border-bottom-left-radius: 5px;
        }
        .wisps-typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 11px 14px;
        }
        .wisps-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9a9aa0;
          animation: wisps-bounce 1.1s infinite ease-in-out;
        }
        .wisps-dot:nth-child(2) { animation-delay: 0.15s; }
        .wisps-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes wisps-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
        .wisps-inputbar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px 16px;
        }
        .wisps-inputpill {
          flex: 1;
          height: 30px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.12);
          background: #fff;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-size: 12.5px;
          color: #9a9aa0;
        }
        @media (prefers-reduced-motion: reduce) {
          .wisps-glow, .wisps-bubble, .wisps-dot {
            animation: none !important;
          }
        }
      `}</style>

      <div className="wisps-glow" />

      <div className="wisps-phone">
        <div className="wisps-btn wisps-btn--action" />
        <div className="wisps-btn wisps-btn--vol-up" />
        <div className="wisps-btn wisps-btn--vol-down" />
        <div className="wisps-btn wisps-btn--power" />
        <div className="wisps-screen">
          <div className="wisps-island">
            <div className="wisps-island-cam" />
          </div>

          <div className="wisps-statusbar">
            <span>9:41</span>
            <span className="wisps-icons">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4.5" y="5" width="3" height="6" rx="0.5"/><rect x="9" y="3" width="3" height="8" rx="0.5"/><rect x="13.5" y="0" width="3" height="11" rx="0.5"/></svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 10.5c.6 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM4.3 6.8a4.5 4.5 0 016.4 0l-1 1a3 3 0 00-4.3 0l-1-1zM2 4.5a7.8 7.8 0 0111 0l-1 1a6.3 6.3 0 00-9 0l-1-1z"/></svg>
              <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="15" height="7" rx="1.2" fill="currentColor"/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.7" fill="currentColor"/></svg>
            </span>
          </div>

          <div className="wisps-header">
            <span className="wisps-back">‹</span>
            <div className="wisps-avatar">
              <img src={logoSrc || DEFAULT_LOGO_SRC} alt="wisps" />
            </div>
            <div className="wisps-headertext">
              <span className="name">wisps</span>
              <span className="chevron">›</span>
            </div>
            <svg className="wisps-video" width="20" height="15" viewBox="0 0 20 15" fill="currentColor">
              <rect x="0" y="1.5" width="13" height="12" rx="2.5" />
              <path d="M13 5.5l6-3.5v11l-6-3.5z" />
            </svg>
          </div>

          <div className="wisps-chat">
            {CONVERSATION.slice(0, visibleCount).map((m, i) => (
              <div
                key={i}
                className={`wisps-bubble wisps-bubble--${m.from === "user" ? "user" : "wisps"}`}
              >
                {m.text}
              </div>
            ))}
            {typingFrom === "wisps" && <TypingBubble />}
          </div>

          <div className="wisps-inputbar">
            <div className="wisps-inputpill">iMessage</div>
          </div>
        </div>
      </div>
    </div>
  );
}
