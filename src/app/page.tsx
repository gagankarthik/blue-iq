"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import PixelBlast from "@/components/PixelBlast";

/* ── animation presets ── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: EASE },
  }),
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/* ── indexed section label: [ 02 ] —— THE CHALLENGE ── */
function SectionLabel({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) {
  return (
    <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-3 mb-5">
      <span className={`font-mono-tech text-[10px] tracking-tight ${light ? "text-white/70" : "text-[#002181]"}`}>[ {index} ]</span>
      <span className={`h-px w-8 ${light ? "bg-white/30" : "bg-[#bfc9c4]"}`} />
      <span className={`font-label text-[10px] tracking-[0.3em] uppercase ${light ? "text-white/60" : "text-[#4c635c]"}`}>{children}</span>
    </motion.div>
  );
}

/* ── L-shaped registration / crop marks framing a region ── */
function CornerMarks({ color = "rgba(0,33,129,0.35)", size = 18, inset = "1rem" }: { color?: string; size?: number; inset?: string }) {
  const corners = [
    { pos: { top: inset, left: inset }, b: "borderTop borderLeft" },
    { pos: { top: inset, right: inset }, b: "borderTop borderRight" },
    { pos: { bottom: inset, left: inset }, b: "borderBottom borderLeft" },
    { pos: { bottom: inset, right: inset }, b: "borderBottom borderRight" },
  ];
  return (
    <>
      {corners.map((c, i) => {
        const style: React.CSSProperties = { position: "absolute", width: size, height: size, ...c.pos };
        if (c.b.includes("borderTop")) style.borderTop = `1px solid ${color}`;
        if (c.b.includes("borderBottom")) style.borderBottom = `1px solid ${color}`;
        if (c.b.includes("borderLeft")) style.borderLeft = `1px solid ${color}`;
        if (c.b.includes("borderRight")) style.borderRight = `1px solid ${color}`;
        return <span key={i} className="z-[3] pointer-events-none hidden sm:block" style={style} />;
      })}
    </>
  );
}

/* ── animated mini bar chart for product dashboard mockups ── */
function MiniChart({ accent = "#4d8aff" }: { accent?: string }) {
  const bars = [38, 60, 46, 72, 55, 84, 68, 96];
  return (
    <div className="flex items-end gap-[5px] h-14">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: "4%", opacity: 0 }}
          whileInView={{ height: `${h}%`, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 + i * 0.06, duration: 0.55, ease: EASE }}
          className="flex-1 rounded-[2px]"
          style={{ background: i === bars.length - 1 ? accent : "rgba(77,138,255,0.22)" }}
        />
      ))}
    </div>
  );
}

