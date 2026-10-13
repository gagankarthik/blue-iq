"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Btn } from "@/components/system/Btn";
import { IconCheck } from "@/components/icons/BqIcons";
import { type Spot, SpotCapture, SpotSpend, SpotGovern } from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   The platform showcase, built the way sarvam.ai builds theirs: a centred
   heading, one framed stage with the products as tabs across the top.
   Inside, a row of task chips advances on its own; for each task a request
   types itself into a plain input card, Sonar's steps appear underneath
   one by one (the current one spinning), and a compact scored result
   lands. Nothing is reserved as a skeleton: the card grows as work arrives.

   Runs only while on screen; hover or focus pauses it; a Pause control
   stops it (WCAG 2.2.2). Reduced motion gets each finished frame.
   ──────────────────────────────────────────────────────────────── */

type Row = { k: string; v: string; s: number };
type Task = { chip: string; prompt: string; using: string[]; steps: { src: string; t: string }[]; title: string; meta: string; rows: Row[] };
type Product = { id: string; tab: string; Spot: Spot; tasks: Task[] };

const PRODUCTS: Product[] = [
  {
    id: "govern",
    tab: "Govern",
    Spot: SpotGovern,
    tasks: [
      {
        chip: "Draft",
        prompt: "Draft a services agreement with Ardent Freight, 24 months, net 45",
        using: ["Your templates", "Your playbook"],
        steps: [
          { src: "Your playbook", t: "Reading your preferred positions" },
          { src: "Your templates", t: "Drafting five clauses" },
          { src: "Sonar", t: "Scoring every clause against the playbook" },
        ],
        title: "Master Services Agreement",
        meta: "Ready for your review",
        rows: [
          { k: "Term", v: "24 months", s: 0.98 },
          { k: "Payment terms", v: "Net 45", s: 0.99 },
          { k: "Liability cap", v: "12 months of fees", s: 0.96 },
        ],
      },
      {
        chip: "Ask",
        prompt: "Which agreements expire in the next 90 days?",
        using: ["1,284 agreements"],
        steps: [
          { src: "Agreements", t: "Searching every agreement" },
          { src: "Sonar", t: "Reading renewal and notice terms" },
          { src: "Sonar", t: "Scoring every date it found" },
        ],
        title: "Three agreements expire before 31 December",
        meta: "One renews automatically at a higher rate",
        rows: [
          { k: "Ardent Freight · MSA", v: "14 Nov 2026", s: 0.97 },
          { k: "Calder Health · SOW 7", v: "02 Dec 2026", s: 0.95 },
          { k: "Ridgeway · Licence", v: "19 Dec, +8% uplift", s: 0.71 },
        ],
      },
    ],
  },
  {
    id: "spend",
    tab: "Spend",
    Spot: SpotSpend,
    tasks: [
      {
        chip: "Overbilling",
        prompt: "Show invoices billed above their contract rate this quarter",
        using: ["Invoices", "Contracts"],
        steps: [
          { src: "Invoices", t: "Reading 412 invoices" },
          { src: "Contracts", t: "Matching each one to its contract" },
          { src: "Sonar", t: "Comparing and scoring every rate" },
        ],
        title: "Two invoices are above contract",
        meta: "Difference: $18,240",
        rows: [
          { k: "INV-20931 · Morrow & Lane", v: "$210 vs $185 / hr", s: 0.95 },
          { k: "INV-21007 · Ridgeway", v: "262 vs 250 seats", s: 0.93 },
        ],
      },
      {
        chip: "Three-way match",
        prompt: "Match this invoice to its purchase order and contract",
        using: ["Invoice", "Purchase order", "Contract"],
        steps: [
          { src: "Invoice", t: "Reading INV-21007" },
          { src: "Purchase order", t: "Finding PO-88412" },
          { src: "Sonar", t: "Checking price and quantity" },
        ],
        title: "INV-21007 matched",
        meta: "One line needs a person",
        rows: [
          { k: "Purchase order", v: "PO-88412", s: 0.99 },
          { k: "Unit price", v: "Matches contract", s: 0.97 },
          { k: "Quantity", v: "262 billed, 250 ordered", s: 0.74 },
        ],
      },
    ],
  },
  {
    id: "capture",
    tab: "Capture",
    Spot: SpotCapture,
    tasks: [
      {
        chip: "Extract",
        prompt: "Pull the key fields from this scanned supplier contract",
        using: ["Scanned PDF"],
        steps: [
          { src: "Scanned PDF", t: "Reading 14 pages" },
          { src: "Sonar", t: "Finding every field" },
          { src: "Sonar", t: "Scoring every value" },
        ],
        title: "Supplier contract · 5 fields",
        meta: "1 field flagged for a person",
        rows: [
          { k: "Counterparty", v: "Ardent Freight Ltd", s: 0.99 },
          { k: "Effective date", v: "2026-03-01", s: 0.97 },
          { k: "Signatory", v: "Illegible", s: 0.58 },
        ],
      },
      {
        chip: "Sort an inbox",
        prompt: "Sort this morning's inbox by document type",
        using: ["Shared inbox"],
        steps: [
          { src: "Shared inbox", t: "Reading 312 documents" },
          { src: "Sonar", t: "Classifying each one" },
          { src: "Sonar", t: "Scoring every label" },
        ],
        title: "312 documents sorted",
        meta: "4 sent to a person",
        rows: [
          { k: "Invoices", v: "188", s: 0.98 },
          { k: "Contracts", v: "71", s: 0.96 },
          { k: "Unclear", v: "4", s: 0.62 },
        ],
      },
    ],
  },
];

