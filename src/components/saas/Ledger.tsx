"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { Words, SPRING_SOFT, child, useTicker } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   The spec strip.

   These were four full-width rows with the value set at 5.4rem — four giant
   slabs of type that took most of a screen to say four short things, and at
   that size "EVERY ONE" and "ZERO" read as shouting rather than as facts.

   Now it is one strip: four columns, the value at a size you can take in at a
   glance, the label under it. Smaller is more confident. A number that has to
   be 86px tall to land is a number that does not trust itself.

   Only claims the company already makes. No invented figures, ever.
   ──────────────────────────────────────────────────────────────── */

/* `count` rolls the value up when the strip enters. Only "200" gets it: a
   number that climbs is a number you watch land. Rolling "Zero" up from
   nothing would be a lie told in motion — it is a hard zero and should read
   like one. */
type Spec = { value: string; label: string; count?: number };

const specs: Spec[] = [
  { value: "200", label: "Documents per API call", count: 200 },
  { value: "<1s", label: "Median read" },
  { value: "Every one", label: "Fields returned with a score" },
  { value: "Zero", label: "Fields it will guess at" },
];

function Stat({ spec, i }: { spec: Spec; i: number }) {
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const n = useTicker(spec.count ?? 0, seen && !reduce);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setSeen(true)}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ ...SPRING_SOFT, delay: i * 0.07 }}
      className="pt-6"
      style={{ borderTop: `1px solid ${SA.accent}26` }}
    >
      <div
        className="font-display font-normal tabular-nums leading-[1]"
        style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", letterSpacing: "-0.035em", color: SA.accent }}
      >
        {spec.count != null && !reduce ? n : spec.value}
      </div>
      <div className="mt-3 font-sans-g text-[14px] leading-[1.5]" style={{ color: SA.sub }}>
        {spec.label}
      </div>
    </motion.div>
  );
}

export default function Ledger() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 40%"] });
  const tail = useSpring(useTransform(scrollYProgress, [0, 1], [0.25, 1]), {
    stiffness: 70,
    damping: 26,
  });

  return (
    <section
      ref={ref}
      className="relative px-5 sm:px-8 py-24 sm:py-32"
      style={{ background: SA.accentSoft }}
      aria-labelledby="ledger-h"
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-y-8 lg:gap-x-20 items-start">
          <div>
            {/* the tail of the sentence resolves in the accent as the panel
                enters — colour as emphasis inside a line, which is the one
                decorative device this page allows itself */}
            <Words
              as="h2"
              text="What the engine will tell you"
              className="font-display font-normal leading-[1.08]"
              style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)", letterSpacing: "-0.032em", color: SA.ink }}
            />
            <motion.span
              aria-hidden
              className="block font-display font-normal leading-[1.08]"
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)",
                letterSpacing: "-0.032em",
                color: SA.accent,
                opacity: reduce ? 1 : tail,
              }}
            >
              about its own work
            </motion.span>
            <span id="ledger-h" className="sr-only">
              What the engine will tell you about its own work
            </span>
          </div>

          <motion.p
            variants={child}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-12%" }}
            transition={{ ...SPRING_SOFT, delay: 0.2 }}
            className="font-sans-g leading-[1.75] max-w-[48ch] lg:pt-2"
            style={{ fontSize: "1.05rem", color: SA.sub }}
          >
            Most systems hand back an answer and leave you to work out whether to believe it. Ours hands back the answer
            and how sure it is — so your team spends its attention on the handful of fields that need a human, not on
            re-checking the ones that do not.
          </motion.p>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {specs.map((s, i) => (
            <Stat key={s.label} spec={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
