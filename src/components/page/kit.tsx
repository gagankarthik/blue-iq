"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SA } from "@/lib/theme";
import { Words, child, SPRING_SOFT } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   The page kit.

   Every page other than the landing page was still running the old warm-cream
   system: blueprint grids, mono-caps eyebrows, icon-in-tinted-square cards,
   three-equal-card feature rows. This is the shared vocabulary that replaces
   it, so a page cannot drift from the landing page by accident — the tokens,
   the type scale, and the rules all live here, once.

   Rules baked in, not left to each page to remember:
   · no eyebrow/kicker labels — the headline stands alone
   · statements are large and LIGHT (400), never large and bold
   · nothing is boxed; a 1px rule is the only chrome
   · every container is fluid and every grid collapses to one column
   ──────────────────────────────────────────────────────────────── */

export const WRAP = "max-w-[1180px] mx-auto px-5 sm:px-8";

/* ── the top of a page. Left-aligned, never centred: a centred hero on every
      page in a row reads as a template. `lede` is one sentence — if it needs
      two, the first one was not doing its job. ── */
export function PageHero({
  title,
  lede,
  meta,
}: {
  title: string;
  lede: string;
  meta?: string[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className={WRAP} style={{ background: SA.bg }}>
      <div className="pt-36 sm:pt-44 pb-16 sm:pb-24 max-w-[900px]">
        <Words
          as="h1"
          text={title}
          className="font-display font-normal leading-[1.04]"
          style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.4rem)", letterSpacing: "-0.04em", color: SA.ink }}
        />
        <motion.p
          variants={child}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...SPRING_SOFT, delay: 0.25 }}
          className="mt-7 font-sans-g leading-[1.75] max-w-[56ch]"
          style={{ fontSize: "1.12rem", color: SA.sub }}
        >
          {lede}
        </motion.p>

        {meta && meta.length > 0 && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...SPRING_SOFT, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono-g text-[11px] uppercase tracking-[0.16em]"
            style={{ color: SA.faint }}
          >
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ── a band. `tint` is the accent wash, used sparingly — twice on a page at
      most, or it stops being emphasis and becomes a paint job. ── */
export function Band({
  children,
  tone = "white",
  id,
}: {
  children: React.ReactNode;
  tone?: "white" | "grey" | "tint";
  id?: string;
}) {
  const bg = tone === "tint" ? SA.accentSoft : tone === "grey" ? SA.bg2 : SA.bg;
  return (
    <section
      id={id}
      className="py-20 sm:py-32 scroll-mt-24"
      style={{ background: bg, borderTop: tone === "white" ? "none" : `1px solid ${SA.line}` }}
    >
      <div className={WRAP}>{children}</div>
    </section>
  );
}

/* ── a ruled list. This is the shape that replaced every card grid on the
      site: the row IS the container, the rule is the only chrome. ── */
export function Ruled({
  rows,
}: {
  rows: { t: string; d: string }[];
}) {
  const reduce = useReducedMotion();

  return (
    <div className="mt-14">
      {rows.map((r, i) => (
        <motion.div
          key={r.t}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ ...SPRING_SOFT, delay: i * 0.05 }}
          className="grid md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] gap-y-2 md:gap-x-12 py-7 md:py-8"
          style={{ borderTop: `1px solid ${SA.line2}` }}
        >
          <h3
            className="font-display font-normal tracking-[-0.025em] leading-[1.2]"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", color: SA.ink }}
          >
            {r.t}
          </h3>
          <p className="font-sans-g text-[15.5px] leading-[1.75] max-w-[58ch]" style={{ color: SA.sub }}>
            {r.d}
          </p>
        </motion.div>
      ))}
      <div style={{ borderTop: `1px solid ${SA.line2}` }} />
    </div>
  );
}

/* ── the compact stat strip. Small on purpose: a number that has to be 86px
      tall to land is a number that does not trust itself. ── */
export function StatStrip({ stats }: { stats: { v: string; l: string }[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
      {stats.map((s, i) => (
        <motion.div
          key={s.l}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...SPRING_SOFT, delay: i * 0.07 }}
          className="pt-6"
          style={{ borderTop: `1px solid ${SA.accent}26` }}
        >
          <div
            className="font-display font-normal tabular-nums leading-[1]"
            style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", letterSpacing: "-0.035em", color: SA.accent }}
          >
            {s.v}
          </div>
          <div className="mt-3 font-sans-g text-[14px] leading-[1.5]" style={{ color: SA.sub }}>
            {s.l}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── a link that looks like the ones on the landing page ── */
export function Cta({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-1.5 py-2.5 -my-2.5 font-sans-g text-[15px] font-semibold"
      style={{ color: SA.accent }}
    >
      {label}
      <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
    </a>
  );
}
