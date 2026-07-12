"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   The motion system. Everything here is spring-driven — no linear
   easing anywhere — and every perpetual loop is gated on visibility so
   offscreen cards cost nothing.
   ──────────────────────────────────────────────────────────────── */

export const EASE = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.8 };
export const SPRING_SOFT = { type: "spring" as const, stiffness: 80, damping: 20, mass: 1 };
/* deliberately under-damped: things arrive with a little overshoot */
export const SPRING_POP = { type: "spring" as const, stiffness: 380, damping: 16, mass: 0.6 };

export const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
};

export const child: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING_SOFT },
};

/* a section that rises into focus once, on a spring */
export function Reveal({
  children,
  className = "",
  style,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      variants={parent}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div variants={child} className={className} style={style}>
      {children}
    </motion.div>
  );
}

/* A headline that assembles itself: each word rises out of a blur on its own
   spring, a beat behind the last. Words keep their own baseline, so the line
   never reflows mid-animation. */
export function Words({
  text,
  className = "",
  style,
  as: Tag = "span",
  delay = 0,
  accent,
  accentClassName = "",
  accentStyle,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  /* an optional trailing phrase, styled differently (the italic serif) */
  accent?: string;
  accentClassName?: string;
  accentStyle?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  const MotionTag = motion[Tag];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "0.4em", filter: "blur(10px)" },
    show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: SPRING_SOFT },
  };

  return (
    <MotionTag
      className={className}
      style={style}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((w, i) => (
        <motion.span key={`${w}-${i}`} variants={word} className="inline-block whitespace-pre">
          {w}{" "}
        </motion.span>
      ))}
      {accentWords.map((w, i) => (
        <motion.span
          key={`a-${w}-${i}`}
          variants={word}
          className={`inline-block whitespace-pre ${accentClassName}`}
          style={accentStyle}
        >
          {w}
          {i < accentWords.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/* Cursor-tracked spotlight. Writes CSS custom properties straight to the node,
   so tracking the pointer never triggers a React render. Pairs with the
   .spotlight rule in globals.css. */
export function Spotlight({
  children,
  className = "",
  style,
  color = "rgba(0,33,129,0.07)",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--spot", "1");
      }}
      onPointerLeave={() => ref.current?.style.setProperty("--spot", "0")}
      className={`spotlight ${className}`}
      style={{ "--spot-color": color, ...style } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/* A card that leans toward the cursor. Motion values only — the rotation never
   passes through React state. */
export function Tilt({
  children,
  className = "",
  style,
  max = 5,
  lift = 6,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  max?: number;
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const y = useMotionValue(0);

  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 22, mass: 0.6 });

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerEnter={() => y.set(-lift)}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        y.set(0);
      }}
      style={{ rotateX: srx, rotateY: sry, y: sy, transformPerspective: 1000, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Drives a perpetual loop — but only while the element is actually on screen,
   and never under prefers-reduced-motion, where it parks on the final frame. */
export function useCycle(steps: number, interval: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-8%" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => setI((v) => v + 1), interval);
    return () => clearInterval(t);
  }, [interval, inView, reduce]);

  return { ref, step: reduce ? steps - 1 : i % steps, reduce, inView };
}

/* A number that springs to its target and can be re-driven on every loop. */
export function useTicker(target: number, active: boolean, decimals = 0) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (reduce) {
      setN(target);
      return;
    }
    if (!active) {
      setN(0);
      return;
    }
    const started = performance.now();
    const DUR = 900;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DUR);
      /* easeOutExpo — fast out of the gate, settles gently */
      const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(Number((target * e).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, decimals, reduce]);

  return n;
}
