"use client";

import { motion } from "framer-motion";
import {
  Boxes, GitMerge, Plug, Scale, Landmark, ShieldCheck, FileText,
  MoveRight, Check,
} from "lucide-react";
import { UI } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import { SolutionsVisual } from "@/components/BrandVisuals";

const tracks = [
  {
    id: "custom", Icon: Boxes, t: "Custom development",
    h: "A product built around your workflow, not the other way round.",
    d: "When your documents or data don't fit an off-the-shelf tool, we design the schema, train the extraction, and ship a working product against it, running on our Sonar engine.",
    points: ["Scoped against your real documents, not a demo set", "Delivered as an API, a dashboard, or both", "Yours to run, with our team behind it"],
  },
  {
    id: "migrations", Icon: GitMerge, t: "Enterprise migrations",
    h: "Move off a legacy parser or a manual process without the disruption.",
    d: "We map your existing fields, bring your historical data across, and cut over on a schedule that doesn't put your current operations at risk.",
    points: ["Field-by-field mapping from your current system", "Historical data carried forward, not left behind", "A cutover plan built around your calendar"],
  },
  {
    id: "integrations", Icon: Plug, t: "Integrations",
    h: "Structured output, delivered straight into the tools you already run.",
    d: "A documented API, native connectors, and signed webhooks mean the data we produce lands directly in your ATS, CRM, ERP, or procurement system.",
    points: ["A documented REST API and webhook delivery", "Native connectors for common enterprise systems", "Batch processing for high-volume workloads"],
  },
];

const process = [
  { n: "01", h: "Scope", b: "We look at your actual documents and data, and agree on what a working solution needs to do." },
  { n: "02", h: "Design", b: "We design the schema and the extraction rules, and confirm the approach before we build." },
  { n: "03", h: "Build", b: "Our team builds and tests against your real documents, not a generic sample set." },
  { n: "04", h: "Ship & support", b: "We deploy, connect it to your systems, and stay on to support it as your needs change." },
];

const industries = [
  { Icon: FileText, t: "Healthcare staffing", d: "Custom extraction for clinical resumes, credentialing files, and compliance records." },
  { Icon: Scale, t: "Legal", d: "Contract and clause review built around your firm's own playbook." },
  { Icon: Landmark, t: "Procurement & finance", d: "SOW and invoice reconciliation tuned to your vendor agreements." },
  { Icon: ShieldCheck, t: "Compliance & risk", d: "Audit trails and confidence scoring built for how your oversight actually works." },
];

/* per-track spec panels - a bordered blueprint surface hinting at the work,
   not a single decorative icon. */
const schemaRows = [
  ["candidate.name", "string"],
  ["role.seniority", "enum"],
  ["score.confidence", "float"],
  ["compliance.expiry", "date"],
];
const mappingRows = [
  ["cand_nm", "candidate.name"],
  ["exp_yrs", "experience.years"],
  ["lic_st", "credential.state"],
  ["doc_dt", "document.issued"],
];
const connectorChips = ["ATS", "CRM", "ERP", "REST API", "Webhooks", "Batch"];

