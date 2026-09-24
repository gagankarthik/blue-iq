"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { SectionHead } from "@/components/saas/parts";
import { EASE } from "@/components/saas/motion";
import { IngestArt, ReadArt, ScoreArt, DeliverArt } from "@/components/art/StepArt";
import { type BqIcon, IconDocs, IconSonar, IconScore, IconApi } from "@/components/icons/BqIcons";

/* ────────────────────────────────────────────────────────────────
   How Sonar works — four steps you can step through.

   Steps on the left, a drawing of the active step on the right. It plays
   on its own while on screen (a bar fills under the active step), and a
   click takes over: the visitor chooses, the timer stops. Copy is one line
   per step, because nobody reads a paragraph in a process diagram.
   ──────────────────────────────────────────────────────────────── */

const STEPS: { Icon: BqIcon; t: string; d: string; Art: React.ComponentType }[] = [
  { Icon: IconDocs, t: "Upload any document", d: "PDFs, Word files, scans or phone photos, up to 200 per API call.", Art: IngestArt },
  { Icon: IconSonar, t: "Sonar reads it", d: "OCR, layout, tables, stamps and handwriting, read in context.", Art: ReadArt },
  { Icon: IconScore, t: "Every field is scored", d: "Values under your review line go to a person, never a guess.", Art: ScoreArt },
  { Icon: IconApi, t: "Clean data lands", d: "Schema-validated JSON into your ATS, ERP, CLM or data warehouse.", Art: DeliverArt },
];

const DUR = 4500;

export default function Pipeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const playing = auto && inView && !reduce;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((v) => (v + 1) % STEPS.length), DUR);
    return () => clearTimeout(t);
  }, [i, playing]);

  const Art = STEPS[i].Art;

  return (
    <section id="how" className="relative px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20" style={{ background: SA.bg }} aria-labelledby="how-h">
      <div className="max-w-[1240px] mx-auto">
        <SectionHead id="how-h" title="How Sonar turns documents into data" sub="Four steps, the same in every Blue-IQ product." />

        <div ref={ref} className="mt-10 sm:mt-12 grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 lg:gap-10 items-stretch">
          <ol role="tablist" aria-label="Steps" className="order-2 lg:order-1 flex flex-col gap-2">
            {STEPS.map((s, k) => {
              const on = k === i;
              return (
                <li key={s.t}>
                  <button
                    role="tab"
                    aria-selected={on}
                    type="button"
                    onClick={() => {
                      setI(k);
                      setAuto(false);
                    }}
                    className="relative w-full text-left rounded-2xl px-5 py-4 sm:py-5 overflow-hidden transition-colors"
                    style={{ background: on ? SA.surface : "transparent", border: `1px solid ${on ? SA.line2 : "transparent"}`, boxShadow: on ? "0 16px 36px -24px rgba(10,18,48,0.3)" : "none" }}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className="shrink-0 grid place-items-center w-11 h-11 rounded-xl transition-colors"
                        style={{ background: on ? SA.accent : SA.surface, color: on ? "#fff" : SA.accent, border: `1px solid ${on ? SA.accent : SA.line}`, ["--duo-o" as string]: on ? "0.25" : "0.14" }}
                      >
                        <s.Icon size={22} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display font-semibold text-[1.12rem] tracking-[-0.02em]" style={{ color: on ? SA.ink : SA.sub }}>
                          {s.t}
                        </span>
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-2 pl-[60px] font-sans-g text-[15px] leading-[1.6]" style={{ color: SA.sub }}>
                            {s.d}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {on && playing && (
                      <motion.span
                        key={`bar-${i}`}
                        aria-hidden
                        className="absolute left-0 bottom-0 h-[2px] w-full origin-left"
                        style={{ background: SA.accent }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: DUR / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            className="order-1 lg:order-2 relative rounded-[28px] overflow-hidden min-h-[260px] sm:min-h-[340px] flex items-center justify-center p-6 sm:p-10"
            style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #EEF3FC 100%)", border: `1px solid ${SA.line}` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="w-full max-w-[460px] [&_svg]:w-full [&_svg]:h-auto"
              >
                <Art />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
