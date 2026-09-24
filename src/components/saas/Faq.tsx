"use client";

import { SA } from "@/lib/theme";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { IconArrow } from "@/components/icons/BqIcons";
import { FAQS } from "@/components/saas/faqData";

export default function Faq() {
  return (
    <section id="faq" className="relative px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20" style={{ background: SA.bg }} aria-labelledby="faq-h">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-x-16 gap-y-10 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHead align="stack" id="faq-h" title="Frequently asked questions" sub="Can't find your answer? Our team will help." />
          <Reveal delay={0.1}>
            <a href="/contact" className="group mt-7 inline-flex items-center gap-1.5 font-sans-g text-[15px] font-semibold" style={{ color: SA.accent }}>
              Ask us directly
              <IconArrow size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <Accordion type="single" collapsible className="w-full" defaultValue="q0">
            {FAQS.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-b-0" style={{ borderTop: `1px solid ${SA.line2}` }}>
                <AccordionTrigger className="text-[17px] font-medium py-6" style={{ color: SA.ink }}>
                  {q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-sans-g text-[15.5px] leading-[1.7] max-w-[62ch] pr-8" style={{ color: SA.sub }}>
                    {a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div style={{ borderTop: `1px solid ${SA.line2}` }} />
        </Reveal>
      </div>
    </section>
  );
}
