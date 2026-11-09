"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Label } from "@/components/home/ui";

/* ────────────────────────────────────────────────────────────────
   Home-page motion. Everything here is rendered finished on the server,
   so a block can never be stuck invisible: only a block that mounts below
   the fold is parked, and an IntersectionObserver releases it once.
   Reduced motion gets the finished frame.
   ──────────────────────────────────────────────────────────────── */

function useArrival<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "parked" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setState("parked");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, state };
}

/** Children rise in turn as the block arrives (`.bb-stagger`). */
export function Stagger({
  children,
  className = "",
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
  style?: React.CSSProperties;
}) {
  const { ref, state } = useArrival<HTMLElement>();
  const Tag = as as React.ElementType;
  const cls = [state === "idle" ? "" : "bb-stagger", state === "in" ? "is-in" : "", className].join(" ").trim();
  return (
    <Tag ref={ref} className={cls} style={style}>
      {children}
    </Tag>
  );
}

/** A hairline that draws itself left to right when it arrives. */
export function DrawLine({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const { ref, state } = useArrival<HTMLSpanElement>();
  const cls = [state === "idle" ? "" : "bb-draw", state === "in" ? "is-in" : "", className].join(" ").trim();
  return <span ref={ref} aria-hidden className={cls} style={style} />;
}

/** Counts from 0 to `to` once, on arrival. Server-rendered at the final value. */
export function CountUp({ to, prefix = "", suffix = "", ms = 1400 }: { to: number; prefix?: string; suffix?: string; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / ms);
          setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setV(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, ms]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v}
      {suffix}
    </span>
  );
}

/** The section header: headline, then one line of body under it (never a
    split header). The eyebrow is optional and rationed: at most one per
    three sections across the page. */
export function Head({
  id,
  kicker,
  title,
  sub,
  tone = "light",
  className = "",
}: {
  id: string;
  kicker?: string;
  title: React.ReactNode;
  sub?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const ink = tone === "dark" ? "#FFFFFF" : "#0E1116";
  const body = tone === "dark" ? "#C2C7D1" : "#565C68";
  return (
    <Stagger className={className}>
      {kicker && (
        <Label tone={tone} className="mb-4">
          {kicker}
        </Label>
      )}
      <h2 id={id} className="font-head h-sec max-w-[22ch]" style={{ color: ink }}>
        {title}
      </h2>
      {sub && (
        <p className="mt-4 font-sans-g t-base max-w-[60ch]" style={{ color: body }}>
          {sub}
        </p>
      )}
    </Stagger>
  );
}

/** The hero's rotating word. Every word sits in one grid cell, so the
    longest fixes the width and nothing reflows; the current word slides up
    out of a mask and the next slides in. Pauses on hover and focus and while
    off screen; under reduced motion it holds the first word. Screen readers
    get the full list once (`label`), the visual word is aria-hidden. The
    visual words are drawn from data-w by CSS (::before), so search engines
    index the headline once, as a sentence, not the list repeated. */
export function RotatingWord({ words, label, ms = 2400, color }: { words: string[]; label: string; ms?: number; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const [seen, setSeen] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || held || !seen) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), ms);
    return () => clearInterval(t);
  }, [reduce, held, seen, ms, words.length]);

  const prev = (i - 1 + words.length) % words.length;
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span ref={ref} onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}>
      <span className="sr-only">{label}</span>
      <span aria-hidden className="relative inline-grid overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
        <span className="bb-word invisible col-start-1 row-start-1" data-w={longest} />
        {words.map((w, k) => (
          <span
            key={w}
            data-w={w}
            className="bb-word col-start-1 row-start-1 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              color,
              opacity: k === i ? 1 : 0,
              transform: k === i ? "translateY(0)" : k === prev ? "translateY(-100%)" : "translateY(100%)",
            }}
          />
        ))}
      </span>
    </span>
  );
}
