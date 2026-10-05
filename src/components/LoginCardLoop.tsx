"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react"; // Change to "framer-motion" if you get an import error
import { Sparkles, Send, Gift, MapPin, Check } from "lucide-react";
import { cn } from "../lib/utils";

export interface CardData {
  id: number;
  title: string;
  prompt: string;
  response: string;
  type: "contextual" | "relationship" | "network";
}

const CARDS: CardData[] = [
  {
    id: 1,
    title: "Contextual Drafting",
    prompt: "Draft a reply to Alex regarding the Q3 proposal.",
    response:
      "Hi Alex, Thanks for sending this over — the proposal looks solid. I'm on board with the revenue-share model, and I think a 90-day pilot makes sense.",
    type: "contextual",
  },
  {
    id: 2,
    title: "Relationship Memory",
    prompt:
      "I want to get a gift for my friend Elizabeth Goodspeed. Can you suggest some gifts she might like?",
    response:
      "Given her experience in the design industry and sharp eye for visual elements, Elizabeth might appreciate:\n- A subscription to Print Magazine\n- A gift card to Kinokuniya.",
    type: "relationship",
  },
  {
    id: 3,
    title: "Network Exploration",
    prompt: "Who should I visit in London? Going for 1 day.",
    response:
      "- Morning: Meet with Laurie Schnidman for breakfast.\n- Lunch: Have lunch with Georgia Glynnsmith.\n- Evening: Attend a show at the West End with Jenny Hepworth.",
    type: "network",
  },
];

type Step = "ENTERING" | "TYPING" | "PROCESSING" | "STREAMING" | "COMPLETED";

function renderExtras(type: CardData["type"]) {
  if (type === "contextual") {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-semibold text-white shadow-xs">
            AR
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-semibold text-foreground leading-tight">
              Alex Rivera
            </span>
            <span className="text-[10px] font-medium text-muted-foreground/75">
              Q3 Proposal • Context
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-1 text-[11px] font-medium text-background shadow-xs">
          <Check className="h-3 w-3 text-emerald-400" />
          <span>Draft Ready</span>
        </div>
      </div>
    );
  }
  if (type === "relationship") {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Elizabeth"
              className="h-7 w-7 rounded-full object-cover ring-2 ring-pink-500/20 shadow-xs"
            />
            <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-semibold text-foreground leading-tight">
              Elizabeth Goodspeed
            </span>
            <span className="text-[10px] font-medium text-muted-foreground/75">
              Relationship Memory
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-pink-50 border border-pink-100 px-2.5 py-0.5 text-[10px] font-semibold text-pink-600">
          <Gift className="h-3 w-3 mr-0.5" />
          <span>Friend</span>
        </div>
      </div>
    );
  }
  if (type === "network") {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2 overflow-hidden py-0.5">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
              alt="Laurie Schnidman"
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-2xs"
            />
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
              alt="Georgia Glynnsmith"
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-2xs"
            />
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
              alt="Jenny Hepworth"
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shadow-2xs"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-foreground leading-tight">
              Laurie, Georgia, Jenny
            </span>
            <span className="text-[10px] font-medium text-muted-foreground/75">
              Network Exploration
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-600">
          <MapPin className="h-3 w-3 mr-0.5" />
          <span>London</span>
        </div>
      </div>
    );
  }
  return null;
}

