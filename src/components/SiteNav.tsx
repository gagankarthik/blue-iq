"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { BB } from "@/lib/theme";
import { Guides, Label } from "@/components/home/ui";
import { I, SECTOR_ICON, type Ico } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   The navbar, blueprint system: a canvas bar with mono uppercase links and
   one square "Book a demo". Each menu opens a white, tick-framed panel that
   sits inside the page column (the same gutter as every block): a "+" label,
   two columns of items (icon well, name, one line), feature cards on the
   right. The page behind dims slightly (no blur) while a panel is open.
   ──────────────────────────────────────────────────────────────── */

type Item = { t: string; d: string; href: string; external?: boolean; Icon: Ico };
type Feature = { t: string; href: string; Icon: Ico; well: string };
type Menu = { id: string; label: string; header: string; items: Item[]; features: Feature[] };

const S = SECTOR_ICON;

const menus: Menu[] = [
  {
    id: "products",
    label: "Products",
    header: "Products",
    items: [
      { t: "Capture", d: "Documents into structured data", href: "https://www.parsinglab.blue-iq.ai/", external: true, Icon: I.capture },
      { t: "Spend", d: "Invoices against what was agreed", href: "/products#spend", Icon: I.spend },
      { t: "Govern", d: "Contracts and obligations in view", href: "https://govern.blue-iq.ai/", external: true, Icon: I.govern },
      { t: "Sonar AI", d: "The engine under every product", href: "/platform", Icon: I.sonar },
      { t: "Campus edition", d: "For universities and colleges", href: "/products#editions", Icon: I.campus },
      { t: "Workforce edition", d: "For staffing and healthcare", href: "/products#editions", Icon: I.workforce },
    ],
    features: [{ t: "All Blue-IQ products", href: "/products", Icon: I.all, well: "#1F4FE6" }],
  },
  {
    id: "solutions",
    label: "Solutions",
    header: "Industries",
    items: [
      { t: "IT sector", d: "Vendor contracts and licences", href: "/solutions/it", Icon: S.it },
      { t: "Education", d: "Applications and transcripts", href: "/solutions/education", Icon: S.education },
      { t: "Workforce", d: "Candidates onboarded in one read", href: "/solutions/workforce", Icon: S.workforce },
      { t: "Healthcare staffing", d: "Clinicians credentialed faster", href: "/solutions/healthcare", Icon: S.healthcare },
      { t: "Legal and contracts", d: "Risk surfaced before signature", href: "/solutions/legal", Icon: S.legal },
      { t: "Procurement and finance", d: "Spend reconciled as it is billed", href: "/solutions/procurement", Icon: S.procurement },
    ],
    features: [
      { t: "Custom builds on Sonar", href: "/solutions#custom", Icon: I.custom, well: "#0B1638" },
      {
        t: "Migrations and integrations",
        href: "/solutions#integrations",
        Icon: I.migrate,
        well: "#1F4FE6",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    header: "Build and learn",
    items: [
      { t: "How the API works", d: "REST, JSON and signed webhooks", href: "/resources#api", Icon: I.api },
      { t: "Formats Sonar reads", d: "PDF, Word, scans and photos", href: "/resources#formats", Icon: I.formats },
      { t: "Working with scores", d: "Build on confidence, not guesses", href: "/resources#confidence", Icon: I.scores },
      { t: "Trust Center", d: "Security, privacy and compliance", href: "/trust", Icon: I.trust },
    ],
    features: [{ t: "How Sonar works", href: "/platform", Icon: I.sonar, well: "#0B1638" }],
  },
  {
    id: "company",
    label: "Company",
    header: "Company",
    items: [
      { t: "About Blue-IQ", d: "Who we are and how we work", href: "/about", Icon: I.about },
      { t: "Pricing", d: "Plans shaped to your volume", href: "/contact#pricing", Icon: I.pricing },
      { t: "Contact", d: "Talk to the team", href: "/contact", Icon: I.contact },
      { t: "FAQ", d: "Answers to common questions", href: "/faq", Icon: I.faq },
      { t: "Media kit", d: "Logos, colours and descriptions", href: "/media-kit", Icon: I.media },
    ],
    features: [{ t: "Trust Center", href: "/trust", Icon: I.trust, well: "#1638B8" }],
  },
];

function ItemRow({ it, onClick }: { it: Item; onClick?: () => void }) {
  return (
    <a
      href={it.href}
      target={it.external ? "_blank" : undefined}
      rel={it.external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="group flex items-center gap-4 p-4 rounded-[12px] transition-colors duration-150 hover:bg-[#F3F4F6]"
    >
      <span className="shrink-0 grid place-items-center w-12 h-12 rounded-[12px] bg-[#E7EAF0] text-[#1F4FE6] transition-colors duration-150 group-hover:bg-[#1F4FE6] group-hover:text-white">
        <it.Icon size={24} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-sans-g text-[16px] font-medium leading-[1.2]" style={{ color: BB.ink }}>
          {it.t}
          {it.external && <I.external size={13} style={{ color: BB.ink3 }} />}
        </span>
        <span className="block mt-1 font-sans-g text-[13px] leading-[1.5]" style={{ color: BB.ink3 }}>
          {it.d}
        </span>
      </span>
    </a>
  );
}

function FeatureCard({ f, onClick, narrow }: { f: Feature; onClick?: () => void; narrow?: boolean }) {
  const A = f.href.startsWith("/") ? I.arrow : I.external;
  return (
    <a
      href={f.href}
      onClick={onClick}
      className={`group flex flex-col overflow-hidden rounded-2xl ${narrow ? "w-[200px]" : "w-[240px]"} bg-white transition-shadow duration-200 hover:shadow-[0_8px_16px_-8px_rgba(14,17,22,0.2)]`}
      style={{ border: `1px solid ${BB.line}` }}
    >
      <span className="grid place-items-center h-[136px]" style={{ background: f.well }}>
        <span className="grid place-items-center w-16 h-16 rounded-[12px] bg-white text-[#1F4FE6] transition-transform duration-300 ease-out group-hover:scale-[1.05]">
          <f.Icon size={32} />
        </span>
      </span>
      <span
        className="flex items-center justify-between gap-4 h-12 px-4 font-mono-g text-[13px] font-medium uppercase tracking-[0.06em]"
        style={{ color: BB.ink }}
      >
        {f.t}
        <A size={16} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: BB.cobalt }} />
      </span>
    </a>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden
      className="transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "none" }}
    >
      <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* `overDark`: the page opens on the cobalt hero (home), so the bar starts
   transparent with white type and turns white once the page scrolls or a
   menu opens. Other pages pass false and get the white bar throughout. */
function SiteNav({ overDark }: { overDark?: boolean }) {
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
  const onBlue = !!overDark && !scrolled && !open && !mobile;
  const closeMobile = () => {
    setMobile(false);
    setSection(null);
  };

  return (
    <>
      {/* the two end guides, on every page (every page renders the nav) */}
      <Guides />
      {/* the page behind softens while a panel is open */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="veil"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block fixed inset-0 z-[55] bg-[rgba(14,17,22,0.12)]"
            onMouseEnter={() => setOpen(null)}
          />
        )}
      </AnimatePresence>

      <header onMouseLeave={() => setOpen(null)} className="fixed top-0 inset-x-0 z-[60]">
        <div
          className="transition-[background-color,border-color] duration-200"
          style={{
            background: scrolled || open || mobile ? "#F3F4F6" : "transparent",
            borderBottom: `1px solid ${scrolled || open || mobile ? BB.line : "transparent"}`,
          }}
        >
          <div className="max-w-[1176px] mx-auto px-6 sm:px-8 h-[72px] grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
            <Link href="/" aria-label="Blue-IQ home" className="flex items-center justify-self-start" onMouseEnter={() => setOpen(null)}>
              <Image src={onBlue ? "/logo-white.svg" : "/logo.svg"} alt="Blue-IQ" width={115} height={30} priority />
            </Link>

            <nav className="hidden lg:flex items-center justify-center gap-1" aria-label="Primary">
              {menus.map((m) => {
                const isOn = open === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onMouseEnter={() => setOpen(m.id)}
                    onClick={() => setOpen(isOn ? null : m.id)}
                    className={`inline-flex items-center px-4 py-2 rounded-[10px] font-mono-g text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-150 ${onBlue ? "text-white hover:bg-white/10" : "text-[#0E1116] hover:bg-[#E7EAF0]"}`}
                    style={{ background: isOn ? "#E7EAF0" : undefined }}
                    aria-expanded={isOn}
                    aria-controls={`menu-${m.id}`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center justify-self-end gap-2" onMouseEnter={() => setOpen(null)}>
              <Link
                href="/contact?topic=A%20demo"
                className={`hidden sm:inline-flex items-center h-12 px-6 rounded-[12px] font-mono-g text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-200 ${onBlue ? "bg-white text-[#0E1116] hover:bg-[#E7EAF0]" : "text-white bg-[#0E1116] hover:bg-[#1F4FE6]"}`}
              >
                Book a demo
              </Link>
              <button
                className="lg:hidden w-12 h-12 grid place-items-center -mr-2"
                onClick={() => (mobile ? closeMobile() : setMobile(true))}
                aria-label={mobile ? "Close menu" : "Open menu"}
                aria-expanded={mobile}
                style={{ color: onBlue ? "#FFFFFF" : BB.ink }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                  {mobile ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* the panel: inside the page column, tick-framed, like every block */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              id={`menu-${active.id}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute inset-x-0 top-full px-6 sm:px-8 pt-2"
            >
              <div
                className="relative max-w-[1112px] mx-auto bg-white p-8 flex gap-8 rounded-2xl"
                style={{ border: `1px solid ${BB.line}`, boxShadow: "0 16px 32px -16px rgba(14,17,22,0.25)" }}
              >
                <div className="flex-1 min-w-0">
                  <Label className="px-4">{active.header}</Label>
                  <div className={`mt-4 grid gap-x-4 ${active.items.length > 3 ? "grid-cols-2" : "grid-cols-1 max-w-[400px]"}`}>
                    {active.items.map((it) => (
                      <ItemRow key={it.t} it={it} onClick={() => setOpen(null)} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 shrink-0 self-start">
                  {active.features.map((f) => (
                    <FeatureCard key={f.t} f={f} narrow={active.features.length > 1} onClick={() => setOpen(null)} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* mobile sheet */}
        {mobile && (
          <div className="lg:hidden h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain" style={{ background: BB.canvas }}>
            <div className="px-6 sm:px-8 pb-12 flex flex-col">
              {menus.map((m) => {
                const exp = section === m.id;
                return (
                  <div key={m.id} style={{ borderBottom: `1px solid ${BB.line}` }}>
                    <button
                      onClick={() => setSection(exp ? null : m.id)}
                      aria-expanded={exp}
                      className="w-full flex items-center justify-between h-16 text-left font-mono-g text-[13px] font-medium uppercase tracking-[0.06em]"
                      style={{ color: BB.ink }}
                    >
                      {m.label}
                      <Chevron open={exp} />
                    </button>
                    {exp && (
                      <div className="pb-4 grid -mx-4">
                        {m.items.map((it) => (
                          <ItemRow key={it.t} it={it} onClick={closeMobile} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-8 grid gap-4">
                <Link
                  href="/contact?topic=A%20demo"
                  onClick={closeMobile}
                  className="inline-flex items-center justify-center h-12 rounded-[12px] font-mono-g text-[13px] font-medium uppercase tracking-[0.06em] text-white bg-[#0E1116] hover:bg-[#1F4FE6] transition-colors duration-200"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default memo(SiteNav);
