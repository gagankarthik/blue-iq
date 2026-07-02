"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { MZ } from "@/lib/theme";

const ease = [0.16, 1, 0.3, 1] as const;
const DURATION = 6500;

type Tab = { id: string; label: string; h: string; p: string; cta: string; color: string; tint: string; href: string; external?: boolean };
const tabs: Tab[] = [
  { id: "parsing", label: "ParsingLab", h: "Parse any resume, instantly.", cta: "Visit ParsingLab", href: "https://www.parsinglab.blue-iq.ai/", external: true, color: "#002181", tint: "#EAECF7",
    p: "Drop in a resume, scan, or export and get back clean, schema-validated JSON. Every field is scored for confidence, so your team reviews only what's uncertain. ParsingLab runs on its own site." },
  { id: "govern", label: "Govern SOW", h: "Score every clause before you sign.", cta: "Visit Govern", href: "https://govern.blue-iq.ai/", external: true, color: "#6E3AD6", tint: "#F1EBFB",
    p: "Govern reads contracts and statements of work against your playbook, flags the clauses that carry risk, and hands your legal team a report they can act on. It runs on its own dedicated site." },
  { id: "custom", label: "Custom solutions", h: "A product built around your workflow.", cta: "Explore custom solutions", href: "/solutions", color: "#0E8A6B", tint: "#E7F4EF",
    p: "When no off-the-shelf tool fits, we design and ship a document product around the way your team actually works, engineered, delivered, and supported by us." },
];

