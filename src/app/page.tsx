/* eslint-disable @next/next/no-img-element */
"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";
import { C, SHADOW, SHADOW_SM, SHADOW_LG } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Magnetic from "@/components/Magnetic";
import { Arrow, Check, IconHire, IconGovern, IconSpend, IconChart, IconShield, IconLayers, IconTarget, IconLock, IconStar } from "@/components/icons";

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

function Tilt({ children, className = "", max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
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
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
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
    id: "hire", name: "HIRE", kind: "Hiring", url: "", Icon: IconHire,
    headline: "Validate talent before work begins.",
    desc: "Parse résumés, verify credentials, and score every candidate against the role — so the right person is confirmed before a single hour is billed.",
    points: ["AI résumé parsing", "Credential verification", "Candidate scoring", "CRM / ATS sync"],
    stat: "40–60%", statLabel: "faster hiring cycles",
    mock: {
      a: { v: "1,284", l: "Candidates", d: "+216" }, b: { v: "92", l: "Avg. score", d: "+5.4" },
      chartLabel: "Parse throughput", chart: [40, 62, 50, 74, 66, 88, 96],
      rows: [{ t: "A. Mensah · Senior Eng", tag: "94", c: C.green }, { t: "L. Park · Data Lead", tag: "91", c: C.green }, { t: "R. Costa · Analyst", tag: "88", c: C.blue2 }],
    },
  },
  {
    id: "govern", name: "GOVERN", kind: "Compliance", url: "https://govern.blue-iq.ai/", Icon: IconGovern,
    headline: "Catch contract risk before anyone signs.",
    desc: "A 10-dimension audit reads every SOW for clarity, pricing, IP, and liability — surfacing clause-level risk and drafting remediations pre-signature.",
    points: ["10-dimension audit", "Pre-signature risk score", "Clause-level checks", "Remediation drafts"],
    stat: "10-point", statLabel: "audit on every SOW",
    mock: {
      a: { v: "4,471", l: "SOWs audited", d: "+128" }, b: { v: "12", l: "Risk flags", d: "−3" },
      chartLabel: "Risk dimensions", chart: [70, 55, 82, 60, 90, 48, 76, 64],
      rows: [{ t: "Indemnity gap · §7.2", tag: "HIGH", c: C.red }, { t: "SLA undefined · §4.1", tag: "MED", c: C.amber }, { t: "IP clause · §9.0", tag: "LOW", c: C.green }],
    },
  },
  {
    id: "spend", name: "SPEND", kind: "Spend", url: "", Icon: IconSpend,
    headline: "See every dollar of contingent spend.",
    desc: "A live ledger reconciles invoices, flags overspend, and forecasts by vendor and unit — so finance sees leakage the moment it appears, not at quarter close.",
    points: ["Live spend ledger", "Overspend alerts", "Forecasting", "Invoice reconciliation"],
    stat: "15–30%", statLabel: "less spend leakage",
    mock: {
      a: { v: "$11.6B", l: "Spend tracked", d: "+4.2%" }, b: { v: "7", l: "Overspend alerts", d: "−2" },
      chartLabel: "Spend vs. forecast", chart: [44, 50, 58, 52, 66, 72, 84],
      rows: [{ t: "Vendor Northwind · over 8%", tag: "ALERT", c: C.red }, { t: "PO #4471 reconciled", tag: "OK", c: C.green }, { t: "Q3 forecast updated", tag: "NEW", c: C.blue2 }],
    },
  },
];

const useCases = [
  { Icon: IconChart, title: "Cost optimization", body: "Reduce leakage, eliminate duplicate spend, hold rates consistent, and forecast with confidence." },
  { Icon: IconShield, title: "Risk reduction", body: "Prevent unclear SOWs, improve compliance, and stay audit-ready across every contract." },
  { Icon: IconLayers, title: "Operational efficiency", body: "Accelerate procurement and hiring, standardize governance, and automate manual review." },
  { Icon: IconTarget, title: "Strategic visibility", body: "Real-time insight, clean performance profiles, and reporting executives actually trust." },
  { Icon: IconLock, title: "Audit readiness", body: "Keep a clause-level trail across every contract, vendor, and payment for inspection at any time." },
  { Icon: IconStar, title: "Faster hiring", body: "Shortlist validated candidates in hours, with credentials and scoring done before the first call." },
];

