import Image from "next/image";
import Link from "next/link";
import { BB } from "@/lib/theme";
import { I } from "@/components/home/icons";
import CloseCta from "@/components/home/CloseCta";

/* ────────────────────────────────────────────────────────────────
   The footer: the page's closing card (when the page wants one), then a
   full-width ink band (BB.ink): the white logo, one line and a demo
   link, the sitemap in four columns, and the legal line.

   Every link resolves to a page that exists. `cta` is off on /contact,
   where the offer would point at the page you are already on.
   Server component: no client JS.
   ──────────────────────────────────────────────────────────────── */

const cols: { h: string; l: [string, string, boolean][] }[] = [
  {
    h: "Products",
    l: [
      ["All products", "/products", false],
      ["Capture", "https://www.parsinglab.blue-iq.ai/", true],
      ["Spend", "/products#spend", false],
      ["Govern", "https://govern.blue-iq.ai/", true],
      ["Campus and Workforce", "/products#editions", false],
      ["Sonar, our AI", "/platform", false],
    ],
  },
  {
    h: "Solutions",
    l: [
      ["All industries", "/solutions", false],
      ["IT sector", "/solutions/it", false],
      ["Education", "/solutions/education", false],
      ["Healthcare staffing", "/solutions/healthcare", false],
      ["Legal and contracts", "/solutions/legal", false],
      ["Custom builds", "/solutions#custom", false],
    ],
  },
  {
    h: "Resources",
    l: [
      ["Developer guide", "/resources", false],
      ["How the API works", "/resources#api", false],
      ["Formats Sonar reads", "/resources#formats", false],
      ["Working with scores", "/resources#confidence", false],
      ["Trust Center", "/trust", false],
    ],
  },
  {
    h: "Company",
    l: [
      ["About", "/about", false],
      ["Pricing", "/contact#pricing", false],
      ["FAQ", "/faq", false],
      ["Media kit", "/media-kit", false],
      ["Contact", "/contact", false],
      ["Privacy policy", "/privacy", false],
      ["Terms of service", "/terms", false],
      ["Accessibility", "/accessibility", false],
    ],
  },
];

export default function SiteFooter({ cta = {} }: { cta?: false | { title?: string; sub?: string } }) {
  return (
    <footer className="relative z-[1]">
      {cta && (
        <div className="pt-16 sm:pt-24">
          <CloseCta {...cta} />
        </div>
      )}

      <div className="mt-16 sm:mt-24 px-6 sm:px-8" style={{ background: BB.ink }}>
        <div className="max-w-[1176px] mx-auto pt-16 sm:pt-24 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))] gap-x-8 gap-y-12 pb-16">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Image src="/logo-white.svg" alt="Blue-IQ" width={130} height={34} />
              <p className="mt-6 font-head text-[20px] leading-[1.4] max-w-[24ch] text-white">The document AI company. Every product runs on Sonar.</p>
              <Link
                href="/contact?topic=A%20demo"
                className="mt-8 inline-flex items-center gap-4 h-12 px-6 rounded-[12px] font-mono-g text-[13px] font-medium uppercase tracking-[0.06em] text-white transition-colors duration-200 hover:bg-[#1638B8]"
                style={{ background: BB.cobalt }}
              >
                Book a demo
                <I.arrow size={16} />
              </Link>
            </div>
            {cols.map((col) => (
              <nav key={col.h} aria-label={col.h}>
                <h3 className="font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: "#9AA0AC" }}>
                  {col.h}
                </h3>
                <ul className="mt-6 space-y-4">
                  {col.l.map(([label, href, ext]) => (
                    <li key={label + href}>
                      <a
                        href={href}
                        target={ext ? "_blank" : undefined}
                        rel={ext ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 font-sans-g text-[16px] text-[#D4D8E0] transition-colors duration-150 hover:text-white underline-offset-4 hover:underline"
                      >
                        {label}
                        {ext && <I.external size={13} />}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div
            className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
          >
            <p className="font-sans-g text-[13px]" style={{ color: "#A3A9B5" }}>
              © {new Date().getFullYear()} Blue-IQ. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                ["Privacy", "/privacy"],
                ["Terms", "/terms"],
                ["Trust", "/trust"],
                ["Accessibility", "/accessibility"],
              ].map(([t, h]) => (
                <Link key={h} href={h} className="font-sans-g text-[13px] text-[#A3A9B5] transition-colors duration-150 hover:text-white">
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