/* deterministic small-pixel texture (edge-weighted so the centred card stays clean) */
const F_COLS = 44, F_ROWS = 26;
const FIELD: { c: number; r: number; o: number }[] = (() => {
  const arr: { c: number; r: number; o: number }[] = [];
  const cx = (F_COLS - 1) / 2, cy = (F_ROWS - 1) / 2, maxd = Math.hypot(cx, cy);
  for (let r = 0; r < F_ROWS; r++) for (let c = 0; c < F_COLS; c++) {
    const n = (Math.sin(r * 1.3 + c * 0.7) + Math.cos(c * 0.9 - r * 0.6) + 1.4) / 3.6;
    const dist = Math.hypot(c - cx, r - cy) / maxd;
    const o = Math.round(Math.max(0, n * (0.12 + 0.55 * dist)) * 1000) / 1000;
    if (o < 0.04) continue;
    arr.push({ c, r, o });
  }
  return arr;
})();
function PixelField({ color }: { color: string }) {
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${F_COLS} ${F_ROWS}`}>
      {FIELD.map((p, i) => (
        <rect key={i} x={p.c + 0.18} y={p.r + 0.18} width="0.5" height="0.5" rx="0.1" fill={color} fillOpacity={p.o} />
      ))}
    </svg>
  );
}

function Field({ label, value, drop }: { label: string; value: string; drop?: boolean }) {
  return (
    <div>
      <div className="font-sans-g text-[11px] font-semibold mb-1.5" style={{ color: MZ.sub }}>{label}</div>
      <div className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: MZ.bg, border: `1px solid ${MZ.line2}` }}>
        <span className="font-sans-g text-[13px]" style={{ color: MZ.ink }}>{value}</span>
        {drop && <ChevronDown className="w-4 h-4" strokeWidth={2} style={{ color: MZ.faint }} />}
      </div>
    </div>
  );
}

function Mock({ id }: { id: string }) {
  if (id === "parsing") {
    return (
      <div className="w-full max-w-[300px] rounded-xl p-5" style={{ background: "#fff", border: `1px solid ${MZ.line2}`, boxShadow: "0 26px 50px -26px rgba(20,18,10,0.35)" }}>
        <div className="font-display font-light text-[16px] mb-4" style={{ color: MZ.ink }}>Extraction schema</div>
        <div className="space-y-3.5">
          <Field label="Document type" value="Clinical resume" drop />
          <Field label="Output" value="Schema-validated JSON" drop />
          <div>
            <div className="font-sans-g text-[11px] font-semibold mb-1.5" style={{ color: MZ.sub }}>Fields</div>
            <div className="flex flex-wrap gap-1.5">
              {["Name", "Credential", "Specialty", "Experience"].map((t) => (
                <span key={t} className="font-sans-g text-[11px] font-medium px-2 py-1 rounded-md" style={{ background: MZ.soft, color: MZ.accent }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <button className="mt-5 w-full rounded-lg py-2.5 font-sans-g text-[13px] font-semibold text-white" style={{ background: MZ.ink2 }}>Run extraction</button>
      </div>
    );
  }
  if (id === "govern") {
    const rows: [string, string, string][] = [["Auto-renewal", "High", "#C0492E"], ["Liability cap", "Medium", "#B07A08"], ["Termination", "Low", "#1F7A54"]];
    return (
      <div className="w-full max-w-[300px] rounded-xl p-5" style={{ background: "#fff", border: `1px solid ${MZ.line2}`, boxShadow: "0 26px 50px -26px rgba(20,18,10,0.35)" }}>
        <div className="font-display font-light text-[16px] mb-4" style={{ color: MZ.ink }}>Contract review</div>
        <div className="space-y-2.5">
          {rows.map(([c, r, col]) => (
            <div key={c} className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: MZ.bg, border: `1px solid ${MZ.line}` }}>
              <span className="font-sans-g text-[13px]" style={{ color: MZ.ink }}>{c}</span>
              <span className="font-sans-g text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: col + "22", color: col }}>{r}</span>
            </div>
          ))}
        </div>
        <button className="mt-5 w-full rounded-lg py-2.5 font-sans-g text-[13px] font-semibold text-white" style={{ background: MZ.ink2 }}>View full report</button>
      </div>
    );
  }
  const steps = ["Ingest documents", "Extract & score", "Deliver to your stack"];
  return (
    <div className="w-full max-w-[300px] rounded-xl p-5" style={{ background: "#fff", border: `1px solid ${MZ.line2}`, boxShadow: "0 26px 50px -26px rgba(20,18,10,0.35)" }}>
      <div className="font-display font-light text-[16px] mb-4" style={{ color: MZ.ink }}>Your pipeline</div>
      <div className="space-y-2.5">
        {steps.map((s) => (
          <div key={s} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: MZ.bg, border: `1px solid ${MZ.line}` }}>
            <span className="grid place-items-center w-6 h-6 rounded-full shrink-0" style={{ background: MZ.accent, color: "#fff" }}><Check className="w-3.5 h-3.5" strokeWidth={3} /></span>
            <span className="font-sans-g text-[13px]" style={{ color: MZ.ink }}>{s}</span>
          </div>
        ))}
      </div>
      <button className="mt-5 w-full rounded-lg py-2.5 font-sans-g text-[13px] font-semibold text-white" style={{ background: MZ.ink2 }}>Deploy</button>
    </div>
  );
}

export default function PlatformShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || !inView || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % tabs.length), DURATION);
    return () => clearTimeout(t);
  }, [active, paused, inView, reduce]);

  const tab = tabs[active];

  return (
    <section ref={ref} className="px-5 sm:px-8 lg:min-h-[100svh] flex items-center py-16 sm:py-20 lg:py-24" style={{ background: MZ.bg2 }} aria-labelledby="plat-h">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease }}
        className="max-w-[1240px] w-full mx-auto rounded-[2rem] p-7 sm:p-12" style={{ background: MZ.surface, border: `1px solid ${MZ.line2}`, boxShadow: "0 40px 90px -50px rgba(20,18,10,0.3)" }}>
        <h2 id="plat-h" className="sr-only">The Blue-IQ product suite</h2>

        {/* evenly-spaced carousel tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-9 sm:mb-14" role="tablist" aria-label="Products" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {tabs.map((t, i) => {
            const on = i === active;
            return (
              <button key={t.id} role="tab" aria-selected={on} onClick={() => setActive(i)} className="relative text-left pb-2.5 transition-colors" style={{ color: on ? MZ.ink : MZ.faint }}>
                <span className="font-display font-light tracking-[-0.03em] block leading-none" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}>{t.label}</span>
                <span className="absolute left-0 bottom-0 h-[3px] rounded-full" style={{ width: "100%", background: MZ.line2 }} />
                {on && (
                  <motion.span key={reduce ? "static" : active} className="absolute left-0 bottom-0 h-[3px] rounded-full" style={{ background: MZ.accent }}
                    initial={{ width: reduce ? "100%" : "0%" }} animate={{ width: "100%" }} transition={{ duration: reduce || paused ? 0.3 : DURATION / 1000, ease: "linear" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* split content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatePresence mode="wait">
            <motion.div key={tab.id + "-c"} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}>
              <h3 className="font-display font-light tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", color: MZ.ink }}>{tab.h}</h3>
              <p className="mt-5 font-sans-g leading-relaxed max-w-[44ch]" style={{ fontSize: "1.05rem", color: MZ.sub }}>{tab.p}</p>
              <a href={tab.href} target={tab.external ? "_blank" : undefined} rel={tab.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 mt-7 font-sans-g text-[15px] font-semibold group" style={{ color: MZ.accent }}>
                {tab.cta} {tab.external
                  ? <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                  : <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />}
              </a>
            </motion.div>
          </AnimatePresence>

          <div className="relative rounded-[1.6rem] overflow-hidden grid place-items-center min-h-[400px] p-8" style={{ background: tab.tint, border: `1px solid ${MZ.line2}`, transition: "background .5s ease" }}>
            <PixelField color={tab.color} />
            <AnimatePresence mode="wait">
              <motion.div key={tab.id + "-m"} initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45, ease }} className="relative">
                <Mock id={tab.id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
