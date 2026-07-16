import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   The close — a neumorphic surface.

   The footage-and-scrim footer is gone. This is soft-UI: one matte cool-grey
   plane, and everything on it is either pressed into that plane or raised out
   of it by a pair of shadows — a light one up-left, a dark one down-right.
   Nothing has a border; depth does the separating. The buttons lift, the
   sitemap sits in a recessed well, and the wordmark is embossed out of the
   surface rather than printed on it.

   It stays a server component: interactivity is CSS only (hover-lift on the
   buttons, hover-tint on the links), so there are no client event handlers.

   `cta` is a prop rather than a given: on /contact the invitation would be
   asking you to go where you already are.
   ──────────────────────────────────────────────────────────────── */

/* Every link here has to resolve to something that actually exists.
   Cut, because the page behind them does not exist and we will not invent it:
   · "Careers"          — there is no careers page and no open roles to list
   · "Customer stories" — we have no customers we can name
   · "Documentation"    — no docs site yet; /resources describes the API instead
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
      ["Capture", "https://www.parsinglab.blue-iq.ai/", true],
      ["Spend", "/products#spend", false],
      ["Govern", "https://govern.blue-iq.ai/", true],
      ["Campus & Workforce", "/products#editions", false],
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
      ["IT sector", "/solutions#it", false],
      ["Education", "/solutions#education", false],
      ["Workforce", "/solutions#workforce", false],
      ["Healthcare staffing", "/solutions#healthcare", false],
      ["Legal & contracts", "/solutions#legal", false],
      ["Procurement & finance", "/solutions#procurement", false],
    ],
  },
];

/* the soft-UI palette. One plane colour; every surface IS this colour, and only
   the paired shadows tell you what is raised and what is recessed. */
const NEU_BG = "#E6E9F1";
const SH_DARK = "rgba(163,171,196,0.72)"; // the recessed / down-right shadow
const SH_LIGHT = "rgba(255,255,255,0.95)"; // the lit / up-left highlight

const RAISED = `7px 7px 16px ${SH_DARK}, -7px -7px 16px ${SH_LIGHT}`;
const RAISED_SM = `5px 5px 12px ${SH_DARK}, -5px -5px 12px ${SH_LIGHT}`;
const INSET = `inset 6px 6px 14px ${SH_DARK}, inset -6px -6px 14px ${SH_LIGHT}`;

export default function SiteFooter({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="relative" style={{ background: NEU_BG }}>
      <div className="relative max-w-[1340px] mx-auto px-5 sm:px-8">
        {cta && (
          <div
            className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] gap-y-10 lg:gap-x-20 items-end pt-24 sm:pt-36 pb-16 sm:pb-24"
            aria-labelledby="cta-h"
          >
            <h2
              id="cta-h"
              className="font-display font-normal leading-[1.04] max-w-[16ch] text-[#2E3440]"
              style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.6rem)", letterSpacing: "-0.035em" }}
            >
              Send us the ugliest document you have
              <span className="text-[#2C49D6]">.</span>
            </h2>

            <div className="lg:pb-3">
              <p className="font-sans-g leading-[1.7] max-w-[46ch] text-[#575E6C]" style={{ fontSize: "1.05rem" }}>
                A photographed scan, a 90-page master agreement, an export nobody can open. We will read it with Sonar
                and show you exactly what comes back: the fields, the scores, and the ones it flags for review.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-sans-g text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] text-[#002181]"
                  style={{ background: NEU_BG, boxShadow: RAISED }}
                >
                  Talk to us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </a>
                <a
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-sans-g text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] text-[#3A4150]"
                  style={{ background: NEU_BG, boxShadow: RAISED_SM }}
                >
                  See the suite
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* the sitemap, pressed into a recessed well */}
        <div
          className={`rounded-[28px] px-6 sm:px-12 py-11 sm:py-14 ${cta ? "" : "mt-24"}`}
          style={{ background: NEU_BG, boxShadow: INSET }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {cols.map((col) => (
              <div key={col.h}>
                <div className="font-mono-g text-[10px] font-semibold uppercase tracking-[0.18em] mb-5 text-[#8990A1]">
                  {col.h}
                </div>
                <ul className="space-y-3.5">
                  {col.l.map(([label, href, ext]) => (
                    <li key={label + href}>
                      <a
                        href={href}
                        target={ext ? "_blank" : undefined}
                        rel={ext ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 font-sans-g text-[14.5px] transition-colors text-[#3D4453] hover:text-[#2C49D6]"
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
        </div>

        {/* the wordmark, embossed out of the surface */}
        <div className="mt-16 select-none" aria-hidden>
          <div
            className="font-display font-semibold leading-none"
            style={{
              fontSize: "clamp(3rem, 18vw, 16rem)",
              letterSpacing: "-0.05em",
              color: NEU_BG,
              textShadow: `-3px -3px 7px ${SH_LIGHT}, 5px 5px 13px ${SH_DARK}`,
            }}
          >
            Blue-IQ
          </div>
        </div>

        <div
          className="mt-10 pt-6 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(140,147,163,0.28)" }}
        >
          <p className="font-sans-g text-[12.5px] text-[#8990A1]">© 2026 Blue-IQ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans-g text-[12.5px] transition-colors text-[#575E6C] hover:text-[#2C49D6]">
              Privacy
            </Link>
            <Link href="/terms" className="font-sans-g text-[12.5px] transition-colors text-[#575E6C] hover:text-[#2C49D6]">
              Terms
            </Link>
            <a
              href="mailto:hello@blue-iq.ai"
              className="font-sans-g text-[12.5px] transition-colors text-[#575E6C] hover:text-[#2C49D6]"
            >
              hello@blue-iq.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
