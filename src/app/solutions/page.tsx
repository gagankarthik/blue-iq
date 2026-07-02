import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Custom Document AI & Enterprise Automation",
  description:
    "Custom document AI, legacy parser migrations, and enterprise integrations, engineered on the Blue-IQ Sonar engine and delivered for your document-heavy workflows.",
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
