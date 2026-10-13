import Image from "next/image";
import Link from "next/link";
import { SA } from "@/lib/theme";
import { IconArrowUpRight } from "@/components/icons/BqIcons";
import CloseCta from "@/components/home/CloseCta";

/* ────────────────────────────────────────────────────────────────
   The footer: the page's closing card (when the page wants one), then a
   full-width band on a soft brand-blue wash: the logo and one line, the
   sitemap in four columns, and the legal line.

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
    <footer style={{ background: SA.bg }}>
      {cta && <CloseCta {...cta} />}

      <div
        className="mt-16 sm:mt-20"
        style={{
          background: [
            "radial-gradient(45% 70% at 0% 100%, rgba(143,174,255,0.45) 0%, rgba(143,174,255,0) 70%)",
            "radial-gradient(40% 70% at 100% 100%, rgba(127,211,255,0.4) 0%, rgba(127,211,255,0) 70%)",
            "linear-gradient(180deg, #FFFFFF 0%, #F3F6FF 55%, #E6ECFF 100%)",
          ].join(", "),
          borderTop: `1px solid ${SA.line}`,
        }}
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))] gap-x-8 gap-y-12 pb-14">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Image src="/logo.svg" alt="Blue-IQ" width={130} height={34} />
              <p className="mt-5 font-display text-[1.5rem] leading-[1.25] tracking-[-0.02em] max-w-[18ch]" style={{ color: SA.ink }}>
                The document AI company. Every product runs on Sonar.
              </p>
            </div>
            {cols.map((col) => (
              <nav key={col.h} aria-label={col.h}>
                <h3 className="font-sans-g text-[13px] font-medium uppercase tracking-[0.12em]" style={{ color: "#4A4B53" }}>
                  {col.h}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.l.map(([label, href, ext]) => (
                    <li key={label + href}>
                      <a
                        href={href}
                        target={ext ? "_blank" : undefined}
                        rel={ext ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 font-sans-g text-[15px] transition-colors duration-150 hover:text-[#2348B8] hover:underline underline-offset-4"
                        style={{ color: "#2A2B33" }}
                      >
                        {label}
                        {ext && <IconArrowUpRight size={13} />}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div
            className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(31,42,107,0.12)" }}
          >
            <p className="font-sans-g text-[13.5px]" style={{ color: "#3A3B44" }}>
              © {new Date().getFullYear()} Blue-IQ. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                ["Privacy", "/privacy"],
                ["Terms", "/terms"],
                ["Trust", "/trust"],
                ["Accessibility", "/accessibility"],
              ].map(([t, h]) => (
                <Link key={h} href={h} className="font-sans-g text-[13.5px] transition-colors duration-150 hover:text-[#2348B8]" style={{ color: "#3A3B44" }}>
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
