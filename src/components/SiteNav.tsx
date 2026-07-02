"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  FileText, ShieldCheck, ArrowUpRight, MoveRight, ArrowRight, Menu, X, ChevronDown,
} from "lucide-react";
import { MZ } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

type Item = { label: string; href: string; external?: boolean; badge?: string };
type Group = { header: string; items: Item[] };
type Menu = {
  id: string; label: string; href: string;
  featured: { title: string; blurb: string; cta: string; geo: string; tint: string };
  groups: Group[];
};

const menus: Menu[] = [
  {
    id: "platform", label: "Platform", href: "/products",
    featured: { title: "The Sonar platform", blurb: "Two products, plus custom builds, one engine.", cta: "Explore the platform", geo: "Geometric-Line-04.svg", tint: "#EAF0FF" },
    groups: [
      { header: "Products", items: [{ label: "All products", href: "/products" }, { label: "ParsingLab", href: "https://www.parsinglab.blue-iq.ai/", external: true }, { label: "Govern", href: "https://govern.blue-iq.ai/", external: true }] },
      { header: "Engine", items: [{ label: "Sonar engine", href: "/about#sonar" }, { label: "How it works", href: "/about#sonar" }, { label: "Confidence scoring", href: "/about#sonar" }] },
      { header: "Build", items: [{ label: "Integrations", href: "/solutions#integrations" }, { label: "API reference", href: "/resources" }, { label: "Webhooks", href: "/resources", badge: "New" }] },
    ],
  },
  {
    id: "solutions", label: "Solutions", href: "/solutions",
    featured: { title: "Custom builds", blurb: "A product shaped around your workflow.", cta: "Start a project", geo: "Geometric-Line-08.svg", tint: "#EAF7F0" },
    groups: [
      { header: "Use cases", items: [{ label: "Custom development", href: "/solutions#custom" }, { label: "Enterprise migrations", href: "/solutions#migrations" }, { label: "Integrations", href: "/solutions#integrations" }] },
      { header: "Industries", items: [{ label: "Healthcare staffing", href: "/solutions#industries" }, { label: "Legal", href: "/solutions#industries" }, { label: "Procurement", href: "/solutions#industries" }] },
      { header: "Roles", items: [{ label: "Operations", href: "/solutions" }, { label: "Legal teams", href: "/solutions" }, { label: "Engineering", href: "/solutions" }] },
    ],
  },
  {
    id: "resources", label: "Resources", href: "/resources",
    featured: { title: "Docs & guides", blurb: "Everything to integrate Blue-IQ.", cta: "Browse the library", geo: "Geometric-Line-14.svg", tint: "#FBEAFB" },
    groups: [
      { header: "Learn", items: [{ label: "Documentation", href: "/resources" }, { label: "API reference", href: "/resources" }, { label: "Guides", href: "/resources" }] },
      { header: "Proof", items: [{ label: "Customer stories", href: "/resources" }, { label: "Webinars & events", href: "/resources", badge: "New" }] },
      { header: "Support", items: [{ label: "Security", href: "/privacy" }, { label: "Contact us", href: "/contact" }] },
    ],
  },
  {
    id: "customers", label: "Customers", href: "/resources",
    featured: { title: "In the field", blurb: "How teams dig out of documents.", cta: "Read customer stories", geo: "Geometric-Line-05.svg", tint: "#FFF3E0" },
    groups: [
      { header: "By industry", items: [{ label: "Healthcare staffing", href: "/solutions#industries" }, { label: "Legal", href: "/solutions#industries" }, { label: "Procurement", href: "/solutions#industries" }, { label: "Compliance", href: "/solutions#industries" }] },
      { header: "Proof", items: [{ label: "Customer stories", href: "/resources" }, { label: "Results & ROI", href: "/resources" }] },
    ],
  },
  {
    id: "pricing", label: "Pricing", href: "/contact",
    featured: { title: "Simple pricing", blurb: "Scoped to what you run.", cta: "See plans", geo: "Geometric-Line-06.svg", tint: "#EAF0FF" },
    groups: [
      { header: "Plans", items: [{ label: "Plans overview", href: "/contact" }, { label: "Compare products", href: "/products" }, { label: "Talk to sales", href: "/contact" }] },
    ],
  },
];

const loginItems: Item[] = [
  { label: "ParsingLab", href: "https://www.parsinglab.blue-iq.ai/", external: true },
  { label: "Govern", href: "https://govern.blue-iq.ai/", external: true },
];

