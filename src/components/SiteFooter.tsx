import Image from "next/image";
import Link from "next/link";
import { C } from "@/lib/theme";

const cols: { h: string; l: [string, string, boolean][] }[] = [
  { h: "Platform", l: [["HIRE", "/#platform", false], ["GOVERN", "https://govern.blue-iq.ai/", true], ["SPEND", "/#platform", false]] },
  { h: "Company", l: [["Customers", "/#stories", false], ["Pricing", "/contact", false], ["Contact", "/contact", false]] },
  { h: "Resources", l: [["Resources hub", "/resources", false], ["Documentation", "/resources", false], ["FAQ", "/#faq", false]] },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.line}` }}>
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-x-6 gap-y-9 md:gap-10 pb-10" style={{ borderBottom: `1px solid ${C.line}` }}>
          <div className="col-span-2 md:col-span-1 max-w-xs">
            <Image src="/logo_large.webp" alt="Blue-IQ" width={104} height={34} className="mb-4" />
            <p className="font-sans-g text-[13px] leading-relaxed" style={{ color: C.sub }}>The intelligence layer for workforce, vendors, and services operations.</p>
          </div>
          {cols.map((col) => (
            <div key={col.h}>
              <div className="font-mono-g text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: C.faint }}>{col.h}</div>
              <ul className="space-y-2.5">
                {col.l.map(([label, href, ext]) => (
                  <li key={label}>
                    <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} className="font-sans-g text-[13px] transition-colors hover:opacity-60" style={{ color: C.sub }}>
                      {label}{ext && <span className="ml-1" style={{ color: C.faint }}>↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono-g text-[11px]" style={{ color: C.faint }}>© 2026 Blue-IQ — the intelligence layer.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-mono-g text-[11px] transition-colors hover:opacity-60" style={{ color: C.sub }}>Privacy</Link>
            <Link href="/terms" className="font-mono-g text-[11px] transition-colors hover:opacity-60" style={{ color: C.sub }}>Terms</Link>
            <a href="mailto:hello@blue-iq.com" className="font-mono-g text-[11px] transition-colors hover:opacity-60" style={{ color: C.sub }}>hello@blue-iq.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
