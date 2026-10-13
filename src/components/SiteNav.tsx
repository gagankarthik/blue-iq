"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SA } from "@/lib/theme";
import { IconArrowUpRight } from "@/components/icons/BqIcons";
import {
  type Spot,
  SpotCapture,
  SpotSpend,
  SpotGovern,
  SpotSonar,
  SpotEducation,
  SpotWorkforce,
  SpotCustom,
  SpotIntegrate,
  SpotRead,
  SpotScore,
  SpotSecure,
  SpotTeam,
  SpotChat,
  SpotFaq,
  SpotScale,
  SECTOR_SPOT,
} from "@/components/icons/Spots";

/* ────────────────────────────────────────────────────────────────
   The navbar, after sarvam.ai: a full-width white bar; each menu opens a
   full-width white panel under it — a small uppercase label, two columns
   of items (a spot in a bordered square, a name, one line), and feature
   cards on the right. The page behind softens while a panel is open.
   ──────────────────────────────────────────────────────────────── */

type Item = { t: string; d: string; href: string; external?: boolean; Spot: Spot };
type Feature = { t: string; href: string; Spot: Spot; well: string };
type Menu = { id: string; label: string; header: string; items: Item[]; features: Feature[] };

const S = SECTOR_SPOT;

const menus: Menu[] = [
  {
    id: "products",
    label: "Products",
    header: "Products",
    items: [
      { t: "Capture", d: "Documents into structured data", href: "https://www.parsinglab.blue-iq.ai/", external: true, Spot: SpotCapture },
      { t: "Spend", d: "Invoices against what was agreed", href: "/products#spend", Spot: SpotSpend },
      { t: "Govern", d: "Contracts and obligations in view", href: "https://govern.blue-iq.ai/", external: true, Spot: SpotGovern },
      { t: "Sonar AI", d: "The engine under every product", href: "/platform", Spot: SpotSonar },
      { t: "Campus edition", d: "For universities and colleges", href: "/products#editions", Spot: SpotEducation },
      { t: "Workforce edition", d: "For staffing and healthcare", href: "/products#editions", Spot: SpotWorkforce },
    ],
    features: [{ t: "All Blue-IQ products", href: "/products", Spot: SpotCustom, well: "linear-gradient(160deg, #4F7BF2 0%, #8FAEFF 55%, #E3EAFF 100%)" }],
  },
  {
    id: "solutions",
    label: "Solutions",
    header: "Industries",
    items: [
      { t: "IT sector", d: "Vendor contracts and licences", href: "/solutions/it", Spot: S.it },
      { t: "Education", d: "Applications and transcripts", href: "/solutions/education", Spot: S.education },
      { t: "Workforce", d: "Candidates onboarded in one read", href: "/solutions/workforce", Spot: S.workforce },
      { t: "Healthcare staffing", d: "Clinicians credentialed faster", href: "/solutions/healthcare", Spot: S.healthcare },
      { t: "Legal and contracts", d: "Risk surfaced before signature", href: "/solutions/legal", Spot: S.legal },
      { t: "Procurement and finance", d: "Spend reconciled as it is billed", href: "/solutions/procurement", Spot: S.procurement },
    ],
    features: [
      { t: "Custom builds on Sonar", href: "/solutions#custom", Spot: SpotCustom, well: "linear-gradient(160deg, #2BA4E0 0%, #7FD3FF 55%, #E2F5FF 100%)" },
      {
        t: "Migrations and integrations",
        href: "/solutions#integrations",
        Spot: SpotScale,
        well: "linear-gradient(160deg, #4F7BF2 0%, #8FAEFF 55%, #E3EAFF 100%)",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    header: "Build and learn",
    items: [
      { t: "How the API works", d: "REST, JSON and signed webhooks", href: "/resources#api", Spot: SpotIntegrate },
      { t: "Formats Sonar reads", d: "PDF, Word, scans and photos", href: "/resources#formats", Spot: SpotRead },
      { t: "Working with scores", d: "Build on confidence, not guesses", href: "/resources#confidence", Spot: SpotScore },
      { t: "Trust Center", d: "Security, privacy and compliance", href: "/trust", Spot: SpotSecure },
    ],
    features: [{ t: "How Sonar works", href: "/platform", Spot: SpotSonar, well: "linear-gradient(160deg, #3A4CA8 0%, #7D9DFF 55%, #E3EAFF 100%)" }],
  },
  {
    id: "company",
    label: "Company",
    header: "Company",
    items: [
      { t: "About Blue-IQ", d: "Who we are and how we work", href: "/about", Spot: SpotTeam },
      { t: "Pricing", d: "Plans shaped to your volume", href: "/contact#pricing", Spot: SpotSpend },
      { t: "Contact", d: "Talk to the team", href: "/contact", Spot: SpotChat },
      { t: "FAQ", d: "Answers to common questions", href: "/faq", Spot: SpotFaq },
    ],
    features: [
      { t: "Trust Center", href: "/trust", Spot: SpotSecure, well: "linear-gradient(160deg, #1F9D6B 0%, #7FD8B0 55%, #E3F7EE 100%)" },
      { t: "Book a demo", href: "/contact?topic=A%20demo", Spot: SpotChat, well: "linear-gradient(160deg, #4F7BF2 0%, #8FAEFF 55%, #E3EAFF 100%)" },
    ],
  },
];

function ItemRow({ it, onClick }: { it: Item; onClick?: () => void }) {
  return (
    <a
      href={it.href}
      target={it.external ? "_blank" : undefined}
      rel={it.external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="group flex items-center gap-4 rounded-[14px] p-2 -m-2 transition-colors duration-150 hover:bg-[#F5F5F7]"
    >
      <span
        className="shrink-0 grid place-items-center w-12 h-12 rounded-[12px] bg-white transition-colors duration-150 group-hover:border-[#C9C9CF]"
        style={{ border: `1px solid ${SA.line}` }}
      >
        <it.Spot size={32} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 font-sans-g text-[16px] font-medium leading-tight" style={{ color: SA.ink }}>
          {it.t}
          {it.external && <IconArrowUpRight size={13} style={{ color: SA.faint }} />}
        </span>
        <span className="block mt-1 font-sans-g text-[14px] leading-snug" style={{ color: SA.faint }}>
          {it.d}
        </span>
      </span>
    </a>
  );
}

function FeatureCard({ f }: { f: Feature }) {
  return (
    <a
      href={f.href}
      className="group block w-[280px] rounded-[18px] p-1.5 bg-white transition-colors duration-150 hover:border-[#C9C9CF]"
      style={{ border: `1px solid ${SA.line}` }}
    >
      <span className="grid place-items-center h-[150px] rounded-[13px] overflow-hidden" style={{ background: f.well }}>
        <span className="grid place-items-center w-[84px] h-[84px] rounded-[20px] bg-white shadow-[0_12px_28px_-14px_rgba(15,20,50,0.45)] transition-transform duration-300 ease-out group-hover:scale-[1.05]">
          <f.Spot size={56} />
        </span>
      </span>
      <span className="flex items-center justify-between gap-2 px-2.5 pt-3 pb-2 font-sans-g text-[14.5px]" style={{ color: SA.ink }}>
        {f.t}
        <IconArrowUpRight
          size={14}
          className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: SA.faint }}
        />
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

/* `overDark` is accepted for compatibility with older pages and ignored. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const closeMobile = () => {
    setMobile(false);
    setSection(null);
  };

  return (
    <>
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
            className="hidden lg:block fixed inset-0 z-[55] bg-[rgba(30,33,48,0.12)] backdrop-blur-[6px]"
            onMouseEnter={() => setOpen(null)}
          />
        )}
      </AnimatePresence>

      <header onMouseLeave={() => setOpen(null)} className="fixed top-0 inset-x-0 z-[60]">
        <div
          className="transition-[background-color,border-color] duration-200"
          style={{
            background: scrolled || open || mobile ? "#FFFFFF" : "transparent",
            borderBottom: `1px solid ${scrolled || open || mobile ? SA.line : "transparent"}`,
          }}
        >
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-[72px] grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
            <Link href="/" aria-label="Blue-IQ home" className="flex items-center justify-self-start" onMouseEnter={() => setOpen(null)}>
              <Image src="/logo.svg" alt="Blue-IQ" width={108} height={34} priority />
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
                    className="inline-flex items-center px-4 py-2 rounded-full font-sans-g text-[15px] transition-colors duration-150 hover:text-[#1F1F1F]"
                    style={{ color: SA.ink, background: isOn ? "rgba(255,255,255,0.7)" : "transparent" }}
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
                href="/contact"
                className="hidden md:inline-flex items-center h-10 px-5 rounded-full font-sans-g text-[15px] font-medium bg-white text-[#1F1F1F] border border-[#E2E2E6] transition-colors duration-150 hover:bg-[#FAFAFA] hover:border-[#C9C9CF]"
              >
                Contact us
              </Link>
              <Link
                href="/contact?topic=A%20demo"
                className="hidden sm:inline-flex items-center h-10 px-5 rounded-full font-sans-g text-[15px] font-medium text-white bg-[#1E2130] transition-colors duration-150 hover:bg-[#2A2E42] active:bg-[#14161F]"
              >
                Book a demo
              </Link>
              <button
                className="lg:hidden w-11 h-11 grid place-items-center -mr-2 rounded-lg"
                onClick={() => (mobile ? closeMobile() : setMobile(true))}
                aria-label={mobile ? "Close menu" : "Open menu"}
                aria-expanded={mobile}
                style={{ color: SA.ink }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                  {mobile ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* the full-width panel */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              id={`menu-${active.id}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute inset-x-0 top-full bg-white"
              style={{ borderBottom: `1px solid ${SA.line}`, boxShadow: "0 30px 60px -40px rgba(15,20,50,0.35)" }}
            >
              <div className="max-w-[1240px] mx-auto px-8 py-10 flex gap-12">
                <div className="flex-1 min-w-0">
                  <p className="font-sans-g text-[12.5px] font-medium uppercase tracking-[0.12em]" style={{ color: SA.faint }}>
                    {active.header}
                  </p>
                  <div className={`mt-6 grid gap-x-10 gap-y-6 ${active.items.length > 3 ? "grid-cols-2" : "grid-cols-1 max-w-[380px]"}`}>
                    {active.items.map((it) => (
                      <ItemRow key={it.t} it={it} onClick={() => setOpen(null)} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  {active.features.map((f) => (
                    <FeatureCard key={f.t} f={f} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* mobile sheet */}
        {mobile && (
          <div className="lg:hidden max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain bg-white">
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
                      <div className="pb-6 pt-1 grid gap-5 pl-2">
                        {m.items.map((it) => (
                          <ItemRow key={it.t} it={it} onClick={closeMobile} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-6 grid gap-3">
                <Link
                  href="/contact?topic=A%20demo"
                  onClick={closeMobile}
                  className="inline-flex items-center justify-center h-12 font-sans-g text-base font-medium text-white rounded-full bg-[#1E2130] hover:bg-[#2A2E42] transition-colors duration-150"
                >
                  Book a demo
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="inline-flex items-center justify-center h-12 font-sans-g text-base font-medium rounded-full bg-white border border-[#E2E2E6] text-[#1F1F1F]"
                >
                  Contact us
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
