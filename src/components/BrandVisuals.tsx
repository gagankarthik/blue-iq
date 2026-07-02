"use client";

import { motion, useReducedMotion } from "framer-motion";
import { UI } from "@/lib/theme";

/*
 * Art-directed, duotone brand visuals — atmospheric and editorial, no stock
 * photography, no product-UI screenshots, no doodle icons. Each is a single
 * confident composition in the Blue-IQ palette with generous negative space.
 */

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Hero — a document plane resolving into structured order, over Sonar arcs ── */
export function HeroVisual({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 560 560" className="w-full h-auto" role="img" aria-label="An abstract composition: a document resolving into ordered data over concentric intelligence arcs.">
        <defs>
          <linearGradient id="hv-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0A1E6E" /><stop offset="0.55" stopColor="#002181" /><stop offset="1" stopColor="#16337F" />
          </linearGradient>
          <linearGradient id="hv-sheet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E9EEFF" />
          </linearGradient>
        </defs>

        {/* deep panel */}
        <rect x="20" y="20" width="520" height="520" rx="40" fill="url(#hv-panel)" />

        {/* concentric Sonar arcs */}
        {[150, 210, 270].map((r, i) => (
          <motion.circle key={r} cx="150" cy="410" r={r} fill="none" stroke="#6E8BFF" strokeOpacity={0.16 - i * 0.03} strokeWidth="1.5"
            initial={reduce ? undefined : { opacity: 0 }} animate={reduce ? undefined : { opacity: 1 }} transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }} />
        ))}

        {/* floating source sheet (scattered lines) */}
        <motion.g initial={reduce ? undefined : { y: 8, opacity: 0 }} animate={reduce ? undefined : { y: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>
          <g transform="rotate(-7 150 200)">
            <rect x="72" y="96" width="176" height="220" rx="16" fill="url(#hv-sheet)" />
            <rect x="96" y="126" width="70" height="12" rx="6" fill="#2C49D6" opacity="0.8" />
            {[158, 182, 206, 230, 254, 278].map((y, i) => (
              <rect key={y} x="96" y={y} width={i % 2 ? 110 : 128} height="7" rx="3.5" fill="#C3CEF2" />
            ))}
          </g>
        </motion.g>

        {/* structured result card (ordered rows) */}
        <motion.g initial={reduce ? undefined : { y: 16, opacity: 0 }} animate={reduce ? undefined : { y: 0, opacity: 1 }} transition={{ duration: 0.7, ease, delay: 0.15 }}>
          <rect x="300" y="230" width="212" height="248" rx="18" fill="#FFFFFF" />
          <rect x="324" y="258" width="96" height="10" rx="5" fill={UI.blue} />
          {[288, 320, 352, 384, 416].map((y, i) => (
            <g key={y}>
              <rect x="324" y={y} width="112" height="8" rx="4" fill="#E7EAF1" />
              <circle cx={476} cy={y + 4} r="5" fill={i === 4 ? UI.amber : "#16A06B"} />
            </g>
          ))}
        </motion.g>

        {/* connecting node */}
        {!reduce && (
          <motion.circle cx="290" cy="250" r="6" fill="#6E8BFF"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
        )}
      </svg>
    </div>
  );
}

