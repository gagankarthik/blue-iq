import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { INDUSTRIES, industryById } from "@/lib/industries";
import { pageMetadata, breadcrumbLd, faqLd, ldScript, SITE, ORG_ID } from "@/lib/seo";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { DetailHeader, Block, FaqList, RelatedLinks, Glance, StepTrack } from "@/components/page/blocks";
import { SA } from "@/lib/theme";
import { SECTOR_SPOT, SpotChat, SpotTeam, SpotRead, SpotIntegrate } from "@/components/icons/Spots";

/* /solutions/it · /education · /workforce · /healthcare · /legal · /procurement
   One template, six static pages. Order: the job → the problem → what
   Sonar reads and returns → how a pilot runs →
   questions → other sectors. */

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
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(serviceLd, breadcrumbLd(["Solutions", "/solutions"], [x.name, path]), faqLd(x.faqs))}
      />
      <SiteNav overDark={false} />
      <main id="main">
        <DetailHeader
          here={x.name}
          trail={[["Solutions", "/solutions"]]}
          eyebrow={`Document AI for ${x.noun}`}
          title={x.h}
          lede={x.d}
          primary={{ label: "Talk to our team", href: "/contact" }}
          secondary={{ label: "See all sectors", href: "/solutions" }}
          aside={
            <Glance
              title="At a glance"
              rows={[
                ["Reads", x.reads.slice(0, 3).join(", ")],
                ["Returns", x.out.join(", ")],
                ["Uncertain values", "Flagged for a person"],
              ]}
            />
          }
        />

        <Block kicker="The problem" title="What slows your team down today" sub={x.problem}>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              ["What Sonar reads", x.reads],
              ["What comes back", x.out],
            ].map(([label, list], k) => (
              <div key={label as string} className="rounded-[24px] bg-white p-7 sm:p-8" style={{ border: `1px solid ${SA.line}` }}>
                <p className="font-sans-g text-[1.25rem] font-medium" style={{ color: SA.ink }}>
                  {label as string}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {(list as string[]).map((r) => (
                    <li
                      key={r}
                      className="h-10 inline-flex items-center px-4 rounded-[12px] font-sans-g text-[15px]"
                      style={{ background: k ? "#ECFDF5" : SA.accentSoft, color: k ? "#065F46" : "#2348B8" }}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        <Block kicker="Getting started" title="How a pilot runs">
          <StepTrack steps={PILOT} spots={[SpotRead, SpotChat, SpotTeam, SpotIntegrate]} />
        </Block>

        <Block tone="tint" kicker="Questions" title="Common questions">
          <FaqList faqs={x.faqs} />
        </Block>

        <Block kicker="Other sectors" title="One AI, tuned to each sector's paperwork">
          <RelatedLinks items={others.map((o) => ({ t: o.name, d: o.line, href: `/solutions/${o.id}`, Spot: SECTOR_SPOT[o.id] }))} />
        </Block>
      </main>
      <SiteFooter cta={{ title: `Bring your ${x.noun} documents`, sub: "We will read them with Sonar, live, and show you every score and every flag." }} />
    </div>
  );
}
