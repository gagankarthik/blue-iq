"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { Words, child, SPRING_SOFT } from "@/components/saas/motion";

/* Section headers.

   There is no eyebrow. Every section used to open with the same mono-caps
   kicker behind a little dash — "TRUST", "QUESTIONS", "HOW IT WORKS" — which
   is a label telling you what you are about to read instead of just letting
   you read it. The reference has none of them anywhere on its page, and the
   headline is stronger standing alone.

   The statement is set large and *light* (weight 400, -0.032em), not large
   and bold: scale carries the hierarchy, weight doesn't need to help. */
export function SectionHead({
  title,
  sub,
  align = "split",
}: {
  title: string;
  sub: string;
  align?: "split" | "center";
}) {
  const reduce = useReducedMotion();

  const Title = (
    <Words
      as="h2"
      text={title}
      className="font-display font-normal leading-[1.08]"
      style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)", letterSpacing: "-0.032em", color: SA.ink }}
    />
  );

  const Sub = (
    <motion.p
      variants={child}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      transition={{ ...SPRING_SOFT, delay: 0.25 }}
      className="font-sans-g leading-[1.65] max-w-[48ch]"
      style={{ fontSize: "1.02rem", color: SA.sub }}
    >
      {sub}
    </motion.p>
  );

  if (align === "center") {
    return (
      <div className="flex flex-col items-center text-center max-w-[680px] mx-auto">
        {Title}
        <div className="mt-7">{Sub}</div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-y-6 lg:gap-x-16 items-end">
      <div>{Title}</div>
      <div className="lg:pb-2">{Sub}</div>
    </div>
  );
}
