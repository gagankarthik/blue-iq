"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { FileText, Layers, Plug, ShieldCheck, Check } from "lucide-react";
import { DK, GLASS_EDGE } from "@/lib/theme";
import { SPRING, SPRING_POP } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   The hero anchor: the Sonar console, mid-read.

   A scanline crosses the page, each field is captured in turn, and the
   extraction panel fills in with a confidence score on every row. The
   signatory comes back weak and is flagged for review rather than guessed
   — the product's actual argument, shown rather than asserted.
   ──────────────────────────────────────────────────────────────── */

type Row = { key: string; value: string; conf: number; top: number; w: number };

const ROWS: Row[] = [
  { key: "Counterparty", value: "Northwind Logistics BV", conf: 0.98, top: 20, w: 62 },
  { key: "Effective date", value: "2026-04-01", conf: 0.96, top: 39, w: 44 },
  { key: "Total value", value: "$1,284,500.00", conf: 0.94, top: 58, w: 52 },
  { key: "Signatory", value: "illegible — page 14", conf: 0.58, top: 77, w: 58 },
];

const STEP_MS = 900;   // one field captured per beat
const HOLD_MS = 2600;  // the finished read sits on screen
const TOTAL = ROWS.length + 1;

/* ruled body text on the page, deterministic so SSR and client agree */
const LINES = Array.from({ length: 18 }, (_, i) => ({
  top: 6 + i * 5.1,
  w: 30 + ((Math.sin(i * 2.3) + 1) / 2) * 55,
}));

function confTint(c: number) {
  return c >= 0.95 ? DK.green : c >= 0.8 ? DK.accent : DK.amber;
}

