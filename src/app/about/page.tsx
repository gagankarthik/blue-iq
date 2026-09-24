import AboutClient from "./AboutClient";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Blue-IQ: The Company Behind Sonar AI",
  description:
    "Blue-IQ builds the AI that reads business documents. Sonar scores every field it extracts and flags what it can't read, instead of guessing.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd("About", "/about")) }} />
      <AboutClient />
    </>
  );
}