const voices = [
  { q: "We pulled 41% of overspend out of our vendor book in two quarters. SOW review that took a week now closes in under a day.", name: "Daniela Okonkwo", role: "VP Procurement", co: "Hartwell Group", photo: "https://randomuser.me/api/portraits/women/79.jpg" },
  { q: "The audit flagged an indemnity gap on a contract we were hours from signing. That one catch paid for the platform.", name: "Theo Vasquez", role: "Director of Operations", co: "Continental Risk Partners", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { q: "For the first time we see contingent spend across every business unit in one place. Our CFO checks it before board meetings.", name: "Marguerite Bell", role: "Head of Talent", co: "Brightline Health", photo: "https://randomuser.me/api/portraits/women/65.jpg" },
  { q: "Procurement and legal finally work from the same source of truth. Disputes that took weeks now resolve in a single sitting.", name: "Priya Raghunathan", role: "Chief Procurement Officer", co: "Vantage Logistics", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { q: "The candidate scoring is uncannily good. We cut time-to-shortlist by more than half without losing signal.", name: "Marcus Feld", role: "Head of Talent Acquisition", co: "Northwind", photo: "https://randomuser.me/api/portraits/men/41.jpg" },
  { q: "Rollout took five weeks, integrations included. We saw measurable return inside the first quarter.", name: "Ravindra Anand", role: "CFO", co: "Meridian Components", photo: "https://randomuser.me/api/portraits/men/75.jpg" },
];

const plans = [
  { name: "Pilot", price: "Free", per: "30-day program", desc: "Validate Blue-IQ with one team and one product module.", cta: "Start a pilot", highlight: false,
    features: ["1 product module", "Up to 50 SOWs / month", "Standard integrations", "Email support"] },
  { name: "Scale", price: "Volume-based", per: "billed annually", desc: "For programs running across multiple teams and business units.", cta: "Request a demo", highlight: true,
    features: ["All three products", "Unlimited SOWs & vendors", "Pre-signature risk scoring", "SSO & role-based access", "Priority support"] },
  { name: "Enterprise", price: "Custom", per: "tailored to your org", desc: "For global programs with security, compliance, and SLA needs.", cta: "Talk to sales", highlight: false,
    features: ["Everything in Scale", "SOC 2 reports & audit support", "Custom integrations & API", "Dedicated onboarding team", "99.9% uptime SLA"] },
];

const faqs = [
  { q: "How is Blue-IQ different from a VMS or ATS?", a: "Those systems track workflow. Blue-IQ reads it — applying insight, predictive analytics, and pre-emptive risk scoring across the whole vendor lifecycle." },
  { q: "What is the 10-dimension SOW audit?", a: "A proprietary rubric scoring every SOW on clarity, enforceability, pricing, IP, termination, SLAs, and risk exposure before anyone signs." },
  { q: "How long does implementation take?", a: "Most enterprise rollouts finish in four to six weeks, integrations included, with a dedicated onboarding team." },
  { q: "What return should we expect?", a: "Customers typically see 15–30% less SOW spend leakage and 40–60% faster hiring cycles within the first quarter." },
  { q: "Is Blue-IQ SOC 2 compliant?", a: "Yes — SOC 2 Type II, with enterprise-grade controls across all data processing and storage." },
  { q: "Does it connect to tools we already run?", a: "Blue-IQ integrates with major CRM, ATS, ERP, and procurement systems through native connectors and a documented API." },
];

/* customer wordmarks — swap for real brand SVGs when available */
const customers = ["Hartwell Group", "Continental Risk", "Brightline Health", "Meridian", "Northwind", "Vantage Logistics", "Cedarline", "Atlas Components"];

/* ───────────────────────── primitives ───────────────────────── */
function Mark({ i, className = "w-5 h-5" }: { i: number; className?: string }) {
  const marks = [
    <g key="a"><rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" /><rect x="13" y="13" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.5" /></g>,
    <g key="b"><circle cx="9" cy="12" r="6" fill="currentColor" /><circle cx="16" cy="12" r="6" fill="currentColor" opacity="0.45" /></g>,
    <g key="c"><path d="M12 3l9 16H3z" fill="currentColor" /></g>,
    <g key="d"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="currentColor" /></g>,
    <g key="e"><rect x="3" y="13" width="4" height="8" rx="1" fill="currentColor" /><rect x="10" y="8" width="4" height="13" rx="1" fill="currentColor" /><rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" opacity="0.55" /></g>,
    <g key="f"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3.5" /><circle cx="12" cy="12" r="3" fill="currentColor" /></g>,
  ];
  return <svg viewBox="0 0 24 24" className={className} aria-hidden>{marks[i % marks.length]}</svg>;
}

/* infinite logo carousel (TinyFish-style) */
const LogoMarquee = memo(function LogoMarquee() {
  const row = [...customers, ...customers];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      <div className="marquee flex w-max items-center gap-12 sm:gap-16">
        {row.map((name, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 shrink-0" style={{ color: C.faint }}>
            <Mark i={i} className="w-[18px] h-[18px]" />
            <span className="font-display text-[15px] sm:text-[16px] font-semibold tracking-tight whitespace-nowrap">{name}</span>
          </span>
        ))}
      </div>
    </div>
  );
});

function Chrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 h-10 shrink-0" style={{ borderBottom: `1px solid ${C.line}`, background: C.surface }}>
      <span className="flex gap-1.5">
        {["#E0533D", "#E0A015", "#0E9F6E"].map((c) => <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.9 }} />)}
      </span>
      <span className="flex-1 flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-mono-g text-[10.5px] max-w-full truncate" style={{ background: C.bg, color: C.faint, border: `1px solid ${C.line}` }}>
          <svg viewBox="0 0 24 24" className="w-3 h-3" aria-hidden><rect x="5" y="11" width="14" height="9" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
          {label}
        </span>
      </span>
      <span className="w-[26px]" aria-hidden />
    </div>
  );
}

