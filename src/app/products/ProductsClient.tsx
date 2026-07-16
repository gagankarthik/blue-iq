"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScanLine, PenLine, Receipt, GraduationCap, Users, type LucideIcon } from "lucide-react";
import { SA } from "@/lib/theme";
import { SPRING_SOFT } from "@/components/saas/motion";
import { SectionHead } from "@/components/saas/parts";
import { PageHero, Band, Cta, WRAP } from "@/components/page/kit";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /products

   This page is the architecture, not a catalogue. Blue-IQ is one platform
   on one engine (Sonar). Capture is the foundation — any document into
   structured, confidence-scored data. Spend and Govern are applications
   built on Capture, not siblings beside it. Campus and Workforce are
   editions: Capture + Spend + Govern, packaged for an industry.

   The old page sold "two products plus custom builds", which framed the
   thing as a list. This one reads top-down: the foundation everything
   stands on, the applications pre-built on it, the editions that bundle
   them. The layer label on each row is doing real work — it tells you where
   the product sits in the stack — so it stays, even though the system bans
   decorative eyebrows.

   Every claim here is one we can stand behind. Anything we could not
   source is gone rather than softened.
   ──────────────────────────────────────────────────────────────── */

const U = "https://images.unsplash.com/photo-";
const Q = "?w=900&q=75&auto=format&fit=crop";

