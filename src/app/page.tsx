"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid, Boxes, Radar, FileText, ShieldCheck, ScanLine, Braces, BadgeCheck,
  ArrowUpRight, MoveRight, Scale, Landmark, Target, Webhook, Database, Lock,
} from "lucide-react";
import { UI, DEEP, CARD } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Magnetic from "@/components/Magnetic";
import CtaBand from "@/components/CtaBand";
import { SonarVisual } from "@/components/BrandVisuals";
import HeroCardField from "@/components/HeroCardField";

const pillars = [
  { Icon: LayoutGrid, t: "Products we've shipped", d: "Own products, live in production and used every day, from resume parsing to contract review.", href: "/products", cta: "See our products" },
  { Icon: Boxes, t: "Custom development", d: "When no off-the-shelf tool fits, we design, build, and ship a product around your workflow.", href: "/solutions", cta: "Explore solutions" },
  { Icon: Radar, t: "The Sonar engine", d: "Every product runs on Sonar, our AI core for turning messy documents and data into clean, scored output.", href: "/about#sonar", cta: "Meet Sonar" },
];

const productPreview = [
  { Icon: FileText, name: "ParsingLab", tag: "Resume Parsing API", d: "Healthcare-grade parsing that turns any resume into structured, confidence-scored JSON.", href: "https://www.parsinglab.blue-iq.ai/", external: true },
  { Icon: ShieldCheck, name: "Govern", tag: "Contract Intelligence", d: "Reads and scores every clause in a contract against your playbook before anyone signs.", href: "https://govern.blue-iq.ai/", external: true },
  { Icon: Boxes, name: "Custom products", tag: "Built for you", d: "Bespoke document and data products, engineered and delivered by our team.", href: "/solutions", external: false },
];

const sonarPoints = [
  { Icon: ScanLine, t: "Reads difficult files", d: "Clean PDFs, messy scans, and phone photos all come out the same structured way." },
  { Icon: Braces, t: "Returns clean data", d: "Schema-validated output your systems can use right away, with no reformatting." },
  { Icon: BadgeCheck, t: "Scores its own work", d: "Every value carries a confidence score, so people review only what needs it." },
];

const why = [
  { Icon: Target, h: "Domain-deep AI", b: "Sonar reads with real domain knowledge, so it understands the details a generic model flattens." },
  { Icon: ShieldCheck, h: "Honest by design", b: "Missing values stay empty and uncertain ones are flagged. It never fills a gap with a guess." },
  { Icon: LayoutGrid, h: "Products, not prototypes", b: "We ship production software that teams depend on daily, not demos that fall over at scale." },
  { Icon: Webhook, h: "Built to integrate", b: "A documented API, batch processing, and signed webhooks make everything easy to build on." },
  { Icon: Database, h: "Fits your stack", b: "Native connectors drop our software into the systems your teams already run." },
  { Icon: Lock, h: "Enterprise security", b: "SOC 2, HIPAA, and GDPR aligned, with zero document retention and no training on your data." },
];

const industries = [
  { Icon: FileText, t: "Healthcare staffing", d: "Parse clinician resumes at agency scale, with licences and credentials intact." },
  { Icon: Scale, t: "Legal", d: "Pull and check clauses across every agreement a team handles." },
  { Icon: Landmark, t: "Procurement & finance", d: "Read SOWs and invoices against the contract before money goes out." },
  { Icon: ShieldCheck, t: "Compliance & risk", d: "Confidence scores and audit trails built for the way oversight works." },
];

