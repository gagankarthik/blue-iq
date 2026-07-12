"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SA } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";
import FlipWords from "@/components/saas/FlipWords";
import { SPRING_SOFT } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   The hero.

   The inset plate stays — a rounded frame with a gutter of canvas around
   it, so the page frames the shot rather than the shot swallowing the page.
   That is exactly how the reference (serverobotics.com) opens: footage in a
   frame, the sentence set over it.

   The plate now holds film. Over it sits a scrim — a scrim, not a "dark
   theme": footage has to be knocked back or type set on it is unreadable,
   and the reference darkens its own footage for precisely this reason.

   The one moving element in the copy is the last word, and it earns its
   place: Sonar genuinely reads contracts and resumes and invoices, so the
   line lands differently each time it turns. It is the claim, not an effect
   looking for a home.
   ──────────────────────────────────────────────────────────────── */

const READS = ["contracts", "resumes", "invoices", "agreements", "paperwork"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING_SOFT },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      /* pt matches the bar's height exactly (76px) — it was hard-coded to the
         old 84px, which would have left an 8px seam under a transparent nav */
      className="relative pt-[76px] pb-10 min-h-[100dvh] flex flex-col justify-start sm:justify-center"
      style={{ background: SA.bg }}
      aria-labelledby="hero-h"
    >
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="w-full max-w-[1560px] mx-auto px-3 sm:px-5"
      >
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] flex flex-col items-center justify-center text-center px-6 sm:px-10 py-20 sm:py-24 min-h-[620px] sm:min-h-[min(880px,80vh)]"
          style={{ background: "#0B0B0F" }}
        >
          {/* the film */}
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

          {/* The scrim. Two layers, and both are doing a job:

              a vignette that knocks the footage back hardest where the sentence
              actually sits, and a flat wash that guarantees a contrast floor no
              matter what frame the loop happens to be on. At the 0.85 I first
              set it, the film was invisible and there was no point having it —
              this is tuned so you can see the footage AND read the type. */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 62% at 50% 48%, rgba(8,9,13,0.58), rgba(8,9,13,0.30) 72%, rgba(8,9,13,0.12))",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(8,9,13,0.34)" }}
          />

          <div className="relative w-full max-w-[960px]">
            <h1
              id="hero-h"
              className="font-display font-medium leading-[0.98]"
              style={{ fontSize: "clamp(2.4rem, 5.8vw, 5.8rem)", letterSpacing: "-0.045em", color: "#FFFFFF" }}
            >
              <span className="block">We build the products</span>
              <span className="block">that read your</span>
              {/* a true blue, not the periwinkle it started as — over footage
                  with violet in it, a lifted accent drifts straight into the
                  AI-lilac the brand rules ban */}
              <FlipWords words={READS} style={{ color: "#6C97FF" }} />
            </h1>

            <motion.p
              variants={item}
              className="mt-9 mx-auto font-sans-g leading-[1.65] max-w-[52ch]"
              style={{ fontSize: "1.06rem", color: "rgba(255,255,255,0.72)" }}
            >
              ParsingLab, Govern, and whatever your workflow needs next — every one running on Sonar, the engine that
              reads a document, scores its own confidence, and flags what it cannot read instead of guessing.
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
                className="group inline-flex items-center gap-1.5 font-sans-g text-[15px] font-semibold"
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
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
