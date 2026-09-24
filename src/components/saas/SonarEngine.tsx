"use client";

import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { CpuArchitecture } from "@/components/saas/CpuArchitecture";
import { type BqIcon, IconDocs, IconScore, IconFlag, IconArrow } from "@/components/icons/BqIcons";

/* Meet Sonar — the engine, given its own stage.

   The chip drawing is the one the team liked from the earlier build: Sonar
   as a processor, with light travelling its traces into the core. It sits on
   the page itself, no panel behind it. Beside it, the three things the engine
   does, one line each. */

const DOES: { Icon: BqIcon; t: string; d: string }[] = [
  { Icon: IconDocs, t: "Reads any document", d: "PDFs, Word files, scans and phone photos, with built-in OCR." },
  { Icon: IconScore, t: "Scores every field", d: "A confidence score on every value it extracts." },
  { Icon: IconFlag, t: "Flags instead of guessing", d: "Low-confidence fields go to your team for review." },
];

export default function SonarEngine() {
  return (
    <section id="sonar" className="relative px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20" style={{ background: SA.bg }} aria-labelledby="sonar-h">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-center">
        <div>
          <SectionHead align="stack" id="sonar-h" title="Meet Sonar, the AI behind every product" sub="Intelligent document processing that reads like a person and tells you how sure it is." />
          <Reveal as="ul" className="mt-8">
            {DOES.map(({ Icon, t, d }) => (
              <li key={t} className="flex items-start gap-4 py-5" style={{ borderTop: `1px solid ${SA.line}` }}>
                <Icon size={26} className="shrink-0 mt-0.5" style={{ color: SA.accent }} />
                <span>
                  <span className="block font-sans-g text-[16.5px] font-semibold" style={{ color: SA.ink }}>
                    {t}
                  </span>
                  <span className="block mt-0.5 font-sans-g text-[15px]" style={{ color: SA.sub }}>
                    {d}
                  </span>
                </span>
              </li>
            ))}
          </Reveal>
          <a href="#how" className="group mt-4 inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold" style={{ color: SA.accent }}>
            See how it works <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <Reveal delay={0.1} className="w-full aspect-[2/1] lg:scale-110 lg:origin-center">
          <CpuArchitecture className="text-[#1D5BF0]/35" text="SONAR" />
        </Reveal>
      </div>
    </section>
  );
}
