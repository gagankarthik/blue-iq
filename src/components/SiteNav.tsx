"use client";

import Image from "next/image";
import { memo, useState, type ComponentType } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { C } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";
import { Arrow, IconHire, IconGovern, IconSpend } from "@/components/icons";

const ease = [0.16, 1, 0.3, 1] as const;

type Product = { idx: string; name: string; kind: string; desc: string; href: string; external: boolean; Icon: ComponentType<{ className?: string }> };
const products: Product[] = [
  { idx: "01", name: "HIRE", kind: "Hiring", desc: "Scored, credentialed shortlists before work begins.", href: "/hire", external: false, Icon: IconHire },
  { idx: "02", name: "GOVERN", kind: "Compliance", desc: "A clause-level audit on every SOW.", href: "https://govern.blue-iq.ai/", external: true, Icon: IconGovern },
  { idx: "03", name: "SPEND", kind: "Spend", desc: "Invoice-to-SOW reconciliation, leak-free.", href: "/spend", external: false, Icon: IconSpend },
];
const links: [string, string][] = [["Resources", "/resources"], ["Pricing", "/contact"]];

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  const mobileLinks = [
    ...products.map((p) => ({ label: p.name, href: p.href, external: p.external })),
    ...links.map(([l, h]) => ({ label: l, href: h, external: false })),
  ];

  return (
    <>
      <motion.header
        initial={{ y: -70 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease }}
        onMouseLeave={() => setOpen(false)}
        className="fixed top-0 inset-x-0 z-[60]"
        style={{
          background: scrolled || open ? "rgba(246,244,239,0.86)" : "transparent",
          backdropFilter: scrolled || open ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled || open ? C.line : "transparent"}`,
          transition: "background .3s ease, border-color .3s ease",
        }}
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="h-16 flex items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            {/* wordmark */}
            <a href="/" aria-label="Blue-IQ home" className="shrink-0 lg:justify-self-start">
              <Image src="/logo_large.webp" alt="Blue-IQ" width={98} height={32} priority />
            </a>

            {/* center nav */}
            <nav className="hidden lg:flex items-center gap-7 justify-self-center">
              <div onMouseEnter={() => setOpen(true)}>
                <button className="inline-flex items-center gap-1.5 font-sans-g text-[13.5px] transition-colors" style={{ color: open ? C.ink : C.sub }} aria-expanded={open}>
                  Platform
                  <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease }} viewBox="0 0 12 12" className="w-3 h-3" aria-hidden>
                    <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </motion.svg>
                </button>
              </div>
              {links.map(([l, h]) => (
                <a key={l} href={h} onMouseEnter={() => setOpen(false)} className="font-sans-g text-[13.5px] transition-colors text-[#605B53] hover:text-[#1A1815]">{l}</a>
              ))}
            </nav>

            {/* right actions */}
            <div className="flex items-center gap-4 lg:justify-self-end">
              <a href="/contact" className="hidden sm:inline-block font-sans-g text-[13.5px] transition-colors hover:opacity-70" style={{ color: C.sub }}>Sign in</a>
              <Magnetic href="/contact" className="hidden sm:inline-flex items-center gap-1.5 font-sans-g text-[13px] font-medium px-4 py-2 rounded-full" style={{ background: C.ink, color: "#fff" }}>
                Request a demo <Arrow className="w-3.5 h-3.5" />
              </Magnetic>
              <button className="lg:hidden w-9 h-9 grid place-items-center -mr-1" onClick={() => setMobile(!mobile)} aria-label="Menu">
                <span className="relative block w-5 h-3.5">
                  <motion.span className="absolute left-0 top-0 w-full h-[1.6px] rounded" style={{ background: C.ink }} animate={{ rotate: mobile ? 45 : 0, y: mobile ? 6 : 0 }} transition={{ duration: 0.24, ease }} />
                  <motion.span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.6px] rounded" style={{ background: C.ink }} animate={{ opacity: mobile ? 0 : 1 }} transition={{ duration: 0.2 }} />
                  <motion.span className="absolute left-0 bottom-0 w-full h-[1.6px] rounded" style={{ background: C.ink }} animate={{ rotate: mobile ? -45 : 0, y: mobile ? -6 : 0 }} transition={{ duration: 0.24, ease }} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* platform mega-menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.26, ease }}
              className="hidden lg:block absolute inset-x-0 top-full" style={{ background: "rgba(246,244,239,0.96)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.line}`, borderTop: `1px solid ${C.line}` }}>
              <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-8 grid grid-cols-[0.7fr_2fr] gap-12">
                <div>
                  <p className="font-mono-g text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: C.faint }}>The platform</p>
                  <p className="font-display text-[20px] font-semibold tracking-tight leading-snug" style={{ color: C.ink }}>Three products. One intelligence core.</p>
                  <a href="/#platform" className="inline-flex items-center gap-1.5 mt-5 font-sans-g text-[13px]" style={{ color: C.blue2 }}>Explore the platform <Arrow className="w-3.5 h-3.5" /></a>
                </div>
                <div className="grid grid-cols-3 divide-x" style={{ borderColor: C.line }}>
                  {products.map((m, i) => (
                    <motion.a key={m.name} href={m.href} target={m.external ? "_blank" : undefined} rel={m.external ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, ease, duration: 0.3 }}
                      className="group px-5 first:pl-0 transition-opacity hover:opacity-100" style={{ borderColor: C.line }}>
                      <div className="flex items-center justify-between mb-3">
                        <m.Icon className="w-7 h-7" />
                        <span className="font-mono-g text-[10px]" style={{ color: C.faint }}>{m.idx}</span>
                      </div>
                      <div className="font-display text-[17px] font-bold tracking-tight" style={{ color: C.ink }}>{m.name}</div>
                      <p className="mt-1.5 font-sans-g text-[12.5px] leading-relaxed" style={{ color: C.sub }}>{m.desc}</p>
                      <span className="inline-flex items-center gap-1 mt-3 font-mono-g text-[10.5px] transition-transform group-hover:translate-x-1" style={{ color: C.blue2 }}>
                        {m.external ? <>Open site <span aria-hidden>↗</span></> : <>Explore <Arrow className="w-3 h-3" /></>}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* mobile sheet */}
        <AnimatePresence>
          {mobile && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}
              className="lg:hidden overflow-hidden" style={{ background: "rgba(246,244,239,0.97)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.line}` }}>
              <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-3 flex flex-col">
                {mobileLinks.map((m) => (
                  <a key={m.label} href={m.href} target={m.external ? "_blank" : undefined} rel={m.external ? "noopener noreferrer" : undefined} onClick={() => setMobile(false)}
                    className="font-display text-[18px] font-semibold py-3.5 flex items-center" style={{ color: C.ink, borderTop: `1px solid ${C.line}` }}>
                    {m.label}{m.external && <span className="ml-1.5 text-[13px]" style={{ color: C.faint }}>↗</span>}
                  </a>
                ))}
                <a href="/contact" onClick={() => setMobile(false)} className="mt-4 mb-2 text-center font-sans-g text-[14px] font-medium text-white py-3 rounded-full" style={{ background: C.ink }}>Request a demo</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default memo(SiteNav);
