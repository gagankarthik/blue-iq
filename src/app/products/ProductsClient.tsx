"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScanLine, PenLine, Blocks, type LucideIcon } from "lucide-react";
import { SA } from "@/lib/theme";
import { SPRING_SOFT } from "@/components/saas/motion";
import { SectionHead } from "@/components/saas/parts";
import { PageHero, Band, Cta, WRAP } from "@/components/page/kit";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /products

   The old page was a catalogue: two boxed product cards, an eyebrow over
   every heading, blueprint grids behind everything, and two invented
   product screenshots that showed software we do not actually ship.

   This is the same three offers, told as an umbrella: Blue-IQ is one
   engine, and ParsingLab, Govern and the products we build for a single
   team are three shapes it takes. The products come first because that is
   what the page is for; the engine section underneath is the reason all
   three behave the same way.

   Every claim here is one we can stand behind. Anything we could not
   source — clause-type counts, audit trails, retention promises — is gone
   rather than softened.
   ──────────────────────────────────────────────────────────────── */

const U = "https://images.unsplash.com/photo-";
const Q = "?w=900&q=75&auto=format&fit=crop";

type Product = {
  key: string;
  name: string;
  mark: LucideIcon;
  line: string;
  facts: string[];
  href: string;
  cta: string;
  external: boolean;
  image: string;
  alt: string;
};

const products: Product[] = [
  {
    key: "parsinglab",
    name: "ParsingLab",
    mark: ScanLine,
    line: "Resumes and credentials, read as data. A candidate's licences, credentials and specialties come back as fields you can search, rank and file — not as a document someone still has to open.",
    facts: [
      "Licences, credentials and specialties, pulled out and returned as structured fields",
      "More than 40 mapped fields, each one returned with its own confidence score",
      "A page photographed on a phone reads the same way a clean PDF does",
    ],
    href: "https://www.parsinglab.blue-iq.ai/",
    cta: "Open ParsingLab",
    external: true,
    image: `${U}1586281380349-632531db7ed4${Q}`,
    alt: "A resume on a clipboard beside a laptop",
  },
  {
    key: "govern",
    name: "Govern",
    mark: PenLine,
    line: "Contract review against your own playbook. Govern reads an agreement the way your legal team would, then attaches a risk rating to everything that deviates from what you already agreed to accept.",
    facts: [
      "Read against your own playbook, not a generic template of what a contract should say",
      "Auto-renewals, liability caps and termination terms, rated by how far they deviate",
      "Anything it cannot read with confidence is flagged for a person, never filled in",
    ],
    href: "https://govern.blue-iq.ai/",
    cta: "Open Govern",
    external: true,
    image: `${U}1450101499163-c8848c66ca85${Q}`,
    alt: "A person signing a document",
  },
  {
    key: "custom",
    name: "Custom builds",
    mark: Blocks,
    line: "When the documents your business runs on are not resumes and not contracts, the engine does not change — the product around it does. We design, engineer and support it, shaped around how your team already works.",
    facts: [
      "The same Sonar engine underneath, with the workflow built around your team",
      "Designed, engineered and supported by us, not handed over as a starting point",
      "Delivered through the same documented API, signed webhooks and native connectors",
    ],
    href: "/solutions",
    cta: "How we build",
    external: false,
    image: `${U}1517048676732-d65bc937f952${Q}`,
    alt: "A team working session around a table",
  },
];

/* One product. Full width, alternating, a rule on top and a photograph on the
   side — never a card, and never a drawing of a product screen. */
function Row({ p, i }: { p: Product; i: number }) {
  const reduce = useReducedMotion();
  const Mark = p.mark;
  const flip = i % 2 === 1;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={SPRING_SOFT}
      className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-y-10 lg:gap-x-20 items-center py-14 sm:py-20"
      style={{ borderTop: `1px solid ${SA.line2}` }}
    >
      <div className={flip ? "lg:order-2" : undefined}>
        <div className="flex items-center gap-3">
          <Mark className="w-5 h-5 shrink-0" strokeWidth={1.5} style={{ color: SA.accent }} aria-hidden />
          <h2
            className="font-display font-normal leading-[1.1]"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.7rem)", letterSpacing: "-0.032em", color: SA.ink }}
          >
            {p.name}
          </h2>
        </div>

        <p className="mt-6 font-sans-g leading-[1.75] max-w-[54ch]" style={{ fontSize: "1.05rem", color: SA.sub }}>
          {p.line}
        </p>

        <ul className="mt-9">
          {p.facts.map((f) => (
            <li
              key={f}
              className="py-4 font-sans-g text-[15px] leading-[1.6] max-w-[56ch]"
              style={{ borderTop: `1px solid ${SA.line}`, color: SA.ink }}
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <Cta href={p.href} label={p.cta} external={p.external} />
        </div>
      </div>

      <div className={flip ? "lg:order-1" : undefined}>
        <div
          className="relative rounded-2xl overflow-hidden aspect-[4/3]"
          style={{ background: SA.bg3 }}
        >
          <img
            src={p.image}
            alt={p.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1px ${SA.line2}` }}
          />
        </div>
      </div>
    </motion.article>
  );
}



export default function ProductsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />

      <main>
        <PageHero
          title="One engine. Three shapes it takes."
          lede="ParsingLab reads the people you hire, Govern reads what you sign, and when your work looks like neither, we build the product that fits it — all three running on Sonar."
          meta={["PDF · DOCX · Images · Scans", "Schema-validated JSON", "SOC 2 · HIPAA · GDPR"]}
        />

        {/* ── the three products ── */}
        <section className={`${WRAP} pb-8 sm:pb-12`} aria-label="Products">
          {products.map((p, i) => (
            <Row key={p.key} p={p} i={i} />
          ))}
          <div style={{ borderTop: `1px solid ${SA.line2}` }} />
        </section>

        {/* ── the engine all three sit on ──

            This used to re-argue confidence scoring from scratch and repeat the
            same four stats that /about, /solutions and the landing page were
            all showing. Four pages saying the same four numbers is why the site
            read as one page four times.

            /about#sonar OWNS that argument now. Here it gets the one line a
            products page actually needs — what is shared — and a door through
            to the full case. Say it once, in the right place, and point. ── */}
        <Band tone="grey">
          <SectionHead
            title="The same engine underneath all three."
            sub="Sonar is the part that does the reading. Whichever product you meet it through it behaves the same way: it takes the file however it arrives, and it tells you how far to trust every value it hands back."
          />
          <div className="mt-10">
            <Cta href="/about#sonar" label="How the engine scores its own work" />
          </div>
        </Band>
      </main>

      <SiteFooter />
    </div>
  );
}
