"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Stethoscope, Scale, Receipt, Network, GraduationCap, Users } from "lucide-react";
import { SA } from "@/lib/theme";
import { SPRING_SOFT } from "@/components/saas/motion";
import { SectionHead } from "@/components/saas/parts";
import { PageHero, Band, Ruled, Cta } from "@/components/page/kit";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /solutions — the work, not the product.

   The page this replaces was the old warm-cream system: a blueprint grid
   behind the hero, an icon in a tinted square on top of every track, and
   three hand-drawn "spec panels" showing a schema, a field mapping, and a
   row of connector chips — all of it invented. A solutions page is exactly
   where fake proof creeps in, so this one carries no customers, no logos,
   no delivery timelines and no results. What it has instead is the honest
   shape of the work and the four facts about the engine that are true.

   Photographs where a picture helps. Nothing drawn that pretends to be
   product UI.
   ──────────────────────────────────────────────────────────────── */

const custom = [
  {
    t: "We start from your documents",
    d: "Not a sample set. The scans, the phone photos, the DOCX somebody exported from a system that stopped being supported in 2016 — we read what actually arrives, and we agree on what a working answer looks like before anyone writes code.",
  },
  {
    t: "You see the schema before it is built",
    d: "The fields, the types, and the confidence thresholds are yours to argue with. Nothing goes near production until the output on your own documents is output you would act on.",
  },
  {
    t: "We engineer it, and we stay on it",
    d: "It ships as an API, an interface, or both, on the same Sonar engine that runs Capture, Spend and Govern. Your documents will change; we stay on it when they do.",
  },
];

const migrations = [
  {
    t: "Map the fields, including the ones nobody documented",
    d: "Most of the risk in a migration is in the fields that were never written down. Every field in the system you are leaving gets a destination or a decision, and the dead ones get retired on purpose rather than by accident.",
  },
  {
    t: "Bring the history across",
    d: "Historical documents run through Sonar the same way new ones do, so the archive answers questions in the same schema as everything that arrives tomorrow. The old system stops being the only place the past lives.",
  },
  {
    t: "Run both, then cut over",
    d: "The new pipeline runs alongside the one you have until its output agrees with what you expect it to say. The cutover date is yours.",
  },
];

/* ── the industries, in the detail the home page cannot afford.

      The home page shows you the three sectors as photographs you can click
      through — that is the right job for a home page. Repeating that section
      here, which is what this page used to do, taught a reader nothing they
      had not already been told sixty seconds earlier.

      So this is the substance instead: what actually lands in the inbox, what
      comes back out, and the specific thing that goes wrong in each industry
      when a machine fills a gap with its best guess. The last column is the
      whole argument for confidence scoring, stated three different ways by
      three different kinds of damage. ── */
/* per-industry anchor slugs, so the nav and footer can deep-link to a row */
const ANCHOR: Record<string, string> = {
  "IT sector": "it",
  Education: "education",
  Workforce: "workforce",
  "Healthcare staffing": "healthcare",
  "Legal & contracts": "legal",
  "Procurement & finance": "procurement",
};

