import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Enterprise Document AI Company",
  description:
    "Blue-IQ builds enterprise document AI on the Sonar engine, the intelligence core behind ParsingLab, Govern, and the custom platforms we ship for regulated teams.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Blue-IQ",
    description: "The company and the Sonar engine behind ParsingLab, Govern, and our custom enterprise work.",
    url: "https://blue-iq.com/about",
    type: "website",
  },
};

export default function Page() {
  return <AboutClient />;
}
