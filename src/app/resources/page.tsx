import ResourcesClient from "./ResourcesClient";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Developer Resources: API, Formats and Confidence Scores",
  description:
    "Connect Sonar over REST and signed webhooks, send PDFs, Word files, scans and phone photos, and build on per-field confidence scores.",
  path: "/resources",
});

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd("Resources", "/resources")) }} />
      <ResourcesClient />
    </>
  );
}
