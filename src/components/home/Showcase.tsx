"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { SqBtn } from "@/components/home/ui";
import { Head } from "@/components/home/motion";
import { I, Tile, type Ico } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   The platform showcase: a split section header, one neutral framed stage with the products as tabs across the top.
   Inside, the product's tasks play in turn; for each, a request types
   itself into a prompt box with a turning rainbow AI edge, Sonar's steps appear underneath
   one by one (the current one spinning), and a compact scored result
   lands. Nothing is reserved as a skeleton: the card grows as work arrives.

   Runs only while on screen; hover or focus pauses it; a play/pause icon
   button at the foot of the stage stops and resumes it (WCAG 2.2.2). Reduced motion gets each finished frame.
   ──────────────────────────────────────────────────────────────── */

type Row = { k: string; v: string; s: number };
type Task = { chip: string; prompt: string; using: string[]; steps: { src: string; t: string }[]; title: string; meta: string; rows: Row[] };
type Product = { id: string; tab: string; icon: Ico; tasks: Task[] };

const PRODUCTS: Product[] = [
  {
    id: "govern",
    tab: "Govern",
    icon: I.govern,
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
    icon: I.spend,
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
    icon: I.capture,
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
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  const prod = PRODUCTS[p];
  const task = prod.tasks[t];
  const view: Phase = reduce ? "hold" : phase;
  const typedN = reduce ? task.prompt.length : typed;
  const stepN = reduce ? task.steps.length : step;
  const rowsN = reduce ? task.rows.length : rows;
  const running = !reduce && visible && !held && auto && !paused;

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
    if (reduce || !visible || held || paused) return;
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
    <section className="px-6 sm:px-8 pb-24" aria-labelledby="showcase-h">
      <div aria-hidden className="max-w-[1112px] mx-auto h-px mb-24" style={{ background: "#D9DCE2" }} />
      <div className="max-w-[1112px] mx-auto">
        <div>
          <Head id="showcase-h" title="The document AI platform teams build on" />
        </div>

        {/* the frame */}
        <div className="mt-12 rounded-[24px] p-2" style={{ background: "#E7EAF0", border: "1px solid #D9DCE2" }}>
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
                  className={`h-12 inline-flex items-center justify-center gap-2 rounded-[16px] font-sans-g text-[16px] sm:text-base transition-colors duration-150 ${on ? "bg-white font-medium shadow-[0_1px_2px_rgba(30,33,48,0.08)]" : "hover:bg-white/50"}`}
                  style={{ color: on ? "#1638B8" : "#3A3F55" }}
                >
                  <x.icon size={20} style={{ color: on ? "#1F4FE6" : "#565C68" }} />
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
            className="relative mt-2 rounded-[16px] px-4 sm:px-10 pt-12 sm:pt-16 pb-24 min-h-[560px] sm:min-h-[640px] flex flex-col justify-start"
            style={{ background: "#FFFFFF" }}
          >
            {!reduce && (
              <button
                type="button"
                onClick={() => {
                  setPaused((v) => !v);
                  setAuto(true);
                }}
                aria-pressed={paused}
                aria-label={paused ? "Play the demo" : "Pause the demo"}
                title={paused ? "Play the demo" : "Pause the demo"}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 grid place-items-center w-12 h-12 rounded-full bg-white text-[#0E1116] transition-colors duration-150 hover:bg-[#1F4FE6] hover:text-white"
                style={{ border: "1px solid #D9DCE2", boxShadow: "0 4px 8px -4px rgba(14,17,22,0.2)" }}
              >
                {paused ? <I.play size={20} weight="fill" /> : <I.pause size={20} weight="fill" />}
              </button>
            )}
            <div className="w-full mx-auto max-w-[760px]">
              {/* the composer: input, then the work, then the result */}
              <div className="text-left">
                {/* the prompt: a rainbow AI edge (2px) with a soft halo, turning while the demo runs */}
                <div className="relative">
                  <span aria-hidden className={`bq-ai-edge ${running ? "is-live" : ""} absolute -inset-1 rounded-[16px] blur-md opacity-50`} />
                  <div className={`bq-ai-edge ${running ? "is-live" : ""} relative p-[2px] rounded-[14px]`}>
                    <div className="relative bg-white rounded-[12px] px-4 sm:px-6 pt-4 pb-4">
                      <p className="min-h-[1.75rem] font-sans-g text-[16px] sm:text-[20px] leading-[1.5]" style={{ color: "#1F1F1F" }}>
                        <span className="sr-only">Example request: </span>
                        {task.prompt.slice(0, typedN)}
                        {view === "type" && (
                          <span aria-hidden className="inline-block w-[2px] h-[1.1em] align-[-0.15em] ml-px" style={{ background: "#2F5FE0" }} />
                        )}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2 font-sans-g text-[13px]" style={{ color: "#4A4B53" }}>
                        <span aria-hidden className="grid place-items-center w-8 h-8 rounded-full text-[20px] leading-[1.1]">
                          +
                        </span>
                        <span>Using</span>
                        {task.using.map((u) => (
                          <span key={u} className="h-8 inline-flex items-center px-2 rounded-[8px]" style={{ border: "1px solid #E4E4E9", color: "#2A2B33" }}>
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div aria-live="polite">
                  {showSteps && (
                    <ul className="px-4 sm:px-4 pt-4 pb-1 grid gap-2">
                      {task.steps.map((s, k) => {
                        if (k > stepN) return null;
                        const done = k < stepN;
                        return (
                          <li key={s.t} className="bq-drop flex flex-wrap items-center gap-2 font-sans-g text-[16px]" style={{ color: "#2A2B33" }}>
                            {done ? (
                              <span
                                className="grid place-items-center w-[18px] h-[18px] rounded-full"
                                style={{ border: "1.5px solid #2F5FE0", color: "#2F5FE0" }}
                              >
                                <I.check size={12} weight="bold" />
                              </span>
                            ) : (
                              <Spinner />
                            )}
                            <span
                              className="h-6 inline-flex items-center px-2 rounded-[8px] text-[13px]"
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
                    <div className="bq-drop mt-4 rounded-[12px] overflow-hidden" style={{ border: "1px solid #E4E4E9" }}>
                      <div className="flex items-center gap-4 px-4 py-4">
                        <Tile icon={prod.icon} size={40} />
                        <span className="min-w-0">
                          <span className="block font-sans-g text-[16px] font-medium truncate" style={{ color: "#1F1F1F" }}>
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
                                className="bq-drop grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-2"
                                style={{ borderTop: k ? "1px solid #F1F1F3" : undefined }}
                              >
                                <span className="font-sans-g text-[13px]" style={{ color: "#4A4B53" }}>
                                  {r.k}
                                </span>
                                <span className="col-start-1 sm:col-start-auto font-mono-g text-[13px]" style={{ color: "#1F1F1F" }}>
                                  {r.v}
                                </span>
                                <span
                                  className="row-start-1 col-start-2 sm:row-start-auto sm:col-start-auto h-6 inline-flex items-center gap-1 px-2 rounded-[8px] font-mono-g text-[13px] tabular-nums"
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

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <SqBtn href="/platform" tone="outline" arrow>
                  Explore Sonar
                </SqBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
