"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border bg-background shadow-lg shadow-primary/10 max-w-xs w-full"
                  key={i}
                >
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "Dotie saves me 2 hours every day on email. The AI drafts are indistinguishable from my own writing.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Product Manager",
  },
  {
    text: "The auto-organization feature is incredible. My inbox went from chaos to perfectly sorted in minutes.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    name: "Marcus Johnson",
    role: "Sales Director",
  },
  {
    text: "Finally, an AI that actually learns my voice. My team thought I was writing the drafts myself.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    name: "Emily Rodriguez",
    role: "Marketing Lead",
  },
  {
    text: "The background agents handle all my follow-ups automatically. I never miss a meeting anymore.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    name: "David Kim",
    role: "Engineering Manager",
  },
  {
    text: "Dotie's search is like magic. I can find any email or attachment with just a natural question.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    name: "Lisa Thompson",
    role: "Operations Director",
  },
  {
    text: "The custom rules feature transformed our workflow. Automatic CC routing saves us hours weekly.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "James Wilson",
    role: "CEO",
  },
  {
    text: "Privacy was our main concern. Dotie's end-to-end encryption gave our legal team complete confidence.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    name: "Amanda Foster",
    role: "CTO",
  },
  {
    text: "Setup took 30 seconds. The learning curve is nonexistent. It just works exactly as advertised.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    name: "Ryan Martinez",
    role: "Startup Founder",
  },
  {
    text: "Our response time improved by 60%. Dotie handles the busywork so we can focus on closing deals.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    name: "Jennifer Lee",
    role: "Sales Executive",
  },
];