type Product = {
  key: string;
  name: string;
  layer: string;
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
    key: "capture",
    name: "Capture",
    layer: "Foundation",
    mark: ScanLine,
    line: "Turn any document into structured, confidence-scored data. A resume, a contract, an invoice, a licence, a grant, a page photographed on a phone — whatever the format, whatever the industry, it comes back as fields you can search, file and trust, each one scored.",
    facts: [
      "Any document, any industry — no templates to maintain and no rules to write",
      "Every field returned with its own confidence score, so a person only opens the uncertain ones",
      "A page shot on a phone reads the same way a clean PDF does",
    ],
    href: "https://www.parsinglab.blue-iq.ai/",
    cta: "Open Capture",
    external: true,
    image: `${U}1586281380349-632531db7ed4${Q}`,
    alt: "Documents on a desk beside a laptop",
  },
  {
    key: "spend",
    name: "Spend",
    layer: "Application on Capture",
    mark: Receipt,
    line: "Spend and entitlement intelligence. Capture reads the invoices, purchase orders, licences and contracts; Spend reconciles them against each other and flags the money leaking between them — the line item that drifts from the agreed rate, the entitlement you are paying for twice.",
    facts: [
      "Invoices, purchase orders and contracts matched line by line on a single read",
      "Spend leakage surfaced as it happens, not at quarter close",
      "Entitlements and licences reconciled against what you actually agreed to pay",
    ],
    href: "/contact",
    cta: "Book a Spend demo",
    external: false,
    image: `${U}1554224155-6726b3ff858f${Q}`,
    alt: "Invoices and a calculator on a desk",
  },
  {
    key: "govern",
    name: "Govern",
    layer: "Application on Capture",
    mark: PenLine,
    line: "Contract and compliance intelligence. Govern reads an agreement the way your legal team would, then attaches a risk rating to everything that deviates from what you already agreed to accept.",
    facts: [
      "Read against your own playbook, not a generic template of what a contract should say",
      "Auto-renewals, liability caps, termination terms and compliance obligations, rated by how far they deviate",
      "Anything it cannot read with confidence is flagged for a person, never filled in",
    ],
    href: "https://govern.blue-iq.ai/",
    cta: "Open Govern",
    external: true,
    image: `${U}1450101499163-c8848c66ca85${Q}`,
    alt: "A person signing a document",
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
      id={p.key === "spend" ? "spend" : undefined}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={SPRING_SOFT}
      className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-y-10 lg:gap-x-20 items-center py-14 sm:py-20 scroll-mt-24"
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
          <span
            className="ml-1 font-mono-g text-[10px] font-semibold uppercase tracking-[0.16em] px-2 py-1 rounded-full"
            style={{ color: SA.accent, background: SA.accentSoft }}
          >
            {p.layer}
          </span>
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
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ background: SA.bg3 }}>
          <img src={p.image} alt={p.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
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

/* ── the editions. Each one is Capture + Spend + Govern, tuned for an
      industry. The composition is the whole point, so it is set as a
      three-line ledger rather than hidden in prose. ── */
type Edition = {
  key: string;
  name: string;
  mark: LucideIcon;
  audience: string;
  d: string;
  rows: [string, string][];
};

const editions: Edition[] = [
  {
    key: "campus",
    name: "Campus",
    mark: GraduationCap,
    audience: "For higher education",
    d: "Everything a university runs on paper — read once, and reconciled across the departments that never share a system.",
    rows: [
      ["Capture", "Licences, contracts and grants read into structured records"],
      ["Spend", "Software-license and SAM spend reconciled against entitlements"],
      ["Govern", "Contracts, IP and grant compliance checked against your own policies"],
    ],
  },
  {
    key: "workforce",
    name: "Workforce",
    mark: Users,
    audience: "For staffing & talent platforms",
    d: "The document flow of a staffing platform, end to end — from the candidate, to the margin, to the statement of work.",
    rows: [
      ["Capture", "Candidates and credentials read into clean, searchable records"],
      ["Spend", "Bill rates and margins reconciled across the placements you run"],
      ["Govern", "SOWs, worker classification and compliance handled before they bite"],
    ],
  },
];

function EditionBlock({ e, i }: { e: Edition; i: number }) {
  const reduce = useReducedMotion();
  const Mark = e.mark;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ ...SPRING_SOFT, delay: i * 0.06 }}
      className="grid lg:grid-cols-[minmax(0,0.52fr)_minmax(0,1fr)] gap-y-6 lg:gap-x-16 py-12 sm:py-14"
      style={{ borderTop: `1px solid ${SA.line2}` }}
    >
      <div>
        <div className="flex items-center gap-3">
          <Mark className="w-6 h-6 shrink-0" strokeWidth={1.4} style={{ color: SA.accent }} aria-hidden />
          <h3
            className="font-display font-normal leading-[1.1]"
            style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", letterSpacing: "-0.032em", color: SA.ink }}
          >
            {e.name}
          </h3>
        </div>
        <p className="mt-3 font-mono-g text-[11px] uppercase tracking-[0.16em]" style={{ color: SA.faint }}>
          {e.audience}
        </p>
        <p className="mt-5 font-sans-g leading-[1.7] max-w-[42ch]" style={{ fontSize: "1rem", color: SA.sub }}>
          {e.d}
        </p>
        <p className="mt-6 font-display text-[15px]" style={{ color: SA.accent }}>
          = Capture + Spend + Govern
        </p>
      </div>

      <dl>
        {e.rows.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-[92px_minmax(0,1fr)] gap-x-6 py-4"
            style={{ borderTop: `1px solid ${SA.line}` }}
          >
            <dt className="font-display text-[15px] tracking-[-0.01em]" style={{ color: SA.ink }}>
              {k}
            </dt>
            <dd className="font-sans-g text-[15px] leading-[1.6]" style={{ color: SA.sub }}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

export default function ProductsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />

      <main>
        <PageHero
          title="One platform. One engine. Every document."
          lede="Blue-IQ reads any document through the Sonar engine. Capture turns that read into structured, trusted data; Spend and Govern are ready-made applications of it for invoices and contracts; Campus and Workforce package all three for your industry."
          meta={["Sonar engine", "Capture foundation", "Spend · Govern", "Campus · Workforce"]}
        />

        {/* the ladder, stated once so the rows below have a frame to sit in */}
        <section className={`${WRAP} pb-4`}>
          <p className="font-sans-g text-[15px] leading-[1.7] max-w-[64ch]" style={{ color: SA.faint }}>
            Platform → engine → foundation → applications → editions. Five layers, one engine underneath — so whichever
            product you buy, it reads and scores your documents the same way.
          </p>
        </section>

        {/* ── foundation, then the applications built on it ── */}
        <section className={`${WRAP} pb-8 sm:pb-12`} aria-label="Products">
          {products.map((p, i) => (
            <Row key={p.key} p={p} i={i} />
          ))}
          <div style={{ borderTop: `1px solid ${SA.line2}` }} />
        </section>

        {/* ── the editions ── */}
        <Band tone="grey" id="editions">
          <SectionHead
            title="Packaged for your industry."
            sub="An edition is Capture, Spend and Govern bundled and tuned for one audience — the same three products, pointed at the documents that particular industry actually runs on."
          />
          <div className="mt-14">
            {editions.map((e, i) => (
              <EditionBlock key={e.key} e={e} i={i} />
            ))}
            <div style={{ borderTop: `1px solid ${SA.line2}` }} />
          </div>

          <p className="mt-10 font-sans-g text-[15px] leading-[1.75] max-w-[62ch]" style={{ color: SA.sub }}>
            When your documents fit none of these, the engine does not change — the application around it does. We
            design, engineer and support the build that fits, on the same Sonar engine underneath.
          </p>
          <div className="mt-6">
            <Cta href="/solutions" label="How we build a custom application" />
          </div>
        </Band>

        {/* ── the engine all of them sit on ── */}
        <Band>
          <SectionHead
            title="The same engine underneath all of it."
            sub="Sonar is the part that does the reading. Whichever product or edition you meet it through it behaves the same way: it takes the file however it arrives, and it tells you how far to trust every value it hands back."
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