function Rail({ active = 0 }: { active?: number }) {
  const items = [IconChart, IconHire, IconGovern, IconSpend, IconShield];
  return (
    <div className="flex flex-col items-center gap-1.5 py-4" style={{ borderRight: `1px solid ${C.line}`, background: C.bg }}>
      <span className="w-8 h-8 rounded-[10px] grid place-items-center mb-2" style={{ background: C.blue }}>
        <span className="font-display text-white text-[12px] font-bold tracking-tight">IQ</span>
      </span>
      {items.map((I, i) => (
        <span key={i} className="w-9 h-9 grid place-items-center rounded-[10px]" style={{ background: i === active ? C.blueSoft : "transparent", color: i === active ? C.blue2 : C.faint }}>
          <I className="w-[18px] h-[18px]" />
        </span>
      ))}
    </div>
  );
}

const Bars = memo(function Bars({ data, h = "h-16" }: { data: number[]; h?: string }) {
  return (
    <div className={`flex items-end gap-[5px] ${h}`}>
      {data.map((b, i) => (
        <motion.span key={i} className="flex-1 rounded-[3px]" style={{ background: i === data.length - 1 ? C.blue2 : `${C.blue2}26` }}
          initial={{ height: "8%" }} whileInView={{ height: `${b}%` }} viewport={{ once: true }} transition={{ ...spring, delay: i * 0.04 }} />
      ))}
    </div>
  );
});

/* product interface mockup */
function ConsoleMock({ e }: { e: typeof engines[number] }) {
  return (
    <div className="w-full rounded-[1.4rem] overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW }}>
      <Chrome label={`app.blue-iq.ai/${e.name.toLowerCase()}`} />
      <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[60px_1fr]">
        <Rail active={engines.indexOf(e) + 1} />
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <e.Icon className="w-6 h-6" />
            <span className="font-display text-[15px] sm:text-[17px] font-bold tracking-tight" style={{ color: C.ink }}>Blue-IQ {e.name}</span>
            <span className="ml-auto font-mono-g text-[9.5px] uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ color: C.blue2, background: C.blueSoft }}>{e.kind}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[e.mock.a, e.mock.b].map((m, i) => (
              <div key={i} className="rounded-xl px-4 py-3.5" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                <div className="flex items-end gap-2">
                  <div className="font-display text-[24px] sm:text-[28px] font-bold tracking-tight tabular-nums leading-none" style={{ color: C.ink }}>{m.v}</div>
                  <div className="font-mono-g text-[10px] mb-0.5" style={{ color: C.green }}>{m.d}</div>
                </div>
                <div className="font-mono-g text-[9.5px] uppercase tracking-wider mt-1.5" style={{ color: C.faint }}>{m.l}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-4 pt-3.5 pb-4 mb-3" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-g text-[10px] uppercase tracking-wide" style={{ color: C.faint }}>{e.mock.chartLabel}</span>
              <span className="font-mono-g text-[10px] tabular-nums" style={{ color: C.green }}>+18.4%</span>
            </div>
            <Bars data={e.mock.chart} />
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
    </div>
  );
}

