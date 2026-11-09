import { BB } from "@/lib/theme";
import { webPageLd, ldScript } from "@/lib/seo";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HomeHero from "@/components/home/HomeHero";
import Showcase from "@/components/home/Showcase";
import Approach from "@/components/home/Approach";
import Portfolio from "@/components/home/Portfolio";
import Sectors from "@/components/home/Sectors";
import Enterprise from "@/components/home/Enterprise";
import CloseCta from "@/components/home/CloseCta";
import Pillars from "@/components/home/Pillars";
import Deploy from "@/components/home/Deploy";

/* The home page: the original content and section order (hero, live demo,
   how Sonar works, portfolio, the full stack, sectors, where it runs,
   enterprise, close) in the 2026-11 blueprint system. Server component:
   only the interactive sections ship JavaScript. */

export default function Home() {
  return (
    <div className="relative overflow-x-clip" style={{ color: BB.ink }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(
          webPageLd({
            name: "Blue-IQ | Document AI for Contracts, Invoices and Records",
            description:
              "Blue-IQ builds document AI products, Capture, Spend and Govern, all running on Sonar, the AI that scores every field and flags what it can't read.",
            path: "/",
          })
        )}
      />
      <SiteNav overDark={false} />
      <main id="main" className="relative z-[1]">
        <HomeHero />
        <Showcase />
        <Approach />
        <Portfolio />
        <Pillars />
        <Sectors />
        <Deploy />
        <Enterprise />
        <CloseCta />
      </main>
      <SiteFooter cta={false} />
    </div>
  );
}
