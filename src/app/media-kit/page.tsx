/* eslint-disable @next/next/no-img-element -- brand files are shown as the exact SVG/PNG people download */
import Link from "next/link";
import { Hanken_Grotesk } from "next/font/google";
import { BB, SA } from "@/lib/theme";
import { pageMetadata, breadcrumbLd, webPageLd, ldScript } from "@/lib/seo";
import { PageHero, WRAP } from "@/components/page/kit";
import { Head, Stagger } from "@/components/home/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import CopyText from "./CopyText";

/* /media-kit: one job, get the brand right. Reading order:
     1. the header (what this is + download everything),
     2. the files: logo, then mark and app icon,
     3. the rules: clear space and minimum sizes, then what not to do,
     4. the system: colour, then type,
     5. the words: how to write the name, two descriptions to copy.
   Every file listed is in /public/brand; the zip holds all of them. The
   swatches and previews document the real brand files, so their colour
   values are the brand's, not the site's. */

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

const CARD = "rounded-2xl bg-white overflow-hidden";
const EDGE = { border: `1px solid ${BB.line}` } as const;
const MONO = "font-mono-g text-[13px] uppercase tracking-[0.06em]";

/* one section: heading, one line, then its content, all in the column */
function Section({ id, title, sub, children }: { id: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <section id={id} className="pb-24 scroll-mt-24" aria-labelledby={`${id}-h`}>
      <div className={WRAP}>
        <div aria-hidden className="h-px mb-24" style={{ background: BB.line }} />
        <Head id={`${id}-h`} title={title} sub={sub} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function FileLinks({ file }: { file: string }) {
  return (
    <div className="flex gap-2">
      {["svg", "png"].map((ext) => (
        <a
          key={ext}
          href={`/brand/${file}.${ext}`}
          download
          className={`h-10 px-4 inline-flex items-center rounded-[8px] bg-white border border-[#8A8B94] text-[#0E1116] font-medium transition-colors duration-150 hover:border-[#0E1116] hover:bg-[#E7EAF0] ${MONO}`}
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
    <li className={`${CARD} flex flex-col`} style={EDGE}>
      <div className={`${tall ? "h-48" : "h-40"} grid place-items-center px-8`} style={{ background: bg, borderBottom: `1px solid ${edge ? BB.line : bg}` }}>
        <img src={`/brand/${file}.svg`} alt={`Blue-IQ ${t.toLowerCase()}`} className={tall ? "h-12 w-auto" : "h-20 w-auto"} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <span className="font-sans-g t-base font-medium" style={{ color: BB.ink }}>
          {t}
        </span>
        <FileLinks file={file} />
      </div>
    </li>
  );
}

export default function MediaKitPage() {
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
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
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-56 sm:h-72 rounded-2xl bg-white grid place-items-center" style={EDGE}>
              <img src="/brand/logo.svg" alt="Blue-IQ logo" className="h-14 sm:h-20 w-auto" />
            </div>
            <div className="h-56 sm:h-72 rounded-2xl grid place-items-center" style={{ background: "#0F172A" }}>
              <img src="/brand/logo-on-dark.svg" alt="Blue-IQ logo on dark" className="h-14 sm:h-20 w-auto" />
            </div>
          </div>
        </PageHero>

        {/* 2: the files */}
        <Section id="logo" title="Logo" sub="Use the primary logo wherever you can. Use the one-colour versions only where colour is not available.">
          <Stagger as="ul" className="grid md:grid-cols-2 gap-4">
            {LOGOS.map((l) => (
              <AssetCard key={l.file} {...l} tall />
            ))}
          </Stagger>
        </Section>

        <Section
          id="mark"
          title="Mark and app icon"
          sub="The mark reads as a b, and turned 180° as a q: Blue, and IQ. Use it alone only where the name already appears nearby, or as an icon."
        >
          <Stagger as="ul" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MARKS.map((m) => (
              <AssetCard key={m.file} {...m} />
            ))}
          </Stagger>
        </Section>

        {/* 3: the rules */}
        <Section
          id="space"
          title="Give it room"
          sub="Keep clear space around the logo equal to the width of the mark, and never set it smaller than the minimums below."
        >
          <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4">
            <div className={`${CARD} p-8 grid place-items-center`} style={EDGE}>
              <div className="relative p-8 sm:p-12" style={{ outline: `1.5px dashed ${BB.cobalt}`, outlineOffset: 0 }}>
                <div style={{ outline: `1px solid ${BB.sky}` }}>
                  <img src="/brand/logo.svg" alt="" className="h-12 sm:h-16 w-auto" />
                </div>
                {[
                  "top-1 left-1/2 -translate-x-1/2",
                  "bottom-1 left-1/2 -translate-x-1/2",
                  "left-2 top-1/2 -translate-y-1/2",
                  "right-2 top-1/2 -translate-y-1/2",
                ].map((pos) => (
                  <span key={pos} aria-hidden className={`absolute ${pos} font-mono-g text-[13px]`} style={{ color: BB.cobalt }}>
                    x
                  </span>
                ))}
              </div>
              <p className="mt-8 font-sans-g t-base" style={{ color: BB.ink3 }}>
                x = the width of the mark
              </p>
            </div>
            <div className={`${CARD} p-8 flex flex-col`} style={EDGE}>
              <h3 className="font-head h-card" style={{ color: BB.ink }}>
                Minimum sizes
              </h3>
              <dl className="mt-8">
                <div className="flex items-end justify-between gap-4 py-4" style={{ borderTop: `1px solid ${BB.line}` }}>
                  <dt>
                    <img src="/brand/logo.svg" alt="" style={{ width: 96, height: "auto" }} />
                  </dt>
                  <dd className="font-sans-g t-base text-right" style={{ color: BB.ink3 }}>
                    Logo: 96 px wide · 25 mm in print
                  </dd>
                </div>
                <div className="flex items-end justify-between gap-4 py-4" style={{ borderTop: `1px solid ${BB.line}` }}>
                  <dt>
                    <img src="/brand/mark.svg" alt="" style={{ width: 16, height: 16 }} />
                  </dt>
                  <dd className="font-sans-g t-base text-right" style={{ color: BB.ink3 }}>
                    Mark: 16 px · 5 mm in print
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>

        <Section id="misuse" title="Please don't" sub="The logo is a drawn shape, not type. Use the files as they are.">
          <Stagger as="ul" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DONTS.map((d) => (
              <li key={d.t} className={`${CARD} flex flex-col`} style={EDGE}>
                <div className="h-40 grid place-items-center overflow-hidden" style={{ background: d.bg, borderBottom: `1px solid ${BB.line}` }}>
                  <img src="/brand/logo.svg" alt="" className="h-9 w-auto" style={d.style} />
                </div>
                <p className="px-6 py-4 font-sans-g t-base font-medium" style={{ color: BB.ink }}>
                  {d.t}
                </p>
              </li>
            ))}
          </Stagger>
        </Section>

        {/* 4: the system */}
        <Section
          id="colour"
          title="Colour"
          sub="Signal blue carries the brand. Ink and night carry the type and the dark surfaces. Cyan is for illustration only."
        >
          <Stagger as="ul" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOURS.map((c) => (
              <li key={c.hex} className={CARD} style={EDGE}>
                <div
                  className="h-28 p-6 flex items-end font-sans-g t-base font-medium"
                  style={{ background: c.hex, color: c.ink, borderBottom: `1px solid ${c.hex === "#FAFAFA" ? BB.line : c.hex}` }}
                >
                  {c.n}
                </div>
                <dl className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 gap-y-2 px-6 py-6 font-sans-g t-base">
                  <dt className={MONO} style={{ color: BB.ink3, lineHeight: "1.6rem" }}>
                    HEX
                  </dt>
                  <dd className="font-mono-g" style={{ color: BB.ink }}>
                    {c.hex}
                  </dd>
                  <dt className={MONO} style={{ color: BB.ink3, lineHeight: "1.6rem" }}>
                    RGB
                  </dt>
                  <dd className="font-mono-g" style={{ color: BB.ink }}>
                    {c.rgb}
                  </dd>
                  <dt className={MONO} style={{ color: BB.ink3, lineHeight: "1.6rem" }}>
                    Use
                  </dt>
                  <dd style={{ color: BB.ink3 }}>{c.role}</dd>
                </dl>
              </li>
            ))}
          </Stagger>
        </Section>

        <Section id="type" title="Typography" sub="Three families, each with one job.">
          <Stagger as="ul" className="grid lg:grid-cols-3 gap-4">
            <li className={`${CARD} p-8 flex flex-col`} style={EDGE}>
              <span aria-hidden className={`${hanken.className} text-[56px] leading-none tracking-[-0.04em]`} style={{ color: BB.ink }}>
                blue-iq
              </span>
              <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                Hanken Grotesk Bold
              </h3>
              <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                The wordmark only, lowercase, tracking −40. It ships outlined in the logo files, so you never need to set it.
              </p>
            </li>
            <li className={`${CARD} p-8 flex flex-col`} style={EDGE}>
              <span aria-hidden className="font-display text-[56px] leading-none tracking-[-0.02em]" style={{ color: BB.ink }}>
                Aa Gg
              </span>
              <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                Newsreader
              </h3>
              <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                Headlines, regular weight, tight tracking. A calm serif for the things we say out loud.
              </p>
            </li>
            <li className={`${CARD} p-8 flex flex-col`} style={EDGE}>
              <span aria-hidden className="font-sans-g text-[56px] leading-none font-medium tracking-[-0.02em]" style={{ color: BB.ink }}>
                Aa Gg
              </span>
              <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                Figtree
              </h3>
              <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                Interface and body copy, in regular, medium and semibold. All three families are free on Google Fonts.
              </p>
            </li>
          </Stagger>
        </Section>

        {/* 5: the words */}
        <Section id="name" title="Name and description" sub="How to write about us, and two descriptions you can use as they are.">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className={`${CARD} p-8`} style={EDGE}>
              <h3 className="font-head h-card" style={{ color: BB.ink }}>
                Writing the name
              </h3>
              <ul className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                <li className="py-4" style={{ borderTop: `1px solid ${BB.line}` }}>
                  In text, always <b style={{ color: BB.ink }}>Blue-IQ</b>: capital B, a hyphen, IQ in capitals.
                </li>
                <li className="py-4" style={{ borderTop: `1px solid ${BB.line}` }}>
                  Not Blue IQ, BlueIQ, Blue-iq or Blueiq. The lowercase form lives only in the logo.
                </li>
                <li className="py-4" style={{ borderTop: `1px solid ${BB.line}` }}>
                  Products: <b style={{ color: BB.ink }}>Capture</b>, <b style={{ color: BB.ink }}>Spend</b>, <b style={{ color: BB.ink }}>Govern</b>. Our AI is{" "}
                  <b style={{ color: BB.ink }}>Sonar</b>.
                </li>
              </ul>
            </div>
            {[
              ["Short description", SHORT],
              ["Long description", LONG],
            ].map(([t, text]) => (
              <div key={t} className={`${CARD} p-8 flex flex-col`} style={EDGE}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-head h-card" style={{ color: BB.ink }}>
                    {t}
                  </h3>
                  <CopyText text={text} label={t.toLowerCase()} />
                </div>
                <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 font-sans-g t-base" style={{ color: SA.sub }}>
            Need something that isn&apos;t here?{" "}
            <Link href="/contact?topic=Something%20else" className="font-medium underline underline-offset-4" style={{ color: BB.cobalt }}>
              Ask the team
            </Link>
            .
          </p>
        </Section>
      </main>
      <SiteFooter cta={{ title: "Writing about Blue-IQ?", sub: "Ask for anything that is not in the kit. A person from our team will reply." }} />
    </div>
  );
}
