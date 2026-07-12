"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FileText, ShieldCheck, ArrowUpRight, MoveRight, ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { MZ } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";

/* ────────────────────────────────────────────────────────────────
   The navbar.

   The dropdowns stay. What is gone is the *sliding*: nothing translates any
   more. The bar used to drop in from -84px on every page load, and each
   panel flew up from -10px under the cursor — so a bar moved when you were
   not touching it, and a panel lunged at you when you happened to pass over
   a word. Panels now resolve in place on opacity alone. Same menus, same
   links, no motion toward the reader.

   Everything else here is spacing and cost:

   · One gap scale. 4px inside a link, 8px between links, 24px between
     groups. The bar's height (76px) and gutter match the page container, so
     the logo sits on the same left edge as the content beneath it.
   · Only the active panel is mounted — the other four are not built, not
     held in memory, and not paying for a re-render.
   · The only reactive value on scroll is one boolean ("has the page moved"),
     which is all the glass needs.
   ──────────────────────────────────────────────────────────────── */

/* opacity only — a cut, not a slide */
const FADE = { duration: 0.16, ease: [0.16, 1, 0.3, 1] as const };

type Item = { label: string; href: string; external?: boolean; badge?: string };
type Group = { header: string; items: Item[] };
type Menu = {
  id: string;
  label: string;
  href: string;
  featured: { title: string; blurb: string; cta: string; geo: string; tint: string };
  groups: Group[];
};

