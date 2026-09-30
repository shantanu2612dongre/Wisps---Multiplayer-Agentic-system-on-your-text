import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Wisps — Reimagining Email for the AI Era" },
      {
        name: "description",
        content:
          "We're building the future of email — an intelligent inbox that learns your tone and handles the busywork.",
      },
      { property: "og:title", content: "About Wisps — Reimagining Email for the AI Era" },
      {
        property: "og:description",
        content: "An AI inbox that learns your tone and handles the busywork.",
      },
    ],
  }),
  component: About,
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
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.02]"
        >
          Our Manifesto
        </motion.h1>
      </div>
    </section>
  );
}

const manifestoPoints = [
  {
    title: "Purpose over productivity",
    description:
      "We don't just want you to process more email. We want you to spend less time in your inbox and more time on work that matters.",
  },
  {
    title: "Human-first AI",
    description:
      "AI should amplify your capabilities, not replace your judgment. Wisps learns from you but always lets you stay in control.",
  },
  {
    title: "Privacy is non-negotiable",
    description:
      "Your emails are personal. We use end-to-end encryption and never train our models on your private communications.",
  },
  {
    title: "Speed matters",
    description:
      "The best tools feel instant. We've built Wisps on a blazing-fast client that opens, scrolls, and searches without delay.",
  },
  {
    title: "Delight in details",
    description:
      "Great software feels magical. We obsess over micro-interactions, animations, and the small moments that make using Wisps enjoyable.",
  },
  {
    title: "Built for teams",
    description:
      "Email is a team sport. Wisps works seamlessly across organizations, with shared workflows and consistent experiences.",
  },
];

function Manifesto() {
  return (
    <section className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="space-y-12">
          {manifestoPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="border-l-2 border-border pl-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {point.title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-primary-glow/10 via-transparent to-transparent pointer-events-none" />
      <Nav />
      <Hero />
      <Manifesto />
      <Footer />
    </main>
  );
}
