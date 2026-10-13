import { SA } from "@/lib/theme";
import { PageHero, CARD, CARD_EDGE, SpotWell } from "@/components/page/kit";
import { Block } from "@/components/page/blocks";
import { Btn } from "@/components/system/Btn";
import { IconArrow } from "@/components/icons/BqIcons";
import { type Spot, SpotIntegrate, SpotRead, SpotScore, SpotSecure, SpotRoute, SpotExtract } from "@/components/icons/Spots";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /resources — the developer's page.

   1. Header on the wash, the page's four parts as spot cards under it.
   2. Connect: a dark card with a sample response beside the four ways in
      (sarvam.ai's API split).
   3. Formats: the six file types.
   4. Scores: three rules, and a routed example.
   Everything listed exists today; there is no public docs portal yet, and
   the page says so.
   ──────────────────────────────────────────────────────────────── */

const TOC: { href: string; t: string; d: string; Spot: Spot }[] = [
  { href: "#api", t: "Connect", d: "REST, JSON and webhooks", Spot: SpotIntegrate },
  { href: "#formats", t: "Formats", d: "What Sonar can read", Spot: SpotRead },
  { href: "#confidence", t: "Scores", d: "Building on confidence", Spot: SpotScore },
  { href: "/trust", t: "Security", d: "How data is handled", Spot: SpotSecure },
];

const CONNECT: [string, string][] = [
  ["REST API", "Post documents, get structured records back. Up to 200 per call."],
  ["Schema-validated JSON", "Every field in your schema, every time, each with its own score."],
  ["Signed webhooks", "Results pushed the moment they are ready, signed so you can verify them."],
  ["Native connectors", "Straight into your ATS, ERP or CLM, with custom routes where none exist."],
];

const FORMATS: { ext: string; t: string; d: string; tone: string }[] = [
  { ext: "PDF", t: "Digital PDFs", d: "Text layer read directly", tone: "#B91C1C" },
  { ext: "DOCX", t: "Word documents", d: "Tables and headings kept", tone: "#2348B8" },
  { ext: "TIFF", t: "Scanned paper", d: "OCR first, then read", tone: "#0B5A72" },
  { ext: "JPG", t: "Phone photos", d: "Skew and glare corrected", tone: "#8F4507" },
  { ext: "PNG", t: "Screenshots", d: "Read like any image", tone: "#065F46" },
  { ext: "XLSX", t: "System exports", d: "Rows mapped to fields", tone: "#1E2130" },
];

const RULES: { Spot: Spot; t: string; d: string }[] = [
  { Spot: SpotExtract, t: "Scores are per field", d: "Each value carries its own confidence, not one number per file." },
  { Spot: SpotRoute, t: "Route on the score", d: "Accept above your line automatically. Queue the rest for a person." },
  { Spot: SpotScore, t: "A flag is not an error", d: "It is a value Sonar refused to guess. Send it to review, do not retry." },
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

function FileIcon({ ext, tone }: { ext: string; tone: string }) {
  return (
    <svg width="44" height="52" viewBox="0 0 40 48" aria-hidden className="shrink-0">
      <path d="M4 1.5h22l10.5 10.5v32a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 44V4A2.5 2.5 0 0 1 4 1.5Z" fill="#fff" stroke="#1F2A6B" strokeWidth="1.5" />
      <path d="M26 1.5V12h10.5" fill="#EEF3FF" stroke="#1F2A6B" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="8" y="17" width="20" height="2.5" rx="1.25" fill="#DCE5FF" />
      <rect x="8" y="22.5" width="14" height="2.5" rx="1.25" fill="#DCE5FF" />
      <rect x="0" y="30" width="32" height="12" rx="3" fill={tone} />
      <text
        x="16"
        y="38.6"
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        fill="#fff"
        style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
      >
        {ext}
      </text>
    </svg>
  );
}

export default function ResourcesClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
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
          <nav aria-label="On this page">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TOC.map((x) => (
                <li key={x.t}>
                  <a
                    href={x.href}
                    className={`group ${CARD} h-full flex items-center gap-4 p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#D4D4DA] hover:shadow-[0_16px_32px_-24px_rgba(30,33,48,0.3)]`}
                    style={CARD_EDGE}
                  >
                    <SpotWell size={64}>
                      <x.Spot size={44} />
                    </SpotWell>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="flex items-center justify-between gap-2 font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                        {x.t}
                        <IconArrow size={15} className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: SA.faint }} />
                      </span>
                      <span className="mt-1 block font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
                        {x.d}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageHero>

        <Block id="api" title="Connect Sonar to your stack" sub="Up to 200 documents per API call, with a sub-second median read.">
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="lg:col-span-6 rounded-[24px] p-6 sm:p-8 flex flex-col" style={{ background: "#1E2130" }}>
              <p className="font-sans-g text-[14px] font-medium" style={{ color: "#C9CCDA" }}>
                A sample response
              </p>
              <pre
                tabIndex={0}
                aria-label="Sample API response"
                className="mt-4 flex-1 overflow-x-auto rounded-[16px] p-5 font-mono-g text-[13px] leading-[1.7]"
                style={{ background: "#151826", color: "#E6E8F2" }}
              >
                <code>{SAMPLE}</code>
              </pre>
              <p className="mt-5 font-sans-g text-[14px]" style={{ color: "#C9CCDA" }}>
                No public docs portal yet. The API reference ships with your keys.
              </p>
              <div className="mt-6">
                <Btn href="/contact?product=Capture" tone="dark" size="lg" className="w-full">
                  Request API access
                </Btn>
              </div>
            </div>
            <dl className="lg:col-span-6 grid sm:grid-cols-2 gap-3">
              {CONNECT.map(([t, d]) => (
                <div key={t} className={`${CARD} p-7`} style={CARD_EDGE}>
                  <dt className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                    {t}
                  </dt>
                  <dd className="mt-2 font-sans-g text-[15px] leading-[1.6]" style={{ color: SA.sub }}>
                    {d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Block>

        <Block id="formats" title="Digital or scanned, clean or messy" sub="Images and scans go through OCR first, then Sonar reads them like any other page.">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FORMATS.map((f) => (
              <li key={f.ext} className={`${CARD} flex items-center gap-5 p-6`} style={CARD_EDGE}>
                <FileIcon ext={f.ext} tone={f.tone} />
                <span>
                  <span className="block font-sans-g text-[1.0625rem] font-medium" style={{ color: SA.ink }}>
                    {f.t}
                  </span>
                  <span className="block mt-0.5 font-sans-g text-[15px]" style={{ color: SA.sub }}>
                    {f.d}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="confidence" title="Three rules for building on confidence">
          <ul className="grid md:grid-cols-3 gap-3">
            {RULES.map((x) => (
              <li key={x.t} className={`${CARD} p-7 sm:p-8`} style={CARD_EDGE}>
                <SpotWell>
                  <x.Spot size={56} />
                </SpotWell>
                <h3 className="mt-6 font-sans-g text-[1.25rem] font-medium" style={{ color: SA.ink }}>
                  {x.t}
                </h3>
                <p className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
                  {x.d}
                </p>
              </li>
            ))}
          </ul>

          <div className={`mt-3 ${CARD} overflow-x-auto`} style={CARD_EDGE}>
            <table className="w-full min-w-[420px] text-left">
              <caption className="px-6 pt-5 pb-3 text-left font-sans-g text-[14px]" style={{ color: SA.faint }}>
                Example: review line at 0.90
              </caption>
              <thead>
                <tr style={{ borderBottom: `1px solid ${SA.line}` }}>
                  {["Field", "Score", "Route"].map((h) => (
                    <th key={h} scope="col" className="px-6 py-3 font-sans-g text-[13px] font-medium" style={{ color: SA.faint }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROUTED.map(([field, score], i) => {
                  const low = score < 0.9;
                  return (
                    <tr key={field} style={{ borderTop: i ? `1px solid ${SA.line}` : undefined }}>
                      <th scope="row" className="px-6 py-3.5 font-sans-g text-[15px] font-medium" style={{ color: SA.ink }}>
                        {field}
                      </th>
                      <td className="px-6 py-3.5 font-mono-g text-[14px] tabular-nums" style={{ color: low ? "#78350F" : SA.ink }}>
                        {score.toFixed(2)}
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className="inline-flex items-center h-6 px-2 rounded-[6px] font-sans-g text-[13px] font-medium"
                          style={{ background: low ? "#FEF3C7" : "#ECFDF5", color: low ? "#78350F" : "#065F46" }}
                        >
                          {low ? "To review" : "Accepted"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Block>
      </main>
      <SiteFooter cta={{ title: "Ready to connect?", sub: "Ask for API access and we will send the reference with your keys." }} />
    </div>
  );
}
