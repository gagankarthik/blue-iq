"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Stethoscope, Scale, Receipt } from "lucide-react";
import { SA } from "@/lib/theme";
import { SectionHead } from "@/components/saas/parts";
import { SPRING, SPRING_SOFT, Spotlight } from "@/components/saas/motion";

const cases = [
  {
    Icon: Stethoscope,
    k: "Healthcare staffing",
    tag: "Resumes · credentials · compliance",
    h: "Credential a clinician in seconds, not an afternoon.",
    d: "Clinical resumes, licences, and compliance files become structured records. Specialties, credentials, and expiry dates arrive ready for your ATS, each field scored so recruiters review only what is uncertain.",
  },
  {
    Icon: Scale,
    k: "Legal & contracts",
    tag: "SOWs · clauses · playbooks",
    h: "Know the risk before the signature.",
    d: "Govern reads statements of work and agreements against your own playbook, surfacing auto-renewals, liability caps, and termination terms with a risk rating attached. Legal reviews the exposure, not the boilerplate.",
  },
  {
    Icon: Receipt,
    k: "Procurement & finance",
    tag: "Invoices · POs · reconciliation",
    h: "Reconcile spend without the manual pass.",
    d: "Match invoices to contracts and purchase orders, catch the line items that drift from what was agreed, and flag spend leakage as it happens rather than at quarter close.",
  },
];

export default function UseCases() {
  const reduce = useReducedMotion();

  return (
    <section className="relative px-5 sm:px-8 py-20 sm:py-28" style={{ background: SA.bg }} aria-labelledby="uc-h">
      <div className="max-w-[1180px] mx-auto">
        <div id="uc-h">
          <SectionHead
            eyebrow="Where it works"
            title="Built for the documents that"
            accent="run your business"
            sub="The same engine, tuned to the paperwork of your industry. Here is where teams put it to work today."
          />
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.k}
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ ...SPRING_SOFT, delay: i * 0.1 }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="h-full"
            >
              <Spotlight className="h-full rounded-xl">
                <article
                  className="group flex flex-col h-full rounded-xl p-6 transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(11,11,15,0.04),0_22px_44px_-20px_rgba(11,11,15,0.18)]"
                  style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
                >
                  <motion.span
                    className="grid place-items-center w-11 h-11 rounded-xl"
                    style={{ background: SA.accentSoft, color: SA.accent }}
                    whileHover={reduce ? undefined : { rotate: -8, scale: 1.08 }}
                    transition={SPRING}
                  >
                    <c.Icon className="w-5 h-5" strokeWidth={1.7} />
                  </motion.span>

                  <h3 className="mt-5 font-sans-g text-[14px] font-semibold" style={{ color: SA.accent }}>
                    {c.k}
                  </h3>
                  <p
                    className="mt-2.5 font-display font-normal tracking-[-0.02em] leading-[1.25]"
                    style={{ fontSize: "1.3rem", color: SA.ink }}
                  >
                    {c.h}
                  </p>
                  <p className="mt-3.5 font-sans-g text-[14px] leading-relaxed flex-1" style={{ color: SA.sub }}>
                    {c.d}
                  </p>

                  <div
                    className="mt-6 pt-4 flex items-center justify-between gap-3"
                    style={{ borderTop: `1px solid ${SA.line}` }}
                  >
                    <span className="font-mono-g text-[10px] uppercase tracking-[0.12em]" style={{ color: SA.faint }}>
                      {c.tag}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                      style={{ color: SA.faint }}
                    />
                  </div>
                </article>
              </Spotlight>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/solutions"
            className="group inline-flex items-center gap-1.5 font-sans-g text-[15px] font-semibold"
            style={{ color: SA.accent }}
          >
            Explore solutions by industry
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
