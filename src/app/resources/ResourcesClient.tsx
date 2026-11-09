import Link from "next/link";
import { ArrowsSplit, FileDoc, FileImage, FileJpg, FilePdf, FilePng, FileXls } from "@phosphor-icons/react/dist/ssr";
import { BB } from "@/lib/theme";
import { PageHero } from "@/components/page/kit";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import { I, Tile, type Ico } from "@/components/home/icons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /resources: the developer guide, read top to bottom.

   1. Header: what you can build, two actions, and an "On this page" list.
   2. Connect (#api): the four ways in as numbered definition rows, beside
      a sample response on the page's one ink block.
   3. Formats (#formats): the six file types Sonar reads.
   4. Scores (#confidence): three numbered rules, then a routed example.
   5. Security: one card pointing to the Trust Center.
   Everything listed exists today; there is no public docs portal yet, and
   the page says so.
   ──────────────────────────────────────────────────────────────── */

const TOC: { href: string; t: string; d: string; icon: Ico }[] = [
  { href: "#api", t: "Connect", d: "REST, JSON and webhooks", icon: I.api },
  { href: "#formats", t: "Formats", d: "What Sonar can read", icon: I.formats },
  { href: "#confidence", t: "Scores", d: "Building on confidence", icon: I.scores },
  { href: "/trust", t: "Security", d: "How data is handled", icon: I.trust },
];

const CONNECT: [string, string][] = [
  ["REST API", "Post documents, get structured records back. Up to 200 per call."],
  ["Schema-validated JSON", "Every field in your schema, every time, each with its own score."],
  ["Signed webhooks", "Results pushed the moment they are ready, signed so you can verify them."],
  ["Native connectors", "Straight into your ATS, ERP or CLM, with custom routes where none exist."],
];

const FORMATS: { ext: string; t: string; d: string; icon: Ico }[] = [
  { ext: "PDF", t: "Digital PDFs", d: "Text layer read directly", icon: FilePdf },
  { ext: "DOCX", t: "Word documents", d: "Tables and headings kept", icon: FileDoc },
  { ext: "TIFF", t: "Scanned paper", d: "OCR first, then read", icon: FileImage },
  { ext: "JPG", t: "Phone photos", d: "Skew and glare corrected", icon: FileJpg },
  { ext: "PNG", t: "Screenshots", d: "Read like any image", icon: FilePng },
  { ext: "XLSX", t: "System exports", d: "Rows mapped to fields", icon: FileXls },
];

const RULES: { icon: Ico; t: string; d: string }[] = [
  { icon: I.scores, t: "Scores are per field", d: "Each value carries its own confidence, not one number per file." },
  { icon: ArrowsSplit, t: "Route on the score", d: "Accept above your line automatically. Queue the rest for a person." },
  { icon: I.flag, t: "A flag is not an error", d: "It is a value Sonar refused to guess. Send it to review, do not retry." },
];

const ROUTED: [string, number][] = [
  ["Counterparty", 0.99],
  ["Effective date", 0.97],
  ["Total value", 0.95],
  ["Renewal clause", 0.86],
  ["Signatory", 0.58],
];

const SAMPLE = `{
  "document": "msa-ardent-freight.pdf",
  "fields": {
    "counterparty":   { "value": "Ardent Freight Ltd", "score": 0.99 },
    "effective_date": { "value": "2026-03-01",         "score": 0.97 },
    "signatory":      { "value": null,                 "score": 0.58,
                        "flag": "review" }
  }
}`;

const EDGE = { border: `1px solid ${BB.line}` } as const;
const LABEL = "font-mono-g text-[13px] uppercase tracking-[0.06em]";

/* one section: a hairline seam, then the header and its content */
function Section({ id, labelledby, children }: { id?: string; labelledby: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 px-6 sm:px-8 pb-24" aria-labelledby={labelledby}>
      <div aria-hidden className="max-w-[1112px] mx-auto h-px mb-24" style={{ background: BB.line }} />
      <div className="max-w-[1112px] mx-auto">{children}</div>
    </section>
  );
}

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function ResourcesClient() {
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="Resources"
          id="resources-h"
          title="Build on Sonar"
          lede="Connect over REST and webhooks, send any file format, and route every field on its own confidence score."
          primary={{ label: "Request API access", href: "/contact?product=Capture" }}
          secondary={{ label: "Visit the Trust Center", href: "/trust" }}
        >
          <nav aria-labelledby="toc-h" className="pb-16">
            <h2 id="toc-h" className={LABEL} style={{ color: BB.ink3 }}>
              On this page
            </h2>
            <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TOC.map((x) => (
                <li key={x.t}>
                  <Link
                    href={x.href}
                    className="group flex h-full items-center gap-4 rounded-2xl border border-[#D9DCE2] bg-white p-4 transition-[border-color] duration-200 hover:border-[#1F4FE6] focus-visible:border-[#1F4FE6]"
                  >
                    <Tile icon={x.icon} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-sans-g t-base font-medium" style={{ color: BB.ink }}>
                        {x.t}
                      </span>
                      <span className="block font-sans-g text-[13px] leading-[1.5]" style={{ color: BB.ink3 }}>
                        {x.d}
                      </span>
                    </span>
                    <I.arrow
                      aria-hidden
                      size={16}
                      className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: BB.cobalt }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        {/* 1. connect */}
        <Section id="api" labelledby="api-h">
          <Head id="api-h" title="Connect Sonar to your stack" sub="Up to 200 documents per API call, with a sub-second median read." />
          <div className="mt-12 grid lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
            <Stagger as="dl">
              {CONNECT.map(([t, d], i) => (
                <div key={t} className="py-6" style={{ borderTop: `1px solid ${BB.line}` }}>
                  <dt className="flex items-baseline gap-4">
                    <span aria-hidden className={`${LABEL} w-12 shrink-0`} style={{ color: BB.cobalt }}>
                      {num(i)}
                    </span>
                    <span className="font-head h-card" style={{ color: BB.ink }}>
                      {t}
                    </span>
                  </dt>
                  <dd className="mt-4 pl-16 font-sans-g t-base" style={{ color: BB.ink3 }}>
                    {d}
                  </dd>
                </div>
              ))}
            </Stagger>

            <div className="rounded-[24px] p-8 flex flex-col" style={{ background: BB.ink }}>
              <h3 className={LABEL} style={{ color: "#C2C7D1" }}>
                A sample response
              </h3>
              <pre
                tabIndex={0}
                aria-label="Sample API response"
                className="mt-4 overflow-x-auto rounded-[12px] p-6 font-mono-g text-[13px] leading-[1.7]"
                style={{ background: BB.navy2, color: "#E4E7ED" }}
              >
                <code>{SAMPLE}</code>
              </pre>
              <p className="mt-8 font-sans-g t-base" style={{ color: "#C2C7D1" }}>
                No public docs portal yet. The API reference ships with your keys.
              </p>
              <div className="mt-8">
                <SqBtn href="/contact?product=Capture" tone="light" arrow>
                  Request API access
                </SqBtn>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. formats */}
        <Section id="formats" labelledby="formats-h">
          <Head
            id="formats-h"
            title="Digital or scanned, clean or messy"
            sub="Images and scans go through OCR first, then Sonar reads them like any other page."
          />
          <Stagger as="ul" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FORMATS.map((f) => (
              <li key={f.ext} className="flex items-center gap-4 rounded-2xl bg-white p-8" style={EDGE}>
                <Tile icon={f.icon} />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-sans-g t-base font-medium" style={{ color: BB.ink }}>
                      {f.t}
                    </span>
                    <span className={`${LABEL} inline-flex items-center h-6 px-2 rounded-[8px]`} style={{ background: BB.mist2, color: BB.ink2 }}>
                      {f.ext}
                    </span>
                  </span>
                  <span className="mt-1 block font-sans-g t-base" style={{ color: BB.ink3 }}>
                    {f.d}
                  </span>
                </span>
              </li>
            ))}
          </Stagger>
        </Section>

        {/* 3. confidence */}
        <Section id="confidence" labelledby="confidence-h">
          <Head id="confidence-h" title="Three rules for building on confidence" />
          <Stagger as="ol" className="mt-12 grid md:grid-cols-3 gap-4">
            {RULES.map((x, i) => (
              <li key={x.t} className="h-full rounded-2xl bg-white p-8" style={EDGE}>
                <span className="flex items-center justify-between">
                  <Tile icon={x.icon} />
                  <span aria-hidden className={LABEL} style={{ color: BB.cobalt }}>
                    {num(i)}
                  </span>
                </span>
                <h3 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                  {x.t}
                </h3>
                <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                  {x.d}
                </p>
              </li>
            ))}
          </Stagger>

          <div className="mt-4 rounded-2xl bg-white overflow-x-auto" style={EDGE} tabIndex={0} role="region" aria-label="Example: review line at 0.90">
            <table className="w-full min-w-[420px] text-left">
              <caption className={`${LABEL} px-8 pt-8 pb-4 text-left`} style={{ color: BB.ink3 }}>
                Example: review line at 0.90
              </caption>
              <thead>
                <tr style={{ borderBottom: `1px solid ${BB.line}` }}>
                  {["Field", "Score", "Route"].map((h) => (
                    <th key={h} scope="col" className="px-8 py-4 font-sans-g text-[13px] font-medium" style={{ color: BB.ink3 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROUTED.map(([field, score], i) => {
                  const low = score < 0.9;
                  return (
                    <tr key={field} style={{ borderTop: i ? `1px solid ${BB.line}` : undefined }}>
                      <th scope="row" className="px-8 py-4 font-sans-g t-base font-medium" style={{ color: BB.ink }}>
                        {field}
                      </th>
                      <td className="px-8 py-4 font-mono-g text-[13px] tabular-nums" style={{ color: low ? BB.amberInk : BB.ink }}>
                        {score.toFixed(2)}
                      </td>
                      <td className="px-8 py-4">
                        <span
                          className="inline-flex items-center gap-2 h-6 px-2 rounded-[8px] font-sans-g text-[13px] font-medium"
                          style={low ? { background: "#FDF0D5", color: BB.amberInk } : { background: BB.mist2, color: BB.ink2 }}
                        >
                          {low ? <I.flag aria-hidden size={14} /> : <I.check aria-hidden size={14} />}
                          {low ? "To review" : "Accepted"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 4. security */}
        <Section id="security" labelledby="security-h">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 rounded-2xl bg-white p-8" style={EDGE}>
            <Tile icon={I.trust} size={64} />
            <div className="min-w-0 flex-1">
              <h2 id="security-h" className="font-head h-card" style={{ color: BB.ink }}>
                Security
              </h2>
              <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                How data is handled
              </p>
            </div>
            <SqBtn href="/trust" tone="outline" arrow>
              Visit the Trust Center
            </SqBtn>
          </div>
        </Section>
      </main>
      <SiteFooter cta={{ title: "Ready to connect?", sub: "Ask for API access and we will send the reference with your keys." }} />
    </div>
  );
}
