import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products: Capture, Spend, Govern & the editions",
  description:
    "The Blue-IQ platform on one engine: Capture turns any document into structured, confidence-scored data; Spend and Govern are pre-built applications for invoices and contracts; Campus and Workforce package all three for your industry. Handling aligned to SOC 2, HIPAA and GDPR.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Blue-IQ Products",
    description: "Capture, the foundation; Spend and Govern, the applications; Campus and Workforce, the editions — all running on the Sonar engine.",
    url: "https://blue-iq.ai/products",
    type: "website",
  },
};

export default function Page() {
  return <ProductsClient />;
}
