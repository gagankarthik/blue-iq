import Link from "next/link";
import { SA } from "@/lib/theme";
import { PRODUCTS } from "@/lib/products";
import { PageHero, CARD, CARD_EDGE, SpotWell } from "@/components/page/kit";
import { Block, StepTrack } from "@/components/page/blocks";
import { IconArrow, IconArrowUpRight } from "@/components/icons/BqIcons";
import {
  type Spot,
  SpotCapture,
  SpotSpend,
  SpotGovern,
  SpotEducation,
  SpotWorkforce,
  SpotCustom,
  SpotRead,
  SpotExtract,
  SpotScore,
  SpotRoute,
} from "@/components/icons/Spots";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /products — the portfolio, at company level.

   Each product gets one line on what it is for and a way to its own home;
   how each one works lives there, not here.

   1. Header on the wash, the three products as tiles under it.
   2. Editions and custom builds.
   3. The one AI under all of them.
   ──────────────────────────────────────────────────────────────── */

const LOOK: Record<string, { Spot: Spot; tile: string }> = {
  capture: { Spot: SpotCapture, tile: "linear-gradient(135deg, #7F9CFF 0%, #B9C8FF 60%, #DCE4FF 100%)" },
  spend: { Spot: SpotSpend, tile: "linear-gradient(135deg, #5CC8FF 0%, #A6E2FF 60%, #DDF4FF 100%)" },
  govern: { Spot: SpotGovern, tile: "linear-gradient(135deg, #9AA5FF 0%, #C9CEFF 60%, #E7E9FF 100%)" },
};

const PACKAGING: { Spot: Spot; t: string; d: string; href: string; cta: string }[] = [
  { Spot: SpotEducation, t: "Campus edition", d: "The portfolio packaged for universities and colleges.", href: "/solutions/education", cta: "Education" },
  { Spot: SpotWorkforce, t: "Workforce edition", d: "The portfolio packaged for staffing and healthcare.", href: "/solutions/workforce", cta: "Workforce" },
  { Spot: SpotCustom, t: "Custom builds", d: "When nothing in the portfolio fits, we build it on Sonar.", href: "/solutions#custom", cta: "Custom builds" },
];

const SONAR: [string, string][] = [
  ["Read", "Any document, in context."],
  ["Extract", "The fields you need, no templates."],
  ["Score", "A confidence score on every value."],
  ["Route", "Sure values on, the rest to a person."],
];

export default function ProductsClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="Products"
          id="products-h"
          title="The products we build, on one AI"
          lede="Every Blue-IQ product runs on Sonar, our document AI. Start with the one your team needs; the rest work the same way."
          primary={{ label: "Book a demo", href: "/contact?topic=A%20demo" }}
          secondary={{ label: "About Sonar", href: "/platform" }}
        >
          <ul className="grid md:grid-cols-3 gap-3">
            {PRODUCTS.map((p) => {
              const look = LOOK[p.slug];
              const A = p.external ? IconArrowUpRight : IconArrow;
              return (
                <li key={p.slug} id={p.slug} className="scroll-mt-28">
                  <a
                    href={p.href}
                    target={p.external ? "_blank" : undefined}
                    rel={p.external ? "noopener noreferrer" : undefined}
                    className={`group ${CARD} h-full flex flex-col p-2 transition-shadow duration-200 hover:shadow-[0_24px_48px_-30px_rgba(30,33,48,0.4)]`}
                    style={CARD_EDGE}
                  >
                    <span className="h-48 rounded-[18px] grid place-items-center" style={{ background: look?.tile }}>
                      <span className="grid place-items-center w-[104px] h-[104px] rounded-[24px] bg-white shadow-[0_12px_28px_-16px_rgba(30,33,48,0.35)] transition-transform duration-300 ease-out group-hover:scale-[1.04]">
                        {look && <look.Spot size={72} />}
                      </span>
                    </span>
                    <span className="flex-1 flex flex-col px-5 pt-6 pb-5 text-left">
                      <span className="font-sans-g text-[13px] font-medium uppercase tracking-[0.1em]" style={{ color: SA.faint }}>
                        {p.role}
                      </span>
                      <span className="mt-1.5 font-display text-[2rem] leading-tight" style={{ color: SA.ink }}>
                        {p.name}
                      </span>
                      <span className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
                        {p.line}
                      </span>
                      <span className="mt-auto pt-6 inline-flex items-center gap-1.5 font-sans-g text-[15px] font-medium" style={{ color: "#2348B8" }}>
                        {p.cta}
                        <A size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </PageHero>

        <Block id="editions" title="Packaged for your sector, or built for you">
          <ul className="grid md:grid-cols-3 gap-3">
            {PACKAGING.map((x) => (
              <li key={x.t}>
                <Link
                  href={x.href}
                  className={`group ${CARD} h-full flex flex-col p-7 sm:p-8 transition-[border-color,box-shadow] duration-200 hover:border-[#D4D4DA] hover:shadow-[0_16px_32px_-24px_rgba(30,33,48,0.3)]`}
                  style={CARD_EDGE}
                >
                  <SpotWell>
                    <x.Spot size={56} />
                  </SpotWell>
                  <span className="mt-6 font-sans-g text-[1.375rem] font-medium" style={{ color: SA.ink }}>
                    {x.t}
                  </span>
                  <span className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
                    {x.d}
                  </span>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 font-sans-g text-[15px] font-medium" style={{ color: "#2348B8" }}>
                    {x.cta}
                    <IconArrow size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="sonar" title="One AI under every product" sub="Whichever product you start with, Sonar reads, scores and routes the same way.">
          <StepTrack steps={SONAR} spots={[SpotRead, SpotExtract, SpotScore, SpotRoute]} />
        </Block>
      </main>
      <SiteFooter cta={{ title: "Not sure where to start?", sub: "Tell us what your team reads every day and we will show you what Sonar can do with it." }} />
    </div>
  );
}
