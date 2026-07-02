import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { UI, CARD } from "@/lib/theme";
import {
  FileText, Code2, Layers, Star, CalendarDays, LifeBuoy, ShieldCheck, FileCheck2,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resources — docs, guides & API reference",
  description:
    "Documentation, API reference, guides, and security details for ParsingLab and Govern, the two products built on the Blue-IQ Sonar engine.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Blue-IQ Resources",
    description: "Docs, developer references, guides, and security details for ParsingLab and Govern.",
    url: "https://blue-iq.com/resources",
    type: "website",
  },
};

type Res = { cat: string; title: string; desc: string; href: string; external?: boolean; Icon: LucideIcon };
const resources: Res[] = [
  { cat: "Docs", title: "Documentation", desc: "Setup, configuration, and integration guides for ParsingLab and Govern.", href: "/contact", Icon: FileText },
  { cat: "Developers", title: "API reference", desc: "Endpoints, webhooks, and authentication for building on the ParsingLab API.", href: "/contact", Icon: Code2 },
  { cat: "Playbooks", title: "Guides & playbooks", desc: "How to get accurate results from resumes, scans, and complex contracts.", href: "/contact", Icon: Layers },
  { cat: "Customers", title: "Case studies", desc: "How staffing, legal, and procurement teams cut their review time.", href: "/contact", Icon: Star },
  { cat: "Events", title: "Webinars & events", desc: "Live sessions and recordings on document intelligence and compliance.", href: "/contact", Icon: CalendarDays },
  { cat: "Support", title: "Help center", desc: "Answers to common questions and direct ways to reach our team.", href: "/contact", Icon: LifeBuoy },
  { cat: "Trust", title: "Security & compliance", desc: "SOC 2 Type II, HIPAA and GDPR alignment, and how we handle your data.", href: "/privacy", Icon: ShieldCheck },
  { cat: "Product", title: "Govern docs", desc: "Documentation for Govern, our contract-intelligence product, at govern.blue-iq.ai.", href: "https://govern.blue-iq.ai/", external: true, Icon: FileCheck2 },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-10">
        <h1 className="font-display font-bold tracking-[-0.03em] leading-[1.02]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: UI.ink }}>
          Everything you need to build with Blue-IQ.
        </h1>
        <p className="font-sans-g text-[16px] sm:text-[17px] leading-relaxed mt-6 max-w-[58ch]" style={{ color: UI.sub }}>
          Documentation, developer references, and practical guides for ParsingLab and Govern, along with the security details enterprise teams ask for.
        </p>
      </section>

      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.href}
              target={r.external ? "_blank" : undefined}
              rel={r.external ? "noopener noreferrer" : undefined}
              className="group rounded-2xl p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1"
              style={{ background: UI.surface, border: `1px solid ${UI.line}`, boxShadow: CARD }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="grid place-items-center w-11 h-11 rounded-xl" style={{ background: UI.soft, color: UI.blue }}><r.Icon className="w-[21px] h-[21px]" strokeWidth={1.6} /></span>
                <span className="font-sans-g text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: UI.faint }}>{r.cat}</span>
              </div>
              <h2 className="font-display text-[19px] font-bold mb-2" style={{ color: UI.ink }}>{r.title}</h2>
              <p className="font-sans-g text-[13.5px] leading-relaxed flex-1" style={{ color: UI.sub }}>{r.desc}</p>
              <span className="inline-flex items-center gap-1.5 mt-5 font-sans-g text-[13px] font-semibold transition-transform group-hover:translate-x-1" style={{ color: UI.blue2 }}>
                {r.external ? <>Open site <span aria-hidden>↗</span></> : <>Open <span aria-hidden>→</span></>}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-2xl px-7 sm:px-10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: UI.blue }}>
          <div>
            <h2 className="font-display text-[20px] font-bold text-white">Can&apos;t find what you need?</h2>
            <p className="font-sans-g text-[14px] mt-1" style={{ color: "rgba(255,255,255,0.78)" }}>Our team replies within a business day.</p>
          </div>
          <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-semibold px-6 py-3 rounded-lg shrink-0 transition-transform hover:-translate-y-0.5" style={{ background: "#fff", color: UI.blue }}>
            Talk to us <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
