import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   The close.

   The CTA and the footer are one thing now. They were two: a full-width
   brand-tinted band with the invitation on it, followed immediately by a
   second full-width band with the film and the links. Two closes back to
   back — the page ended, then ended again. The ask now sits at the top of
   the footer, over the same footage, and the sitemap sits under it. One
   ending.

   The newsletter card is gone with it: a card inside a card, with a
   gradient header plate and a blueprint grid inside that — three devices
   stripped from every other surface on the site, hiding where nobody looks.

   `cta` is a prop rather than a given: on /contact the invitation would be
   asking you to go where you already are.
   ──────────────────────────────────────────────────────────────── */

/* Every link here has to resolve to something that actually exists.
   Cut, because the page behind them does not exist and we will not invent it:
   · "Careers"          — there is no careers page and no open roles to list
   · "Customer stories" — we have no customers we can name
   · "Documentation"    — no docs site yet; /resources describes the API instead
   · "Guides"           — none written
   · "Compliance"       — not one of the three industries we actually read for
   A footer that links to a page we cannot honestly write is a promise broken
   before the visitor has even clicked. */
const cols: { h: string; l: [string, string, boolean][] }[] = [
  {
    h: "Company",
    l: [
      ["About", "/about", false],
      ["The Sonar engine", "/about#sonar", false],
      ["Solutions", "/solutions", false],
      ["Contact us", "/contact", false],
    ],
  },
  {
    h: "Products",
    l: [
      ["All products", "/products", false],
      ["ParsingLab", "https://www.parsinglab.blue-iq.ai/", true],
      ["Govern", "https://govern.blue-iq.ai/", true],
      ["Custom builds", "/solutions#custom", false],
      ["Pricing", "/contact#pricing", false],
    ],
  },
  {
    h: "Build",
    l: [
      ["How the API works", "/resources#api", false],
      ["Formats it reads", "/resources#formats", false],
      ["Integrations", "/solutions#integrations", false],
      ["Security & privacy", "/privacy", false],
    ],
  },
  {
    h: "Industries",
    l: [
      ["Healthcare staffing", "/solutions#industries", false],
      ["Legal & contracts", "/solutions#industries", false],
      ["Procurement & finance", "/solutions#industries", false],
      ["Enterprise migrations", "/solutions#migrations", false],
    ],
  },
];

const INK = "#FFFFFF";
const SUB = "rgba(255,255,255,0.70)";
const FAINT = "rgba(255,255,255,0.42)";
const RULE = "rgba(255,255,255,0.16)";

export default function SiteFooter({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#0B0B0F" }}>
      <video
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        src="/footer.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />

      {/* the scrim. Heavier than the hero's: there are twenty small links down
          here, and legibility outranks the footage. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(8,9,13,0.80), rgba(8,9,13,0.72) 40%, rgba(8,9,13,0.90))",
        }}
      />

      <div className="relative max-w-[1340px] mx-auto px-5 sm:px-8">
        {cta && (
          <div
            className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] gap-y-10 lg:gap-x-20 items-end pt-28 sm:pt-40 pb-24 sm:pb-32"
            aria-labelledby="cta-h"
          >
            <h2
              id="cta-h"
              className="font-display font-normal leading-[1.04] max-w-[16ch]"
              style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.6rem)", letterSpacing: "-0.035em", color: INK }}
            >
              Send us the ugliest document you have
              <span style={{ color: "#6C97FF" }}>.</span>
            </h2>

            <div className="lg:pb-3">
              <p className="font-sans-g leading-[1.7] max-w-[46ch]" style={{ fontSize: "1.05rem", color: SUB }}>
                A photographed scan, a 90-page master agreement, an export nobody can open. We will read it with Sonar
                and show you exactly what comes back — the fields, the scores, and the ones it flags for review.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-full transition-transform active:scale-[0.97]"
                  style={{ background: INK, color: "#0B0B0F" }}
                >
                  Talk to us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-6 py-3.5 rounded-full transition-colors hover:bg-white/10"
                  style={{ border: `1px solid ${RULE}`, color: INK }}
                >
                  See the suite
                </a>
              </div>
            </div>
          </div>
        )}

        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 ${cta ? "pt-16" : "pt-24"}`}
          style={{ borderTop: cta ? `1px solid ${RULE}` : undefined }}
        >
          {cols.map((col) => (
            <div key={col.h}>
              <div
                className="font-mono-g text-[10px] font-semibold uppercase tracking-[0.18em] mb-5"
                style={{ color: FAINT }}
              >
                {col.h}
              </div>
              <ul className="space-y-3.5">
                {col.l.map(([label, href, ext]) => (
                  <li key={label + href}>
                    <a
                      href={href}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 font-sans-g text-[14.5px] transition-opacity hover:opacity-70"
                      style={{ color: INK }}
                    >
                      {label}
                      {ext && <ArrowUpRight className="w-3.5 h-3.5 opacity-45" strokeWidth={2} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 select-none" aria-hidden>
          <div
            className="font-display font-medium leading-none"
            style={{ fontSize: "clamp(3rem, 18vw, 16rem)", letterSpacing: "-0.05em", color: INK }}
          >
            Blue-IQ
          </div>
        </div>

        <div
          className="mt-8 pt-6 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${RULE}` }}
        >
          <p className="font-sans-g text-[12.5px]" style={{ color: FAINT }}>
            © 2026 Blue-IQ. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans-g text-[12.5px]" style={{ color: SUB }}>
              Privacy
            </Link>
            <Link href="/terms" className="font-sans-g text-[12.5px]" style={{ color: SUB }}>
              Terms
            </Link>
            <a href="mailto:hello@blue-iq.com" className="font-sans-g text-[12.5px]" style={{ color: SUB }}>
              hello@blue-iq.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
