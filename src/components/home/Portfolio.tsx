import Link from "next/link";
import { BB } from "@/lib/theme";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import { I, Tile, type Ico } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   The portfolio, original copy in the blueprint system. Five cells, exactly:
   the statement ("One AI, every product we ship", the editions, the way to
   all products) as a tall white cell on the left, and the four products as
   a two-by-two beside it on four surfaces (cobalt, white, white, ink). Each
   product is one line and a way to its own home; the company site never
   explains how a product works.
   ──────────────────────────────────────────────────────────────── */

type Card = { icon: Ico; t: string; d: string; href: string; external?: boolean; bg: string; ink: string; body: string; link: string; edge?: boolean };

const CARDS: Card[] = [
  {
    icon: I.capture,
    t: "Capture",
    d: "Turns incoming documents into clean, structured data.",
    href: "https://www.parsinglab.blue-iq.ai/",
    external: true,
    bg: BB.cobalt,
    ink: "#FFFFFF",
    body: BB.skyText,
    link: "#FFFFFF",
  },
  {
    icon: I.spend,
    t: "Spend",
    d: "Keeps invoices in line with what was agreed.",
    href: "/products#spend",
    bg: BB.panel,
    ink: BB.ink,
    body: BB.ink3,
    link: BB.cobalt,
    edge: true,
  },
  {
    icon: I.govern,
    t: "Govern",
    d: "Keeps contracts and obligations in view.",
    href: "https://govern.blue-iq.ai/",
    external: true,
    bg: BB.panel,
    ink: BB.ink,
    body: BB.ink3,
    link: BB.cobalt,
    edge: true,
  },
  {
    icon: I.custom,
    t: "Custom builds",
    d: "When nothing fits, we build it on Sonar.",
    href: "/solutions#custom",
    bg: BB.ink,
    ink: "#FFFFFF",
    body: "#C2C7D1",
    link: BB.sky,
  },
];

const POINTS = ["Campus edition, for universities and colleges", "Workforce edition, for staffing and healthcare", "Engineered and supported by our team"];

export default function Portfolio() {
  return (
    <section className="px-6 sm:px-8 pb-24" aria-labelledby="portfolio-h">
      <div aria-hidden className="max-w-[1112px] mx-auto h-px mb-24" style={{ background: BB.line }} />
      <div className="max-w-[1112px] mx-auto">
        <Head
          id="portfolio-h"
          title="Build anything with Blue-IQ"
          sub="Products ready today, editions for your sector, and custom builds when you need more."
        />

        <div className="mt-12 grid lg:grid-cols-3 gap-4">
          {/* the statement */}
          <div className="flex flex-col p-8 rounded-2xl" style={{ background: BB.panel, border: `1px solid ${BB.line}` }}>
            <h3 className="font-head h-card" style={{ color: BB.ink }}>
              One AI, <span style={{ color: BB.cobalt }}>every product</span> we ship
            </h3>
            <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
              Every Blue-IQ product runs on Sonar. Start with the one your team needs; the rest work the same way, with the same scores and the same review.
            </p>
            <ul className="mt-8 grid gap-4">
              {POINTS.map((x) => (
                <li key={x} className="flex items-start gap-4 font-sans-g t-base" style={{ color: BB.ink2 }}>
                  <I.check size={16} weight="bold" className="mt-1 shrink-0" style={{ color: BB.cobalt }} />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-12">
              <SqBtn href="/products" tone="ink" arrow>
                See all products
              </SqBtn>
            </div>
          </div>

          {/* the products */}
          <Stagger as="ul" className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {CARDS.map((c) => {
              const A = c.external ? I.external : I.arrow;
              return (
                <li key={c.t}>
                  <Link
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group flex flex-col h-full min-h-[264px] p-8 rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(14,17,22,0.25)]"
                    style={{ background: c.bg, border: c.edge ? `1px solid ${BB.line}` : undefined }}
                  >
                    <span className="flex items-start justify-between">
                      <Tile icon={c.icon} size={64} tone={c.edge ? "light" : "onColor"} />
                      <A size={16} className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: c.link }} />
                    </span>
                    <span className="mt-auto pt-12 font-head h-card" style={{ color: c.ink }}>
                      {c.t}
                    </span>
                    <span className="mt-4 font-sans-g t-base" style={{ color: c.body }}>
                      {c.d}
                    </span>
                  </Link>
                </li>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
