"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Upload, ScanLine, Share2 } from "lucide-react";
import { SA } from "@/lib/theme";
import { SectionHead } from "@/components/saas/parts";
import { SPRING, SPRING_SOFT } from "@/components/saas/motion";

const steps = [
  {
    Icon: Upload,
    n: "01",
    t: "Ingest anything",
    d: "PDFs, scans, exports, email attachments. Send them through the API or a watched folder. OCR handles the ones that were photographed on a phone.",
    meta: "PDF · DOCX · PNG · scans",
  },
  {
    Icon: ScanLine,
    n: "02",
    t: "Read and score",
    d: "Sonar pulls out the fields that matter and scores its own confidence on each one, so uncertainty is surfaced for review instead of buried in the output.",
    meta: "Confidence on every field",
  },
  {
    Icon: Share2,
    n: "03",
    t: "Deliver where you work",
    d: "Schema-validated JSON lands in your ATS, CRM, or warehouse over a documented REST API and signed webhooks. No re-keying, no export step.",
    meta: "REST · webhooks · connectors",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18%" });
  const reduce = useReducedMotion();

  return (
    <section
      className="relative px-5 sm:px-8 py-20 sm:py-28"
      style={{ background: SA.bg2, borderTop: `1px solid ${SA.line}` }}
      aria-labelledby="how-h"
    >
      <div className="max-w-[1180px] mx-auto">
        <div id="how-h">
          <SectionHead
            eyebrow="How it works"
            title="From raw document to a decision your team can"
            accent="act on"
            sub="No templates to maintain and no extraction rules to hand-write. Three steps, and the data is sitting in the tools you already run."
          />
        </div>

        <div ref={ref} className="relative mt-16 grid md:grid-cols-3 gap-5">
          {/* the thread between the steps draws itself once, left to right */}
          <motion.div
            aria-hidden
            className="hidden md:block absolute left-0 right-0 top-[38px] h-px origin-left"
            style={{ background: `linear-gradient(90deg, transparent, ${SA.line2} 12%, ${SA.line2} 88%, transparent)` }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : undefined}
            transition={{ ...SPRING_SOFT, delay: 0.15 }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ ...SPRING_SOFT, delay: 0.2 + i * 0.12 }}
              className="group relative flex flex-col items-center text-center"
            >
              {/* the icon tile lifts and the glyph turns as you approach it */}
              <motion.span
                className="relative grid place-items-center w-[76px] h-[76px] rounded-2xl"
                style={{
                  background: SA.surface,
                  border: `1px solid ${SA.line2}`,
                  color: SA.accent,
                  boxShadow: "0 1px 2px rgba(11,11,15,0.04)",
                }}
                whileHover={reduce ? undefined : { y: -5, boxShadow: "0 12px 28px -12px rgba(11,11,15,0.18)" }}
                transition={SPRING}
              >
                {/* a ring that keeps breathing on the active-looking tile */}
                {!reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: `1px solid ${SA.accent}` }}
                    animate={{ opacity: [0, 0.25, 0], scale: [0.94, 1.1, 1.16] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                  />
                )}
                <motion.span
                  className="relative"
                  whileHover={reduce ? undefined : { rotate: -8, scale: 1.08 }}
                  transition={SPRING}
                >
                  <s.Icon className="w-6 h-6" strokeWidth={1.6} />
                </motion.span>
              </motion.span>

              <div className="mt-6 font-mono-g text-[11px] tracking-[0.18em]" style={{ color: SA.faint }}>
                {s.n}
              </div>
              <h3 className="mt-2 font-display font-normal tracking-[-0.02em] text-[1.35rem]" style={{ color: SA.ink }}>
                {s.t}
              </h3>
              <p className="mt-3 font-sans-g text-[14.5px] leading-relaxed max-w-[36ch]" style={{ color: SA.sub }}>
                {s.d}
              </p>
              <span
                className="mt-5 font-mono-g text-[10.5px] uppercase tracking-[0.14em] px-2.5 py-1.5 rounded-md transition-colors group-hover:border-[#DEDEE3]"
                style={{ background: SA.surface, border: `1px solid ${SA.line}`, color: SA.faint }}
              >
                {s.meta}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
