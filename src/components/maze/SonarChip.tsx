"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { MZ } from "@/lib/theme";

/* PCB-style circuit traces from the chip edges out to node pads */
const traces = [
  "M188 140 L188 78 L96 78",
  "M232 140 L232 50",
  "M280 188 L346 188 L346 104",
  "M280 232 L376 232",
  "M188 280 L188 346 L300 346",
  "M232 280 L232 372",
  "M140 188 L62 188",
  "M140 232 L44 232 L44 316",
];
const nodes: [number, number][] = [[96, 78], [232, 50], [346, 104], [376, 232], [300, 346], [232, 372], [62, 188], [44, 316]];

/* chip pins along each edge */
const BODY = { x: 140, y: 140, w: 140, h: 140 };
const pinPos = [0, 1, 2, 3, 4].map((i) => BODY.x + (BODY.w * (i + 0.5)) / 5);
const pins: { x: number; y: number; w: number; h: number }[] = [];
pinPos.forEach((p) => {
  pins.push({ x: p - 3, y: BODY.y - 13, w: 6, h: 13 });               // top
  pins.push({ x: p - 3, y: BODY.y + BODY.h, w: 6, h: 13 });           // bottom
  pins.push({ x: BODY.x - 13, y: p - 3, w: 13, h: 6 });               // left
  pins.push({ x: BODY.x + BODY.w, y: p - 3, w: 13, h: 6 });           // right
});

function SonarChip() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <div aria-hidden className="absolute inset-0 -z-10 blur-3xl opacity-60" style={{ background: "radial-gradient(45% 45% at 50% 45%, rgba(0,33,129,0.16), transparent 70%)" }} />
      <svg viewBox="0 0 420 420" className="w-full h-auto" role="img" aria-label="The Sonar engine, illustrated as a CPU core on a circuit board.">
        <defs>
          <filter id="chipShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#002181" floodOpacity="0.2" />
          </filter>
          <linearGradient id="die" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EEF1FC" /><stop offset="1" stopColor="#DFE4F7" />
          </linearGradient>
        </defs>

        {/* static faint traces */}
        {traces.map((d, i) => (
          <path key={"s" + i} d={d} fill="none" stroke={MZ.accent} strokeOpacity={0.16} strokeWidth="1.5" />
        ))}
        {/* animated data flow */}
        {traces.map((d, i) => (
          <path key={"a" + i} d={d} fill="none" stroke={MZ.accent} strokeWidth="2.4" strokeLinecap="round"
            pathLength={520} strokeDasharray="34 486" className="sa-arc" style={{ animationDelay: `${i * 0.45}s` }} />
        ))}

        {/* node pads */}
        {nodes.map(([x, y], i) => (
          <g key={"n" + i}>
            <rect x={x - 8} y={y - 8} width="16" height="16" rx="3" fill={MZ.accent} className="sa-node" style={{ animationDelay: `${i * 0.35}s` }} opacity={0.22} />
            <rect x={x - 4.5} y={y - 4.5} width="9" height="9" rx="2" fill={MZ.accent} />
            <rect x={x - 4.5} y={y - 4.5} width="9" height="9" rx="2" fill="none" stroke="#F5F3EE" strokeWidth="1.5" />
          </g>
        ))}

        {/* pins */}
        {pins.map((p, i) => (
          <rect key={"p" + i} x={p.x} y={p.y} width={p.w} height={p.h} rx="1.5" fill={MZ.accent} fillOpacity={0.55} />
        ))}

        {/* core glow */}
        <motion.circle cx="210" cy="210" r="76" fill={MZ.accent}
          animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.92, 1.04, 0.92] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "210px 210px" }} />

        {/* chip body */}
        <rect x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} rx="18" fill="#FFFFFF" stroke={MZ.accent} strokeOpacity={0.35} strokeWidth="1.5" filter="url(#chipShadow)" />
        {/* corner registration marks */}
        {[[156, 156], [264, 156], [156, 264], [264, 264]].map(([x, y], i) => (
          <circle key={"c" + i} cx={x} cy={y} r="2.4" fill={MZ.accent} fillOpacity={0.4} />
        ))}

        {/* die / core */}
        <rect x="164" y="164" width="92" height="92" rx="12" fill="url(#die)" stroke={MZ.accent} strokeOpacity={0.4} strokeWidth="1.2" />
        {/* inner circuit hatch */}
        {[184, 210, 236].map((gx) => (
          <line key={"vl" + gx} x1={gx} y1="176" x2={gx} y2="200" stroke={MZ.accent} strokeOpacity={0.16} strokeWidth="1" />
        ))}
        <text x="210" y="216" textAnchor="middle" className="font-display" fontSize="21" fontWeight="500" letterSpacing="1" fill={MZ.accent}>SONAR</text>
        <text x="210" y="234" textAnchor="middle" className="font-sans-g" fontSize="8.5" letterSpacing="2.4" fill={MZ.sub}>AI CORE</text>
      </svg>
    </div>
  );
}

export default memo(SonarChip);
