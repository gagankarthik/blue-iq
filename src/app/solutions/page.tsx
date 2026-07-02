import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Solutions — custom enterprise software from Blue-IQ",
  description:
    "Blue-IQ designs and builds custom document and data products for the enterprise, migrates teams off legacy systems, and integrates our Sonar engine into your existing stack.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Blue-IQ Solutions",
    description: "Custom enterprise software, legacy migrations, and integrations, built on our Sonar engine.",
    url: "https://blue-iq.com/solutions",
    type: "website",
  },
};

export default function Page() {
  return <SolutionsClient />;
}
