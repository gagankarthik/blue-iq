"use client";

import { motion } from "framer-motion";
import { MoveRight, ArrowUpRight } from "lucide-react";
import { UI } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import Magnetic from "@/components/Magnetic";

type Action = { label: string; href: string; external?: boolean };

/* deterministic small-pixel constellation, brighter toward the right edge (SSR-safe) */
const CB_COLS = 34, CB_ROWS = 22;
const CB_PIX: { c: number; r: number; o: number }[] = (() => {
  const arr: { c: number; r: number; o: number }[] = [];
  for (let r = 0; r < CB_ROWS; r++) for (let c = 0; c < CB_COLS; c++) {
    if (Math.sin(r * 1.4 + c * 0.8) + Math.cos(c * 0.6 - r * 1.1) < 0.55) continue;
    const o = Math.round(Math.min(0.85, 0.12 + (c / CB_COLS) * 0.8) * 1000) / 1000;
    arr.push({ c, r, o });
  }
  return arr;
})();

/**
 * Site-wide closing CTA. A warm near-black band paired with an on-brand
 * pixel-circuit panel (no external imagery). Reused on every page.
 */
export default function CtaBand({
  eyebrow = "Let's talk",
  title,
  text,
  primary = { label: "Talk to us", href: "/contact" },
  secondary,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  primary?: Action;
  secondary?: Action;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24">
      <Reveal className="max-w-[1280px] mx-auto">
        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[2rem] grid lg:grid-cols-2" style={{ background: "#14120D", minHeight: 360 }}>
          {/* copy */}
          <div className="relative z-10 px-8 sm:px-14 py-14 sm:py-20 flex flex-col justify-center">
            <span className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue3 }}>{eyebrow}</span>
            <h2 className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.03]" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", color: "#fff" }}>
              {title}
            </h2>
            <p className="mt-5 font-sans-g leading-relaxed max-w-[44ch]" style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.74)" }}>
              {text}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic href={primary.href} external={primary.external} className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-7 py-3.5 rounded-lg" style={{ background: "#fff", color: UI.blue }}>
                {primary.label} {primary.external ? <ArrowUpRight className="w-4 h-4" strokeWidth={2} /> : <MoveRight className="w-4 h-4" strokeWidth={2} />}
              </Magnetic>
              {secondary && (
                <a href={secondary.href} target={secondary.external ? "_blank" : undefined} rel={secondary.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold text-white px-6 py-3.5 rounded-lg transition-colors hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.32)" }}>
                  {secondary.label} {secondary.external && <ArrowUpRight className="w-4 h-4" strokeWidth={2} />}
                </a>
              )}
            </div>
          </div>

          {/* on-brand pixel-circuit panel */}
          <div aria-hidden className="relative min-h-[200px] lg:min-h-full overflow-hidden">
            <div className="absolute inset-0 bx-blueprint opacity-[0.14]" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(65% 75% at 78% 42%, rgba(44,73,214,0.5), transparent 72%)" }} />
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox={`0 0 ${CB_COLS} ${CB_ROWS}`}>
              {CB_PIX.map((p, i) => (
                <rect key={i} x={p.c + 0.22} y={p.r + 0.22} width="0.5" height="0.5" rx="0.1" fill="#9DB0EE" fillOpacity={p.o} />
              ))}
            </svg>
            {/* left fade so the seam into the copy panel is soft */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #14120D 0%, rgba(20,18,13,0.4) 26%, transparent 60%)" }} />
            <div className="absolute inset-0 lg:hidden" style={{ background: "rgba(20,18,13,0.45)" }} />
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
