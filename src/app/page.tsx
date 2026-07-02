"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { MZ } from "@/lib/theme";
import { Reveal, fadeUp } from "@/components/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Magnetic from "@/components/Magnetic";
import HeroGlobe from "@/components/maze/HeroGlobe";
import PlatformShowcase from "@/components/maze/PlatformShowcase";
import SonarTabs from "@/components/maze/SonarTabs";

/* decorative geometric line-motif (from /public/Geometrics) - light sections only */
function Geo({ src, wrap, rotate = 0, drift = "a" }: { src: string; wrap: string; rotate?: number; drift?: "a" | "b" | "f" }) {
  const anim = drift === "f" ? "bx-card-float" : drift === "b" ? "sa-drift-b" : "sa-drift-a";
  return (
    <div aria-hidden className={`absolute pointer-events-none select-none ${anim} ${wrap}`}>
      <img src={`/Geometrics/${src}`} alt="" className="w-full h-full object-contain" style={{ transform: `rotate(${rotate}deg)` }} loading="lazy" />
    </div>
  );
}

const capabilities = [
  "Resume parsing", "Clause scoring", "Confidence scores", "Schema JSON", "Signed webhooks",
  "Batch processing", "Audit trails", "Zero retention", "OCR for scans", "Custom schemas",
  "Invoice matching", "Playbook checks",
];

const security = [
  { t: "Encrypted transmission", d: "Every request and document moves over TLS-encrypted connections, from your systems to ours and back." },
  { t: "Access control", d: "Assign roles and granular permissions so each teammate can view, manage, and collaborate on exactly the right projects." },
  { t: "Data-center security", d: "Infrastructure runs on hardened, continuously monitored cloud regions with redundancy built in for uptime and durability." },
  { t: "GDPR compliance", d: "We handle personal data to GDPR standards and give you the records, controls, and tooling to stay compliant too." },
  { t: "SSO", d: "Reduce risk by authenticating access to your account through single sign-on with your own identity provider." },
  { t: "Private workspaces", d: "Keep projects isolated in dedicated workspaces that only the members of your team you choose can collaborate on." },
];

const flow = [
  { n: "01", t: "Ingest anything", d: "PDFs, scans, exports, email attachments. Send them through the API or a watched folder. OCR handles the ones that were photographed on a phone.", meta: "PDF · DOCX · PNG · scans" },
  { n: "02", t: "Read and score", d: "Sonar pulls out the fields that matter and scores its own confidence on each one, so uncertainty gets surfaced for review instead of buried in the output.", meta: "Confidence on every field" },
  { n: "03", t: "Deliver where you work", d: "Schema-validated JSON lands in your ATS, CRM, or warehouse over a documented REST API and signed webhooks. No re-keying, no export step.", meta: "REST · webhooks · connectors" },
];

const useCases = [
  { k: "Healthcare staffing", tag: "Resumes · credentials · compliance", h: "Credential a clinician in seconds, not an afternoon.", d: "Read clinical resumes, licenses, and compliance files into structured records. Specialties, credentials, and expiry dates arrive ready for your ATS, each field scored so recruiters review only what's uncertain." },
  { k: "Legal & contracts", tag: "SOWs · clauses · playbooks", h: "Know the risk before the signature.", d: "Govern reads statements of work and agreements against your own playbook, surfacing auto-renewals, liability caps, and termination terms with a risk rating attached, so legal reviews the exposure, not the boilerplate." },
  { k: "Procurement & finance", tag: "Invoices · POs · reconciliation", h: "Reconcile spend without the manual pass.", d: "Match invoices to contracts and purchase orders, catch the line items that drift from what was agreed, and flag spend leakage as it happens rather than at quarter close." },
];

const btnDark = "inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-full";
const btnOutline = "inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-full transition-colors";