function AnimatedCardItem({ card, onComplete }: { card: CardData; onComplete: () => void }) {
  const [step, setStep] = useState<Step>("ENTERING");
  const [typedPrompt, setTypedPrompt] = useState("");
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  // Keep a stable ref for onComplete to prevent re-renders from resetting timers
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const lines = useMemo(() => card.response.split("\n"), [card.response]);

  const lineWordData = useMemo(() => {
    let runningCount = 0;
    return lines.map((line) => {
      const words = line.trim().split(/\s+/).filter(Boolean);
      const startIdx = runningCount;
      runningCount += words.length;
      const isBullet = words[0] === "-" || words[0] === "•";
      const cleanWords = isBullet ? words.slice(1) : words;
      return {
        originalLine: line,
        words: cleanWords,
        startIdx: isBullet ? startIdx + 1 : startIdx,
        endIdx: runningCount,
        isBullet,
        totalWordsInLine: cleanWords.length,
      };
    });
  }, [lines]);

  const totalWords = useMemo(() => {
    return lineWordData.reduce(
      (acc, l) => acc + (l.isBullet ? l.words.length + 1 : l.words.length),
      0,
    );
  }, [lineWordData]);

  // 1. ENTERING -> TYPING
  useEffect(() => {
    if (step === "ENTERING") {
      const timer = setTimeout(() => {
        setStep("TYPING");
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // 2. TYPING -> PROCESSING
  useEffect(() => {
    if (step === "TYPING") {
      let charIndex = 0;
      const fullPrompt = card.prompt;
      const interval = setInterval(() => {
        charIndex++;
        setTypedPrompt(fullPrompt.slice(0, charIndex));
        if (charIndex >= fullPrompt.length) {
          clearInterval(interval);
          setStep("PROCESSING");
        }
      }, 16);
      return () => clearInterval(interval);
    }
  }, [step, card.prompt]);

  // 3. PROCESSING -> STREAMING
  useEffect(() => {
    if (step === "PROCESSING") {
      const timer = setTimeout(() => {
        setStep("STREAMING");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // 4. STREAMING -> COMPLETED
  useEffect(() => {
    if (step === "STREAMING") {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setVisibleWordCount(count);
        if (count >= totalWords) {
          clearInterval(interval);
          setStep("COMPLETED");
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [step, totalWords]);

  useEffect(() => {
    if (step === "COMPLETED") {
      setVisibleWordCount(totalWords);
    }
  }, [step, totalWords]);

  // 5. COMPLETED -> Next Card (Hold exactly 4 seconds)
  useEffect(() => {
    if (step === "COMPLETED") {
      const timer = setTimeout(() => {
        onCompleteRef.current();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl bg-white border border-black/[0.06] shadow-xl shadow-black/[0.1] overflow-hidden flex flex-col justify-between min-h-[280px]"
    >
      {/* macOS Window Header */}
      <div className="relative flex items-center justify-between px-5 py-3 border-b border-black/[0.05] bg-gradient-to-b from-white to-neutral-50/70 select-none">
        <div className="flex gap-1.5 z-10">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] shadow-3xs border border-black/[0.05]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] shadow-3xs border border-black/[0.05]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28C840] shadow-3xs border border-black/[0.05]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[11px] text-muted-foreground/80 font-medium tracking-tight">
            {card.title}
          </span>
        </div>
        <div className="w-10 flex justify-end items-center gap-1 z-10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono text-muted-foreground/60">AI</span>
        </div>
      </div>

      {/* User Prompt Section */}
      <div className="px-5 pt-3.5 pb-3 border-b border-black/[0.04] bg-neutral-50/40">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md bg-foreground text-background text-[9px] font-bold shadow-3xs">
            P
          </div>
          <div className="flex-1 min-h-[38px]">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
                Prompt
              </span>
              {step === "TYPING" && (
                <span className="text-[10px] text-indigo-500/80 font-mono animate-pulse">
                  typing...
                </span>
              )}
            </div>
            <p className="text-[13px] font-medium text-foreground/90 leading-snug">
              {typedPrompt}
              {step === "TYPING" && (
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    times: [0, 0.5, 0.5, 1],
                    ease: "linear",
                  }}
                  className="inline-block w-[2px] h-[13px] bg-foreground ml-0.5 align-middle -mt-0.5"
                />
              )}
            </p>
          </div>
        </div>
      </div>

      {/* AI Response Section */}
      <div className="flex-1 px-5 py-3.5 flex flex-col justify-between gap-3">
        <div>
          {/* AI Header */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-md bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-2xs">
              <Sparkles className="h-2.5 w-2.5" />
            </div>
            <span className="text-[11px] font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Dotie AI
            </span>
            {step === "PROCESSING" && (
              <span className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground/70 font-medium">
                <span>thinking</span>
                <span className="flex gap-0.5 ml-0.5">
                  <span className="h-1 w-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1 w-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1 w-1 rounded-full bg-indigo-500 animate-bounce" />
                </span>
              </span>
            )}
          </div>

          {/* Lines Container */}
          <div className="space-y-1.5 min-h-[60px]">
            {(step === "STREAMING" || step === "COMPLETED") &&
              lineWordData.map((lineData, lineIdx) => {
                const visibleWordsInLine = Math.max(
                  0,
                  Math.min(lineData.words.length, visibleWordCount - lineData.startIdx),
                );
                if (visibleWordsInLine === 0 && step !== "COMPLETED") return null;

                const wordsToShow =
                  step === "COMPLETED"
                    ? lineData.words
                    : lineData.words.slice(0, visibleWordsInLine);

                return (
                  <motion.div
                    key={lineIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={cn(
                      "text-[13px] text-foreground/85 leading-[1.6]",
                      lineData.isBullet ? "flex items-start pl-1" : "",
                    )}
                  >
                    {lineData.isBullet && (
                      <span className="mr-2 inline-flex h-5 w-4 shrink-0 items-center justify-center text-muted-foreground/70 font-bold select-none">
                        •
                      </span>
                    )}
                    <span className="flex-1 inline">
                      {wordsToShow.map((word, wIdx) => (
                        <motion.span
                          key={`${lineData.startIdx}-${wIdx}`}
                          initial={{ opacity: 0, filter: "blur(2px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          transition={{ duration: 0.15 }}
                          className="inline-block mr-1 last:mr-0"
                        >
                          {word}
                        </motion.span>
                      ))}
                      {step === "STREAMING" &&
                        visibleWordCount >= lineData.startIdx &&
                        visibleWordCount <= lineData.endIdx && (
                          <span className="inline-block w-[6px] h-[13px] bg-indigo-500/80 rounded-2xs ml-0.5 animate-pulse align-middle" />
                        )}
                    </span>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* Extras Footer */}
        <div className="pt-2 border-t border-black/[0.04]">
          {step === "STREAMING" || step === "COMPLETED" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {renderExtras(card.type)}
            </motion.div>
          ) : (
            <div className="h-[38px] flex items-center justify-center">
              <span className="text-[11px] text-muted-foreground/40 font-medium">
                Waiting for prompt context...
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function LoginCardLoop() {
  const [cardIndex, setCardIndex] = useState(0);

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-full z-10">
      <AnimatePresence mode="wait">
        <AnimatedCardItem
          key={cardIndex}
          card={CARDS[cardIndex]}
          onComplete={() => setCardIndex((prev) => (prev + 1) % CARDS.length)}
        />
      </AnimatePresence>
    </div>
  );
}
