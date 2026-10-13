import ProductsClient from "./ProductsClient";
import { pageMetadata, breadcrumbLd, webPageLd, productsLd, ldScript } from "@/lib/seo";

const TITLE = "Document AI Products: Capture, Spend and Govern";
const DESC =
  "Blue-IQ's document AI products: Capture for document data, Spend for invoice control and Govern for contracts, plus Campus and Workforce editions.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/products",
  keywords: ["Blue-IQ products", "document AI products", "Blue-IQ Capture", "Blue-IQ Spend", "Blue-IQ Govern", "Sonar AI"],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(
          webPageLd({ type: "CollectionPage", name: TITLE, description: DESC, path: "/products" }),
          breadcrumbLd("Products", "/products"),
          productsLd()
        )}
      />
      <ProductsClient />
    </>
  );
}
