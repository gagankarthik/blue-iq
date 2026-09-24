import ContactClient from "./ContactClient";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book a Demo | Contact Sales",
  description:
    "Book a demo of Sonar on your own documents, ask about pricing, or scope a custom document AI build with the Blue-IQ team.",
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd("Contact", "/contact")) }} />
      <ContactClient />
    </>
  );
}
