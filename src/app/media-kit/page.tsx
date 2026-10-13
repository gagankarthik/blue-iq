/* eslint-disable @next/next/no-img-element -- brand files are shown as the exact SVG/PNG people download */
import Link from "next/link";
import { Hanken_Grotesk } from "next/font/google";
import { SA } from "@/lib/theme";
import { pageMetadata, breadcrumbLd, webPageLd, ldScript } from "@/lib/seo";
import { PageHero, CARD, CARD_EDGE } from "@/components/page/kit";
import { Block } from "@/components/page/blocks";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CopyText from "./CopyText";

/* /media-kit — everything a journalist, partner or integrator needs to show
   Blue-IQ correctly: the logo and mark as files, the rules for using them,
   colour, type, how to write the name, and a description to copy. Every
   file listed is in /public/brand; the zip holds all of them. */

const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["700"], display: "swap" });

const TITLE = "Media Kit: Logos, Colours and Brand Assets";
const DESC =
  "Download the Blue-IQ logo, mark and app icon in SVG and PNG, with clear-space rules, brand colours, typefaces and an approved company description.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/media-kit",
  keywords: ["Blue-IQ logo", "Blue-IQ media kit", "Blue-IQ press kit", "brand assets"],
});

const SHORT =
  "Blue-IQ is a document AI company. Its products, Capture, Spend and Govern, turn contracts, invoices, resumes and licences into structured data. Every product runs on Sonar, Blue-IQ's AI, which scores every value it reads and sends anything uncertain to a person.";
const LONG =
  "Blue-IQ is a document AI company. Its products turn the paperwork businesses run on into answers they can act on: Capture structures incoming documents, Spend checks invoices against what was agreed, and Govern keeps contracts and obligations in view. Campus and Workforce editions package them for higher education, staffing and healthcare, and the Blue-IQ team builds custom document AI when no product fits. Every product runs on Sonar, Blue-IQ's AI, which scores every value it extracts and routes anything uncertain to a person instead of guessing. Blue-IQ's data handling is aligned to SOC 2, HIPAA and GDPR.";

const LOGOS: { t: string; file: string; bg: string; edge?: boolean }[] = [
  { t: "Primary, on light", file: "logo", bg: "#FFFFFF", edge: true },
  { t: "On dark", file: "logo-on-dark", bg: "#0F172A" },
  { t: "White, on brand blue", file: "logo-white", bg: "#2F5FE0" },
  { t: "Black, one colour", file: "logo-black", bg: "#FFFFFF", edge: true },
];

const MARKS: { t: string; file: string; bg: string; edge?: boolean }[] = [
  { t: "Mark, blue", file: "mark", bg: "#FFFFFF", edge: true },
  { t: "Mark, ink", file: "mark-ink", bg: "#FFFFFF", edge: true },
  { t: "App icon", file: "tile", bg: "#F3F3F5" },
  { t: "App icon, night", file: "tile-night", bg: "#F3F3F5" },
];

const COLOURS: { n: string; hex: string; rgb: string; role: string; ink: string }[] = [
  { n: "Signal blue", hex: "#2F5FE0", rgb: "47 95 224", role: "The mark, links, highlights", ink: "#FFFFFF" },
  { n: "Ink", hex: "#0F1B3D", rgb: "15 27 61", role: "The wordmark and headlines", ink: "#FFFFFF" },
  { n: "Night", hex: "#0F172A", rgb: "15 23 42", role: "Dark backgrounds", ink: "#FFFFFF" },
  { n: "Paper", hex: "#FAFAFA", rgb: "250 250 250", role: "Page background", ink: "#0F1B3D" },
  { n: "Blue on dark", hex: "#7FA2FF", rgb: "127 162 255", role: "The mark on dark backgrounds", ink: "#0F1B3D" },
  { n: "Cyan", hex: "#34C2FF", rgb: "52 194 255", role: "Illustration only, never text", ink: "#0F1B3D" },
];

