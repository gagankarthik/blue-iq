import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Document Intelligence Company",
  description:
    "Blue-IQ builds software that reads the documents a business runs on. The Sonar engine returns every field with a confidence score, and flags what it cannot read instead of guessing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Blue-IQ",
    description:
      "The company, and the Sonar engine behind Capture, Spend, Govern and the editions built on them.",
    url: "https://blue-iq.ai/about",
    type: "website",
  },
};

export default function Page() {
  return <AboutClient />;
}
