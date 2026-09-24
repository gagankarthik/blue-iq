import { SA } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/saas/Hero";
import Suite from "@/components/saas/Suite";
import SonarEngine from "@/components/saas/SonarEngine";
import Pipeline from "@/components/saas/Pipeline";
import Confidence from "@/components/saas/Confidence";
import Industries from "@/components/saas/Industries";
import Security from "@/components/saas/Security";
import Faq from "@/components/saas/Faq";
import { FAQS } from "@/components/saas/faqData";

/* Server component: each animated section is its own client leaf.

   Rhythm, top to bottom: white hero → white platform → navy "how it works"
   → cool-grey confidence → white industries → cool-grey security → white FAQ
   → navy close. One dark band mid-page and one at the end; everything else
   alternates between two close light values. */

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <div id="top" style={{ background: SA.bg, color: SA.ink }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-sm"
        style={{ background: SA.ink }}
      >
        Skip to content
      </a>

      <SiteNav overDark />

      <main id="main">
        <Hero />
        <SonarEngine />
        <Suite />
        <Pipeline />
        <Confidence />
        <Industries />
        <Security />
        <Faq />
      </main>

      <SiteFooter />
    </div>
  );
}
