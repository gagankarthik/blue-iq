import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products — software built by Blue-IQ",
  description:
    "ParsingLab and Govern are production products built by Blue-IQ on our Sonar engine. See what they do, then talk to us about a custom product for your own workflow.",
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
