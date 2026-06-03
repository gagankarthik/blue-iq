"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { C, SHADOW, SHADOW_LG } from "@/lib/theme";
import { ease, fadeUp, Reveal, SpotlightCard } from "@/components/motion";
import { MeshGradient, GlassOrb, GlassRing, GRAD } from "@/components/visuals";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Magnetic from "@/components/Magnetic";
import { Arrow, IconHire, IconGovern, IconSpend, IconSonar, IconShield, IconSpark, IconCode, IconLayers, IconLock, IconTarget, IconBank } from "@/components/icons";

const BTN = `linear-gradient(135deg, ${C.blue}, ${GRAD.royal})`;

const products = [
  { id: "hire", idx: "01", name: "HIRE", kind: "Hiring", href: "/hire", external: false, Icon: IconHire, hue: GRAD.royal,
    line: "Parse, verify, and score every résumé — a shortlist you can trust before the first hour is billed.", span: "lg:col-span-2" },
  { id: "govern", idx: "02", name: "GOVERN", kind: "Compliance", href: "https://govern.blue-iq.ai/", external: true, Icon: IconGovern, hue: GRAD.indigo,
    line: "Read every clause and surface contract risk while there's still time to fix it.", span: "lg:col-span-2" },
  { id: "spend", idx: "03", name: "SPEND", kind: "Spend", href: "/spend", external: false, Icon: IconSpend, hue: GRAD.sky,
    line: "Match every invoice to its contract and catch leakage long before quarter close.", span: "lg:col-span-2" },
];

const steps = [
  { n: "01", Icon: IconSonar, h: "Read", b: "Sonar takes in résumés, statements of work, and invoices the moment they arrive — no forms, no manual tagging." },
  { n: "02", Icon: IconShield, h: "Score", b: "Every item is checked against your playbook and scored for risk, with the source cited for each call." },
  { n: "03", Icon: IconSpark, h: "Act", b: "Your team reviews the handful of exceptions that matter, not the whole stack. Decisions land in hours." },
];

const features = [
  { Icon: IconSonar, h: "Source-cited answers", b: "Every score and flag links back to the exact résumé line, clause, or invoice it came from." },
  { Icon: IconCode, h: "Works with your stack", b: "Native connectors for major ATS, CRM, ERP, and procurement systems, plus a documented API." },
  { Icon: IconTarget, h: "Scored to your playbook", b: "Blue-IQ grades against your own standards and thresholds — not a generic template." },
  { Icon: IconLayers, h: "Audit-ready by default", b: "Full version history and clause-level change tracking on every record." },
  { Icon: IconLock, h: "Enterprise security", b: "SOC 2 Type II controls across all processing and storage. Your data never trains shared models." },
  { Icon: IconBank, h: "Built for oversight", b: "Reporting and audit trails designed for finance, legal, and public-sector requirements." },
];

const faqs = [
  { q: "How is Blue-IQ different from a VMS or ATS?", a: "Those systems track workflow. Blue-IQ reads it — applying analysis, scoring, and pre-emptive risk flags across the whole talent and vendor lifecycle." },
  { q: "What is the 10-dimension SOW audit?", a: "GOVERN scores every statement of work across ten risk dimensions — clarity, enforceability, pricing structure, IP ownership, termination rights, SLA definition, and more — and returns a single risk score with the detail behind it." },
  { q: "How long does implementation take?", a: "Most enterprise rollouts finish in four to six weeks, integrations included, with a dedicated onboarding team." },
  { q: "Is there a free trial?", a: "GOVERN is free to try — upload a SOW and Sonar extracts every clause and scores it against a default playbook in seconds, no credit card required. For HIRE and SPEND, we set up a scoped pilot." },
  { q: "Do you support government and public-sector teams?", a: "Yes. Blue-IQ works with public-sector agencies on IT staffing, vendor compliance, and SOW management, with audit trails and reporting built for oversight requirements." },
  { q: "Is Blue-IQ SOC 2 compliant?", a: "Yes — SOC 2 Type II, with enterprise controls across all data processing and storage." },
  { q: "Does it connect to the tools we already run?", a: "Blue-IQ integrates with major CRM, ATS, ERP, and procurement systems through native connectors and a documented API." },
];

