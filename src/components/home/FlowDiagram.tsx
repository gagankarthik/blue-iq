"use client";

import { memo } from "react";
import { useReducedMotion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   How Sonar routes a document, as a working diagram (after Oberon's node
   diagram). Four kinds of input feed one Sonar node; out of it, sure
   values travel to your systems and flagged ones to the review queue.
   Packets move along the dotted paths to show the flow: cobalt for sure,
   amber for flagged (one in four). Reduced motion: no packets, the paths
   and labels carry the meaning on their own.
   ──────────────────────────────────────────────────────────────── */

const C = "#1F4FE6";
const A = "#F5B544";
const INK = "#0E1116";
const SUB = "#565C68";
const LINE = "#9AA0AC";

const INPUTS = [
  { t: "PDF", y: 48 },
  { t: "SCAN", y: 136 },
  { t: "WORD", y: 224 },
  { t: "PHOTO", y: 312 },
];

/* node: x 296..424, y 132..260 (centre 360, 196) */
const IN_PATHS = INPUTS.map((i, k) => `M112 ${i.y + 24} C 200 ${i.y + 24}, 220 ${172 + k * 16}, 296 ${172 + k * 16}`);
const OUT_SURE = "M424 180 C 480 180, 500 112, 560 112";
const OUT_FLAG = "M424 212 C 480 212, 500 280, 560 280";

function Packet({ path, dur, delay, color }: { path: string; dur: number; delay: number; color: string }) {
  return (
    <rect x={-4} y={-4} width={8} height={8} fill={color}>
      <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
    </rect>
  );
}

function FlowDiagram() {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 720 384" role="img" aria-labelledby="flow-t" className="w-full h-auto">
      <title id="flow-t">Documents flow into Sonar. Sure values go to your systems; values Sonar is unsure of go to a review queue.</title>
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill={C} />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#3D6BFF" strokeWidth="3" />
        </pattern>
      </defs>

      {/* inputs */}
      {INPUTS.map((i) => (
        <g key={i.t}>
          <rect x={24} y={i.y} width={88} height={48} fill="#FFFFFF" stroke="#D9DCE2" />
          <path d={`M${96} ${i.y} l16 16 h-16 z`} fill="#E7EAF0" />
          <text x={40} y={i.y + 29} fontFamily="var(--font-geist-mono), monospace" fontSize="12" fill={INK} letterSpacing="0.06em">
            {i.t}
          </text>
        </g>
      ))}

      {/* paths in */}
      {IN_PATHS.map((d) => (
        <path key={d} d={d} fill="none" stroke={LINE} strokeWidth="1.25" strokeDasharray="2 4" />
      ))}

      {/* the node */}
      <rect x={296} y={132} width={128} height={128} fill="url(#hatch)" />
      <rect x={312} y={148} width={96} height={96} fill="#FFFFFF" />
      {/* corner brackets */}
      {[
        [300, 136, 1, 1],
        [420, 136, -1, 1],
        [300, 256, 1, -1],
        [420, 256, -1, -1],
      ].map(([x, y, sx, sy]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y + 10 * sy} V${y} H${x + 10 * sx}`} fill="none" stroke="#FFFFFF" strokeWidth="2" />
      ))}
      <text x={360} y={192} textAnchor="middle" fontFamily="var(--font-head), sans-serif" fontSize="20" fontWeight="600" fill={INK} letterSpacing="-0.02em">
        Sonar
      </text>
      <text x={360} y={214} textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="10" fill={SUB} letterSpacing="0.06em">
        READ · SCORE
      </text>

      {/* paths out */}
      <path d={OUT_SURE} fill="none" stroke={C} strokeWidth="1.25" strokeDasharray="2 4" />
      <path d={OUT_FLAG} fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="2 4" />

      {/* outputs */}
      <g>
        <rect x={560} y={84} width={136} height={56} fill="#FFFFFF" stroke={C} />
        <text x={576} y={108} fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill={INK} letterSpacing="0.06em">
          YOUR SYSTEMS
        </text>
        <text x={576} y={126} fontFamily="var(--font-geist-mono), monospace" fontSize="10" fill={SUB}>
          score ≥ threshold
        </text>
      </g>
      <g>
        <rect x={560} y={252} width={136} height={56} fill="#FFF6E0" stroke={A} />
        <text x={576} y={276} fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill={INK} letterSpacing="0.06em">
          REVIEW QUEUE
        </text>
        <text x={576} y={294} fontFamily="var(--font-geist-mono), monospace" fontSize="10" fill="#8A5A00">
          flagged for a person
        </text>
      </g>

      {/* the flow */}
      {!reduce && (
        <g>
          {IN_PATHS.map((d, k) => (
            <Packet key={d} path={d} dur={2.4} delay={k * 0.6} color={INK} />
          ))}
          <Packet path={OUT_SURE} dur={1.6} delay={0.4} color={C} />
          <Packet path={OUT_SURE} dur={1.6} delay={1.2} color={C} />
          <Packet path={OUT_SURE} dur={1.6} delay={2.0} color={C} />
          <Packet path={OUT_FLAG} dur={3.2} delay={1.6} color={A} />
        </g>
      )}
    </svg>
  );
}

export default memo(FlowDiagram);
