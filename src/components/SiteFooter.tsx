import Image from "next/image";
import Link from "next/link";
import { SA } from "@/lib/theme";
import { IconArrowUpRight, IconShield } from "@/components/icons/BqIcons";
import CtaBand from "@/components/CtaBand";

/* ────────────────────────────────────────────────────────────────
   The close: one navy band with the offer, then a plain sitemap on white.

   The neumorphic surface is gone (embossed wordmark, paired shadows, a
   recessed well) — soft-UI is one of the most dated template looks there is
   and it failed contrast on every link. Every link below resolves to a page
   that exists. `cta` is off on /contact, where the offer would point at the
   page you are already on.

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
    ],
  },
  {
    h: "Industries",
    l: [
      ["IT sector", "/solutions#it", false],
      ["Education", "/solutions#education", false],
      ["Workforce", "/solutions#workforce", false],
      ["Healthcare staffing", "/solutions#healthcare", false],
      ["Legal and contracts", "/solutions#legal", false],
      ["Procurement and finance", "/solutions#procurement", false],
    ],
  },
  {
    h: "Build",
    l: [
      ["How the API works", "/resources#api", false],
      ["Formats it reads", "/resources#formats", false],
      ["Integrations", "/solutions#integrations", false],
      ["Custom development", "/solutions#custom", false],
    ],
  },
  {
    h: "Company",
    l: [
      ["About", "/about", false],
      ["The Sonar engine", "/about#sonar", false],
      ["Security and privacy", "/privacy", false],
      ["Contact", "/contact", false],
    ],
  },
];

export default function SiteFooter({ cta = true }: { cta?: boolean }) {
  return (
    <footer style={{ background: SA.bg }}>
      {cta && <CtaBand />}

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-2 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-1">
            <Image src="/logo.svg" alt="Blue-IQ" width={112} height={36} />
            <p className="mt-5 font-sans-g text-[14.5px] leading-[1.65] max-w-[34ch]" style={{ color: SA.sub }}>
              Blue-IQ is a document AI platform for teams that run on paperwork. Every product is powered by Sonar.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 font-sans-g text-[13.5px]" style={{ color: SA.sub }}>
              <IconShield size={17} style={{ color: SA.accent }} />
              SOC 2, HIPAA and GDPR aligned
            </p>
          </div>
          {cols.map((col) => (
            <nav key={col.h} aria-label={col.h}>
              <h3 className="font-sans-g text-[13.5px] font-semibold" style={{ color: SA.ink }}>
                {col.h}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.l.map(([label, href, ext]) => (
                  <li key={label + href}>
                    <a
                      href={href}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 font-sans-g text-[14.5px] transition-colors hover:text-[#1D5BF0]"
                      style={{ color: SA.sub }}
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

        <div className="mt-16 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: `1px solid ${SA.line}` }}>
          <p className="font-sans-g text-[13px]" style={{ color: SA.sub }}>
            © {new Date().getFullYear()} Blue-IQ. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans-g text-[13px] transition-colors hover:text-[#1D5BF0]" style={{ color: SA.sub }}>
              Privacy
            </Link>
            <Link href="/terms" className="font-sans-g text-[13px] transition-colors hover:text-[#1D5BF0]" style={{ color: SA.sub }}>
              Terms
            </Link>
            <a href="mailto:hello@blue-iq.ai" className="font-sans-g text-[13px] transition-colors hover:text-[#1D5BF0]" style={{ color: SA.sub }}>
              hello@blue-iq.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
