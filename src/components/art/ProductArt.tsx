"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { makeIso, Box, Plane, Print, Cylinder, Shadow, IsoDefs, TONES, type Iso, type Tone } from "@/components/art/iso";

/* ────────────────────────────────────────────────────────────────
   One isometric drawing per product, built from the same kit as the hero.
   Each shows the product's job as objects, never as a screen:

   · Capture  — loose pages become ordered blocks
   · Spend    — two stacks that should match; one block does not
   · Govern   — a contract behind a shield, clauses marked by risk
   · Editions — the same three blocks, set on two different bases
   · Custom   — a stack with a new block lowering into an empty slot
   ──────────────────────────────────────────────────────────────── */

const view = { once: true, margin: "-10%" } as const;

function Drop({ i = 0, children }: { i?: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y: -18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 140, damping: 15 }}
    >
      {children}
    </motion.g>
  );
}

function Pad({ iso, x, y, w, d }: { iso: Iso; x: number; y: number; w: number; d: number }) {
  return <Box iso={iso} x={x} y={y} z={-0.22} w={w} d={d} h={0.22} tone={{ top: "#FFFFFF", left: "#E6ECF6", right: "#D4DDEC" }} />;
}

function Sheet({ iso, x, y, z, tone = TONES.paper, print = true }: { iso: Iso; x: number; y: number; z: number; tone?: Tone; print?: boolean }) {
  return (
    <>
      <Box iso={iso} x={x} y={y} z={z} w={1.8} d={2.4} h={0.07} tone={tone} />
      {print && <Print iso={iso} x={x + 0.25} y={y + 0.4} z={z + 0.07} w={1.3} rows={[1, 0.7, 0.9, 0.55, 0.8]} gap={0.36} />}
    </>
  );
}

/* ── Capture ── */
export const CaptureArt = memo(function CaptureArt() {
  const reduce = useReducedMotion();
  const iso = makeIso(360, 40, 30);
  const blocks: [number, number, number, keyof typeof TONES][] = [
    [5.2, 0.9, 1.0, "sky"],
    [6.3, 0.9, 1.5, "blue"],
    [5.2, 2.0, 1.9, "blue"],
    [6.3, 2.0, 0.8, "sky"],
    [5.2, 3.1, 1.2, "sky"],
    [6.3, 3.1, 1.6, "blue"],
  ];
  return (
    <svg viewBox="232 22 350 232" className="w-full h-auto block" role="img" aria-label="Illustration: loose pages turned into ordered blocks of data">
      <IsoDefs />
      <Pad iso={iso} x={0.4} y={0.4} w={7.6} d={4.4} />
      <g className={reduce ? "" : "bq-float"}>
        <Shadow iso={iso} cx={2.2} cy={2.8} r={1.5} />
        <Sheet iso={iso} x={1.1} y={1.9} z={0.7} tone={TONES.mist} print={false} />
        <Sheet iso={iso} x={1.3} y={1.6} z={1.0} tone={TONES.mist} print={false} />
        <Sheet iso={iso} x={1.5} y={1.3} z={1.3} />
      </g>
      {(() => {
        const a = iso.p(3.6, 2.7, 0.05);
        const b = iso.p(4.9, 2.7, 0.05);
        return (
          <g strokeLinecap="round">
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#BFD3FF" strokeWidth={5} />
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#297AFF" strokeWidth={2} strokeDasharray="5 8" className={reduce ? "" : "bq-flow"} />
          </g>
        );
      })()}
      {blocks
        .slice()
        .sort((p, q) => p[0] + p[1] - (q[0] + q[1]))
        .map(([x, y, h, t], i) => (
          <Drop key={`${x}${y}`} i={i}>
            <Box iso={iso} x={x} y={y} w={0.9} d={0.9} h={h} tone={TONES[t]} />
          </Drop>
        ))}
    </svg>
  );
});

/* ── Spend ── */
export const SpendArt = memo(function SpendArt() {
  const iso = makeIso(200, 40, 30);
  const L = [0, 1, 2, 3];
  const H = 0.36;
  const G = 0.42;
  return (
    <svg viewBox="46 34 308 196" className="w-full h-auto block" role="img" aria-label="Illustration: a contract stack and an invoice stack matched block for block, one block out of line">
      <IsoDefs />
      <Pad iso={iso} x={0.3} y={0.3} w={5.4} d={5.4} />
      {/* contract stack, left */}
      {L.map((i) => (
        <Drop key={`c${i}`} i={i}>
          <Box iso={iso} x={0.8} y={3.3} z={i * G} w={1.6} d={1.6} h={H} tone={TONES.paper} stroke="#D6DDEA" />
        </Drop>
      ))}
      {/* invoice stack, right: the top block has drifted */}
      {L.map((i) => (
        <Drop key={`v${i}`} i={i + 2}>
          <Box iso={iso} x={i === 3 ? 3.55 : 3.3} y={i === 3 ? 0.55 : 0.8} z={i * G} w={1.6} d={1.6} h={H} tone={i === 3 ? TONES.red : TONES.sky} />
        </Drop>
      ))}
      {/* the matches between them */}
      {L.map((i) => {
        const a = iso.p(2.4, 4.1, i * G + H / 2);
        const b = iso.p(4.1, 2.4, i * G + H / 2);
        const ok = i !== 3;
        const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        return (
          <g key={i}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={ok ? "#297AFF" : "#E3674F"} strokeWidth={1.5} strokeDasharray={ok ? undefined : "3 4"} />
            <circle cx={mx} cy={my} r={6.5} fill={ok ? "#1D5BF0" : "#E3674F"} stroke="#fff" strokeWidth={1.5} />
          </g>
        );
      })}
    </svg>
  );
});

