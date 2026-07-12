import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "API, Formats & Security",
  description:
    "How to integrate the Blue-IQ document AI platform: schema-validated JSON over a documented REST API, signed webhooks, native connectors, OCR for scans and photos, a confidence score on every field, and handling aligned to SOC 2, HIPAA and GDPR.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Blue-IQ Resources",
    description:
      "The API, the formats Sonar reads, how it scores and flags every field, and how your documents are handled.",
    url: "https://blue-iq.com/resources",
    type: "website",
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
