"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight, MoveRight } from "lucide-react";
import { UI } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import { ParsingVisual, GovernVisual } from "@/components/BrandVisuals";

const products = [
  {
    key: "parsinglab",
    name: "ParsingLab",
    eyebrow: "Resume Parsing API",
    meta: "Healthcare-grade · On the Sonar engine",
    href: "https://www.parsinglab.blue-iq.ai/",
    headline: "A resume parser that actually understands healthcare.",
    line: "Send it a PDF, DOCX, or a photographed scan and get back schema-validated JSON: licences, credentials, travel history, and specialties, each returned with its own confidence score so recruiters review only what's uncertain.",
    points: [
      "Licence numbers with state and compact status",
      "Credentials preserved in order, like RN, BSN, CCRN",
      "More than 40 mapped fields, every one scored for confidence",
      "Reads scans and phone photos, and retains none of your files",
    ],
  },
  {
    key: "govern",
    name: "Govern",
    eyebrow: "Contract Intelligence",
    meta: "SOC 2, HIPAA & GDPR · On the Sonar engine",
    href: "https://govern.blue-iq.ai/",
    headline: "Bring contract chaos to clarity.",
    line: "Govern reads every clause across your SOWs, MSAs, NDAs, and DPAs, checks each against your own playbook, and attaches a risk rating to what deviates, so legal reviews the exposure, not the boilerplate.",
    points: [
      "Clause extraction across more than a dozen contract types",
      "Every clause scored against your own playbook",
      "Amendment diffs that recalculate contract value",
      "A full audit trail on every upload, edit, and approval",
    ],
  },
] as const;

export default function ProductsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: UI.bg, color: UI.ink }}>
      <SiteNav />
      <main>
        {/* ───────── hero (asymmetric, left-aligned) ───────── */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none bx-blueprint opacity-[0.5]" />
          <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-[8%] left-[-6%] w-[34vw] max-w-[460px] aspect-square rounded-full blur-3xl opacity-40"
              style={{ background: "radial-gradient(circle, rgba(0,33,129,0.10), transparent 66%)" }} />
          </div>
          <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-16 sm:pb-24">
            <Reveal className="max-w-[720px]">
              <motion.span variants={fadeUp} className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
                Products
              </motion.span>
              <motion.h1 variants={fadeUp} custom={1} className="mt-5 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: UI.ink }}>
                Two products, one intelligence core.
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="mt-6 font-sans-g leading-relaxed max-w-[54ch]" style={{ fontSize: "1.1rem", color: UI.sub }}>
                ParsingLab and Govern are live today. Both run on our Sonar engine and are shaped around the documents their users work with. Below them sits a third path: what we build when neither one fits.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-g text-[12px]" style={{ color: UI.faint }}>
                <span>PDF · DOCX · scans</span>
                <span>Schema-validated JSON</span>
                <span>Confidence on every field</span>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───────── products (2-col zig-zag) ───────── */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
          <div style={{ borderTop: `1px solid ${UI.line2}` }}>
            {products.map((pr, i) => (
              <Reveal key={pr.key}>
                <motion.article variants={fadeUp} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 sm:py-20" style={{ borderBottom: `1px solid ${UI.line2}` }}>
                  {/* copy */}
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
                      {pr.eyebrow}
                    </span>
                    <h2 className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.4vw, 2.9rem)", color: UI.ink }}>
                      {pr.name}
                    </h2>
                    <div className="mt-3 font-mono-g text-[12px]" style={{ color: UI.faint }}>{pr.meta}</div>
                    <h3 className="mt-6 font-display font-light tracking-[-0.02em] leading-[1.12]" style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", color: UI.ink }}>
                      {pr.headline}
                    </h3>
                    <p className="mt-4 font-sans-g leading-relaxed max-w-[52ch]" style={{ fontSize: "1.02rem", color: UI.sub }}>
                      {pr.line}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {pr.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 font-sans-g text-[0.96rem]" style={{ color: UI.ink }}>
                          <span className="grid place-items-center w-5 h-5 rounded-full mt-0.5 shrink-0 text-white" style={{ background: UI.blue }}>
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <a href={pr.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 font-sans-g text-[15px] font-semibold px-5 py-3 rounded-lg text-white transition-transform hover:-translate-y-0.5" style={{ background: UI.blue }}>
                      Open {pr.name} <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                    </a>
                  </div>
                  {/* visual panel */}
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative rounded-3xl p-4 sm:p-6" style={{ background: UI.surface, border: `1px solid ${UI.line2}` }}>
                      <div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none bx-blueprint opacity-[0.35]" />
                      <div className="relative">
                        {pr.key === "parsinglab" ? <ParsingVisual /> : <GovernVisual />}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── custom products ───────── */}
        <section className="py-20 sm:py-28" style={{ background: UI.bg2, borderTop: `1px solid ${UI.line}`, borderBottom: `1px solid ${UI.line}` }}>
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
            <Reveal>
              <motion.span variants={fadeUp} className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
                Custom solutions
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.03em] leading-[1.02]" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)", color: UI.ink }}>
                Not on this list yet? We build that too.
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="mt-4 font-mono-g text-[12px]" style={{ color: UI.faint }}>
                Client-branded · Same Sonar core
              </motion.div>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp}>
                <p className="font-sans-g leading-relaxed max-w-[56ch]" style={{ fontSize: "1.05rem", color: UI.sub }}>
                  ParsingLab and Govern are the two products we run today, each on its own site. A lot of our other work ships under a client&apos;s own brand: a purpose-built product for a workflow no off-the-shelf tool covers.
                </p>
                <p className="mt-5 font-sans-g leading-relaxed max-w-[56ch]" style={{ fontSize: "1.05rem", color: UI.sub }}>
                  If that sounds closer to what you need, our Solutions team designs, builds, and ships it, running on the same Sonar engine underneath.
                </p>
                <a href="/solutions" className="inline-flex items-center gap-2 mt-8 font-sans-g text-[15px] font-semibold px-5 py-3 rounded-lg text-white" style={{ background: UI.blue }}>
                  See custom solutions <MoveRight className="w-4 h-4" strokeWidth={2} />
                </a>
              </motion.div>
            </Reveal>
          </div>
        </section>

        <CtaBand
          eyebrow="Get started"
          title="Ready to see one of these in action?"
          text="We'll walk you through the product that fits, on your own files, and talk through pricing and rollout."
          secondary={{ label: "Read the docs", href: "/resources" }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
