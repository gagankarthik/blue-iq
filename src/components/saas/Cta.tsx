"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SA } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";
import { Words, SPRING_SOFT, child } from "@/components/saas/motion";

export default function Cta() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* the wash behind the panel shifts as the panel rises into view */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yRaw = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const y = useSpring(yRaw, { stiffness: 70, damping: 26, mass: 0.5 });

  return (
    <section className="relative px-5 sm:px-8 py-20 sm:py-28" style={{ background: SA.bg }} aria-labelledby="cta-h">
      <motion.div
        ref={ref}
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={SPRING_SOFT}
        className="relative max-w-[1180px] mx-auto overflow-hidden rounded-3xl px-6 sm:px-12 py-16 sm:py-24 flex flex-col items-center text-center"
        style={{ background: SA.ink }}
      >
        {/* a single soft brand wash, drifting behind everything */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 -top-1/4 h-[150%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 55% at 50% 30%, rgba(44,73,214,0.34), transparent 70%)",
            y: reduce ? 0 : y,
          }}
        />
        <div aria-hidden className="absolute inset-0 pointer-events-none bx-blueprint opacity-[0.10]" />

        <Words
          as="h2"
          text="Send us the ugliest document"
          accent="you have"
          className="relative font-display font-normal tracking-[-0.035em] leading-[1.08]"
          style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", color: "#FFFFFF" }}
          accentClassName="font-serif-i"
          accentStyle={{ fontSize: "1.06em", color: "#A9BAFF" }}
        />
        <h2 id="cta-h" className="sr-only">
          Send us the ugliest document you have
        </h2>

        <motion.p
          variants={child}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-12%" }}
          transition={{ ...SPRING_SOFT, delay: 0.35 }}
          className="relative mt-6 font-sans-g leading-[1.65] max-w-[52ch]"
          style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.66)" }}
        >
          A photographed scan, a 90-page master agreement, an export nobody can open. We will read it with Sonar and
          show you exactly what comes back — fields, scores, and the ones it flags for review.
        </motion.p>

        <motion.div
          variants={child}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-12%" }}
          transition={{ ...SPRING_SOFT, delay: 0.45 }}
          className="relative mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic
            href="/contact"
            className="group inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3 rounded-full transition-transform active:scale-[0.97]"
            style={{ background: "#FFFFFF", color: SA.ink }}
          >
            Talk to us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </Magnetic>
          <a
            href="/products"
            className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3 rounded-full transition-colors active:scale-[0.97] hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.92)" }}
          >
            See the suite
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
