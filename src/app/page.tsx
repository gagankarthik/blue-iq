import { SA } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScrollProgress from "@/components/saas/ScrollProgress";
import Hero from "@/components/saas/Hero";
import Gallery from "@/components/saas/Gallery";
import HowItWorks from "@/components/saas/HowItWorks";
import UseCases from "@/components/saas/UseCases";
import Security from "@/components/saas/Security";
import Cta from "@/components/saas/Cta";

/* Server component: each animated section below is its own client leaf, so the
   page shell itself ships no JS. */
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

      <ScrollProgress />
      <SiteNav />

      <main id="main">
        <Hero />
        <Gallery />
        <HowItWorks />
        <UseCases />
        <Security />
        <Cta />
      </main>

      <SiteFooter />
    </div>
  );
}
