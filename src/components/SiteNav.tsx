"use client";

import Image from "next/image";
import { memo, useState, type ComponentType } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Radar, FileText, ShieldCheck, Boxes, GitMerge, Plug, Building2,
  LayoutGrid, BookOpen, Code2, Star, CalendarDays, CreditCard, Mail,
  ArrowUpRight, MoveRight, Menu, X, ChevronDown,
} from "lucide-react";
import { UI } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;
type Item = { label: string; sub: string; href: string; external?: boolean; Icon: ComponentType<{ className?: string; strokeWidth?: number }> };
type Category = { label: string; items: Item[] };

const productItems: Item[] = [
  { label: "All products", sub: "Everything we've shipped", href: "/products", Icon: LayoutGrid },
  { label: "ParsingLab", sub: "Resume parsing API", href: "https://www.parsinglab.blue-iq.ai/", external: true, Icon: FileText },
  { label: "Govern", sub: "Contract intelligence", href: "https://govern.blue-iq.ai/", external: true, Icon: ShieldCheck },
  { label: "Sonar engine", sub: "The AI core we build on", href: "/about#sonar", Icon: Radar },
];
const solutionItems: Item[] = [
  { label: "Custom development", sub: "Products built to fit", href: "/solutions#custom", Icon: Boxes },
  { label: "Enterprise migrations", sub: "Off legacy, safely", href: "/solutions#migrations", Icon: GitMerge },
  { label: "Integrations", sub: "Into your existing stack", href: "/solutions#integrations", Icon: Plug },
  { label: "Industries", sub: "Where we work", href: "/solutions#industries", Icon: Building2 },
];
const resourceCategories: Category[] = [
  { label: "Learn", items: [
    { label: "Documentation", sub: "Setup & integration guides", href: "/resources", Icon: BookOpen },
    { label: "API reference", sub: "Endpoints & authentication", href: "/resources", Icon: Code2 },
  ] },
  { label: "Proof", items: [
    { label: "Customer stories", sub: "Results from the field", href: "/resources", Icon: Star },
    { label: "Webinars & events", sub: "Live sessions & recordings", href: "/resources", Icon: CalendarDays },
  ] },
  { label: "Trust", items: [
    { label: "Security & compliance", sub: "SOC 2, HIPAA, GDPR", href: "/privacy", Icon: ShieldCheck },
    { label: "Pricing", sub: "Plans & how to start", href: "/contact", Icon: CreditCard },
  ] },
  { label: "Company", items: [
    { label: "About", sub: "The company behind Blue-IQ", href: "/about", Icon: Building2 },
    { label: "Contact", sub: "Talk to our team", href: "/contact", Icon: Mail },
  ] },
];

type MenuId = "products" | "solutions" | "resources" | null;
const menus: { id: Exclude<MenuId, null>; label: string; href: string; categories: Category[]; blurb: string }[] = [
  { id: "products", label: "Products", href: "/products", categories: [{ label: "", items: productItems }], blurb: "Software we've built, ready to put to work." },
  { id: "solutions", label: "Solutions", href: "/solutions", categories: [{ label: "", items: solutionItems }], blurb: "Custom products and platforms, engineered around you." },
  { id: "resources", label: "Resources", href: "/resources", categories: resourceCategories, blurb: "Docs, guides, proof, and the company behind Blue-IQ." },
];

