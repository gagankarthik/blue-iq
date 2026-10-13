import { SA } from "@/lib/theme";
import { PageHero, CARD, CARD_EDGE, SpotWell } from "@/components/page/kit";
import { Block, RelatedLinks } from "@/components/page/blocks";
import { Btn } from "@/components/system/Btn";
import {
  type Spot,
  SpotWorkforce,
  SpotGovern,
  SpotSpend,
  SpotScore,
  SpotRoute,
  SpotCapture,
  SpotEducation,
  SpotCustom,
  SpotRead,
  SpotSecure,
} from "@/components/icons/Spots";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /about — who we are, as a statement rather than a brochure.

   1. Header on the wash, then one large framed card (sarvam.ai's about
      page): the three documents every business re-types.
   2. Meet Sonar: its two rules.
   3. What we build: everything on Sonar, each card a way in.
   4. How we work: three commitments.
   No founding myth, no invented customers, headcount or metrics.
   ──────────────────────────────────────────────────────────────── */

const PAIN: { Spot: Spot; t: string; d: string }[] = [
  { Spot: SpotWorkforce, t: "A new hire", d: "Resumes, licences and references, re-typed into your ATS." },
  { Spot: SpotGovern, t: "A contract", d: "Obligations buried in clauses nobody has time to read twice." },
  { Spot: SpotSpend, t: "An invoice", d: "Numbers already on the page, keyed in again by hand." },
];

const RULES: { Spot: Spot; t: string; d: string }[] = [
  { Spot: SpotScore, t: "A score on every field", d: "Not one number per file. One per value, so you can trust each one on its own." },
  { Spot: SpotRoute, t: "A flag, never a guess", d: "If Sonar cannot read a value, it says so and sends it to a person." },
];

const WORK: { Spot: Spot; t: string; d: string }[] = [
  { Spot: SpotRead, t: "We start from your files", d: "Real documents, not a demo set. The messy ones teach us most." },
  { Spot: SpotCustom, t: "We build what fits", d: "A product, an edition, or something new. Whatever reads your work best." },
  { Spot: SpotSecure, t: "We treat data as sensitive", d: "Aligned to SOC 2, HIPAA and GDPR, from the first file you send." },
];

function SpotCard({ x }: { x: { Spot: Spot; t: string; d: string } }) {
  return (
    <li className={`${CARD} p-7 sm:p-8`} style={CARD_EDGE}>
      <SpotWell>
        <x.Spot size={56} />
      </SpotWell>
      <h3 className="mt-6 font-sans-g text-[1.375rem] font-medium" style={{ color: SA.ink }}>
        {x.t}
      </h3>
      <p className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
        {x.d}
      </p>
    </li>
  );
}

export default function AboutClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="About"
          id="about-h"
          title="Every business runs on documents someone re-types"
          lede="Blue-IQ builds the products that end that work. Every one of them runs on Sonar, our document AI."
        >
          <div
            className="rounded-[32px] p-2"
            style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 30px 60px -40px rgba(30,40,90,0.35)" }}
          >
            <div className="rounded-[26px] px-6 sm:px-12 py-12 sm:py-16 text-center" style={{ background: "#F5F5F7" }}>
              <h2 className="mx-auto font-display t-h2 max-w-[24ch]" style={{ color: SA.ink }}>
                The same three documents slow every team down
              </h2>
              <p className="mt-4 mx-auto font-sans-g text-[1.0625rem] leading-[1.65] max-w-[58ch]" style={{ color: SA.sub }}>
                The information is already on the page. Someone still reads it, types it in, and checks it again. We build the products that read it once,
                carefully, and say how sure they are.
              </p>
              <ul className="mt-10 grid md:grid-cols-3 gap-3 text-left">
                {PAIN.map((x) => (
                  <SpotCard key={x.t} x={x} />
                ))}
              </ul>
            </div>
          </div>
        </PageHero>

        <Block id="sonar" title="Meet Sonar, our AI" sub="It reads a document the way a careful person does, then tells you how sure it is about every value.">
          <ul className="grid md:grid-cols-2 gap-3 max-w-[960px] mx-auto">
            {RULES.map((x) => (
              <SpotCard key={x.t} x={x} />
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Btn href="/platform" variant="secondary" size="lg">
              How Sonar works
            </Btn>
          </div>
        </Block>

        <Block id="build" title="One engine, every product we ship" sub="New products slot in on the same AI, so what you learn on one carries to the next.">
          <RelatedLinks
            items={[
              { t: "Capture", d: "Turns incoming documents into clean, structured data", href: "/products#capture", Spot: SpotCapture },
              { t: "Spend", d: "Keeps invoices in line with what was agreed", href: "/products#spend", Spot: SpotSpend },
              { t: "Govern", d: "Keeps contracts and obligations in view", href: "/products#govern", Spot: SpotGovern },
              { t: "Campus and Workforce", d: "The products, packaged for your sector", href: "/products#editions", Spot: SpotEducation },
              { t: "Custom builds", d: "When nothing fits, we build it on Sonar", href: "/solutions#custom", Spot: SpotCustom },
              { t: "Sonar", d: "The AI under every product", href: "/platform", Spot: SpotScore },
            ]}
          />
        </Block>

        <Block id="work" title="Three commitments, on every project">
          <ul className="grid md:grid-cols-3 gap-3">
            {WORK.map((x) => (
              <SpotCard key={x.t} x={x} />
            ))}
          </ul>
        </Block>
      </main>
      <SiteFooter
        cta={{ title: "Send us the documents your team re-types", sub: "We will read them with Sonar, live, and show you every score and every flag." }}
      />
    </div>
  );
}
