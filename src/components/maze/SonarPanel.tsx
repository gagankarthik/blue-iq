"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { FileText, Check, Zap, TriangleAlert, Radar } from "lucide-react";
import { MZ, MZ_SHADOW, MZ_SHADOW_LG } from "@/lib/theme";

const ease = [0.16, 1, 0.3, 1] as const;

/* animated circular match gauge */
function Gauge({ value }: { value: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-[128px] h-[128px] shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke={MZ.line2} strokeWidth="10" />
        <motion.circle cx="60" cy="60" r={r} fill="none" stroke={MZ.accent} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ delay: 0.5, duration: 1.3, ease }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display font-light tracking-[-0.03em] leading-none" style={{ fontSize: "2rem", color: MZ.ink }}>{value}</div>
          <div className="font-sans-g text-[10px] font-semibold uppercase tracking-[0.12em] mt-1" style={{ color: MZ.faint }}>match</div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { k: "Experience", v: "6.4 yrs", dot: MZ.accent },
  { k: "Credential", v: "RN · Compact", dot: "#0E8A57" },
  { k: "Specialty", v: "Cardiac ICU", dot: "#DE522C" },
];

function SonarPanel() {
  return (
    <div className="relative w-full max-w-[520px]" style={{ minHeight: 440 }}>
      {/* pastel glow */}
      <div aria-hidden className="absolute -inset-12 -z-10 rounded-[3rem] blur-3xl opacity-80"
        style={{ background: "radial-gradient(45% 45% at 25% 15%, #ECEBFF, transparent 70%), radial-gradient(45% 45% at 85% 85%, #E3F6EC, transparent 70%)" }} />

      {/* main scorecard */}
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease }}
        className="relative rounded-[2rem] overflow-hidden" style={{ background: MZ.surface, border: `1px solid ${MZ.line2}`, boxShadow: MZ_SHADOW_LG }}>

        {/* header */}
        <div className="flex items-center gap-3.5 px-6 pt-6 pb-5">
          <span className="grid place-items-center w-12 h-12 rounded-2xl shrink-0 font-display font-light text-[16px]" style={{ background: "#ECEBFF", color: MZ.accent }}>PR</span>
          <div className="min-w-0 flex-1">
            <div className="font-display font-light tracking-tight text-[17px] truncate" style={{ color: MZ.ink }}>Priya Raghunathan</div>
            <div className="font-sans-g text-[12.5px] truncate" style={{ color: MZ.sub }}>Registered Nurse · Travel</div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full shrink-0" style={{ background: "#E3F6EC" }}>
            <Check className="w-3 h-3" strokeWidth={3} style={{ color: "#0E8A57" }} />
            <span className="font-sans-g text-[11px] font-semibold" style={{ color: "#0E8A57" }}>Verified</span>
          </span>
        </div>

        {/* gauge + stats */}
        <div className="flex items-center gap-6 px-6 pb-5">
          <Gauge value={96} />
          <div className="flex-1 space-y-3 min-w-0">
            {stats.map((s, i) => (
              <motion.div key={s.k} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease }}
                className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.dot }} />
                <span className="font-sans-g text-[12.5px] flex-1 truncate" style={{ color: MZ.sub }}>{s.k}</span>
                <span className="font-sans-g text-[12.5px] font-semibold truncate" style={{ color: MZ.ink }}>{s.v}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* confidence footer */}
        <div className="px-6 py-4 flex items-center gap-3" style={{ borderTop: `1px solid ${MZ.line}`, background: MZ.bg2 }}>
          <span className="grid place-items-center w-7 h-7 rounded-lg shrink-0" style={{ background: MZ.surface, border: `1px solid ${MZ.line2}`, color: MZ.accent }}>
            <Radar className="w-3.5 h-3.5" strokeWidth={2} />
          </span>
          <span className="font-sans-g text-[12px] font-medium" style={{ color: MZ.sub }}>Sonar read 12 fields · 1 flagged</span>
          <span className="ml-auto font-mono-g text-[11.5px] font-semibold" style={{ color: MZ.accent2 }}>0.8s</span>
        </div>
      </motion.div>

      {/* floating: source file - top-left */}
      <motion.div initial={{ opacity: 0, y: -14, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }} transition={{ delay: 0.9, type: "spring", stiffness: 120, damping: 14 }}
        className="absolute -top-5 -left-4 sm:-left-8">
        <div className="bx-card-float flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5" style={{ background: MZ.surface, border: `1px solid ${MZ.line2}`, boxShadow: MZ_SHADOW }}>
          <span className="grid place-items-center w-8 h-8 rounded-xl" style={{ background: "#FFEBE2", color: "#DE522C" }}><FileText className="w-4 h-4" strokeWidth={1.8} /></span>
          <div>
            <div className="font-sans-g text-[12px] font-semibold leading-tight" style={{ color: MZ.ink }}>resume.pdf</div>
            <div className="font-sans-g text-[10.5px] leading-tight" style={{ color: MZ.faint }}>parsed · scored</div>
          </div>
        </div>
      </motion.div>

      {/* floating: speed chip - right mid */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.15, type: "spring", stiffness: 140, damping: 12 }}
        className="absolute top-[42%] -right-3 sm:-right-6">
        <div className="bx-card-float flex items-center gap-1.5 rounded-full px-3 py-2" style={{ background: MZ.ink2, boxShadow: MZ_SHADOW, animationDelay: "1.2s" }}>
          <Zap className="w-3.5 h-3.5" strokeWidth={2.2} style={{ color: MZ.accentSoft }} />
          <span className="font-sans-g text-[12px] font-semibold text-white">Real-time</span>
        </div>
      </motion.div>

      {/* floating: flag notification - bottom-right */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, type: "spring", stiffness: 120, damping: 14 }}
        className="absolute -bottom-6 right-2 sm:right-6">
        <div className="bx-card-float flex items-center gap-2.5 rounded-2xl px-3.5 py-3 max-w-[220px]" style={{ background: MZ.surface, border: `1px solid ${MZ.line2}`, boxShadow: MZ_SHADOW, animationDelay: "0.6s" }}>
          <span className="grid place-items-center w-8 h-8 rounded-xl shrink-0" style={{ background: "#FFF3D4", color: "#B07A08" }}><TriangleAlert className="w-4 h-4" strokeWidth={2} /></span>
          <div className="min-w-0">
            <div className="font-sans-g text-[12px] font-semibold leading-tight" style={{ color: MZ.ink }}>License expiry</div>
            <div className="font-sans-g text-[10.5px] leading-tight" style={{ color: MZ.sub }}>Low confidence - needs review</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default memo(SonarPanel);
