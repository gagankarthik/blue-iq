"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring, type Variants } from "framer-motion";
import { C, SHADOW, SHADOW_SM } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Magnetic from "@/components/Magnetic";
import { Arrow, Check, IconHire, IconGovern, IconSpend, IconChart, IconShield, IconLayers, IconTarget } from "@/components/icons";

/* ───────────────────────── motion ───────────────────────── */
const spring = { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.7 };
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: i * 0.06 } }),
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function Reveal({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className} style={style}>
      {children}
    </motion.div>
  );
}

/* 3D mouse-tilt wrapper */
function Tilt({ children, className = "", max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 14 });
  const sry = useSpring(ry, { stiffness: 140, damping: 14 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useCounter(target: number, duration = 1900, trigger = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf = 0; const start = performance.now();
    const tick = (now: number) => { const p = Math.min((now - start) / duration, 1); setN(target * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);
  return n;
}

/* ───────────────────────── data ───────────────────────── */
const engines = [
  {
    id: "hire", name: "HIRE", kind: "Hiring", tag: "Intelligent hiring engine", url: "", Icon: IconHire,
    tagline: "Validates before work begins",
    points: ["AI resume parsing", "Credential verification", "Candidate scoring", "CRM / ATS sync"],
    mock: {
      a: { v: "1,284", l: "Candidates" }, b: { v: "92", l: "Avg. score" },
      chartLabel: "Parse throughput", chart: [40, 62, 50, 74, 66, 88, 96],
      rows: [{ t: "A. Mensah · Senior Eng", tag: "94", c: C.green }, { t: "L. Park · Data Lead", tag: "91", c: C.green }, { t: "R. Costa · Analyst", tag: "88", c: C.blue2 }],
    },
  },
  {
    id: "govern", name: "GOVERN", kind: "Compliance", tag: "SOW intelligence", url: "https://govern.blue-iq.ai/", Icon: IconGovern,
    tagline: "Ensures compliance as contracted",
    points: ["10-dimension audit", "Pre-signature risk score", "Clause-level checks", "Remediation drafts"],
    mock: {
      a: { v: "4,471", l: "SOWs audited" }, b: { v: "12", l: "Risk flags" },
      chartLabel: "Risk dimensions", chart: [70, 55, 82, 60, 90, 48, 76, 64],
      rows: [{ t: "Indemnity gap · §7.2", tag: "HIGH", c: C.red }, { t: "SLA undefined · §4.1", tag: "MED", c: C.amber }, { t: "IP clause · §9.0", tag: "LOW", c: C.green }],
    },
  },
  {
    id: "spend", name: "SPEND", kind: "Spend", tag: "Real-time visibility", url: "", Icon: IconSpend,
    tagline: "Confirms value as delivered",
    points: ["Spend ledger", "Overspend alerts", "Forecasting", "Invoice reconciliation"],
    mock: {
      a: { v: "$11.6B", l: "Spend tracked" }, b: { v: "7", l: "Overspend alerts" },
      chartLabel: "Spend vs. forecast", chart: [44, 50, 58, 52, 66, 72, 84],
      rows: [{ t: "Vendor Northwind · over 8%", tag: "ALERT", c: C.red }, { t: "PO #4471 reconciled", tag: "OK", c: C.green }, { t: "Q3 forecast updated", tag: "NEW", c: C.blue2 }],
    },
  },
];

const voices = [
  { q: "We pulled 41% of overspend out of our vendor book in two quarters. SOW review that took a week now closes in under a day.", name: "Daniela Okonkwo", role: "VP Procurement", co: "Hartwell Group" },
  { q: "The audit flagged an indemnity gap on a contract we were hours from signing. That one catch paid for the platform.", name: "Theo Vasquez", role: "Director of Operations", co: "Continental Risk Partners" },
  { q: "For the first time we see contingent spend across every business unit in one place. Our CFO checks it before board meetings.", name: "Marguerite Bell", role: "Head of Talent", co: "Brightline Health" },
  { q: "Rollout took five weeks, integrations included. We saw measurable return inside the first quarter.", name: "Ravindra Anand", role: "CFO", co: "Meridian Components" },
];

const faqs = [
  { q: "How is Blue-IQ different from a VMS or ATS?", a: "Those systems track workflow. Blue-IQ reads it — applying insight, predictive analytics, and pre-emptive risk scoring across the whole vendor lifecycle." },
  { q: "What is the 10-dimension SOW audit?", a: "A proprietary rubric scoring every SOW on clarity, enforceability, pricing, IP, termination, SLAs, and risk exposure before anyone signs." },
  { q: "How long does implementation take?", a: "Most enterprise rollouts finish in four to six weeks, integrations included, with a dedicated onboarding team." },
  { q: "What return should we expect?", a: "Customers typically see 15–30% less SOW spend leakage and 40–60% faster hiring cycles within the first quarter." },
  { q: "Is Blue-IQ SOC 2 compliant?", a: "Yes — SOC 2 Type II, with enterprise-grade controls across all data processing and storage." },
  { q: "Does it connect to tools we already run?", a: "Blue-IQ integrates with major CRM, ATS, ERP, and procurement systems through native connectors and a documented API." },
];

const sectors = ["Fortune 500", "Global Tech", "Financial Services", "Healthcare", "Manufacturing", "Energy", "Public Sector", "Logistics"];

/* ───────────────────────── animated hero visual (three products, one platform) ───────────────────────── */
function HeroVisual() {
  const hub = { x: 122, y: 190 };
  const nodes = [
    { name: "HIRE", kind: "Hiring", x: 408, y: 86, path: "M122,190 Q 250,118 408,86" },
    { name: "GOVERN", kind: "Compliance", x: 408, y: 190, path: "M122,190 Q 265,190 408,190" },
    { name: "SPEND", kind: "Spend", x: 408, y: 294, path: "M122,190 Q 250,262 408,294" },
  ];
  return (
    <div className="relative rounded-[1.75rem] p-5 sm:p-6" style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW }}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono-g text-[11px] uppercase tracking-[0.14em]" style={{ color: C.faint }}>The Blue-IQ suite</span>
        <span className="font-mono-g text-[11px]" style={{ color: C.faint }}>three products, one platform</span>
      </div>
      <svg viewBox="0 0 540 380" className="w-full h-auto" role="img" aria-label="The Blue-IQ suite: three products — HIRE, GOVERN, and SPEND — under one platform">
        <defs>
          <pattern id="biq-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.1" fill={C.line2} />
          </pattern>
        </defs>
        <rect x="0" y="0" width="540" height="380" fill="url(#biq-dots)" opacity="0.55" />

        {nodes.map((n, i) => (
          <g key={`spoke-${n.name}`}>
            <motion.path d={n.path} fill="none" stroke={C.line2} strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.1, ease, delay: 0.25 + i * 0.12 }} />
            <motion.path d={n.path} fill="none" stroke={C.blue2} strokeWidth="3" strokeLinecap="round" pathLength={0.16} initial={{ pathOffset: 0 }} animate={{ pathOffset: 1 }} transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: i * 0.5 }} />
          </g>
        ))}

        {nodes.map((n, i) => (
          <g key={`node-${n.name}`}>
            <motion.circle cx={n.x} cy={n.y} fill="none" stroke={C.blue2} strokeWidth="1.5" initial={{ r: 19, opacity: 0.3 }} animate={{ r: [19, 36], opacity: [0.3, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.7 + i * 0.4 }} />
            <motion.circle cx={n.x} cy={n.y} fill={C.surface} stroke={C.blue} strokeWidth="2.5" initial={{ r: 0, opacity: 0 }} animate={{ r: 19, opacity: 1 }} transition={{ ...spring, delay: 0.55 + i * 0.15 }} />
            <motion.circle cx={n.x} cy={n.y} fill={C.blue} initial={{ r: 0 }} animate={{ r: 5.5 }} transition={{ ...spring, delay: 0.66 + i * 0.15 }} />
            <text x={n.x + 30} y={n.y - 1} textAnchor="start" className="font-display" style={{ fontWeight: 700, fontSize: "14px", fill: C.ink }}>{n.name}</text>
            <text x={n.x + 30} y={n.y + 14} textAnchor="start" className="font-mono-g" style={{ fontSize: "9.5px", fill: C.faint, letterSpacing: "0.06em" }}>{n.kind.toUpperCase()}</text>
          </g>
        ))}

        <motion.circle cx={hub.x} cy={hub.y} fill="none" stroke={C.blue} strokeWidth="1.5" initial={{ r: 32, opacity: 0.22 }} animate={{ r: [32, 58], opacity: [0.22, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} />
        <motion.circle cx={hub.x} cy={hub.y} fill={C.blue} initial={{ r: 0 }} animate={{ r: 32 }} transition={{ ...spring, delay: 0.2 }} />
        <text x={hub.x} y={hub.y + 7} textAnchor="middle" className="font-display" style={{ fontWeight: 800, fontSize: "21px", fill: "#fff" }}>IQ</text>
        <text x={hub.x} y={hub.y + 54} textAnchor="middle" className="font-mono-g" style={{ fontSize: "9.5px", fill: C.faint, letterSpacing: "0.16em" }}>BLUE-IQ</text>
      </svg>
    </div>
  );
}

/* ───────────────────────── premium dashboard mock ───────────────────────── */
function ConsoleMock({ e }: { e: typeof engines[number] }) {
  return (
    <div className="w-full rounded-[1.5rem] overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW }}>
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2.5">
          <e.Icon className="w-6 h-6" />
          <span className="font-mono-g text-[11px]" style={{ color: C.faint }}>blue-iq / {e.name.toLowerCase()}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono-g text-[10px]" style={{ color: C.green }}>
          <span className="relative flex h-1.5 w-1.5"><span className="pulse absolute inline-flex h-full w-full rounded-full" style={{ background: C.green, opacity: 0.5 }} /><span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: C.green }} /></span>
          LIVE
        </span>
      </div>
      <div className="p-5 grid gap-3.5">
        <div className="grid grid-cols-2 gap-3.5">
          {[e.mock.a, e.mock.b].map((m, i) => (
            <div key={i} className="rounded-xl px-4 py-3.5" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
              <div className="font-display text-[26px] font-bold tracking-tight tabular-nums" style={{ color: C.ink }}>{m.v}</div>
              <div className="font-mono-g text-[10px] uppercase tracking-wider mt-0.5" style={{ color: C.faint }}>{m.l}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-4 pt-3.5 pb-4" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono-g text-[10px] uppercase tracking-wider" style={{ color: C.faint }}>{e.mock.chartLabel}</span>
            <span className="font-mono-g text-[11px] tabular-nums" style={{ color: C.green }}>+18.4%</span>
          </div>
          <div className="flex items-end gap-[5px] h-16">
            {e.mock.chart.map((h, i) => (
              <motion.span key={i} className="flex-1 rounded-[3px]" style={{ background: i === e.mock.chart.length - 1 ? C.blue2 : `${C.blue2}26` }}
                initial={{ height: "8%" }} animate={{ height: `${h}%` }} transition={{ ...spring, delay: i * 0.04 }} />
            ))}
          </div>
        </div>
        <div className="rounded-xl overflow-hidden" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
          {e.mock.rows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5" style={{ borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.c }} />
              <span className="font-sans-g text-[12.5px]" style={{ color: C.sub }}>{r.t}</span>
              <span className="ml-auto font-mono-g text-[10px] px-1.5 py-0.5 rounded" style={{ color: r.c, background: `${r.c}14` }}>{r.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── interactive product showcase ───────────────────────── */
const ProductShowcase = memo(function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % engines.length), 5200);
    return () => clearInterval(id);
  }, [paused]);
  const e = engines[active];

  return (
    <div className="grid lg:grid-cols-[0.86fr_1.14fr] gap-8 lg:gap-12 items-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex flex-col gap-2.5">
        {engines.map((eng, i) => {
          const a = i === active;
          return (
            <button key={eng.id} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} className="text-left rounded-2xl p-4 sm:p-5 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5"
              style={{ background: a ? C.surface : "transparent", border: `1px solid ${a ? C.line : "transparent"}`, boxShadow: a ? SHADOW_SM : "none" }}>
              <div className="flex items-center gap-2.5 flex-wrap">
                <eng.Icon className="w-8 h-8 sm:w-9 sm:h-9" />
                <span className="font-display text-[18px] sm:text-[22px] font-bold tracking-tight" style={{ color: C.ink }}>Blue-IQ {eng.name}</span>
                <span className="ml-auto font-mono-g text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: a ? C.blue2 : C.faint, background: a ? C.blueSoft : "transparent" }}>{eng.kind}</span>
              </div>
              <p className="font-sans-g text-[13.5px] mt-1.5" style={{ color: C.sub }}>{eng.tagline}</p>
              <AnimatePresence initial={false}>
                {a && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3.5">
                      {eng.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2 font-sans-g text-[12.5px]" style={{ color: C.ink }}>
                          <span className="grid place-items-center w-3.5 h-3.5 rounded-full" style={{ background: C.blueSoft, color: C.blue2 }}><Check /></span>{pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
        <div className="flex gap-1.5 mt-2 pl-5">
          {engines.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Show ${engines[i].name}`} className="h-1 rounded-full transition-all" style={{ width: i === active ? 28 : 14, background: i === active ? C.blue2 : C.line2 }} />
          ))}
        </div>
      </div>

      <Tilt className="relative" max={5}>
        <AnimatePresence mode="wait">
          <motion.div key={e.id} initial={{ opacity: 0, y: 14, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.99 }} transition={{ duration: 0.4, ease }}>
            <ConsoleMock e={e} />
            <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono-g text-[11px] uppercase tracking-wider" style={{ color: C.faint }}>{e.tag}</span>
              {e.url ? (
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans-g text-[13px] font-medium" style={{ color: C.blue2 }}>
                  Open {e.name} <span aria-hidden>↗</span>
                </a>
              ) : (
                <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[13px] font-medium" style={{ color: C.blue2 }}>
                  Request access <Arrow className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </Tilt>
    </div>
  );
});

/* ───────────────────────── bento perpetual micro-interactions ───────────────────────── */
const AutoList = memo(function AutoList() {
  const base = ["SOW #4471 — risk cleared", "Vendor Northwind onboarded", "Invoice batch reconciled", "Candidate scored · 94"];
  const [order, setOrder] = useState([0, 1, 2, 3]);
  useEffect(() => { const id = setInterval(() => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]), 2200); return () => clearInterval(id); }, []);
  return (
    <div className="grid gap-2">
      {order.map((idx, pos) => (
        <motion.div key={idx} layout transition={spring} className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: pos === 0 ? C.green : C.line2 }} />
          <span className="font-sans-g text-[12px]" style={{ color: C.sub }}>{base[idx]}</span>
          {pos === 0 && <span className="ml-auto font-mono-g text-[9px] uppercase" style={{ color: C.green }}>now</span>}
        </motion.div>
      ))}
    </div>
  );
});

const MiniArea = memo(function MiniArea() {
  const bars = [40, 58, 48, 70, 60, 82, 72, 92];
  return (
    <div className="flex items-end gap-1.5 h-24">
      {bars.map((b, i) => (
        <motion.span key={i} className="flex-1 rounded-[3px]" style={{ background: i === bars.length - 1 ? C.blue2 : `${C.blue2}22` }}
          initial={{ height: `${b * 0.5}%` }} animate={{ height: [`${b * 0.55}%`, `${b}%`, `${b * 0.72}%`] }}
          transition={{ duration: 2.6 + (i % 4) * 0.35, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
      ))}
    </div>
  );
});

const PulseStatus = memo(function PulseStatus() {
  const [on, setOn] = useState(false);
  useEffect(() => { const id = setInterval(() => setOn((v) => !v), 2600); return () => clearInterval(id); }, []);
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3.5" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
      <span className="relative flex h-2.5 w-2.5"><span className="pulse absolute inline-flex h-full w-full rounded-full" style={{ background: C.green, opacity: 0.5 }} /><span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: C.green }} /></span>
      <span className="font-sans-g text-[13px]" style={{ color: C.ink }}>All systems compliant</span>
      <AnimatePresence>
        {on && (
          <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="ml-auto font-mono-g text-[9px] uppercase px-2 py-1 rounded-full" style={{ background: C.blueSoft, color: C.blue2 }}>+1 audit</motion.span>
        )}
      </AnimatePresence>
    </div>
  );
});

const StatGrid = memo(function StatGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const a = useCounter(12400, 2000, inView);
  const b = useCounter(1840, 1800, inView);
  const c = useCounter(58.6, 1700, inView);
  const d = useCounter(3.2, 1500, inView);
  const cards = [
    { v: a >= 12400 ? "12,400+" : Math.floor(a).toLocaleString(), l: "SOWs managed" },
    { v: b >= 1840 ? "1,840" : Math.floor(b).toLocaleString(), l: "Active vendors" },
    { v: `${c.toFixed(1)}%`, l: "Oversight reduction" },
    { v: `${d.toFixed(1)}×`, l: "Faster hiring" },
  ];
  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[1.5rem] overflow-hidden" style={{ background: C.line }}>
      {cards.map((s, i) => (
        <div key={i} className="px-5 sm:px-6 py-8 sm:py-11" style={{ background: C.surface }}>
          <div className="font-display text-[30px] sm:text-[42px] lg:text-[48px] font-bold tracking-tight tabular-nums leading-none" style={{ color: C.ink }}>{s.v}</div>
          <div className="font-mono-g text-[9.5px] sm:text-[10px] uppercase tracking-[0.12em] mt-2.5" style={{ color: C.sub }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
});

const Voices = memo(function Voices() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + voices.length) % voices.length);
  useEffect(() => { const id = setInterval(() => setI((p) => (p + 1) % voices.length), 5600); return () => clearInterval(id); }, []);
  const v = voices[i];
  return (
    <div className="rounded-[1.75rem] p-8 sm:p-12" style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW }}>
      <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
        <div className="min-h-[210px] sm:min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease }}>
              <blockquote className="font-display font-semibold leading-[1.18] tracking-tight max-w-[26ch]" style={{ fontSize: "clamp(22px,2.6vw,38px)", color: C.ink }}>“{v.q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full grid place-items-center font-display text-[14px] font-bold text-white" style={{ background: C.blue }}>
                  {v.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <div className="font-sans-g text-[14px] font-semibold" style={{ color: C.ink }}>{v.name}</div>
                  <div className="font-mono-g text-[11px]" style={{ color: C.faint }}>{v.role} · {v.co}</div>
                </div>
              </figcaption>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} aria-label="Previous" className="w-11 h-11 rounded-full grid place-items-center" style={{ border: `1px solid ${C.line2}`, color: C.sub }}><Arrow className="w-4 h-4 rotate-180" /></button>
          <button onClick={() => go(1)} aria-label="Next" className="w-11 h-11 rounded-full grid place-items-center text-white transition-transform hover:scale-105" style={{ background: C.blue }}><Arrow className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
});

/* ───────────────────────── page ───────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(heroP, [0, 1], [0, 90]);
  const visualY = useTransform(heroP, [0, 1], [0, -56]);
  const textY = useTransform(heroP, [0, 1], [0, 44]);
  const gains = [
    { title: "Cost optimization", body: "Reduce leakage, eliminate duplicate spend, hold rates consistent, and forecast with confidence." },
    { title: "Risk reduction", body: "Prevent unclear SOWs, improve compliance, and stay audit-ready across every contract." },
    { title: "Operational efficiency", body: "Accelerate procurement and hiring, standardize governance, automate manual review." },
    { title: "Strategic visibility", body: "Real-time insight, clean performance profiles, and reporting executives trust." },
  ];

  return (
    <div id="top" className="overflow-x-clip" style={{ background: C.bg, color: C.ink }}>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-geist-sans), system-ui, sans-serif; background: ${C.bg}; }
        ::selection { background: ${C.blue}; color: #fff; }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 70% { transform: scale(2.6); opacity: 0; } 100% { opacity: 0; } }
        .pulse { animation: pulse-ring 2.4s ease-out infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee { animation: marquee 34s linear infinite; }
        ::-webkit-scrollbar { width: 7px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.line2}; border-radius: 6px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.blue2}; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${C.blue2}; outline-offset: 2px; border-radius: 4px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .marquee, .pulse { animation: none !important; }
        }
      `}</style>

      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-xs" style={{ background: C.blue }}>Skip to content</a>

      <SiteNav />

      <main id="main">
        {/* ───── hero ───── */}
        <section ref={heroRef} className="relative overflow-hidden">
          <motion.div aria-hidden className="absolute left-0 right-0 -top-24 -bottom-24 pointer-events-none" style={{ y: bgY, backgroundImage: `radial-gradient(${C.line2} 1px, transparent 1px)`, backgroundSize: "26px 26px", opacity: 0.5, maskImage: "radial-gradient(80% 55% at 50% 30%, #000 0%, transparent 72%)", WebkitMaskImage: "radial-gradient(80% 55% at 50% 30%, #000 0%, transparent 72%)" }} />
          <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24">
            <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-14 items-center">
              <motion.div style={{ y: textY }}>
                <Reveal>
                  <motion.h1 variants={fadeUp} custom={0} className="font-display font-bold tracking-[-0.03em] leading-[1.02]" style={{ fontSize: "clamp(38px, 5.4vw, 68px)" }}>
                    Intelligence for workforce, vendors <span style={{ color: C.blue }}>&amp; services</span>.
                  </motion.h1>
                  <motion.p variants={fadeUp} custom={1} className="mt-6 font-sans-g text-[16px] sm:text-[18px] leading-relaxed max-w-[52ch]" style={{ color: C.sub }}>
                    Traditional VMS and ATS tools track workflow. Blue-IQ reads it — turning every hire,
                    contract, and dollar into decisions you can act on.
                  </motion.p>
                  <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-wrap items-center gap-3">
                    <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-medium text-white px-6 py-3.5 rounded-xl" style={{ background: C.blue, boxShadow: "0 14px 32px -14px rgba(0,33,129,0.6)" }}>
                      Request a demo <Arrow />
                    </Magnetic>
                    <a href="#platform" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-medium px-6 py-3.5 rounded-xl transition-colors hover:bg-white" style={{ color: C.ink, border: `1px solid ${C.line2}`, background: C.surface }}>
                      Explore the platform
                    </a>
                  </motion.div>
                </Reveal>
              </motion.div>

              <motion.div style={{ y: visualY }}>
                <Reveal>
                  <motion.div variants={fadeUp} custom={1}>
                    <Tilt className="rounded-[1.75rem]"><HeroVisual /></Tilt>
                  </motion.div>
                </Reveal>
              </motion.div>
            </div>
          </div>

          {/* trust */}
          <div className="relative" style={{ borderTop: `1px solid ${C.line}` }}>
            <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-6 flex items-center gap-6">
              <span className="hidden sm:block font-mono-g text-[10px] uppercase tracking-wider shrink-0" style={{ color: C.faint }}>Trusted across</span>
              <div className="relative overflow-hidden flex-1 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
                <div className="marquee flex w-max items-center gap-10">
                  {[...sectors, ...sectors].map((s, i) => <span key={i} className="font-sans-g text-[13px] whitespace-nowrap" style={{ color: C.faint }}>{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── product showcase ───── */}
        <section id="platform" className="scroll-mt-24 py-24 sm:py-32">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-2xl mb-12">
              <motion.h2 variants={fadeUp} custom={0} className="font-display font-bold tracking-[-0.025em] leading-[1.05]" style={{ fontSize: "clamp(30px,3.8vw,52px)" }}>
                Three products, one Blue-IQ.
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="mt-4 font-sans-g text-[16px] leading-relaxed" style={{ color: C.sub }}>
                HIRE, GOVERN, and SPEND each solve a distinct problem — and share a single intelligence core. Select a product to see it live.
              </motion.p>
            </Reveal>
            <Reveal><motion.div variants={fadeUp}><ProductShowcase /></motion.div></Reveal>
          </div>
        </section>

        {/* ───── bento capabilities ───── */}
        <section className="py-24 sm:py-32" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-2xl mb-12">
              <motion.h2 variants={fadeUp} custom={0} className="font-display font-bold tracking-[-0.025em] leading-[1.05]" style={{ fontSize: "clamp(30px,3.8vw,52px)" }}>
                Built to feel alive, not just reported.
              </motion.h2>
            </Reveal>

            <Reveal className="grid md:grid-cols-6 gap-4 grid-flow-dense">
              <motion.div variants={fadeUp} whileHover={{ y: -6, boxShadow: SHADOW }} transition={spring} className="md:col-span-4 rounded-[1.5rem] p-7" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="grid place-items-center w-10 h-10 rounded-xl" style={{ background: C.blueSoft, color: C.blue }}><IconChart className="w-5 h-5" /></span>
                  <h3 className="font-display text-[19px] font-bold">Real-time intelligence</h3>
                  <span className="ml-auto font-mono-g text-[11px] tabular-nums" style={{ color: C.green }}>+18.4%</span>
                </div>
                <p className="font-sans-g text-[13.5px] mb-5 ml-[52px]" style={{ color: C.sub }}>Every hire, contract, and dollar continuously scored — no exports, no stale dashboards.</p>
                <MiniArea />
              </motion.div>

              <motion.div variants={fadeUp} whileHover={{ y: -6, boxShadow: SHADOW }} transition={spring} className="md:col-span-2 rounded-[1.5rem] p-7 flex flex-col justify-between" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                <div>
                  <span className="grid place-items-center w-10 h-10 rounded-xl mb-4" style={{ background: C.blueSoft, color: C.blue }}><IconShield className="w-5 h-5" /></span>
                  <h3 className="font-display text-[19px] font-bold mb-1.5">Always compliant</h3>
                  <p className="font-sans-g text-[13.5px] mb-5" style={{ color: C.sub }}>Continuous audit across active SOWs.</p>
                </div>
                <PulseStatus />
              </motion.div>

              <motion.div variants={fadeUp} whileHover={{ y: -6, boxShadow: SHADOW }} transition={spring} className="md:col-span-2 rounded-[1.5rem] p-7" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                <span className="grid place-items-center w-10 h-10 rounded-xl mb-4" style={{ background: C.blueSoft, color: C.blue }}><IconLayers className="w-5 h-5" /></span>
                <h3 className="font-display text-[19px] font-bold mb-1.5">Auto-prioritized</h3>
                <p className="font-sans-g text-[13.5px] mb-5" style={{ color: C.sub }}>The platform surfaces what needs attention first.</p>
                <AutoList />
              </motion.div>

              <motion.div variants={fadeUp} whileHover={{ y: -6, boxShadow: SHADOW }} transition={spring} className="md:col-span-4 rounded-[1.5rem] p-7" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="grid place-items-center w-10 h-10 rounded-xl" style={{ background: C.blueSoft, color: C.blue }}><IconTarget className="w-5 h-5" /></span>
                  <h3 className="font-display text-[19px] font-bold">What you gain</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  {gains.map((g) => (
                    <div key={g.title} className="flex gap-3">
                      <span className="mt-1 grid place-items-center w-4 h-4 rounded-full shrink-0" style={{ background: C.blueSoft, color: C.blue2 }}><Check /></span>
                      <div>
                        <div className="font-display text-[14.5px] font-semibold mb-0.5">{g.title}</div>
                        <p className="font-sans-g text-[12.5px] leading-relaxed" style={{ color: C.sub }}>{g.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───── stats ───── */}
        <section className="py-24 sm:py-28">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="mb-10">
              <motion.h2 variants={fadeUp} custom={0} className="font-display font-bold tracking-[-0.025em]" style={{ fontSize: "clamp(26px,3vw,40px)" }}>Measured, not promised.</motion.h2>
            </Reveal>
            <Reveal><motion.div variants={fadeUp}><StatGrid /></motion.div></Reveal>
          </div>
        </section>

        {/* ───── voices ───── */}
        <section id="stories" className="scroll-mt-24 py-24 sm:py-32" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="mb-10">
              <motion.h2 variants={fadeUp} custom={0} className="font-display font-bold tracking-[-0.025em]" style={{ fontSize: "clamp(26px,3vw,40px)" }}>What customers measure.</motion.h2>
            </Reveal>
            <Reveal><motion.div variants={fadeUp}><Voices /></motion.div></Reveal>
          </div>
        </section>

        {/* ───── faq ───── */}
        <section id="faq" className="scroll-mt-24 py-24 sm:py-32">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
              <div>
                <motion.h2 variants={fadeUp} custom={0} className="font-display font-bold tracking-[-0.025em]" style={{ fontSize: "clamp(28px,3.4vw,46px)" }}>Frequently asked</motion.h2>
                <motion.a variants={fadeUp} custom={1} href="/contact" className="mt-6 inline-flex items-center gap-2 font-sans-g text-[14px] font-medium" style={{ color: C.blue2 }}>Talk to us <Arrow /></motion.a>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {faqs.map((f, i) => (
                  <motion.div key={i} variants={fadeUp} className="pt-5" style={{ borderTop: `1px solid ${C.line2}` }}>
                    <h3 className="font-display text-[16px] font-semibold mb-2">{f.q}</h3>
                    <p className="font-sans-g text-[13.5px] leading-relaxed" style={{ color: C.sub }}>{f.a}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───── cta ───── */}
        <section className="px-5 sm:px-8 pb-24 sm:pb-32">
          <Reveal className="max-w-[1180px] mx-auto">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[2rem] px-8 sm:px-16 py-16 sm:py-20 text-center" style={{ background: C.blue }}>
              <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.6, maskImage: "radial-gradient(70% 80% at 50% 0%, #000, transparent)", WebkitMaskImage: "radial-gradient(70% 80% at 50% 0%, #000, transparent)" }} />
              <div className="relative">
                <h2 className="font-display font-bold tracking-[-0.025em] leading-[1.04] text-white mx-auto max-w-3xl" style={{ fontSize: "clamp(30px,4.6vw,58px)" }}>
                  Move from workflow to intelligence.
                </h2>
                <p className="mt-5 font-sans-g text-[15px] sm:text-[16px] mx-auto max-w-xl" style={{ color: "rgba(255,255,255,0.78)" }}>
                  Join 540+ enterprises managing $11.6B in SOW and contingent-workforce spend on Blue-IQ.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-medium px-7 py-3.5 rounded-xl" style={{ background: "#fff", color: C.blue }}>
                    Request a demo <Arrow />
                  </Magnetic>
                  <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-medium text-white px-7 py-3.5 rounded-xl transition-colors hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
                    Talk to an expert
                  </a>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
