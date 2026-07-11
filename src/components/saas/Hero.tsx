"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DK } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";
import Console from "@/components/saas/Console";
import { SPRING_SOFT } from "@/components/saas/motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING_SOFT },
};

const proof: [string, string][] = [
  ["200", "docs / call"],
  ["<1s", "median read"],
  ["100%", "fields scored"],
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* the console settles back as you scroll off it */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotRaw = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rotateX = useSpring(rotRaw, { stiffness: 80, damping: 26, mass: 0.5 });
  const y = useSpring(yRaw, { stiffness: 80, damping: 26, mass: 0.5 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-[84px]"
      style={{ background: DK.bg }}
      aria-labelledby="hero-h"
    >
      {/* the light: one broad wash from above, two slow drifts, then a grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] blur-[120px] opacity-90"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(44,73,214,0.30), transparent 70%)" }}
        />
        <div
          className="sa-aurora-a absolute top-[6%] left-[4%] w-[38vw] h-[38vw] max-w-[520px] max-h-[520px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(91,124,255,0.20), transparent 65%)" }}
        />
        <div
          className="sa-aurora-b absolute top-[2%] right-[2%] w-[34vw] h-[34vw] max-w-[460px] max-h-[460px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(61,220,151,0.08), transparent 65%)" }}
        />
      </div>
      <div aria-hidden className="absolute inset-0 pointer-events-none sa-grid-dark" />

      {/* the hero fades into the light page below it */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${DK.bg})` }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-0">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-y-12 lg:gap-x-14 items-center"
        >
          {/* the pitch, left-aligned */}
          <div className="max-w-[36ch]">
            <motion.a
              variants={item}
              href="/about#sonar"
              className="group inline-flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${DK.border}` }}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-sans-g text-[11px] font-semibold"
                style={{ background: DK.accentSoft, color: DK.accent }}
              >
                Sonar
              </span>
              <span className="font-sans-g text-[13px]" style={{ color: DK.sub }}>
                One engine under every product we ship
              </span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
                style={{ color: DK.faint }}
              />
            </motion.a>

            <motion.h1
              variants={item}
              id="hero-h"
              className="mt-7 font-display font-medium tracking-[-0.04em] leading-[1.02]"
              style={{ fontSize: "clamp(2.5rem, 4.6vw, 3.9rem)", color: DK.ink }}
            >
              We build the products that read your business.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 font-sans-g leading-[1.6] max-w-[44ch]"
              style={{ fontSize: "1.06rem", color: DK.sub }}
            >
              ParsingLab, Govern, and whatever your workflow needs next — every one of them running on Sonar, the engine
              that reads a document and scores its own confidence in each answer it gives back.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic
                href="/contact"
                className="group inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3 rounded-full transition-transform active:scale-[0.97]"
                style={{
                  background: DK.ink,
                  color: DK.bg,
                  boxShadow: "0 8px 30px -8px rgba(255,255,255,0.25)",
                }}
              >
                Book a demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Magnetic>
              <a
                href="/products"
                className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3 rounded-full transition-colors active:scale-[0.97] hover:bg-white/5"
                style={{ border: `1px solid ${DK.borderLift}`, color: DK.ink }}
              >
                See the suite
              </a>
            </motion.div>

            {/* proof, as a hairline row rather than three more boxes */}
            <motion.div
              variants={item}
              className="mt-12 flex items-stretch gap-6 sm:gap-8"
              style={{ borderTop: `1px solid ${DK.border}`, paddingTop: 20 }}
            >
              {proof.map(([v, l], i) => (
                <div key={l} className="flex items-center gap-6 sm:gap-8">
                  {i > 0 && <span className="w-px self-stretch" style={{ background: DK.border }} />}
                  <div>
                    <div className="font-display font-medium tabular-nums leading-none text-[1.5rem]" style={{ color: DK.ink }}>
                      {v}
                    </div>
                    <div className="mt-1.5 font-mono-g text-[10px] uppercase tracking-[0.14em]" style={{ color: DK.faint }}>
                      {l}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* the console, leaning back in space */}
          <motion.div
            variants={item}
            className="relative lg:-mr-8 xl:-mr-16"
            style={{ perspective: 1600 }}
          >
            <motion.div style={reduce ? undefined : { rotateX, y, transformStyle: "preserve-3d" }}>
              <Console />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* the strip that carries the eye out of the hero */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-20 sm:mt-24 pb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          <span className="font-mono-g text-[10px] uppercase tracking-[0.2em]" style={{ color: DK.faint }}>
            SOC 2
          </span>
          <span className="w-1 h-1 rounded-full" style={{ background: DK.border }} />
          <span className="font-mono-g text-[10px] uppercase tracking-[0.2em]" style={{ color: DK.faint }}>
            HIPAA
          </span>
          <span className="w-1 h-1 rounded-full" style={{ background: DK.border }} />
          <span className="font-mono-g text-[10px] uppercase tracking-[0.2em]" style={{ color: DK.faint }}>
            GDPR
          </span>
          <span className="w-1 h-1 rounded-full" style={{ background: DK.border }} />
          <span className="font-mono-g text-[10px] uppercase tracking-[0.2em]" style={{ color: DK.faint }}>
            Zero retention
          </span>
        </motion.div>
      </div>
    </section>
  );
}
