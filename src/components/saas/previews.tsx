"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { SA } from "@/lib/theme";
import { SPRING, SPRING_POP, useCycle, useTicker } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   The live previews that sit inside the gallery cards.

   Each one is its own memoised leaf and each one gates its loop on
   visibility, so six perpetual animations on one page still cost nothing
   when they're scrolled past. Everything animates transform, opacity, or
   colour — never width, height, or position.
   ──────────────────────────────────────────────────────────────── */

function Well({ children, innerRef }: { children: React.ReactNode; innerRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={innerRef}
      className="w-full max-w-[280px] rounded-lg p-3.5"
      style={{ background: SA.surface, border: `1px solid ${SA.line}`, boxShadow: "0 1px 2px rgba(11,11,15,0.04)" }}
    >
      {children}
    </div>
  );
}

/* a small header that every preview shares, with a breathing live dot */
function Head({ label, live = true }: { label: string; live?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center justify-between gap-2 mb-2.5">
      <span className="font-sans-g text-[11px] font-semibold" style={{ color: SA.faint }}>
        {label}
      </span>
      {live && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: SA.green }}
          animate={reduce ? undefined : { opacity: [1, 0.25, 1], scale: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

/* ─────────────── 01 · the JSON types itself out ─────────────── */

const JSON_SRC = `{
  "name": "A. Okonkwo-Reyes",
  "credential": "RN, BSN",
  "specialty": "Neuro ICU",
  "confidence": 0.96
}`;

/* colour the prefix as it is typed: keys, strings, numbers, punctuation */
function colorize(text: string) {
  const out: React.ReactNode[] = [];
  const re = /("[^"]*"\s*:)|("[^"]*"?)|(\d+\.?\d*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      out.push(
        <span key={k++} style={{ color: SA.faint }}>
          {text.slice(last, m.index)}
        </span>,
      );
    }
    const tint = m[1] ? SA.accent : m[2] ? SA.ink : SA.green;
    out.push(
      <span key={k++} style={{ color: tint }}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    out.push(
      <span key={k++} style={{ color: SA.faint }}>
        {text.slice(last)}
      </span>,
    );
  }
  return out;
}

function JsonPreviewBase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-8%" });
  const reduce = useReducedMotion();
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (reduce) {
      setLen(JSON_SRC.length);
      return;
    }
    if (!inView) return;

    let n = 0;
    let hold = 0;
    const t = setInterval(() => {
      if (n < JSON_SRC.length) {
        /* punctuation lands instantly, characters tick along */
        n += 1;
        setLen(n);
      } else if (hold < 26) {
        hold += 1; // let the finished object sit and be read
      } else {
        n = 0;
        hold = 0;
        setLen(0);
      }
    }, 34);
    return () => clearInterval(t);
  }, [inView, reduce]);

  const typed = JSON_SRC.slice(0, len);
  const done = len >= JSON_SRC.length;

  return (
    <Well innerRef={ref}>
      <Head label="Extraction" />
      <pre className="font-mono-g text-[10.5px] leading-[1.9] min-h-[105px] whitespace-pre-wrap break-all">
        {colorize(typed)}
        {!reduce && (
          <span
            className="inline-block w-[5px] h-[11px] translate-y-[1px] ml-px"
            style={{ background: done ? "transparent" : SA.accent }}
          />
        )}
      </pre>
    </Well>
  );
}
export const JsonPreview = memo(JsonPreviewBase);

/* ─────────── 02 · clauses re-sort themselves by risk ─────────── */

type Clause = { id: string; label: string; level: string; tint: string; rank: number };
const CLAUSES: Clause[] = [
  { id: "renew", label: "Auto-renewal", level: "High", tint: SA.red, rank: 3 },
  { id: "liability", label: "Liability cap", level: "Medium", tint: SA.amber, rank: 2 },
  { id: "termination", label: "Termination", level: "Low", tint: SA.green, rank: 1 },
];

/* the engine reads them in document order, then floats the risk to the top */
const ORDERS = [
  ["termination", "renew", "liability"],
  ["liability", "termination", "renew"],
  ["renew", "liability", "termination"], // sorted by risk
];

function ClausePreviewBase() {
  const { ref, step } = useCycle(ORDERS.length, 2100);
  const order = ORDERS[step];
  const rows = order.map((id) => CLAUSES.find((c) => c.id === id)!);
  const sorted = step === ORDERS.length - 1;

  return (
    <Well innerRef={ref}>
      <Head label={sorted ? "Ranked by risk" : "Reading clauses"} />
      <div className="space-y-1.5">
        {rows.map((c) => (
          <motion.div
            key={c.id}
            layout
            transition={SPRING}
            className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5"
            style={{ background: SA.bg2 }}
          >
            <span className="font-sans-g text-[12px]" style={{ color: SA.ink }}>
              {c.label}
            </span>
            <motion.span
              layout
              className="font-sans-g text-[10px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: `${c.tint}1A`, color: c.tint }}
            >
              {c.level}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </Well>
  );
}
export const ClausePreview = memo(ClausePreviewBase);

/* ───── 03 · confidence fills, counts, and flags the weak field ───── */

/* deliberately cross-document: this card is the engine, not any one product */
const FIELDS: [string, number][] = [
  ["Counterparty", 0.98],
  ["Effective date", 0.96],
  ["Total value", 0.93],
  ["Signatory", 0.61],
];

function ConfRow({ label, value, active, index }: { label: string; value: number; active: boolean; index: number }) {
  const tint = value >= 0.95 ? SA.green : value >= 0.8 ? SA.accent : SA.amber;
  const shown = useTicker(value, active, 2);
  const low = value < 0.8;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-sans-g text-[11.5px]" style={{ color: SA.ink }}>
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <AnimatePresence>
            {low && active && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ ...SPRING_POP, delay: 0.55 }}
                className="font-sans-g text-[9px] font-semibold px-1 py-0.5 rounded"
                style={{ background: `${SA.amber}1A`, color: SA.amber }}
              >
                REVIEW
              </motion.span>
            )}
          </AnimatePresence>
          <span className="font-mono-g text-[10px] font-semibold tabular-nums" style={{ color: tint }}>
            {shown.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: SA.bg3 }}>
        <motion.div
          className="h-full w-full origin-left rounded-full"
          style={{ background: tint }}
          initial={false}
          animate={{ scaleX: active ? value : 0 }}
          transition={{ ...SPRING, delay: active ? index * 0.09 : 0 }}
        />
      </div>
    </div>
  );
}