function ItemLink({ it, dense = false, onClick }: { it: Item; dense?: boolean; onClick?: () => void }) {
  return (
    <a href={it.href} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener noreferrer" : undefined} onClick={onClick}
      className={`group flex items-start gap-3 rounded-lg transition-colors ${dense ? "p-2" : "p-3.5"}`}
      onMouseOver={(e) => (e.currentTarget.style.background = UI.soft)} onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}>
      <span className={`grid place-items-center rounded-lg shrink-0 ${dense ? "w-8 h-8" : "w-10 h-10"}`} style={{ background: UI.surface, border: `1px solid ${UI.line}`, color: UI.blue }}>
        <it.Icon className={dense ? "w-4 h-4" : "w-5 h-5"} strokeWidth={1.6} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 font-sans-g font-semibold" style={{ color: UI.ink, fontSize: dense ? 13.5 : 14.5 }}>
          {it.label}{it.external && <ArrowUpRight className="w-3.5 h-3.5 opacity-50" strokeWidth={2} />}
        </span>
        <span className="block font-sans-g leading-snug mt-0.5" style={{ color: UI.sub, fontSize: dense ? 12 : 12.5 }}>{it.sub}</span>
      </span>
    </a>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuId>(null);
  const [mobile, setMobile] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  const solid = scrolled || !!open;
  const active = menus.find((m) => m.id === open);
  const isGrouped = active ? active.categories.length > 1 : false;
  const allMobileItems = menus.flatMap((m) => m.categories.flatMap((c) => c.items));

  return (
    <motion.header
      initial={{ y: -70 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease }}
      onMouseLeave={() => setOpen(null)}
      className="fixed top-0 inset-x-0 z-[60]"
      style={{
        background: solid ? "rgba(247,248,250,0.85)" : "transparent",
        backdropFilter: solid ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${solid ? UI.line : "transparent"}`,
        transition: "background .3s ease, border-color .3s ease",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="h-[68px] flex items-center justify-between gap-4">
          <a href="/" aria-label="Blue-IQ home" className="flex items-center shrink-0">
            <Image src="/logo.svg" alt="Blue-IQ" width={100} height={33} priority />
          </a>

          {/* center nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {menus.map((m) => (
              <div key={m.id} onMouseEnter={() => setOpen(m.id)} className="px-1">
                <a href={m.href} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg font-sans-g text-[14px] font-medium transition-colors"
                  style={{ color: open === m.id ? UI.blue : UI.ink }} aria-expanded={open === m.id}>
                  {m.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform" strokeWidth={2} style={{ transform: open === m.id ? "rotate(180deg)" : "none" }} />
                </a>
              </div>
            ))}
          </nav>

          {/* right actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Magnetic href="/contact" className="hidden sm:inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold px-4 py-2.5 rounded-lg" style={{ background: UI.blue, color: "#fff", boxShadow: `0 10px 24px -12px ${UI.blue}` }}>
              Talk to us <MoveRight className="w-4 h-4" strokeWidth={2} />
            </Magnetic>
            <button className="lg:hidden w-10 h-10 grid place-items-center -mr-1" onClick={() => setMobile(!mobile)} aria-label="Menu" aria-expanded={mobile} style={{ color: UI.ink }}>
              {mobile ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* mega dropdown */}
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24, ease }}
            className="hidden lg:block absolute inset-x-0 top-full" style={{ background: "rgba(247,248,250,0.98)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${UI.line}`, borderTop: `1px solid ${UI.line}` }}>
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-9 grid grid-cols-[0.85fr_2.4fr] gap-12">
              <div>
                <p className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: UI.blue2 }}>{active.label}</p>
                <p className="font-display text-[24px] font-bold tracking-[-0.02em] leading-[1.1]" style={{ color: UI.ink }}>{active.blurb}</p>
                <a href={active.href} className="inline-flex items-center gap-1.5 mt-5 font-sans-g text-[13.5px] font-semibold" style={{ color: UI.blue2 }}>
                  View all <MoveRight className="w-4 h-4" strokeWidth={2} />
                </a>
              </div>

              {isGrouped ? (
                <div className="grid grid-cols-4 gap-6">
                  {active.categories.map((cat) => (
                    <div key={cat.label}>
                      <p className="font-sans-g text-[11px] font-semibold uppercase tracking-[0.12em] mb-2 px-2" style={{ color: UI.faint }}>{cat.label}</p>
                      <div className="space-y-0.5">
                        {cat.items.map((it) => <ItemLink key={it.label} it={it} dense />)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {active.categories[0].items.map((it) => <ItemLink key={it.label} it={it} />)}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile sheet */}
      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}
            className="lg:hidden overflow-hidden" style={{ background: "rgba(247,248,250,0.99)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${UI.line}` }}>
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4 flex flex-col max-h-[75vh] overflow-y-auto">
              {allMobileItems.map((it) => (
                <a key={it.label + it.href} href={it.href} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener noreferrer" : undefined} onClick={() => setMobile(false)}
                  className="flex items-center gap-3 py-3" style={{ borderTop: `1px solid ${UI.line}`, color: UI.ink }}>
                  <span style={{ color: UI.blue }}><it.Icon className="w-5 h-5" strokeWidth={1.6} /></span>
                  <span className="font-sans-g text-[16px] font-medium flex-1">{it.label}</span>
                  {it.external && <ArrowUpRight className="w-4 h-4 opacity-50" strokeWidth={2} />}
                </a>
              ))}
              <a href="/contact" onClick={() => setMobile(false)} className="mt-4 mb-2 inline-flex items-center justify-center gap-1.5 font-sans-g text-[15px] font-semibold text-white py-3 rounded-lg" style={{ background: UI.blue }}>
                Talk to us <MoveRight className="w-4 h-4" strokeWidth={2} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default memo(SiteNav);
