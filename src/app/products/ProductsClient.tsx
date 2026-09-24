"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { EASE } from "@/components/saas/motion";
import { PageHero, HeroButton, WRAP } from "@/components/page/kit";
import { CaptureArt, SpendArt, GovernArt } from "@/components/art/ProductArt";
import { CpuArchitecture } from "@/components/saas/CpuArchitecture";
import {
  type BqIcon,
  IconCapture,
  IconSpend,
  IconGovern,
  IconCampus,
  IconWorkforce,
  IconCustom,
  IconCheck,
  IconArrow,
  IconArrowUpRight,
} from "@/components/icons/BqIcons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /products — the catalogue, made to be compared.

   1. A product switcher: pick Capture, Spend or Govern and the drawing,
      three facts and the way in change together.
   2. The stack, as four layers: Sonar → Capture → Spend + Govern → editions.
   3. Editions as a real comparison table — what is in each, for whom.
   Short copy everywhere; a buyer should be able to scan this page in a
   minute.
   ──────────────────────────────────────────────────────────────── */

type P = {
  id: string;
  name: string;
  Icon: BqIcon;
  role: string;
  line: string;
  facts: string[];
  href: string;
  cta: string;
  external?: boolean;
  Art: React.ComponentType;
};

const PRODUCTS: P[] = [
  {
    id: "capture",
    name: "Capture",
    Icon: IconCapture,
    role: "Foundation",
    line: "Extract structured data from any document.",
    facts: ["No templates or rules to maintain", "A score on every field", "Scans and phone photos read like PDFs"],
    href: "https://www.parsinglab.blue-iq.ai/",
    cta: "Open Capture",
    external: true,
    Art: CaptureArt,
  },
  {
    id: "spend",
    name: "Spend",
    Icon: IconSpend,
    role: "Built on Capture",
    line: "Catch overbilling before you pay it.",
    facts: ["Invoices matched to contracts and POs", "Overbilling flagged as it is billed", "Licences checked against entitlements"],
    href: "/contact",
    cta: "Book a Spend demo",
    Art: SpendArt,
  },
  {
    id: "govern",
    name: "Govern",
    Icon: IconGovern,
    role: "Built on Capture",
    line: "See contract risk before you sign.",
    facts: ["Checked against your own playbook", "Every deviation risk-rated", "Unreadable clauses flagged, never filled in"],
    href: "https://govern.blue-iq.ai/",
    cta: "Open Govern",
    external: true,
    Art: GovernArt,
  },
];