type Phase = "type" | "steps" | "result" | "hold";

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="animate-spin" style={{ animationDuration: "900ms" }}>
      <circle cx="9" cy="9" r="7" fill="none" stroke="#DCE5FF" strokeWidth="2" />
      <path d="M9 2a7 7 0 0 1 7 7" fill="none" stroke="#2F5FE0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Showcase() {
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);
  const [t, setT] = useState(0);
  const [phase, setPhase] = useState<Phase>("type");
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0);
  const [rows, setRows] = useState(0);
  const [auto, setAuto] = useState(true);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  const prod = PRODUCTS[p];
  const task = prod.tasks[t];
  const view: Phase = reduce ? "hold" : phase;
  const typedN = reduce ? task.prompt.length : typed;
  const stepN = reduce ? task.steps.length : step;
  const rowsN = reduce ? task.rows.length : rows;
  const running = !reduce && visible && !held && auto;

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function go(np: number, nt: number, manual = false) {
    if (manual) setAuto(false);
    setP(np);
    setT(nt);
    setTyped(0);
    setStep(0);
    setRows(0);
    setPhase("type");
  }

  function next() {
    if (t + 1 < prod.tasks.length) go(p, t + 1);
    else go((p + 1) % PRODUCTS.length, 0);
  }

  /* the timeline; a manual pick still plays through once */
  useEffect(() => {
    if (reduce || !visible || held) return;
    let id: ReturnType<typeof setTimeout> | undefined;
    if (phase === "type") {
      id = typed < task.prompt.length ? setTimeout(() => setTyped((n) => n + 1), 42) : setTimeout(() => setPhase("steps"), 450);
    } else if (phase === "steps") {
      id = step < task.steps.length ? setTimeout(() => setStep((n) => n + 1), 1000) : setTimeout(() => setPhase("result"), 250);
    } else if (phase === "result") {
      id = rows < task.rows.length ? setTimeout(() => setRows((n) => n + 1), 260) : setTimeout(() => setPhase("hold"), 200);
    } else if (phase === "hold" && running) {
      id = setTimeout(next, 4200);
    }
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, typed, step, rows, visible, held, running, p, t, reduce]);

  const showSteps = view !== "type";
  const showResult = view === "result" || view === "hold";

  return (
    <section className="px-3 sm:px-8 py-20 sm:py-28" aria-labelledby="showcase-h">
      <div className="max-w-[1240px] mx-auto">
        <h2 id="showcase-h" className="mx-auto text-center font-display t-h1 max-w-[18ch]" style={{ color: "#1F1F1F" }}>
          The document AI platform teams build on
        </h2>

        {/* the frame */}
        <div className="mt-12 rounded-[28px] p-1.5 sm:p-2" style={{ background: "linear-gradient(180deg, #D3DDFF 0%, #BFCDFF 100%)" }}>
          <div role="tablist" aria-label="Blue-IQ products" className="grid grid-cols-3 gap-1 p-1">
            {PRODUCTS.map((x, k) => {
              const on = k === p;
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="showcase-stage"
                  onClick={() => go(k, 0, true)}
                  className={`h-12 inline-flex items-center justify-center gap-2 rounded-[16px] font-sans-g text-[15px] sm:text-base transition-colors duration-150 ${on ? "bg-white font-medium shadow-[0_1px_2px_rgba(30,33,48,0.08)]" : "hover:bg-white/50"}`}
                  style={{ color: on ? "#2348B8" : "#2A2B33" }}
                >
                  <x.Spot size={22} />
                  {x.tab}
                </button>
              );
            })}
          </div>

          <div
            ref={stage}
            id="showcase-stage"
            role="tabpanel"
            aria-label={`${prod.tab}: ${task.chip}`}
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocus={() => setHeld(true)}
            onBlur={() => setHeld(false)}
            className="mt-1 rounded-[22px] px-3 sm:px-10 py-12 sm:py-16 min-h-[560px] sm:min-h-[600px] flex flex-col justify-center"
            style={{ background: "radial-gradient(75% 60% at 50% 0%, #E6EDFF 0%, #FFFFFF 72%)" }}
          >
            <div className="w-full mx-auto max-w-[760px]">
              {/* task chips */}
              <div className="flex sm:justify-center gap-2 overflow-x-auto pb-1 -mx-1 px-1" role="group" aria-label="Tasks">
                {prod.tasks.map((x, k) => {
                  const on = k === t;
                  return (
                    <button
                      key={x.chip}
                      type="button"
                      aria-pressed={on}
                      onClick={() => go(p, k, true)}
                      className={`shrink-0 h-10 px-4 rounded-full font-sans-g text-[15px] border transition-colors duration-150 ${on ? "bg-white border-[#DEDEE3] font-medium" : "border-transparent hover:bg-white/70"}`}
                      style={{ color: on ? "#1F1F1F" : "#4A4B53" }}
                    >
                      {x.chip}
                    </button>
                  );
                })}
              </div>

              {/* the composer: input, then the work, then the result */}
              <div
                className="mt-4 rounded-[22px] bg-white p-2 text-left"
                style={{ border: "1px solid #ECECEF", boxShadow: "0 24px 48px -36px rgba(30,40,90,0.35)" }}
              >
                <div className="rounded-[16px] px-4 sm:px-5 pt-4 pb-3" style={{ border: "1px solid #E4E4E9" }}>
                  <p className="min-h-[1.75rem] font-sans-g text-[1.0625rem] sm:text-[1.125rem] leading-[1.55]" style={{ color: "#1F1F1F" }}>
                    <span className="sr-only">Example request: </span>
                    {task.prompt.slice(0, typedN)}
                    {view === "type" && <span aria-hidden className="inline-block w-[2px] h-[1.1em] align-[-0.15em] ml-px" style={{ background: "#2F5FE0" }} />}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 font-sans-g text-[13px]" style={{ color: "#4A4B53" }}>
                    <span aria-hidden className="grid place-items-center w-7 h-7 rounded-full text-[18px] leading-none">
                      +
                    </span>
                    <span>Using</span>
                    {task.using.map((u) => (
                      <span key={u} className="h-7 inline-flex items-center px-2.5 rounded-[8px]" style={{ border: "1px solid #E4E4E9", color: "#2A2B33" }}>
                        {u}
                      </span>
                    ))}
                  </div>
                </div>

                <div aria-live="polite">
                  {showSteps && (
                    <ul className="px-3 sm:px-4 pt-3 pb-1 grid gap-2.5">
                      {task.steps.map((s, k) => {
                        if (k > stepN) return null;
                        const done = k < stepN;
                        return (
                          <li key={s.t} className="bq-drop flex flex-wrap items-center gap-2.5 font-sans-g text-[14.5px]" style={{ color: "#2A2B33" }}>
                            {done ? (
                              <span
                                className="grid place-items-center w-[18px] h-[18px] rounded-full"
                                style={{ border: "1.5px solid #2F5FE0", color: "#2F5FE0" }}
                              >
                                <IconCheck size={11} />
                              </span>
                            ) : (
                              <Spinner />
                            )}
                            <span
                              className="h-6 inline-flex items-center px-2 rounded-[6px] text-[12.5px]"
                              style={{ border: "1px solid #E4E4E9", color: "#4A4B53" }}
                            >
                              {s.src}
                            </span>
                            <span>{s.t}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {showResult && (
                    <div className="bq-drop mt-3 rounded-[16px]" style={{ border: "1px solid #E4E4E9" }}>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <span className="grid place-items-center w-9 h-9 rounded-[10px] shrink-0" style={{ background: "#EEF3FF" }}>
                          <prod.Spot size={24} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-sans-g text-[15px] font-medium truncate" style={{ color: "#1F1F1F" }}>
                            {task.title}
                          </span>
                          <span className="block font-sans-g text-[13px]" style={{ color: "#4A4B53" }}>
                            {task.meta}
                          </span>
                        </span>
                      </div>
                      {rowsN > 0 && (
                        <ul style={{ borderTop: "1px solid #F1F1F3" }}>
                          {task.rows.slice(0, rowsN).map((r, k) => {
                            const low = r.s < 0.8;
                            return (
                              <li
                                key={r.k}
                                className="bq-drop grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-4 py-2.5"
                                style={{ borderTop: k ? "1px solid #F1F1F3" : undefined }}
                              >
                                <span className="font-sans-g text-[14px]" style={{ color: "#4A4B53" }}>
                                  {r.k}
                                </span>
                                <span className="col-start-1 sm:col-start-auto font-mono-g text-[13.5px]" style={{ color: "#1F1F1F" }}>
                                  {r.v}
                                </span>
                                <span
                                  className="row-start-1 col-start-2 sm:row-start-auto sm:col-start-auto h-6 inline-flex items-center gap-1 px-2 rounded-[6px] font-mono-g text-[12px] tabular-nums"
                                  style={{ background: low ? "#FEF3C7" : "#ECFDF5", color: low ? "#78350F" : "#065F46" }}
                                >
                                  {low ? "Review" : "Sure"} {r.s.toFixed(2)}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Btn href="/platform" variant="secondary" arrow>
                  Explore Sonar
                </Btn>
                {!reduce && (
                  <button
                    type="button"
                    onClick={() => setAuto((v) => !v)}
                    aria-pressed={!auto}
                    className="h-10 px-4 rounded-full font-sans-g text-[14px] transition-colors duration-150 hover:bg-[#F3F3F5]"
                    style={{ color: "#4A4B53" }}
                  >
                    {auto ? "Pause the demo" : "Play the demo"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
