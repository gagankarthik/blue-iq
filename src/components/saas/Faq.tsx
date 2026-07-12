"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SA } from "@/lib/theme";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHead } from "@/components/saas/parts";
import { SPRING_SOFT } from "@/components/saas/motion";

/* Real questions an enterprise buyer asks before a pilot. Answers stay inside
   what the company already claims — no invented numbers, no invented customers. */
const faqs: [string, string][] = [
  [
    "What happens when Sonar cannot read a field?",
    "It flags it. Every value comes back with a confidence score, and anything the engine is unsure of is surfaced for review rather than guessed at. That is the whole point of the design: a wrong value that looks confident costs you far more than a field marked for a human to check.",
  ],
  [
    "Do we have to change our systems to use it?",
    "No. Sonar delivers schema-validated JSON over a documented REST API and signed webhooks, plus native connectors, so the output lands in the ATS, CRM, or warehouse you already run. There is no re-architecting around us and no export step.",
  ],
  [
    "What document types can it handle?",
    "PDFs, DOCX, images, and exports — including scans and documents photographed on a phone, which go through OCR first. If your team can read it, the engine is built to read it.",
  ],
  [
    "How does it handle volume?",
    "Up to 200 documents per API call, with throughput holding steady across batches. The second batch runs as cleanly as the first.",
  ],
  [
    "What about our data?",
    "Documents move over TLS-encrypted connections, projects stay isolated in private workspaces, access is controlled by role and by SSO through your own identity provider, and personal data is handled to GDPR standards. Our handling is aligned to SOC 2, HIPAA, and GDPR.",
  ],
  [
    "What if none of your products fit our workflow?",
    "Then we build the one that does. Custom builds are a first-class part of the platform, not an afterthought — same engine, shaped around how your team actually works, engineered and supported by us.",
  ],
];

export default function Faq() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative px-5 sm:px-8 py-24 sm:py-36"
      style={{ background: SA.bg2, borderTop: `1px solid ${SA.line}` }}
      aria-labelledby="faq-h"
    >
      <div className="max-w-[1180px] mx-auto">
        <div id="faq-h">
          <SectionHead
            title="The things buyers actually ask us"
            sub="If your question is not here, it is probably the interesting one — send it over."
          />
        </div>

        <div className="mt-14 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)] gap-y-10 lg:gap-x-16 items-start">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={SPRING_SOFT}
          >
            <Accordion type="single" collapsible className="w-full" defaultValue="q0">
              {faqs.map(([q, a], i) => (
                <AccordionItem
                  key={q}
                  value={`q${i}`}
                  className="border-b-0"
                  style={{ borderTop: `1px solid ${SA.line2}` }}
                >
                  <AccordionTrigger
                    className="hover:opacity-70"
                    style={{ color: SA.ink }}
                  >
                    {q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-sans-g text-[15px] leading-[1.7] max-w-[62ch] pr-8" style={{ color: SA.sub }}>
                      {a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* the ask, sitting beside the answers rather than under them */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ ...SPRING_SOFT, delay: 0.1 }}
            className="rounded-2xl p-6 lg:sticky lg:top-32"
            style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
          >
            <h3 className="font-display font-medium tracking-[-0.02em] text-[1.25rem]" style={{ color: SA.ink }}>
              Still deciding?
            </h3>
            <p className="mt-3 font-sans-g text-[14px] leading-relaxed" style={{ color: SA.sub }}>
              Send us a document from your own pipeline. We will read it with Sonar and show you the fields, the scores,
              and the ones it flags.
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center gap-1.5 mt-5 font-sans-g text-[14.5px] font-semibold"
              style={{ color: SA.accent }}
            >
              Talk to us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
