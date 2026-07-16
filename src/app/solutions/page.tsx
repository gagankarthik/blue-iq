import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Custom Development, Migrations & Integrations",
  description:
    "Custom document builds, legacy parser migrations, and integrations into the systems you already run — engineered on the Blue-IQ Sonar engine, for healthcare staffing, legal, and procurement.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Blue-IQ Solutions",
    description:
      "Custom builds, enterprise migrations, and integrations, on the same Sonar engine that runs Capture, Spend and Govern.",
    url: "https://blue-iq.ai/solutions",
    type: "website",
  },
};

export default function Page() {
  return <SolutionsClient />;
}
