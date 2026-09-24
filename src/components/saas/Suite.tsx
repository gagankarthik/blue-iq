"use client";

import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { CaptureArt, SpendArt, GovernArt, EditionsArt, CustomArt } from "@/components/art/ProductArt";
import {
  type BqIcon,
  IconCapture,
  IconSpend,
  IconGovern,
  IconLayers,
  IconCustom,
  IconArrow,
  IconArrowUpRight,
} from "@/components/icons/BqIcons";

/* ────────────────────────────────────────────────────────────────
   The platform — a bento with real size hierarchy.

   Row 1: Capture (the foundation, widest) + Spend
   Row 2: Govern + the editions (wide)
   Row 3: custom builds, full width and horizontal

   Each tile is one border around a tinted well holding an isometric drawing,
   with the words underneath. There is no card inside a card.
   ──────────────────────────────────────────────────────────────── */

type Tile = {
  Icon: BqIcon;
  name: string;
  layer: string;
  line: string;
  href: string;
  cta: string;
  external?: boolean;
  Art: React.ComponentType;
  span: string;
};

const TILES: Tile[] = [
  {
    Icon: IconCapture,
    name: "Capture",
    layer: "Foundation",
    line: "Document data extraction for any file. Clean, structured and confidence-scored.",
    href: "https://www.parsinglab.blue-iq.ai/",
    cta: "Open Capture",
    external: true,
    Art: CaptureArt,
    span: "lg:col-span-4",
  },
  {
    Icon: IconSpend,
    name: "Spend",
    layer: "Built on Capture",
    line: "Invoice reconciliation against contracts and POs. Overbilling flagged on arrival.",
    href: "/products#spend",
    cta: "About Spend",
    Art: SpendArt,
    span: "lg:col-span-2",
  },
  {
    Icon: IconGovern,
    name: "Govern",
    layer: "Built on Capture",
    line: "AI contract review against your playbook. Every risky clause rated.",
    href: "https://govern.blue-iq.ai/",
    cta: "Open Govern",
    external: true,
    Art: GovernArt,
    span: "lg:col-span-2",
  },
  {
    Icon: IconLayers,
    name: "Campus and Workforce",
    layer: "Editions",
    line: "Capture, Spend and Govern, packaged for higher education or for staffing and healthcare.",
    href: "/products#editions",
    cta: "Compare editions",
    Art: EditionsArt,
    span: "lg:col-span-4",
  },
];

function TileCard({ t }: { t: Tile }) {
  const Arrow = t.external ? IconArrowUpRight : IconArrow;
  return (
    <a
      href={t.href}
      target={t.external ? "_blank" : undefined}
      rel={t.external ? "noopener noreferrer" : undefined}
      className={`group flex flex-col rounded-[20px] overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(10,18,48,0.28)] ${t.span}`}
      style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
    >
      <div
        className="relative flex items-center justify-center h-[200px] sm:h-[230px] px-6 py-6 [&_svg]:h-full [&_svg]:w-full [&_svg]:transition-transform [&_svg]:duration-700 group-hover:[&_svg]:scale-[1.06] group-hover:[&_svg]:-translate-y-1"
        style={{ background: SA.bg2, borderBottom: `1px solid ${SA.line}` }}
      >
        <t.Art />
      </div>
      <div className="flex-1 flex flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <t.Icon size={24} style={{ color: SA.accent }} />
          <h3 className="font-display font-semibold text-[1.2rem] tracking-[-0.02em]" style={{ color: SA.ink }}>
            {t.name}
          </h3>
          <span className="ml-auto font-sans-g text-[13px]" style={{ color: SA.faint }}>
            {t.layer}
          </span>
        </div>
        <p className="mt-4 font-sans-g text-[15px] leading-[1.65] max-w-[60ch]" style={{ color: SA.sub }}>
          {t.line}
        </p>
        <span className="mt-auto pt-6 inline-flex items-center gap-1.5 font-sans-g text-[14.5px] font-semibold" style={{ color: SA.accent }}>
          {t.cta}
          <Arrow size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

export default function Suite() {
  return (
    <section id="platform" className="relative px-5 sm:px-8 py-16 sm:py-24 scroll-mt-20" style={{ background: SA.bg2 }} aria-labelledby="suite-h">
      <div className="max-w-[1240px] mx-auto">
        <SectionHead
          id="suite-h"
          title="Document AI products for every workflow"
          sub="Extract data with Capture, reconcile spend with Spend, review contracts with Govern. Use one, bundle them in an edition, or have us build your own."
        />

        <Reveal className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-6 gap-5">
          {TILES.map((t) => (
            <TileCard key={t.name} t={t} />
          ))}

          {/* custom builds: horizontal, full width */}
          <a
            href="/solutions#custom"
            className="group lg:col-span-6 grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-stretch rounded-[20px] overflow-hidden transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(10,18,48,0.28)]"
            style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
          >
            <div
              className="flex items-center justify-center h-[210px] md:h-[260px] px-6 py-8 md:border-r [&_svg]:h-full [&_svg]:w-full [&_svg]:transition-transform [&_svg]:duration-700 group-hover:[&_svg]:scale-[1.06]"
              style={{ background: SA.bg2, borderColor: SA.line }}
            >
              <CustomArt />
            </div>
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <IconCustom size={24} style={{ color: SA.accent }} />
                <h3 className="font-display font-semibold text-[1.2rem] tracking-[-0.02em]" style={{ color: SA.ink }}>
                  Custom builds
                </h3>
              </div>
              <p className="mt-4 font-display font-medium leading-[1.3] tracking-[-0.02em] max-w-[34ch]" style={{ color: SA.ink, fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}>
                Need something else? We build it on Sonar.
              </p>
              <p className="mt-4 font-sans-g text-[15px] leading-[1.65] max-w-[56ch]" style={{ color: SA.sub }}>
                Custom document AI apps, legacy parser migrations and system integrations, built and supported by our engineers.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-sans-g text-[14.5px] font-semibold" style={{ color: SA.accent }}>
                Start a project
                <IconArrow size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
