import type { Metadata } from "next";
import Link from "next/link";
import { SA } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Btn } from "@/components/system/Btn";
import { Wash, CARD, CARD_EDGE, SpotWell } from "@/components/page/kit";
import { IconArrow } from "@/components/icons/BqIcons";
import { type Spot, SpotCustom, SpotIT, SpotSonar, SpotIntegrate, SpotFaq, SpotChat } from "@/components/icons/Spots";
import MissingPath from "./MissingPath";

/* 404. The error is the headline: "404" set as large as the screen allows,
   so nobody mistakes this for a real page. Then what happened (the address
   that does not exist), two clear actions, and the six likeliest ways back
   in. noindex so the error never ranks. */

export const metadata: Metadata = {
  title: "404: Page not found",
  description: "This page does not exist. Find Blue-IQ's products, solutions, developer guide or contact the team.",
  robots: { index: false, follow: true },
};

const ROUTES: { t: string; d: string; href: string; Spot: Spot }[] = [
  { t: "Products", d: "Capture, Spend, Govern and the editions", href: "/products", Spot: SpotCustom },
  { t: "Solutions", d: "By industry, plus custom builds", href: "/solutions", Spot: SpotIT },
  { t: "Sonar, our AI", d: "How every product reads and scores", href: "/platform", Spot: SpotSonar },
  { t: "Developer guide", d: "API, formats and confidence scores", href: "/resources", Spot: SpotIntegrate },
  { t: "FAQ", d: "Answers to common questions", href: "/faq", Spot: SpotFaq },
  { t: "Contact", d: "Talk to the team", href: "/contact", Spot: SpotChat },
];

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav overDark={false} />
      <main id="main" className="flex-1">
        <section className="relative isolate px-5 sm:px-8 pt-28 sm:pt-36 pb-16 sm:pb-20 text-center" aria-labelledby="nf-h">
          <Wash />
          <p
            className="inline-flex items-center gap-2 h-9 px-4 rounded-full font-sans-g text-[14px] font-semibold"
            style={{ background: "#FEE2E2", color: "#991B1B" }}
          >
            <span aria-hidden className="w-2 h-2 rounded-full" style={{ background: "#DC2626" }} />
            Error 404 · Page not found
          </p>

          <p
            aria-hidden
            className="mt-10 sm:mt-12 font-display select-none leading-[0.82] tracking-[-0.06em] text-[clamp(9rem,30vw,24rem)]"
            style={{ color: SA.ink }}
          >
            4<span style={{ color: SA.accent }}>0</span>4
          </p>

          <h1 id="nf-h" className="mt-2 mx-auto font-display t-h1 max-w-[18ch]">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-4 mx-auto font-sans-g text-[1.125rem] sm:text-[1.25rem] leading-[1.6] max-w-[46ch]" style={{ color: "#3A3B44" }}>
            The link may be mistyped, or the page may have moved. Rather than guess where you meant to go, here are the likeliest places.
          </p>
          <MissingPath />

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Btn href="/" size="lg" className="w-full sm:w-auto">
              Back to the home page
            </Btn>
            <Btn href="/contact?topic=Support" variant="secondary" size="lg" className="w-full sm:w-auto">
              Report a broken link
            </Btn>
          </div>
        </section>

        <section className="px-5 sm:px-8 pb-24 sm:pb-32" aria-labelledby="nf-routes">
          <div className="max-w-[1240px] mx-auto">
            <h2 id="nf-routes" className="text-center font-sans-g text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#4A4B53" }}>
              Try one of these
            </h2>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ROUTES.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className={`group ${CARD} h-full flex items-center gap-5 p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#D4D4DA] hover:shadow-[0_16px_32px_-24px_rgba(30,33,48,0.3)]`}
                    style={CARD_EDGE}
                  >
                    <SpotWell size={64}>
                      <r.Spot size={44} />
                    </SpotWell>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2 font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                        {r.t}
                        <IconArrow size={16} className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: SA.faint }} />
                      </span>
                      <span className="mt-1 block font-sans-g text-[15px]" style={{ color: SA.sub }}>
                        {r.d}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter cta={false} />
    </div>
  );
}
