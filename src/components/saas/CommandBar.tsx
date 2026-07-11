"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { SA } from "@/lib/theme";
import { SPRING, SPRING_POP } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   The hero's command bar.

   It types an intent, works for a beat, and answers with the product that
   handles it. That loop is the whole positioning in one component: you
   arrive with a job to be done, Blue-IQ routes it to a product — and the
   list is open-ended rather than pointing at any single one.
   ──────────────────────────────────────────────────────────────── */

type Intent = { text: string; product: string; href: string; external?: boolean };

const INTENTS: Intent[] = [
  { text: "Parse 10,000 resumes into structured JSON", product: "ParsingLab", href: "https://www.parsinglab.blue-iq.ai/", external: true },
  { text: "Score this contract against our playbook", product: "Govern", href: "https://govern.blue-iq.ai/", external: true },
  { text: "Reconcile invoices against purchase orders", product: "Sonar", href: "/about#sonar" },
  { text: "Build something around our own workflow", product: "Custom builds", href: "/solutions" },
];

const TYPE_MS = 38;
const WORK_MS = 700;
const HOLD_MS = 1900;

type Phase = "typing" | "working" | "answered";

function CommandBarBase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10%" });
  const reduce = useReducedMotion();

  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const intent = INTENTS[i];

  /* one self-rescheduling loop: type → work → answer → next intent */
  useEffect(() => {
    if (reduce) {
      setLen(intent.text.length);
      setPhase("answered");
      return;
    }
    if (!inView) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));

    (async () => {
      setPhase("typing");
      for (let n = 0; n <= intent.text.length; n++) {
        if (cancelled) return;
        setLen(n);
        await wait(TYPE_MS);
      }
      if (cancelled) return;

      setPhase("working");
      await wait(WORK_MS);
      if (cancelled) return;

      setPhase("answered");
      await wait(HOLD_MS);
      if (cancelled) return;

      setI((v) => (v + 1) % INTENTS.length);
      setLen(0);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [i, inView, reduce, intent.text]);

  const typed = intent.text.slice(0, len);

  return (
    <div ref={ref} className="w-full max-w-[780px]">
      <div
        className="relative overflow-hidden rounded-2xl p-2"
        style={{
          background: SA.surface,
          border: `1px solid ${SA.line2}`,
          boxShadow: "0 1px 2px rgba(11,11,15,0.04), 0 28px 56px -30px rgba(11,11,15,0.26)",
        }}
      >
        {/* the read, sweeping across while Sonar works */}
        <AnimatePresence>
          {phase === "working" && !reduce && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            >
              <div
                className="sa-sweep absolute inset-y-0 w-1/3"
                style={{ background: `linear-gradient(90deg, transparent, ${SA.accent}14, transparent)` }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex items-center gap-3 rounded-xl px-3.5 py-3" style={{ background: SA.bg3 }}>
          <span
            className="grid place-items-center w-9 h-9 rounded-lg shrink-0"
            style={{ background: SA.surface, border: `1px solid ${SA.line}`, color: SA.accent }}
          >
            <Search className="w-4 h-4" strokeWidth={1.9} />
          </span>

          {/* the typed intent */}
          <span className="flex-1 min-w-0 font-sans-g text-[14.5px] truncate" style={{ color: SA.ink }}>
            {typed}
            {phase === "typing" && !reduce && (
              <span className="sa-caret ml-px font-normal" style={{ color: SA.accent }}>
                |
              </span>
            )}
            {len === 0 && reduce && <span style={{ color: SA.faint }}>What do you need read?</span>}
          </span>

          {/* the answer: which product picks this up */}
          <div className="shrink-0 flex items-center" style={{ minWidth: 0 }}>
            <AnimatePresence mode="wait" initial={false}>
              {phase === "working" && (
                <motion.span
                  key="working"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={SPRING}
                  className="hidden sm:flex items-center gap-1.5 font-mono-g text-[10.5px] uppercase tracking-[0.14em] px-2.5 py-1.5 rounded-md"
                  style={{ background: SA.surface, border: `1px solid ${SA.line}`, color: SA.faint }}
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="w-1 h-1 rounded-full"
                      style={{ background: SA.accent }}
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15, ease: "easeInOut" }}
                    />
                  ))}
                  Reading
                </motion.span>
              )}

              {phase === "answered" && (
                <motion.a
                  key={intent.product}
                  href={intent.href}
                  target={intent.external ? "_blank" : undefined}
                  rel={intent.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, scale: 0.85, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -4 }}
                  transition={SPRING_POP}
                  className="group inline-flex items-center gap-1.5 font-sans-g text-[13px] font-semibold px-3 py-2 rounded-lg"
                  style={{ background: SA.accent, color: "#fff" }}
                >
                  <span className="hidden sm:inline">{intent.product}</span>
                  <span className="sm:hidden">Open</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* the intents, doubling as a map of what the platform covers */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {INTENTS.map((t, idx) => {
          const on = idx === i;
          return (
            <button
              key={t.product}
              onClick={() => {
                setI(idx);
                setLen(0);
              }}
              aria-label={`Show ${t.product}`}
              className="font-sans-g text-[12.5px] px-2.5 py-1 rounded-full transition-colors"
              style={{
                background: on ? SA.accentSoft : SA.bg2,
                border: `1px solid ${on ? SA.accent + "40" : SA.line}`,
                color: on ? SA.accent : SA.faint,
              }}
            >
              {t.product}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(CommandBarBase);