/* ── Sonar — concentric emanating rings, the AI core (on dark) ── */
export function SonarVisual({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 480 420" className="w-full h-auto" role="img" aria-label="Concentric rings emanating from a core — the Sonar intelligence engine.">
        {[60, 110, 160, 210].map((r, i) => (
          <motion.circle key={r} cx="240" cy="210" r={r} fill="none" stroke="#6E8BFF" strokeWidth="1.5" strokeOpacity={0.5 - i * 0.1}
            animate={reduce ? undefined : { r: [r, r + 12, r], strokeOpacity: [0.5 - i * 0.1, 0.15, 0.5 - i * 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
        ))}
        {/* orbiting document nodes — fixed literal coordinates (not computed at render time),
            since Math.cos/sin can serialize with different precision between server and
            client and trip a hydration mismatch */}
        {[{ cx: 400, cy: 210 }, { cx: 160, cy: 322.58 }, { cx: 160, cy: 97.42 }].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="7" fill="#FFFFFF" opacity={0.9 - i * 0.15} />
        ))}
        {/* core */}
        <circle cx="240" cy="210" r="44" fill="#FFFFFF" />
        <circle cx="240" cy="210" r="44" fill="none" stroke="#6E8BFF" strokeWidth="1.5" />
        <text x="240" y="208" textAnchor="middle" fontFamily="var(--font-display)" fontSize="18" fontWeight="700" fill={UI.blue}>Sonar</text>
        <text x="240" y="226" textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="2" fill={UI.blue2}>CORE</text>
      </svg>
    </div>
  );
}

/* ── Parsing — unstructured lines resolving into aligned fields (duotone) ── */
export function ParsingVisual({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative rounded-3xl overflow-hidden ${className}`} style={{ background: UI.soft, border: `1px solid ${UI.line}` }}>
      <svg viewBox="0 0 520 380" className="w-full h-auto" role="img" aria-label="Scattered text resolving into aligned, ordered data fields.">
        {/* scattered source */}
        {[[40, 70, -6], [40, 110, 4], [40, 150, -3], [40, 190, 5], [40, 230, -2], [40, 270, 3]].map(([x, y, rot], i) => (
          <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
            <rect x={x} y={y} width={120 + (i % 3) * 30} height="9" rx="4.5" fill="#C3CEF2" />
          </g>
        ))}
        {/* arrow band */}
        <path d="M250 190 h40" stroke={UI.blue2} strokeWidth="2" strokeDasharray="5 5" />
        <path d="M284 182 l10 8 -10 8" fill="none" stroke={UI.blue2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* ordered result */}
        <rect x="310" y="60" width="170" height="260" rx="16" fill="#FFFFFF" stroke={UI.line} />
        {[92, 132, 172, 212, 252, 292].map((y, i) => (
          <motion.g key={y} initial={reduce ? undefined : { opacity: 0, x: 8 }} whileInView={reduce ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4, ease }}>
            <rect x="332" y={y} width="90" height="8" rx="4" fill="#D9DEE9" />
            <circle cx="456" cy={y + 4} r="5" fill={i === 5 ? UI.amber : "#16A06B"} />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ── Govern — stacked clause bands with one flagged deviation ── */
export function GovernVisual({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const rows = [
    { w: 0.86, ok: true }, { w: 0.7, ok: false }, { w: 0.8, ok: true }, { w: 0.64, ok: true }, { w: 0.74, ok: true },
  ];
  return (
    <div className={`relative rounded-3xl overflow-hidden ${className}`} style={{ background: UI.soft, border: `1px solid ${UI.line}` }}>
      <svg viewBox="0 0 520 380" className="w-full h-auto" role="img" aria-label="Stacked contract clauses scored against a playbook, one flagged as a deviation.">
        {/* playbook mark */}
        <g transform="translate(360 70)">
          <path d="M60 0l56 20v34c0 34-24 58-56 68-32-10-56-34-56-68V20L60 0z" fill={UI.blue} />
          <path d="M36 66l16 16 30-34" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* clause stack */}
        {rows.map((r, i) => {
          const y = 70 + i * 54;
          return (
            <motion.g key={i} initial={reduce ? undefined : { opacity: 0, x: -8 }} whileInView={reduce ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.45, ease }}>
              <rect x="40" y={y} width="250" height="40" rx="10" fill="#FFFFFF" stroke={r.ok ? UI.line : UI.amber} strokeWidth={r.ok ? 1 : 1.6} />
              <text x="58" y={y + 25} fontFamily="var(--font-geist-mono)" fontSize="11" fill={UI.faint}>{`§${[4, 7, 9, 12, 15][i]}`}</text>
              <rect x="86" y={y + 16} width={140 * r.w} height="8" rx="4" fill="#D9DEE9" />
              <circle cx="270" cy={y + 20} r="5" fill={r.ok ? "#16A06B" : UI.amber} />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Solutions — interlocking planes / migration flow (abstract, agency) ── */
export function SolutionsVisual({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative rounded-3xl overflow-hidden ${className}`} style={{ background: UI.blue, border: `1px solid ${UI.blue}` }}>
      <svg viewBox="0 0 520 360" className="w-full h-auto" role="img" aria-label="Legacy systems migrating into a unified Blue-IQ platform.">
        {/* legacy blocks (left) */}
        {[70, 150, 230].map((y, i) => (
          <rect key={y} x="46" y={y} width="90" height="54" rx="10" fill="#fff" opacity={0.16 + i * 0.02} />
        ))}
        {/* migration arrows */}
        {[97, 177, 257].map((y, i) => (
          <motion.g key={y} initial={reduce ? undefined : { opacity: 0.3 }} animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}>
            <path d={`M150 ${y} H300`} stroke="#8FB0FF" strokeWidth="2" strokeDasharray="6 6" />
            <path d={`M296 ${y - 6} l8 6 -8 6`} fill="none" stroke="#8FB0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        ))}
        {/* unified platform (right) */}
        <rect x="320" y="86" width="150" height="188" rx="18" fill="#fff" />
        <rect x="344" y="116" width="70" height="10" rx="5" fill={UI.blue} />
        {[144, 172, 200, 228].map((y) => <rect key={y} x="344" y={y} width="102" height="8" rx="4" fill="#D9DEE9" />)}
      </svg>
    </div>
  );
}
