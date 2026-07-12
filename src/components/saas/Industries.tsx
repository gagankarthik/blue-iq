"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Stethoscope, Scale, Receipt } from "lucide-react";
import { SA, DK } from "@/lib/theme";
import { SectionHead } from "@/components/saas/parts";
import PaperImage from "@/components/saas/PaperImage";

/* ────────────────────────────────────────────────────────────────
   Where it works — hover-expand panels.

   The interaction is lifted from vengenceui's staggered-grid: three panels
   in a row, one open wide, the others collapsed to an icon and a name set on
   its side. Hover or tap to open one. What is NOT lifted is the 21-tile image
   grid it sat inside — that needs 21 images we do not have, ships hardcoded
   GitHub/Slack/Twitter tiles when they are missing, and scales itself 1.5x at
   z-index 1000, which would put it straight over the nav.

   Rebuilt on framer-motion rather than ported: the original runs GSAP +
   ScrollTrigger + imagesloaded, and a second animation runtime for one
   section is a bad trade.

   The grow is a CSS transition on flex-grow, not a framer animation. It is a
   layout property either way — three nodes is fine, and CSS keeps it off the
   main thread's animation loop. flex-grow (not width) so the same code gives
   a row on desktop and a stacked accordion on a phone with no media query.

   `image` is optional and currently unset. With one, the panel is a
   photograph under a scrim. Without, it is the deep ink panel — which is a
   real design, not a placeholder, so the section stands up today and only
   gets better when the stills land.
   ──────────────────────────────────────────────────────────────── */

/* Each photograph was chosen by looking at it, and several were thrown out for
   being the cliché rather than the subject: a gavel (Govern reads contracts,
   it does not litigate), a handshake, a piggy bank. What is left is the actual
   work — the clinicians who get credentialed, the sheer volume of text a
   playbook is checked against, the pile of forms someone has to reconcile. */
type Case = {
  k: string;
  Icon: typeof Scale;
  reads: string;
  h: string;
  d: string;
  image: string;
  seed: number;
};

const U = "https://images.unsplash.com/photo-";
const Q = "?w=1400&q=75&auto=format&fit=crop";

const cases: Case[] = [
  {
    k: "Healthcare staffing",
    Icon: Stethoscope,
    reads: "Resumes · licences · compliance files",
    h: "Credential a clinician in seconds, not an afternoon.",
    d: "Clinical resumes, licences, and compliance files become structured records — specialties, credentials, and expiry dates, ready for your ATS. Each field is scored, so recruiters open only the ones the engine was unsure of.",
    image: `${U}1579684385127-1ef15d508118${Q}`,
    seed: 5.8,
  },
  {
    k: "Legal & contracts",
    Icon: Scale,
    reads: "SOWs · agreements · playbooks",
    h: "Know the risk before the signature.",
    d: "Agreements are read against your own playbook, and whatever deviates comes back with a risk rating attached: the auto-renewal, the liability cap, the termination term. Legal reviews the exposure, not the boilerplate.",
    image: `${U}1568667256549-094345857637${Q}`,
    seed: 19.4,
  },
  {
    k: "Procurement & finance",
    Icon: Receipt,
    reads: "Invoices · POs · reconciliation",
    h: "Reconcile spend without the manual pass.",
    d: "Match invoices to contracts and purchase orders, catch the line items that drift from what was agreed, and flag spend leakage as it happens rather than at quarter close.",
    image: `${U}1554224155-6726b3ff858f${Q}`,
    seed: 33.1,
  },
];

const EASE = "cubic-bezier(0.25, 1, 0.5, 1)";