const sectors: {
  k: string;
  Icon: typeof Scale;
  arrives: string;
  returns: string;
  cost: string;
}[] = [
  {
    k: "IT sector",
    Icon: Network,
    arrives: "MSAs, statements of work, renewal notices, and the vendor invoices that arrive in a dozen different layouts.",
    returns: "Renewal dates, liability caps, licence counts, and the line items that drift from what the contract said — each one scored.",
    cost: "A renewal that slips through is a year of spend nobody re-approved; a licence miscount is a true-up bill at audit. A flagged field the team checks beats a confident wrong one that reaches the ledger.",
  },
  {
    k: "Education",
    Icon: GraduationCap,
    arrives: "Applications, transcripts, and the supplier agreements the institution signs — often scanned, often photographed.",
    returns: "Course histories, credentials, and contract terms as clean records your student and finance systems can take without re-keying.",
    cost: "A transcript keyed wrong stalls an admission; a term missed in a supplier agreement is money the department never budgeted. The engine flags what it cannot read rather than guessing a grade or a date.",
  },
  {
    k: "Workforce",
    Icon: Users,
    arrives: "Resumes, state licences, and compliance files — the paperwork every placement generates, at the volume a staffing desk runs.",
    returns: "Skills, credentials, and expiry dates as structured candidate records, ready for the ATS, each field carrying its own score.",
    cost: "An expiry read wrong puts an unlicensed contractor on an assignment. That is a compliance failure, not a typo — which is why a date it could not read comes back flagged, not filled in.",
  },
  {
    k: "Healthcare staffing",
    Icon: Stethoscope,
    arrives: "Clinical resumes, state licences, compliance packets. Often a photograph of a certificate taken on a phone.",
    returns: "Specialties, credentials in the order they were earned, licence numbers, and the expiry dates that decide whether someone can work on Monday.",
    cost: "An expiry date read wrong puts an unlicensed clinician on a shift. That is not a data-quality problem, it is a regulatory one — which is why the engine flags a date it could not read rather than filling it in.",
  },
  {
    k: "Legal & contracts",
    Icon: Scale,
    arrives: "SOWs, MSAs, NDAs, amendments, and the playbook your team already argues from.",
    returns: "Clauses matched against that playbook, with whatever deviates marked and ranked — auto-renewals, liability caps, termination terms.",
    cost: "A missed auto-renewal is a year of spend nobody approved. A clause the engine skimmed and scored as clean is worse than a clause it admits it could not parse.",
  },
  {
    k: "Procurement & finance",
    Icon: Receipt,
    arrives: "Invoices, purchase orders, and the contract that says what the price was supposed to be.",
    returns: "Line items matched across all three, with the ones that drift from what was agreed surfaced as they arrive.",
    cost: "A wrong figure that looks confident gets paid. It is caught at quarter close, if it is caught at all — so a flagged line beats a confident one every time.",
  },
];

/* ── the three ways in. A row, a rule, and a link — the same shape as Ruled,
      but each row ends somewhere. ── */
const routes: { t: string; d: string; href: string; label: string; external?: boolean }[] = [
  {
    t: "Capture",
    d: "Any document in, structured and scored records out. The foundation to reach for when you just need the paperwork read into data you can trust.",
    href: "https://www.parsinglab.blue-iq.ai/",
    label: "Open Capture",
    external: true,
  },
  {
    t: "Spend",
    d: "Invoices, purchase orders and contracts reconciled against each other, with the money leaking between them flagged as it arrives. The application for the numbers.",
    href: "/products#spend",
    label: "See Spend",
  },
  {
    t: "Govern",
    d: "Contracts and agreements read against a playbook, with what deviates flagged. The application for the review that happens before a signature.",
    href: "https://govern.blue-iq.ai/",
    label: "Open Govern",
    external: true,
  },
  {
    t: "A custom build",
    d: "None of them fits, or the fit is close but not close enough. Tell us what arrives and what you need out of it, and we will tell you honestly whether it is a fit.",
    href: "/contact",
    label: "Start a conversation",
  },
];