function TrackPanel({ id }: { id: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ background: UI.surface, border: `1px solid ${UI.line2}` }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none bx-blueprint opacity-[0.55]" />
      <div className="relative p-6 sm:p-8">
        {id === "custom" && (
          <>
            <div className="flex items-center justify-between">
              <span className="font-mono-g text-[12px]" style={{ color: UI.faint }}>schema.json</span>
              <span className="font-mono-g text-[12px]" style={{ color: UI.blue2 }}>4 fields</span>
            </div>
            <div className="mt-4" style={{ borderTop: `1px solid ${UI.line}` }}>
              {schemaRows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${UI.line}` }}>
                  <span className="font-mono-g text-[12.5px]" style={{ color: UI.ink }}>{k}</span>
                  <span className="font-mono-g text-[12px] px-2 py-0.5 rounded" style={{ background: UI.soft, color: UI.blue }}>{v}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {id === "migrations" && (
          <>
            <div className="flex items-center justify-between">
              <span className="font-mono-g text-[12px]" style={{ color: UI.faint }}>legacy → blue-iq</span>
              <span className="font-mono-g text-[12px]" style={{ color: UI.blue2 }}>mapped</span>
            </div>
            <div className="mt-4" style={{ borderTop: `1px solid ${UI.line}` }}>
              {mappingRows.map(([from, to]) => (
                <div key={from} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-2.5" style={{ borderBottom: `1px solid ${UI.line}` }}>
                  <span className="font-mono-g text-[12px] truncate" style={{ color: UI.sub }}>{from}</span>
                  <MoveRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2} style={{ color: UI.blue2 }} />
                  <span className="font-mono-g text-[12px] truncate" style={{ color: UI.ink }}>{to}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {id === "integrations" && (
          <>
            <div className="flex items-center justify-between">
              <span className="font-mono-g text-[12px]" style={{ color: UI.faint }}>connectors</span>
              <span className="font-mono-g text-[12px]" style={{ color: UI.blue2 }}>live</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {connectorChips.map((c) => (
                <span key={c} className="inline-flex items-center gap-2 font-mono-g text-[12.5px] px-3 py-1.5 rounded-lg" style={{ background: UI.surface, border: `1px solid ${UI.line2}`, color: UI.ink }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: UI.blue }} />
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between py-2.5" style={{ borderTop: `1px solid ${UI.line}` }}>
              <span className="font-mono-g text-[12px]" style={{ color: UI.sub }}>POST /v1/documents</span>
              <span className="font-mono-g text-[12px]" style={{ color: UI.green }}>200 OK</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SolutionsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: UI.bg, color: UI.ink }}>
      <SiteNav />
      <main>
        {/* hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none bx-blueprint opacity-[0.5]" />
          <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-16 sm:pb-20">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-y-10 lg:gap-x-16 items-center">
              <Reveal>
                <motion.span variants={fadeUp} className="block font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
                  Solutions
                </motion.span>
                <motion.h1 variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: UI.ink }}>
                  When no product fits, we build one.
                </motion.h1>
                <motion.p variants={fadeUp} custom={2} className="mt-6 font-sans-g leading-relaxed max-w-[52ch]" style={{ fontSize: "1.1rem", color: UI.sub }}>
                  Blue-IQ is an engineering team as much as a product company. We design custom document and data products, migrate teams off legacy systems, and connect our Sonar engine into whatever stack you already run.
                </motion.p>
                <motion.a variants={fadeUp} custom={3} href="/contact" className="inline-flex items-center gap-2 mt-8 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-lg text-white" style={{ background: UI.blue }}>
                  Scope a project <MoveRight className="w-4 h-4" strokeWidth={2} />
                </motion.a>
              </Reveal>
              <Reveal><motion.div variants={fadeUp} custom={1}><SolutionsVisual /></motion.div></Reveal>
            </div>
          </div>
        </section>

        {/* tracks */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
          <div className="space-y-20 sm:space-y-24">
            {tracks.map((tr, i) => (
              <Reveal key={tr.id}>
                <motion.article id={tr.id} variants={fadeUp} className="scroll-mt-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="grid place-items-center w-12 h-12 rounded-xl mb-6" style={{ background: UI.soft, color: UI.blue }}><tr.Icon className="w-6 h-6" strokeWidth={1.6} /></span>
                    <div className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>{tr.t}</div>
                    <h2 className="mt-3 font-display font-light tracking-[-0.02em] leading-[1.08]" style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)", color: UI.ink }}>{tr.h}</h2>
                    <p className="mt-4 font-sans-g leading-relaxed max-w-[50ch]" style={{ fontSize: "1rem", color: UI.sub }}>{tr.d}</p>
                    <ul className="mt-6 space-y-3">
                      {tr.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 font-sans-g text-[0.94rem]" style={{ color: UI.ink }}>
                          <span className="grid place-items-center w-5 h-5 rounded-full mt-0.5 shrink-0 text-white" style={{ background: UI.blue }}><Check className="w-3 h-3" strokeWidth={2.5} /></span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <TrackPanel id={tr.id} />
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* process: editorial timeline */}
        <section className="py-20 sm:py-28" style={{ background: UI.bg2, borderTop: `1px solid ${UI.line}`, borderBottom: `1px solid ${UI.line}` }}>
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-2xl mb-12 sm:mb-16">
              <motion.span variants={fadeUp} className="block font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
                How we work
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: UI.ink }}>
                From a first conversation to a product your team runs.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-5 font-sans-g leading-relaxed max-w-[52ch]" style={{ fontSize: "1.05rem", color: UI.sub }}>
                Four steps, no black boxes. You see the schema, the tests, and the output before anything goes live.
              </motion.p>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} style={{ borderTop: `1px solid ${UI.line2}` }}>
                {process.map((s) => (
                  <div key={s.n} className="grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-10 py-7 sm:py-9" style={{ borderBottom: `1px solid ${UI.line2}` }}>
                    <div className="font-mono-g text-[13px] font-semibold tracking-wider sm:pt-1.5" style={{ color: UI.blue }}>{s.n}</div>
                    <div className="max-w-[56ch]">
                      <h3 className="font-display font-light tracking-[-0.02em] leading-[1.15]" style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)", color: UI.ink }}>{s.h}</h3>
                      <p className="mt-2.5 font-sans-g leading-relaxed" style={{ fontSize: "1rem", color: UI.sub }}>{s.b}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* industries */}
        <section id="industries" className="scroll-mt-24 max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <Reveal className="max-w-2xl mb-12">
            <motion.span variants={fadeUp} className="block font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
              Where we work
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: UI.ink }}>
              Tuned to the documents of your industry.
            </motion.h2>
          </Reveal>
          <Reveal>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${UI.line2}`, borderLeft: `1px solid ${UI.line2}` }}>
              {industries.map((it) => (
                <div key={it.t} className="p-7" style={{ borderRight: `1px solid ${UI.line2}`, borderBottom: `1px solid ${UI.line2}` }}>
                  <span className="grid place-items-center w-11 h-11 rounded-xl mb-6" style={{ background: UI.soft, color: UI.blue }}><it.Icon className="w-5 h-5" strokeWidth={1.6} /></span>
                  <h3 className="font-display font-light tracking-[-0.02em]" style={{ fontSize: "1.2rem", color: UI.ink }}>{it.t}</h3>
                  <p className="mt-2 font-sans-g text-[0.9rem] leading-relaxed" style={{ color: UI.sub }}>{it.d}</p>
                </div>
              ))}
            </motion.div>
          </Reveal>
        </section>

        <CtaBand
          eyebrow="Scope a project"
          title="Tell us about the workflow you want to fix."
          text="We'll look at your documents, your systems, and what a working solution would need to do, then tell you honestly whether it's a fit."
          secondary={{ label: "See our products", href: "/products" }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
