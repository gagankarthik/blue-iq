import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import CtaBand from "@/components/CtaBand";
import { UI } from "@/lib/theme";
import {
  FileText, Code2, Layers, History, Star, CalendarDays, LifeBuoy, ShieldCheck, FileCheck2,
  ArrowUpRight, ArrowRight, type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Docs, API Reference & Guides",
  description:
    "Documentation, REST API reference, integration guides, and security details for the Blue-IQ document AI platform, ParsingLab, and Govern.",
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
  { cat: "Playbooks", title: "Guides & playbooks", desc: "Getting accurate results from resumes, scans, and complex multi-party contracts.", href: "/contact", Icon: Layers },
  { cat: "Product", title: "Changelog", desc: "New models, endpoints, and connectors: what shipped and what changed, by date.", href: "/contact", Icon: History },
  { cat: "Customers", title: "Customer stories", desc: "How staffing, legal, and procurement teams cut their document review time.", href: "/contact", Icon: Star },
  { cat: "Events", title: "Webinars & recordings", desc: "Live sessions and archives on document intelligence, extraction, and compliance.", href: "/contact", Icon: CalendarDays },
  { cat: "Support", title: "Help center", desc: "Answers to common questions and direct ways to reach the Blue-IQ team.", href: "/contact", Icon: LifeBuoy },
  { cat: "Trust", title: "Security & compliance", desc: "SOC 2 Type II, HIPAA and GDPR alignment, and how we handle your documents.", href: "/privacy", Icon: ShieldCheck },
  { cat: "Product", title: "Govern docs", desc: "Documentation for Govern, our contract-intelligence product, at govern.blue-iq.ai.", href: "https://govern.blue-iq.ai/", external: true, Icon: FileCheck2 },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      {/* ───────── hero ───────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none bx-blueprint opacity-[0.5]" />
        <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-14 sm:pb-16">
          <span className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue }}>
            Resources
          </span>
          <h1 className="mt-5 font-display font-light tracking-[-0.03em] leading-[1.02] max-w-[16ch]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: UI.ink }}>
            Everything you need to build with Blue-IQ.
          </h1>
          <p className="font-sans-g text-[16px] sm:text-[17px] leading-relaxed mt-6 max-w-[54ch]" style={{ color: UI.sub }}>
            Documentation, developer references, and practical guides for ParsingLab and Govern, alongside the
            security details enterprise teams ask for before they connect their systems.
          </p>
        </div>
      </section>

      {/* ───────── bordered resource grid ───────── */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderTop: `1px solid ${UI.line2}`, borderLeft: `1px solid ${UI.line2}` }}
        >
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.href}
              target={r.external ? "_blank" : undefined}
              rel={r.external ? "noopener noreferrer" : undefined}
              className="group relative flex flex-col p-7 transition-colors hover:bg-[#F1EDE4]"
              style={{ borderRight: `1px solid ${UI.line2}`, borderBottom: `1px solid ${UI.line2}` }}
            >
              <div className="flex items-center gap-2.5">
                <r.Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} style={{ color: UI.blue }} />
                <span className="font-mono-g text-[12px] uppercase tracking-[0.08em]" style={{ color: UI.faint }}>
                  {r.cat}
                </span>
              </div>

              <h3 className="mt-5 font-display font-light tracking-[-0.02em] leading-[1.15]" style={{ fontSize: "1.25rem", color: UI.ink }}>
                {r.title}
              </h3>
              <p className="mt-2.5 font-sans-g text-[14px] leading-relaxed flex-1" style={{ color: UI.sub }}>
                {r.desc}
              </p>

              <span
                className="mt-6 inline-flex items-center gap-1.5 font-sans-g text-[13px] font-medium transition-transform group-hover:translate-x-0.5"
                style={{ color: UI.blue2 }}
              >
                {r.external ? (
                  <>Open site <ArrowUpRight className="w-[15px] h-[15px]" strokeWidth={1.8} /></>
                ) : (
                  <>Open <ArrowRight className="w-[15px] h-[15px]" strokeWidth={1.8} /></>
                )}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ───────── closing CTA ───────── */}
      <CtaBand
        eyebrow="Can't find it?"
        title="Tell us what your team is working with."
        text="Whether it's a specific integration, a security questionnaire, or a document type you don't see covered, our team replies within a business day."
        primary={{ label: "Talk to us", href: "/contact" }}
        secondary={{ label: "See our products", href: "/products" }}
      />
    </SiteShell>
  );
}
