import Link from "next/link";
import { BB } from "@/lib/theme";
import { Head, Stagger, CountUp } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import { I, type Ico } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   "The full stack for document work", original copy in the blueprint
   system: three tick-framed columns. The first two are ways in (ruled link
   rows); the third holds the only figures the company publishes, counting
   up once as they arrive.
   ──────────────────────────────────────────────────────────────── */

type LinkRow = { Icon: Ico; t: string; href: string };

const COLS: { t: string; d: string; links?: LinkRow[]; facts?: [React.ReactNode, string][] }[] = [
  {
    t: "Products for every team",
    d: "Ready-made products for documents, spend and contracts, with editions for your sector.",
    links: [
      { Icon: I.capture, t: "Capture", href: "/products#capture" },
      { Icon: I.spend, t: "Spend", href: "/products#spend" },
      { Icon: I.govern, t: "Govern", href: "/products#govern" },
      { Icon: I.editions, t: "Editions", href: "/products#editions" },
    ],
  },
  {
    t: "An AI you can trust",
    d: "Sonar reads every document, scores every value, and says so when it is unsure.",
    links: [
      { Icon: I.docs, t: "Reads any document", href: "/platform" },
      { Icon: I.scores, t: "Scores every field", href: "/platform" },
      { Icon: I.flag, t: "Flags, never guesses", href: "/platform" },
    ],
  },
  {
    t: "Built to run at scale",
    d: "From a handful of files to an archive, on the same engine and the same review.",
    facts: [
      [<CountUp key="a" to={200} />, "documents per API call"],
      [<CountUp key="b" to={1} prefix="<" suffix="s" ms={900} />, "median read time"],
      ["Every", "field confidence-scored"],
    ],
  },
];

export default function Pillars() {
  return (
    <section className="px-6 sm:px-8 pb-24" aria-labelledby="pillars-h">
      <div aria-hidden className="max-w-[1112px] mx-auto h-px mb-24" style={{ background: BB.line }} />
      <div className="max-w-[1112px] mx-auto">
        <Head id="pillars-h" title="The full stack for document work" />

        <Stagger className="mt-12 grid md:grid-cols-3 gap-4">
          {COLS.map((c) => (
            <div key={c.t} className="relative p-8 rounded-2xl" style={{ background: BB.panel, border: `1px solid ${BB.line}` }}>
              <h3 className="font-head h-card" style={{ color: BB.ink }}>
                {c.t}
              </h3>
              <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                {c.d}
              </p>

              {c.links && (
                <ul className="mt-8" style={{ borderTop: `1px solid ${BB.line}` }}>
                  {c.links.map((l) => (
                    <li key={l.t} style={{ borderBottom: `1px solid ${BB.line}` }}>
                      <Link
                        href={l.href}
                        className="group flex items-center gap-4 h-12 font-sans-g text-[16px] transition-colors duration-150 hover:text-[#1F4FE6]"
                        style={{ color: BB.ink2 }}
                      >
                        <l.Icon size={20} style={{ color: BB.cobalt }} />
                        <span className="flex-1">{l.t}</span>
                        <I.arrow size={16} className="transition-transform duration-150 group-hover:translate-x-1" style={{ color: BB.ink3 }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {c.facts && (
                <dl className="mt-8" style={{ borderTop: `1px solid ${BB.line}` }}>
                  {c.facts.map(([v, k]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 h-16" style={{ borderBottom: `1px solid ${BB.line}` }}>
                      <dt className="font-sans-g text-[16px] self-center" style={{ color: BB.ink3 }}>
                        {k}
                      </dt>
                      <dd className="font-head h-card self-center" style={{ color: BB.ink }}>
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <SqBtn href="/contact" tone="ink" size="lg" arrow>
            Start building with Blue-IQ
          </SqBtn>
        </div>
      </div>
    </section>
  );
}
