"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MoveRight, ChevronDown } from "lucide-react";
import { MZ } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";
import SonarChip from "@/components/maze/SonarChip";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── deterministic pixel-halftone globe (SSR-stable) ── */
const SIZE = 600, C = 300, RG = 258, STEP = 11, SQ = 5;
const cells: { x: number; y: number; o: number }[] = (() => {
  const out: { x: number; y: number; o: number }[] = [];
  for (let y = C - RG; y <= C + RG; y += STEP) {
    for (let x = C - RG; x <= C + RG; x += STEP) {
      const nx = (x - C) / RG, ny = (y - C) / RG;
      const d2 = nx * nx + ny * ny;
      if (d2 > 1) continue;
      const nz = Math.sqrt(1 - d2);
      const lon = Math.atan2(nx, nz) + 0.7;
      const lat = Math.asin(Math.max(-1, Math.min(1, ny)));
      const noise = Math.sin(3 * lon + 1.1) * Math.cos(2.4 * lat) + Math.sin(5.2 * lon) * 0.5 + Math.cos(4.1 * lat + 0.6) * 0.6;
      const shade = 0.4 + 0.6 * nz;
      const o = Math.round((noise > 0.2 ? 0.72 : 0.13) * shade * 1000) / 1000;
      out.push({ x, y, o });
    }
  }
  return out;
})();

const btnDark = "inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-full";
const btnOutline = "inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-full transition-colors";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

function GlobeArt({ fill = MZ.accent }: { fill?: string }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-[min(88vw,620px)] h-auto">
      {cells.map((c, i) => (
        <rect key={i} x={c.x - SQ / 2} y={c.y - SQ / 2} width={SQ} height={SQ} rx="1.5" fill={fill} fillOpacity={c.o} />
      ))}
    </svg>
  );
}

export default function HeroGlobe() {
  const reduce = useReducedMotion();
  const float = reduce ? {} : { animate: { y: [0, -12, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } };
  const drift = reduce ? {} : { animate: { y: [0, -16, 0] }, transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden flex items-center min-h-[92svh] py-28" style={{ background: MZ.bg }} aria-labelledby="hero-h">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none bx-blueprint opacity-[0.5]" />
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[18%] right-[8%] w-[38vw] max-w-[520px] aspect-square rounded-full blur-3xl opacity-40" style={{ background: "radial-gradient(circle, rgba(0,33,129,0.12), transparent 66%)" }} />
        </div>

        <motion.div variants={container} initial="hidden" animate="show"
          className="max-w-[1340px] mx-auto w-full px-5 sm:px-8 grid lg:grid-cols-[1.08fr_0.92fr] gap-y-12 lg:gap-x-16 items-center">
          <div className="max-w-[640px]">
            <motion.h1 variants={item} id="hero-h" className="font-display font-light tracking-[-0.045em] leading-[0.96]" style={{ fontSize: "clamp(2.4rem, 6.5vw, 6rem)", color: MZ.ink }}>
              Turn documents into decisions
            </motion.h1>
            <motion.p variants={item} className="mt-6 font-sans-g leading-relaxed max-w-[42ch]" style={{ fontSize: "clamp(1rem, 2.6vw, 1.2rem)", color: MZ.sub }}>
              In a world moving faster than ever, Blue-IQ reads the resumes, contracts, and invoices your team drowns in, and hands back structured data you can act on.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/products" className={btnOutline} style={{ border: `1px solid ${MZ.line2}`, color: MZ.ink, background: MZ.surface }}>Try Blue-IQ</a>
              <Magnetic href="/contact" className={btnDark} style={{ background: MZ.ink2, color: "#fff" }}>Book a demo <MoveRight className="w-4 h-4" strokeWidth={2} /></Magnetic>
            </motion.div>
          </div>
          <motion.div variants={item} className="hidden lg:flex justify-center">
            <motion.div {...float}><SonarChip /></motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
          <span className="font-sans-g text-[13px] font-medium" style={{ color: MZ.faint }}>Scroll to explore</span>
          <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} style={{ color: MZ.faint }}>
            <ChevronDown className="w-5 h-5" strokeWidth={2} />
          </motion.span>
        </div>
      </section>

      {/* ── GLOBE (dark centerpiece for depth) ── */}
      <section className="relative overflow-hidden flex items-center justify-center min-h-[92svh] py-24" aria-labelledby="globe-h"
        style={{ background: "radial-gradient(125% 100% at 50% 38%, #0e1b57 0%, #0a1234 56%, #06091d 100%)" }}>
        {/* soft blue core glow behind the globe */}
        <div aria-hidden className="absolute inset-0 pointer-events-none grid place-items-center">
          <div className="w-[62vw] max-w-[720px] aspect-square rounded-full blur-3xl opacity-70" style={{ background: "radial-gradient(circle, rgba(74,104,232,0.4), transparent 62%)" }} />
        </div>
        <motion.div {...drift} className="absolute inset-0 grid place-items-center pointer-events-none" aria-hidden>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 1.1, ease }}>
            <GlobeArt fill="#AFC0FF" />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.8, ease }}
          className="relative text-center max-w-[820px] px-4">
          <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[128%] h-[150%] rounded-[50%]"
            style={{ background: "radial-gradient(closest-side, rgba(8,12,32,0.86) 0%, rgba(8,12,32,0.6) 48%, rgba(8,12,32,0) 78%)" }} />
          <h2 id="globe-h" className="relative font-display font-light tracking-[-0.04em] leading-[0.98]" style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.4rem)", color: "#FFFFFF" }}>
            End-to-end document AI.<br />One platform.
          </h2>
          <p className="relative mt-6 font-sans-g leading-relaxed mx-auto max-w-[46ch]" style={{ fontSize: "clamp(1rem, 2.6vw, 1.08rem)", color: "rgba(255,255,255,0.74)" }}>
            Blue-IQ connects every document, product, and team into one place, so the answer keeps pace with the decision that depends on it.
          </p>
        </motion.div>
      </section>
    </>
  );
}