/* animated light-blue pixel field for the security band (deterministic → SSR-safe) */
const P_COLS = 52, P_ROWS = 22;
const PIX: { x: number; y: number; d: number }[] = (() => {
  const arr: { x: number; y: number; d: number }[] = [];
  for (let r = 0; r < P_ROWS; r++) for (let c = 0; c < P_COLS; c++) {
    if (Math.sin(r * 1.9 + c * 1.3) + Math.cos(c * 0.7 - r * 1.1) < 0.6) continue;
    arr.push({ x: c, y: r, d: Math.round(((c * 0.09 + r * 0.13) % 3) * 100) / 100 });
  }
  return arr;
})();
function AnimatedPixels() {
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${P_COLS} ${P_ROWS}`}>
      {PIX.map((p, i) => (
        <rect key={i} x={p.x + 0.22} y={p.y + 0.22} width="0.46" height="0.46" rx="0.1" fill="#9DB0EE" className="sa-twinkle" style={{ animationDelay: `${p.d}s` }} />
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <div id="top" style={{ background: MZ.bg, color: MZ.ink }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-xs" style={{ background: MZ.ink2 }}>Skip to content</a>

      <SiteNav />

      <main id="main">
        {/* ───────── hero → globe (one scroll-driven scene) ───────── */}
        <HeroGlobe />

        {/* ───────── product tabs ───────── */}
        <PlatformShowcase />

        {/* ───────── how it works (asymmetric narrative) ───────── */}
        <section className="relative px-5 sm:px-8 py-20 sm:py-28" style={{ background: MZ.bg }} aria-labelledby="how-h">
          <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-y-12 lg:gap-x-20">
            <div className="lg:sticky lg:top-28 self-start">
              <span className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: MZ.accent }}>How it works</span>
              <h2 id="how-h" className="mt-4 font-display font-light tracking-[-0.035em] leading-[1.0]" style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)", color: MZ.ink }}>
                From raw document to a decision your team can act on.
              </h2>
              <p className="mt-5 font-sans-g leading-relaxed max-w-[42ch]" style={{ fontSize: "1.05rem", color: MZ.sub }}>
                No templates to maintain, no extraction rules to hand-write. Three steps, and the data is sitting in the tools you already run.
              </p>
              <a href="/products" className="inline-flex items-center gap-1.5 mt-7 font-sans-g text-[15px] font-semibold group" style={{ color: MZ.accent }}>
                See the products <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
            </div>
            <Reveal>
              <div className="relative ml-2" style={{ borderLeft: `1px solid ${MZ.line2}` }}>
                {flow.map((s, i) => (
                  <motion.div key={s.n} variants={fadeUp} custom={i} className="relative pl-8 sm:pl-10 pb-12 last:pb-0">
                    <span className="absolute -left-[9px] top-1.5 w-[18px] h-[18px] rounded-full grid place-items-center" style={{ background: MZ.accent }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#fff" }} />
                    </span>
                    <div className="font-mono-g text-[12px] font-semibold tracking-wider" style={{ color: MZ.faint }}>{s.n}</div>
                    <h3 className="mt-1.5 font-display font-light tracking-[-0.02em] leading-[1.1]" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)", color: MZ.ink }}>{s.t}</h3>
                    <p className="mt-2.5 font-sans-g leading-relaxed max-w-[46ch]" style={{ fontSize: "1rem", color: MZ.sub }}>{s.d}</p>
                    <span className="inline-block mt-3.5 font-mono-g text-[12px] px-2.5 py-1 rounded-md" style={{ background: MZ.bg2, color: MZ.sub, border: `1px solid ${MZ.line}` }}>{s.meta}</span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── capabilities band (full-width) ───────── */}
        <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: "oklch(92.4% 0.012 95.1)" }} aria-labelledby="cap-h">
          <Geo src="Geometric-Line-14.svg" wrap="hidden sm:block top-10 right-[5%] w-20 h-20" rotate={6} drift="a" />
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <Reveal className="max-w-[900px]">
              <motion.h2 id="cap-h" variants={fadeUp} className="font-display font-light tracking-[-0.03em] leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 3.8vw, 3.1rem)", color: MZ.ink }}>
                With Blue-IQ, it all comes together. Teams ingest any document, extract what matters automatically, and deliver structured data that drives real decisions.
              </motion.h2>
            </Reveal>
          </div>
          <div className="mt-12 sm:mt-16 space-y-3 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)" }}>
            <div className="bx-marquee flex items-center gap-2.5">
              {[...capabilities, ...capabilities].map((c, i) => (
                <span key={i} className="shrink-0 font-sans-g text-[15px] font-medium px-4 py-2.5 rounded-xl" style={{ background: "#fff", color: MZ.ink, boxShadow: "0 6px 16px -10px rgba(20,18,10,0.28)" }}>{c}</span>
              ))}
            </div>
            <div className="bx-marquee bx-marquee-rev flex items-center gap-2.5">
              {[...capabilities.slice().reverse(), ...capabilities.slice().reverse()].map((c, i) => (
                <span key={i} className="shrink-0 font-sans-g text-[15px] font-medium px-4 py-2.5 rounded-xl" style={{ background: "#fff", color: MZ.ink, boxShadow: "0 6px 16px -10px rgba(20,18,10,0.28)" }}>{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Sonar engine (clickable capability tabs) ───────── */}
        <SonarTabs />

        {/* ───────── use cases (editorial rows) ───────── */}
        <section className="relative px-5 sm:px-8 py-20 sm:py-28" style={{ background: MZ.bg2 }} aria-labelledby="uc-h">
          <div className="max-w-[1240px] mx-auto">
            <Reveal className="max-w-[680px] mb-12 sm:mb-16">
              <motion.span variants={fadeUp} className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: MZ.accent }}>Where it works</motion.span>
              <motion.h2 id="uc-h" variants={fadeUp} custom={1} className="mt-4 font-display font-light tracking-[-0.035em] leading-[1.0]" style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)", color: MZ.ink }}>
                Built for the documents that run your business.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-5 font-sans-g leading-relaxed max-w-[52ch]" style={{ fontSize: "1.05rem", color: MZ.sub }}>
                The same engine, tuned to the paperwork of your industry. Here&apos;s where teams put it to work today.
              </motion.p>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} style={{ borderTop: `1px solid ${MZ.line2}` }}>
                {useCases.map((u) => (
                  <div key={u.k} className="grid lg:grid-cols-[0.85fr_1.15fr] gap-3 lg:gap-14 py-9 sm:py-11 group" style={{ borderBottom: `1px solid ${MZ.line2}` }}>
                    <div>
                      <div className="font-sans-g text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: MZ.accent }}>{u.k}</div>
                      <div className="mt-2.5 font-mono-g text-[12px]" style={{ color: MZ.faint }}>{u.tag}</div>
                    </div>
                    <div>
                      <h3 className="font-display font-light tracking-[-0.02em] leading-[1.12]" style={{ fontSize: "clamp(1.45rem, 2.6vw, 2.1rem)", color: MZ.ink }}>{u.h}</h3>
                      <p className="mt-3.5 font-sans-g leading-relaxed max-w-[56ch]" style={{ fontSize: "1.02rem", color: MZ.sub }}>{u.d}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </Reveal>
            <div className="mt-10">
              <a href="/solutions" className="inline-flex items-center gap-1.5 font-sans-g text-[15px] font-semibold group" style={{ color: MZ.accent }}>
                Explore solutions by industry <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
            </div>
          </div>
        </section>

        {/* ───────── trust & security ───────── */}
        <section className="px-5 sm:px-8 py-8 sm:py-12" aria-labelledby="sec-h">
          <div className="relative max-w-[1240px] mx-auto rounded-[2rem] px-6 sm:px-12 py-16 sm:py-20 overflow-hidden" style={{ background: "#FFFFFF", border: `1px solid ${MZ.line2}` }}>
            <AnimatedPixels />
            <Reveal className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-[600px]">
                <motion.h2 id="sec-h" variants={fadeUp} className="font-display font-light tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: MZ.ink }}>
                  Trust and security at every level
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="mt-5 font-sans-g leading-relaxed max-w-[50ch]" style={{ fontSize: "1.05rem", color: MZ.sub }}>
                  Your documents carry sensitive data: clinical records, signed contracts, financial detail. We treat them that way, from encryption in transit to workspace isolation and GDPR-grade handling.
                </motion.p>
              </div>
              <motion.a variants={fadeUp} custom={2} href="/contact" className="shrink-0 inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3 rounded-full" style={{ background: MZ.ink2, color: "#fff" }}>
                Contact sales <MoveRight className="w-4 h-4" strokeWidth={2} />
              </motion.a>
            </Reveal>
            <Reveal>
              <motion.div variants={fadeUp} className="relative mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {security.map((s) => (
                  <div key={s.t} className="rounded-2xl p-6" style={{ background: "#F2F5FD", border: "1px solid #E2E8F8" }}>
                    <span className="inline-flex items-center gap-2 font-sans-g text-[11px] font-semibold uppercase tracking-[0.09em] px-2.5 py-1.5 rounded-lg mb-4" style={{ background: "#E4EAFA", color: MZ.accent }}>
                      <span className="w-1.5 h-1.5 rounded-sm" style={{ background: MZ.accent }} /> {s.t}
                    </span>
                    <p className="font-sans-g text-[14px] leading-relaxed" style={{ color: MZ.sub }}>{s.d}</p>
                  </div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ───────── closing CTA ───────── */}
        <section className="relative px-5 sm:px-8 py-16 sm:py-24 text-center" aria-labelledby="cta-h">
          <Reveal className="max-w-[760px] mx-auto flex flex-col items-center">
            <motion.h2 id="cta-h" variants={fadeUp} className="font-display font-light tracking-[-0.035em] leading-[1.0]" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: MZ.ink }}>
              Put your documents to work
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-5 font-sans-g leading-relaxed max-w-[48ch]" style={{ fontSize: "1.1rem", color: MZ.sub }}>
              Tell us what your team is working with. We&apos;ll show you what Sonar can do with it, and what a product built around it would look like.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-9 flex flex-wrap justify-center gap-3">
              <Magnetic href="/contact" className={btnDark} style={{ background: MZ.accent, color: "#fff" }}>Talk to us <MoveRight className="w-4 h-4" strokeWidth={2} /></Magnetic>
              <a href="/products" className={btnOutline} style={{ border: `1px solid ${MZ.line2}`, color: MZ.ink, background: MZ.surface }}>See our products</a>
            </motion.div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
