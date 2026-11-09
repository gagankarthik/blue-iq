import Link from "next/link";
import { BB } from "@/lib/theme";
import { INDUSTRIES } from "@/lib/industries";
import { PageHero } from "@/components/page/kit";
import { Head, Stagger } from "@/components/home/motion";
import { I, SECTOR_ICON, Tile, type Ico } from "@/components/home/icons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /solutions: find your sector, in the home page's blueprint system.

   1. Header: what this page is, and the primary action.
   2. The six sectors (#sectors) as one grid of cards: icon, name, one
      line, what Sonar reads and what comes back, a way to the sector page.
   3. Services (#services): custom builds (#custom), migrations
      (#migrations), integrations (#integrations).
   4. How a project runs (#track), four numbered steps on the page's one
      ink block.
   5. The footer CTA.
   ──────────────────────────────────────────────────────────────── */

const SERVICES: { id: string; icon: Ico; name: string; line: string; points: string[] }[] = [
  {
    id: "custom",
    icon: I.custom,
    name: "Custom development",
    line: "When no product fits, we build one on Sonar.",
    points: ["Built on your real documents", "You approve the schema first", "Shipped as an API, an app, or both"],
  },
  {
    id: "migrations",
    icon: I.migrate,
    name: "Enterprise migrations",
    line: "Replace a legacy document parser without losing history.",
    points: ["Every old field mapped or retired", "Archive re-read into the new schema", "Run side by side before cutover"],
  },
  {
    id: "integrations",
    icon: I.integrate,
    name: "Integrations",
    line: "Structured data delivered to the systems your team already uses.",
    points: ["REST API and signed webhooks", "Connectors for ATS, ERP and CLM", "Custom routes where none exist"],
  },
];

const STEPS: [string, string][] = [
  ["Send us documents", "Real files from your pipeline, the messy ones included."],
  ["Agree the output", "The fields, their types and your review line."],
  ["We build it", "On Sonar, tested on your own files."],
  ["We stay on it", "Your documents change. So do we."],
];

const LABEL = "font-mono-g text-[13px] uppercase tracking-[0.06em]";
const EDGE = { border: `1px solid ${BB.line}` } as const;

/* a seam and the section's column, as on the home page */
function Section({ id, labelledBy, children }: { id: string; labelledBy: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 px-6 sm:px-8 pb-24" aria-labelledby={labelledBy}>
      <div aria-hidden className="max-w-[1112px] mx-auto h-px mb-24" style={{ background: BB.line }} />
      <div className="max-w-[1112px] mx-auto">{children}</div>
    </section>
  );
}

export default function SolutionsClient() {
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="Solutions"
          id="solutions-h"
          title="Ready for your sector. Built for your edge cases."
          lede="Six sectors ready today, and custom builds, migrations and integrations when you need more."
          primary={{ label: "Talk to our team", href: "/contact" }}
          secondary={{ label: "See custom builds", href: "#custom" }}
        />

        {/* 1. the six sectors */}
        <Section id="sectors" labelledBy="sectors-h">
          <Head id="sectors-h" title="What Sonar reads in each sector, and what you get back" />

          <Stagger as="ul" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map((x) => {
              const G = SECTOR_ICON[x.id];
              return (
                <li key={x.id} id={x.id} className="scroll-mt-28 flex flex-col p-8 rounded-2xl bg-white" style={EDGE}>
                  {G && <Tile icon={G} />}
                  <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                    {x.name}
                  </h3>
                  <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                    {x.line}
                  </p>

                  <dl className="mt-8" style={{ borderTop: `1px solid ${BB.line}` }}>
                    {(
                      [
                        ["Reads", x.reads],
                        ["Returns", x.out],
                      ] as const
                    ).map(([label, list]) => (
                      <div key={label} className="py-4" style={{ borderBottom: `1px solid ${BB.line}` }}>
                        <dt className={LABEL} style={{ color: BB.cobalt }}>
                          {label}
                        </dt>
                        <dd className="mt-2 font-sans-g t-base" style={{ color: BB.ink2 }}>
                          {list.join(", ")}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href={`/solutions/${x.id}`}
                    className={`group mt-auto pt-8 inline-flex items-center gap-4 ${LABEL} hover:underline underline-offset-4`}
                    style={{ color: BB.cobalt }}
                  >
                    Explore {x.name}
                    <I.arrow size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </Stagger>
        </Section>

        {/* 2. services: custom builds, migrations, integrations */}
        <Section id="services" labelledBy="services-h">
          <Head
            id="services-h"
            title="When a product is not enough, our engineers build the rest"
            sub="Engineering work, scoped on your documents and supported by our team."
          />

          <Stagger as="ul" className="mt-12 grid md:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <li key={s.id} id={s.id} className="scroll-mt-28 p-8 rounded-2xl bg-white" style={EDGE}>
                <Tile icon={s.icon} />
                <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                  {s.name}
                </h3>
                <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                  {s.line}
                </p>
                <ul className="mt-8 grid gap-4">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-4 font-sans-g t-base" style={{ color: BB.ink2 }}>
                      <I.check size={16} weight="bold" aria-hidden className="mt-1 shrink-0" style={{ color: BB.cobalt }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </Stagger>
        </Section>

        {/* 3. how a project runs: the page's one ink block */}
        <section id="track" className="scroll-mt-24 px-6 sm:px-8 pb-24" aria-labelledby="track-h">
          <div className="max-w-[1112px] mx-auto px-6 lg:px-8 py-16 lg:py-24 rounded-[24px]" style={{ background: BB.ink }}>
            <Head id="track-h" tone="dark" title="How a project runs" sub="We scope on your real data, never on a guess." />

            <Stagger as="ol" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STEPS.map(([t, d], i) => (
                <li key={t} className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                  <span className={`block ${LABEL}`} style={{ color: BB.sky }}>
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-head h-card text-white">{t}</h3>
                  <p className="mt-4 font-sans-g t-base" style={{ color: "#C2C7D1" }}>
                    {d}
                  </p>
                </li>
              ))}
            </Stagger>
          </div>
        </section>
      </main>
      <SiteFooter cta={{ title: "Tell us what your sector reads", sub: "Bring the documents that slow your team down. We will read them with Sonar, live." }} />
    </div>
  );
}
