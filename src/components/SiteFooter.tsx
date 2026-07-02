import Image from "next/image";
import Link from "next/link";
import { UI, DEEP } from "@/lib/theme";

const cols: { h: string; l: [string, string, boolean][] }[] = [
  { h: "Products", l: [["All products", "/products", false], ["ParsingLab", "https://www.parsinglab.blue-iq.ai/", true], ["Govern", "https://govern.blue-iq.ai/", true], ["Sonar engine", "/about#sonar", false]] },
  { h: "Solutions", l: [["Custom development", "/solutions#custom", false], ["Enterprise migrations", "/solutions#migrations", false], ["Integrations", "/solutions#integrations", false], ["Industries", "/solutions#industries", false]] },
  { h: "Resources", l: [["Documentation", "/resources", false], ["Customer stories", "/resources", false], ["Pricing", "/contact", false]] },
  { h: "Company", l: [["About", "/about", false], ["Contact", "/contact", false], ["Privacy", "/privacy", false], ["Terms", "/terms", false]] },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: DEEP, color: "#fff" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-x-8 gap-y-12 pb-16">
          <div className="col-span-2 lg:col-span-1 max-w-xs">
            <Image src="/logo.svg" alt="Blue-IQ" width={112} height={36} className="mb-5 brightness-0 invert" />
            <p className="font-sans-g text-[13.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.66)" }}>
              Blue-IQ is an enterprise software company. We ship our own products and build custom platforms, all on our Sonar engine.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.h}>
              <div className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.14em] mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>{col.h}</div>
              <ul className="space-y-3">
                {col.l.map(([label, href, ext]) => (
                  <li key={label + href}>
                    <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
                      className="font-sans-g text-[13.5px] transition-colors text-[rgba(255,255,255,0.74)] hover:text-white">
                      {label}{ext && <span className="ml-1 text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* compliance + legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5" style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          <div className="flex flex-wrap items-center gap-2.5">
           <p className="mt-6 font-sans-g text-[12px]" style={{ color: "rgba(255,255,255,0.45)" }}>© 2026 Blue-IQ. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans-g text-[12.5px] transition-colors text-[rgba(255,255,255,0.62)] hover:text-white">Privacy</Link>
            <Link href="/terms" className="font-sans-g text-[12.5px] transition-colors text-[rgba(255,255,255,0.62)] hover:text-white">Terms</Link>
            <a href="mailto:hello@blue-iq.com" className="font-sans-g text-[12.5px] transition-colors text-[rgba(255,255,255,0.62)] hover:text-white">hello@blue-iq.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
