"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { Words, SPRING_SOFT } from "@/components/saas/motion";
import { SectionHead } from "@/components/saas/parts";
import { PageHero, Band, Ruled, StatStrip, Cta } from "@/components/page/kit";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /about

   The old page was the warm-cream system in full: a blueprint grid, a glow
   blob behind the hero, a mono-caps eyebrow over every heading, icons in
   tinted squares, a spec-sheet panel, and a CtaBand stacked on top of the
   footer's own close. It also opened by centring the company on Sonar and
   then on the product catalogue — an org chart, not an argument.

   This is the same page told as a company would tell it: who we are, the
   problem we exist for, the one opinion we hold (a read is worthless unless
   it tells you how far to trust it), and the vehicles that opinion ships in.
   Every number on the page is one the company already stands behind. Nothing
   here is invented — no customers, no dates, no uptime figures.
   ──────────────────────────────────────────────────────────────── */

/* the paperwork, at the three points it actually hurts. Not a product list —
   these are the documents, before anyone has decided what to buy. */
const arrives = [
  {
    t: "A hire",
    d: "A resume, a licence, a certification, a reference. A dozen formats from a dozen sources, and a person paid to read them all and turn them into one candidate record.",
  },
  {
    t: "A contract",
    d: "A master agreement, an amendment, a statement of work. The obligations that will actually bind you are buried in clauses nobody has time to read twice.",
  },
  {
    t: "An invoice",
    d: "A PDF, a scan, a photograph of a receipt taken in a car park. The numbers are right there on the page, and they still get re-typed into a system by hand.",
  },
];

/* the two halves of the opinion. Kept to two rows on purpose: this is the
   thing the page is for, and a third row would dilute it. */
const engine = [
  {
    t: "A score on every field",
    d: "Every value Sonar hands back arrives with a confidence score attached to it. Not a score for the document, or for the batch — one for each field, so your team can spend its attention on the handful that need a human and leave the rest alone.",
  },
  {
    t: "A flag, not a guess",
    d: "When Sonar cannot read something, it says so. It marks the field for review and moves on. It will not reach for the plausible-looking value to fill the gap, because a filled gap is one nobody goes back to check.",
  },
];

const specs = [
  { v: "200", l: "Documents per API call" },
  { v: "<1s", l: "Median read" },
  { v: "Every one", l: "Fields returned with a score" },
  { v: "Zero", l: "Fields it will guess at" },
];

/* delivery vehicles, at the weight they deserve on an umbrella page: the
   products are how the work ships, not the point of the company. */
const built = [
  {
    t: "Capture",
    d: "The foundation. Any document — resumes, contracts, invoices, licences, grants — read into structured, confidence-scored data. Everything below is built on it.",
    href: "https://www.parsinglab.blue-iq.ai/",
    label: "Open Capture",
    external: true,
  },
  {
    t: "Spend",
    d: "Spend and entitlement intelligence. It reconciles invoices, purchase orders and contracts against each other, and flags the money leaking between them.",
    href: "/products#spend",
    label: "See Spend",
    external: false,
  },
  {
    t: "Govern",
    d: "Contract and compliance intelligence. It reads the agreement, surfaces the clauses that carry consequences, and shows its confidence in each one.",
    href: "https://govern.blue-iq.ai/",
    label: "Open Govern",
    external: true,
  },
  {
    t: "Editions & custom builds",
    d: "Campus and Workforce package all three for an industry. And when the paperwork fits none of them, we build around the documents you actually have — same engine, your schema, your review workflow.",
    href: "/products#editions",
    label: "See the editions",
    external: false,
  },
];

/* things that are true and specific. Anything we could not stand behind — a
   founding story, a headcount, a values poster — was cut rather than invented. */