export default function SolutionsClient() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />

      <main>
        <PageHero
          title="The platform covers most of it. We build the rest."
          lede="Capture, Spend and Govern handle the paperwork most companies share; when your documents, your systems or your obligations fit none of them, we design, engineer and support the application that does — on the same Sonar engine underneath."
          meta={["Custom development", "Enterprise migrations", "Integrations", "Industries"]}
        />

        {/* The four-stat strip that stood here is gone. It was the same four
            numbers the landing page, /about and /products were all showing, and
            a reader who has walked the site had met them three times before
            arriving. /about#sonar owns the engine's case; this page is about
            the work we do on top of it, so it opens straight into the work. */}

        {/* ── #custom ── */}
        <Band id="custom">
          <SectionHead
            title="When the document doesn't fit a product, we build around the document."
            sub="This is engineering work, and we talk about it as engineering work: no fixed six-week promise, no proposal written before we have seen what actually arrives."
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={SPRING_SOFT}
            className="mt-14 overflow-hidden rounded-[20px] sm:rounded-[24px]"
          >
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=75&auto=format&fit=crop"
              alt="A working session around a table"
              loading="lazy"
              className="w-full h-[240px] sm:h-[380px] object-cover"
            />
          </motion.div>

          <Ruled rows={custom} />

          <div className="mt-10">
            <Cta href="/contact" label="Scope a build" />
          </div>
        </Band>

        {/* ── #migrations ── */}
        <Band id="migrations" tone="grey">
          <SectionHead
            title="Moving off a legacy parser is a data problem before it is a software one."
            sub="The disruption in a migration almost never comes from the new system. It comes from the fields in the old one that nobody can explain any more."
          />

          <Ruled rows={migrations} />

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...SPRING_SOFT, delay: 0.1 }}
            className="mt-10 font-sans-g text-[15.5px] leading-[1.75] max-w-[62ch]"
            style={{ color: SA.sub }}
          >
            We won't quote you a schedule before we have looked at the data. Anyone who does is guessing, and
            the guess is what breaks the cutover.
          </motion.p>
        </Band>

        {/* ── #integrations ──
            The four rows that were here — in, out, webhooks, connectors — were
            /resources' integration section almost word for word. That page owns
            the API surface. Here it gets the part that is actually a *solutions*
            question (where the output has to land, and what happens when it
            doesn't fit), and then hands off. ── */}
        <Band id="integrations">
          <SectionHead
            title="Structured output, into the systems you already run."
            sub="A custom build is only finished when its output is sitting in the system your team opens every morning — not in a file somebody has to fetch. Schema-validated JSON, signed webhooks, native connectors where they exist, and an engineered path where they don't."
          />
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
            <Cta href="/resources#api" label="How the API works" />
            <Cta href="/contact" label="Tell us what it has to land in" />
          </div>
        </Band>

        {/* ── #industries ──
            This used to be the home page's hover-panel section, verbatim: same
            headline, same three photographs, same interaction. Meeting it twice
            is exactly why the site read as one page repeated.

            The home page gets the picture. This one gets the substance — the
            documents that actually arrive, the fields that come back, and the
            thing that goes wrong in each industry when a machine guesses. ── */}
        <Band id="industries" tone="grey">
          <SectionHead
            title="What changes between industries is the schema, not the engine."
            sub="The documents, the fields worth pulling out, and what it costs to get one of them wrong. That last one is why the threshold is different in each of these."
          />

          <div className="mt-14">
            {sectors.map((s, i) => (
              <motion.div
                key={s.k}
                id={ANCHOR[s.k]}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ ...SPRING_SOFT, delay: i * 0.06 }}
                className="grid lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] gap-y-5 lg:gap-x-16 py-10 scroll-mt-28"
                style={{ borderTop: `1px solid ${SA.line2}` }}
              >
                <div className="flex items-start gap-3">
                  <s.Icon className="w-6 h-6 shrink-0 mt-0.5" strokeWidth={1.4} style={{ color: SA.accent }} aria-hidden />
                  <h3
                    className="font-display font-normal leading-[1.15]"
                    style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", letterSpacing: "-0.03em", color: SA.ink }}
                  >
                    {s.k}
                  </h3>
                </div>

                <div>
                  <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                    <div>
                      <dt className="font-mono-g text-[10.5px] uppercase tracking-[0.16em]" style={{ color: SA.faint }}>
                        What arrives
                      </dt>
                      <dd className="mt-2 font-sans-g text-[15px] leading-[1.65]" style={{ color: SA.ink }}>
                        {s.arrives}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono-g text-[10.5px] uppercase tracking-[0.16em]" style={{ color: SA.faint }}>
                        What comes back
                      </dt>
                      <dd className="mt-2 font-sans-g text-[15px] leading-[1.65]" style={{ color: SA.ink }}>
                        {s.returns}
                      </dd>
                    </div>
                  </dl>

                  <p
                    className="mt-6 pt-5 font-sans-g text-[15px] leading-[1.75] max-w-[62ch]"
                    style={{ borderTop: `1px solid ${SA.line}`, color: SA.sub }}
                  >
                    <span className="font-medium" style={{ color: SA.amber }}>
                      The cost of a guess:{" "}
                    </span>
                    {s.cost}
                  </p>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: `1px solid ${SA.line2}` }} />
          </div>
        </Band>

        {/* ── where this starts ── */}
        <Band>
          <SectionHead
            title="Four ways in."
            sub="Two you can open right now, one is a demo away, and the last starts with a conversation about what lands in your inbox every morning."
          />

          <div className="mt-14">
            {routes.map((r, i) => (
              <motion.div
                key={r.t}
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
                  {r.t}
                </h3>
                <div>
                  <p className="font-sans-g text-[15.5px] leading-[1.75] max-w-[58ch]" style={{ color: SA.sub }}>
                    {r.d}
                  </p>
                  <div className="mt-4">
                    <Cta href={r.href} label={r.label} external={r.external} />
                  </div>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: `1px solid ${SA.line2}` }} />
          </div>
        </Band>
      </main>

      <SiteFooter />
    </div>
  );
}
