import type { Metadata } from "next";
import type { ComponentType } from "react";
import SiteShell from "@/components/SiteShell";
import { C, SHADOW_SM } from "@/lib/theme";
import { IconDoc, IconCode, IconLayers, IconStar, IconCalendar, IconLifebuoy, IconShield, IconGovern } from "@/components/icons";

export const metadata: Metadata = {
  title: "Resources — Blue-IQ",
  description: "Documentation, API reference, guides, case studies, and security resources for Blue-IQ HIRE, GOVERN, and SPEND.",
};

type Res = { cat: string; title: string; desc: string; href: string; external?: boolean; Icon: ComponentType<{ className?: string }> };
const resources: Res[] = [
  { cat: "Docs", title: "Documentation", desc: "Setup, configuration, and integration guides for HIRE, GOVERN, and SPEND.", href: "/contact", Icon: IconDoc },
  { cat: "Developers", title: "API reference", desc: "REST endpoints, webhooks, and authentication for building on Blue-IQ.", href: "/contact", Icon: IconCode },
  { cat: "Playbooks", title: "Guides & playbooks", desc: "Best practices for procurement, SOW governance, and contingent spend.", href: "/contact", Icon: IconLayers },
  { cat: "Customers", title: "Case studies", desc: "How procurement and finance teams cut overspend and review time.", href: "/contact", Icon: IconStar },
  { cat: "Events", title: "Webinars & events", desc: "Live sessions and recordings on vendor intelligence and compliance.", href: "/contact", Icon: IconCalendar },
  { cat: "Support", title: "Help center", desc: "Answers to common questions and direct ways to reach our team.", href: "/contact", Icon: IconLifebuoy },
  { cat: "Trust", title: "Security & compliance", desc: "SOC 2 Type II, data handling, and our privacy commitments.", href: "/privacy", Icon: IconShield },
  { cat: "Product", title: "GOVERN docs", desc: "Documentation for the GOVERN SOW-audit product at govern.blue-iq.ai.", href: "https://govern.blue-iq.ai/", external: true, Icon: IconGovern },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-10">
        <p className="font-mono-g text-[11px] uppercase tracking-[0.18em]" style={{ color: C.blue2 }}>Resources</p>
        <h1 className="font-display font-bold tracking-[-0.03em] leading-[1.04] mt-3" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
          Everything you need to get the most out of Blue-IQ.
        </h1>
        <p className="font-sans-g text-[16px] sm:text-[17px] leading-relaxed mt-6 max-w-[60ch]" style={{ color: C.sub }}>
          Documentation, developer references, and practical guides across all three products — plus the security
          details enterprise teams ask for.
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
              className="group rounded-[1.25rem] p-6 flex flex-col transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(14,17,22,0.05),0_18px_40px_-18px_rgba(14,17,22,0.24)]"
              style={{ background: C.surface, border: `1px solid ${C.line}`, boxShadow: SHADOW_SM }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="grid place-items-center w-11 h-11 rounded-xl" style={{ background: C.blueSoft, color: C.blue }}><r.Icon className="w-[22px] h-[22px]" /></span>
                <span className="font-mono-g text-[10px] uppercase tracking-[0.16em]" style={{ color: C.faint }}>{r.cat}</span>
              </div>
              <h2 className="font-display text-[19px] font-bold mb-2" style={{ color: C.ink }}>{r.title}</h2>
              <p className="font-sans-g text-[13.5px] leading-relaxed flex-1" style={{ color: C.sub }}>{r.desc}</p>
              <span className="inline-flex items-center gap-1.5 mt-5 font-mono-g text-[11px] transition-transform group-hover:translate-x-1" style={{ color: C.blue2 }}>
                {r.external ? <>Open site <span aria-hidden>↗</span></> : <>Open <span aria-hidden>→</span></>}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-[1.5rem] px-7 sm:px-10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: C.blue }}>
          <div>
            <h2 className="font-display text-[20px] font-bold text-white">Can&apos;t find what you need?</h2>
            <p className="font-sans-g text-[14px] mt-1" style={{ color: "rgba(255,255,255,0.78)" }}>Our team replies within a business day.</p>
          </div>
          <a href="/contact" className="inline-flex items-center gap-2 font-sans-g text-[14px] font-medium px-6 py-3 rounded-xl shrink-0 transition-transform hover:-translate-y-0.5" style={{ background: "#fff", color: C.blue }}>
            Talk to us <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
