"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Words, SPRING_SOFT } from "@/components/saas/motion";

/* Real questions an enterprise buyer asks before a pilot. Answers stay inside
   what the company already claims — no invented numbers, no invented customers.

   Layout: the heading and the invitation sit together on one side, the
   questions on the other — so the ask ("send us a document") reads as the
   frame around the answers rather than a card wedged beside them. */
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
      <div className="max-w-[1180px] mx-auto grid lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] gap-x-16 gap-y-12 items-start">
        {/* ── one side: the heading and the invitation, sticky ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={SPRING_SOFT}
          className="lg:sticky lg:top-28"
        >
          <div id="faq-h">
            <Words
              as="h2"
              text="The things buyers actually ask us"
              className="font-display font-normal leading-[1.08] max-w-[16ch]"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", letterSpacing: "-0.032em", color: SA.ink }}
            />
          </div>
          <p className="mt-6 font-sans-g leading-[1.65] max-w-[42ch]" style={{ fontSize: "1.02rem", color: SA.sub }}>
            If your question is not here, it is probably the interesting one — send it over.
          </p>
        </motion.div>

        {/* ── the other side: the questions ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ ...SPRING_SOFT, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full" defaultValue="q0">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-b-0" style={{ borderTop: `1px solid ${SA.line2}` }}>
                <AccordionTrigger className="hover:opacity-70" style={{ color: SA.ink }}>
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
      </div>
    </section>
  );
}