const menus: Menu[] = [
  {
    id: "platform",
    label: "Platform",
    href: "/products",
    featured: {
      title: "The Sonar platform",
      blurb: "Two products, plus custom builds, one engine.",
      cta: "Explore the platform",
      geo: "Geometric-Line-04.svg",
      tint: "#EAF0FF",
    },
    groups: [
      {
        header: "Products",
        items: [
          { label: "All products", href: "/products" },
          { label: "ParsingLab", href: "https://www.parsinglab.blue-iq.ai/", external: true },
          { label: "Govern", href: "https://govern.blue-iq.ai/", external: true },
        ],
      },
      {
        header: "Engine",
        items: [
          { label: "Sonar engine", href: "/about#sonar" },
          { label: "How it works", href: "/about#sonar" },
          { label: "Confidence scoring", href: "/about#sonar" },
        ],
      },
      {
        header: "Build",
        items: [
          { label: "How the API works", href: "/resources#api" },
          { label: "Formats it reads", href: "/resources#formats" },
          { label: "Integrations", href: "/solutions#integrations" },
        ],
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    href: "/solutions",
    featured: {
      title: "Custom builds",
      blurb: "A product shaped around your workflow.",
      cta: "Start a project",
      geo: "Geometric-Line-08.svg",
      tint: "#EAF7F0",
    },
    groups: [
      {
        header: "Use cases",
        items: [
          { label: "Custom development", href: "/solutions#custom" },
          { label: "Enterprise migrations", href: "/solutions#migrations" },
          { label: "Integrations", href: "/solutions#integrations" },
        ],
      },
      {
        header: "Industries",
        items: [
          { label: "Healthcare staffing", href: "/solutions#industries" },
          { label: "Legal & contracts", href: "/solutions#industries" },
          { label: "Procurement & finance", href: "/solutions#industries" },
        ],
      },
      /* The "Roles" group is gone. Operations / Legal teams / Engineering all
         pointed at bare /solutions — three links that looked like three pages
         and were one page you were already being sent to. */
    ],
  },
  /* The "Customers" menu is gone, and the "Proof" groups with it.
     They promised Customer stories, Results & ROI, and Webinars & events —
     none of which exist, and none of which we are willing to invent. A nav
     that links to a page we cannot honestly write is a nav that lies before
     the visitor has even clicked. Every item below now resolves to something
     that is actually on the site. */
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    featured: {
      title: "Docs & guides",
      blurb: "Everything you need to integrate Blue-IQ.",
      cta: "Browse the library",
      geo: "Geometric-Line-14.svg",
      tint: "#EAF0FF",
    },
    groups: [
      {
        header: "Build",
        items: [
          { label: "How the API works", href: "/resources#api" },
          { label: "Formats it reads", href: "/resources#formats" },
          { label: "Writing code against a score", href: "/resources#confidence" },
        ],
      },
      {
        header: "Engine",
        items: [
          { label: "Confidence scoring", href: "/about#sonar" },
          { label: "The Sonar engine", href: "/about#sonar" },
        ],
      },
      {
        header: "Support",
        items: [
          { label: "Security & privacy", href: "/privacy" },
          { label: "Contact us", href: "/contact" },
        ],
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/contact#pricing",
    featured: {
      title: "Scoped to what you read",
      blurb: "Tell us the documents and we'll give you a number.",
      cta: "Get a price",
      geo: "Geometric-Line-06.svg",
      tint: "#EAF0FF",
    },
    groups: [
      {
        header: "Pricing",
        items: [
          /* No "Plans overview": there are no published plans and no tiers.
             Inventing Starter/Pro/Enterprise cards would be the easiest lie on
             the whole site to tell, so the menu asks for a conversation. */
          { label: "How pricing works", href: "/contact#pricing" },
          { label: "Compare the products", href: "/products" },
          { label: "Talk to sales", href: "/contact" },
        ],
      },
    ],
  },
];

const loginItems: Item[] = [
  { label: "ParsingLab", href: "https://www.parsinglab.blue-iq.ai/", external: true },
  { label: "Govern", href: "https://govern.blue-iq.ai/", external: true },
];

function LinkRow({ it, onClick }: { it: Item; onClick?: () => void }) {
  return (
    <a
      href={it.href}
      target={it.external ? "_blank" : undefined}
      rel={it.external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="group inline-flex items-center gap-1.5 font-sans-g text-[15px] font-medium py-2 transition-colors"
      style={{ color: MZ.ink }}
      onMouseOver={(e) => (e.currentTarget.style.color = MZ.accent)}
      onMouseOut={(e) => (e.currentTarget.style.color = MZ.ink)}
    >
      {it.label}
      {it.external && <ArrowUpRight className="w-3.5 h-3.5 opacity-40" strokeWidth={2} />}
      {it.badge && (
        <span
          className="font-sans-g text-[10px] font-semibold px-1.5 py-0.5 rounded"
          style={{ background: MZ.soft, color: MZ.accent }}
        >
          {it.badge}
        </span>
      )}
    </a>
  );
}

/* Each product says what you are actually logging in to, because "ParsingLab"
   and "Govern" mean nothing to a first-time visitor who has landed on the nav
   by accident. */
const loginBlurb: Record<string, string> = {
  ParsingLab: "Resume and credential parsing",
  Govern: "Contract review and risk",
};

function LoginMenu({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false);
  const idle = dark ? "rgba(255,255,255,0.86)" : MZ.ink;

  return (
    <div className="hidden md:block relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg font-sans-g text-[14.5px] font-semibold transition-colors"
        style={{ color: open ? MZ.accent : idle }}
        aria-expanded={open}
      >
        Log in
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform duration-200"
          strokeWidth={2}
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            /* opacity only: no y, no scale — it resolves, it does not lunge */
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
            className="absolute right-0 top-full pt-3 w-[320px]"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: MZ.surface,
                border: `1px solid ${MZ.line2}`,
                boxShadow: "0 26px 54px -24px rgba(20,18,10,0.3)",
              }}
            >
              {/* The icon-in-a-tinted-rounded-square chip is gone. It is the same
                  tell this page bans everywhere else, and it was carrying no
                  information — a generic document glyph next to the word
                  "ParsingLab" tells you nothing the word did not. The product
                  name at proper size, and a line saying what it is, does. */}
              {loginItems.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--hov)]"
                  style={{ "--hov": MZ.bg2, borderBottom: `1px solid ${MZ.line}` } as React.CSSProperties}
                >
                  <span className="flex-1 min-w-0">
                    <span
                      className="block font-display text-[16px] leading-tight tracking-[-0.015em] transition-colors group-hover:text-[var(--acc)]"
                      style={{ color: MZ.ink, "--acc": MZ.accent } as React.CSSProperties}
                    >
                      {it.label}
                    </span>
                    <span className="block mt-0.5 font-sans-g text-[12.5px]" style={{ color: MZ.sub }}>
                      {loginBlurb[it.label]}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    style={{ color: MZ.faint }}
                  />
                </a>
              ))}

              {/* the other half of a login menu: the people who do not have one */}
              <a
                href="/contact"
                className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-[var(--hov)]"
                style={{ "--hov": MZ.bg2, background: MZ.bg2 } as React.CSSProperties}
              >
                <span className="font-sans-g text-[12.5px]" style={{ color: MZ.sub }}>
                  No account yet?
                </span>
                <span className="font-sans-g text-[12.5px] font-semibold" style={{ color: MZ.accent }}>
                  Talk to us
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SiteNav({ overDark = false }: { overDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  const active = menus.find((m) => m.id === open);
  const closeMobile = () => {
    setMobile(false);
    setSection(null);
  };

  const dark = overDark && !scrolled && !open && !mobile;

  /* At rest: nothing — no white slab, no rule, no shadow.
     On scroll: glass, and glass properly — blurred AND saturated, so colour
     passing underneath stays alive instead of going milky, with a 1px inner
     highlight along the top edge and a diffuse shadow.
     Mobile sheet: opaque, because a tall list of links over blurred content is
     unreadable and legibility outranks the effect.

     Scroll is the ONLY trigger. Opening a dropdown used to switch the glass on
     too, which meant hovering a nav link at the top of the page slammed a white
     bar in behind it. The panel brings its own surface; the bar does not need
     to change state to host it. */
  const glass = !dark && scrolled && !mobile;

  const idle = dark ? "rgba(255,255,255,0.66)" : MZ.sub;
  const on = dark ? "#FFFFFF" : MZ.ink;

  return (
    <header
      onMouseLeave={() => setOpen(null)}
      className="fixed top-0 inset-x-0 z-[60]"
      style={{
        background: mobile ? "#FFFFFF" : glass ? "rgba(255,255,255,0.60)" : "transparent",
        backdropFilter: glass ? "blur(20px) saturate(180%)" : dark ? "blur(6px)" : "none",
        WebkitBackdropFilter: glass ? "blur(20px) saturate(180%)" : dark ? "blur(6px)" : "none",
        borderBottom: `1px solid ${
          mobile ? MZ.line2 : glass ? "rgba(11,11,15,0.07)" : dark ? "rgba(255,255,255,0.08)" : "transparent"
        }`,
        boxShadow: glass ? "inset 0 1px 0 rgba(255,255,255,0.70), 0 10px 32px -20px rgba(11,11,15,0.22)" : "none",
        transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
      }}
    >
      {/* the same container as the hero plate (max-w-[1560px], px-3/px-5), so
          the logo starts on the plate's left edge and "Contact sales" ends on
          its right one. The nav is now measured against the page's largest
          object rather than floating on its own width. */}
      <div className="max-w-[1560px] mx-auto px-3 sm:px-5">
        <div className="h-[76px] flex items-center gap-6">
          <a
            href="/"
            aria-label="Blue-IQ home"
            className="flex items-center shrink-0"
            onMouseEnter={() => setOpen(null)}
          >
            <Image
              src="/logo.svg"
              alt="Blue-IQ"
              width={112}
              height={36}
              priority
              style={{ filter: dark ? "brightness(0) invert(1)" : "none", transition: "filter .3s ease" }}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-2 mx-auto" aria-label="Primary">
            {menus.map((m) => {
              const isOn = open === m.id;
              return (
                <div key={m.id} onMouseEnter={() => setOpen(m.id)}>
                  <a
                    href={m.href}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-sans-g text-[14.5px] font-medium transition-colors"
                    style={{ color: isOn ? on : idle }}
                    onMouseOver={(e) => {
                      if (!isOn) e.currentTarget.style.color = on;
                    }}
                    onMouseOut={(e) => {
                      if (!isOn) e.currentTarget.style.color = idle;
                    }}
                    aria-expanded={isOn}
                  >
                    {m.label}
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform duration-200"
                      strokeWidth={2}
                      style={{
                        transform: isOn ? "rotate(180deg)" : "none",
                        color: dark ? "rgba(255,255,255,0.42)" : MZ.faint,
                      }}
                    />
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Entering the right-hand controls dismisses any open mega panel.

              Without this, the panel only closed on leaving the *header* — so
              sliding sideways from "Platform" to "Log in" left the mega panel
              stranded open behind the login dropdown, two panels deep. */}
          <div
            className="flex items-center gap-3 shrink-0 ml-auto lg:ml-0"
            onMouseEnter={() => setOpen(null)}
          >
            <LoginMenu dark={dark} />
            <Magnetic
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold px-5 py-2.5 rounded-full transition-transform active:scale-[0.97]"
              style={{
                background: dark ? "#FFFFFF" : MZ.ink2,
                color: dark ? "#0B0B0F" : "#FFFFFF",
                transition: "background .3s ease, color .3s ease",
              }}
            >
              Contact sales <MoveRight className="w-4 h-4" strokeWidth={2} />
            </Magnetic>
            <button
              className="lg:hidden w-10 h-10 grid place-items-center -mr-2"
              onClick={() => (mobile ? closeMobile() : setMobile(true))}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              style={{ color: on }}
            >
              {mobile ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* the mega panel — only the active one is ever mounted */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
            className="hidden lg:block absolute inset-x-0 top-full px-5 sm:px-8"
          >
            <div className="max-w-[1080px] mx-auto mt-3">
              <div
                className="rounded-3xl p-4 grid grid-cols-[300px_1fr] gap-4"
                style={{
                  background: MZ.surface,
                  border: `1px solid ${MZ.line2}`,
                  boxShadow: "0 32px 72px -30px rgba(20,18,10,0.32)",
                }}
              >
                <a
                  href={active.href}
                  className="group relative rounded-2xl p-6 overflow-hidden flex flex-col justify-between"
                  style={{ background: active.featured.tint, minHeight: 230 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/Geometrics/${active.featured.geo}`}
                    alt=""
                    aria-hidden
                    className="absolute -top-3 -right-3 w-24 h-24 object-contain opacity-90 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="relative">
                    <h3
                      className="font-display font-medium text-[22px] leading-tight tracking-[-0.02em] max-w-[10ch]"
                      style={{ color: MZ.ink }}
                    >
                      {active.featured.title}
                    </h3>
                    <p className="mt-2 font-sans-g text-[13px] leading-snug max-w-[22ch]" style={{ color: MZ.sub }}>
                      {active.featured.blurb}
                    </p>
                  </div>
                  <span
                    className="relative inline-flex items-center gap-1.5 font-sans-g text-[13.5px] font-semibold"
                    style={{ color: MZ.accent }}
                  >
                    {active.featured.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                  </span>
                </a>

                <div
                  className="grid gap-6 px-4 py-2"
                  style={{ gridTemplateColumns: `repeat(${active.groups.length}, minmax(0, 1fr))` }}
                >
                  {active.groups.map((g) => (
                    <div key={g.header}>
                      <p
                        className="font-mono-g text-[10px] font-semibold uppercase tracking-[0.16em] mb-2"
                        style={{ color: MZ.faint }}
                      >
                        {g.header}
                      </p>
                      <div className="flex flex-col">
                        {g.items.map((it) => (
                          <LinkRow key={it.label} it={it} />
                        ))}
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
      {mobile && (
        <div className="lg:hidden" style={{ background: "#FFFFFF", borderBottom: `1px solid ${MZ.line2}` }}>
          <div className="max-w-[1560px] mx-auto px-3 sm:px-5 pb-6 flex flex-col max-h-[80vh] overflow-y-auto overscroll-contain">
            {menus.map((m) => {
              const exp = section === m.id;
              return (
                <div key={m.id} style={{ borderTop: `1px solid ${MZ.line}` }}>
                  <button
                    onClick={() => setSection(exp ? null : m.id)}
                    aria-expanded={exp}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="font-sans-g text-[17px] font-medium" style={{ color: exp ? MZ.accent : MZ.ink }}>
                      {m.label}
                    </span>
                    <ChevronDown
                      className="w-5 h-5 transition-transform duration-200 shrink-0"
                      strokeWidth={2}
                      style={{ transform: exp ? "rotate(180deg)" : "none", color: MZ.faint }}
                    />
                  </button>

                  {exp && (
                    <div className="pb-5 flex flex-col gap-4">
                      <a
                        href={m.href}
                        onClick={closeMobile}
                        className="inline-flex items-center gap-1.5 font-sans-g text-[14px] font-semibold"
                        style={{ color: MZ.accent }}
                      >
                        View {m.label} <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </a>
                      {m.groups.map((g) => (
                        <div key={g.header}>
                          <p
                            className="font-mono-g text-[10px] font-semibold uppercase tracking-[0.16em] mb-0.5"
                            style={{ color: MZ.faint }}
                          >
                            {g.header}
                          </p>
                          <div className="flex flex-col">
                            {g.items.map((it) => (
                              <a
                                key={it.label}
                                href={it.href}
                                target={it.external ? "_blank" : undefined}
                                rel={it.external ? "noopener noreferrer" : undefined}
                                onClick={closeMobile}
                                className="flex items-center gap-2 py-2 font-sans-g text-[15px]"
                                style={{ color: MZ.sub }}
                              >
                                {it.label}
                                {it.external && <ArrowUpRight className="w-3.5 h-3.5 opacity-50" strokeWidth={2} />}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-5 mt-1" style={{ borderTop: `1px solid ${MZ.line}` }}>
              <p
                className="font-mono-g text-[10px] font-semibold uppercase tracking-[0.16em] pb-1"
                style={{ color: MZ.faint }}
              >
                Log in
              </p>
              {loginItems.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-2 py-2.5 font-sans-g text-[15px] font-medium"
                  style={{ color: MZ.ink }}
                >
                  <span className="flex-1">{it.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" strokeWidth={2} />
                </a>
              ))}
            </div>

            <a
              href="/contact"
              onClick={closeMobile}
              className="mt-6 inline-flex items-center justify-center gap-1.5 font-sans-g text-[15px] font-semibold text-white py-3.5 rounded-full"
              style={{ background: MZ.ink2 }}
            >
              Contact sales <MoveRight className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(SiteNav);
