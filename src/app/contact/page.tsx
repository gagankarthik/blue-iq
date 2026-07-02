import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — book a Blue-IQ walkthrough",
  description:
    "Talk to the Blue-IQ team about resume parsing, contract intelligence, or a custom document-AI solution. We'll run a walkthrough on your own documents and reply within a business day.",
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
