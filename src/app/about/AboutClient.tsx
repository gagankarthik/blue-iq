import Link from "next/link";
import { BB } from "@/lib/theme";
import { PageHero } from "@/components/page/kit";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import { I, Tile, type Ico } from "@/components/home/icons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /about: who Blue-IQ is, read top to bottom in the blueprint system.

   1. Header: what we do, and one way to reach us.
   2. The problem: the three documents every team re-types, as cards.
   3. Meet Sonar: its two rules, and the way to /platform.
   4. How we work: three numbered commitments.
   5. What we build: every product on Sonar, each card a way in.
   Then the footer close. No founding myth, no invented customers,
   headcount or metrics.
   ──────────────────────────────────────────────────────────────── */

type Item = { icon: Ico; t: string; d: string };

const PAIN: Item[] = [
  { icon: I.workforce, t: "A new hire", d: "Resumes, licences and references, re-typed into your ATS." },
  { icon: I.govern, t: "A contract", d: "Obligations buried in clauses nobody has time to read twice." },
  { icon: I.spend, t: "An invoice", d: "Numbers already on the page, keyed in again by hand." },
];

const RULES: Item[] = [
  { icon: I.scores, t: "A score on every field", d: "Not one number per file. One per value, so you can trust each one on its own." },
  { icon: I.flag, t: "A flag, never a guess", d: "If Sonar cannot read a value, it says so and sends it to a person." },
];

const WORK: Item[] = [
  { icon: I.docs, t: "We start from your files", d: "Real documents, not a demo set. The messy ones teach us most." },
  { icon: I.custom, t: "We build what fits", d: "A product, an edition, or something new. Whatever reads your work best." },
  { icon: I.trust, t: "We treat data as sensitive", d: "Aligned to SOC 2, HIPAA and GDPR, from the first file you send." },
];

const BUILD: (Item & { href: string })[] = [
  { icon: I.capture, t: "Capture", d: "Turns incoming documents into clean, structured data", href: "/products#capture" },
  { icon: I.spend, t: "Spend", d: "Keeps invoices in line with what was agreed", href: "/products#spend" },
  { icon: I.govern, t: "Govern", d: "Keeps contracts and obligations in view", href: "/products#govern" },
  { icon: I.editions, t: "Campus and Workforce", d: "The products, packaged for your sector", href: "/products#editions" },
  { icon: I.custom, t: "Custom builds", d: "When nothing fits, we build it on Sonar", href: "/solutions#custom" },
  { icon: I.sonar, t: "Sonar", d: "The AI under every product", href: "/platform" },
];

const CARD = "rounded-2xl bg-white p-8";
const EDGE = { border: `1px solid ${BB.line}` } as const;

/* one section: a hairline seam, then the header and its content */
function Section({ id, labelledby, children }: { id?: string; labelledby: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 px-6 sm:px-8 pb-24" aria-labelledby={labelledby}>
      <div aria-hidden className="max-w-[1112px] mx-auto h-px mb-24" style={{ background: BB.line }} />
      <div className="max-w-[1112px] mx-auto">{children}</div>
    </section>
  );
}

function ItemCard({ x }: { x: Item }) {
  return (
    <li className={`${CARD} h-full`} style={EDGE}>
      <Tile icon={x.icon} />
      <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
        {x.t}
      </h3>
      <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
        {x.d}
      </p>
    </li>
  );
}

export default function AboutClient() {
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="About"
          id="about-h"
          title="Every business runs on documents someone re-types"
          lede="Blue-IQ builds the products that end that work. Every one of them runs on Sonar, our document AI."
          primary={{ label: "Contact us", href: "/contact" }}
        />

        {/* 1. the problem */}
        <Section id="problem" labelledby="problem-h">
          <Head
            id="problem-h"
            title="The same three documents slow every team down"
            sub="The information is already on the page. Someone still reads it, types it in, and checks it again. We build the products that read it once, carefully, and say how sure they are."
          />
          <Stagger as="ul" className="mt-12 grid md:grid-cols-3 gap-4">
            {PAIN.map((x) => (
              <ItemCard key={x.t} x={x} />
            ))}
          </Stagger>
        </Section>

        {/* 2. what Sonar does */}
        <Section id="sonar" labelledby="sonar-h">
          <Head
            id="sonar-h"
            title="Meet Sonar, our AI"
            sub="It reads a document the way a careful person does, then tells you how sure it is about every value."
          />
          <Stagger as="ul" className="mt-12 grid md:grid-cols-2 gap-4">
            {RULES.map((x) => (
              <ItemCard key={x.t} x={x} />
            ))}
          </Stagger>
          <div className="mt-12 flex justify-center">
            <SqBtn href="/platform" tone="outline" arrow>
              How Sonar works
            </SqBtn>
          </div>
        </Section>

        {/* 3. how we work */}
        <Section id="work" labelledby="work-h">
          <Head id="work-h" title="Three commitments, on every project" />
          <Stagger as="ol" className="mt-12 grid md:grid-cols-3 gap-4">
            {WORK.map((x, i) => (
              <li key={x.t} className={`${CARD} h-full`} style={EDGE}>
                <span className="flex items-center justify-between">
                  <Tile icon={x.icon} />
                  <span aria-hidden className="font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.cobalt }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                  {x.t}
                </h3>
                <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                  {x.d}
                </p>
              </li>
            ))}
          </Stagger>
        </Section>

        {/* 4. the products index */}
        <Section id="build" labelledby="build-h">
          <Head
            id="build-h"
            title="One engine, every product we ship"
            sub="New products slot in on the same AI, so what you learn on one carries to the next."
          />
          <Stagger as="ul" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUILD.map((x) => (
              <li key={x.t}>
                <Link
                  href={x.href}
                  className="group flex h-full flex-col rounded-2xl border border-[#D9DCE2] bg-white p-8 transition-[border-color] duration-200 hover:border-[#1F4FE6] focus-visible:border-[#1F4FE6]"
                >
                  <span className="flex items-start justify-between">
                    <Tile icon={x.icon} />
                    <I.arrow aria-hidden size={16} className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: BB.cobalt }} />
                  </span>
                  <span className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                    {x.t}
                  </span>
                  <span className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                    {x.d}
                  </span>
                </Link>
              </li>
            ))}
          </Stagger>
        </Section>
      </main>
      <SiteFooter
        cta={{ title: "Send us the documents your team re-types", sub: "We will read them with Sonar, live, and show you every score and every flag." }}
      />
    </div>
  );
}