const how = [
  {
    t: "One engine, one foundation",
    d: "Capture, Spend, Govern and every edition are the same engine with a different surface on top. There is no second-tier model behind the cheaper product.",
  },
  {
    t: "An API, or a finished product",
    d: "A documented API for the teams who want to build on the read themselves, and a product for the teams who would rather not. The choice is yours; the engine underneath is the same one either way.",
  },
  {
    t: "Handled the way your auditors will ask about",
    d: "Document handling is aligned to SOC 2, HIPAA and GDPR, because the files we read are the ones a business is least able to be casual about.",
  },
];

/* the pivot line: the whole argument in one sentence, set as a statement
   rather than buried in a paragraph. No rule of its own — <Ruled> already
   closes with one, and a second line 80px under it is just a dead gauge. */
function Claim() {
  return (
    <div className="mt-14 sm:mt-16">
      <Words
        as="p"
        text="A wrong value that looks certain"
        className="font-display font-normal leading-[1.1] max-w-[22ch]"
        style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", letterSpacing: "-0.032em", color: SA.ink }}
        accent="costs more than a blank one."
        accentStyle={{ color: SA.accent }}
      />
    </div>
  );
}

/* a ruled product row. Same grammar as the kit's <Ruled> — the rule is the
   only chrome — with room for the link the products need. */
function BuildRow({
  row,
  i,
}: {
  row: (typeof built)[number];
  i: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ ...SPRING_SOFT, delay: i * 0.05 }}
      className="grid md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] gap-y-3 md:gap-x-12 py-7 md:py-8"
      style={{ borderTop: `1px solid ${SA.line2}` }}
    >
      <h3
        className="font-display font-normal tracking-[-0.025em] leading-[1.2]"
        style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", color: SA.ink }}
      >
        {row.t}
      </h3>
      <div>
        <p className="font-sans-g text-[15.5px] leading-[1.75] max-w-[58ch]" style={{ color: SA.sub }}>
          {row.d}
        </p>
        <div className="mt-4">
          <Cta href={row.href} label={row.label} external={row.external} />
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />

      <main>
        <PageHero
          title="We build software that reads the documents a business runs on."
          lede="Blue-IQ is a document-intelligence company: our products read the resumes, contracts and invoices your work arrives as, return them as structured data, and tell you how far to trust every field they hand back."
          meta={["Sonar engine", "Capture foundation", "Spend · Govern", "Campus · Workforce"]}
        />

        {/* ── the problem, stated at the level a business feels it ── */}
        <Band tone="grey">
          <SectionHead
            title="Every hire, contract and invoice arrives as a file."
            sub="Somebody opens it, works out what it says, and types it into a system that could have read it in the first place. That work is invisible, it is constant, and it scales with everything good that happens to a company."
          />
          <Ruled rows={arrives} />
        </Band>

        {/* ── the engine. The nav links here: /about#sonar ── */}
        <Band tone="tint" id="sonar">
          <SectionHead
            title="Sonar tells you how far to trust what it read."
            sub="The engine under everything we build. Most systems hand back an answer and leave you to work out whether to believe it — which means someone re-reads the document anyway, and the machine has saved nobody anything."
          />
          <Ruled rows={engine} />
          <Claim />
          <StatStrip stats={specs} />
        </Band>

        {/* ── what the engine ships as ── */}
        <Band>
          <SectionHead
            title="What that ships as."
            sub="A foundation, two applications built on it, the editions that bundle them, and the builds we take on when none of them is the right shape. Every one is a delivery vehicle for the same read — pick the one that fits how your team already works."
          />
          <div className="mt-14">
            {built.map((row, i) => (
              <BuildRow key={row.t} row={row} i={i} />
            ))}
            <div style={{ borderTop: `1px solid ${SA.line2}` }} />
          </div>
        </Band>

        {/* ── how we work: only what we can actually stand behind ── */}
        <Band tone="grey">
          <SectionHead
            title="How we work."
            sub="Three things that are true of every engagement, whether you take a product off the shelf or we build the thing around your paperwork."
          />
          <Ruled rows={how} />

          <div className="mt-12">
            <Cta href="/solutions" label="See how teams put it to work" />
          </div>
        </Band>
      </main>

      <SiteFooter />
    </div>
  );
}
