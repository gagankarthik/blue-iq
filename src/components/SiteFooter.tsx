import Link from "next/link";
import { MZ } from "@/lib/theme";

const cols: { h: string; l: [string, string, boolean][] }[] = [
  { h: "Company", l: [["About", "/about", false], ["Solutions", "/solutions", false], ["Careers", "/contact", false], ["Contact us", "/contact", false]] },
  { h: "Platform", l: [["Pricing", "/contact", false], ["ParsingLab", "https://www.parsinglab.blue-iq.ai/", true], ["Govern", "https://govern.blue-iq.ai/", true], ["Sonar engine", "/about#sonar", false], ["Integrations", "/solutions#integrations", false]] },
  { h: "Resources", l: [["Documentation", "/resources", false], ["API reference", "/resources", false], ["Customer stories", "/resources", false], ["Security", "/privacy", false], ["Guides", "/resources", false]] },
  { h: "Use cases", l: [["Healthcare staffing", "/solutions#industries", false], ["Legal", "/solutions#industries", false], ["Procurement", "/solutions#industries", false], ["Compliance", "/solutions#industries", false]] },
];



export default function SiteFooter() {
  return (
    <footer style={{ background: MZ.bg, borderTop: `1px solid ${MZ.line}` }}>
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 pt-20 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-[repeat(4,1fr)_1.3fr] gap-x-8 gap-y-12">
          {cols.map((col) => (
            <div key={col.h}>
              <div className="font-sans-g text-[11px] font-semibold uppercase tracking-[0.12em] mb-5 inline-block px-2 py-1 rounded-md" style={{ background: MZ.bg2, color: MZ.sub }}>{col.h}</div>
              <ul className="space-y-3.5">
                {col.l.map(([label, href, ext]) => (
                  <li key={label + href}>
                    <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
                      className="font-sans-g text-[14.5px] transition-colors" style={{ color: MZ.ink }}>
                      {label}{ext && <span className="ml-1 text-[11px]" style={{ color: MZ.faint }}>↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${MZ.line2}`, background: MZ.surface }}>
              <div className="relative h-[132px] overflow-hidden" style={{ background: "linear-gradient(135deg, #002181 0%, #14120D 100%)" }}>
                <div aria-hidden className="absolute inset-0 bx-blueprint opacity-20" />
                <div className="absolute inset-0 flex items-center px-5">
                  <span className="font-display font-light text-[17px] leading-tight tracking-tight" style={{ color: "rgba(255,255,255,0.94)" }}>The Blue-IQ<br />dispatch</span>
                </div>
              </div>
              <div className="p-5">
                <div className="font-display font-light text-[18px] tracking-tight" style={{ color: MZ.ink }}>Sign up for our newsletter</div>
                <div className="mt-3 flex items-center gap-2">
                  <input type="email" placeholder="Enter your email" aria-label="Email address"
                    className="flex-1 rounded-lg px-3 py-2.5 font-sans-g text-[13px] outline-none" style={{ background: MZ.bg, border: `1px solid ${MZ.line2}`, color: MZ.ink }} />
                  <button className="rounded-lg px-4 py-2.5 font-sans-g text-[13px] font-semibold text-white shrink-0" style={{ background: MZ.ink2 }}>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* giant wordmark */}
        <div className="mt-16 select-none" aria-hidden>
          <div className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(3rem, 18vw, 16rem)", color: MZ.ink }}>Blue-IQ</div>
        </div>

        {/* legal */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: `1px solid ${MZ.line2}` }}>
          <p className="font-sans-g text-[12.5px]" style={{ color: MZ.faint }}>© 2026 Blue-IQ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans-g text-[12.5px]" style={{ color: MZ.sub }}>Privacy</Link>
            <Link href="/terms" className="font-sans-g text-[12.5px]" style={{ color: MZ.sub }}>Terms</Link>
            <a href="mailto:hello@blue-iq.com" className="font-sans-g text-[12.5px]" style={{ color: MZ.sub }}>hello@blue-iq.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
