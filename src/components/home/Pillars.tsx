import Link from "next/link";
import { Btn } from "@/components/system/Btn";
import { type Spot, SpotCustom, SpotSonar, SpotScale } from "@/components/icons/Spots";
import { type BqIcon, IconLayers, IconCapture, IconSpend, IconGovern, IconScore, IconFlag, IconDocs, IconArrow } from "@/components/icons/BqIcons";

/* ────────────────────────────────────────────────────────────────
   The company in three columns — sarvam.ai's "full-stack platform" row.
   Each column: a soft gradient tile with a white mark, a title, a line,
   then either a list of ways in or a short table of facts. The facts are
   the only figures the company publishes.
   ──────────────────────────────────────────────────────────────── */

type LinkRow = { Icon: BqIcon; t: string; href: string };

const COLS: {
  Spot: Spot;
  tile: string;
  t: string;
  d: string;
  links?: LinkRow[];
  facts?: [string, string][];
}[] = [
  {
    Spot: SpotCustom,
    tile: "linear-gradient(135deg, #7F9CFF 0%, #B9C8FF 60%, #DCE4FF 100%)",
    t: "Products for every team",
    d: "Ready-made products for documents, spend and contracts, with editions for your sector.",
    links: [
      { Icon: IconCapture, t: "Capture", href: "/products#capture" },
      { Icon: IconSpend, t: "Spend", href: "/products#spend" },
      { Icon: IconGovern, t: "Govern", href: "/products#govern" },
      { Icon: IconLayers, t: "Editions", href: "/products#editions" },
    ],
  },
  {
    Spot: SpotSonar,
    tile: "linear-gradient(135deg, #5CC8FF 0%, #A6E2FF 60%, #DDF4FF 100%)",
    t: "An AI you can trust",
    d: "Sonar reads every document, scores every value, and says so when it is unsure.",
    links: [
      { Icon: IconDocs, t: "Reads any document", href: "/platform" },
      { Icon: IconScore, t: "Scores every field", href: "/platform" },
      { Icon: IconFlag, t: "Flags, never guesses", href: "/platform" },
    ],
  },
  {
    Spot: SpotScale,
    tile: "linear-gradient(135deg, #6FD3A8 0%, #B5EBD3 60%, #E2F7EE 100%)",
    t: "Built to run at scale",
    d: "From a handful of files to an archive, on the same engine and the same review.",
    facts: [
      ["documents per API call", "200"],
      ["median read time", "<1s"],
      ["fields confidence-scored", "Every"],
    ],
  },
];

export default function Pillars() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32" aria-labelledby="pillars-h">
      <div className="max-w-[1240px] mx-auto">
        <h2 id="pillars-h" className="mx-auto text-center font-display t-h1 max-w-[20ch]" style={{ color: "#1F1F1F" }}>
          The full stack for document work
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-x-10 gap-y-14">
          {COLS.map((c) => (
            <div key={c.t}>
              <div className="h-48 rounded-[20px] grid place-items-center" style={{ background: c.tile }}>
                <span className="grid place-items-center w-[104px] h-[104px] rounded-[24px] bg-white shadow-[0_12px_28px_-16px_rgba(30,33,48,0.35)]">
                  <c.Spot size={72} />
                </span>
              </div>
              <h3 className="mt-6 font-sans-g text-[1.375rem] font-medium" style={{ color: "#1F1F1F" }}>
                {c.t}
              </h3>
              <p className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: "#55565E" }}>
                {c.d}
              </p>

              {c.links && (
                <ul className="mt-6">
                  {c.links.map((l) => (
                    <li key={l.t} style={{ borderBottom: "1px solid #ECECEF" }}>
                      <Link
                        href={l.href}
                        className="group flex items-center gap-3 py-3 font-sans-g text-[1.0625rem] transition-colors duration-150 hover:text-[#2F5FE0]"
                        style={{ color: "#3A3B44" }}
                      >
                        <l.Icon size={20} style={{ color: "#55565E" }} />
                        <span className="flex-1">{l.t}</span>
                        <IconArrow size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: "#9A9BA3" }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {c.facts && (
                <dl className="mt-6">
                  {c.facts.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-3" style={{ borderBottom: "1px solid #ECECEF" }}>
                      <dt className="font-sans-g text-base" style={{ color: "#55565E" }}>
                        {k}
                      </dt>
                      <dd className="font-display text-[1.625rem] leading-none tabular-nums" style={{ color: "#1F1F1F" }}>
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Btn href="/contact" size="lg">
            Start building with Blue-IQ
          </Btn>
        </div>
      </div>
    </section>
  );
}
