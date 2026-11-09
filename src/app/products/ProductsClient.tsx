import Link from "next/link";
import { BB } from "@/lib/theme";
import { PRODUCTS, type ProductSlug } from "@/lib/products";
import { PageHero } from "@/components/page/kit";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import { I, Tile, type Ico } from "@/components/home/icons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /products: what Blue-IQ sells, in the home page's blueprint system.

   Each product gets one line on what it is for and a way to its own home;
   how each one works lives there, not here. One reading order:

   1. Header: what this page is, and the primary action.
   2. The three products, side by side on identical cards, so they compare.
   3. Editions and custom builds (#editions).
   4. The one AI under all of them (#sonar), the page's one ink block.
   5. The footer CTA.
   ──────────────────────────────────────────────────────────────── */

const ICON: Record<ProductSlug, Ico> = {
  capture: I.capture,
  spend: I.spend,
  govern: I.govern,
};

const PACKAGING: { icon: Ico; t: string; d: string; href: string; cta: string }[] = [
  { icon: I.campus, t: "Campus edition", d: "The portfolio packaged for universities and colleges.", href: "/solutions/education", cta: "Education" },
  { icon: I.workforce, t: "Workforce edition", d: "The portfolio packaged for staffing and healthcare.", href: "/solutions/workforce", cta: "Workforce" },
  { icon: I.custom, t: "Custom builds", d: "When nothing in the portfolio fits, we build it on Sonar.", href: "/solutions#custom", cta: "Custom builds" },
];

const SONAR: [string, string][] = [
  ["Read", "Any document, in context."],
  ["Extract", "The fields you need, no templates."],
  ["Score", "A confidence score on every value."],
  ["Route", "Sure values on, the rest to a person."],
];

const LABEL = "font-mono-g text-[13px] uppercase tracking-[0.06em]";
const CARD = "rounded-2xl bg-white";
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

export default function ProductsClient() {
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="Products"
          id="products-h"
          title="The products we build, on one AI"
          lede="Every Blue-IQ product runs on Sonar, our document AI. Start with the one your team needs; the rest work the same way."
          primary={{ label: "Book a demo", href: "/contact?topic=A%20demo" }}
          secondary={{ label: "About Sonar", href: "/platform" }}
        />

        {/* 1. the three products, one card each, the same shape so they compare */}
        <Section id="portfolio" labelledBy="portfolio-h">
          <Head id="portfolio-h" title="Products for every team" sub="Ready-made products for documents, spend and contracts, with editions for your sector." />

          <Stagger as="ul" className="mt-12 grid md:grid-cols-3 gap-4">
            {PRODUCTS.map((p) => {
              const A = p.external ? I.external : I.arrow;
              return (
                <li key={p.slug} id={p.slug} className="scroll-mt-28">
                  <Link
                    href={p.href}
                    target={p.external ? "_blank" : undefined}
                    rel={p.external ? "noopener noreferrer" : undefined}
                    className={`group ${CARD} flex flex-col h-full p-8 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(14,17,22,0.25)]`}
                    style={EDGE}
                  >
                    <Tile icon={ICON[p.slug]} size={64} />
                    <span className={`mt-8 ${LABEL}`} style={{ color: BB.ink3 }}>
                      {p.role}
                    </span>
                    <span className="mt-4 font-head h-card" style={{ color: BB.ink }}>
                      {p.name}
                    </span>
                    <span className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                      {p.line}
                    </span>
                    <span className="mt-auto pt-8">
                      <span className={`flex items-center justify-between gap-4 pt-6 ${LABEL}`} style={{ color: BB.cobalt, borderTop: `1px solid ${BB.line}` }}>
                        {p.cta}
                        <A size={16} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </Stagger>
        </Section>

        {/* 2. editions and custom builds */}
        <Section id="editions" labelledBy="editions-h">
          <Head id="editions-h" title="Packaged for your sector, or built for you" />

          <Stagger as="ul" className="mt-12 grid md:grid-cols-3 gap-4">
            {PACKAGING.map((x) => (
              <li key={x.t}>
                <Link
                  href={x.href}
                  className={`group ${CARD} flex flex-col h-full p-8 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(14,17,22,0.25)]`}
                  style={EDGE}
                >
                  <Tile icon={x.icon} />
                  <span className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                    {x.t}
                  </span>
                  <span className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                    {x.d}
                  </span>
                  <span className={`mt-auto pt-8 inline-flex items-center gap-4 ${LABEL}`} style={{ color: BB.cobalt }}>
                    {x.cta}
                    <I.arrow size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </Stagger>
        </Section>

        {/* 3. the one AI under every product: the page's one ink block */}
        <section id="sonar" className="scroll-mt-24 px-6 sm:px-8 pb-24" aria-labelledby="sonar-h">
          <div className="max-w-[1112px] mx-auto px-6 lg:px-8 py-16 lg:py-24 rounded-[24px]" style={{ background: BB.ink }}>
            <Head
              id="sonar-h"
              tone="dark"
              title="One AI under every product"
              sub="Whichever product you start with, Sonar reads, scores and routes the same way."
            />

            <Stagger as="ol" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SONAR.map(([t, d], i) => (
                <li key={t} className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.16)" }}>
                  <span className={`block ${LABEL}`} style={{ color: BB.sky }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-head h-card text-white">{t}</h3>
                  <p className="mt-4 font-sans-g t-base" style={{ color: "#C2C7D1" }}>
                    {d}
                  </p>
                </li>
              ))}
            </Stagger>

            <div className="mt-12 flex justify-center">
              <SqBtn href="/platform" tone="light" size="lg" arrow>
                About Sonar
              </SqBtn>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter cta={{ title: "Not sure where to start?", sub: "Tell us what your team reads every day and we will show you what Sonar can do with it." }} />
    </div>
  );
}
