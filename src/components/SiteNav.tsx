"use client";

import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SA } from "@/lib/theme";
import { CaptureArt, SpendArt, GovernArt, CustomArt } from "@/components/art/ProductArt";
import { SonarArt } from "@/components/art/StepArt";
import {
  type BqIcon,
  IconSonar,
  IconCustom,
  IconApi,
  IconCapture,
  IconSpend,
  IconGovern,
  IconCampus,
  IconWorkforce,
  IconNetwork,
  IconHealth,
  IconScale,
  IconReceipt,
  IconDocs,
  IconShield,
  IconArrow,
  IconArrowUpRight,
} from "@/components/icons/BqIcons";

/* ────────────────────────────────────────────────────────────────
   The navbar.

   Three columns — logo, links, actions — so the links sit on the true centre
   of the page. Every page opens on a navy header, so by default the bar is
   transparent with white text over it (pass overDark={false} otherwise);
   the moment the page scrolls or a menu opens it turns white.

   Each menu is a centred panel sized to its content, led by illustrated
   cards on light wells, so there is never a slab of empty white beside the
   links. Only the open panel is mounted.
   ──────────────────────────────────────────────────────────────── */

type Link = { label: string; href: string; external?: boolean; Icon?: BqIcon; blurb?: string };
type Card = { title: string; blurb: string; href: string; external?: boolean; Art: React.ComponentType };
type Menu = { id: string; label: string; cards: Card[]; side: { header: string; links: Link[] }; foot: { t: string; href: string } };

const menus: Menu[] = [
  {
    id: "platform",
    label: "Platform",
    cards: [
      { title: "Capture", blurb: "Any document into scored, structured data.", href: "https://www.parsinglab.blue-iq.ai/", external: true, Art: CaptureArt },
      { title: "Spend", blurb: "Invoices and contracts reconciled line by line.", href: "/products#spend", Art: SpendArt },
      { title: "Govern", blurb: "Agreements checked against your playbook.", href: "https://govern.blue-iq.ai/", external: true, Art: GovernArt },
    ],
    side: {
      header: "Editions and AI",
      links: [
        { label: "Sonar AI", href: "/about#sonar", Icon: IconSonar, blurb: "The engine under every product" },
        { label: "Campus", href: "/products#editions", Icon: IconCampus, blurb: "For universities and colleges" },
        { label: "Workforce", href: "/products#editions", Icon: IconWorkforce, blurb: "For staffing and healthcare" },
      ],
    },
    foot: { t: "Explore the platform", href: "/products" },
  },
  {
    id: "solutions",
    label: "Solutions",
    cards: [{ title: "Custom builds", blurb: "When no product fits, we build the one that does, on Sonar.", href: "/solutions#custom", Art: CustomArt }],
    side: {
      header: "Industries",
      links: [
        { label: "IT sector", href: "/solutions#it", Icon: IconNetwork },
        { label: "Education", href: "/solutions#education", Icon: IconCampus },
        { label: "Workforce", href: "/solutions#workforce", Icon: IconWorkforce },
        { label: "Healthcare staffing", href: "/solutions#healthcare", Icon: IconHealth },
        { label: "Legal and contracts", href: "/solutions#legal", Icon: IconScale },
        { label: "Procurement and finance", href: "/solutions#procurement", Icon: IconReceipt },
        { label: "Enterprise migrations", href: "/solutions#migrations", Icon: IconDocs },
        { label: "Integrations", href: "/solutions#integrations", Icon: IconApi },
      ],
    },
    foot: { t: "All solutions", href: "/solutions" },
  },
  {
    id: "resources",
    label: "Resources",
    cards: [{ title: "How Sonar works", blurb: "How the AI reads, scores and flags a document.", href: "/about#sonar", Art: SonarArt }],
    side: {
      header: "Build and learn",
      links: [
        { label: "How the API works", href: "/resources#api", Icon: IconApi, blurb: "REST, JSON and signed webhooks" },
        { label: "Formats Sonar reads", href: "/resources#formats", Icon: IconDocs, blurb: "PDF, DOCX, scans and photos" },
        { label: "Working with scores", href: "/resources#confidence", Icon: IconSonar, blurb: "Build on confidence, not guesses" },
        { label: "Security and privacy", href: "/privacy", Icon: IconShield, blurb: "How your documents are handled" },
      ],
    },
    foot: { t: "All resources", href: "/resources" },
  },
];

const loginItems: Link[] = [
  { label: "Capture", href: "https://www.parsinglab.blue-iq.ai/", external: true, Icon: IconCapture, blurb: "Document to data" },
  { label: "Govern", href: "https://govern.blue-iq.ai/", external: true, Icon: IconGovern, blurb: "Contract review" },
];

