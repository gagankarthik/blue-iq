import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "HIRE — AI résumé screening & candidate scoring",
  description:
    "Blue-IQ HIRE parses every résumé, verifies credentials, and scores candidates against the role — a confirmed shortlist before the work begins. Native CRM/ATS sync.",
  alternates: { canonical: "/hire" },
  openGraph: {
    title: "Blue-IQ HIRE — AI résumé screening & candidate scoring",
    description: "Parse, verify, and score every résumé. A confirmed shortlist before the work begins.",
    url: "https://blue-iq.com/hire", type: "website",
  },
};

export default function Page() {
  return <ProductPage id="hire" />;
}
