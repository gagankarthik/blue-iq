"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SA } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Words, SPRING_SOFT } from "@/components/saas/motion";

/* ────────────────────────────────────────────────────────────────
   404.

   The whole company rests on one opinion: the engine flags what it cannot
   read instead of guessing at it. A 404 is exactly that situation — a request
   we cannot resolve — so the page says so in the company's own words rather
   than shrugging with "Oops! Page not found 🤷".

   The status is set in the amber that the design system reserves for
   "needs review". It is the same signal the product uses on a field it could
   not read, used here on a page it could not find. Functional colour, not
   decoration.

   The numeral is the page. My first pass buried it in a mono caption at 11px,
   which made the most useful signal on the screen the smallest thing on it —
   a reader who has just hit a dead end should know it in one glance, from
   across the room. So 404 is set at display scale, and the scan line that
   crosses it is the same gesture the loader uses on the wordmark.
   ──────────────────────────────────────────────────────────────── */

const routes: { label: string; href: string; note: string }[] = [
  { label: "What we do", href: "/", note: "The short version, from the top" },
  { label: "The products", href: "/products", note: "Capture, Spend, Govern, and the editions" },
  { label: "Solutions", href: "/solutions", note: "Custom work, integrations, and the industries we read for" },
  { label: "Talk to us", href: "/contact", note: "Send us the ugliest document you have" },
];

export default function NotFound() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-x-clip min-h-[100dvh] flex flex-col" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />

      <main className="flex-1 px-5 sm:px-8">
        <div className="max-w-[1180px] mx-auto pt-36 sm:pt-44 pb-24 sm:pb-32">
          {/* the numeral IS the page — it should read from across the room */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_SOFT }}
            className="relative inline-block"
          >
            <div
              className="font-display font-normal tabular-nums select-none leading-[0.82]"
              style={{
                fontSize: "clamp(6rem, 22vw, 17rem)",
                letterSpacing: "-0.06em",
                color: SA.ink,
              }}
            >
              404
            </div>

            {/* the scan passes through it, the way it passes through the
                wordmark on the loader — the engine reading, and failing */}
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute left-[-6%] w-[112%] h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${SA.amber}, transparent)` }}
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.2,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 0.6,
                  times: [0, 0.12, 0.88, 1],
                }}
              />
            )}
          </motion.div>

          <div className="mt-2 flex items-center gap-3">
            {/* the same amber the engine puts on a field it could not read */}
            <motion.span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: SA.amber }}
              animate={reduce ? {} : { opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono-g text-[11px] uppercase tracking-[0.2em]" style={{ color: SA.amber }}>
              Could not be read
            </span>
          </div>

          <Words
            as="h1"
            text="We could not read this page."
            className="mt-8 font-display font-normal leading-[1.04] max-w-[16ch]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", letterSpacing: "-0.04em", color: SA.ink }}
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_SOFT, delay: 0.35 }}
            className="mt-7 font-sans-g leading-[1.75] max-w-[52ch]"
            style={{ fontSize: "1.08rem", color: SA.sub }}
          >
            Which is the one thing we promise never to guess at. So rather than invent a page that isn&apos;t there,
            here is where you might have meant to go.
          </motion.p>

          {/* the routes out are the biggest interactive thing here — the reader
              is lost, and the job is to get them somewhere useful in one look */}
          <div className="mt-16 sm:mt-20">
            {routes.map((r, i) => (
              <motion.a
                key={r.href}
                href={r.href}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_SOFT, delay: 0.5 + i * 0.07 }}
                className="group flex items-center gap-5 sm:gap-8 py-6 sm:py-7"
                style={{ borderTop: `1px solid ${SA.line2}` }}
              >
                <span className="flex-1 min-w-0">
                  <span
                    className="block font-display font-normal leading-[1.15] transition-colors duration-300 group-hover:text-[var(--acc)]"
                    style={{
                      fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
                      letterSpacing: "-0.03em",
                      color: SA.ink,
                      "--acc": SA.accent,
                    } as React.CSSProperties}
                  >
                    {r.label}
                  </span>
                  <span className="block mt-1.5 font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
                    {r.note}
                  </span>
                </span>

                <ArrowRight
                  className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.6}
                  style={{ color: SA.faint }}
                />
              </motion.a>
            ))}
            <div style={{ borderTop: `1px solid ${SA.line2}` }} />
          </div>
        </div>
      </main>

      {/* a 404 should not close on a sales pitch */}
      <SiteFooter cta={false} />
    </div>
  );
}
