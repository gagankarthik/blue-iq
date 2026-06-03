import Image from "next/image";
import Link from "next/link";
import { C } from "@/lib/theme";

const cols: { h: string; l: [string, string, boolean][] }[] = [
  { h: "Platform", l: [["HIRE", "/hire", false], ["GOVERN", "https://govern.blue-iq.ai/", true], ["SPEND", "/spend", false], ["Sonar", "/#platform", false]] },
  { h: "Company", l: [["Resources", "/resources", false], ["Pricing", "/contact", false], ["FAQ", "/#faq", false], ["Contact", "/contact", false]] },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: C.ink, color: "#fff" }}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-20 pb-10">
        {/* top: brand statement + columns */}
        <div className="grid grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr] gap-x-8 gap-y-12 pb-16">
          <div className="col-span-2 lg:col-span-1 max-w-xs">
            <Image src="/logo_large.webp" alt="Blue-IQ" width={108} height={35} className="mb-5 brightness-0 invert" />
            <p className="font-sans-g text-[13.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              The intelligence layer for workforce, vendors, and services operations.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-mono-g text-[10.5px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.55)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.green }} /> SOC 2 Type II
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.h}>
              <div className="font-mono-g text-[10px] uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>{col.h}</div>
              <ul className="space-y-3">
                {col.l.map(([label, href, ext]) => (
                  <li key={label}>
                    <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
                      className="font-sans-g text-[13.5px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {label}{ext && <span className="ml-1 text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* oversized colorful wordmark — centered */}
        <div className="overflow-hidden text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} aria-hidden>
          <div className="font-display font-bold tracking-[-0.045em] leading-none select-none pt-10 pb-3 inline-block"
            style={{
              fontSize: "clamp(72px,17vw,260px)",
              backgroundImage: "linear-gradient(115deg, #46D6E6 0%, #5B6CF0 34%, #2C49D6 62%, #F2A6D8 100%)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              filter: "drop-shadow(0 10px 50px rgba(91,108,240,0.4))",
            }}>
            blue-iq
          </div>
        </div>

        {/* legal row */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="font-mono-g text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>© 2026 Blue-IQ — the intelligence layer.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-mono-g text-[11px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>Privacy</Link>
            <Link href="/terms" className="font-mono-g text-[11px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>Terms</Link>
            <a href="mailto:hello@blue-iq.com" className="font-mono-g text-[11px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>hello@blue-iq.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