/* ── Govern ── */
export const GovernArt = memo(function GovernArt() {
  const reduce = useReducedMotion();
  const iso = makeIso(200, 40, 30);
  const [sx, sy] = iso.p(4.3, 2.3, 0);
  const shield = (dx: number, dy: number) =>
    `M${sx + dx} ${sy - 128 + dy} l40 15 v34 c0 28-17 46-40 56 c-23-10-40-28-40-56 v-34 z`;
  const marks: [number, string][] = [
    [0, "#E3674F"],
    [1, "#F2B53F"],
    [2, "#5B95FF"],
  ];
  return (
    <svg viewBox="46 0 308 232" className="w-full h-auto block" role="img" aria-label="Illustration: a contract beside a shield, its clauses marked by risk">
      <IsoDefs />
      <Pad iso={iso} x={0.3} y={0.3} w={5.4} d={5.4} />
      <Drop>
        <Box iso={iso} x={0.7} y={2.2} z={0} w={2.4} d={3.1} h={0.16} tone={TONES.paper} />
        <Print iso={iso} x={1.2} y={2.6} z={0.16} w={1.6} rows={[1, 0.8, 0.95, 0.7, 0.9, 0.6, 0.85]} gap={0.36} />
        {marks.map(([o, c]) => {
          const p = iso.p(0.95, 2.6 + o * 0.9, 0.17);
          return <circle key={c} cx={p[0]} cy={p[1]} r={4.5} fill={c} />;
        })}
      </Drop>
      <motion.g
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 14 }}
      >
        <Shadow iso={iso} cx={4.4} cy={2.4} r={1.0} opacity={0.18} />
        <path d={shield(7, 4)} fill="#0D1C4F" />
        <path d={shield(0, 0)} fill="#1C4EC9" />
        <path d={shield(0, 0)} fill="none" stroke="#5B95FF" strokeWidth={1.2} />
        <path d={`M${sx - 15} ${sy - 84} l10 10 21-23`} fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
});

/* ── Editions ── */
export const EditionsArt = memo(function EditionsArt() {
  const iso = makeIso(360, 52, 30);
  const set = (ox: number, oy: number, base: Tone, k: number) => (
    <g>
      <Box iso={iso} x={ox} y={oy} z={0} w={3.2} d={3.2} h={0.4} tone={base} />
      {[
        [ox + 0.35, oy + 0.35, 1.3, TONES.blue],
        [ox + 1.75, oy + 0.35, 0.9, TONES.sky],
        [ox + 0.35, oy + 1.75, 0.7, TONES.deep],
      ]
        .sort((a, b) => (a[0] as number) + (a[1] as number) - ((b[0] as number) + (b[1] as number)))
        .map(([x, y, h, t], i) => (
          <Drop key={i} i={k * 3 + i}>
            <Box iso={iso} x={x as number} y={y as number} z={0.4} w={1.1} d={1.1} h={h as number} tone={t as Tone} />
          </Drop>
        ))}
    </g>
  );
  return (
    <svg viewBox="232 22 366 250" className="w-full h-auto block" role="img" aria-label="Illustration: the same three products set on two different bases, one per edition">
      <IsoDefs />
      <Pad iso={iso} x={0.2} y={0.2} w={8.6} d={4.4} />
      {set(0.8, 0.8, { top: "#E3ECFF", left: "#C7D7FA", right: "#A9C0F2" }, 0)}
      {set(4.9, 0.8, { top: "#DDF4FF", left: "#B9E5FA", right: "#8FD0EE" }, 1)}
    </svg>
  );
});

/* ── Custom ── */
export const CustomArt = memo(function CustomArt() {
  const reduce = useReducedMotion();
  const iso = makeIso(200, 70, 30);
  return (
    <svg viewBox="66 46 268 190" className="w-full h-auto block" role="img" aria-label="Illustration: a new block lowering into an empty slot in the stack">
      <IsoDefs />
      <Pad iso={iso} x={0.3} y={0.3} w={4.6} d={4.6} />
      <Box iso={iso} x={0.9} y={0.9} w={1.3} d={1.3} h={1.2} tone={TONES.sky} />
      <Box iso={iso} x={2.4} y={0.9} w={1.3} d={1.3} h={0.8} tone={TONES.blue} />
      <Plane iso={iso} x={2.4} y={2.4} z={0.01} w={1.3} d={1.3} fill="none" stroke="#297AFF" dash="4 4" />
      <Box iso={iso} x={0.9} y={2.4} w={1.3} d={1.3} h={0.6} tone={TONES.deep} />
      <g className={reduce ? "" : "bq-float"}>
        <Box iso={iso} x={2.4} y={2.4} z={1.5} w={1.3} d={1.3} h={0.9} tone={TONES.cyan} />
      </g>
      <Cylinder iso={iso} cx={3.05} cy={3.05} z={0.02} r={0.2} h={0.01} side="#297AFF" top="#297AFF" />
    </svg>
  );
});