function Panel({ c, on, open }: { c: Case; on: boolean; open: () => void }) {
  const reduce = useReducedMotion();

  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      aria-label={c.k}
      onMouseEnter={open}
      onFocus={open}
      onClick={open}
      className="group relative overflow-hidden rounded-[20px] sm:rounded-[24px] text-left min-w-0 min-h-0"
      style={{
        flexBasis: 0,
        flexGrow: on ? 3.4 : 1,
        transition: reduce ? "none" : `flex-grow 700ms ${EASE}`,
        background: DK.bg,
      }}
    >
      {/* the photograph, creased by the paper shader. It sinks back when the
          panel is closed so the open one is the only thing lit — the image is
          doing the same job the type colour was, one layer down. */}
      <motion.span
        aria-hidden
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: on ? 1 : 0.42 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <PaperImage src={c.image} seed={c.seed} />
      </motion.span>

      {/* the scrim. White type over a photograph is unreadable without one, and
          it has to be heaviest at the foot, which is where the copy sits. */}
      <motion.span
        aria-hidden
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: on ? 1 : 0.86 }}
        transition={{ duration: reduce ? 0 : 0.7 }}
        style={{
          background:
            "linear-gradient(to top, rgba(7,8,11,0.94) 0%, rgba(7,8,11,0.74) 38%, rgba(7,8,11,0.42) 70%, rgba(7,8,11,0.34) 100%)",
        }}
      />

      {/* light gathers in the open panel and drains from the closed ones */}
      <motion.span
        aria-hidden
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: `radial-gradient(120% 90% at 50% 100%, ${DK.accent}2E, transparent 62%)`,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-[20px] sm:rounded-[24px] pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${on ? DK.borderLift : DK.border}` }}
      />

      {/* ── collapsed: the name turned on its side, so a 90px-wide panel still
             says what it is. Sideways on desktop only; a stacked phone panel
             is wide and short, so it just stays horizontal. ── */}
      <motion.span
        aria-hidden
        className="absolute inset-0 flex sm:flex-col items-center justify-center gap-3 px-4"
        initial={false}
        animate={{ opacity: on ? 0 : 1 }}
        transition={{ duration: reduce ? 0 : 0.35 }}
        style={{ pointerEvents: on ? "none" : "auto" }}
      >
        <c.Icon className="w-6 h-6 shrink-0 transition-colors duration-300" strokeWidth={1.4} style={{ color: DK.faint }} />
        <span
          className="font-display text-[15px] tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 group-hover:text-white"
          style={{ color: DK.sub, writingMode: "horizontal-tb" }}
        >
          <span className="hidden sm:inline [writing-mode:vertical-rl] [text-orientation:mixed]">{c.k}</span>
          <span className="sm:hidden">{c.k}</span>
        </span>
      </motion.span>

      {/* ── open: the argument ── */}
      <motion.span
        className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10"
        initial={false}
        animate={{ opacity: on ? 1 : 0, y: on ? 0 : 14 }}
        transition={{ duration: reduce ? 0 : 0.4, delay: on && !reduce ? 0.18 : 0, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: on ? "auto" : "none" }}
        aria-hidden={!on}
      >
        <span className="flex items-center gap-3 mb-auto">
          <c.Icon className="w-6 h-6" strokeWidth={1.4} style={{ color: DK.accent }} />
        </span>

        <span className="block font-mono-g text-[10.5px] uppercase tracking-[0.18em]" style={{ color: DK.faint }}>
          {c.reads}
        </span>
        <span
          className="block mt-4 font-display font-normal leading-[1.08] max-w-[16ch]"
          style={{ fontSize: "clamp(1.7rem, 2.6vw, 2.6rem)", letterSpacing: "-0.032em", color: DK.ink }}
        >
          {c.h}
        </span>
        <span
          className="block mt-5 font-sans-g leading-[1.7] max-w-[48ch]"
          style={{ fontSize: "0.98rem", color: DK.sub }}
        >
          {c.d}
        </span>
        <span
          className="inline-flex items-center gap-1.5 mt-7 font-sans-g text-[15px] font-semibold w-fit"
          style={{ color: DK.accent }}
        >
          Explore this industry
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        </span>
      </motion.span>
    </button>
  );
}

export default function Industries() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative px-5 sm:px-8 py-24 sm:py-36" style={{ background: SA.bg2 }} aria-labelledby="uc-h">
      <div className="max-w-[1180px] mx-auto">
        <div id="uc-h">
          <SectionHead
            title="Built for the documents that run your business"
            sub="The same engine, tuned to the paperwork of your industry. Pick the one you live in."
          />
        </div>

        {/* flex-grow does the work in both axes: a row of panels on desktop,
            a stacked accordion on a phone, from the same three nodes. */}
        <div
          role="tablist"
          aria-label="Industries"
          className="mt-14 sm:mt-20 flex flex-col sm:flex-row gap-2.5 sm:gap-3 h-[640px] sm:h-[560px]"
        >
          {cases.map((c, i) => (
            <Panel key={c.k} c={c} on={i === active} open={() => setActive(i)} />
          ))}
        </div>

        {/* the panel is a button, so the real link lives outside it — a link
            inside a button is invalid markup and Safari drops the click */}
        <div className="mt-8 flex justify-end">
          <a
            href="/solutions#industries"
            className="group inline-flex items-center gap-1.5 font-sans-g text-[15px] font-semibold"
            style={{ color: SA.accent }}
          >
            See every industry we read for
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
