"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Magnetic({
  children, href, className = "", style, target, rel,
}: {
  children: React.ReactNode; href: string; className?: string; style?: React.CSSProperties; target?: string; rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  return (
    <motion.a
      ref={ref} href={href} target={target} rel={rel}
      onMouseMove={(e) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; x.set((e.clientX - r.left - r.width / 2) * 0.2); y.set((e.clientY - r.top - r.height / 2) * 0.2); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy, ...style }} className={className}
    >
      {children}
    </motion.a>
  );
}
