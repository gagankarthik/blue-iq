"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck, Check, ArrowUpRight, Boxes, MoveRight } from "lucide-react";
import { UI, CARD } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import { ParsingVisual, GovernVisual } from "@/components/BrandVisuals";

const products = [
  {
    key: "parsinglab", name: "ParsingLab", tag: "Resume Parsing API", grade: "Healthcare-grade",
    href: "https://www.parsinglab.blue-iq.ai/", Icon: FileText,
    headline: "A resume parser that understands healthcare.",
    line: "Send it a PDF, DOCX, or scan and get back structured data: licences, credentials, travel history, and specialties, each with its own confidence score.",
    points: [
      "Licence numbers with state and compact status",
      "Credentials kept in the right order, like RN, BSN, CCRN",
      "More than 40 fields, every one scored for confidence",
      "Handles scans and phone photos, and keeps none of your files",
    ],
  },
  {
    key: "govern", name: "Govern", tag: "Contract Intelligence", grade: "SOC 2, HIPAA & GDPR",
    href: "https://govern.blue-iq.ai/", Icon: ShieldCheck,
    headline: "Bring contract chaos to clarity.",
    line: "Govern reads every clause in your SOWs, MSAs, NDAs, and DPAs, checks each one against your playbook, and flags what deviates before anyone signs.",
    points: [
      "Clause extraction across more than 13 contract types",
      "Every clause checked against your own playbook",
      "Amendment diffs that recalculate contract value",
      "A full audit trail on every upload, edit, and approval",
    ],
  },
];

export default function ProductsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: UI.bg, color: UI.ink }}>
      <SiteNav />
      <main>
        {/* hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-x-0 top-0 h-[420px] pointer-events-none"
            style={{ background: "radial-gradient(55% 80% at 80% 0%, rgba(44,73,214,0.10), transparent 60%)" }} />
          <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-16 sm:pb-20">
            <Reveal className="max-w-2xl">
              <motion.h1 variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: UI.ink }}>
                Products we&apos;ve built.
              </motion.h1>
              <motion.p variants={fadeUp} custom={1} className="mt-6 font-sans-g leading-relaxed" style={{ fontSize: "1.1rem", color: UI.sub }}>
                Two products are live today, each built on our Sonar engine and shaped around the documents its users work with. Below them is a third path: what we build when neither one fits.
              </motion.p>
            </Reveal>
          </div>
        </section>

        {/* products */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
          <div className="space-y-20 sm:space-y-28">
            {products.map((pr, i) => (
              <Reveal key={pr.key}>
                <motion.article variants={fadeUp} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center w-11 h-11 rounded-xl" style={{ background: UI.surface, border: `1px solid ${UI.line2}`, color: UI.blue, boxShadow: CARD }}><pr.Icon className="w-6 h-6" strokeWidth={1.6} /></span>
                      <div>
                        <div className="font-display text-[1.35rem] font-bold tracking-tight" style={{ color: UI.ink }}>{pr.name}</div>
                        <div className="font-sans-g text-[12.5px] font-medium" style={{ color: UI.blue2 }}>{pr.tag} · {pr.grade}</div>
                      </div>
                    </div>
                    <h2 className="mt-6 font-display font-bold tracking-[-0.02em] leading-[1.08]" style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.3rem)", color: UI.ink }}>{pr.headline}</h2>
                    <p className="mt-4 font-sans-g leading-relaxed max-w-[48ch]" style={{ fontSize: "1.02rem", color: UI.sub }}>{pr.line}</p>
                    <ul className="mt-6 space-y-3">
                      {pr.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 font-sans-g text-[0.96rem]" style={{ color: UI.ink }}>
                          <span className="grid place-items-center w-5 h-5 rounded-full mt-0.5 shrink-0 text-white" style={{ background: UI.blue }}><Check className="w-3 h-3" strokeWidth={2.5} /></span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <a href={pr.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 font-sans-g text-[15px] font-semibold px-5 py-3 rounded-lg text-white transition-transform hover:-translate-y-0.5" style={{ background: UI.blue }}>
                      Open {pr.name} <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                    </a>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    {pr.key === "parsinglab" ? <ParsingVisual /> : <GovernVisual />}
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* custom products */}
        <section className="py-20 sm:py-28" style={{ background: UI.bg2, borderTop: `1px solid ${UI.line}`, borderBottom: `1px solid ${UI.line}` }}>
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
            <Reveal>
              <span className="grid place-items-center w-14 h-14 rounded-2xl mb-6" style={{ background: UI.surface, border: `1px solid ${UI.line2}`, color: UI.blue, boxShadow: CARD }}>
                <Boxes className="w-7 h-7" strokeWidth={1.6} />
              </span>
              <motion.h2 variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.02]" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)", color: UI.ink }}>
                Not on this list yet? We build that too.
              </motion.h2>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp}>
                <p className="font-sans-g leading-relaxed" style={{ fontSize: "1.05rem", color: UI.sub }}>
                  ParsingLab and Govern are two products from a much longer list of things we&apos;ve shipped. A lot of our work happens under a client&apos;s own brand: a purpose-built product for a workflow no off-the-shelf tool covers.
                </p>
                <p className="mt-5 font-sans-g leading-relaxed" style={{ fontSize: "1.05rem", color: UI.sub }}>
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
          image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=70"
          imageAlt="Software engineers reviewing code on a large monitor"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