/* tabbed product explorer (TinyFish "Product Tabs") */
const ProductExplorer = memo(function ProductExplorer() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % engines.length), 5600);
    return () => clearInterval(id);
  }, [paused]);
  const e = engines[active];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {engines.map((eng, i) => {
          const a = i === active;
          return (
            <button key={eng.id} onClick={() => setActive(i)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors duration-200"
              style={{ background: a ? C.ink : C.surface, border: `1px solid ${a ? C.ink : C.line2}`, color: a ? "#fff" : C.sub }}>
              <eng.Icon className="w-5 h-5" />
              <span className="font-sans-g text-[13.5px] font-medium">Blue-IQ {eng.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={e.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease }}
          className="grid lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-14 items-center">
          <div>
            <h3 className="font-display font-bold tracking-tight leading-[1.1]" style={{ fontSize: "clamp(24px,2.6vw,34px)", color: C.ink }}>{e.headline}</h3>
            <p className="mt-4 font-sans-g text-[15.5px] leading-relaxed max-w-[46ch]" style={{ color: C.sub }}>{e.desc}</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-2.5 max-w-md">
              {e.points.map((pt) => (
                <li key={pt} className="flex items-center gap-2 font-sans-g text-[13.5px]" style={{ color: C.ink }}>
                  <span className="grid place-items-center w-4 h-4 rounded-full shrink-0" style={{ background: C.blueSoft, color: C.blue2 }}><Check /></span>{pt}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-5 flex-wrap">
              <div className="pr-5" style={{ borderRight: `1px solid ${C.line2}` }}>
                <div className="font-display text-[30px] font-bold tracking-tight tabular-nums leading-none" style={{ color: C.blue }}>{e.stat}</div>
                <div className="font-mono-g text-[10px] uppercase tracking-wide mt-1.5" style={{ color: C.faint }}>{e.statLabel}</div>
              </div>
              {e.url ? (
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-medium" style={{ color: C.blue2 }}>
                  Open {e.name} <span aria-hidden>↗</span>
                </a>
              ) : (
                <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-medium" style={{ color: C.blue2 }}>
                  Request access <Arrow className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
          <Tilt max={5}><ConsoleMock e={e} /></Tilt>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

/* inline stat strip */
const StatStrip = memo(function StatStrip() {
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
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4">
      {cards.map((s, i) => (
        <div key={i} className="px-5 sm:px-8 py-7" style={{ borderLeft: i % 4 === 0 ? "none" : `1px solid ${C.line2}` }}>
          <div className="font-display text-[34px] sm:text-[44px] font-bold tracking-tight tabular-nums leading-none" style={{ color: C.ink }}>{s.v}</div>
          <div className="font-mono-g text-[10px] uppercase tracking-[0.12em] mt-2.5" style={{ color: C.sub }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
});

/* 6-up testimonial grid */
const TestimonialGrid = memo(function TestimonialGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {voices.map((v, i) => (
        <motion.figure key={i} variants={fadeUp} className="flex flex-col rounded-[1.25rem] p-6" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
          <span className="inline-flex items-center gap-2 mb-4" style={{ color: C.faint }}>
            <Mark i={i} className="w-4 h-4" />
            <span className="font-display text-[13px] font-semibold tracking-tight">{v.co}</span>
          </span>
          <blockquote className="font-sans-g text-[14.5px] leading-relaxed flex-1" style={{ color: C.ink }}>{v.q}</blockquote>
          <figcaption className="mt-5 flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
            <img src={v.photo} alt={v.name} width={38} height={38} loading="lazy" className="rounded-full object-cover shrink-0" style={{ width: 38, height: 38, border: `1px solid ${C.line2}` }} />
            <div className="min-w-0">
              <div className="font-sans-g text-[13px] font-semibold truncate" style={{ color: C.ink }}>{v.name}</div>
              <div className="font-mono-g text-[10.5px] truncate" style={{ color: C.faint }}>{v.role}</div>
            </div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
});

/* accordion FAQ (TinyFish-style) */
const FAQAccordion = memo(function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="rounded-[1.5rem] overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
      {faqs.map((f, i) => {
        const o = open === i;
        return (
          <div key={i} style={{ borderTop: i ? `1px solid ${C.line}` : "none" }}>
            <button onClick={() => setOpen(o ? null : i)} className="w-full flex items-center gap-4 text-left px-6 sm:px-7 py-5 transition-colors hover:bg-black/[0.015]" aria-expanded={o}>
              <h3 className="font-display text-[16px] sm:text-[17px] font-semibold flex-1" style={{ color: C.ink }}>{f.q}</h3>
              <motion.span animate={{ rotate: o ? 45 : 0 }} transition={{ duration: 0.25, ease }} className="grid place-items-center w-7 h-7 rounded-full shrink-0" style={{ background: o ? C.blue : C.bg, color: o ? "#fff" : C.sub, border: `1px solid ${o ? C.blue : C.line2}` }}>
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {o && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
                  <p className="px-6 sm:px-7 pb-6 -mt-1 font-sans-g text-[14px] leading-relaxed max-w-[68ch]" style={{ color: C.sub }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
});

/* ───────────────────────── section header ───────────────────────── */
function SectionHead({ eyebrow, title, sub, center = false }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <motion.span variants={fadeUp} custom={0} className="font-mono-g text-[11px] uppercase tracking-[0.16em]" style={{ color: C.blue2 }}>{eyebrow}</motion.span>
      <motion.h2 variants={fadeUp} custom={1} className="mt-3 font-display font-bold tracking-[-0.025em] leading-[1.06]" style={{ fontSize: "clamp(28px,3.6vw,46px)", color: C.ink }}>{title}</motion.h2>
      {sub && <motion.p variants={fadeUp} custom={2} className={`mt-4 font-sans-g text-[16px] leading-relaxed ${center ? "mx-auto" : ""} max-w-xl`} style={{ color: C.sub }}>{sub}</motion.p>}
    </div>
  );
}

/* ───────────────────────── page ───────────────────────── */
export default function Home() {
  return (
    <div id="top" className="overflow-x-clip" style={{ background: C.bg, color: C.ink }}>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-geist-sans), system-ui, sans-serif; background: ${C.bg}; }
        ::selection { background: ${C.blue}; color: #fff; }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 70% { transform: scale(2.6); opacity: 0; } 100% { opacity: 0; } }
        .pulse { animation: pulse-ring 2.4s ease-out infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee { animation: marquee 36s linear infinite; }
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
        {/* ───── hero (centered, text-forward) ───── */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(${C.line2} 1px, transparent 1px)`, backgroundSize: "28px 28px", opacity: 0.45, maskImage: "radial-gradient(70% 50% at 50% 18%, #000 0%, transparent 75%)", WebkitMaskImage: "radial-gradient(70% 50% at 50% 18%, #000 0%, transparent 75%)" }} />
          <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70%] h-[55%] pointer-events-none" style={{ background: `radial-gradient(closest-side, ${C.blueSoft}, transparent)`, opacity: 0.8 }} />

          <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 pt-36 pb-16 sm:pt-44 sm:pb-20 text-center">
            <Reveal>
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 rounded-full" style={{ background: C.surface, border: `1px solid ${C.line2}`, boxShadow: SHADOW_SM }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.green }} />
                <span className="font-mono-g text-[10.5px] uppercase tracking-[0.14em]" style={{ color: C.sub }}>The intelligence layer · SOC 2 Type II</span>
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="font-display font-bold tracking-[-0.032em] leading-[1.02] mx-auto max-w-[16ch]" style={{ fontSize: "clamp(40px, 6.2vw, 78px)", color: C.ink }}>
                Intelligence for workforce, vendors <span style={{ color: C.blue }}>&amp; services</span>.
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="mt-6 font-sans-g text-[17px] sm:text-[19px] leading-relaxed mx-auto max-w-[58ch]" style={{ color: C.sub }}>
                Traditional VMS and ATS tools track workflow. Blue-IQ reads it — turning every hire,
                contract, and dollar into decisions you can act on.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14.5px] font-medium text-white px-7 py-3.5 rounded-xl" style={{ background: C.blue, boxShadow: "0 14px 32px -14px rgba(0,33,129,0.6)" }}>
                  Request a demo <Arrow />
                </Magnetic>
                <a href="#platform" className="inline-flex items-center gap-2 font-sans-g text-[14.5px] font-medium px-7 py-3.5 rounded-xl transition-colors hover:bg-white" style={{ color: C.ink, border: `1px solid ${C.line2}`, background: C.surface }}>
                  Explore the platform
                </a>
              </motion.div>
              <motion.div variants={fadeUp} custom={4} className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {["No credit card", "4–6 week rollout", "Dedicated onboarding"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 font-sans-g text-[12.5px]" style={{ color: C.faint }}>
                    <span style={{ color: C.green }}><Check className="w-3 h-3" /></span>{t}
                  </span>
                ))}
              </motion.div>
            </Reveal>
          </div>

          {/* logo carousel */}
          <div className="relative" style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: `${C.surface}99` }}>
            <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-8">
              <p className="text-center font-mono-g text-[10.5px] uppercase tracking-[0.18em] mb-7" style={{ color: C.faint }}>Trusted by procurement &amp; talent teams at</p>
              <LogoMarquee />
            </div>
          </div>
        </section>

        {/* ───── product explorer ───── */}
        <section id="platform" className="scroll-mt-24 py-24 sm:py-32">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="mb-14"><SectionHead center eyebrow="The platform" title="Three products, one Blue-IQ." sub="HIRE, GOVERN, and SPEND each solve a distinct problem — and share a single intelligence core. Select a product to see it live." /></Reveal>
            <Reveal><motion.div variants={fadeUp}><ProductExplorer /></motion.div></Reveal>
          </div>
        </section>

        {/* ───── statement band ───── */}
        <section className="relative overflow-hidden" style={{ background: C.blue }}>
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)", backgroundSize: "26px 26px", opacity: 0.5, maskImage: "radial-gradient(80% 90% at 15% 50%, #000, transparent)", WebkitMaskImage: "radial-gradient(80% 90% at 15% 50%, #000, transparent)" }} />
          <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
            <Reveal>
              <motion.p variants={fadeUp} custom={0} className="font-mono-g text-[11px] uppercase tracking-[0.16em] mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>One record, end to end</motion.p>
              <motion.p variants={fadeUp} custom={1} className="font-display font-bold tracking-[-0.025em] leading-[1.12] max-w-[20ch]" style={{ fontSize: "clamp(28px,4.4vw,56px)", color: "#fff" }}>
                From requisition to invoice, <span style={{ color: "#A9B9FF" }}>one intelligent record</span> every team can trust.
              </motion.p>
              <motion.div variants={fadeUp} custom={2} className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                {[["HIRE", "validates"], ["GOVERN", "governs"], ["SPEND", "confirms"]].map(([n, v]) => (
                  <span key={n} className="inline-flex items-center gap-2 font-sans-g text-[14px]" style={{ color: "rgba(255,255,255,0.72)" }}>
                    <span className="font-display font-bold tracking-tight" style={{ color: "#fff" }}>{n}</span> {v}
                  </span>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───── stat strip ───── */}
        <section className="py-20 sm:py-24" style={{ background: C.surface, borderBottom: `1px solid ${C.line}` }}>
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="mb-10"><SectionHead eyebrow="By the numbers" title="Measured, not promised." /></Reveal>
            <Reveal><motion.div variants={fadeUp}><StatStrip /></motion.div></Reveal>
          </div>
        </section>

        {/* ───── use cases ───── */}
        <section className="py-24 sm:py-32">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="mb-12"><SectionHead eyebrow="What you gain" title="Outcomes every team can measure." sub="One platform across procurement, finance, legal, and talent — each with its own win." /></Reveal>
            <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((u) => (
                <motion.div key={u.title} variants={fadeUp} whileHover={{ y: -5, boxShadow: SHADOW }} transition={spring} className="rounded-[1.25rem] p-7" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                  <span className="grid place-items-center w-11 h-11 rounded-xl mb-5" style={{ background: C.blueSoft, color: C.blue }}><u.Icon className="w-5 h-5" /></span>
                  <h3 className="font-display text-[18px] font-bold tracking-tight mb-2" style={{ color: C.ink }}>{u.title}</h3>
                  <p className="font-sans-g text-[14px] leading-relaxed" style={{ color: C.sub }}>{u.body}</p>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ───── testimonials ───── */}
        <section id="stories" className="scroll-mt-24 py-24 sm:py-32" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="mb-12"><SectionHead center eyebrow="Customer stories" title="What customers measure." sub="Procurement, finance, and talent leaders on what changed after Blue-IQ." /></Reveal>
            <Reveal><TestimonialGrid /></Reveal>
          </div>
        </section>

        {/* ───── pricing ───── */}
        <section id="pricing" className="scroll-mt-24 py-24 sm:py-32">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <Reveal className="mb-12"><SectionHead center eyebrow="Pricing" title="Start with a pilot. Scale when it's proven." sub="Begin with one team at no cost, then expand across the organization as the return shows up." /></Reveal>
            <Reveal className="grid lg:grid-cols-3 gap-4 items-stretch">
              {plans.map((p) => (
                <motion.div key={p.name} variants={fadeUp} className="flex flex-col rounded-[1.5rem] p-7 sm:p-8" style={{ background: C.surface, border: `1px solid ${p.highlight ? C.blue : C.line}`, boxShadow: p.highlight ? SHADOW : "none", outline: p.highlight ? `1px solid ${C.blue}` : "none" }}>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="font-display text-[19px] font-bold tracking-tight" style={{ color: C.ink }}>{p.name}</h3>
                    {p.highlight && <span className="font-mono-g text-[9.5px] uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: C.blue, color: "#fff" }}>Most popular</span>}
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-[30px] font-bold tracking-tight" style={{ color: C.ink }}>{p.price}</span>
                    <span className="font-mono-g text-[11px]" style={{ color: C.faint }}>{p.per}</span>
                  </div>
                  <p className="mt-3 font-sans-g text-[13.5px] leading-relaxed" style={{ color: C.sub }}>{p.desc}</p>
                  <ul className="mt-6 grid gap-2.5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-sans-g text-[13.5px]" style={{ color: C.ink }}>
                        <span className="mt-0.5 grid place-items-center w-4 h-4 rounded-full shrink-0" style={{ background: C.blueSoft, color: C.blue2 }}><Check /></span>{f}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="mt-8 inline-flex items-center justify-center gap-2 font-sans-g text-[14px] font-medium px-5 py-3 rounded-xl transition-colors"
                    style={p.highlight ? { background: C.blue, color: "#fff" } : { background: C.surface, color: C.ink, border: `1px solid ${C.line2}` }}>
                    {p.cta} <Arrow className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ───── faq ───── */}
        <section id="faq" className="scroll-mt-24 py-24 sm:py-32" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div className="max-w-[920px] mx-auto px-5 sm:px-8">
            <Reveal className="mb-12 text-center"><SectionHead center eyebrow="FAQ" title="Frequently asked." /></Reveal>
            <Reveal><motion.div variants={fadeUp}><FAQAccordion /></motion.div></Reveal>
            <Reveal className="mt-8 text-center">
              <motion.a variants={fadeUp} href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-medium" style={{ color: C.blue2 }}>Still have questions? Talk to us <Arrow /></motion.a>
            </Reveal>
          </div>
        </section>

        {/* ───── final cta ───── */}
        <section className="px-5 sm:px-8 py-24 sm:py-32">
          <Reveal className="max-w-[1180px] mx-auto">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[2rem] px-8 sm:px-16 py-20 sm:py-24 text-center" style={{ background: C.blue }}>
              <img src="https://picsum.photos/seed/blueiq-enterprise/1600/900" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.16, mixBlendMode: "luminosity" }} />
              <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(120% 90% at 50% -10%, ${C.blue2}cc, ${C.blue} 60%)` }} />
              <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.5, maskImage: "radial-gradient(70% 80% at 50% 0%, #000, transparent)", WebkitMaskImage: "radial-gradient(70% 80% at 50% 0%, #000, transparent)" }} />
              <div className="relative">
                <h2 className="font-display font-bold tracking-[-0.025em] leading-[1.04] text-white mx-auto max-w-3xl" style={{ fontSize: "clamp(32px,4.8vw,60px)" }}>
                  Move from workflow to intelligence.
                </h2>
                <p className="mt-5 font-sans-g text-[15px] sm:text-[17px] mx-auto max-w-xl" style={{ color: "rgba(255,255,255,0.82)" }}>
                  Join the enterprises managing the SOW and contingent-workforce spend on Blue-IQ.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14.5px] font-medium px-7 py-3.5 rounded-xl" style={{ background: "#fff", color: C.blue }}>
                    Request a demo <Arrow />
                  </Magnetic>
                  <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14.5px] font-medium text-white px-7 py-3.5 rounded-xl transition-colors hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
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
