"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { EASE } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   Section headers and the one reveal.

   The word-by-word blur assembly is gone — it is one of the most
   recognisable template effects there is, and on every heading it made the
   page feel like a demo reel. A section now simply rises 16px and fades in,
   once. Headings are semibold and tight; body copy stays at a readable
   measure and full contrast.
   ──────────────────────────────────────────────────────────────── */

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
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0.001, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

export function SectionHead({
  title,
  sub,
  align = "split",
  id,
  tone = "light",
}: {
  title: string;
  sub?: string;
  align?: "split" | "center" | "stack";
  id?: string;
  tone?: "light" | "dark";
}) {
  const ink = tone === "dark" ? "#FFFFFF" : SA.ink;
  const body = tone === "dark" ? "rgba(255,255,255,0.74)" : SA.sub;

  /* Headings are never hidden. They render in place from the first paint;
     only the block around them fades up. A heading that waits for an
     observer to fire is a heading someone, somewhere, never sees. */
  const Title = (
    <h2
      id={id}
      className="font-display font-semibold leading-[1.08]"
      style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", letterSpacing: "-0.035em", color: ink, maxWidth: "26ch", textWrap: "balance" }}
    >
      {title}
    </h2>
  );

  const Sub = sub ? (
    <p className="font-sans-g leading-[1.7]" style={{ fontSize: "1.0625rem", color: body, maxWidth: "52ch" }}>
      {sub}
    </p>
  ) : null;

  if (align === "center") {
    return (
      <Reveal className="flex flex-col items-center text-center mx-auto">
        {Title}
        {Sub && <div className="mt-6">{Sub}</div>}
      </Reveal>
    );
  }

  if (align === "stack") {
    return (
      <Reveal>
        {Title}
        {Sub && <div className="mt-6">{Sub}</div>}
      </Reveal>
    );
  }

  return (
    <Reveal className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-y-5 lg:gap-x-16 items-end">
      <div>{Title}</div>
      <div className="lg:pb-1.5">{Sub}</div>
    </Reveal>
  );
}
