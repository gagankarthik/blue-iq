import type { Metadata } from "next";
import { SA } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Btn } from "@/components/system/Btn";
import { IconArrow } from "@/components/icons/BqIcons";

/* 404, in the product's own terms: a request Sonar could not resolve,
   flagged rather than guessed at — then the likeliest routes out, as the
   largest things on the page. noindex so the error never ranks. */

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist. Find Blue-IQ's products, solutions, developer guide or contact the team.",
  robots: { index: false, follow: true },
};

const routes: { label: string; href: string; note: string }[] = [
  { label: "Products", href: "/products", note: "Capture, Spend, Govern and the editions" },
  { label: "Solutions", href: "/solutions", note: "By industry, plus custom builds and integrations" },
  { label: "Developer guide", href: "/resources", note: "API, formats and confidence scores" },
  { label: "Contact", href: "/contact", note: "Talk to the team about your documents" },
];

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav overDark={false} />
      <main id="main" className="flex-1 px-5 sm:px-8">
        <div className="max-w-[1240px] mx-auto pt-32 sm:pt-40 pb-20 grid grid-cols-12 gap-y-12 lg:gap-x-16">
          <div className="col-span-12 lg:col-span-6">
            <p className="inline-flex items-center gap-2 h-8 px-3 rounded-full font-mono-g t-meta" style={{ background: "#FEF3C7", color: "#92400E" }}>
              404 · flagged for review
            </p>
            <h1 className="mt-6 font-display t-h1 max-w-[16ch]">We could not find this page.</h1>
            <p className="mt-4 font-sans-g t-lead measure" style={{ color: SA.sub }}>
              The link may be mistyped, or the page may have moved. Rather than guess, here are the places you most likely meant to go.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/" size="lg" arrow>
                Back to the home page
              </Btn>
              <Btn href="/contact" variant="secondary" size="lg">
                Report a broken link
              </Btn>
            </div>
          </div>
          <nav aria-label="Suggested pages" className="col-span-12 lg:col-span-6 self-end">
            {routes.map((r) => (
              <a
                key={r.href}
                href={r.href}
                className="group flex items-center gap-6 py-5 -mx-3 px-3 rounded-lg transition-colors duration-150 hover:bg-[#F8FAFC]"
                style={{ borderTop: `1px solid ${SA.line}` }}
              >
                <span className="flex-1 min-w-0">
                  <span className="block font-display t-h4">{r.label}</span>
                  <span className="block mt-1 font-sans-g t-body" style={{ color: SA.sub }}>
                    {r.note}
                  </span>
                </span>
                <IconArrow size={20} className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: SA.accent }} />
              </a>
            ))}
            <div style={{ borderTop: `1px solid ${SA.line}` }} />
          </nav>
        </div>
      </main>
      <SiteFooter cta={false} />
    </div>
  );
}
