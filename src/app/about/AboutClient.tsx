"use client";

import { motion } from "framer-motion";
import { ScanLine, Braces, BadgeCheck, MoveRight, ArrowRight } from "lucide-react";
import { UI, DEEP } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Magnetic from "@/components/Magnetic";
import CtaBand from "@/components/CtaBand";
import { SonarVisual } from "@/components/BrandVisuals";

/* the spec-sheet lines in the hero panel */
const heroSpec = [
  { k: "Engine", v: "Sonar" },
  { k: "Reads", v: "Resumes · contracts · invoices" },
  { k: "Products", v: "ParsingLab · Govern" },
  { k: "Also", v: "Custom platforms" },
];

/* what we build - editorial divide-y rows */
const builds = [
  {
    eyebrow: "The engine",
    tag: "Sonar · confidence-scored",
    h: "One engine reads every document.",
    b: "Sonar takes in raw files and returns the fields and clauses that matter as structured, schema-validated output. Every value carries a confidence score, so people review the uncertain parts instead of re-reading the whole page.",
    href: "#sonar",
    cta: "See how Sonar works",
  },
  {
    eyebrow: "The products",
    tag: "ParsingLab · Govern",
    h: "Two products, built on the same core.",
    b: "ParsingLab turns resumes and application files into clean candidate records. Govern reads contracts and statements of work against your own playbook and flags the risk before anyone signs. Both share one engine, so accuracy improves everywhere at once.",
    href: "/products",
    cta: "See our products",
  },
  {
    eyebrow: "Custom builds",
    tag: "Tuned to your paperwork",
    h: "Platforms shaped to your documents.",
    b: "When the paperwork is specific to your industry, we build around it. Same engine, tuned to your schema and your review workflow, delivered as a platform your team actually runs day to day.",
    href: "/solutions",
    cta: "Explore solutions",
  },
];

const sonarPoints = [
  { Icon: ScanLine, t: "Reads difficult files", d: "Clean PDFs, messy scans, and phone photos all come out the same structured way." },
  { Icon: Braces, t: "Returns clean data", d: "Schema-validated output your systems can use right away, with no reformatting." },
  { Icon: BadgeCheck, t: "Scores its own work", d: "Every value carries a confidence score, so people review only what needs it." },
];

/* how we work - editorial divide-y rows (no shadowed icon cards) */
const values = [
  { n: "01", h: "Honest over impressive", b: "If a value isn't in the document, we leave it empty. We would rather flag uncertainty than fake confidence and let a wrong field slip downstream." },
  { n: "02", h: "Built on real documents", b: "We test against the messy files our clients actually have, the low-resolution scans and inconsistent formats, not a clean demo set that flatters the model." },
  { n: "03", h: "Depth over breadth", b: "We would rather do a few things with real domain knowledge than a hundred things generically. The engine knows what a credential expiry or a liability cap looks like." },
  { n: "04", h: "Software you can depend on", b: "We stay on after launch. A product isn't done when it ships. It's done when it runs reliably against next quarter's documents too." },
];

