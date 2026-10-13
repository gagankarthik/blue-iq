import AboutClient from "./AboutClient";
import { pageMetadata, breadcrumbLd, webPageLd, ldScript } from "@/lib/seo";

const TITLE = "About Us: The Document AI Company";
const DESC =
  "Blue-IQ builds the products that end document re-typing. Every one runs on Sonar, the AI that scores every field it extracts and flags what it cannot read.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: "/about", keywords: ["Blue-IQ", "Sonar AI", "document AI company"] });

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(webPageLd({ type: "AboutPage", name: TITLE, description: DESC, path: "/about" }), breadcrumbLd("About", "/about"))}
      />
      <AboutClient />
    </>
  );
}