const DONTS: { t: string; style: React.CSSProperties; bg: string }[] = [
  { t: "Don't stretch or squash it", style: { transform: "scaleX(1.45)" }, bg: "#FFFFFF" },
  { t: "Don't rotate it", style: { transform: "rotate(-12deg)" }, bg: "#FFFFFF" },
  { t: "Don't recolour it", style: { filter: "hue-rotate(140deg) saturate(1.6)" }, bg: "#FFFFFF" },
  { t: "Don't place it on low contrast", style: {}, bg: "#5B7BEA" },
];

function FileLinks({ file }: { file: string }) {
  return (
    <div className="flex gap-2">
      {["svg", "png"].map((ext) => (
        <a
          key={ext}
          href={`/brand/${file}.${ext}`}
          download
          className="h-9 px-3.5 inline-flex items-center rounded-full font-sans-g text-[13.5px] font-medium bg-white border border-[#DEDEE3] text-[#1F1F1F] transition-colors duration-150 hover:border-[#8A8B94]"
        >
          {ext.toUpperCase()}
          <span className="sr-only"> of {file}</span>
        </a>
      ))}
    </div>
  );
}

function AssetCard({ t, file, bg, edge, tall }: { t: string; file: string; bg: string; edge?: boolean; tall?: boolean }) {
  return (
    <li className={`${CARD} p-2 flex flex-col`} style={CARD_EDGE}>
      <div
        className={`${tall ? "h-48" : "h-40"} rounded-[18px] grid place-items-center px-8`}
        style={{ background: bg, border: edge ? `1px solid ${SA.line}` : undefined }}
      >
        <img src={`/brand/${file}.svg`} alt={`Blue-IQ ${t.toLowerCase()}`} className={tall ? "h-12 w-auto" : "h-20 w-auto"} />
      </div>
      <div className="flex items-center justify-between gap-3 px-3 pt-4 pb-2">
        <span className="font-sans-g text-[15px] font-medium" style={{ color: SA.ink }}>
          {t}
        </span>
        <FileLinks file={file} />
      </div>
    </li>
  );
}

