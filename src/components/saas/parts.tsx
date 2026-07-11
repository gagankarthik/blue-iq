"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { Words, child, SPRING_SOFT } from "@/components/saas/motion";

/* The one section header used by every section below the hero, so the rhythm
   down the page never changes. The headline assembles word by word; the label
   and the standfirst follow it in. */
export function SectionHead({
  eyebrow,
  title,
  accent,
  sub,
}: {
  eyebrow: string;
  title: string;
  /* the italic-serif phrase that closes the headline */
  accent?: string;
  sub: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-center text-center max-w-[640px] mx-auto">
      <motion.span
        variants={child}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-12%" }}
        className="font-mono-g text-[11px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
        style={{ background: SA.bg2, border: `1px solid ${SA.line}`, color: SA.faint }}
      >
        {eyebrow}
      </motion.span>

      <Words
        as="h2"
        text={title}
        accent={accent}
        delay={0.08}
        className="mt-6 font-display font-normal tracking-[-0.035em] leading-[1.1]"
        style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)", color: SA.ink }}
        accentClassName="font-serif-i"
        accentStyle={{ fontSize: "1.06em", color: SA.accent }}
      />

      <motion.p
        variants={child}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-12%" }}
        transition={{ ...SPRING_SOFT, delay: 0.3 }}
        className="mt-5 font-sans-g leading-[1.65] max-w-[52ch]"
        style={{ fontSize: "1.02rem", color: SA.sub }}
      >
        {sub}
      </motion.p>
    </div>
  );
}
