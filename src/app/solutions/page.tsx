import SolutionsClient from "./SolutionsClient";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Document AI Solutions by Industry",
  description:
    "Document AI for IT, education, staffing, healthcare credentialing, legal and procurement teams, plus custom builds, parser migrations and integrations.",
  path: "/solutions",
});

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd("Solutions", "/solutions")) }} />
      <SolutionsClient />
    </>
  );
}
