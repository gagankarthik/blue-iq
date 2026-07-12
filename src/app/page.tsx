import { SA } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/saas/Hero";
import Suite from "@/components/saas/Suite";
import Ledger from "@/components/saas/Ledger";
import Industries from "@/components/saas/Industries";
import Security from "@/components/saas/Security";
import Faq from "@/components/saas/Faq";

/* Server component: every animated section below is its own client leaf, so the
   page shell itself ships no JS.

   The page is light throughout. The rhythm is carried by value *within* the
   light range — white where the copy is, and the brand tint once, at the close.
   No dark sections: every dark, grid-lined, glow-washed panel we tried read as
   machine-made, and the reference is a light site.

   The pinned "how it works" scene is gone. It was 440vh — nearly five screens
   of scroll — spent scrubbing a drawing of a document through four stages, and
   the drawing was the same invented mock-up we deleted everywhere else. It cost
   the reader more than it told them. */
export default function Home() {
  return (
    <div id="top" style={{ background: SA.bg, color: SA.ink }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-xs"
        style={{ background: SA.ink }}
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main">
        <Hero />
        {/* one product per band — the sentence carries it, no card grid */}
        <Suite />
        {/* the numbers, as a spec ledger: tiny label, enormous value, ruled */}
        <Ledger />
        <Industries />
        <Security />
        <Faq />
      </main>

      {/* the ask and the sitemap are one closing band — the page used to end,
          and then end again */}
      <SiteFooter />
    </div>
  );
}
