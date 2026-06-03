"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { C, SHADOW, SHADOW_LG } from "@/lib/theme";
import { fadeUp, Reveal, SpotlightCard } from "@/components/motion";
import { MeshGradient, GlassOrb, GlassRing, GRAD } from "@/components/visuals";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Magnetic from "@/components/Magnetic";
import {
  Arrow, IconHire, IconGovern, IconSpend, IconSonar,
  IconDoc, IconShield, IconChart, IconCode, IconLayers, IconTarget,
} from "@/components/icons";

type Cap = { Icon: ComponentType<{ className?: string }>; h: string; b: string };
type Step = { n: string; h: string; b: string };
type Config = {
  name: string; kind: string; hue: string; hue2: string; Icon: ComponentType<{ className?: string }>;
  tagline: string; sub: string; cta: { label: string; href: string; external?: boolean };
  caps: Cap[]; flow: Step[];
};

const CONFIGS: Record<string, Config> = {
  hire: {
    name: "HIRE", kind: "Hiring", hue: GRAD.royal, hue2: GRAD.indigo, Icon: IconHire,
    tagline: "Your next shortlist, scored in hours.",
    sub: "Sonar parses every résumé, verifies credentials, and scores candidates against the role — so the right person is confirmed before a single hour is billed.",
    cta: { label: "Request a demo", href: "/contact" },
    caps: [
      { Icon: IconDoc, h: "AI résumé parsing", b: "Skills, history, and credentials extracted from any format the moment a résumé lands." },
      { Icon: IconShield, h: "Credential verification", b: "Certifications and claims checked automatically, with every source attached." },
      { Icon: IconChart, h: "Candidate scoring", b: "Each candidate ranked against the role so your team reviews the top matches first." },
      { Icon: IconCode, h: "CRM / ATS sync", b: "Native connectors keep your existing pipeline in step — no double entry." },
    ],
    flow: [
      { n: "01", h: "Upload", b: "Drop a role and a stack of résumés. No tagging, no templates." },
      { n: "02", h: "Parse & verify", b: "Sonar reads each résumé, extracts skills, and checks credentials in seconds." },
      { n: "03", h: "Shortlist", b: "Scored candidates ranked against the role, ready for your team to review." },
    ],
  },
  spend: {
    name: "SPEND", kind: "Spend", hue: GRAD.sky, hue2: GRAD.cyan, Icon: IconSpend,
    tagline: "See exactly where your vendor spend goes.",
    sub: "Sonar reconciles every invoice against the original SOW, flags rate inconsistencies, and surfaces leakage before it becomes a write-off — not at quarter close.",
    cta: { label: "Request a demo", href: "/contact" },
    caps: [
      { Icon: IconLayers, h: "Invoice-to-SOW reconciliation", b: "Every invoice line matched against the contract it was billed under." },
      { Icon: IconChart, h: "Rate benchmarking", b: "Billed rates checked for consistency across vendors and engagements." },
      { Icon: IconShield, h: "Leakage alerts", b: "Overspend and rate drift surface the moment they appear, not at close." },
      { Icon: IconTarget, h: "Vendor performance scoring", b: "Track delivery against contract terms and forecast spend with confidence." },
    ],
    flow: [
      { n: "01", h: "Connect", b: "Link your invoices and statements of work through native connectors." },
      { n: "02", h: "Reconcile", b: "Sonar matches every line item to the contract it belongs to." },
      { n: "03", h: "Flag", b: "Overspend, duplicate billing, and rate drift surface before quarter close." },
    ],
  },
};

const others = [
  { id: "hire", name: "HIRE", href: "/hire", external: false, Icon: IconHire, line: "Scored shortlists, before work begins." },
  { id: "govern", name: "GOVERN", href: "https://govern.blue-iq.ai/", external: true, Icon: IconGovern, line: "Clause-level audit on every SOW." },
  { id: "spend", name: "SPEND", href: "/spend", external: false, Icon: IconSpend, line: "Reconcile every invoice to its SOW." },
];