export default function MediaKitPage() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(webPageLd({ name: TITLE, description: DESC, path: "/media-kit" }), breadcrumbLd("Media kit", "/media-kit"))}
      />
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="Media kit"
          id="media-h"
          title="The Blue-IQ media kit"
          lede="Logos, colours, type and an approved description, for press, partners and anyone integrating with Blue-IQ."
          primary={{ label: "Download everything (.zip)", href: "/brand/blue-iq-media-kit.zip" }}
          secondary={{ label: "Ask the team", href: "/contact?topic=Something%20else" }}
        >
          <div
            className="rounded-[32px] p-2"
            style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 30px 60px -40px rgba(30,40,90,0.35)" }}
          >
            <div className="grid md:grid-cols-2 gap-2">
              <div className="h-56 sm:h-72 rounded-[26px] bg-white grid place-items-center" style={{ border: `1px solid ${SA.line}` }}>
                <img src="/brand/logo.svg" alt="Blue-IQ logo" className="h-14 sm:h-20 w-auto" />
              </div>
              <div className="h-56 sm:h-72 rounded-[26px] grid place-items-center" style={{ background: "#0F172A" }}>
                <img src="/brand/logo-on-dark.svg" alt="Blue-IQ logo on dark" className="h-14 sm:h-20 w-auto" />
              </div>
            </div>
          </div>
        </PageHero>

        <Block id="logo" title="Logo" sub="Use the primary logo wherever you can. Use the one-colour versions only where colour is not available.">
          <ul className="grid md:grid-cols-2 gap-3">
            {LOGOS.map((l) => (
              <AssetCard key={l.file} {...l} tall />
            ))}
          </ul>
        </Block>

        <Block
          id="mark"
          title="Mark and app icon"
          sub="The mark reads as a b, and turned 180° as a q: Blue, and IQ. Use it alone only where the name already appears nearby, or as an icon."
        >
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MARKS.map((m) => (
              <AssetCard key={m.file} {...m} />
            ))}
          </ul>
        </Block>

        <Block
          id="space"
          title="Give it room"
          sub="Keep clear space around the logo equal to the width of the mark, and never set it smaller than the minimums below."
        >
          <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-3">
            <div className={`${CARD} p-6 sm:p-10 grid place-items-center`} style={CARD_EDGE}>
              <div className="relative p-6 sm:p-10" style={{ outline: "1.5px dashed #2F5FE0", outlineOffset: 0 }}>
                <div style={{ outline: "1px solid #DCE5FF" }}>
                  <img src="/brand/logo.svg" alt="" className="h-12 sm:h-16 w-auto" />
                </div>
                {[
                  "top-1 left-1/2 -translate-x-1/2",
                  "bottom-1 left-1/2 -translate-x-1/2",
                  "left-1.5 top-1/2 -translate-y-1/2",
                  "right-1.5 top-1/2 -translate-y-1/2",
                ].map((pos) => (
                  <span key={pos} aria-hidden className={`absolute ${pos} font-mono-g text-[12px]`} style={{ color: "#2348B8" }}>
                    x
                  </span>
                ))}
              </div>
              <p className="mt-6 font-sans-g text-[14px] text-center" style={{ color: SA.sub }}>
                x = the width of the mark
              </p>
            </div>
            <div className={`${CARD} p-6 sm:p-8 flex flex-col gap-6`} style={CARD_EDGE}>
              <p className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                Minimum sizes
              </p>
              <div className="flex items-end justify-between gap-4" style={{ borderBottom: `1px solid ${SA.line}`, paddingBottom: 20 }}>
                <img src="/brand/logo.svg" alt="" style={{ width: 96, height: "auto" }} />
                <span className="font-sans-g text-[14px]" style={{ color: SA.sub }}>
                  Logo: 96 px wide · 25 mm in print
                </span>
              </div>
              <div className="flex items-end justify-between gap-4">
                <img src="/brand/mark.svg" alt="" style={{ width: 16, height: 16 }} />
                <span className="font-sans-g text-[14px]" style={{ color: SA.sub }}>
                  Mark: 16 px · 5 mm in print
                </span>
              </div>
            </div>
          </div>
        </Block>

        <Block id="misuse" title="Please don't" sub="The logo is a drawn shape, not type. Use the files as they are.">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DONTS.map((d) => (
              <li key={d.t} className={`${CARD} p-2 flex flex-col`} style={CARD_EDGE}>
                <div className="h-40 rounded-[18px] grid place-items-center overflow-hidden" style={{ background: d.bg, border: `1px solid ${SA.line}` }}>
                  <img src="/brand/logo.svg" alt="" className="h-9 w-auto" style={d.style} />
                </div>
                <p className="flex items-center gap-2 px-3 pt-4 pb-2 font-sans-g text-[15px]" style={{ color: SA.ink }}>
                  <span
                    className="h-6 px-2 inline-flex items-center rounded-[6px] text-[12px] font-semibold"
                    style={{ background: "#FEE2E2", color: "#991B1B" }}
                  >
                    ✕ Don&apos;t
                  </span>
                  {d.t.replace("Don't ", "")}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          id="colour"
          title="Colour"
          sub="Signal blue carries the brand. Ink and night carry the type and the dark surfaces. Cyan is for illustration only."
        >
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COLOURS.map((c) => (
              <li key={c.hex} className={`${CARD} p-2`} style={CARD_EDGE}>
                <div
                  className="h-28 rounded-[18px] p-4 flex items-end font-sans-g text-[15px] font-medium"
                  style={{ background: c.hex, color: c.ink, border: c.hex === "#FAFAFA" ? `1px solid ${SA.line}` : undefined }}
                >
                  {c.n}
                </div>
                <dl className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-3 gap-y-1 px-3 pt-4 pb-2 font-sans-g text-[14px]">
                  <dt style={{ color: SA.faint }}>HEX</dt>
                  <dd className="font-mono-g" style={{ color: SA.ink }}>
                    {c.hex}
                  </dd>
                  <dt style={{ color: SA.faint }}>RGB</dt>
                  <dd className="font-mono-g" style={{ color: SA.ink }}>
                    {c.rgb}
                  </dd>
                  <dt style={{ color: SA.faint }}>Use</dt>
                  <dd style={{ color: SA.sub }}>{c.role}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="type" title="Typography" sub="Three families, each with one job.">
          <ul className="grid lg:grid-cols-3 gap-3">
            <li className={`${CARD} p-7 sm:p-8 flex flex-col gap-4`} style={CARD_EDGE}>
              <span className={`${hanken.className} text-[56px] leading-none tracking-[-0.04em]`} style={{ color: SA.ink }}>
                blue-iq
              </span>
              <p className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                Hanken Grotesk Bold
              </p>
              <p className="font-sans-g text-[15px] leading-[1.6]" style={{ color: SA.sub }}>
                The wordmark only, lowercase, tracking −40. It ships outlined in the logo files, so you never need to set it.
              </p>
            </li>
            <li className={`${CARD} p-7 sm:p-8 flex flex-col gap-4`} style={CARD_EDGE}>
              <span className="font-display text-[56px] leading-none tracking-[-0.02em]" style={{ color: SA.ink }}>
                Aa Gg
              </span>
              <p className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                Newsreader
              </p>
              <p className="font-sans-g text-[15px] leading-[1.6]" style={{ color: SA.sub }}>
                Headlines, regular weight, tight tracking. A calm serif for the things we say out loud.
              </p>
            </li>
            <li className={`${CARD} p-7 sm:p-8 flex flex-col gap-4`} style={CARD_EDGE}>
              <span className="font-sans-g text-[56px] leading-none font-medium tracking-[-0.02em]" style={{ color: SA.ink }}>
                Aa Gg
              </span>
              <p className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                Figtree
              </p>
              <p className="font-sans-g text-[15px] leading-[1.6]" style={{ color: SA.sub }}>
                Interface and body copy, in regular, medium and semibold. All three families are free on Google Fonts.
              </p>
            </li>
          </ul>
        </Block>

        <Block id="name" title="Name and description" sub="How to write about us, and two descriptions you can use as they are.">
          <div className="grid lg:grid-cols-3 gap-3">
            <div className={`${CARD} p-7 sm:p-8`} style={CARD_EDGE}>
              <p className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                Writing the name
              </p>
              <ul className="mt-4 grid gap-3 font-sans-g text-[15px] leading-[1.55]" style={{ color: SA.sub }}>
                <li>
                  In text, always <b style={{ color: SA.ink }}>Blue-IQ</b>: capital B, a hyphen, IQ in capitals.
                </li>
                <li>Not Blue IQ, BlueIQ, Blue-iq or Blueiq. The lowercase form lives only in the logo.</li>
                <li>
                  Products: <b style={{ color: SA.ink }}>Capture</b>, <b style={{ color: SA.ink }}>Spend</b>, <b style={{ color: SA.ink }}>Govern</b>. Our AI is{" "}
                  <b style={{ color: SA.ink }}>Sonar</b>.
                </li>
              </ul>
            </div>
            {[
              ["Short description", SHORT],
              ["Long description", LONG],
            ].map(([t, text]) => (
              <div key={t} className={`${CARD} p-7 sm:p-8 flex flex-col`} style={CARD_EDGE}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                    {t}
                  </p>
                  <CopyText text={text} label={t.toLowerCase()} />
                </div>
                <p className="mt-4 font-sans-g text-[15px] leading-[1.65]" style={{ color: SA.sub }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-sans-g text-[15px]" style={{ color: SA.sub }}>
            Need something that isn&apos;t here?{" "}
            <Link href="/contact?topic=Something%20else" className="font-medium underline underline-offset-4" style={{ color: "#2348B8" }}>
              Ask the team
            </Link>
            .
          </p>
        </Block>
      </main>
      <SiteFooter cta={{ title: "Writing about Blue-IQ?", sub: "Ask for anything that is not in the kit. A person from our team will reply." }} />
    </div>
  );
}
