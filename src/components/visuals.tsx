"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* brand-anchored gradient spectrum — premium, blue-led (not neon) */
export const GRAD = {
  blue: "#002181",
  royal: "#2C49D6",
  indigo: "#5B6CF0",
  violet: "#8E7BF5",
  sky: "#4FB8F0",
  cyan: "#46D6E6",
  coral: "#FF9E84",
  pink: "#F2A6D8",
} as const;

/* ───────── ambient mesh gradient — large blurred blobs, slow drift ───────── */
type Blob = { c: string; x: string; y: string; s: number; o?: number };
export const MeshGradient = memo(function MeshGradient({
  blobs, className = "", blur = 70,
}: { blobs: Blob[]; className?: string; blur?: number }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ filter: `blur(${blur}px)` }}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: b.x, top: b.y, width: b.s, height: b.s, background: b.c, opacity: b.o ?? 0.5, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
          animate={reduce ? undefined : { x: [0, 18, -12, 0], y: [0, -16, 12, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 16 + i * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
});

/* ───────── glossy 3D orb — layered radial highlights + tinted shadow ───────── */
export function GlassOrb({
  size = 120, hue = GRAD.indigo, hi = "#ffffff", className = "", style, float = true, delay = 0, spin = false,
}: {
  size?: number; hue?: string; hi?: string; className?: string; style?: React.CSSProperties; float?: boolean; delay?: number; spin?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`rounded-full ${className}`}
      style={{
        width: size, height: size,
        background: `radial-gradient(circle at 32% 26%, ${hi}, rgba(255,255,255,0) 42%), radial-gradient(circle at 70% 80%, ${hue}, rgba(0,0,0,0.18) 92%), linear-gradient(145deg, ${hue}, ${hue})`,
        boxShadow: `inset 0 4px 10px rgba(255,255,255,0.45), inset 0 -16px 26px rgba(0,0,0,0.22), 0 28px 50px -18px ${hue}88`,
        willChange: "transform",
        ...style,
      }}
      animate={reduce || !float ? undefined : { y: [0, -16, 0], rotate: spin ? [0, 360] : [0, 6, 0] }}
      transition={{ duration: spin ? 28 : 7, repeat: Infinity, ease: spin ? "linear" : "easeInOut", delay }}
    />
  );
}

/* glossy 3D torus/coil-style ring (echoes the reference's floating shapes) */
export function GlassRing({
  size = 130, hue = GRAD.sky, className = "", style, delay = 0,
}: { size?: number; hue?: string; className?: string; style?: React.CSSProperties; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden className={className}
      style={{ width: size, height: size, willChange: "transform", ...style }}
      animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-8, 8, -8] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="w-full h-full rounded-full" style={{
        background: `conic-gradient(from 210deg, ${hue}, #ffffff 40%, ${hue} 70%, ${hue})`,
        WebkitMask: "radial-gradient(circle, transparent 38%, #000 40%)",
        mask: "radial-gradient(circle, transparent 38%, #000 40%)",
        boxShadow: `0 24px 44px -18px ${hue}99`,
      }} />
    </motion.div>
  );
}
