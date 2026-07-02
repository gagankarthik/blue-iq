import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Document AI Products: ParsingLab & Govern",
  description:
    "Explore Blue-IQ document AI products: ParsingLab for healthcare resume parsing and Govern for AI contract review, both built on the Sonar engine. SOC 2, HIPAA, GDPR.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Blue-IQ Products",
    description: "ParsingLab and Govern, two production products built on the Sonar engine, plus custom products we build for clients.",
    url: "https://blue-iq.com/products",
    type: "website",
  },
};

export default function Page() {
  return <ProductsClient />;
}