export default function Home() {
  return (
    <div id="top" className="overflow-x-clip" style={{ background: UI.bg, color: UI.ink }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-xs" style={{ background: UI.blue }}>Skip to content</a>

      <SiteNav />

      <main id="main">
        {/* ───────────── hero ───────────── */}
        <section className="relative overflow-hidden" aria-labelledby="hero-h" style={{ minHeight: "min(860px, 92vh)" }}>
          <HeroCardField />

          <div className="relative max-w-[760px] mx-auto px-5 sm:px-8 pt-40 sm:pt-52 pb-24 sm:pb-32 flex flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <motion.h1 id="hero-h" variants={fadeUp} className="font-display font-bold tracking-[-0.02em] leading-[1.08]"
                style={{ fontSize: "clamp(2rem, 3.4vw, 2.9rem)", color: UI.ink }}>
                Enterprise software, <span style={{ color: UI.blue }}>engineered end to end.</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={1} className="mt-6 font-sans-g leading-relaxed max-w-[46ch]" style={{ fontSize: "1.05rem", color: UI.sub }}>
                We build our own products and custom platforms for demanding teams, all powered by Sonar, our AI engine for turning complex documents and data into something you can act on.
              </motion.p>

              <motion.div variants={fadeUp} custom={2} className="mt-8">
                <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold text-white px-7 py-3.5 rounded-lg" style={{ background: UI.blue, boxShadow: `0 16px 34px -16px ${UI.blue}` }}>
                  Talk to us <MoveRight className="w-4 h-4" strokeWidth={2} />
                </Magnetic>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── what we do ───────────── */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-24" aria-labelledby="do-h">
          <Reveal className="max-w-2xl mb-14">
            <motion.h2 id="do-h" variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: UI.ink }}>
              One engine. Three ways we put it to work.
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-5 font-sans-g leading-relaxed" style={{ fontSize: "1.05rem", color: UI.sub }}>
              Whether you use a product off the shelf or hand us a problem no tool solves yet, the same engineering and the same engine sit behind it.
            </motion.p>
          </Reveal>
          <Reveal>
            <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-5">
              {pillars.map((p) => (
                <a key={p.t} href={p.href} className="group rounded-2xl p-7 flex flex-col transition-transform hover:-translate-y-1" style={{ background: UI.surface, border: `1px solid ${UI.line}`, boxShadow: CARD }}>
                  <span className="grid place-items-center w-12 h-12 rounded-xl mb-6" style={{ background: UI.soft, color: UI.blue }}><p.Icon className="w-6 h-6" strokeWidth={1.6} /></span>
                  <h3 className="font-display text-[1.25rem] font-bold tracking-tight" style={{ color: UI.ink }}>{p.t}</h3>
                  <p className="mt-2.5 font-sans-g text-[0.94rem] leading-relaxed flex-1" style={{ color: UI.sub }}>{p.d}</p>
                  <span className="inline-flex items-center gap-1.5 mt-6 font-sans-g text-[14px] font-semibold transition-transform group-hover:translate-x-1" style={{ color: UI.blue2 }}>
                    {p.cta} <MoveRight className="w-4 h-4" strokeWidth={2} />
                  </span>
                </a>
              ))}
            </motion.div>
          </Reveal>
        </section>

        {/* ───────────── products preview ───────────── */}
        <section className="py-20 sm:py-24" style={{ background: UI.bg2, borderTop: `1px solid ${UI.line}`, borderBottom: `1px solid ${UI.line}` }} aria-labelledby="prod-h">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <motion.h2 id="prod-h" variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: UI.ink }}>
                  Products we&apos;ve built.
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="mt-5 font-sans-g leading-relaxed" style={{ fontSize: "1.05rem", color: UI.sub }}>
                  Two of our own products are live today, and we build more for clients under their own brand.
                </motion.p>
              </div>
              <motion.a variants={fadeUp} custom={2} href="/products" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold shrink-0" style={{ color: UI.blue2 }}>
                All products <MoveRight className="w-4 h-4" strokeWidth={2} />
              </motion.a>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-5">
                {productPreview.map((p) => (
                  <a key={p.name} href={p.href} target={p.external ? "_blank" : undefined} rel={p.external ? "noopener noreferrer" : undefined}
                    className="group rounded-2xl p-7 flex flex-col transition-transform hover:-translate-y-1" style={{ background: UI.surface, border: `1px solid ${UI.line}`, boxShadow: CARD }}>
                    <div className="flex items-center justify-between mb-6">
                      <span className="grid place-items-center w-12 h-12 rounded-xl" style={{ background: UI.soft, color: UI.blue }}><p.Icon className="w-6 h-6" strokeWidth={1.6} /></span>
                      <span className="transition-transform group-hover:translate-x-0.5" style={{ color: UI.faint }}>{p.external ? <ArrowUpRight className="w-4 h-4" strokeWidth={2} /> : <MoveRight className="w-4 h-4" strokeWidth={2} />}</span>
                    </div>
                    <h3 className="font-display text-[1.3rem] font-bold tracking-tight" style={{ color: UI.ink }}>{p.name}</h3>
                    <div className="font-sans-g text-[12.5px] font-medium mt-0.5" style={{ color: UI.blue2 }}>{p.tag}</div>
                    <p className="mt-3 font-sans-g text-[0.94rem] leading-relaxed flex-1" style={{ color: UI.sub }}>{p.d}</p>
                  </a>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── Sonar strip (dark) ───────────── */}
        <section id="sonar" className="scroll-mt-20" style={{ background: DEEP, color: "#fff" }} aria-labelledby="son-h">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-y-12 lg:gap-x-16 items-center">
              <Reveal>
                <motion.h2 id="son-h" variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", color: "#fff" }}>
                  Every product runs on Sonar.
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="mt-6 font-sans-g leading-relaxed max-w-[46ch]" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.74)" }}>
                  Sonar is the engine that does the reading. It takes in raw files, pulls out the fields and clauses that matter, and tells you how confident it is in each one, rather than filling gaps with a guess.
                </motion.p>
                <div className="mt-9 space-y-5">
                  {sonarPoints.map((s, i) => (
                    <motion.div key={s.t} variants={fadeUp} custom={2 + i} className="flex items-start gap-4">
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
                <motion.a variants={fadeUp} custom={5} href="/about#sonar" className="inline-flex items-center gap-2 mt-9 font-sans-g text-[15px] font-semibold px-5 py-3 rounded-lg" style={{ background: "#fff", color: UI.blue }}>
                  How Sonar works <MoveRight className="w-4 h-4" strokeWidth={2} />
                </motion.a>
              </Reveal>
              <Reveal><motion.div variants={fadeUp} custom={1}><SonarVisual /></motion.div></Reveal>
            </div>
          </div>
        </section>

        {/* ───────────── why ───────────── */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-28" aria-labelledby="why-h">
          <Reveal className="max-w-2xl mb-14">
            <motion.h2 id="why-h" variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: UI.ink }}>
              What makes Blue-IQ different.
            </motion.h2>
          </Reveal>
          <Reveal>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-11">
              {why.map((f) => (
                <div key={f.h}>
                  <span className="grid place-items-center w-12 h-12 rounded-xl mb-5" style={{ background: UI.soft, color: UI.blue }}><f.Icon className="w-6 h-6" strokeWidth={1.6} /></span>
                  <h3 className="font-display text-[1.15rem] font-bold tracking-tight" style={{ color: UI.ink }}>{f.h}</h3>
                  <p className="mt-2.5 font-sans-g text-[0.92rem] leading-relaxed max-w-[40ch]" style={{ color: UI.sub }}>{f.b}</p>
                </div>
              ))}
            </motion.div>
          </Reveal>
        </section>

        {/* ───────────── industries ───────────── */}
        <section className="py-20 sm:py-24" style={{ background: UI.surface, borderTop: `1px solid ${UI.line}`, borderBottom: `1px solid ${UI.line}` }} aria-labelledby="ind-h">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-2xl mb-12">
              <motion.h2 id="ind-h" variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: UI.ink }}>
                Built for teams buried in documents.
              </motion.h2>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${UI.line2}`, borderLeft: `1px solid ${UI.line2}` }}>
                {industries.map((it) => (
                  <div key={it.t} className="p-7" style={{ borderRight: `1px solid ${UI.line2}`, borderBottom: `1px solid ${UI.line2}` }}>
                    <span className="grid place-items-center w-11 h-11 rounded-xl mb-6" style={{ background: UI.soft, color: UI.blue }}><it.Icon className="w-5 h-5" strokeWidth={1.6} /></span>
                    <h3 className="font-display text-[1.1rem] font-bold tracking-tight" style={{ color: UI.ink }}>{it.t}</h3>
                    <p className="mt-2 font-sans-g text-[0.9rem] leading-relaxed" style={{ color: UI.sub }}>{it.d}</p>
                  </div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        <CtaBand
          title="Have a document problem worth solving?"
          text="Tell us what your team is working with. We'll show you what Sonar can do with it, and what a product built around it would look like."
          secondary={{ label: "See our products", href: "/products" }}
          image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=70"
          imageAlt="A team collaborating in a modern office"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
