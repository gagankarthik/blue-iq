import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { INDUSTRIES, industryById } from "@/lib/industries";
import { pageMetadata, breadcrumbLd, faqLd, ldScript, SITE, ORG_ID } from "@/lib/seo";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { DetailHeader, Block, FaqList, RelatedLinks, StepTrack } from "@/components/page/blocks";
import { BB } from "@/lib/theme";
import { Stagger } from "@/components/home/motion";
import { I, SECTOR_ICON, Tile } from "@/components/home/icons";

/* /solutions/it · /education · /workforce · /healthcare · /legal · /procurement
   One template, six static pages: "Blue-IQ for <sector>". Order: the job
   (header) → the problem, in one card → what Sonar reads and what your team
   gets back, as two columns → how a pilot runs → questions → other
   sectors → close. */

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((x) => ({ id: x.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const x = industryById((await params).id);
  if (!x) return {};
  return pageMetadata({ title: x.title, description: x.description, path: `/solutions/${x.id}` });
}

const PILOT: [string, string][] = [
  ["Send us documents", "Real files from your pipeline, the messy ones included."],
  ["Agree the output", "The fields you need, their types, and your review line."],
  ["See it run", "Sonar reads your files live; every value comes back scored."],
  ["Go to production", "Connected to your systems over REST, webhooks or connectors."],
];

const EDGE = { border: `1px solid ${BB.line}` } as const;

/* the two columns: what goes in, what comes back */
const COLUMNS = (reads: string[], out: string[]) => [
  { t: "What Sonar reads", icon: I.formats, mark: I.docs, items: reads, first: true },
  { t: "What comes back", icon: I.integrate, mark: I.check, items: out, first: false },
];

export default async function IndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const x = industryById((await params).id);
  if (!x) notFound();

  const path = `/solutions/${x.id}`;
  const others = INDUSTRIES.filter((o) => o.id !== x.id);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}${path}#service`,
    name: x.title,
    serviceType: "Intelligent document processing",
    description: x.description,
    provider: { "@id": ORG_ID },
    url: `${SITE}${path}`,
  };

  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(serviceLd, breadcrumbLd(["Solutions", "/solutions"], [x.name, path]), faqLd(x.faqs))}
      />
      <SiteNav overDark={false} />
      <main id="main">
        <DetailHeader
          here={x.name}
          trail={[["Solutions", "/solutions"]]}
          title={x.h}
          lede={x.d}
          primary={{ label: "Talk to our team", href: "/contact" }}
          secondary={{ label: "See all sectors", href: "/solutions" }}
        />

        <Block seam id="problem" title="What slows your team down today">
          <div className="rounded-2xl bg-white p-8 flex flex-col sm:flex-row gap-8 sm:items-center" style={EDGE}>
            <Tile icon={SECTOR_ICON[x.id]} size={64} />
            <p className="font-sans-g t-sub max-w-[60ch]" style={{ color: BB.ink }}>
              {x.problem}
            </p>
          </div>
        </Block>

        <Block seam id="reads" title="What Sonar reads, and what your team gets back">
          <Stagger className="grid md:grid-cols-2 gap-4">
            {COLUMNS(x.reads, x.out).map((c) => (
              <div key={c.t} className="relative rounded-2xl bg-white p-8" style={{ ...EDGE, zIndex: c.first ? 2 : 1 }}>
                <span className="flex items-center gap-4">
                  <Tile icon={c.icon} size={40} />
                  <h3 className="font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.cobaltDeep }}>
                    {c.t}
                  </h3>
                </span>
                <ul className="mt-8">
                  {c.items.map((r) => (
                    <li key={r} className="flex items-start gap-4 py-4 font-sans-g t-base" style={{ color: BB.ink2, borderTop: `1px solid ${BB.line}` }}>
                      <c.mark size={16} weight="bold" aria-hidden className="mt-1 shrink-0" style={{ color: BB.cobalt }} />
                      {r}
                    </li>
                  ))}
                </ul>
                {c.first && (
                  <span
                    aria-hidden
                    className="hidden md:grid absolute top-1/2 -right-6 -translate-y-1/2 w-8 h-8 place-items-center rounded-[8px] bg-white"
                    style={{ ...EDGE, color: BB.cobalt }}
                  >
                    <I.arrow size={16} />
                  </span>
                )}
              </div>
            ))}
          </Stagger>
          <p
            className="mt-4 inline-flex items-center gap-4 rounded-[12px] px-4 py-4 font-sans-g t-base"
            style={{ background: "#FFF6E0", color: BB.amberInk, border: `1px solid ${BB.amber}` }}
          >
            <I.flag size={20} aria-hidden className="shrink-0" />
            Uncertain values are flagged for a person.
          </p>
        </Block>

        <Block seam id="pilot" title="How a pilot runs">
          <StepTrack steps={PILOT} icons={[I.docs, I.contact, I.scores, I.integrate]} />
        </Block>

        <Block seam id="questions" title="Common questions">
          <FaqList faqs={x.faqs} />
        </Block>

        <Block seam id="sectors" title="One AI, tuned to each sector's paperwork">
          <RelatedLinks items={others.map((o) => ({ t: o.name, d: o.line, href: `/solutions/${o.id}`, icon: SECTOR_ICON[o.id] }))} />
        </Block>
      </main>
      <SiteFooter cta={{ title: `Bring your ${x.noun} documents`, sub: "We will read them with Sonar, live, and show you every score and every flag." }} />
    </div>
  );
}
