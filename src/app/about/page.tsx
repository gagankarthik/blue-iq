import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — the company behind Blue-IQ",
  description:
    "Blue-IQ is an enterprise software company built around Sonar, our AI engine for reading documents and data. Learn how we work and why we started.",
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
