"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion, useInView, useMotionValue, useSpring, useScroll, useTransform,
  useReducedMotion, useMotionValueEvent, animate, type Variants,
} from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;
export const spring = { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.7 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: i * 0.06 } }),
};

export const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export function Reveal({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export function Tilt({ children, className = "", max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 14 });
  const sry = useSpring(ry, { stiffness: 140, damping: 14 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────── scroll-driven parallax - GPU transform only, reduced-motion safe ───────── */
export function Parallax({
  children, speed = 60, className = "", style, axis = "y", "aria-hidden": ariaHidden,
}: {
  children: React.ReactNode; speed?: number; className?: string; style?: React.CSSProperties;
  axis?: "x" | "y"; "aria-hidden"?: boolean | "true" | "false";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const val = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });
  const motionStyle = reduce ? {} : axis === "y" ? { y: val } : { x: val };
  return (
    <motion.div ref={ref} aria-hidden={ariaHidden} style={{ ...motionStyle, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

/* count-up that fires once in view; preserves prefix/suffix, supports decimals */
export function CountUp({
  value, className = "", style,
}: { value: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [text, setText] = useState(value);

  // parse "$11.6B", "540+", "98.2%" → prefix | number | suffix. Ranges ("40–60%") render static.
  const match = /^([^\d-]*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const isRange = /[–-].*\d/.test(value.replace(/^[^\d]*/, ""));

  useEffect(() => {
    if (!match || isRange || reduce) { setText(value); return; }
    if (!inView) { setText(`${match[1]}0${match[3]}`); return; }
    const [, pre, num, suf] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.4, ease,
      onUpdate: (v) => setText(`${pre}${v.toFixed(decimals)}${suf}`),
    });
    return () => controls.stop();
  }, [inView, value, isRange, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref} className={className} style={style}>{text}</span>;
}

/* cursor-tracked spotlight surface - writes CSS vars directly, zero re-render */
export function SpotlightCard({
  children, className = "", style, color = "rgba(44,73,214,0.10)",
}: { children: React.ReactNode; className?: string; style?: React.CSSProperties; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--spot", "1");
      }}
      onMouseLeave={() => ref.current?.style.setProperty("--spot", "0")}
      className={`spotlight ${className}`}
      style={{ "--spot-color": color, ...style } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/* scroll velocity as a MotionValue (px/frame) - read via .get() in an animation frame.
   Zero React re-renders; caller decays it toward 0 so it settles when scrolling stops. */
export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const vel = useMotionValue(0);
  const prev = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    vel.set(y - prev.current);
    prev.current = y;
  });
  return vel;
}
