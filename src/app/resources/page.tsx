import ResourcesClient from "./ResourcesClient";
import { pageMetadata, breadcrumbLd, webPageLd, ldScript } from "@/lib/seo";

const TITLE = "Developer Guide: Sonar API and Confidence Scores";
const DESC =
  "Connect Sonar over REST and signed webhooks, send PDFs, Word files, scans and phone photos, and route every extracted field on its own confidence score.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/resources",
  keywords: ["document extraction API", "OCR API", "confidence score API", "schema-validated JSON", "signed webhooks", "Sonar API"],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(
          webPageLd({ type: "TechArticle", name: TITLE, description: DESC, path: "/resources" }),
          breadcrumbLd("Resources", "/resources")
        )}
      />
      <ResourcesClient />
    </>
  );
}
