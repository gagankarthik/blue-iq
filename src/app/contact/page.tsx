import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Book an Enterprise Document AI Demo",
  description:
    "Talk to Blue-IQ about document AI for your resumes, contracts, or invoices. Book a walkthrough on your own files or scope a custom solution with our team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Blue-IQ",
    description: "Book a walkthrough on your own resumes or contracts, or scope a custom solution with our team.",
    url: "https://blue-iq.com/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactClient />;
}