function Row({ it, onClick, compact }: { it: Link; onClick?: () => void; compact?: boolean }) {
  const Icon = it.Icon;
  return (
    <a
      href={it.href}
      target={it.external ? "_blank" : undefined}
      rel={it.external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3 ${compact ? "py-2" : "py-2.5"} transition-colors hover:bg-[#F2F6FD]`}
    >
      {Icon && (
        <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg transition-colors group-hover:bg-[#1D5BF0] group-hover:text-white" style={{ background: SA.accentSoft, color: SA.accent }}>
          <Icon size={19} />
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-1 font-sans-g text-[14.5px] font-medium leading-tight" style={{ color: SA.ink }}>
          {it.label}
          {it.external && <IconArrowUpRight size={13} style={{ color: SA.faint }} />}
        </span>
        {it.blurb && (
          <span className="block mt-0.5 font-sans-g text-[12.5px] leading-snug" style={{ color: SA.sub }}>
            {it.blurb}
          </span>
        )}
      </span>
    </a>
  );
}

function CardTile({ c, wide }: { c: Card; wide?: boolean }) {
  return (
    <a
      href={c.href}
      target={c.external ? "_blank" : undefined}
      rel={c.external ? "noopener noreferrer" : undefined}
      className={`group flex flex-col rounded-2xl overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-0.5 ${wide ? "w-[300px]" : "w-[228px]"}`}
      style={{ border: `1px solid ${SA.line}` }}
    >
      <div
        className="h-[132px] flex items-center justify-center px-4 py-3 [&_svg]:h-full [&_svg]:w-full transition-colors group-hover:bg-[#EAF1FD]"
        style={{ background: "linear-gradient(180deg, #F4F7FD, #EDF2FB)" }}
      >
        <c.Art />
      </div>
      <div className="p-4 bg-white">
        <span className="flex items-center gap-1 font-sans-g text-[15px] font-semibold" style={{ color: SA.ink }}>
          {c.title}
          {c.external ? (
            <IconArrowUpRight size={13} style={{ color: SA.faint }} />
          ) : (
            <IconArrow size={14} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" style={{ color: SA.accent }} />
          )}
        </span>
        <span className="block mt-1 font-sans-g text-[13px] leading-snug" style={{ color: SA.sub }}>
          {c.blurb}
        </span>
      </div>
    </a>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "none" }}>
      <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SiteNav({ overDark = true }: { overDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = menus.find((m) => m.id === open);
  const closeMobile = () => {
    setMobile(false);
    setSection(null);
  };
  const solid = scrolled || mobile || !!open || !overDark;
  const light = !solid; // white text over the navy hero
  const idle = light ? "rgba(255,255,255,0.8)" : SA.sub;
  const hover = light ? "hover:text-white" : "hover:text-[#0A1230]";

  return (
    <header
      onMouseLeave={() => setOpen(null)}
      className="fixed top-0 inset-x-0 z-[60]"
      style={{
        background: solid ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0)",
        borderBottom: `1px solid ${solid && (scrolled || open || mobile) ? SA.line : "transparent"}`,
        boxShadow: scrolled && !open ? "0 6px 20px -16px rgba(10,18,48,0.3)" : "none",
        transition: "background .25s ease, border-color .25s ease, box-shadow .25s ease",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="h-[72px] grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
          <a href="/" aria-label="Blue-IQ home" className="flex items-center justify-self-start" onMouseEnter={() => setOpen(null)}>
            <Image
              src="/logo.svg"
              alt="Blue-IQ"
              width={108}
              height={34}
              priority
              style={{ filter: light ? "brightness(0) invert(1)" : "none", transition: "filter .25s ease" }}
            />
          </a>

          <nav className="hidden lg:flex items-center justify-center gap-1" aria-label="Primary">
            {menus.map((m) => {
              const isOn = open === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onMouseEnter={() => setOpen(m.id)}
                  onClick={() => setOpen(isOn ? null : m.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-sans-g text-[14.5px] font-medium transition-colors ${hover}`}
                  style={{ color: isOn ? SA.ink : idle, background: isOn ? SA.bg2 : "transparent" }}
                  aria-expanded={isOn}
                  aria-haspopup="true"
                >
                  {m.label}
                  <Chevron open={isOn} />
                </button>
              );
            })}
            <a
              href="/contact#pricing"
              onMouseEnter={() => setOpen(null)}
              className={`px-3.5 py-2 rounded-full font-sans-g text-[14.5px] font-medium transition-colors ${hover}`}
              style={{ color: idle }}
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center justify-self-end gap-2" onMouseEnter={() => setOpen(null)}>
            <div className="hidden md:block relative group/login">
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-sans-g text-[14.5px] font-medium transition-colors ${hover}`}
                style={{ color: idle }}
                aria-haspopup="true"
              >
                Log in <Chevron open={false} />
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none transition-opacity duration-150 group-hover/login:opacity-100 group-hover/login:pointer-events-auto group-focus-within/login:opacity-100 group-focus-within/login:pointer-events-auto">
                <div className="w-[240px] rounded-2xl p-2 bg-white" style={{ border: `1px solid ${SA.line}`, boxShadow: "0 24px 48px -24px rgba(10,18,48,0.3)" }}>
                  {loginItems.map((it) => (
                    <Row key={it.label} it={it} />
                  ))}
                </div>
              </div>
            </div>
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold px-5 py-2.5 rounded-full transition-colors active:scale-[0.98]"
              style={{ background: light ? "#fff" : SA.ink, color: light ? SA.ink : "#fff" }}
            >
              Book a demo
            </a>
            <button
              className="lg:hidden w-11 h-11 grid place-items-center -mr-2 rounded-lg"
              onClick={() => (mobile ? closeMobile() : setMobile(true))}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              style={{ color: light ? "#fff" : SA.ink }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                {mobile ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* the mega panel: centred, sized to its content */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex absolute left-0 right-0 top-full justify-center px-5 pt-2"
          >
            <div
              className="rounded-3xl bg-white p-3 flex gap-3"
              style={{ border: `1px solid ${SA.line}`, boxShadow: "0 40px 80px -36px rgba(10,18,48,0.35)" }}
            >
              <div className="flex gap-3">
                {active.cards.map((c) => (
                  <CardTile key={c.title} c={c} wide={active.cards.length === 1} />
                ))}
              </div>
              <div className={`flex flex-col px-2 py-2 ${active.side.links.length > 4 ? "w-[440px]" : "w-[280px]"}`}>
                <p className="px-3 pb-1.5 font-sans-g text-[12.5px] font-semibold" style={{ color: SA.faint }}>
                  {active.side.header}
                </p>
                <div className={active.side.links.length > 4 ? "grid grid-cols-2" : "flex flex-col"}>
                  {active.side.links.map((l) => (
                    <Row key={l.label} it={l} compact={active.side.links.length > 4} />
                  ))}
                </div>
                <a
                  href={active.foot.href}
                  className="group mt-auto mx-3 pt-3 inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold"
                  style={{ color: SA.accent, borderTop: `1px solid ${SA.line}` }}
                >
                  {active.foot.t}
                  <IconArrow size={15} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile sheet */}
      {mobile && (
        <div className="lg:hidden h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain bg-white">
          <div className="px-5 sm:px-8 pb-10 flex flex-col">
            {menus.map((m) => {
              const exp = section === m.id;
              return (
                <div key={m.id} style={{ borderBottom: `1px solid ${SA.line}` }}>
                  <button
                    onClick={() => setSection(exp ? null : m.id)}
                    aria-expanded={exp}
                    className="w-full flex items-center justify-between py-4 text-left font-sans-g text-[17px] font-medium"
                    style={{ color: SA.ink }}
                  >
                    {m.label}
                    <Chevron open={exp} />
                  </button>
                  {exp && (
                    <div className="pb-4 -mx-3">
                      {m.cards.map((c) => (
                        <Row key={c.title} it={{ label: c.title, href: c.href, external: c.external, blurb: c.blurb, Icon: c.title === "Capture" ? IconCapture : c.title === "Spend" ? IconSpend : c.title === "Govern" ? IconGovern : c.title === "Custom builds" ? IconCustom : IconSonar }} onClick={closeMobile} />
                      ))}
                      {m.side.links.map((l) => (
                        <Row key={l.label} it={l} onClick={closeMobile} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <a href="/contact#pricing" onClick={closeMobile} className="py-4 font-sans-g text-[17px] font-medium" style={{ color: SA.ink, borderBottom: `1px solid ${SA.line}` }}>
              Pricing
            </a>
            <div className="pt-5 -mx-3">
              <p className="px-3 pb-1 font-sans-g text-[13px]" style={{ color: SA.faint }}>
                Log in to
              </p>
              {loginItems.map((it) => (
                <Row key={it.label} it={it} onClick={closeMobile} />
              ))}
            </div>
            <a
              href="/contact"
              onClick={closeMobile}
              className="mt-6 inline-flex items-center justify-center gap-2 font-sans-g text-[15px] font-semibold text-white py-3.5 rounded-full"
              style={{ background: SA.ink }}
            >
              Book a demo <IconArrow size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(SiteNav);
