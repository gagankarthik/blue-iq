"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, Layers, Plug, Gauge, MoveRight, Check } from "lucide-react";
import { MZ } from "@/lib/theme";
import { Reveal, fadeUp } from "@/components/motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Tab = { id: string; label: string; Icon: typeof ScanLine; h: string; p: string; points: string[] };
const tabs: Tab[] = [
  { id: "depth", label: "Domain depth", Icon: ScanLine, h: "Reads with real domain knowledge.",
    p: "Sonar understands the detail a generic model flattens (credentials, clauses, line items) and never invents a value. Uncertain fields are flagged, not fabricated.",
    points: ["Domain-tuned extraction", "Never fabricates a value", "Human-in-the-loop review"] },
  { id: "scale", label: "Scale", Icon: Layers, h: "Batch thousands, not dozens.",
    p: "Built for production volume. Push up to 200 documents per call and Sonar keeps its throughput steady. The second batch runs as cleanly as the first.",
    points: ["200 documents per call", "Steady production throughput", "Median read under a second"] },
  { id: "integrations", label: "Integrations", Icon: Plug, h: "Drops into your stack.",
    p: "A documented REST API, signed webhooks, and native connectors mean Sonar fits the systems you already run, with no re-architecting around us.",
    points: ["Documented REST API", "Signed webhooks", "Native connectors"] },
  { id: "confidence", label: "Confidence-scored", Icon: Gauge, h: "Scores its own work.",
    p: "Every value carries a confidence score, so your team reviews only what's uncertain instead of re-reading everything the engine returns.",
    points: ["A score on every field", "Low-confidence flags", "Full audit trail"] },
];

function Visual({ id }: { id: string }) {
  if (id === "scale") {
    const bars = [40, 66, 52, 80, 60, 92];
    return (
      <div className="w-full max-w-[300px] rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${MZ.line2}`, boxShadow: "0 24px 50px -28px rgba(20,18,10,0.3)" }}>
        <div className="font-sans-g text-[12px] font-semibold mb-4" style={{ color: MZ.sub }}>Throughput / batch</div>
        <div className="flex items-end gap-2 h-[120px]">
          {bars.map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t-md" style={{ background: MZ.accent }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.06, duration: 0.6, ease }} />
          ))}
        </div>
        <div className="font-display font-light text-[22px] mt-4" style={{ color: MZ.ink }}>200 <span className="text-[13px]" style={{ color: MZ.sub }}>docs / call</span></div>
      </div>
    );
  }
  if (id === "integrations") {
    const chips = ["REST API", "Webhooks", "S3", "Snowflake", "Zapier", "SFTP"];
    return (
      <div className="w-full max-w-[300px] rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${MZ.line2}`, boxShadow: "0 24px 50px -28px rgba(20,18,10,0.3)" }}>
        <div className="font-sans-g text-[12px] font-semibold mb-4" style={{ color: MZ.sub }}>Connectors</div>
        <div className="flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <motion.span key={c} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06, duration: 0.4, ease }}
              className="font-sans-g text-[12.5px] font-medium px-3 py-2 rounded-lg" style={{ background: MZ.bg, border: `1px solid ${MZ.line2}`, color: MZ.ink }}>{c}</motion.span>
          ))}
        </div>
      </div>
    );
  }
  const rows = id === "confidence"
    ? [["Candidate", 99], ["Credential", 97], ["Specialty", 94], ["License expiry", 88]] as [string, number][]
    : [["Credential", 98], ["Compact status", 96], ["Specialty", 93], ["Assignment", 95]] as [string, number][];
  return (
    <div className="w-full max-w-[300px] rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${MZ.line2}`, boxShadow: "0 24px 50px -28px rgba(20,18,10,0.3)" }}>
      <div className="font-sans-g text-[12px] font-semibold mb-4" style={{ color: MZ.sub }}>{id === "confidence" ? "Field confidence" : "Extracted fields"}</div>
      <div className="space-y-3">
        {rows.map(([k, v], i) => (
          <div key={k}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-sans-g text-[12.5px]" style={{ color: MZ.ink }}>{k}</span>
              <span className="font-mono-g text-[11px] font-semibold" style={{ color: MZ.sub }}>{v}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: MZ.line2 }}>
              <motion.div className="h-full rounded-full" style={{ background: v >= 96 ? "#1F7A54" : v >= 90 ? MZ.accent : "#B07A08" }}
                initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: 0.15 + i * 0.08, duration: 0.7, ease }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SonarTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <section className="relative max-w-[1240px] mx-auto px-5 sm:px-8 py-20 sm:py-28" aria-labelledby="sonar-h">
      <Reveal className="max-w-[640px] mb-10">
        <motion.span variants={fadeUp} className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: MZ.accent }}>The engine</motion.span>
        <motion.h2 id="sonar-h" variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.035em] leading-[1.0]" style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)", color: MZ.ink }}>
          Every product runs on Sonar
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="mt-5 font-sans-g leading-relaxed max-w-[48ch]" style={{ fontSize: "1.06rem", color: MZ.sub }}>
          Sonar is the engine that does the reading. Pick a capability to see how it holds up.
        </motion.p>
      </Reveal>

      {/* clickable tab bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10" role="tablist" aria-label="Sonar capabilities">
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button key={t.id} role="tab" aria-selected={on} onClick={() => setActive(i)}
              className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5 text-left transition-colors"
              style={{ background: on ? MZ.accent : MZ.surface, border: `1px solid ${on ? MZ.accent : MZ.line2}`, color: on ? "#fff" : MZ.ink }}>
              <t.Icon className="w-4 h-4 shrink-0" strokeWidth={1.9} style={{ color: on ? "#fff" : MZ.accent }} />
              <span className="font-sans-g text-[13.5px] font-semibold">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* content */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-[1.75rem] p-7 sm:p-10" style={{ background: MZ.bg2, border: `1px solid ${MZ.line2}` }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab.id + "-t"} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
            <h3 className="font-display font-light tracking-[-0.02em] leading-[1.08]" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)", color: MZ.ink }}>{tab.h}</h3>
            <p className="mt-4 font-sans-g leading-relaxed max-w-[46ch]" style={{ fontSize: "1.02rem", color: MZ.sub }}>{tab.p}</p>
            <ul className="mt-6 space-y-3">
              {tab.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <span className="grid place-items-center w-5 h-5 rounded-md shrink-0 mt-0.5" style={{ background: MZ.soft, color: MZ.accent }}><Check className="w-3 h-3" strokeWidth={3} /></span>
                  <span className="font-sans-g text-[14.5px]" style={{ color: MZ.ink }}>{pt}</span>
                </li>
              ))}
            </ul>
            <a href="/about#sonar" className="inline-flex items-center gap-1.5 mt-7 font-sans-g text-[14.5px] font-semibold group" style={{ color: MZ.accent }}>
              How Sonar works <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
          </motion.div>
        </AnimatePresence>

        <div className="grid place-items-center min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div key={tab.id + "-v"} initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, ease }}>
              <Visual id={tab.id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
