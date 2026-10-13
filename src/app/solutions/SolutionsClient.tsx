import Link from "next/link";
import { SA } from "@/lib/theme";
import { INDUSTRIES } from "@/lib/industries";
import { PageHero, CARD, CARD_EDGE, SpotWell } from "@/components/page/kit";
import { Block, StepTrack } from "@/components/page/blocks";
import { IconArrow, IconCheck } from "@/components/icons/BqIcons";
import { type Spot, SECTOR_SPOT, SpotCustom, SpotScale, SpotIntegrate, SpotRead, SpotChat, SpotTeam } from "@/components/icons/Spots";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /solutions — by industry, and by the work we do for you.

   1. Header on the wash; the six sectors sit under it as spot cards, so
      the page's contents are the first thing you see.
   2. Each sector as a card: what Sonar reads, what comes back.
   3. Services: custom builds, migrations, integrations.
   4. How a project runs.
   ──────────────────────────────────────────────────────────────── */

const SERVICES: { id: string; Spot: Spot; name: string; line: string; points: string[] }[] = [
  {
    id: "custom",
    Spot: SpotCustom,
    name: "Custom development",
    line: "When no product fits, we build one on Sonar.",
    points: ["Built on your real documents", "You approve the schema first", "Shipped as an API, an app, or both"],
  },
  {
    id: "migrations",
    Spot: SpotScale,
    name: "Enterprise migrations",
    line: "Replace a legacy document parser without losing history.",
    points: ["Every old field mapped or retired", "Archive re-read into the new schema", "Run side by side before cutover"],
  },
  {
    id: "integrations",
    Spot: SpotIntegrate,
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

export default function SolutionsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="Solutions"
          id="solutions-h"
          title="Ready for your sector. Built for your edge cases."
          lede="Six sectors ready today, and custom builds, migrations and integrations when you need more."
          primary={{ label: "Talk to our team", href: "/contact" }}
          secondary={{ label: "See custom builds", href: "#custom" }}
        >
          <nav aria-label="Sectors">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INDUSTRIES.map((x) => {
                const S = SECTOR_SPOT[x.id];
                return (
                  <li key={x.id}>
                    <Link
                      href={`/solutions/${x.id}`}
                      className={`group ${CARD} h-full flex items-center gap-5 p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#D4D4DA] hover:shadow-[0_16px_32px_-24px_rgba(30,33,48,0.3)]`}
                      style={CARD_EDGE}
                    >
                      <SpotWell size={72}>{S && <S size={50} />}</SpotWell>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-3 font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                          {x.name}
                          <IconArrow size={16} className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: SA.faint }} />
                        </span>
                        <span className="mt-1 block font-sans-g text-[15px] leading-[1.5]" style={{ color: SA.sub }}>
                          {x.line}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </PageHero>

        <Block id="sectors" title="What Sonar reads in each sector, and what you get back">
          <ul className="grid lg:grid-cols-2 gap-3">
            {INDUSTRIES.map((x) => {
              const S = SECTOR_SPOT[x.id];
              return (
                <li key={x.id} id={x.id} className={`scroll-mt-28 ${CARD} p-7 sm:p-8 flex flex-col`} style={CARD_EDGE}>
                  <div className="flex items-start gap-5">
                    <SpotWell size={64}>{S && <S size={44} />}</SpotWell>
                    <div className="min-w-0">
                      <h3 className="font-sans-g text-[1.375rem] font-medium" style={{ color: SA.ink }}>
                        {x.name}
                      </h3>
                      <p className="mt-1.5 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
                        {x.d}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid sm:grid-cols-2 gap-5">
                    {(
                      [
                        ["Reads", x.reads, SA.accentSoft, "#2348B8"],
                        ["Returns", x.out, "#ECFDF5", "#065F46"],
                      ] as const
                    ).map(([label, list, bg, fg]) => (
                      <div key={label}>
                        <p className="font-sans-g text-[13px] font-medium uppercase tracking-[0.1em]" style={{ color: SA.faint }}>
                          {label}
                        </p>
                        <ul className="mt-2.5 flex flex-wrap gap-1.5">
                          {list.map((r) => (
                            <li
                              key={r}
                              className="h-8 inline-flex items-center px-3 rounded-[10px] font-sans-g text-[14px]"
                              style={{ background: bg, color: fg }}
                            >
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/solutions/${x.id}`}
                    className="group mt-7 pt-5 inline-flex items-center gap-1.5 font-sans-g text-[15px] font-medium hover:underline underline-offset-4"
                    style={{ color: "#2348B8", borderTop: `1px solid ${SA.line}` }}
                  >
                    Explore {x.name}
                    <IconArrow size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Block>

        <Block
          id="services"
          title="When a product is not enough, our engineers build the rest"
          sub="Engineering work, scoped on your documents and supported by our team."
        >
          <ul className="grid md:grid-cols-3 gap-3">
            {SERVICES.map((s) => (
              <li key={s.id} id={s.id} className={`scroll-mt-28 ${CARD} p-7 sm:p-8`} style={CARD_EDGE}>
                <SpotWell>
                  <s.Spot size={56} />
                </SpotWell>
                <h3 className="mt-6 font-sans-g text-[1.375rem] font-medium" style={{ color: SA.ink }}>
                  {s.name}
                </h3>
                <p className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
                  {s.line}
                </p>
                <ul className="mt-6 grid gap-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 font-sans-g text-[15px]" style={{ color: "#3A3B44" }}>
                      <span className="grid place-items-center w-5 h-5 rounded-full shrink-0" style={{ background: SA.accent, color: "#FFFFFF" }}>
                        <IconCheck size={12} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="track" title="How a project runs" sub="We scope on your real data, never on a guess.">
          <StepTrack steps={STEPS} spots={[SpotRead, SpotChat, SpotCustom, SpotTeam]} />
        </Block>
      </main>
      <SiteFooter cta={{ title: "Tell us what your sector reads", sub: "Bring the documents that slow your team down. We will read them with Sonar, live." }} />
    </div>
  );
}
