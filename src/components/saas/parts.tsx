"use client";

import { useEffect, useRef, useState } from "react";
import { SA } from "@/lib/theme";

/* ────────────────────────────────────────────────────────────────
   Section headers and the one reveal.

   A section rises 16px and fades in, once. Headings are semibold and tight;
   body copy stays at a readable measure and full contrast. A short blue
   kicker names the section in plain sentence case: no mono caps, no pill.
   ──────────────────────────────────────────────────────────────── */

/* Rendered visible on the server. Only a block that mounts below the fold is
   parked, and an IntersectionObserver releases it as it scrolls in, so a
   section can never be left invisible if script or an observer never fires. */
export function Reveal({
  children,
  className = "",
  style,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "div" | "section" | "ul" | "ol";
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "parked" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState("parked");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  const cls = [state === "idle" ? "" : "bq-reveal", state === "in" ? "is-in" : "", className].join(" ").trim();
  return (
    <Tag ref={ref} className={cls} style={delay ? { ...style, transitionDelay: `${delay}s` } : style}>
      {children}
    </Tag>
  );
}

/* Eyebrow labels over headings were retired site-wide (2026-11): the
   headline alone carries the section. Kept as a no-op so callers compile. */
export function Kicker(props: { children: React.ReactNode; tone?: "light" | "dark" }) {
  void props;
  return null;
}

export function SectionHead({
  title,
  sub,
  kicker,
  align = "split",
  id,
  tone = "light",
}: {
  title: string;
  sub?: string;
  kicker?: string;
  align?: "split" | "center" | "stack";
  id?: string;
  tone?: "light" | "dark";
}) {
  const ink = tone === "dark" ? "#FFFFFF" : SA.ink;
  const body = tone === "dark" ? "rgba(255,255,255,0.74)" : SA.sub;

  const Title = (
    <h2
      id={id}
      className="font-display t-h2"
      style={{
        color: ink,
        maxWidth: "24ch",
      }}
    >
      {title}
    </h2>
  );

  const Sub = sub ? (
    <p
      className="font-sans-g t-body"
      style={{ fontSize: "1rem", lineHeight: 1.6, color: body, maxWidth: "60ch" }}
    >
      {sub}
    </p>
  ) : null;

  void kicker;
  void align;

  return (
    <Reveal>
      {Title}
      {Sub && <div className="mt-4">{Sub}</div>}
    </Reveal>
  );
}