export default function AboutClient() {
  return (
    <div className="overflow-x-clip" style={{ background: UI.bg, color: UI.ink }}>
      <SiteNav />
      <main>
        {/* ───────── hero (asymmetric, left-aligned) ───────── */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none bx-blueprint opacity-[0.5]" />
          <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-[12%] left-[-6%] w-[34vw] max-w-[440px] aspect-square rounded-full blur-3xl opacity-40"
              style={{ background: "radial-gradient(circle, rgba(0,33,129,0.10), transparent 66%)" }} />
          </div>

          <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-20 sm:pb-28">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-y-12 lg:gap-x-16 items-center">
              <Reveal>
                <motion.span variants={fadeUp} className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
                  About Blue-IQ
                </motion.span>
                <motion.h1 variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: UI.ink }}>
                  We&apos;re a document-intelligence company.
                </motion.h1>
                <motion.p variants={fadeUp} custom={2} className="mt-6 font-sans-g leading-relaxed max-w-[54ch]" style={{ fontSize: "1.1rem", color: UI.sub }}>
                  We started Blue-IQ because the documents that run real businesses, from clinical resumes to enterprise contracts, were still being read by hand, or by tools that quietly guessed when they got stuck.
                </motion.p>
                <motion.p variants={fadeUp} custom={3} className="mt-5 font-sans-g leading-relaxed max-w-[54ch]" style={{ fontSize: "1.05rem", color: UI.sub }}>
                  So we built Sonar: an engine that reads with real domain knowledge, and the honesty to say what it isn&apos;t sure of. It now powers two of our own products and a growing set of custom platforms we build for clients.
                </motion.p>
                <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap items-center gap-3">
                  <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold text-white px-6 py-3.5 rounded-lg" style={{ background: UI.blue, boxShadow: `0 16px 34px -16px ${UI.blue}` }}>
                    Talk to us <MoveRight className="w-4 h-4" strokeWidth={2} />
                  </Magnetic>
                  <a href="/products" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-lg transition-colors hover:bg-white" style={{ border: `1px solid ${UI.line2}`, color: UI.ink }}>
                    See our products
                  </a>
                </motion.div>
              </Reveal>

              {/* spec-sheet panel (bordered, no shadow, blueprint motif) */}
              <Reveal>
                <motion.div variants={fadeUp} custom={2} className="relative overflow-hidden rounded-2xl p-7 sm:p-9" style={{ background: UI.surface, border: `1px solid ${UI.line2}` }}>
                  <div aria-hidden className="absolute inset-0 pointer-events-none bx-blueprint-fine opacity-[0.6]" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-g text-[12px]" style={{ color: UI.faint }}>SPEC / OVERVIEW</span>
                      <span className="w-2 h-2 rounded-sm" style={{ background: UI.blue }} />
                    </div>
                    <div className="mt-6" style={{ borderTop: `1px solid ${UI.line}` }}>
                      {heroSpec.map((s) => (
                        <div key={s.k} className="grid grid-cols-[0.7fr_1.3fr] gap-4 py-4" style={{ borderBottom: `1px solid ${UI.line}` }}>
                          <div className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: UI.blue }}>{s.k}</div>
                          <div className="font-sans-g text-[15px]" style={{ color: UI.ink }}>{s.v}</div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 font-mono-g text-[12px] leading-relaxed" style={{ color: UI.faint }}>
                      Read → score → deliver as structured data.
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────── what we build (editorial divide-y rows) ───────── */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <Reveal className="max-w-[640px] mb-12 sm:mb-16">
            <motion.span variants={fadeUp} className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
              What we build
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", color: UI.ink }}>
              One engine, three ways to put it to work.
            </motion.h2>
          </Reveal>
          <Reveal>
            <motion.div variants={fadeUp} style={{ borderTop: `1px solid ${UI.line2}` }}>
              {builds.map((r) => (
                <div key={r.eyebrow} className="grid lg:grid-cols-[0.85fr_1.15fr] gap-3 lg:gap-14 py-9 sm:py-11" style={{ borderBottom: `1px solid ${UI.line2}` }}>
                  <div>
                    <div className="font-sans-g text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: UI.blue }}>{r.eyebrow}</div>
                    <div className="mt-2.5 font-mono-g text-[12px]" style={{ color: UI.faint }}>{r.tag}</div>
                  </div>
                  <div>
                    <h3 className="font-display font-light tracking-[-0.02em] leading-[1.12]" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)", color: UI.ink }}>{r.h}</h3>
                    <p className="mt-3.5 font-sans-g leading-relaxed max-w-[56ch]" style={{ fontSize: "1.02rem", color: UI.sub }}>{r.b}</p>
                    <a href={r.href} className="inline-flex items-center gap-1.5 mt-5 font-sans-g text-[15px] font-semibold group" style={{ color: UI.blue2 }}>
                      {r.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </Reveal>
        </section>

        {/* ───────── Sonar (dark anchor) ───────── */}
        <section id="sonar" className="scroll-mt-20" style={{ background: DEEP, color: "#fff" }}>
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-y-12 lg:gap-x-16 items-center">
              <Reveal>
                <motion.span variants={fadeUp} className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue3 }}>
                  The Sonar engine
                </motion.span>
                <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", color: "#fff" }}>
                  Sonar is the engine behind everything we build.
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="mt-6 font-sans-g leading-relaxed max-w-[46ch]" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.74)" }}>
                  It takes in raw documents and data, pulls out the fields or clauses that matter, and returns them as structured output with a confidence score attached to every value.
                </motion.p>
                <div className="mt-9 space-y-5">
                  {sonarPoints.map((s, i) => (
                    <motion.div key={s.t} variants={fadeUp} custom={3 + i} className="flex items-start gap-4">
                      <span className="grid place-items-center w-11 h-11 rounded-xl shrink-0" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff" }}>
                        <s.Icon className="w-5 h-5" strokeWidth={1.6} />
                      </span>
                      <div>
                        <div className="font-sans-g text-[15.5px] font-semibold" style={{ color: "#fff" }}>{s.t}</div>
                        <div className="font-sans-g text-[13.5px] leading-relaxed mt-0.5" style={{ color: "rgba(255,255,255,0.62)" }}>{s.d}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
              <Reveal><motion.div variants={fadeUp} custom={1}><SonarVisual /></motion.div></Reveal>
            </div>
          </div>
        </section>

        {/* ───────── how we work (editorial divide-y rows) ───────── */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <Reveal className="max-w-[640px] mb-12 sm:mb-16">
            <motion.span variants={fadeUp} className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
              How we work
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: UI.ink }}>
              The principles the work runs on.
            </motion.h2>
          </Reveal>
          <Reveal>
            <motion.div variants={fadeUp} style={{ borderTop: `1px solid ${UI.line2}` }}>
              {values.map((v) => (
                <div key={v.n} className="grid lg:grid-cols-[0.85fr_1.15fr] gap-3 lg:gap-14 py-9 sm:py-11" style={{ borderBottom: `1px solid ${UI.line2}` }}>
                  <div>
                    <div className="font-mono-g text-[12px]" style={{ color: UI.faint }}>{v.n}</div>
                    <h3 className="mt-2 font-display font-light tracking-[-0.02em] leading-[1.12]" style={{ fontSize: "clamp(1.3rem, 2.3vw, 1.75rem)", color: UI.ink }}>{v.h}</h3>
                  </div>
                  <div>
                    <p className="font-sans-g leading-relaxed max-w-[56ch]" style={{ fontSize: "1.02rem", color: UI.sub }}>{v.b}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </Reveal>
        </section>

        <CtaBand
          eyebrow="Work with us"
          title="Want to see what Sonar can do with your documents?"
          text="Bring a real file. We'll show you the structured output, and talk through whether a product or a custom build is the right fit."
          secondary={{ label: "Explore solutions", href: "/solutions" }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
