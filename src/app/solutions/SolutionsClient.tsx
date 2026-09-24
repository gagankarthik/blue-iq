"use client";

import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { PageHero, HeroButton, WRAP } from "@/components/page/kit";
import { CustomArt } from "@/components/art/ProductArt";
import { IngestArt, DeliverArt } from "@/components/art/StepArt";
import {
  type BqIcon,
  IconNetwork,
  IconCampus,
  IconWorkforce,
  IconHealth,
  IconScale,
  IconReceipt,
  IconCheck,
  IconArrow,
} from "@/components/icons/BqIcons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /solutions — by industry, and by the work we do for you.

   1. Six industry cards (each an anchor the nav links to).
   2. Three services as alternating rows, each with its own drawing.
   3. How an engagement runs, as four short steps.
   ──────────────────────────────────────────────────────────────── */

const INDUSTRIES: { id: string; Icon: BqIcon; name: string; line: string; docs: string[] }[] = [
  { id: "it", Icon: IconNetwork, name: "IT sector", line: "Vendor contracts and licences under control.", docs: ["MSAs", "SOWs", "Invoices"] },
  { id: "education", Icon: IconCampus, name: "Education", line: "Applications into clean student records.", docs: ["Applications", "Transcripts", "Grants"] },
  { id: "workforce", Icon: IconWorkforce, name: "Workforce", line: "Candidates onboarded from one read.", docs: ["Resumes", "Certifications", "Right to work"] },
  { id: "healthcare", Icon: IconHealth, name: "Healthcare staffing", line: "Clinicians credentialed in minutes.", docs: ["Licences", "Immunisations", "Compliance"] },
  { id: "legal", Icon: IconScale, name: "Legal and contracts", line: "Risk surfaced before signature.", docs: ["Agreements", "NDAs", "Amendments"] },
  { id: "procurement", Icon: IconReceipt, name: "Procurement and finance", line: "Spend reconciled as it is billed.", docs: ["Invoices", "POs", "Receipts"] },
];

const SERVICES: { id: string; name: string; line: string; points: string[]; Art: React.ComponentType }[] = [
  {
    id: "custom",
    name: "Custom development",
    line: "When no product fits, we build one on Sonar.",
    points: ["Built on your real documents", "You approve the schema first", "Shipped as an API, an app, or both"],
    Art: CustomArt,
  },
  {
    id: "migrations",
    name: "Enterprise migrations",
    line: "Replace a legacy document parser without losing history.",
    points: ["Every old field mapped or retired", "Archive re-read into the new schema", "Run side by side before cutover"],
    Art: IngestArt,
  },
  {
    id: "integrations",
    name: "Integrations",
    line: "Structured data delivered to the systems your team already uses.",
    points: ["REST API and signed webhooks", "Native connectors for ATS, ERP and CLM", "Custom routes where none exist"],
    Art: DeliverArt,
  },
];

const STEPS: [string, string][] = [
  ["Send us documents", "Real files from your pipeline."],
  ["Agree the output", "Fields, types and review lines."],
  ["We build it", "On Sonar, tested on your files."],
  ["We stay on it", "Your documents change. So do we."],
];

export default function SolutionsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />
      <main>
        <PageHero label="Solutions" title="Document AI solutions for your industry" lede="Ready-made for six sectors, with custom builds, migrations and integrations when you need more.">
          <HeroButton href="/contact">Talk to our team</HeroButton>
          <HeroButton href="#custom" ghost>
            See our services
          </HeroButton>
        </PageHero>

        {/* industries */}
        <section id="industries" className="py-16 sm:py-24 scroll-mt-24" style={{ background: SA.bg }}>
          <div className={WRAP}>
            <SectionHead title="Industries we serve" sub="One AI, tuned to each sector's paperwork." />
            <Reveal className="mt-10 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {INDUSTRIES.map((x) => (
                <a
                  key={x.id}
                  id={x.id}
                  href="/contact"
                  className="group scroll-mt-28 rounded-[22px] p-7 flex flex-col transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(10,18,48,0.3)] hover:border-[#C9D6F0]"
                  style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
                >
                  <x.Icon size={30} className="shrink-0" style={{ color: SA.accent }} />
                  <h3 className="mt-6 font-display font-semibold text-[1.3rem] tracking-[-0.02em]" style={{ color: SA.ink }}>
                    {x.name}
                  </h3>
                  <p className="mt-1.5 font-sans-g text-[15px]" style={{ color: SA.sub }}>
                    {x.line}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {x.docs.map((d) => (
                      <span key={d} className="font-sans-g text-[12.5px] font-medium px-2.5 py-1 rounded-full" style={{ background: SA.bg2, color: SA.sub, border: `1px solid ${SA.line}` }}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold" style={{ color: SA.accent }}>
                    Talk to us <IconArrow size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </Reveal>
          </div>
        </section>

        {/* services */}
        <section className="py-16 sm:py-24" style={{ background: SA.bg2 }}>
          <div className={WRAP}>
            <SectionHead title="Custom document AI development" sub="Engineering work, scoped on your documents and supported by our team." />
            <div className="mt-10 sm:mt-12 flex flex-col gap-5">
              {SERVICES.map((s, k) => (
                <Reveal
                  key={s.id}
                  className="scroll-mt-28 grid md:grid-cols-2 items-center rounded-[28px] overflow-hidden"
                  style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
                >
                  <div id={s.id} className={`h-[240px] sm:h-[320px] flex items-center justify-center p-8 [&_svg]:w-full [&_svg]:h-full ${k % 2 ? "md:order-2" : ""}`} style={{ background: "linear-gradient(160deg, #F6F8FC, #E9F0FC)" }}>
                    <s.Art />
                  </div>
                  <div className="p-8 sm:p-12">
                    <h3 className="font-display font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)", color: SA.ink }}>
                      {s.name}
                    </h3>
                    <p className="mt-2 font-sans-g text-[16.5px] leading-[1.55]" style={{ color: SA.sub }}>
                      {s.line}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 font-sans-g text-[15px]" style={{ color: SA.ink }}>
                          <span className="shrink-0 grid place-items-center w-6 h-6 rounded-full" style={{ background: SA.accentSoft, color: SA.accent }}>
                            <IconCheck size={13} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* engagement */}
        <section className="py-16 sm:py-24" style={{ background: SA.bg }}>
          <div className={WRAP}>
            <SectionHead title="How a project runs" sub="We scope on your real data, never on a guess." />
            <Reveal as="ul" className="mt-10 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map(([t, d], k) => (
                <li key={t} className="relative rounded-[22px] p-7" style={{ background: k === 0 ? SA.navy : SA.bg2, border: `1px solid ${k === 0 ? SA.navy : SA.line}` }}>
                  <span className="font-display font-semibold text-[2.6rem] leading-none tracking-[-0.04em]" style={{ color: k === 0 ? "#6AA3FF" : SA.accent }}>
                    {k + 1}
                  </span>
                  <p className="mt-6 font-display font-semibold text-[1.15rem] tracking-[-0.02em]" style={{ color: k === 0 ? "#fff" : SA.ink }}>
                    {t}
                  </p>
                  <p className="mt-1 font-sans-g text-[14.5px]" style={{ color: k === 0 ? "rgba(255,255,255,0.72)" : SA.sub }}>
                    {d}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
