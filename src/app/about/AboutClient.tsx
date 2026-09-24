"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { PageHero, HeroButton, WRAP } from "@/components/page/kit";
import { CpuArchitecture } from "@/components/saas/CpuArchitecture";
import { type BqIcon, IconWorkforce, IconGovern, IconReceipt, IconScore, IconFlag, IconDocs, IconCustom, IconShield } from "@/components/icons/BqIcons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /about — who we are, in three beats.

   1. The problem: three documents every business re-types.
   2. Meet Sonar (the nav links here as /about#sonar): the drawing, its two
      rules, and the four facts, counting up as they arrive.
   3. How we work: three commitments.
   No founding myth, no invented customers or headcount.
   ──────────────────────────────────────────────────────────────── */

const PAIN: { Icon: BqIcon; t: string; d: string }[] = [
  { Icon: IconWorkforce, t: "A new hire", d: "Resumes, licences and references, re-typed into your ATS." },
  { Icon: IconGovern, t: "A contract", d: "Obligations buried in clauses nobody has time to read twice." },
  { Icon: IconReceipt, t: "An invoice", d: "Numbers already on the page, keyed in again by hand." },
];

const RULES: { Icon: BqIcon; t: string; d: string }[] = [
  { Icon: IconScore, t: "A score on every field", d: "Not one number per file. One per value." },
  { Icon: IconFlag, t: "A flag, never a guess", d: "If Sonar cannot read it, it says so." },
];

const WORK: { Icon: BqIcon; t: string; d: string }[] = [
  { Icon: IconDocs, t: "We start from your files", d: "Real documents, not a demo set." },
  { Icon: IconCustom, t: "We build what fits", d: "A product, an edition, or something new." },
  { Icon: IconShield, t: "We treat data as sensitive", d: "Aligned to SOC 2, HIPAA and GDPR." },
];

function Count({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1100);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export default function AboutClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />
      <main>
        <PageHero label="About Blue-IQ" title="We build the AI that reads business documents" lede="Blue-IQ is a document AI company. Our products turn the files your business runs on into data you can trust, and every one runs on Sonar.">
          <HeroButton href="#sonar">Meet Sonar</HeroButton>
          <HeroButton href="/contact" ghost>
            Talk to us
          </HeroButton>
        </PageHero>

        {/* the problem */}
        <section className="py-16 sm:py-24" style={{ background: SA.bg }}>
          <div className={WRAP}>
            <SectionHead title="Every business runs on documents someone re-types" sub="We started Blue-IQ to end that manual work." />
            <Reveal as="ul" className="mt-10 sm:mt-12 grid md:grid-cols-3 gap-5">
              {PAIN.map((p, k) => (
                <li key={p.t} className="group rounded-[24px] p-7 sm:p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(10,18,48,0.35)]" style={{ background: k === 1 ? SA.navy : SA.bg2, border: `1px solid ${k === 1 ? SA.navy : SA.line}` }}>
                  <span className="grid place-items-center w-14 h-14 rounded-2xl" style={{ background: k === 1 ? "rgba(106,163,255,0.16)" : SA.surface, color: k === 1 ? "#8EC2FF" : SA.accent, border: k === 1 ? "none" : `1px solid ${SA.line}` }}>
                    <p.Icon size={28} />
                  </span>
                  <h3 className="mt-8 font-display font-semibold text-[1.4rem] tracking-[-0.025em]" style={{ color: k === 1 ? "#fff" : SA.ink }}>
                    {p.t}
                  </h3>
                  <p className="mt-2 font-sans-g text-[15.5px] leading-[1.55]" style={{ color: k === 1 ? "rgba(255,255,255,0.74)" : SA.sub }}>
                    {p.d}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Sonar */}
        <section id="sonar" className="py-16 sm:py-24 scroll-mt-20" style={{ background: SA.bg2 }}>
          <div className={`${WRAP} grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
            <Reveal className="w-full aspect-[2/1]">
              <CpuArchitecture className="text-[#1D5BF0]/35" text="SONAR" />
            </Reveal>
            <div>
              <SectionHead align="stack" title="Meet Sonar" sub="Our document AI. It reads like a person, scores every field, and flags what it cannot read." />
              <Reveal as="ul" className="mt-8 space-y-3">
                {RULES.map((r) => (
                  <li key={r.t} className="flex items-center gap-4 rounded-2xl p-5" style={{ background: SA.surface, border: `1px solid ${SA.line}` }}>
                    <r.Icon size={26} className="shrink-0" style={{ color: SA.accent }} />
                    <span>
                      <span className="block font-sans-g text-[16px] font-semibold" style={{ color: SA.ink }}>
                        {r.t}
                      </span>
                      <span className="block font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
                        {r.d}
                      </span>
                    </span>
                  </li>
                ))}
              </Reveal>
              <Reveal as="ul" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
                {[
                  { v: <Count to={200} />, l: "documents per API call" },
                  { v: <Count to={1} prefix="<" suffix="s" />, l: "median read time" },
                  { v: "Every", l: "field scored" },
                  { v: <Count to={0} />, l: "fields guessed" },
                ].map((s) => (
                  <li key={s.l} className="pt-4" style={{ borderTop: `1px solid ${SA.line2}` }}>
                    <span className="block font-display font-semibold text-[2rem] leading-none tracking-[-0.035em]" style={{ color: SA.ink }}>
                      {s.v}
                    </span>
                    <span className="block mt-2 font-sans-g text-[14px]" style={{ color: SA.sub }}>
                      {s.l}
                    </span>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* how we work */}
        <section className="py-16 sm:py-24" style={{ background: SA.bg }}>
          <div className={WRAP}>
            <SectionHead title="How we work" />
            <Reveal as="ul" className="mt-10 sm:mt-12 grid md:grid-cols-3 gap-px rounded-[24px] overflow-hidden" style={{ background: SA.line, border: `1px solid ${SA.line}` }}>
              {WORK.map((w) => (
                <li key={w.t} className="p-8 bg-white transition-colors hover:bg-[#F6F8FC]">
                  <w.Icon size={28} style={{ color: SA.accent }} />
                  <h3 className="mt-6 font-display font-semibold text-[1.2rem] tracking-[-0.02em]" style={{ color: SA.ink }}>
                    {w.t}
                  </h3>
                  <p className="mt-1.5 font-sans-g text-[15px]" style={{ color: SA.sub }}>
                    {w.d}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