const faqJsonLd = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

/* animated SVG flow — raw documents in → Sonar reads & scores → decisions out */
function PlatformFlow() {
  const reduce = useReducedMotion();
  const inputs = [
    { y: 70, label: "Résumés" },
    { y: 175, label: "Contracts / SOWs" },
    { y: 280, label: "Invoices" },
  ];
  const outputs = [
    { y: 70, name: "HIRE", res: "Scored shortlist", hue: GRAD.royal },
    { y: 175, name: "GOVERN", res: "Risk flagged", hue: GRAD.indigo },
    { y: 280, name: "SPEND", res: "Reconciled", hue: GRAD.sky },
  ];
  const inPaths = ["M178 70 C 300 70 340 175 450 175", "M178 175 L 450 175", "M178 280 C 300 280 340 175 450 175"];
  const outPaths = ["M550 175 C 660 175 700 70 822 70", "M550 175 L 822 175", "M550 175 C 660 175 700 280 822 280"];

  return (
    <div className="rounded-[1.8rem] p-5 sm:p-8 overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW }}>
      <svg viewBox="0 0 1000 350" className="w-full h-auto" role="img"
        aria-label="Résumés, contracts, and invoices flow into the Sonar core, which returns a scored shortlist, flagged contract risk, and reconciled spend.">
        <defs>
          <linearGradient id="coreG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.blue} /><stop offset="1" stopColor={GRAD.royal} /></linearGradient>
          {inPaths.map((d, i) => <path key={`ip${i}`} id={`ip${i}`} d={d} />)}
          {outPaths.map((d, i) => <path key={`op${i}`} id={`op${i}`} d={d} />)}
        </defs>

        {[...inPaths, ...outPaths].map((d, i) => <path key={i} d={d} fill="none" stroke={C.line2} strokeWidth="1.5" />)}

        {!reduce && inPaths.map((_, i) => (
          <circle key={`ipd${i}`} r="4.5" fill={GRAD.cyan}>
            <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.6}s`}><mpath href={`#ip${i}`} /></animateMotion>
          </circle>
        ))}
        {!reduce && outPaths.map((_, i) => (
          <circle key={`opd${i}`} r="4.5" fill={outputs[i].hue}>
            <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${1.3 + i * 0.6}s`}><mpath href={`#op${i}`} /></animateMotion>
          </circle>
        ))}

        {inputs.map((n, i) => (
          <g key={i}>
            <rect x="40" y={n.y - 22} width="138" height="44" rx="13" fill={C.bg} stroke={C.line2} />
            <text x="109" y={n.y + 5} textAnchor="middle" fontFamily="var(--font-geist-sans)" fontSize="14" fill={C.sub}>{n.label}</text>
          </g>
        ))}

        {!reduce && (
          <circle cx="500" cy="175" r="50" fill="none" stroke={C.blue}>
            <animate attributeName="r" values="50;82" dur="3s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.35;0" dur="3s" repeatCount="indefinite" />
          </circle>
        )}
        <circle cx="500" cy="175" r="50" fill="url(#coreG)" />
        <text x="500" y="171" textAnchor="middle" fontFamily="var(--font-display)" fontSize="17" fontWeight="700" fill="#fff">Sonar</text>
        <text x="500" y="189" textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="9" fill="rgba(255,255,255,0.7)" letterSpacing="1.5">CORE</text>

        {outputs.map((n, i) => (
          <g key={i}>
            <rect x="822" y={n.y - 24} width="148" height="48" rx="13" fill={C.surface} stroke={n.hue} strokeOpacity="0.55" />
            <text x="840" y={n.y - 3} fontFamily="var(--font-display)" fontSize="14" fontWeight="700" fill={C.ink}>{n.name}</text>
            <text x="840" y={n.y + 14} fontFamily="var(--font-geist-sans)" fontSize="11.5" fill={C.sub}>{n.res}</text>
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-1 font-mono-g text-[10.5px] uppercase tracking-[0.14em]" style={{ color: C.faint }}>
        <span>Raw documents in</span><span aria-hidden>→</span><span style={{ color: C.blue2 }}>Sonar reads &amp; scores</span><span aria-hidden>→</span><span>Decisions out</span>
      </div>
    </div>
  );
}

/* FAQ accordion — hairline rows */
function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {faqs.map((f, i) => {
        const o = open === i;
        return (
          <div key={i} style={{ borderTop: `1px solid ${C.line2}` }}>
            <button onClick={() => setOpen(o ? null : i)} className="w-full flex items-center gap-4 text-left py-5" aria-expanded={o}>
              <span className="font-mono-g text-[11px] mt-0.5 shrink-0" style={{ color: o ? C.blue2 : C.faint }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[16px] sm:text-[18px] font-semibold flex-1 transition-colors" style={{ color: o ? C.ink : C.sub }}>{f.q}</h3>
              <motion.span animate={{ rotate: o ? 45 : 0 }} transition={{ duration: 0.25, ease }} className="grid place-items-center w-6 h-6 shrink-0" style={{ color: C.ink }}>
                <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {o && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
                  <p className="pl-9 pb-6 -mt-1 font-sans-g text-[14.5px] leading-relaxed max-w-[64ch]" style={{ color: C.sub }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div id="top" className="overflow-x-clip" style={{ background: C.bg, color: C.ink }}>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-geist-sans), system-ui, sans-serif; background: ${C.bg}; }
        ::selection { background: ${C.blue}; color: #fff; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.line2}; border-radius: 6px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.faint}; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${C.blue2}; outline-offset: 2px; border-radius: 6px; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-xs" style={{ background: C.ink }}>Skip to content</a>

      <SiteNav />

      <main id="main">
        {/* ───────────── hero ───────────── */}
        <section className="relative overflow-hidden">
          <MeshGradient
            className="[mask-image:radial-gradient(80%_70%_at_50%_30%,#000,transparent)]"
            blobs={[
              { c: GRAD.indigo, x: "30%", y: "26%", s: 520, o: 0.42 },
              { c: GRAD.royal, x: "62%", y: "20%", s: 460, o: 0.4 },
              { c: GRAD.cyan, x: "74%", y: "48%", s: 420, o: 0.32 },
              { c: GRAD.coral, x: "24%", y: "52%", s: 380, o: 0.3 },
              { c: GRAD.pink, x: "52%", y: "62%", s: 360, o: 0.26 },
            ]}
          />
          {/* floating glossy 3D shapes — only where side gutters exist, so they never overlap text */}
          <GlassOrb size={100} hue={GRAD.royal} className="hidden xl:block absolute left-[3%] top-[34%]" delay={0.2} />
          <GlassRing size={116} hue={GRAD.cyan} className="hidden xl:block absolute right-[3%] top-[26%]" delay={0.6} />
          <GlassOrb size={60} hue={GRAD.coral} className="hidden xl:block absolute right-[7%] top-[62%]" delay={1.1} />
          <GlassOrb size={44} hue={GRAD.indigo} className="hidden xl:block absolute left-[7%] top-[64%]" delay={0.8} />

          <div className="relative max-w-[1000px] mx-auto px-5 sm:px-8 pt-40 sm:pt-48 pb-24 sm:pb-32 text-center">
            <Reveal>
              <motion.h1 variants={fadeUp} custom={0} className="font-display font-bold tracking-[-0.04em] leading-[0.93] text-balance" style={{ fontSize: "clamp(48px, 8.4vw, 110px)", color: C.ink }}>
                Three products.<br />One intelligence core.
              </motion.h1>

              <motion.p variants={fadeUp} custom={1} className="mt-7 mx-auto font-sans-g text-[18px] sm:text-[21px] leading-relaxed max-w-[44ch]" style={{ color: C.sub }}>
                Most platforms just file your hires, contracts, and invoices. Blue-IQ reads them — scoring candidates, flagging contract risk, and catching spend leakage as it happens.
              </motion.p>

              <motion.div variants={fadeUp} custom={2} className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-medium text-white px-8 py-4 rounded-full" style={{ background: BTN, boxShadow: `0 18px 38px -16px ${C.blue}aa` }}>
                  Request a demo <Arrow />
                </Magnetic>
                <a href="#platform" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-medium px-7 py-4 rounded-full transition-colors hover:bg-white"
                  style={{ color: C.ink, background: "rgba(255,255,255,0.6)", border: `1px solid ${C.line2}` }}>
                  Explore the platform <Arrow className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              {/* product pills — quick routes into each product */}
              <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
                {products.map((p) => (
                  <a key={p.id} href={p.href} target={p.external ? "_blank" : undefined} rel={p.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                    style={{ background: "rgba(255,255,255,0.65)", border: `1px solid ${C.line2}` }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: p.hue }} />
                    <span className="font-sans-g text-[13px] font-medium" style={{ color: C.ink }}>Blue-IQ {p.name}</span>
                    <span className="transition-transform group-hover:translate-x-0.5" style={{ color: C.faint }}>{p.external ? <span aria-hidden className="text-[11px]">↗</span> : <Arrow className="w-3 h-3" />}</span>
                  </a>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── platform bento ───────────── */}
        <section id="platform" className="scroll-mt-24 py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-3xl mb-12">
              <motion.span variants={fadeUp} className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: C.blue2 }}>The platform</motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.02]" style={{ fontSize: "clamp(32px,4.6vw,58px)", color: C.ink }}>
                Three products, one core.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-5 font-sans-g text-[16px] leading-relaxed max-w-[54ch]" style={{ color: C.sub }}>
                Each product stands on its own. Together, they read against one source of truth — so a hire, a contract, and an invoice are never reviewed in isolation.
              </motion.p>
            </Reveal>

            {/* animated flow: documents → Sonar → decisions */}
            <Reveal className="mb-5">
              <motion.div variants={fadeUp}><PlatformFlow /></motion.div>
            </Reveal>

            <Reveal>
              <motion.div variants={fadeUp} className="grid lg:grid-cols-6 gap-4 sm:gap-5">
                {/* product cards */}
                {products.map((p) => (
                  <a key={p.id} href={p.href} target={p.external ? "_blank" : undefined} rel={p.external ? "noopener noreferrer" : undefined} className={`group block ${p.span}`}>
                    <SpotlightCard color={`${p.hue}1f`} className="relative h-full min-h-[260px] flex flex-col rounded-[1.6rem] p-7 sm:p-8 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5"
                      style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW }}>
                      <div className="grid place-items-center w-12 h-12 rounded-2xl text-white shrink-0" style={{ background: `linear-gradient(140deg, ${p.hue}, ${p.hue}cc)`, boxShadow: `0 12px 24px -10px ${p.hue}aa` }}>
                        <p.Icon className="w-6 h-6" />
                      </div>
                      <div className="mt-auto pt-10">
                        <div className="flex items-center gap-2 font-mono-g text-[10.5px] uppercase tracking-[0.16em] mb-2" style={{ color: C.faint }}>
                          <span style={{ color: p.hue }}>{p.idx}</span> {p.kind}
                        </div>
                        <h3 className="font-display font-bold tracking-[-0.02em] leading-none" style={{ fontSize: "clamp(26px,2.8vw,36px)", color: C.ink }}>Blue-IQ {p.name}</h3>
                        <p className="mt-3 font-sans-g text-[14.5px] leading-relaxed max-w-[38ch]" style={{ color: C.sub }}>{p.line}</p>
                        <span className="inline-flex items-center gap-1.5 mt-5 font-sans-g text-[14px] font-medium transition-transform group-hover:translate-x-1" style={{ color: p.hue }}>
                          {p.external ? <>Open {p.name} <span aria-hidden>↗</span></> : <>Explore {p.name} <Arrow className="w-3.5 h-3.5" /></>}
                        </span>
                      </div>
                    </SpotlightCard>
                  </a>
                ))}

                {/* Sonar — wide gradient feature card */}
                <a href="https://govern.blue-iq.ai/" target="_blank" rel="noopener noreferrer" className="group block lg:col-span-6">
                  <div className="relative overflow-hidden rounded-[1.8rem] p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center gap-8 transition-transform duration-300 group-hover:-translate-y-1.5"
                    style={{ background: `linear-gradient(120deg, ${C.blue}, ${GRAD.royal} 55%, ${GRAD.indigo})`, boxShadow: SHADOW_LG }}>
                    <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
                      backgroundImage: `radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)`, backgroundSize: "22px 22px",
                      maskImage: "radial-gradient(70% 100% at 100% 50%, #000, transparent)", WebkitMaskImage: "radial-gradient(70% 100% at 100% 50%, #000, transparent)",
                    }} />
                    <GlassOrb size={140} hue={GRAD.cyan} className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2" />
                    <div className="relative flex-1">
                      <span className="inline-flex items-center gap-2 font-mono-g text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <IconSonar className="w-4 h-4 text-white" /> Intelligence core
                      </span>
                      <h3 className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.0] text-white" style={{ fontSize: "clamp(30px,4vw,52px)" }}>
                        Meet Sonar.
                      </h3>
                      <p className="mt-4 font-sans-g text-[16px] sm:text-[17px] leading-relaxed max-w-[52ch]" style={{ color: "rgba(255,255,255,0.78)" }}>
                        One AI reads across HIRE, GOVERN, and SPEND. Ask about any candidate, clause, or invoice — Sonar answers in plain language and shows you exactly where it found the answer.
                      </p>
                      <span className="inline-flex items-center gap-2 mt-7 font-sans-g text-[15px] font-medium px-6 py-3 rounded-full text-white transition-transform group-hover:translate-x-1" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)" }}>
                        See Sonar in action <span aria-hidden>↗</span>
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── how it works ───────────── */}
        <section className="py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-2xl mb-14">
              <motion.span variants={fadeUp} className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: C.blue2 }}>How it works</motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.02]" style={{ fontSize: "clamp(32px,4.6vw,58px)", color: C.ink }}>
                Read. Score. Act.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-5 font-sans-g text-[16px] leading-relaxed max-w-[50ch]" style={{ color: C.sub }}>
                From intake to decision, one engine does the heavy reading — so your team spends its time on judgment, not data entry.
              </motion.p>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-5">
                {steps.map((s) => (
                  <SpotlightCard key={s.n} className="relative rounded-[1.5rem] p-8 overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                    <div className="flex items-center justify-between mb-8">
                      <span className="grid place-items-center w-12 h-12 rounded-2xl" style={{ background: C.bg, border: `1px solid ${C.line2}`, color: C.blue }}><s.Icon className="w-6 h-6" /></span>
                      <span className="font-display font-bold tabular-nums leading-none" style={{ fontSize: "44px", color: C.line2 }}>{s.n}</span>
                    </div>
                    <h3 className="font-display text-[22px] font-bold tracking-tight" style={{ color: C.ink }}>{s.h}</h3>
                    <p className="mt-2.5 font-sans-g text-[14.5px] leading-relaxed" style={{ color: C.sub }}>{s.b}</p>
                  </SpotlightCard>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── features ───────────── */}
        <section className="py-20 sm:py-28" style={{ background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-2xl mb-14">
              <motion.span variants={fadeUp} className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: C.blue2 }}>Why Blue-IQ</motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.02]" style={{ fontSize: "clamp(32px,4.6vw,58px)", color: C.ink }}>
                Everything enterprise teams ask for.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-5 font-sans-g text-[16px] leading-relaxed max-w-[50ch]" style={{ color: C.sub }}>
                The reasons procurement, legal, finance, and IT sign off — and keep Blue-IQ in the stack.
              </motion.p>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                {features.map((f) => (
                  <div key={f.h} className="flex flex-col">
                    <span className="grid place-items-center w-12 h-12 rounded-2xl mb-5" style={{ background: C.bg, border: `1px solid ${C.line2}`, color: C.blue }}><f.Icon className="w-6 h-6" /></span>
                    <h3 className="font-display text-[19px] font-bold tracking-tight" style={{ color: C.ink }}>{f.h}</h3>
                    <p className="mt-2.5 font-sans-g text-[14.5px] leading-relaxed max-w-[40ch]" style={{ color: C.sub }}>{f.b}</p>
                  </div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── faq ───────────── */}
        <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.8fr_2fr] gap-12 lg:gap-20">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <motion.span variants={fadeUp} className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: C.blue2 }}>FAQ</motion.span>
                <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.04]" style={{ fontSize: "clamp(30px,3.6vw,46px)", color: C.ink }}>
                  Questions, answered.
                </motion.h2>
                <motion.a variants={fadeUp} custom={2} href="/contact" className="inline-flex items-center gap-2 mt-6 font-sans-g text-[14px] font-medium" style={{ color: C.blue2 }}>
                  Still have questions? Talk to us <Arrow className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </Reveal>
            <Reveal><motion.div variants={fadeUp}><FAQAccordion /></motion.div></Reveal>
          </div>
        </section>

        {/* ───────────── closing CTA ───────────── */}
        <section className="px-5 sm:px-8 pb-24 sm:pb-32 pt-4">
          <Reveal className="max-w-[1240px] mx-auto">
            <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[2.2rem] px-8 sm:px-16 py-20 sm:py-28 text-center"
              style={{ background: `linear-gradient(125deg, ${C.blue}, ${GRAD.royal} 50%, ${GRAD.indigo})`, boxShadow: SHADOW_LG }}>
              <MeshGradient blur={60} className="opacity-60 [mask-image:radial-gradient(70%_90%_at_50%_50%,#000,transparent)]"
                blobs={[
                  { c: GRAD.cyan, x: "20%", y: "70%", s: 360, o: 0.5 },
                  { c: GRAD.violet, x: "82%", y: "30%", s: 340, o: 0.5 },
                  { c: GRAD.pink, x: "60%", y: "80%", s: 300, o: 0.4 },
                ]} />
              <GlassOrb size={72} hue={GRAD.cyan} className="hidden lg:block absolute left-[7%] top-[22%]" />
              <GlassRing size={90} hue={GRAD.pink} className="hidden lg:block absolute right-[7%] bottom-[16%]" delay={0.5} />
              <div className="relative">
                <h2 className="font-display font-bold tracking-[-0.035em] leading-[0.98] text-white mx-auto max-w-[16ch]" style={{ fontSize: "clamp(36px,5.6vw,72px)" }}>
                  Move from workflow to intelligence.
                </h2>
                <p className="mt-6 mx-auto font-sans-g text-[16px] sm:text-[18px] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.72)" }}>
                  See Blue-IQ read your own hires, contracts, and spend — on a walkthrough scoped to your team.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Magnetic href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-medium px-8 py-4 rounded-full" style={{ background: "#fff", color: C.blue }}>
                    Request a demo <Arrow />
                  </Magnetic>
                  <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[15px] font-medium text-white px-7 py-4 rounded-full transition-colors hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
                    Talk to an expert
                  </a>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
