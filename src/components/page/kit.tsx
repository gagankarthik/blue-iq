"use client";

import { SA } from "@/lib/theme";
import { Reveal } from "@/components/saas/parts";
import { IconArrow } from "@/components/icons/BqIcons";
import SonarField from "@/components/art/SonarField";

/* ────────────────────────────────────────────────────────────────
   The page kit — the shared vocabulary for every page other than home, so
   no page can drift from the landing page by accident.

   · Headings semibold and tight; body at full-contrast slate.
   · One simple reveal (rise + fade, once). No blur, no word assembly.
   · Nothing boxed unless elevation means something; a 1px rule is the
     default chrome.
   ──────────────────────────────────────────────────────────────── */

export const WRAP = "max-w-[1240px] mx-auto px-5 sm:px-8";

/* The top of a page: navy, over the live Sonar field, so every page opens
   the way the home page does — but compact, and led by its own label so each
   page announces what it is for. `children` holds the page's own actions. */
export function PageHero({
  label,
  title,
  lede,
  children,
}: {
  label?: string;
  title: string;
  lede: string;
  meta?: string[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden" style={{ background: SA.navy }}>
      <SonarField auto={3400} />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(8,16,43,0.92) 0%, rgba(8,16,43,0.6) 55%, rgba(8,16,43,0.2) 100%)" }} />
      <div className={`${WRAP} relative pt-32 sm:pt-40 pb-16 sm:pb-20`}>
        <Reveal className="max-w-[760px]">
          {label && (
            <p className="font-sans-g text-[14px] font-semibold" style={{ color: "#8EC2FF" }}>
              {label}
            </p>
          )}
          <h1 className="mt-5 font-display font-semibold leading-[1.04] text-white" style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
            {title}
          </h1>
          <p className="mt-6 font-sans-g leading-[1.65]" style={{ fontSize: "clamp(1.02rem, 1.4vw, 1.15rem)", color: "rgba(255,255,255,0.78)", maxWidth: "52ch" }}>
            {lede}
          </p>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/* the two button styles used on navy page headers */
export function HeroButton({ href, children, ghost }: { href: string; children: React.ReactNode; ghost?: boolean }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-sans-g text-[15px] font-semibold transition-colors active:scale-[0.98] ${ghost ? "text-white hover:bg-white/10" : "hover:bg-[#EDF3FF]"}`}
      style={ghost ? { border: "1px solid rgba(255,255,255,0.26)" } : { background: "#fff", color: SA.ink }}
    >
      {children}
      {!ghost && <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />}
    </a>
  );
}
