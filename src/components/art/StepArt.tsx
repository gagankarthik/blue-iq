"use client";

import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { makeIso, Box, Plane, Print, Cylinder, Shadow, IsoDefs, TONES } from "@/components/art/iso";

/* ────────────────────────────────────────────────────────────────
   Drawings for "how Sonar works" and for the menus: the engine on its own,
   and one scene per step — pages arrive, Sonar reads, fields are scored,
   clean records land in your systems. Same isometric kit as every other
   drawing on the site; each is a self-contained, tightly framed SVG.
   ──────────────────────────────────────────────────────────────── */

const PAD = { top: "#F1F5FC", left: "#DCE4F2", right: "#C7D2E6" };

function Engine({ iso, cx, cy, reduce }: { iso: ReturnType<typeof makeIso>; cx: number; cy: number; reduce: boolean | null }) {
  const [ex, ey] = iso.p(cx, cy, 1.25);
  return (
    <g>
      <Cylinder iso={iso} cx={cx} cy={cy} r={1.5} h={0.35} side="#0D1C4F" top="#1A2A5E" />
      <Cylinder iso={iso} cx={cx} cy={cy} z={0.35} r={1.0} h={0.9} side="#101C45" top="#16275A" rim="#297AFF" />
      <ellipse cx={ex} cy={ey - 6} rx={iso.rx(0.8)} ry={iso.ry(0.8) + 8} fill="url(#iso-core)">
        {!reduce && <animate attributeName="opacity" values="0.5;1;0.5" dur="2.6s" repeatCount="indefinite" />}
      </ellipse>
      <ellipse cx={ex} cy={ey} rx={iso.rx(0.3)} ry={iso.ry(0.3)} fill="#E8F8FF" />
    </g>
  );
}

function Rings({ iso, cx, cy, reduce, r = [1.9, 2.7] }: { iso: ReturnType<typeof makeIso>; cx: number; cy: number; reduce: boolean | null; r?: number[] }) {
  const [x, y] = iso.p(cx, cy);
  return (
    <g>
      {r.map((rr, i) => (
        <ellipse key={rr} cx={x} cy={y} rx={iso.rx(rr)} ry={iso.ry(rr)} fill="none" stroke="#297AFF" strokeOpacity={0.3 - i * 0.1} strokeDasharray={i ? "3 5" : undefined} />
      ))}
      {!reduce && <ellipse cx={x} cy={y} rx={iso.rx(3.2)} ry={iso.ry(3.2)} fill="none" stroke="#297AFF" strokeWidth={1.3} className="sa-sonar" />}
    </g>
  );
}

/* ── Sonar, alone ── */
export const SonarArt = memo(function SonarArt() {
  const reduce = useReducedMotion();
  const iso = makeIso(200, 30, 30);
  return (
    <svg viewBox="40 40 320 200" className="w-full h-auto block" role="img" aria-label="Illustration: the Sonar engine sending out a pulse">
      <IsoDefs />
      <Box iso={iso} x={0.6} y={0.6} z={-0.2} w={5.8} d={5.8} h={0.2} tone={PAD} />
      <Rings iso={iso} cx={3.5} cy={3.5} reduce={reduce} />
      <Engine iso={iso} cx={3.5} cy={3.5} reduce={reduce} />
    </svg>
  );
});

/* ── 1. pages arrive ── */
export const IngestArt = memo(function IngestArt() {
  const reduce = useReducedMotion();
  const iso = makeIso(260, 60, 34);
  const pages: [number, number, number, keyof typeof TONES][] = [
    [1.2, 2.2, 0.3, "paper"],
    [1.5, 1.8, 0.5, "paper"],
    [1.8, 1.4, 0.7, "paper"],
  ];
  return (
    <svg viewBox="40 20 440 300" className="w-full h-auto block" role="img" aria-label="Illustration: documents of every format arriving on the platform">
      <IsoDefs />
      <Box iso={iso} x={0.4} y={0.4} z={-0.25} w={6.4} d={6.4} h={0.25} tone={PAD} />
      <Plane iso={iso} x={1} y={1} w={5.2} d={5.2} fill="none" stroke="#297AFF" dash="5 6" opacity={0.5} />
      {pages.map(([x, y, z, t], i) => (
        <g key={i}>
          <Box iso={iso} x={x} y={y} z={z} w={2.4} d={3.0} h={0.08} tone={TONES[t]} />
          {i === 2 && <Print iso={iso} x={x + 0.3} y={y + 0.4} z={z + 0.08} w={1.7} rows={[1, 0.7, 0.9, 0.6, 0.8]} gap={0.4} />}
        </g>
      ))}
      {/* a scanned page and a phone photo, still falling in */}
      <g className={reduce ? "" : "bq-float"}>
        <Shadow iso={iso} cx={5.0} cy={4.6} r={1.1} />
        <Box iso={iso} x={4.0} y={3.4} z={1.6} w={2.0} d={2.5} h={0.08} tone={TONES.mist} />
        <Plane iso={iso} x={4.3} y={3.7} z={1.69} w={1.4} d={1.0} fill="#C7D6F5" />
      </g>
      <g className={reduce ? "" : "bq-float"} style={{ animationDelay: "-2s" }}>
        <Box iso={iso} x={4.6} y={1.0} z={2.2} w={1.0} d={1.7} h={0.14} tone={TONES.deep} />
        <Plane iso={iso} x={4.7} y={1.12} z={2.35} w={0.8} d={1.46} fill="#5B95FF" />
      </g>
    </svg>
  );
});