function ConsoleBase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-5%" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? ROWS.length : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const done = step >= ROWS.length;
    const t = setTimeout(() => setStep((s) => (s >= TOTAL - 1 ? 0 : s + 1)), done ? HOLD_MS : STEP_MS);
    return () => clearTimeout(t);
  }, [step, inView, reduce]);

  const captured = Math.min(step, ROWS.length);
  const complete = captured === ROWS.length;
  const flagged = ROWS.slice(0, captured).filter((r) => r.conf < 0.8).length;

  return (
    <div ref={ref} className="relative w-full">
      {/* the light the console sits in */}
      <div
        aria-hidden
        className="absolute -inset-x-16 -top-10 -bottom-24 pointer-events-none blur-[90px] opacity-70"
        style={{ background: "radial-gradient(ellipse 55% 55% at 50% 45%, rgba(91,124,255,0.34), transparent 70%)" }}
      />

      <div
        className="relative rounded-2xl overflow-hidden backdrop-blur-xl"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
          border: `1px solid ${DK.border}`,
          boxShadow: `${GLASS_EDGE}, 0 40px 100px -30px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.4)`,
        }}
      >
        {/* window chrome */}
        <div
          className="flex items-center gap-3 px-4 h-11 shrink-0"
          style={{ borderBottom: `1px solid ${DK.border}`, background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center gap-1.5">
            {["#FF6B5A", "#F5B544", "#3DDC97"].map((c) => (
              <span key={c} className="w-[9px] h-[9px] rounded-full" style={{ background: c, opacity: 0.55 }} />
            ))}
          </div>

          <div
            className="ml-2 flex items-center gap-2 px-2.5 py-1 rounded-md min-w-0"
            style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${DK.border}` }}
          >
            <FileText className="w-3 h-3 shrink-0" strokeWidth={2} style={{ color: DK.faint }} />
            <span className="font-mono-g text-[10.5px] truncate" style={{ color: DK.sub }}>
              msa_northwind_2026.pdf
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: complete ? DK.green : DK.accent }}
              animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono-g text-[10px] uppercase tracking-[0.16em]" style={{ color: DK.faint }}>
              {complete ? "Complete" : "Reading"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[86px_minmax(0,0.85fr)_minmax(0,1fr)]">
          {/* product rail */}
          <div className="hidden sm:flex flex-col gap-1 p-2.5" style={{ borderRight: `1px solid ${DK.border}` }}>
            {[
              { Icon: FileText, label: "Parse", on: true },
              { Icon: ShieldCheck, label: "Govern", on: false },
              { Icon: Layers, label: "Batch", on: false },
              { Icon: Plug, label: "Connect", on: false },
            ].map(({ Icon, label, on }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
                style={{
                  background: on ? DK.accentSoft : "transparent",
                  color: on ? DK.ink : DK.faint,
                }}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.9} />
                <span className="font-sans-g text-[10.5px] font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* the page under the scanner */}
          <div className="relative p-3.5" style={{ borderRight: `1px solid ${DK.border}` }}>
            <div
              className="relative w-full overflow-hidden rounded-md"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${DK.border}`, aspectRatio: "3 / 4" }}
            >
              {/* ruled text */}
              {LINES.map((l, i) => (
                <div
                  key={i}
                  className="absolute h-[2px] rounded-full"
                  style={{ top: `${l.top}%`, left: "8%", width: `${l.w}%`, background: "rgba(255,255,255,0.10)" }}
                />
              ))}

              {/* captured regions */}
              {ROWS.map((r, i) => {
                const on = i < captured;
                const tint = confTint(r.conf);
                return (
                  <motion.div
                    key={r.key}
                    className="absolute rounded-[3px]"
                    style={{ top: `${r.top - 2}%`, left: "6%", width: `${r.w}%`, height: "8%" }}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.96 }}
                    transition={SPRING}
                  >
                    <div className="w-full h-full rounded-[3px]" style={{ border: `1px solid ${tint}`, background: `${tint}1F` }} />
                  </motion.div>
                );
              })}

              {/* the beam: a full-height element whose bottom edge is the line, so
                  the sweep is one translateY of its own height — no layout work */}
              {!reduce && !complete && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderBottom: `1px solid ${DK.accent}`,
                    background: "linear-gradient(to bottom, transparent 55%, rgba(91,124,255,0.18))",
                  }}
                  animate={{ y: ["-100%", "0%"] }}
                  transition={{ duration: (STEP_MS * ROWS.length) / 1000, ease: "linear", repeat: Infinity }}
                />
              )}
            </div>
          </div>

          {/* the extraction */}
          <div className="flex flex-col p-3.5 min-w-0">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-mono-g text-[9.5px] uppercase tracking-[0.18em]" style={{ color: DK.faint }}>
                Extraction
              </span>
              <span className="font-mono-g text-[9.5px] uppercase tracking-[0.18em]" style={{ color: DK.faint }}>
                conf.
              </span>
            </div>

            <div className="flex-1 space-y-2.5">
              {ROWS.map((r, i) => {
                const on = i < captured;
                const tint = confTint(r.conf);
                const low = r.conf < 0.8;
                return (
                  <motion.div
                    key={r.key}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0.22, y: on ? 0 : 4 }}
                    transition={SPRING}
                    className="rounded-lg px-2.5 py-2"
                    style={{
                      background: on ? "rgba(255,255,255,0.045)" : "transparent",
                      border: `1px solid ${on ? DK.border : "transparent"}`,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono-g text-[9px] uppercase tracking-[0.14em]" style={{ color: DK.faint }}>
                        {r.key}
                      </span>
                      <span className="font-mono-g text-[10px] font-semibold tabular-nums" style={{ color: on ? tint : DK.faint }}>
                        {on ? r.conf.toFixed(2) : "—"}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span
                        className="font-sans-g text-[12px] truncate"
                        style={{ color: on ? (low ? DK.amber : DK.ink) : DK.faint, fontStyle: low && on ? "italic" : undefined }}
                      >
                        {on ? r.value : "scanning…"}
                      </span>

                      <AnimatePresence>
                        {on && low && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={SPRING_POP}
                            className="shrink-0 font-mono-g text-[8px] font-semibold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(245,181,68,0.16)", color: DK.amber }}
                          >
                            Review
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-1.5 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <motion.div
                        className="h-full w-full origin-left rounded-full"
                        style={{ background: tint }}
                        initial={false}
                        animate={{ scaleX: on ? r.conf : 0 }}
                        transition={{ ...SPRING, delay: on ? 0.08 : 0 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* status bar */}
            <div className="mt-3 pt-3 flex items-center justify-between gap-2" style={{ borderTop: `1px solid ${DK.border}` }}>
              <span className="font-mono-g text-[9.5px]" style={{ color: DK.faint }}>
                {captured}/{ROWS.length} fields · {flagged} flagged
              </span>

              <AnimatePresence>
                {complete && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={SPRING_POP}
                    className="inline-flex items-center gap-1 font-mono-g text-[9px] font-semibold uppercase tracking-[0.12em] px-1.5 py-1 rounded"
                    style={{ background: "rgba(61,220,151,0.14)", color: DK.green }}
                  >
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    JSON ready
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ConsoleBase);
