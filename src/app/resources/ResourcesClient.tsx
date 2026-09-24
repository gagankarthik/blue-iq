"use client";

import { SA } from "@/lib/theme";
import { SectionHead, Reveal } from "@/components/saas/parts";
import { PageHero, HeroButton, WRAP } from "@/components/page/kit";
import { ScoreArt, DeliverArt } from "@/components/art/StepArt";
import { type BqIcon, IconApi, IconDocs, IconScore, IconShield, IconBolt, IconLayers, IconArrow } from "@/components/icons/BqIcons";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /resources — the developer's page.

   Jump cards up top, then three short blocks: how you connect, what you can
   send, and how to build on a confidence score. Everything listed exists
   today; there is no public docs portal yet, and the page says so.
   ──────────────────────────────────────────────────────────────── */

const JUMPS: { href: string; Icon: BqIcon; t: string; d: string }[] = [
  { href: "#api", Icon: IconApi, t: "Connect", d: "REST, JSON and webhooks" },
  { href: "#formats", Icon: IconDocs, t: "Formats", d: "What Sonar can read" },
  { href: "#confidence", Icon: IconScore, t: "Scores", d: "Build on confidence" },
  { href: "/privacy", Icon: IconShield, t: "Security", d: "How data is handled" },
];

const CONNECT: { Icon: BqIcon; t: string; d: string }[] = [
  { Icon: IconApi, t: "REST API", d: "Post documents, get structured records back." },
  { Icon: IconLayers, t: "Schema-validated JSON", d: "Every field in the schema, every time." },
  { Icon: IconBolt, t: "Signed webhooks", d: "Results pushed the moment they are ready." },
  { Icon: IconDocs, t: "Native connectors", d: "Straight into your ATS, ERP or CLM." },
];

const FORMATS: { ext: string; t: string; tone: string }[] = [
  { ext: "PDF", t: "Digital PDFs", tone: "#E3674F" },
  { ext: "DOCX", t: "Word documents", tone: "#1D5BF0" },
  { ext: "TIFF", t: "Scanned paper", tone: "#0E86C7" },
  { ext: "JPG", t: "Phone photos", tone: "#B07A08" },
  { ext: "PNG", t: "Screenshots", tone: "#1F7A54" },
  { ext: "XLSX", t: "System exports", tone: "#0D1C4F" },
];

const RULES: [string, string][] = [
  ["Scores are per field", "Each value carries its own confidence, not one number per file."],
  ["Route on the score", "Accept above your line automatically. Queue the rest for a person."],
  ["A flag is not an error", "It is a value Sonar refused to guess. Send it to review, do not retry."],
];

function FileTile({ ext, t, tone }: { ext: string; t: string; tone: string }) {
  return (
    <li className="group rounded-[20px] p-5 flex items-center gap-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-28px_rgba(10,18,48,0.35)]" style={{ background: SA.surface, border: `1px solid ${SA.line}` }}>
      <svg width="44" height="54" viewBox="0 0 44 54" aria-hidden className="shrink-0 transition-transform duration-300 group-hover:-rotate-3">
        <path d="M4 2h26l10 10v38a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" fill="#fff" stroke="#D6DDEA" strokeWidth="1.5" />
        <path d="M30 2v10h10" fill="#EEF2F9" stroke="#D6DDEA" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="8" y="20" width="22" height="3" rx="1.5" fill="#E6EAF2" />
        <rect x="8" y="26" width="16" height="3" rx="1.5" fill="#E6EAF2" />
        <rect x="0" y="34" width="34" height="13" rx="3" fill={tone} />
        <text x="17" y="43.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" className="font-sans-g">
          {ext}
        </text>
      </svg>
      <span className="font-sans-g text-[15px] font-medium" style={{ color: SA.ink }}>
        {t}
      </span>
    </li>
  );
}

