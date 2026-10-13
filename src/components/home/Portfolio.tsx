import { Btn } from "@/components/system/Btn";
import { IconArrow, IconArrowUpRight } from "@/components/icons/BqIcons";
import { type Spot, SpotCapture, SpotSpend, SpotGovern, SpotCustom } from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   The portfolio — sarvam.ai's API split: a tall statement card on the left
   ending in a full-width dark pill, a grid of product cards on the right.
   Each card is one line and a way to the product's own home; the company
   site never explains how a product works.
   ──────────────────────────────────────────────────────────────── */

const CARDS: { Spot: Spot; t: string; d: string; href: string; external?: boolean; well: string }[] = [
  {
    Spot: SpotCapture,
    t: "Capture",
    d: "Turns incoming documents into clean, structured data.",
    href: "https://www.parsinglab.blue-iq.ai/",
    external: true,
    well: "#EEF3FF",
  },
  { Spot: SpotSpend, t: "Spend", d: "Keeps invoices in line with what was agreed.", href: "/products#spend", well: "#E8F6FF" },
  { Spot: SpotGovern, t: "Govern", d: "Keeps contracts and obligations in view.", href: "https://govern.blue-iq.ai/", external: true, well: "#F0F0FF" },
  { Spot: SpotCustom, t: "Custom builds", d: "When nothing fits, we build it on Sonar.", href: "/solutions#custom", well: "#E9F7F0" },
];

export default function Portfolio() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32" aria-labelledby="portfolio-h">
      <div className="max-w-[1240px] mx-auto">
        <h2 id="portfolio-h" className="mx-auto text-center font-display t-h1 max-w-[18ch]" style={{ color: "#1F1F1F" }}>
          Build anything with Blue-IQ
        </h2>
        <p className="mt-4 mx-auto text-center font-sans-g text-[1.125rem] leading-[1.6] max-w-[48ch]" style={{ color: "#55565E" }}>
          Products ready today, editions for your sector, and custom builds when you need more.
        </p>

        <div className="mt-12 grid grid-cols-12 gap-3">
          {/* the statement card */}
          <div
            className="col-span-12 lg:col-span-5 rounded-[24px] p-8 sm:p-10 flex flex-col"
            style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 45%, #E9EFFF 100%)", border: "1px solid #ECECEF" }}
          >
            <h3 className="font-display text-[2rem] sm:text-[2.25rem] leading-[1.15] tracking-[-0.02em]" style={{ color: "#1F1F1F" }}>
              One AI, <span style={{ color: "#2F5FE0" }}>every product</span> we ship
            </h3>
            <p className="mt-4 font-sans-g text-[1.0625rem] leading-[1.6]" style={{ color: "#55565E" }}>
              Every Blue-IQ product runs on Sonar. Start with the one your team needs; the rest work the same way, with the same scores and the same review.
            </p>
            <ul className="mt-8 grid gap-3 font-sans-g text-base" style={{ color: "#3A3B44" }}>
              {["Campus edition, for universities and colleges", "Workforce edition, for staffing and healthcare", "Engineered and supported by our team"].map(
                (x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#2F5FE0" }} />
                    {x}
                  </li>
                )
              )}
            </ul>
            <div className="mt-auto pt-10">
              <Btn href="/products" size="lg" className="w-full">
                See all products
              </Btn>
            </div>
          </div>

          {/* the product cards */}
          <ul className="col-span-12 lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {CARDS.map((c) => {
              const A = c.external ? IconArrowUpRight : IconArrow;
              return (
                <li key={c.t}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group relative flex flex-col h-full min-h-[240px] rounded-[20px] bg-white p-7 overflow-hidden transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-20px_rgba(30,33,48,0.25)]"
                    style={{ border: "1px solid #ECECEF" }}
                  >
                    <span
                      className="grid place-items-center w-[88px] h-[88px] rounded-[18px] transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                      style={{ background: c.well }}
                    >
                      <c.Spot size={60} />
                    </span>
                    <span className="relative mt-auto pt-8 flex items-center justify-between gap-3">
                      <span className="font-sans-g text-[1.25rem] font-medium" style={{ color: "#1F1F1F" }}>
                        {c.t}
                      </span>
                      <A size={18} className="transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: "#55565E" }} />
                    </span>
                    <span className="relative mt-2 font-sans-g text-[15px] leading-[1.55]" style={{ color: "#55565E" }}>
                      {c.d}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
