"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SA } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";
import FlipWords from "@/components/saas/FlipWords";
import { SPRING_SOFT } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   The hero — full-bleed.

   The framed inset plate is gone. The footage now fills the whole first
   screen, edge to edge, and the nav sits on top of it rather than in a strip
   above it: one full image, the bar floating over it, the sentence set in the
   middle. (The nav gets `overDark` from the page so it renders light over the
   film and turns to glass once you scroll past it.)

   Over the film sits a scrim — footage has to be knocked back or type set on
   it is unreadable. Two layers: a vignette that darkens hardest where the
   sentence sits, and a flat wash that guarantees a contrast floor whatever
   frame the loop is on.

   The one moving word is the last one, and it earns its place: Sonar genuinely
   reads contracts and resumes and invoices, so the line lands differently each
   time it turns.
   ──────────────────────────────────────────────────────────────── */

const READS = ["contracts", "resumes", "invoices", "agreements", "paperwork"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING_SOFT },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden text-center"
      style={{ background: "#0B0B0F" }}
      aria-labelledby="hero-h"
    >
      {/* the film, edge to edge */}
      <video
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* the scrim, two layers — a vignette where the type sits, and a floor */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at 50% 46%, rgba(8,9,13,0.62), rgba(8,9,13,0.34) 70%, rgba(8,9,13,0.20))",
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "rgba(8,9,13,0.40)" }} />
      {/* a touch more weight along the very top so the nav always has contrast */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(8,9,13,0.55), transparent)" }}
      />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative z-10 w-full max-w-[980px] px-6 sm:px-10 py-28"
      >
        <motion.h1
          variants={item}
          id="hero-h"
          className="font-display font-medium leading-[0.98]"
          style={{ fontSize: "clamp(2.6rem, 6.4vw, 6.2rem)", letterSpacing: "-0.045em", color: "#FFFFFF" }}
        >
          <span className="block">We build the products</span>
          <span className="block">that read your</span>
          <FlipWords words={READS} style={{ color: "#6C97FF" }} />
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-9 mx-auto font-sans-g leading-[1.65] max-w-[54ch]"
          style={{ fontSize: "1.08rem", color: "rgba(255,255,255,0.74)" }}
        >
          Capture, Spend, and Govern — pre-built on Sonar, the engine that reads a document, scores its own confidence,
          and flags what it cannot read instead of guessing. Packaged for your industry as Campus and Workforce.
        </motion.p>

        <motion.div variants={item} className="mt-11 flex flex-wrap items-center justify-center gap-6">
          <Magnetic
            href="/contact"
            className="group inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-full transition-transform active:scale-[0.97]"
            style={{ background: "#FFFFFF", color: SA.ink }}
          >
            Book a demo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </Magnetic>
          <a
            href="/products"
            className="group inline-flex items-center gap-1.5 px-2 py-3.5 font-sans-g text-[15px] font-semibold"
            style={{ color: "#FFFFFF" }}
          >
            See the suite
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
              style={{ color: "rgba(255,255,255,0.55)" }}
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