function Explorer() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const p = PRODUCTS[i];
  const Arrow = p.external ? IconArrowUpRight : IconArrow;

  return (
    <section id="spend" className="py-16 sm:py-24 scroll-mt-24" style={{ background: SA.bg }}>
      <div className={WRAP}>
        <SectionHead title="Three products, one AI" sub="Start with the one you need. Add the others when you are ready." />

        <Reveal className="mt-10 inline-flex p-1.5 rounded-full max-w-full overflow-x-auto" style={{ background: SA.bg2, border: `1px solid ${SA.line}` }}>
          {PRODUCTS.map((x, k) => {
            const on = k === i;
            return (
              <button
                key={x.id}
                type="button"
                onClick={() => setI(k)}
                aria-pressed={on}
                className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans-g text-[15px] font-semibold whitespace-nowrap transition-colors"
                style={{ color: on ? "#fff" : SA.sub }}
              >
                {on && <motion.span layoutId="prod-pill" className="absolute inset-0 rounded-full" style={{ background: SA.ink }} transition={{ type: "spring", stiffness: 320, damping: 30 }} />}
                <x.Icon size={18} className="relative" />
                <span className="relative">{x.name}</span>
              </button>
            );
          })}
        </Reveal>

        <div className="mt-6 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-5 items-stretch">
          <div className="rounded-[28px] h-[280px] sm:h-[420px] flex items-center justify-center p-8 sm:p-14" style={{ background: "linear-gradient(160deg, #F6F8FC, #E9F0FC)", border: `1px solid ${SA.line}` }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full"
                initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p.Art />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="rounded-[28px] p-8 sm:p-10 flex flex-col"
              style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
            >
              <span className="font-sans-g text-[14px] font-semibold" style={{ color: SA.accent }}>
                {p.role}
              </span>
              <h3 className="mt-5 font-display font-semibold text-[2.2rem] tracking-[-0.035em]" style={{ color: SA.ink }}>
                {p.name}
              </h3>
              <p className="mt-2 font-sans-g text-[1.1rem] leading-[1.5]" style={{ color: SA.sub }}>
                {p.line}
              </p>
              <ul className="mt-7 space-y-3.5">
                {p.facts.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sans-g text-[15.5px]" style={{ color: SA.ink }}>
                    <span className="shrink-0 grid place-items-center w-6 h-6 rounded-full" style={{ background: SA.accent, color: "#fff" }}>
                      <IconCheck size={13} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                target={p.external ? "_blank" : undefined}
                rel={p.external ? "noopener noreferrer" : undefined}
                className="group mt-auto pt-9 inline-flex items-center gap-2 self-start font-sans-g text-[15px] font-semibold"
                style={{ color: SA.accent }}
              >
                {p.cta}
                <Arrow size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* the stack, as four layers */
function Stack() {
  const stops: [string, string][] = [
    ["Sonar", "The AI that reads"],
    ["Capture", "Documents into data"],
    ["Spend and Govern", "Put that data to work"],
    ["Editions", "Packaged for your sector"],
  ];
  return (
    <section className="py-16 sm:py-24" style={{ background: SA.navy }}>
      <div className={`${WRAP} grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 items-center`}>
        <div>
          <SectionHead align="stack" tone="dark" title="How the Blue-IQ platform fits together" sub="Sonar reads. Capture structures. Spend and Govern act on the data." />
          <div className="mt-8 w-full max-w-[420px] aspect-[2/1]">
            <CpuArchitecture className="text-[#6AA3FF]/45" text="SONAR" />
          </div>
        </div>
        <Reveal as="ul" className="grid sm:grid-cols-2 gap-3">
          {stops.map(([t, d], k) => (
            <li key={t} className="rounded-2xl p-6 transition-colors hover:bg-[#15245A]" style={{ background: SA.navy2, border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="font-mono-g text-[12px]" style={{ color: "#8EC2FF" }}>
                Layer {k + 1}
              </span>
              <p className="mt-2 font-display font-semibold text-[1.25rem] tracking-[-0.02em] text-white">{t}</p>
              <p className="mt-1 font-sans-g text-[14.5px]" style={{ color: "rgba(255,255,255,0.72)" }}>
                {d}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const ROWS: [string, boolean, boolean][] = [
  ["Capture: documents into scored data", true, true],
  ["Spend: invoices and licences reconciled", true, true],
  ["Govern: contracts against your playbook", true, true],
  ["Transcripts, applications and grants", true, false],
  ["Resumes, licences and credentials", false, true],
  ["Bill rates, margins and SOWs", false, true],
];

function Editions() {
  return (
    <section id="editions" className="py-16 sm:py-24 scroll-mt-24" style={{ background: SA.bg2 }}>
      <div className={WRAP}>
        <SectionHead title="Industry editions" sub="Capture, Spend and Govern, tuned to the documents your sector runs on." />

        <Reveal className="mt-10 sm:mt-12 rounded-[24px] overflow-x-auto" style={{ background: SA.surface, border: `1px solid ${SA.line}` }}>
          <table className="w-full min-w-[620px] text-left font-sans-g">
            <thead>
              <tr style={{ borderBottom: `1px solid ${SA.line}` }}>
                <th className="p-6 w-[46%] align-bottom font-medium text-[14px]" style={{ color: SA.sub }}>
                  What is included
                </th>
                {[
                  { n: "Campus", d: "Universities and colleges", Icon: IconCampus },
                  { n: "Workforce", d: "Staffing and healthcare", Icon: IconWorkforce },
                ].map((e) => (
                  <th key={e.n} className="p-6 align-bottom">
                    <e.Icon size={28} className="shrink-0" style={{ color: SA.accent }} />
                    <span className="block mt-3 font-display font-semibold text-[1.3rem] tracking-[-0.02em]" style={{ color: SA.ink }}>
                      {e.n}
                    </span>
                    <span className="block text-[13.5px] font-normal" style={{ color: SA.sub }}>
                      {e.d}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([r, a, b]) => (
                <tr key={r} className="transition-colors hover:bg-[#F6F8FC]" style={{ borderBottom: `1px solid ${SA.line}` }}>
                  <td className="px-6 py-4 text-[15px]" style={{ color: SA.ink }}>
                    {r}
                  </td>
                  {[a, b].map((v, k) => (
                    <td key={k} className="px-6 py-4">
                      {v ? (
                        <span className="grid place-items-center w-7 h-7 rounded-full" style={{ background: SA.accent, color: "#fff" }} aria-label="Included">
                          <IconCheck size={14} />
                        </span>
                      ) : (
                        <span className="text-[15px]" style={{ color: SA.faint }} aria-label="Not included">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between rounded-[24px] p-6 sm:p-8" style={{ background: SA.surface, border: `1px solid ${SA.line}` }}>
          <div className="flex items-center gap-4">
            <IconCustom size={28} className="shrink-0" style={{ color: SA.accent }} />
            <p className="font-sans-g text-[16px]" style={{ color: SA.ink }}>
              <strong className="font-semibold">Neither fits?</strong> We build a custom edition on Sonar.
            </p>
          </div>
          <a href="/solutions#custom" className="group inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold" style={{ color: SA.accent }}>
            Start a custom build <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function ProductsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />
      <main>
        <PageHero label="Products" title="Document AI products for extraction, spend and contracts" lede="Extract data from any document, reconcile invoices and review contracts, all on one AI. Add an edition built for your sector.">
          <HeroButton href="/contact">Book a demo</HeroButton>
          <HeroButton href="#editions" ghost>
            Compare editions
          </HeroButton>
        </PageHero>
        <Explorer />
        <Stack />
        <Editions />
      </main>
      <SiteFooter />
    </div>
  );
}