export default function ResourcesClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />
      <main>
        <PageHero label="Resources" title="Developer resources for Sonar" lede="Connect over REST and webhooks, send any file format, and build on per-field confidence scores.">
          <HeroButton href="/contact">Request API access</HeroButton>
        </PageHero>

        {/* jump cards, pulled up over the header edge */}
        <div className={`${WRAP} relative -mt-10 sm:-mt-12 z-10`}>
          <Reveal as="ul" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {JUMPS.map((j) => (
              <li key={j.t}>
                <a
                  href={j.href}
                  className="group h-full flex flex-col rounded-[20px] p-5 sm:p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
                  style={{ background: SA.surface, border: `1px solid ${SA.line}`, boxShadow: "0 20px 40px -30px rgba(10,18,48,0.4)" }}
                >
                  <j.Icon size={26} className="shrink-0" style={{ color: SA.accent }} />
                  <span className="mt-4 font-display font-semibold text-[1.1rem] tracking-[-0.02em]" style={{ color: SA.ink }}>
                    {j.t}
                  </span>
                  <span className="mt-0.5 font-sans-g text-[14px]" style={{ color: SA.sub }}>
                    {j.d}
                  </span>
                </a>
              </li>
            ))}
          </Reveal>
        </div>

        {/* connect */}
        <section id="api" className="py-16 sm:py-24 scroll-mt-24">
          <div className={`${WRAP} grid lg:grid-cols-2 gap-10 items-center`}>
            <div>
              <SectionHead align="stack" title="Connect Sonar to your stack" sub="Up to 200 documents per API call, with a sub-second median read." />
              <Reveal as="ul" className="mt-8 grid sm:grid-cols-2 gap-3">
                {CONNECT.map((c) => (
                  <li key={c.t} className="rounded-2xl p-5" style={{ background: SA.bg2, border: `1px solid ${SA.line}` }}>
                    <c.Icon size={22} style={{ color: SA.accent }} />
                    <p className="mt-3 font-sans-g text-[15px] font-semibold" style={{ color: SA.ink }}>
                      {c.t}
                    </p>
                    <p className="mt-1 font-sans-g text-[14px] leading-snug" style={{ color: SA.sub }}>
                      {c.d}
                    </p>
                  </li>
                ))}
              </Reveal>
              <p className="mt-6 font-sans-g text-[14px]" style={{ color: SA.sub }}>
                No public docs portal yet. The API reference ships with your keys.
              </p>
            </div>
            <Reveal className="rounded-[28px] h-[300px] sm:h-[400px] p-8 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full" style={{ background: "linear-gradient(160deg, #F6F8FC, #E9F0FC)", border: `1px solid ${SA.line}` }}>
              <DeliverArt />
            </Reveal>
          </div>
        </section>

        {/* formats */}
        <section id="formats" className="py-16 sm:py-24 scroll-mt-24" style={{ background: SA.bg2 }}>
          <div className={WRAP}>
            <SectionHead title="Supported document formats" sub="Digital or scanned, clean or messy. Images and scans go through OCR first." />
            <Reveal as="ul" className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FORMATS.map((f) => (
                <FileTile key={f.ext} {...f} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* confidence */}
        <section id="confidence" className="py-16 sm:py-24 scroll-mt-24" style={{ background: SA.bg }}>
          <div className={`${WRAP} grid lg:grid-cols-2 gap-10 items-center`}>
            <div>
              <SectionHead align="stack" title="Working with confidence scores" sub="Three rules for building on Sonar's output." />
              <Reveal as="ol" className="mt-8 space-y-3">
                {RULES.map(([t, d], k) => (
                  <li key={t} className="flex gap-4 rounded-2xl p-5" style={{ background: SA.bg2, border: `1px solid ${SA.line}` }}>
                    <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full font-display font-semibold" style={{ background: SA.accent, color: "#fff" }}>
                      {k + 1}
                    </span>
                    <span>
                      <span className="block font-sans-g text-[16px] font-semibold" style={{ color: SA.ink }}>{t}</span>
                      <span className="block mt-1 font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
                        {d}
                      </span>
                    </span>
                  </li>
                ))}
              </Reveal>
              <a href="/contact" className="group mt-8 inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold" style={{ color: SA.accent }}>
                Ask an engineer <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <Reveal className="rounded-[28px] p-8 [&_svg]:w-full" style={{ background: "linear-gradient(160deg, #F6F8FC, #E9F0FC)", border: `1px solid ${SA.line}` }}>
              <ScoreArt />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