function LinkRow({ it, onClick }: { it: Item; onClick?: () => void }) {
  return (
    <a href={it.href} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener noreferrer" : undefined} onClick={onClick}
      className="group inline-flex items-center gap-1.5 font-sans-g text-[15px] font-medium py-2 transition-colors" style={{ color: MZ.ink }}
      onMouseOver={(e) => (e.currentTarget.style.color = MZ.accent)} onMouseOut={(e) => (e.currentTarget.style.color = MZ.ink)}>
      {it.label}
      {it.external && <ArrowUpRight className="w-3.5 h-3.5 opacity-40" strokeWidth={2} />}
      {it.badge && <span className="font-sans-g text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: MZ.soft, color: MZ.accent }}>{it.badge}</span>}
    </a>
  );
}

function LoginMenu() {
  const [open, setOpen] = useState(false);
  const Icons = [FileText, ShieldCheck];
  return (
    <div className="hidden md:block relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl font-sans-g text-[14.5px] font-semibold transition-colors" style={{ color: open ? MZ.accent : MZ.ink }} aria-expanded={open}>
        Log in
        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" strokeWidth={2} style={{ transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.22, ease }}
            className="absolute right-0 top-full pt-2.5 w-[290px] origin-top-right">
            <div className="rounded-2xl p-2" style={{ background: MZ.surface, border: `1px solid ${MZ.line2}`, boxShadow: "0 26px 54px -24px rgba(20,18,10,0.3)" }}>
              <p className="font-sans-g text-[11px] font-semibold uppercase tracking-[0.13em] px-2.5 pt-1.5 pb-1.5" style={{ color: MZ.faint }}>Log in to our platforms</p>
              {loginItems.map((it, i) => {
                const Ic = Icons[i];
                return (
                  <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors"
                    onMouseOver={(e) => (e.currentTarget.style.background = MZ.bg2)} onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}>
                    <span className="grid place-items-center w-9 h-9 rounded-xl shrink-0" style={{ background: MZ.soft, color: MZ.accent }}><Ic className="w-4 h-4" strokeWidth={1.8} /></span>
                    <span className="font-sans-g text-[14px] font-semibold flex-1" style={{ color: MZ.ink }}>{it.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40" strokeWidth={2} style={{ color: MZ.sub }} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  const active = menus.find((m) => m.id === open);
  const closeMobile = () => { setMobile(false); setSection(null); };

  return (
    <motion.header
      initial={{ y: -84 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease }}
      onMouseLeave={() => setOpen(null)}
      className="fixed top-0 inset-x-0 z-[60]"
      style={{
        background: "#FFFFFF",
        borderBottom: `1px solid ${scrolled || open ? MZ.line2 : MZ.line}`,
        boxShadow: scrolled && !open ? "0 6px 26px -20px rgba(20,18,10,0.4)" : "none",
        transition: "border-color .3s ease, box-shadow .3s ease",
      }}
    >
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8">
        <div className="h-[84px] flex items-center justify-between gap-6">
          <a href="/" aria-label="Blue-IQ home" className="flex items-center shrink-0">
            <Image src="/logo.svg" alt="Blue-IQ" width={124} height={40} priority />
          </a>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            {menus.map((m) => {
              const on = open === m.id;
              return (
                <div key={m.id} onMouseEnter={() => setOpen(m.id)} className="px-0.5">
                  <a href={m.href} className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-sans-g text-[12.5px] font-semibold uppercase tracking-[0.09em] transition-colors"
                    style={{ color: on ? MZ.ink : MZ.sub }}
                    onMouseOver={(e) => { if (!on) e.currentTarget.style.color = MZ.ink; }} onMouseOut={(e) => { if (!on) e.currentTarget.style.color = MZ.sub; }} aria-expanded={on}>
                    {m.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" strokeWidth={2.2} style={{ transform: on ? "rotate(180deg)" : "none", color: MZ.faint }} />
                  </a>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LoginMenu />
            <Magnetic href="/contact" className="hidden sm:inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold px-5 py-2.5 rounded-full" style={{ background: MZ.ink2, color: "#fff" }}>
              Contact sales <MoveRight className="w-4 h-4" strokeWidth={2} />
            </Magnetic>
            <button className="lg:hidden w-10 h-10 grid place-items-center -mr-1" onClick={() => (mobile ? closeMobile() : setMobile(true))} aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} style={{ color: MZ.ink }}>
              {mobile ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* mega dropdown */}
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.24, ease }}
            className="hidden lg:block absolute inset-x-0 top-full px-5 sm:px-8">
            <div className="max-w-[1080px] mx-auto mt-2.5">
              <div className="rounded-3xl p-4 grid grid-cols-[300px_1fr] gap-4" style={{ background: MZ.surface, border: `1px solid ${MZ.line2}`, boxShadow: "0 32px 72px -30px rgba(20,18,10,0.32)" }}>
                {/* featured card */}
                <a href={active.href} className="group relative rounded-2xl p-6 overflow-hidden flex flex-col justify-between" style={{ background: active.featured.tint, minHeight: 230 }}>
                  <img src={`/Geometrics/${active.featured.geo}`} alt="" aria-hidden className="absolute -top-3 -right-3 w-24 h-24 object-contain opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-light text-[22px] leading-tight tracking-[-0.02em] max-w-[10ch]" style={{ color: MZ.ink }}>{active.featured.title}</h3>
                    </div>
                    <p className="mt-2 font-sans-g text-[13px] leading-snug max-w-[22ch]" style={{ color: MZ.sub }}>{active.featured.blurb}</p>
                  </div>
                  <span className="relative inline-flex items-center gap-1.5 font-sans-g text-[13.5px] font-semibold" style={{ color: MZ.accent }}>
                    {active.featured.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                  </span>
                </a>

                {/* groups */}
                <div className="grid gap-6 px-4 py-2" style={{ gridTemplateColumns: `repeat(${active.groups.length}, minmax(0, 1fr))` }}>
                  {active.groups.map((g) => (
                    <div key={g.header}>
                      <p className="font-sans-g text-[11px] font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: MZ.faint }}>{g.header}</p>
                      <div className="flex flex-col">
                        {g.items.map((it) => <LinkRow key={it.label} it={it} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile sheet */}
      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}
            className="lg:hidden overflow-hidden" style={{ background: "#FFFFFF", borderBottom: `1px solid ${MZ.line2}` }}>
            <div className="max-w-[1340px] mx-auto px-5 sm:px-8 pt-1 pb-5 flex flex-col max-h-[80vh] overflow-y-auto overscroll-contain">
              {menus.map((m) => {
                const exp = section === m.id;
                return (
                  <div key={m.id} style={{ borderTop: `1px solid ${MZ.line}` }}>
                    <button onClick={() => setSection(exp ? null : m.id)} aria-expanded={exp}
                      className="w-full flex items-center justify-between py-4 text-left">
                      <span className="font-sans-g text-[17px] font-medium" style={{ color: exp ? MZ.accent : MZ.ink }}>{m.label}</span>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300 shrink-0" strokeWidth={2} style={{ transform: exp ? "rotate(180deg)" : "none", color: MZ.faint }} />
                    </button>
                    <AnimatePresence initial={false}>
                      {exp && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease }} className="overflow-hidden">
                          <div className="pb-5 flex flex-col gap-4">
                            <a href={m.href} onClick={closeMobile} className="inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold" style={{ color: MZ.accent }}>
                              View {m.label} <ArrowRight className="w-4 h-4" strokeWidth={2} />
                            </a>
                            {m.groups.map((g) => (
                              <div key={g.header}>
                                <p className="font-sans-g text-[11px] font-semibold uppercase tracking-[0.12em] mb-0.5" style={{ color: MZ.faint }}>{g.header}</p>
                                <div className="flex flex-col">
                                  {g.items.map((it) => (
                                    <a key={it.label} href={it.href} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener noreferrer" : undefined} onClick={closeMobile}
                                      className="flex items-center gap-2 py-2 font-sans-g text-[15px]" style={{ color: MZ.sub }}>
                                      {it.label}
                                      {it.external && <ArrowUpRight className="w-3.5 h-3.5 opacity-50" strokeWidth={2} />}
                                      {it.badge && <span className="font-sans-g text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: MZ.soft, color: MZ.accent }}>{it.badge}</span>}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-4 mt-1" style={{ borderTop: `1px solid ${MZ.line}` }}>
                <p className="font-sans-g text-[11px] font-semibold uppercase tracking-[0.12em] pb-1" style={{ color: MZ.faint }}>Log in</p>
                {loginItems.map((it) => (
                  <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer" onClick={closeMobile}
                    className="flex items-center gap-2 py-2.5 font-sans-g text-[15px]" style={{ color: MZ.ink }}>
                    <span className="flex-1 font-medium">{it.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" strokeWidth={2} />
                  </a>
                ))}
              </div>

              <a href="/contact" onClick={closeMobile} className="mt-5 inline-flex items-center justify-center gap-1.5 font-sans-g text-[15px] font-semibold text-white py-3.5 rounded-xl" style={{ background: MZ.accent }}>
                Contact sales <MoveRight className="w-4 h-4" strokeWidth={2} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default memo(SiteNav);
