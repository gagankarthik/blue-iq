"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { Words, SPRING_SOFT, child } from "@/components/saas/motion";
import { CpuArchitecture } from "@/components/saas/CpuArchitecture";

/* The engine section. Every product on the site is the same reader — Sonar —
   pointed at a different kind of document. This band says that plainly and
   shows the signal moving through the chip, then makes the one honest offer we
   can make: send us a real document and watch it come back read.

   The chip sits on the one near-black panel the page allows itself. The traces
   are faint white; only the travelling glow carries colour, so the panel reads
   as an instrument, not a decoration. */
export default function Sonar() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative px-5 sm:px-8 py-24 sm:py-32"
      style={{ background: SA.bg, borderTop: `1px solid ${SA.line}` }}
      aria-labelledby="sonar-h"
    >
      <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-x-16 gap-y-12 items-center">
        {/* ── the argument ── */}
        <div>
          <div id="sonar-h">
            <Words
              as="h2"
              text="It is one engine underneath. We call it Sonar."
              className="font-display font-normal leading-[1.1] max-w-[18ch]"
              style={{ fontSize: "clamp(1.9rem, 3.3vw, 2.7rem)", letterSpacing: "-0.032em", color: SA.ink }}
            />
          </div>
          <motion.p
            variants={child}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-12%" }}
            transition={{ ...SPRING_SOFT, delay: 0.12 }}
            className="mt-6 font-sans-g leading-[1.72] max-w-[48ch]"
            style={{ fontSize: "1.05rem", color: SA.sub }}
          >
            Capture, Spend, and Govern are not three systems bolted together. They are one reader
            aimed at three kinds of document. Sonar reads the page, scores how sure it is of every
            field it pulls, and hands back structured data your systems can act on. When it is not
            sure, it tells you which field to check rather than guessing.
          </motion.p>

          {/* the one honest offer — moved here from the FAQ, where it belongs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ ...SPRING_SOFT, delay: 0.2 }}
            className="mt-9 rounded-2xl p-6 sm:p-7"
            style={{ background: SA.accentSoft, border: `1px solid ${SA.accent}1F` }}
          >
            <h3 className="font-display font-normal" style={{ fontSize: "1.15rem", letterSpacing: "-0.02em", color: SA.ink }}>
              Still deciding?
            </h3>
            <p className="mt-2.5 font-sans-g text-[15px] leading-[1.65] max-w-[46ch]" style={{ color: SA.sub }}>
              Send us a document from your own pipeline. We will read it with Sonar and show you
              exactly what comes back: the fields, the scores, and the ones it flags for review.
            </p>
            <a
              href="/contact"
              className="group mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans-g text-[14px] font-medium transition-transform duration-200 active:scale-[0.98]"
              style={{ background: SA.accent, color: "#fff" }}
            >
              Send us a document
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>

        {/* ── the instrument ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ ...SPRING_SOFT, delay: 0.1 }}
          className="relative rounded-3xl p-6 sm:p-8 overflow-hidden"
          style={{
            background: "#0B0B0F",
            boxShadow: "0 2px 4px rgba(11,11,15,0.06), 0 40px 90px -40px rgba(0,33,129,0.5), 0 20px 50px -30px rgba(11,11,15,0.5)",
          }}
        >
         

          <div className="mt-4 mx-auto w-full max-w-[440px]">
            <CpuArchitecture className="text-white/[0.14]" text="SONAR" />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
