import type { Metadata } from "next";
import Link from "next/link";
import { BB } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { WRAP } from "@/components/page/kit";
import { I, Tile, type Ico } from "@/components/home/icons";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import MissingPath from "./MissingPath";

/* 404: a focused page, left-aligned in the column. Reading order: the
   error (a large 404 and the code in words), what happened (the address
   that does not exist), two actions, then the six likeliest ways back in
   as a card grid. noindex so the error never ranks. */

export const metadata: Metadata = {
  title: "404: Page not found",
  description: "This page does not exist. Find Blue-IQ's products, solutions, developer guide or contact the team.",
  robots: { index: false, follow: true },
};

const ROUTES: { t: string; d: string; href: string; icon: Ico }[] = [
  { t: "Products", d: "Capture, Spend, Govern and the editions", href: "/products", icon: I.all },
  { t: "Solutions", d: "By industry, plus custom builds", href: "/solutions", icon: I.about },
  { t: "Sonar, our AI", d: "How every product reads and scores", href: "/platform", icon: I.sonar },
  { t: "Developer guide", d: "API, formats and confidence scores", href: "/resources", icon: I.api },
  { t: "FAQ", d: "Answers to common questions", href: "/faq", icon: I.faq },
  { t: "Contact", d: "Talk to the team", href: "/contact", icon: I.contact },
];

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col overflow-x-clip" style={{ color: BB.ink }}>
      <SiteNav overDark={false} />
      <main id="main" className="flex-1">
        <section className={`${WRAP} pt-32 sm:pt-40 pb-24`} aria-labelledby="nf-h">
          <p aria-hidden className="font-display select-none leading-[0.9] tracking-[-0.06em] text-[clamp(6rem,18vw,12rem)]" style={{ color: BB.ink }}>
            4<span style={{ color: BB.cobalt }}>0</span>4
          </p>
          <p className="mt-4 font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.ink3 }}>
            Error 404 · Page not found
          </p>

          <h1 id="nf-h" className="mt-8 font-display t-h1 max-w-[20ch]">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-4 font-sans-g t-sub max-w-[52ch]" style={{ color: BB.ink3 }}>
            The link may be mistyped, or the page may have moved. Rather than guess where you meant to go, here are the likeliest places.
          </p>
          <MissingPath />

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <SqBtn href="/" tone="ink" size="lg" arrow>
              Back to the home page
            </SqBtn>
            <SqBtn href="/contact?topic=Support" tone="outline" size="lg">
              Report a broken link
            </SqBtn>
          </div>
        </section>

        <section className={`${WRAP} pb-24`} aria-labelledby="nf-routes">
          <div aria-hidden className="h-px mb-24" style={{ background: BB.line }} />
          <Head id="nf-routes" title="Try one of these" />
          <Stagger as="ul" className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROUTES.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="group h-full flex flex-col rounded-2xl bg-white p-8 border border-[#D9DCE2] transition-[border-color] duration-200 hover:border-[#0E1116]"
                >
                  <span className="flex items-start justify-between gap-4">
                    <Tile icon={r.icon} />
                    <I.arrow size={20} aria-hidden className="transition-transform duration-150 group-hover:translate-x-1" style={{ color: BB.cobalt }} />
                  </span>
                  <span className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                    {r.t}
                  </span>
                  <span className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                    {r.d}
                  </span>
                </Link>
              </li>
            ))}
          </Stagger>
        </section>
      </main>
      <SiteFooter cta={false} />
    </div>
  );
}