function ConfidencePreviewBase() {
  /* two beats: fill and read, then reset and do it again */
  const { ref, step } = useCycle(2, 2600);
  const active = step === 1;

  return (
    <Well innerRef={ref}>
      <Head label="Field confidence" />
      <div className="space-y-2.5">
        {FIELDS.map(([k, v], i) => (
          <ConfRow key={k} label={k} value={v} active={active} index={i} />
        ))}
      </div>
    </Well>
  );
}
export const ConfidencePreview = memo(ConfidencePreviewBase);

/* ──────────── 04 · the throughput chart keeps breathing ──────────── */

const BAR_SETS = [
  [42, 68, 54, 81, 63, 94, 72],
  [58, 47, 76, 62, 88, 70, 95],
  [70, 85, 61, 92, 54, 78, 66],
];

function ThroughputPreviewBase() {
  const { ref, step } = useCycle(BAR_SETS.length, 1900);
  const bars = BAR_SETS[step];
  const peak = Math.max(...bars);
  const docs = useTicker(200, true);

  return (
    <Well innerRef={ref}>
      <Head label="Throughput / batch" />
      <div className="flex items-end gap-1.5 h-[76px]">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-[3px] origin-bottom"
            style={{ height: "100%", background: h === peak ? SA.accent : SA.accentSoft }}
            initial={false}
            animate={{ scaleY: h / 100 }}
            transition={{ ...SPRING, delay: i * 0.035 }}
          />
        ))}
      </div>
      <div className="mt-3 font-display text-[19px] font-normal tracking-tight tabular-nums" style={{ color: SA.ink }}>
        {docs}
        <span className="ml-1.5 font-sans-g text-[11px]" style={{ color: SA.faint }}>
          docs / call
        </span>
      </div>
    </Well>
  );
}
export const ThroughputPreview = memo(ThroughputPreviewBase);

/* ─────── 05 · a pulse travels through the connectors ─────── */

const CHIPS = ["REST API", "Webhooks", "S3", "Snowflake", "SFTP", "Zapier"];

function IntegrationsPreviewBase() {
  const { ref, step } = useCycle(CHIPS.length, 900);

  return (
    <Well innerRef={ref}>
      <Head label="Connectors" />
      <div className="flex flex-wrap gap-1.5">
        {CHIPS.map((c, i) => {
          const on = i === step;
          return (
            <motion.span
              key={c}
              className="font-sans-g text-[11px] font-medium px-2 py-1 rounded-md"
              initial={false}
              animate={{
                scale: on ? 1.06 : 1,
                backgroundColor: on ? SA.accentSoft : SA.bg2,
                color: on ? SA.accent : SA.sub,
                borderColor: on ? SA.accent : SA.line,
              }}
              transition={SPRING}
              style={{ borderWidth: 1, borderStyle: "solid" }}
            >
              {c}
            </motion.span>
          );
        })}
      </div>
    </Well>
  );
}
export const IntegrationsPreview = memo(IntegrationsPreviewBase);

/* ─────── 06 · the pipeline checks itself off, then resets ─────── */

const STEPS = ["Ingest from your systems", "Extract and score", "Deliver to your stack"];

function PipelinePreviewBase() {
  /* one beat per step, plus a beat to sit complete before resetting */
  const { ref, step } = useCycle(STEPS.length + 1, 1150);

  return (
    <Well innerRef={ref}>
      <Head label="Pipeline" />
      <div className="relative space-y-2">
        {/* the thread the ticks sit on, filling as the run proceeds */}
        <div aria-hidden className="absolute left-[9px] top-3 bottom-3 w-px" style={{ background: SA.line }}>
          <motion.div
            className="w-full h-full origin-top"
            style={{ background: SA.accent }}
            initial={false}
            animate={{ scaleY: Math.min(1, step / STEPS.length) }}
            transition={SPRING}
          />
        </div>

        {STEPS.map((s, i) => {
          const done = i < step;
          return (
            <div key={s} className="relative flex items-center gap-2.5">
              <motion.span
                className="grid place-items-center w-[19px] h-[19px] rounded-md shrink-0 z-10"
                initial={false}
                animate={{
                  backgroundColor: done ? SA.accent : SA.bg3,
                  color: done ? "#FFFFFF" : SA.faint,
                  scale: done ? 1 : 0.92,
                }}
                transition={SPRING_POP}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {done ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={SPRING_POP}
                    >
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="n"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono-g text-[9px] font-semibold"
                    >
                      {i + 1}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>

              <motion.span
                className="font-sans-g text-[12px]"
                initial={false}
                animate={{ color: done ? SA.ink : SA.faint }}
                transition={{ duration: 0.35 }}
              >
                {s}
              </motion.span>
            </div>
          );
        })}
      </div>
    </Well>
  );
}
export const PipelinePreview = memo(PipelinePreviewBase);
