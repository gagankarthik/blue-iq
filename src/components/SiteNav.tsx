"use client";

import Image from "next/image";
import { memo, useState, type ComponentType } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { C, SHADOW_SM } from "@/lib/theme";
import Magnetic from "@/components/Magnetic";
import { Arrow, IconHire, IconGovern, IconSpend } from "@/components/icons";

const ease = [0.16, 1, 0.3, 1] as const;

type Product = { name: string; kind: string; desc: string; href: string; external: boolean; Icon: ComponentType<{ className?: string }> };
const products: Product[] = [
  { name: "HIRE", kind: "Hiring", desc: "Validates before work begins", href: "/#platform", external: false, Icon: IconHire },
  { name: "GOVERN", kind: "Compliance", desc: "Ensures compliance as contracted", href: "https://govern.blue-iq.ai/", external: true, Icon: IconGovern },
  { name: "SPEND", kind: "Spend", desc: "Confirms value as delivered", href: "/#platform", external: false, Icon: IconSpend },
];
const links: [string, string][] = [["Customers", "/#stories"], ["Pricing", "/contact"], ["Resources", "/resources"]];

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const mobileLinks = [
    ...products.map((p) => ({ label: p.name, href: p.href, external: p.external })),
    ...links.map(([l, h]) => ({ label: l, href: h, external: false })),
  ];

  return (
    <>
      <motion.div style={{ scaleX: progress, transformOrigin: "0%", background: C.blue }} className="fixed top-0 inset-x-0 h-[3px] z-[70]" />

      <motion.div initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease }} className="fixed top-3 sm:top-4 inset-x-0 z-[60] px-4" onMouseLeave={() => setOpen(false)}>
        <div className="max-w-[1180px] mx-auto rounded-2xl transition-all" style={{ background: scrolled || open ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.62)", backdropFilter: "blur(16px)", border: `1px solid ${C.line}`, boxShadow: scrolled ? SHADOW_SM : "none" }}>
          <div className="px-4 sm:px-5 h-14 flex items-center">
            {/* left: logo */}
            <div className="flex-1 flex items-center">
              <a href="/" aria-label="Blue-IQ home"><Image src="/logo_large.webp" alt="Blue-IQ" width={96} height={31} priority /></a>
            </div>

            {/* center: items */}
            <nav className="hidden lg:flex items-center gap-1 justify-center">
              <div onMouseEnter={() => setOpen(true)}>
                <button className="font-sans-g text-[13.5px] px-3 py-2 rounded-lg transition-colors hover:bg-black/[0.04]" style={{ color: open ? C.ink : C.sub }} aria-expanded={open}>
                  Platform <span style={{ color: C.faint }}>{open ? "▴" : "▾"}</span>
                </button>
              </div>
              {links.map(([l, h]) => (
                <a key={l} href={h} onMouseEnter={() => setOpen(false)} className="font-sans-g text-[13.5px] px-3 py-2 rounded-lg transition-colors hover:bg-black/[0.04]" style={{ color: C.sub }}>{l}</a>
              ))}
            </nav>

            {/* right: actions */}
            <div className="flex-1 flex items-center justify-end gap-2">
              <a href="/contact" className="hidden sm:block font-sans-g text-[13.5px] px-3 py-2" style={{ color: C.sub }}>Sign in</a>
              <Magnetic href="/contact" className="hidden sm:inline-flex items-center gap-1.5 font-sans-g text-[13.5px] font-medium text-white px-4 py-2 rounded-lg" style={{ background: C.blue, boxShadow: "0 8px 20px -10px rgba(0,33,129,0.6)" }}>
                Request demo <Arrow className="w-3.5 h-3.5" />
              </Magnetic>
              <button className="lg:hidden w-9 h-9 grid place-items-center rounded-lg" onClick={() => setMobile(!mobile)} aria-label="Menu" style={{ border: `1px solid ${C.line2}` }}>
                <span style={{ color: C.ink }}>{mobile ? "✕" : "≡"}</span>
              </button>
            </div>
          </div>

          {/* dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -6, height: 0 }} transition={{ duration: 0.26, ease }} className="hidden lg:block overflow-hidden">
                <div className="px-4 pb-4 grid grid-cols-3 gap-3">
                  {products.map((m, i) => (
                    <motion.a key={m.name} href={m.href} target={m.external ? "_blank" : undefined} rel={m.external ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, ease, duration: 0.3 }}
                      className="group rounded-xl p-4 transition-colors" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <m.Icon className="w-8 h-8" />
                        <span className="font-display text-[18px] font-bold" style={{ color: C.ink }}>{m.name}</span>
                        <span className="ml-auto font-mono-g text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ background: C.blueSoft, color: C.blue2 }}>{m.kind}</span>
                      </div>
                      <p className="font-sans-g text-[12.5px]" style={{ color: C.sub }}>{m.desc}</p>
                      <span className="inline-flex items-center gap-1 mt-3 font-mono-g text-[11px] transition-transform group-hover:translate-x-1" style={{ color: C.blue2 }}>
                        {m.external ? <>Open site <span aria-hidden>↗</span></> : <>Explore <Arrow className="w-3 h-3" /></>}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* mobile */}
          <AnimatePresence>
            {mobile && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease }} className="lg:hidden overflow-hidden">
                <div className="px-4 pb-4 flex flex-col">
                  {mobileLinks.map((m) => (
                    <a key={m.label} href={m.href} target={m.external ? "_blank" : undefined} rel={m.external ? "noopener noreferrer" : undefined} onClick={() => setMobile(false)} className="font-sans-g text-[15px] py-3 flex items-center" style={{ color: C.sub, borderTop: `1px solid ${C.line}` }}>
                      {m.label}{m.external && <span className="ml-1.5" style={{ color: C.faint }}>↗</span>}
                    </a>
                  ))}
                  <a href="/contact" onClick={() => setMobile(false)} className="mt-3 text-center font-sans-g text-[14px] font-medium text-white py-3 rounded-xl" style={{ background: C.blue }}>Request demo</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export default memo(SiteNav);
