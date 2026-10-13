import SolutionsClient from "./SolutionsClient";
import { pageMetadata, breadcrumbLd, webPageLd, solutionsLd, ldScript } from "@/lib/seo";

const TITLE = "Document AI Solutions by Industry";
const DESC =
  "Document AI for IT, education, staffing, healthcare credentialing, legal and procurement teams, plus custom builds, legacy parser migrations and integrations.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/solutions",
  keywords: [
    "document AI for healthcare staffing",
    "resume parsing for staffing",
    "transcript processing",
    "vendor contract management",
    "invoice automation",
    "legacy parser migration",
    "document AI integrations",
  ],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(
          webPageLd({ type: "CollectionPage", name: TITLE, description: DESC, path: "/solutions" }),
          breadcrumbLd("Solutions", "/solutions"),
          solutionsLd()
        )}
      />
      <SolutionsClient />
    </>
  );
}
