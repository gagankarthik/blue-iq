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
      "The company, and the Sonar engine behind ParsingLab, Govern and the platforms we build to order.",
    url: "https://blue-iq.com/about",
    type: "website",
  },
};

export default function Page() {
  return <AboutClient />;
}
