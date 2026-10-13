import { SA } from "@/lib/theme";
import { webPageLd, ldScript } from "@/lib/seo";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HomeHero from "@/components/home/HomeHero";
import Showcase from "@/components/home/Showcase";
import Approach from "@/components/home/Approach";
import Portfolio from "@/components/home/Portfolio";
import Pillars from "@/components/home/Pillars";
import Sectors from "@/components/home/Sectors";
import Enterprise from "@/components/home/Enterprise";
import CloseCta from "@/components/home/CloseCta";
import Deploy from "@/components/home/Deploy";

/* The home page, composed section by section after sarvam.ai: a colour-wash
   hero, a framed tabbed showcase of Sonar at work, a horizontal accordion
   for how it works, a split portfolio, a three-column company row, sectors,
   enterprise readiness, and a dark closing card. Questions live on /faq. Server
   component: only the interactive sections ship JavaScript. */

export default function Home() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
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
      <main id="main">
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
