import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products: ParsingLab, Govern & custom builds",
  description:
    "The Blue-IQ suite on one engine: ParsingLab for resume and credential parsing, Govern for contract review against your own playbook, and custom products we build for a single team. Handling aligned to SOC 2, HIPAA and GDPR.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Blue-IQ Products",
    description: "ParsingLab, Govern, and the products we build when neither fits — all three running on the Sonar engine.",
    url: "https://blue-iq.com/products",
    type: "website",
  },
};

export default function Page() {
  return <ProductsClient />;
}
