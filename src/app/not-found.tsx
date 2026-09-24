import type { Metadata } from "next";
import { SA } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { IconArrow, IconFlag } from "@/components/icons/BqIcons";

/* 404, in the company's own words: a request we could not resolve, flagged
   in the amber the product uses for a field it could not read — and then the
   routes out, as the largest things on the page. */

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const routes: { label: string; href: string; note: string }[] = [
  { label: "Home", href: "/", note: "What Blue-IQ does, from the top" },
  { label: "Products", href: "/products", note: "Capture, Spend, Govern and the editions" },
  { label: "Solutions", href: "/solutions", note: "Industries, custom builds and integrations" },
  { label: "Contact", href: "/contact", note: "Send us a document and see what comes back" },
];

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav overDark={false} />
      <main className="flex-1 px-5 sm:px-8">
        <div className="max-w-[1240px] mx-auto pt-36 sm:pt-44 pb-24 grid lg:grid-cols-2 gap-x-16 gap-y-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-sans-g text-[13.5px] font-medium" style={{ background: "#FBF3DE", color: "#7A5406" }}>
              <IconFlag size={16} /> Error 404
            </p>
            <h1 className="mt-6 font-display font-semibold leading-[1.05]" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", letterSpacing: "-0.04em", maxWidth: "14ch" }}>
              We could not find this page.
            </h1>
            <p className="mt-6 font-sans-g text-[1.0625rem] leading-[1.7]" style={{ color: SA.sub, maxWidth: "46ch" }}>
              It may have moved, or the link may be mistyped. Rather than guess, here are the places you most likely meant to go.
            </p>
          </div>
          <nav aria-label="Suggested pages">
            {routes.map((r) => (
              <a key={r.href} href={r.href} className="group flex items-center gap-6 py-6" style={{ borderTop: `1px solid ${SA.line2}` }}>
                <span className="flex-1 min-w-0">
                  <span className="block font-display font-semibold text-[1.35rem] tracking-[-0.02em] transition-colors group-hover:text-[#1D5BF0]">{r.label}</span>
                  <span className="block mt-1 font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
                    {r.note}
                  </span>
                </span>
                <IconArrow size={20} className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: SA.accent }} />
              </a>
            ))}
            <div style={{ borderTop: `1px solid ${SA.line2}` }} />
          </nav>
        </div>
      </main>
      <SiteFooter cta={false} />
    </div>
  );
}
