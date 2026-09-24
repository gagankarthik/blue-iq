"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { makeIso, Box, Plane, IsoDefs, TONES } from "@/components/art/iso";

/* ────────────────────────────────────────────────────────────────
   The confidence section — the site's one idea, made touchable.

   Eight fields from one read, drawn as columns whose height is their
   confidence. A translucent plane is the review line. Drag the slider and
   the plane rises; every column that ends beneath it turns amber — those are
   the fields a person will check. It is an illustration you can move, not a
   mock of a screen.

   The scores are illustrative output from a single sample document, and the
   copy says so. The four facts beside it are claims the company already makes.
   ──────────────────────────────────────────────────────────────── */

const SCORES = [0.99, 0.97, 0.71, 0.95, 0.93, 0.86, 0.98, 0.91];
const K = 7; // world units per 1.0 of confidence above the floor
const FLOOR = 0.6;
const hOf = (s: number) => (s - FLOOR) * K;

const iso = makeIso(150, 150, 50);

const Art = memo(function Art({ t }: { t: number }) {
  const z = hOf(t);
  const cols = SCORES.map((s, i) => ({ x: 0.7 + i * 1.02, y: 1.4, h: hOf(s), low: s < t }));
  return (
    <svg viewBox="0 0 560 470" className="w-full h-auto block" role="img" aria-label={`Illustration: eight fields as columns of confidence; ${cols.filter((c) => c.low).length} fall below the review line`}>
      <IsoDefs />
      <Box iso={iso} x={0.2} y={0.8} z={-0.2} w={8.7} d={2.1} h={0.2} tone={{ top: "#F1F5FC", left: "#E0E7F3", right: "#CCD6E8" }} />
      {/* below the line */}
      {cols.map((c, i) => (
        <Box key={`l${i}`} iso={iso} x={c.x} y={c.y} w={0.72} d={0.72} h={Math.min(c.h, z)} tone={c.low ? TONES.amber : TONES.sky} />
      ))}
      {/* the review line */}
      <Plane iso={iso} x={0.2} y={0.8} z={z} w={8.7} d={2.1} fill="#297AFF" opacity={0.12} />
      <Plane iso={iso} x={0.2} y={0.8} z={z} w={8.7} d={2.1} fill="none" stroke="#297AFF" dash="5 5" />
      {/* above the line */}
      {cols.map((c, i) =>
        c.h > z ? <Box key={`u${i}`} iso={iso} x={c.x} y={c.y} z={z} w={0.72} d={0.72} h={c.h - z} tone={TONES.blue} /> : null
      )}
    </svg>
  );
});

const FACTS: [string, string][] = [
  ["200", "documents in one API call"],
  ["<1s", "median time to read a document"],
  ["Every", "field returned with its own score"],
  ["Zero", "fields the engine will guess at"],
];

export default function Confidence() {
  const [t, setT] = useState(0.9);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { margin: "-15%" });

  /* until someone takes the slider, the line breathes up and down on its own */
  useEffect(() => {
    if (touched || reduce || !inView) return;
    const t0 = performance.now();
    const id = setInterval(() => {
      const ph = (performance.now() - t0) / 5200;
      setT(Number((0.895 + 0.075 * Math.sin(ph * Math.PI * 2)).toFixed(2)));
    }, 90);
    return () => clearInterval(id);
  }, [touched, reduce, inView]);
  const low = SCORES.filter((s) => s < t).length;
  const pct = ((t - 0.8) / (0.99 - 0.8)) * 100;

  return (
    <section id="confidence" className="relative px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20" style={{ background: SA.bg2 }} aria-labelledby="conf-h">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-x-16 gap-y-14 items-center">
        <div>
          <SectionHead
            align="stack"
            id="conf-h"
            title="A confidence score on every field"
            sub="Most document AI hands back an answer. Sonar hands back the answer and how sure it is. Set your review line and only the uncertain fields reach your team."
          />
          <Reveal delay={0.1} as="ul" className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
            {FACTS.map(([v, l]) => (
              <li key={l} className="pt-5" style={{ borderTop: `1px solid ${SA.line2}` }}>
                <div className="font-display font-semibold tabular-nums leading-none" style={{ fontSize: "clamp(1.8rem, 2.6vw, 2.3rem)", letterSpacing: "-0.035em", color: SA.ink }}>
                  {v}
                </div>
                <p className="mt-2.5 font-sans-g text-[14.5px] leading-snug" style={{ color: SA.sub }}>
                  {l}
                </p>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.05} className="w-full max-w-[560px] lg:justify-self-end rounded-[24px] p-5 sm:p-7" style={{ background: SA.surface, border: `1px solid ${SA.line}`, boxShadow: "0 30px 60px -40px rgba(10,18,48,0.3)" }}>
          <div ref={box}>
            <Art t={t} />
          </div>
          <div className="mt-4 sm:px-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="review-line" className="font-sans-g text-[14.5px] font-medium" style={{ color: SA.ink }}>
                Review line
              </label>
              <output htmlFor="review-line" className="font-mono-g text-[14px] font-semibold tabular-nums" style={{ color: SA.ink }}>
                {t.toFixed(2)}
              </output>
            </div>
            <input
              id="review-line"
              type="range"
              min={0.8}
              max={0.99}
              step={0.01}
              value={t}
              onChange={(e) => {
                setTouched(true);
                setT(Number(e.target.value));
              }}
              onPointerDown={() => setTouched(true)}
              className="bq-range mt-2"
              style={{ ["--p" as string]: `${pct}%` }}
              aria-describedby="review-count"
            />
            <p id="review-count" aria-live="polite" className="mt-3 flex items-center gap-2 font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: "#F2B53F" }} />
              <span>
                <strong className="font-semibold" style={{ color: SA.ink }}>
                  {low} of {SCORES.length}
                </strong>{" "}
                fields go to a person. The rest go straight to your systems.
              </span>
            </p>
            <p className="mt-2 font-sans-g text-[12.5px]" style={{ color: SA.faint }}>
              Sample scores from one contract. Drag the line to try it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
