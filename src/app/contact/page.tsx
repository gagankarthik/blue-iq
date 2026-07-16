import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Talk to Blue-IQ",
  description:
    "Tell us what you are trying to read. Send a resume, a contract, an invoice or a photographed scan, and we will show you the fields Sonar returns, the confidence scores, and what it flags. Pricing is scoped to volume and the products in play.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Blue-IQ",
    description:
      "Send us the document you assume will break it. Ask about pricing, a walkthrough on your own files, or a custom build.",
    url: "https://blue-iq.ai/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactClient />;
}