function useCounter(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let v = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [target, duration, trigger]);
  return count;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const sow      = useCounter(10000, 2200, statsInView);
  const vendors  = useCounter(1200,  2000, statsInView);
  const oversight = useCounter(63,   1800, statsInView);
  const hiring   = useCounter(32,    1600, statsInView);

  /* scroll-progress hairline */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navGroups = [
    { label: "PLATFORM",  items: ["Analytics Suite", "Vendor Management", "Spend Intelligence"] },
    { label: "SOLUTIONS", items: ["Enterprise", "Mid-Market", "Public Sector"] },
    { label: "INSIGHTS",  items: ["Research & Reports", "Case Studies", "Webinars & Events", "Blog"] },
    { label: "COMPANY",   items: ["About Us", "Careers", "Contact"] },
  ];

  const products = [
    {
      tag: "Intelligent Hiring Engine",
      name: "HIRE",
      color: "#002181",
      headline: "Hire Smarter. Move Faster.",
      body: "AI-powered resume parsing, automated profile standardization, CRM/ATS integration, and credentialing verification — before work begins.",
      bullets: ["AI Resume Parsing & Standardization", "CRM / ATS Deep Integration", "Real-Time Credential Verification", "Smart Candidate Scoring"],
      stat1: { val: "3.2×", lbl: "Faster Hiring" },
      stat2: { val: "98%", lbl: "Parse Accuracy" },
    },
    {
      tag: "SOW Intelligence",
      name: "GOVERN",
      color: "#002181",
      headline: "Compliance Before It Costs You.",
      body: "Our 10-dimension SOW Audit Rubric evaluates every contract like a seasoned auditor — catching clarity gaps, SLA risks, and compliance issues before signatures.",
      bullets: ["10-Dimension SOW Audit Rubric", "Pre-Signature Risk Scoring", "Clause-Level Compliance Checks", "Automated Remediation Suggestions"],
      stat1: { val: "99%", lbl: "Compliance Rate" },
      stat2: { val: "70%", lbl: "Faster Review" },
    },
    {
      tag: "Real-Time Visibility",
      name: "SPEND",
      color: "#002181",
      headline: "See Every Dollar. Always.",
      body: "Consolidated visibility into SOW and contingent workforce spend — overspend alerts, forecasting, invoice reconciliation, and executive dashboards in real time.",
      bullets: ["Consolidated Spend Dashboards", "Overspend & Anomaly Alerts", "Forecasting & Budget Tracking", "Invoice & Contract Reconciliation"],
      stat1: { val: "45%", lbl: "Spend Reduction" },
      stat2: { val: "10K+", lbl: "SOWs Managed" },
    },
  ];

  const faqs = [
    { q: "How does Blue-IQ differ from traditional VMS/ATS?", a: "Traditional systems track workflow. Blue-IQ delivers intelligence — AI-powered insights, predictive analytics, and proactive risk mitigation across the entire vendor lifecycle." },
    { q: "What is the 10-dimension SOW Audit Rubric?", a: "Our proprietary framework evaluates SOWs across 10 critical dimensions including clarity, enforceability, pricing, IP, termination, SLAs, and risk exposure — before contracts are signed." },
    { q: "How quickly can we implement Blue-IQ?", a: "Most enterprise implementations complete in 4–6 weeks with our dedicated onboarding team ensuring seamless integration with existing systems." },
    { q: "What ROI can we expect?", a: "Clients typically see 15–30% reduction in SOW spend leakage and 40–60% faster hiring cycles within the first quarter of deployment." },
    { q: "Is Blue-IQ SOC 2 compliant?", a: "Yes — we maintain SOC 2 Type II certification with enterprise-grade security protocols across all data processing and storage." },
  ];

  const testimonials = [
    { q: "Blue-IQ transformed how we manage our vendor ecosystem. We've reduced overspend by 45% and cut SOW review time by 70%.", name: "Sarah Chen", role: "VP of Procurement, Global Tech" },
    { q: "The 10-dimension SOW audit is a game-changer. We caught compliance issues that would have cost us millions before contracts were signed.", name: "Michael Rodriguez", role: "Director of Operations, Financial Services" },
    { q: "Finally, a platform that gives real visibility into contingent workforce spend. The executive dashboards are invaluable.", name: "Jennifer Walsh", role: "Head of Talent Acquisition, Healthcare" },
    { q: "Implementation was seamless and the ROI was evident within the first quarter. Highly recommend to any enterprise.", name: "David Kim", role: "CFO, Manufacturing Corp" },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:ital,wght@0,400;0,500;0,600;1,400&family=Space+Mono:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0');

        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }

        .font-headline  { font-family: 'Space Grotesk', sans-serif; }
        .font-body      { font-family: 'Inter', sans-serif; }
        .font-label     { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-tech { font-family: 'Space Mono', monospace; }
        .data-num       { font-variant-numeric: tabular-nums; }

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal;
          font-size: 24px; line-height: 1;
          letter-spacing: normal; text-transform: none;
          display: inline-block; white-space: nowrap;
          -webkit-font-smoothing: antialiased;
        }

        .blueprint-grid {
          background-image:
            linear-gradient(to right,  #bfc9c4 0.5px, transparent 0.5px),
            linear-gradient(to bottom, #bfc9c4 0.5px, transparent 0.5px);
          background-size: 40px 40px;
        }

        /* measurement tick rail — major ticks every 80px, minor every 16px */
        .tick-rail {
          height: 11px;
          background-image:
            linear-gradient(to right, #aab4af 0 1px, transparent 1px),
            linear-gradient(to right, #d2d9d4 0 1px, transparent 1px);
          background-size: 80px 11px, 16px 5px;
          background-position: left bottom, left bottom;
          background-repeat: repeat-x, repeat-x;
        }

        .vertical-text { writing-mode: vertical-rl; text-orientation: mixed; }

        details summary { list-style: none; }
        details summary::-webkit-details-marker { display: none; }

        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 30s linear infinite; white-space: nowrap; }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(0,33,129,0.45); }
          70%  { box-shadow: 0 0 0 6px rgba(0,33,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,33,129,0); }
        }
        .pulse-dot { animation: pulse-ring 2.4s ease-out infinite; }

        @keyframes scroll-cue {
          0%   { transform: translateY(0); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateY(7px); opacity: 0; }
        }
        .scroll-cue-dot { animation: scroll-cue 1.8s ease-in-out infinite; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f9f9fb; }
        ::-webkit-scrollbar-thumb { background: #bfc9c4; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #002181; }
      `}</style>

      {/* ── SCROLL PROGRESS HAIRLINE ── */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#002181] z-[60]"
      />

      {/* ── NAVIGATION ── */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(254,254,254,0.95)" : "rgba(254,254,254,0.98)",
          backdropFilter: "blur(16px)",
          borderBottom: "0.5px solid #e2e8e4",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[64px]">
            {/* Logo */}
            <Image src="/logo_large.webp" alt="Blue-IQ" width={108} height={36} priority />

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navGroups.map((g) => (
                <div key={g.label} className="relative group">
                  <button className="font-label text-[11px] font-semibold tracking-[0.1em] text-slate-500 hover:text-[#002181] transition-colors uppercase pb-0.5">
                    {g.label}
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <div className="w-52 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden py-2">
                      {g.items.map((item) => (
                        <a key={item} href="#" className="block px-4 py-2.5 text-[13px] font-body text-slate-600 hover:bg-slate-50 hover:text-[#002181] transition-colors">
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a href="/contact" className="hidden sm:block font-label text-[11px] font-semibold tracking-[0.1em] text-slate-500 hover:text-[#002181] uppercase transition-colors">
                Contact
              </a>
              <button
                className="hidden sm:inline-flex items-center gap-2 font-label text-[11px] font-bold tracking-[0.12em] px-5 py-2.5 transition-all duration-200 uppercase group"
                style={{ background: "#002181", color: "white" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0033cc")}
                onMouseLeave={e => (e.currentTarget.style.background = "#002181")}
              >
                Request Demo
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>

              {/* Hamburger */}
              <button
                className="lg:hidden p-2 -mr-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col gap-[5px]">
                  <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block h-[1.5px] bg-slate-700 origin-center" />
                  <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block h-[1.5px] bg-slate-700" />
                  <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block h-[1.5px] bg-slate-700 origin-center" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
            >
              <div className="px-5 py-6 space-y-5 max-h-[80vh] overflow-y-auto">
                {navGroups.map((g) => (
                  <div key={g.label}>
                    <div className="font-label text-[10px] font-bold tracking-[0.2em] text-[#002181] uppercase mb-2">{g.label}</div>
                    <div className="space-y-1 pl-3 border-l border-slate-100">
                      {g.items.map((item) => (
                        <a key={item} href="#" className="block py-1.5 font-body text-[14px] text-slate-500 hover:text-[#002181] transition-colors">
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                  <a href="/contact" className="block text-center font-label text-[11px] font-semibold tracking-[0.1em] text-slate-500 uppercase py-2.5 border border-slate-200">
                    Contact
                  </a>
                  <button className="font-label text-[11px] font-bold tracking-[0.12em] py-3 uppercase w-full" style={{ background: "#002181", color: "white" }}>
                    Request Demo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── SIDE NAV (desktop only) ── */}
      <aside className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-7">
        {["HIRE", "GOVERN", "SPEND"].map((l, i) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="group flex flex-col items-center gap-2"
          >
            <span className="font-mono-tech text-[8px] text-[#bfc9c4] group-hover:text-[#002181] transition-colors">0{i + 1}</span>
            <span
              className="vertical-text font-label text-[9px] tracking-widest transition-colors"
              style={{ color: i === 0 ? "#002181" : "#bfc9c4" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#002181")}
              onMouseLeave={e => (e.currentTarget.style.color = i === 0 ? "#002181" : "#bfc9c4")}
            >
              {l}
            </span>
          </a>
        ))}
      </aside>

      <main className="bg-[#fefefe] text-[#1a1c1d]" style={{ paddingTop: "64px" }}>

        {/* ── HERO ── */}
        <section className="relative min-h-[92vh] flex flex-col overflow-hidden border-b border-[#e2e8e4]">
          {/* Pixel background */}
          <div className="absolute inset-0 z-0">
            <PixelBlast
              variant="square"
              pixelSize={4}
              color="#B19EEF"
              patternScale={2}
              patternDensity={1}
              pixelSizeJitter={0}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid={false}
              speed={0.5}
              edgeFade={0.3}
              transparent
            />
          </div>
          <div className="absolute inset-0 blueprint-grid opacity-[0.12] pointer-events-none z-[1]" />
          <CornerMarks inset="1.25rem" />

          {/* Content */}
          <div className="relative z-10 flex flex-col grow justify-center max-w-[1360px] mx-auto w-full px-5 sm:px-8 lg:px-16 py-16 pt-20">
            {/* top meta strip */}
            <div className="hidden sm:flex items-center justify-between font-mono-tech text-[10px] tracking-wider text-[#707975] mb-10">
              <span>BLUE-IQ / PLATFORM SUITE</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#002181]" />
                REV 3.0 — 2025
              </span>
            </div>

            <Reveal>
              <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2.5 font-label text-[10px] tracking-[0.25em] text-[#4c635c] uppercase mb-6 border border-[#bfc9c4]/70 bg-white/50 backdrop-blur-sm px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#002181]" />
                </span>
                The Intelligence Layer
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-headline font-bold leading-[1.03] tracking-[-0.025em] text-[#1a1c1d] mb-6"
                style={{ fontSize: "clamp(38px, 6.5vw, 84px)", maxWidth: "880px" }}
              >
                THE INTELLIGENCE LAYER FOR{" "}
                <span style={{ color: "#002181" }}>WORKFORCE, VENDORS</span>{" "}
                &amp; SERVICES
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="font-body text-[#3f4945] text-base sm:text-lg leading-relaxed mb-9 max-w-xl">
                While traditional VMS and ATS tools track workflow, Blue-IQ delivers intelligence —
                from hire to governed to spend, complete visibility across your vendor ecosystem.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
                <button
                  className="group inline-flex items-center gap-2.5 font-label text-[11px] font-bold tracking-[0.15em] uppercase px-7 py-3.5 transition-all duration-200"
                  style={{ background: "#002181", color: "white" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#0033cc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#002181")}
                >
                  Explore Platform
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
                <button
                  className="group inline-flex items-center gap-2.5 font-label text-[11px] font-bold tracking-[0.15em] uppercase px-7 py-3.5 border transition-all duration-200 hover:bg-white/60"
                  style={{ borderColor: "#bfc9c4", color: "#1a1c1d" }}
                >
                  <span className="material-symbols-outlined !text-[16px] text-[#002181]">play_circle</span>
                  Watch Demo
                </button>
              </motion.div>
            </Reveal>

            {/* floating system-spec annotation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
              className="hidden xl:block absolute right-16 top-[26%] w-[208px] bg-white/70 backdrop-blur-md border border-[#bfc9c4]/70"
            >
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#e2e8e4]">
                <span className="font-mono-tech text-[9px] tracking-wider text-[#4c635c]">SYSTEM</span>
                <span className="flex items-center gap-1.5 font-mono-tech text-[9px] text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ boxShadow: "0 0 6px #10b981" }} />
                  OPERATIONAL
                </span>
              </div>
              <div className="px-3.5 py-3 space-y-2">
                {[
                  { k: "uptime", v: "99.98%" },
                  { k: "latency", v: "42 ms" },
                  { k: "audits/day", v: "8,420" },
                ].map((r) => (
                  <div key={r.k} className="flex items-center justify-between font-mono-tech text-[10px]">
                    <span className="text-[#707975]">{r.k}</span>
                    <span className="text-[#1a1c1d] data-num">{r.v}</span>
                  </div>
                ))}
                <div className="pt-1"><MiniChart accent="#002181" /></div>
              </div>
            </motion.div>

            {/* scroll cue */}
            <div className="hidden lg:flex items-center gap-3 mt-14">
              <div className="w-[18px] h-[28px] rounded-full border border-[#bfc9c4] flex items-start justify-center pt-1.5">
                <span className="scroll-cue-dot w-1 h-1 rounded-full bg-[#002181]" />
              </div>
              <span className="font-mono-tech text-[9px] tracking-widest text-[#707975] uppercase">Scroll to explore</span>
            </div>
          </div>

          {/* measurement tick rail */}
          <div className="relative z-10 w-full max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono-tech text-[9px] text-[#aab4af]">00</span>
              <span className="font-mono-tech text-[9px] text-[#aab4af] tracking-widest">SCALE 1:1</span>
              <span className="font-mono-tech text-[9px] text-[#aab4af]">100</span>
            </div>
            <div className="tick-rail w-full" />
          </div>

          {/* Stats bar */}
          <div
            ref={statsRef}
            className="relative z-10 w-full grid grid-cols-2 sm:grid-cols-4 bg-white/90 backdrop-blur-sm border-t border-[#e2e8e4] mt-3"
          >
            {[
              { val: sow >= 10000 ? "10,000+" : sow.toLocaleString(), lbl: "SOWs Managed" },
              { val: vendors >= 1200 ? "1,200+" : vendors.toLocaleString(), lbl: "Vendors" },
              { val: `${oversight}%`, lbl: "Oversight Reduction" },
              { val: `${(hiring / 10).toFixed(1)}×`, lbl: "Faster Hiring" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group relative p-5 sm:p-6 border-r border-[#e2e8e4] last:border-r-0 flex flex-col gap-1 transition-colors hover:bg-white"
              >
                <span className="absolute top-4 right-4 font-mono-tech text-[9px] text-[#bfc9c4] opacity-0 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                <span className="font-headline data-num text-2xl sm:text-3xl font-bold text-[#1a1c1d] flex items-baseline gap-1.5">
                  {s.val}
                  <span className="material-symbols-outlined !text-[14px] text-emerald-500">trending_up</span>
                </span>
                <span className="font-label text-[9px] text-[#707975] uppercase tracking-widest">{s.lbl}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── LOGOS MARQUEE ── */}
        <div className="overflow-hidden py-4 border-b border-[#e2e8e4] bg-[#f9f9fb]">
          <div className="marquee-track inline-flex gap-12 items-center">
            {["FORTUNE 500", "GLOBAL TECH", "FINANCIAL SERVICES", "HEALTHCARE", "MANUFACTURING", "ENERGY", "PUBLIC SECTOR", "LOGISTICS",
              "FORTUNE 500", "GLOBAL TECH", "FINANCIAL SERVICES", "HEALTHCARE", "MANUFACTURING", "ENERGY", "PUBLIC SECTOR", "LOGISTICS"].map((n, i) => (
              <span key={i} className="font-label text-[10px] tracking-[0.2em] text-[#bfc9c4] uppercase flex items-center gap-6">
                {n}
                <span className="w-1 h-1 rounded-full bg-[#002181]/30 inline-block" />
              </span>
            ))}
          </div>
        </div>

        {/* ── CHALLENGE ── */}
        <section className="border-b border-[#e2e8e4] py-20 sm:py-28">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                <SectionLabel index="01">The Challenge</SectionLabel>
                <motion.h2 variants={fadeUp} custom={1} className="font-headline font-bold tracking-tight text-[#1a1c1d] mb-6" style={{ fontSize: "clamp(28px,4.5vw,52px)" }}>
                  Complex vendor ecosystems.<br />Billions in flow.
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="font-body text-[#3f4945] text-base sm:text-lg leading-relaxed">
                  Enterprises navigate millions flowing through Statements of Work, contingent labor, and
                  hiring pipelines — managing thousands of SOWs and vendor-delivered projects.
                  While traditional platforms track <em>workflow</em>,{" "}
                  <span className="font-semibold text-[#002181]">Blue-IQ delivers intelligence.</span>
                </motion.p>
              </div>

              <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e2e8e4]">
                {[
                  { icon: "analytics", title: "AI-Powered Insights", body: "ML algorithms identify patterns, predict risks, and optimize spend before issues arise.", num: "01" },
                  { icon: "verified",  title: "10-Dimension Audit",  body: "Proprietary SOW evaluation rubric that catches compliance gaps before contracts are signed.", num: "02" },
                  { icon: "bolt",      title: "Real-Time Visibility", body: "Every dollar, every vendor, every SOW in one unified intelligence dashboard.", num: "03" },
                ].map((c, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="group relative bg-[#fefefe] p-8 sm:p-10 transition-colors hover:bg-white">
                    <span className="absolute top-6 right-6 font-mono-tech text-[10px] text-[#bfc9c4]">{c.num}</span>
                    <span className="material-symbols-outlined text-[#002181] mb-5 block transition-transform duration-300 group-hover:-translate-y-0.5">
                      {c.icon}
                    </span>
                    <h3 className="font-headline font-bold text-[15px] uppercase tracking-wide mb-3">{c.title}</h3>
                    <p className="font-body text-sm text-[#3f4945] leading-relaxed">{c.body}</p>
                    <span className="block mt-5 h-px w-0 bg-[#002181] transition-all duration-300 group-hover:w-10" />
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        {products.map((p, idx) => (
          <section
            key={p.name}
            id={p.name.toLowerCase()}
            className="border-b border-[#e2e8e4] py-20 sm:py-28"
          >
            <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
              <Reveal>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${idx % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  {/* Text side */}
                  <div>
                    <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
                      <span className="font-mono-tech text-[10px] text-[#002181]">[ 0{idx + 1} ]</span>
                      <div className="w-1 h-4 bg-[#002181]" />
                      <span className="font-label text-[10px] tracking-[0.2em] text-[#002181] uppercase font-semibold">{p.tag}</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp} custom={1} className="font-headline font-bold leading-[1.05] tracking-[-0.02em] text-[#1a1c1d] mb-2" style={{ fontSize: "clamp(34px,5vw,58px)" }}>
                      BLUE-IQ <span style={{ color: "#002181" }}>{p.name}</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={2} className="font-headline font-semibold text-[#002181] text-[15px] mb-5">{p.headline}</motion.p>

                    <motion.p variants={fadeUp} custom={3} className="font-body text-[#3f4945] leading-relaxed text-[15px] mb-7">{p.body}</motion.p>

                    <motion.ul variants={fadeUp} custom={4} className="space-y-2.5 mb-8">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 font-body text-[13px] text-[#1a1c1d]">
                          <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#002181" }}>
                            <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {b}
                        </li>
                      ))}
                    </motion.ul>

                    <motion.div variants={fadeUp} custom={5} className="flex gap-6 pt-6 border-t border-[#e2e8e4]">
                      <div>
                        <div className="font-headline data-num text-3xl font-bold text-[#002181]">{p.stat1.val}</div>
                        <div className="font-label text-[9px] text-[#707975] uppercase tracking-widest mt-1">{p.stat1.lbl}</div>
                      </div>
                      <div>
                        <div className="font-headline data-num text-3xl font-bold text-[#002181]">{p.stat2.val}</div>
                        <div className="font-label text-[9px] text-[#707975] uppercase tracking-widest mt-1">{p.stat2.lbl}</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Visual side */}
                  <motion.div
                    variants={fadeUp}
                    custom={1}
                    className="relative rounded-2xl overflow-hidden min-h-[340px] sm:min-h-[400px] group"
                    style={{ background: "#0d1117" }}
                  >
                    <div className="absolute inset-0 blueprint-grid opacity-[0.08]" />
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
                      style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(0,33,129,0.35) 0%, transparent 65%)" }}
                    />

                    <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-10 min-h-[340px] sm:min-h-[400px]">
                      {/* Mini dashboard mockup */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-label text-[10px] tracking-[0.2em] text-white/40 uppercase">Blue-IQ {p.name}</span>
                        <span className="flex items-center gap-1.5 font-mono-tech text-[9px] text-emerald-300/70">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
                          LIVE
                        </span>
                      </div>

                      {/* sparkline / bar chart */}
                      <div className="mb-5 bg-white/[0.03] border border-white/5 rounded-lg px-4 pt-3 pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono-tech text-[9px] text-white/40 tracking-wider">PERFORMANCE INDEX</span>
                          <span className="font-mono-tech text-[10px] text-[#4d8aff]">+{12 + idx * 6}.4%</span>
                        </div>
                        <MiniChart />
                      </div>

                      <div className="space-y-2.5">
                        {p.bullets.slice(0, 3).map((b, bi) => (
                          <div key={bi} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2.5 border border-white/5 transition-colors group-hover:border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4d8aff" }} />
                            <span className="font-body text-[12px] text-white/60">{b}</span>
                            <span className="ml-auto font-mono-tech text-[9px] text-emerald-300/50">ACTIVE</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-headline data-num text-[28px] font-bold text-white">{p.stat1.val}</div>
                          <div className="font-label text-[9px] text-white/30 uppercase tracking-widest">{p.stat1.lbl}</div>
                        </div>
                        <div>
                          <div className="font-headline data-num text-[28px] font-bold text-white">{p.stat2.val}</div>
                          <div className="font-label text-[9px] text-white/30 uppercase tracking-widest">{p.stat2.lbl}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        {/* ── WHAT YOU GAIN ── */}
        <section className="border-b border-[#e2e8e4] py-20 sm:py-28 bg-[#f9f9fb]">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-3">
                <div>
                  <SectionLabel index="05">Value Drivers</SectionLabel>
                  <motion.h2 variants={fadeUp} custom={1} className="font-headline font-bold uppercase tracking-tight text-[#1a1c1d]" style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
                    What You Gain
                  </motion.h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e2e8e4]">
                {[
                  { icon: "trending_down", title: "Cost Optimization",     body: "Reduce leakage, eliminate duplicates, improve rate consistency, strengthen forecasting." },
                  { icon: "shield",        title: "Risk Reduction",         body: "Prevent unclear SOWs, improve compliance, reduce exposure, enhance audit readiness." },
                  { icon: "bolt",          title: "Operational Efficiency", body: "Accelerate procurement and hiring, standardize governance, automate manual reviews." },
                  { icon: "insights",      title: "Strategic Visibility",   body: "Real-time insights, clear performance profiles, data-driven executive reporting." },
                ].map((c, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="group relative bg-[#fefefe] p-7 sm:p-8 flex flex-col gap-4 transition-colors hover:bg-white">
                    <span className="absolute top-6 right-6 font-mono-tech text-[10px] text-[#bfc9c4]">0{i + 1}</span>
                    <span className="material-symbols-outlined text-[#002181] transition-transform duration-300 group-hover:-translate-y-0.5">{c.icon}</span>
                    <h3 className="font-headline font-bold text-[13px] uppercase tracking-wide">{c.title}</h3>
                    <p className="font-body text-[12px] text-[#3f4945] leading-relaxed">{c.body}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="border-b border-[#e2e8e4] py-20 sm:py-28">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-3">
                <div>
                  <SectionLabel index="06">Trusted by leaders</SectionLabel>
                  <motion.h2 variants={fadeUp} custom={1} className="font-headline font-bold uppercase tracking-tight text-[#1a1c1d]" style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
                    Client Stories
                  </motion.h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#e2e8e4]">
                {testimonials.map((t, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i * 0.1} className="group bg-[#fefefe] p-8 sm:p-10 flex flex-col gap-5 transition-colors hover:bg-white">
                    {/* quote mark */}
                    <div className="font-headline text-[64px] leading-none text-[#e2e8e4] select-none -mb-4 transition-colors group-hover:text-[#002181]/15">&ldquo;</div>
                    <p className="font-body text-[14px] sm:text-[15px] text-[#1a1c1d] leading-relaxed flex-1 italic">
                      {t.q}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-[#e2e8e4]">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-headline font-bold text-xs text-white"
                        style={{ background: "#002181" }}
                      >
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="font-headline font-semibold text-[13px]">{t.name}</div>
                        <div className="font-label text-[10px] text-[#4c635c] tracking-wide">{t.role}</div>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {[...Array(5)].map((_, s) => <span key={s} className="text-[#002181] text-[13px]">★</span>)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── ECOSYSTEM SUMMARY ── */}
        <section className="border-b border-[#e2e8e4] py-20 sm:py-28 bg-[#f9f9fb]">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
            <Reveal>
              <motion.div variants={fadeUp} className="text-center mb-12 flex flex-col items-center">
                <SectionLabel index="07">Complete Intelligence Ecosystem</SectionLabel>
                <h2 className="font-headline font-bold text-[#1a1c1d] tracking-tight" style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
                  Before · As Contracted · As Delivered
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e2e8e4]">
                {[
                  { icon: "approval", name: "HIRE",   sub: "Validates before work begins",      num: "01" },
                  { icon: "gavel",    name: "GOVERN",  sub: "Ensures compliance as contracted",  num: "02" },
                  { icon: "payments", name: "SPEND",   sub: "Ensures visibility as delivered",   num: "03" },
                ].map((c, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="bg-[#fefefe] p-10 text-center group hover:bg-[#002181] transition-colors duration-300 cursor-default">
                    <span className="font-mono-tech text-[10px] text-[#bfc9c4] group-hover:text-white/40 tracking-widest block mb-6">{c.num}</span>
                    <span className="material-symbols-outlined text-[#002181] group-hover:text-white text-[36px] mb-4 block transition-colors duration-300">{c.icon}</span>
                    <h3 className="font-headline font-bold text-xl mb-2 group-hover:text-white transition-colors duration-300">{c.name}</h3>
                    <p className="font-label text-[10px] text-[#4c635c] group-hover:text-white/60 uppercase tracking-wider transition-colors duration-300">{c.sub}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-b border-[#e2e8e4] py-20 sm:py-28">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                <div>
                  <SectionLabel index="08">Common Questions</SectionLabel>
                  <motion.h2 variants={fadeUp} custom={1} className="font-headline font-bold uppercase tracking-tight text-[#1a1c1d] mb-5" style={{ fontSize: "clamp(26px,3vw,38px)" }}>
                    FAQ
                  </motion.h2>
                  <motion.p variants={fadeUp} custom={2} className="font-body text-[13px] text-[#3f4945] leading-relaxed mb-5">
                    Have a question not covered here? Our team is happy to help.
                  </motion.p>
                  <motion.a variants={fadeUp} custom={3} href="/contact" className="font-label text-[11px] font-bold tracking-[0.1em] text-[#002181] uppercase hover:underline">
                    Contact Us →
                  </motion.a>
                </div>

                <div className="lg:col-span-2 space-y-2">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      custom={i * 0.08}
                      className="border border-[#e2e8e4] overflow-hidden transition-colors hover:border-[#bfc9c4]"
                    >
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f9f9fb] transition-colors"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className="flex items-center gap-3 pr-4">
                          <span className="font-mono-tech text-[10px] text-[#bfc9c4]">0{i + 1}</span>
                          <span className="font-headline font-semibold text-[14px]">{faq.q}</span>
                        </span>
                        <motion.span
                          animate={{ rotate: openFaq === i ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-[16px] font-light"
                          style={{ background: "#002181" }}
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaq === i && (
                          <motion.div
                            key="content"
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 py-4 border-t border-[#e2e8e4] bg-[#f9f9fb]">
                              <p className="font-body text-[13px] text-[#3f4945] leading-relaxed">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 sm:py-28">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
            <Reveal>
              <motion.div
                variants={fadeUp}
                className="relative overflow-hidden text-center px-8 sm:px-16 py-16 sm:py-20"
                style={{ background: "#002181" }}
              >
                {/* Blueprint grid inside CTA */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage: "linear-gradient(to right, white 0.5px, transparent 0.5px), linear-gradient(to bottom, white 0.5px, transparent 0.5px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* radial glow */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(77,138,255,0.35) 0%, transparent 60%)" }} />
                {/* Corner brackets */}
                {["top-0 left-0 border-t border-l","top-0 right-0 border-t border-r","bottom-0 left-0 border-b border-l","bottom-0 right-0 border-b border-r"].map((cls) => (
                  <div key={cls} className={`absolute w-7 h-7 border-white/30 ${cls}`} />
                ))}

                <div className="relative z-10">
                  <motion.span variants={fadeUp} custom={0} className="font-mono-tech text-[10px] tracking-[0.3em] text-white/60 uppercase block mb-5">
                    [ 09 ] — Get Started
                  </motion.span>
                  <motion.h2 variants={fadeUp} custom={1} className="font-headline font-bold text-white leading-tight tracking-[-0.02em] mb-5" style={{ fontSize: "clamp(30px,5vw,64px)" }}>
                    Ready to Move from<br />Workflow to Intelligence?
                  </motion.h2>
                  <motion.p variants={fadeUp} custom={2} className="font-body text-white/70 text-[15px] max-w-lg mx-auto mb-10">
                    Join 500+ enterprises managing over $10B in SOW and contingent workforce spend with Blue-IQ.
                  </motion.p>
                  <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-4">
                    <button className="group inline-flex items-center gap-2.5 font-label text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-3.5 bg-white text-[#002181] transition-all hover:bg-slate-100">
                      Request Platform Demo
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </button>
                    <button className="font-label text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-3.5 text-white border border-white/30 transition-all hover:bg-white/10">
                      Talk to an Expert
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#e2e8e4] bg-[#f9f9fb]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16 py-14 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            <div className="col-span-2 sm:col-span-1">
              <Image src="/logo_large.webp" alt="Blue-IQ" width={100} height={32} className="mb-4" />
              <p className="font-label text-[10px] tracking-[0.08em] text-[#4c635c] leading-relaxed max-w-[200px]">
                The intelligence layer for workforce, vendors, and services operations.
              </p>
            </div>

            {[
              { heading: "PLATFORM",  links: ["HIRE", "GOVERN", "SPEND"] },
              { heading: "RESOURCES", links: ["Documentation", "API Reference", "Case Studies"] },
              { heading: "COMPANY",   links: ["About Us", "Careers", "Contact"] },
            ].map((col) => (
              <div key={col.heading}>
                <div className="font-label text-[9px] font-bold tracking-[0.25em] text-[#002181] uppercase mb-5">{col.heading}</div>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="font-headline text-[11px] tracking-wider text-slate-400 hover:text-[#002181] uppercase transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-[#e2e8e4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-mono-tech text-[10px] tracking-[0.1em] text-[#bfc9c4]">
              © 2025 BLUE-IQ. THE INTELLIGENCE LAYER. ALL RIGHTS RESERVED.
            </p>
            <a href="mailto:hello@blue-iq.com" className="font-mono-tech text-[10px] tracking-widest text-slate-400 hover:text-[#002181] uppercase transition-colors">
              hello@blue-iq.com
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
