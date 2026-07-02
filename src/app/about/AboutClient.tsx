"use client";

import { motion } from "framer-motion";
import { ScanLine, Braces, BadgeCheck, ShieldCheck, Target, Lightbulb, Handshake, MoveRight } from "lucide-react";
import { UI, DEEP } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CtaBand from "@/components/CtaBand";
import { SonarVisual } from "@/components/BrandVisuals";

const sonarPoints = [
  { Icon: ScanLine, t: "Reads difficult files", d: "Clean PDFs, messy scans, and phone photos all come out the same structured way." },
  { Icon: Braces, t: "Returns clean data", d: "Schema-validated output your systems can use right away, with no reformatting." },
  { Icon: BadgeCheck, t: "Scores its own work", d: "Every value carries a confidence score, so people review only what needs it." },
];

const values = [
  { Icon: ShieldCheck, h: "Honest over impressive", b: "If a value isn't in the document, we leave it empty. We'd rather flag uncertainty than fake confidence." },
  { Icon: Target, h: "Built on real documents", b: "We test against the messy files our clients actually have, not a clean demo set." },
  { Icon: Lightbulb, h: "Depth over breadth", b: "We'd rather do a few things with real domain knowledge than a hundred things generically." },
  { Icon: Handshake, h: "Software you can depend on", b: "We stay on after launch. A product isn't done when it ships, it's done when it's reliable." },
];

export default function AboutClient() {
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
                We&apos;re a document-intelligence company.
              </motion.h1>
              <motion.p variants={fadeUp} custom={1} className="mt-6 font-sans-g leading-relaxed" style={{ fontSize: "1.1rem", color: UI.sub }}>
                We started Blue-IQ because the documents that run real businesses, from clinical resumes to enterprise contracts, were still being read by hand or by tools that quietly guessed when they got stuck.
              </motion.p>
              <motion.p variants={fadeUp} custom={2} className="mt-5 font-sans-g leading-relaxed" style={{ fontSize: "1.05rem", color: UI.sub }}>
                So we built Sonar: an engine that reads with real domain knowledge, and the honesty to say what it isn&apos;t sure of. It now powers two of our own products and a growing set of custom platforms we build for clients.
              </motion.p>
            </Reveal>
          </div>
        </section>

        {/* Sonar */}
        <section id="sonar" className="scroll-mt-20" style={{ background: DEEP, color: "#fff" }}>
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-y-12 lg:gap-x-16 items-center">
              <Reveal>
                <motion.h2 variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", color: "#fff" }}>
                  Sonar is the engine behind everything we build.
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="mt-6 font-sans-g leading-relaxed max-w-[46ch]" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.74)" }}>
                  It takes in raw documents and data, pulls out the fields or clauses that matter, and returns them as structured output with a confidence score attached to every value.
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
              </Reveal>
              <Reveal><motion.div variants={fadeUp} custom={1}><SonarVisual /></motion.div></Reveal>
            </div>
          </div>
        </section>

        {/* values */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <Reveal className="max-w-2xl mb-14">
            <motion.h2 variants={fadeUp} className="font-display font-bold tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: UI.ink }}>
              How we work.
            </motion.h2>
          </Reveal>
          <Reveal>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {values.map((v) => (
                <div key={v.h}>
                  <span className="grid place-items-center w-12 h-12 rounded-xl mb-5" style={{ background: UI.soft, color: UI.blue }}><v.Icon className="w-6 h-6" strokeWidth={1.6} /></span>
                  <h3 className="font-display text-[1.1rem] font-bold tracking-tight" style={{ color: UI.ink }}>{v.h}</h3>
                  <p className="mt-2.5 font-sans-g text-[0.9rem] leading-relaxed" style={{ color: UI.sub }}>{v.b}</p>
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
          image="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=70"
          imageAlt="A small engineering team working together"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
