import { PRODUCTS } from "@/lib/products";
import { FAQS } from "@/components/saas/faqData";
import { pageMetadata, breadcrumbLd, webPageLd, faqLd, ldScript } from "@/lib/seo";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { DetailHeader, Block, CapabilityGrid, StepTrack, OutputTable, RouteLegend, FaqList, RelatedLinks, Glance } from "@/components/page/blocks";
import FlowDiagram from "@/components/home/FlowDiagram";
import { I } from "@/components/home/icons";
import { BB } from "@/lib/theme";
import { SpotRead, SpotExtract, SpotScore, SpotRoute, SpotCapture, SpotSpend, SpotGovern, SpotEducation, SpotCustom } from "@/components/icons/Spots";

/* /platform: how Sonar works. One job, read top to bottom:
   what Sonar is (header + facts) → the pipeline, as four connected steps
   and the routing diagram → what a confidence score means in practice →
   what makes it fit your stack → the products on it → questions → close. */

const TITLE = "Sonar: The Document AI Behind Every Product";
const DESC =
  "Sonar reads any document like a careful person, scores every field it extracts, flags what it cannot read, and drafts and answers questions across your documents.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/platform",
  keywords: ["document AI engine", "confidence scoring AI", "intelligent document processing platform", "OCR and extraction AI", "Sonar AI"],
});

const HOW: [string, string][] = [
  ["Read", "OCR, layout, tables, stamps and handwriting, read in context."],
  ["Extract", "The fields your schema asks for, from any layout, no templates."],
  ["Score", "A confidence score on every value, not one per file."],
  ["Route", "Above your line to your systems; below it, to a person."],
];

const DIFFERENT: [string, string][] = [
  ["A score on every field", "Trust each value on its own: route the sure ones, review the rest."],
  ["Flags, never guesses", "When Sonar cannot read a value with confidence, it says so."],
  ["No templates", "New layouts are read on first sight; nothing to maintain."],
  ["Your schema", "Every response validated against the fields you define."],
  ["Create and Ask", "Draft documents from plain language, and ask questions across everything you hold."],
  ["Built for volume", "Up to 200 documents per API call, with a sub-second median read."],
];

const SAMPLE = [
  { field: "counterparty", value: "Ardent Freight Ltd", score: 0.99 },
  { field: "effective_date", value: "2026-03-01", score: 0.97 },
  { field: "total_value", value: "482,500.00 USD", score: 0.95 },
  { field: "payment_terms", value: "Net 45", score: 0.93 },
  { field: "signatory", value: "illegible", score: 0.58 },
];

/* one glyph per DIFFERENT card, same order */
const DIFFERENT_ICONS = [I.scores, I.flag, I.formats, I.api, I.docs, I.editions];

/* the two sides of the review line, in the words of the Route step */
const ROUTES = [
  { low: false, t: "Above your line", d: "Straight to your systems, validated against the fields you define." },
  { low: true, t: "Below it", d: "To a person, with the evidence attached. Sonar flags the value instead of guessing." },
];

const SONAR_FAQS = FAQS.filter(([q]) => /Sonar|cannot read|document types|volume/i.test(q));

export default function PlatformPage() {
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(
          webPageLd({ name: TITLE, description: DESC, path: "/platform" }),
          breadcrumbLd("Platform", "/platform"),
          faqLd(SONAR_FAQS)
        )}
      />
      <SiteNav overDark={false} />
      <main id="main">
        <DetailHeader
          here="Platform"
          title="The AI that reads your documents and tells you how sure it is"
          lede="Sonar is the engine under every Blue-IQ product. It reads like a careful person, scores every value it extracts, and flags what it cannot read instead of guessing."
          primary={{ label: "Book a demo", href: "/contact" }}
          secondary={{ label: "Read the developer guide", href: "/resources" }}
          aside={
            <Glance
              title="Sonar at a glance"
              rows={[
                ["Reads", "PDFs, Word, scans, photos, exports"],
                ["Returns", "Schema-validated JSON"],
                ["Confidence", "A score on every field"],
                ["Powers", "Capture, Spend, Govern, editions"],
              ]}
            />
          }
        />

        <Block
          seam
          id="how"
          title="Four steps, the same in every product"
          sub="Every document goes through the same pipeline, whichever product it arrives in."
        >
          <StepTrack steps={HOW} spots={[SpotRead, SpotExtract, SpotScore, SpotRoute]} />
          <figure className="mt-4 rounded-2xl bg-white" style={{ border: `1px solid ${BB.line}` }}>
            <div className="overflow-x-auto p-8" tabIndex={0} role="region" aria-label="How Sonar routes a document">
              <div className="min-w-[560px] max-w-[760px] mx-auto">
                <FlowDiagram />
              </div>
            </div>
            <figcaption className="px-8 pb-8 font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.ink3 }}>
              Documents in, sure values to your systems, uncertain ones to a review queue
            </figcaption>
          </figure>
        </Block>

        <Block
          seam
          id="confidence"
          title="Five fields from one contract"
          sub="Four go straight to your systems. One is flagged for a person, because Sonar could not read the signature with confidence."
        >
          <div className="grid lg:grid-cols-3 gap-4 items-start">
            <div className="lg:col-span-2">
              <OutputTable caption="Sample output · review line 0.90" rows={SAMPLE} />
            </div>
            <RouteLegend rows={ROUTES} />
          </div>
        </Block>

        <Block seam id="different" title="Built to be trusted, value by value">
          <CapabilityGrid items={DIFFERENT} icons={DIFFERENT_ICONS} />
        </Block>

        <Block seam id="products" title="Every product runs on the same engine">
          <RelatedLinks
            items={[
              ...PRODUCTS.map((p) => ({
                t: p.name,
                d: p.line,
                href: `/products#${p.slug}`,
                Spot: { capture: SpotCapture, spend: SpotSpend, govern: SpotGovern }[p.slug],
              })),
              { t: "Editions", d: "Campus and Workforce, packaged by sector", href: "/products#editions", Spot: SpotEducation },
              { t: "Custom builds", d: "When nothing fits, we build it on Sonar", href: "/solutions#custom", Spot: SpotCustom },
            ]}
          />
        </Block>

        <Block seam id="questions" title="Sonar, answered">
          <FaqList faqs={SONAR_FAQS} />
        </Block>
      </main>
      <SiteFooter
        cta={{
          title: "See Sonar read your hardest document",
          sub: "Book a demo and we will process your own files live: every field, every score, every flag.",
        }}
      />
    </div>
  );
}
