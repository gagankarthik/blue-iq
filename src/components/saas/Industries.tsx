"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { EASE } from "@/components/saas/motion";
import {
  type BqIcon,
  IconNetwork,
  IconCampus,
  IconWorkforce,
  IconHealth,
  IconScale,
  IconReceipt,
  IconDocs,
  IconArrow,
} from "@/components/icons/BqIcons";

/* ────────────────────────────────────────────────────────────────
   Where it works — six sectors, one engine.

   The stock photographs under a paper shader are gone: a nurse, a lecture
   hall and a server room tell a buyer nothing they did not already know. The
   panel now shows what the engine reads in that sector and what comes back.
   Tabs on the left (a real tablist, arrow-key navigable), detail on the right.
   ──────────────────────────────────────────────────────────────── */

type Case = { id: string; k: string; Icon: BqIcon; reads: string[]; h: string; d: string; out: string[] };

const CASES: Case[] = [
  {
    id: "it",
    k: "IT sector",
    Icon: IconNetwork,
    reads: ["Master service agreements", "Statements of work", "Vendor invoices", "Software entitlements"],
    h: "Vendor contract and licence management, automated.",
    d: "Renewal dates, liability caps and licence counts extracted from every MSA and SOW.",
    out: ["Renewal calendar", "Licence counts", "Rate drift"],
  },
  {
    id: "education",
    k: "Education",
    Icon: IconCampus,
    reads: ["Admissions applications", "Transcripts", "Supplier agreements", "Grant paperwork"],
    h: "Admissions and transcript processing without data entry.",
    d: "Applications and transcripts read into records your student information system can use.",
    out: ["Student records", "Course histories", "Supplier terms"],
  },
  {
    id: "workforce",
    k: "Workforce",
    Icon: IconWorkforce,
    reads: ["Resumes", "Certifications", "Right-to-work documents", "Compliance files"],
    h: "Resume parsing and candidate onboarding in minutes.",
    d: "Skills, certifications and expiry dates extracted straight into your ATS.",
    out: ["Candidate profiles", "Credential expiries", "ATS-ready records"],
  },
  {
    id: "healthcare",
    k: "Healthcare staffing",
    Icon: IconHealth,
    reads: ["Clinical resumes", "Nursing licences", "Immunisation records", "Compliance files"],
    h: "Faster clinician credentialing.",
    d: "Licence numbers, issuing boards and expiry dates extracted and scored. Smudged stamps are flagged.",
    out: ["Licence checks", "Expiry tracking", "Compliance status"],
  },
  {
    id: "legal",
    k: "Legal and contracts",
    Icon: IconScale,
    reads: ["Agreements", "Amendments", "NDAs", "Your playbook"],
    h: "AI contract review before signature.",
    d: "Every deviation from your playbook comes back with a risk rating.",
    out: ["Clause risk ratings", "Playbook deviations", "Obligation dates"],
  },
  {
    id: "procurement",
    k: "Procurement and finance",
    Icon: IconReceipt,
    reads: ["Invoices", "Purchase orders", "Contracts", "Receipts"],
    h: "Automated invoice reconciliation.",
    d: "Invoices matched to contracts and POs, with overbilling flagged as it is billed.",
    out: ["Three-way match", "Leakage alerts", "Entitlement checks"],
  },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const c = CASES[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + CASES.length) % CASES.length;
    setActive(next);
    document.getElementById(`ind-tab-${CASES[next].id}`)?.focus();
  };

  return (
    <section id="industries" className="relative px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20" style={{ background: SA.bg }} aria-labelledby="ind-h">
      <div className="max-w-[1240px] mx-auto">
        <SectionHead
          id="ind-h"
          title="Document AI for your industry"
          sub="Choose your sector to see what Sonar reads and what you get back."
        />

        <Reveal className="mt-10 sm:mt-12 grid lg:grid-cols-[300px_minmax(0,1fr)] gap-5">
          <div role="tablist" aria-label="Industries" aria-orientation="vertical" onKeyDown={onKey} className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-5 px-5 lg:mx-0 lg:px-0 pb-1 snap-x">
            {CASES.map((x, i) => {
              const on = i === active;
              return (
                <button
                  key={x.id}
                  id={`ind-tab-${x.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="ind-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="relative shrink-0 snap-start flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors"
                  style={{ color: on ? SA.ink : SA.sub }}
                >
                  {on && (
                    <motion.span
                      layoutId="ind-pill"
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: SA.bg2, border: `1px solid ${SA.line2}` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span
                    className="relative grid place-items-center w-10 h-10 rounded-xl transition-colors"
                    style={{ background: on ? SA.accent : SA.accentSoft, color: on ? "#fff" : SA.accent, ["--duo-o" as string]: on ? "0.25" : "0.14" }}
                  >
                    <x.Icon size={22} />
                  </span>
                  <span className="relative font-sans-g text-[15px] font-medium whitespace-nowrap">{x.k}</span>
                </button>
              );
            })}
          </div>

          <div
            id="ind-panel"
            role="tabpanel"
            aria-labelledby={`ind-tab-${c.id}`}
            className="relative overflow-hidden rounded-[24px] p-7 sm:p-10 lg:p-12 min-h-[400px]"
            style={{ background: SA.bg2, border: `1px solid ${SA.line}` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={c.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl" style={{ background: SA.surface, border: `1px solid ${SA.line}`, color: SA.accent }}>
                    <c.Icon size={26} />
                  </span>
                  <p className="font-sans-g text-[14.5px] font-semibold" style={{ color: SA.accent }}>
                    {c.k}
                  </p>
                </div>
                <h3
                  className="mt-6 font-display font-semibold leading-[1.12]"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)", letterSpacing: "-0.03em", color: SA.ink, maxWidth: "26ch" }}
                >
                  {c.h}
                </h3>
                <p className="mt-5 font-sans-g text-[16px] leading-[1.7]" style={{ color: SA.sub, maxWidth: "58ch" }}>
                  {c.d}
                </p>

                <div className="mt-9 grid sm:grid-cols-2 gap-8">
                  <div>
                    <p className="font-sans-g text-[13px] font-semibold" style={{ color: SA.ink }}>
                      What it reads
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {c.reads.map((r) => (
                        <li key={r} className="flex items-center gap-2.5 font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
                          <IconDocs size={18} className="shrink-0" style={{ color: SA.accent }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-sans-g text-[13px] font-semibold" style={{ color: SA.ink }}>
                      What comes back
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {c.out.map((r) => (
                        <li key={r} className="flex items-center gap-2.5 font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
                          <span className="w-[18px] h-[18px] shrink-0 grid place-items-center rounded-full" style={{ background: SA.accent }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="m5 12.5 4.5 4.5L19 7.5" />
                            </svg>
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a href={`/solutions#${c.id}`} className="group mt-10 inline-flex items-center gap-1.5 font-sans-g text-[15px] font-semibold" style={{ color: SA.accent }}>
                  Explore {c.k}
                  <IconArrow size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
