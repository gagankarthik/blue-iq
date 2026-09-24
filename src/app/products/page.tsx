import ProductsClient from "./ProductsClient";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Document AI Products: Capture, Spend and Govern",
  description:
    "Extract data from any document with Capture, reconcile invoices with Spend and review contracts with Govern. Industry editions included, all powered by Sonar AI.",
  path: "/products",
});

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd("Products", "/products")) }} />
      <ProductsClient />
    </>
  );
}