/* ── 2. Sonar reads ── */
export const ReadArt = memo(function ReadArt() {
  const reduce = useReducedMotion();
  const iso = makeIso(260, 60, 34);
  const [sx, sy] = iso.p(3.6, 3.6, 2.3);
  return (
    <svg viewBox="40 0 440 320" className="w-full h-auto block" role="img" aria-label="Illustration: Sonar reading a page held above it">
      <IsoDefs />
      <Box iso={iso} x={0.4} y={0.4} z={-0.25} w={6.4} d={6.4} h={0.25} tone={PAD} />
      <Rings iso={iso} cx={3.6} cy={3.6} reduce={reduce} r={[2.0, 2.8]} />
      <Engine iso={iso} cx={3.6} cy={3.6} reduce={reduce} />
      {/* the beam and the page it is reading */}
      <path d={`M${sx - 30} ${sy + 60} L${sx} ${sy - 4} L${sx + 30} ${sy + 60} Z`} fill="#34C2FF" opacity={0.14} />
      <g className={reduce ? "" : "bq-float"}>
        <Box iso={iso} x={2.4} y={2.2} z={2.6} w={2.4} d={2.8} h={0.08} tone={TONES.paper} />
        <Print iso={iso} x={2.7} y={2.6} z={2.68} w={1.7} rows={[1, 0.75, 0.9, 0.6, 0.85]} gap={0.42} color="#9DB9F5" />
      </g>
    </svg>
  );
});

/* ── 3. every field scored ── */
export const ScoreArt = memo(function ScoreArt() {
  const iso = makeIso(120, 110, 40);
  const scores = [0.98, 0.95, 0.72, 0.97, 0.93, 0.84];
  const line = 0.9;
  const K = 6;
  const hOf = (s: number) => (s - 0.6) * K;
  const z = hOf(line);
  const cols = scores.map((s, i) => ({ x: 0.8 + i * 1.05, y: 1.2, h: hOf(s), low: s < line }));
  return (
    <svg viewBox="40 0 440 320" className="w-full h-auto block" role="img" aria-label="Illustration: fields as columns of confidence, two below the review line">
      <IsoDefs />
      <Box iso={iso} x={0.3} y={0.6} z={-0.2} w={6.8} d={1.9} h={0.2} tone={PAD} />
      {cols.map((c, i) => (
        <Box key={`l${i}`} iso={iso} x={c.x} y={c.y} w={0.74} d={0.74} h={Math.min(c.h, z)} tone={c.low ? TONES.amber : TONES.sky} />
      ))}
      <Plane iso={iso} x={0.3} y={0.6} z={z} w={6.8} d={1.9} fill="#297AFF" opacity={0.14} />
      <Plane iso={iso} x={0.3} y={0.6} z={z} w={6.8} d={1.9} fill="none" stroke="#297AFF" dash="5 5" />
      {cols.map((c, i) => (c.h > z ? <Box key={`u${i}`} iso={iso} x={c.x} y={c.y} z={z} w={0.74} d={0.74} h={c.h - z} tone={TONES.blue} /> : null))}
    </svg>
  );
});

/* ── 4. clean records land ── */
export const DeliverArt = memo(function DeliverArt() {
  const reduce = useReducedMotion();
  const iso = makeIso(260, 50, 34);
  const systems: [number, number, keyof typeof TONES][] = [
    [4.6, 0.8, "deep"],
    [4.6, 2.7, "blue"],
    [4.6, 4.6, "sky"],
  ];
  return (
    <svg viewBox="40 0 440 320" className="w-full h-auto block" role="img" aria-label="Illustration: scored records flowing into three of your systems">
      <IsoDefs />
      <Box iso={iso} x={0.4} y={0.4} z={-0.25} w={6.6} d={6.6} h={0.25} tone={PAD} />
      {/* records waiting */}
      {[0, 1, 2].map((i) => (
        <Box key={i} iso={iso} x={1.0} y={2.4} z={i * 0.34} w={1.4} d={1.6} h={0.28} tone={i === 2 ? TONES.blue : TONES.sky} />
      ))}
      {/* the routes */}
      {systems.map(([x, y], i) => {
        const a = iso.p(2.4, 3.2, 0.02);
        const b = iso.p(x, y + 0.75, 0.02);
        const m = iso.p(3.5, 3.2, 0.02);
        const n = iso.p(3.5, y + 0.75, 0.02);
        const d = `M${a[0]} ${a[1]} L${m[0]} ${m[1]} L${n[0]} ${n[1]} L${b[0]} ${b[1]}`;
        return (
          <g key={i} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} stroke="#BFD3FF" strokeWidth={4} />
            <path d={d} stroke="#297AFF" strokeWidth={1.8} strokeDasharray="5 8" className={reduce ? "" : "bq-flow"} />
          </g>
        );
      })}
      {/* your systems */}
      {systems.map(([x, y, t], i) => (
        <g key={`s${i}`}>
          <Box iso={iso} x={x} y={y} w={1.5} d={1.5} h={1.3 + i * 0.25} tone={TONES[t]} />
          <Plane iso={iso} x={x + 0.3} y={y + 0.3} z={1.3 + i * 0.25} w={0.9} d={0.9} fill="#FFFFFF" opacity={0.35} />
        </g>
      ))}
    </svg>
  );
});