export default function ProductPage({ id }: { id: keyof typeof CONFIGS }) {
  const cfg = CONFIGS[id];
  const BTN = `linear-gradient(135deg, ${cfg.hue}, ${cfg.hue2})`;

  return (
    <div className="overflow-x-clip" style={{ background: C.bg, color: C.ink }}>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        ::selection { background: ${cfg.hue}; color: #fff; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${cfg.hue}; outline-offset: 2px; border-radius: 6px; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>
      <SiteNav />

      <main>
        {/* hero */}
        <section className="relative overflow-hidden">
          <MeshGradient className="[mask-image:radial-gradient(90%_70%_at_60%_20%,#000,transparent)]"
            blobs={[
              { c: cfg.hue, x: "70%", y: "22%", s: 480, o: 0.4 },
              { c: cfg.hue2, x: "85%", y: "44%", s: 420, o: 0.34 },
              { c: GRAD.pink, x: "55%", y: "12%", s: 320, o: 0.22 },
            ]} />

          <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-20 sm:pb-24">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              <div className="lg:col-span-6">
                <Reveal>
                  <motion.a variants={fadeUp} href="/#platform" className="inline-flex items-center gap-1.5 font-mono-g text-[11px] uppercase tracking-[0.16em] mb-7" style={{ color: C.faint }}>
                    <span className="rotate-180"><Arrow className="w-3.5 h-3.5" /></span> The platform
                  </motion.a>
                  <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3 mb-5">
                    <span className="grid place-items-center w-12 h-12 rounded-2xl text-white" style={{ background: BTN, boxShadow: `0 14px 28px -10px ${cfg.hue}aa` }}><cfg.Icon className="w-6 h-6" /></span>
                    <span className="font-display text-[22px] font-bold tracking-tight">Blue-IQ {cfg.name}</span>
                    <span className="font-mono-g text-[10.5px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full" style={{ color: cfg.hue, border: `1px solid ${C.line2}` }}>{cfg.kind}</span>
                  </motion.div>
                  <motion.h1 variants={fadeUp} custom={2} className="font-display font-bold tracking-[-0.035em] leading-[0.98] text-balance" style={{ fontSize: "clamp(40px,5.6vw,72px)", color: C.ink }}>
                    {cfg.tagline}
                  </motion.h1>
                  <motion.p variants={fadeUp} custom={3} className="mt-6 font-sans-g text-[17px] sm:text-[18px] leading-relaxed max-w-[50ch]" style={{ color: C.sub }}>
                    {cfg.sub}
                  </motion.p>
                  <motion.div variants={fadeUp} custom={4} className="mt-9 flex flex-wrap items-center gap-3">
                    <Magnetic href={cfg.cta.href} className="inline-flex items-center gap-2 font-sans-g text-[15px] font-medium text-white px-7 py-4 rounded-full" style={{ background: BTN, boxShadow: `0 16px 34px -16px ${cfg.hue}` }}>
                      {cfg.cta.label} <Arrow />
                    </Magnetic>
                    <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-medium px-5 py-4" style={{ color: C.ink }}>
                      Talk to us <Arrow className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                </Reveal>
              </div>

              {/* hero visual */}
              <div className="lg:col-span-6">
                <Reveal>
                  <motion.div variants={fadeUp} className="relative rounded-[2rem] overflow-hidden aspect-[4/3] grid place-items-center" style={{ background: BTN, boxShadow: SHADOW_LG }}>
                    <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: "40px 40px", maskImage: "radial-gradient(80% 80% at 30% 30%, #000, transparent)", WebkitMaskImage: "radial-gradient(80% 80% at 30% 30%, #000, transparent)",
                    }} />
                    <cfg.Icon className="w-40 h-40 text-white opacity-95" />
                    <GlassOrb size={96} hue={GRAD.cyan} className="absolute right-8 bottom-8" />
                    <GlassRing size={84} hue="#ffffff" className="absolute left-8 top-8" delay={0.4} />
                  </motion.div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* capabilities */}
        <section className="py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-2xl mb-12">
              <motion.span variants={fadeUp} className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: cfg.hue }}>What it does</motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.04]" style={{ fontSize: "clamp(30px,4vw,50px)", color: C.ink }}>
                Built to do the reading for you.
              </motion.h2>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {cfg.caps.map((c) => (
                  <SpotlightCard key={c.h} color={`${cfg.hue}1c`} className="rounded-[1.4rem] p-7 sm:p-8 flex gap-5" style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW }}>
                    <span className="grid place-items-center w-12 h-12 rounded-2xl shrink-0" style={{ background: C.bg, border: `1px solid ${C.line2}`, color: cfg.hue }}><c.Icon className="w-6 h-6" /></span>
                    <div>
                      <h3 className="font-display text-[19px] font-bold tracking-tight" style={{ color: C.ink }}>{c.h}</h3>
                      <p className="mt-2 font-sans-g text-[14.5px] leading-relaxed" style={{ color: C.sub }}>{c.b}</p>
                    </div>
                  </SpotlightCard>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* flow */}
        <section className="py-20 sm:py-28" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-2xl mb-14">
              <motion.span variants={fadeUp} className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: cfg.hue }}>How it works</motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.04]" style={{ fontSize: "clamp(30px,4vw,50px)", color: C.ink }}>
                Three steps, end to end.
              </motion.h2>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-5">
                {cfg.flow.map((s) => (
                  <div key={s.n} className="relative rounded-[1.4rem] p-8" style={{ background: C.bg, border: `1px solid ${C.line2}` }}>
                    <span className="font-display font-bold tabular-nums leading-none" style={{ fontSize: "44px", color: cfg.hue, opacity: 0.25 }}>{s.n}</span>
                    <h3 className="mt-5 font-display text-[21px] font-bold tracking-tight" style={{ color: C.ink }}>{s.h}</h3>
                    <p className="mt-2.5 font-sans-g text-[14.5px] leading-relaxed" style={{ color: C.sub }}>{s.b}</p>
                  </div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* part of the platform */}
        <section className="py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal className="flex items-center gap-3 mb-10">
              <span style={{ color: cfg.hue }}><IconSonar className="w-5 h-5" /></span>
              <motion.h2 variants={fadeUp} className="font-display text-[20px] font-bold tracking-tight" style={{ color: C.ink }}>Part of one platform.</motion.h2>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} className="grid sm:grid-cols-3 gap-4">
                {others.filter((o) => o.id !== id).map((o) => (
                  <a key={o.id} href={o.href} target={o.external ? "_blank" : undefined} rel={o.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-[1.3rem] p-6 transition-transform duration-300 hover:-translate-y-1" style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW }}>
                    <span className="grid place-items-center w-11 h-11 rounded-xl shrink-0" style={{ background: C.bg, border: `1px solid ${C.line2}` }}><o.Icon className="w-6 h-6" /></span>
                    <div className="min-w-0">
                      <div className="font-display text-[16px] font-bold tracking-tight" style={{ color: C.ink }}>Blue-IQ {o.name}</div>
                      <div className="font-sans-g text-[12.5px] truncate" style={{ color: C.sub }}>{o.line}</div>
                    </div>
                    <span className="ml-auto transition-transform group-hover:translate-x-1" style={{ color: C.faint }}>{o.external ? <span aria-hidden>↗</span> : <Arrow className="w-4 h-4" />}</span>
                  </a>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 sm:px-8 pb-24 sm:pb-32">
          <Reveal className="max-w-[1240px] mx-auto">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[2rem] px-8 sm:px-16 py-20 text-center" style={{ background: `linear-gradient(125deg, ${cfg.hue}, ${cfg.hue2})`, boxShadow: SHADOW_LG }}>
              <GlassOrb size={70} hue="#ffffff" className="hidden lg:block absolute left-[8%] top-[24%]" />
              <GlassRing size={84} hue={GRAD.cyan} className="hidden lg:block absolute right-[8%] bottom-[18%]" delay={0.4} />
              <h2 className="relative font-display font-bold tracking-[-0.035em] leading-[1.0] text-white mx-auto max-w-[18ch]" style={{ fontSize: "clamp(32px,4.6vw,58px)" }}>
                See Blue-IQ {cfg.name} on your own work.
              </h2>
              <div className="relative mt-9 flex flex-wrap justify-center gap-3">
                <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-medium px-7 py-4 rounded-full" style={{ background: "#fff", color: cfg.hue }}>
                  Request a demo <Arrow />
                </Magnetic>
                <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-medium text-white px-7 py-4 rounded-full transition-colors hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
                  Talk to an expert
                </a>
              </div>
            </motion.div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
