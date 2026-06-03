import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const TITLE = "Blue-IQ — AI for hiring, contract governance & vendor spend";
const DESC =
  "Blue-IQ is the AI intelligence layer for the contingent workforce. Sonar parses résumés, runs a 10-dimension SOW contract audit, and reconciles vendor invoices — across HIRE, GOVERN, and SPEND. SOC 2 Type II.";

export const metadata: Metadata = {
  metadataBase: new URL("https://blue-iq.com"),
  title: {
    default: TITLE,
    template: "%s · Blue-IQ",
  },
  description: DESC,
  applicationName: "Blue-IQ",
  keywords: [
    "AI contract review", "SOW audit software", "vendor spend management",
    "contingent workforce platform", "résumé screening AI", "procurement intelligence",
    "VMS alternative", "ATS alternative", "contract risk scoring", "invoice reconciliation",
    "SOC 2 Type II", "enterprise procurement software", "Sonar AI",
  ],
  authors: [{ name: "Blue-IQ" }],
  creator: "Blue-IQ",
  publisher: "Blue-IQ",
  alternates: { canonical: "/" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://blue-iq.com",
    siteName: "Blue-IQ",
    images: [{ url: "/logo_large.webp", width: 1200, height: 630, alt: "Blue-IQ — the intelligence layer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/logo_large.webp"],
  },
  category: "technology",
};

/* site-wide structured data: Organization + WebSite + the platform as SoftwareApplication */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://blue-iq.com/#org",
      name: "Blue-IQ",
      url: "https://blue-iq.com",
      logo: "https://blue-iq.com/logo_large.webp",
      description: DESC,
      sameAs: ["https://www.linkedin.com/company/blue-iq"],
    },
    {
      "@type": "WebSite",
      "@id": "https://blue-iq.com/#website",
      url: "https://blue-iq.com",
      name: "Blue-IQ",
      publisher: { "@id": "https://blue-iq.com/#org" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Blue-IQ",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESC,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "GOVERN free trial; HIRE & SPEND via scoped pilot" },
      featureList: [
        "AI résumé parsing and candidate scoring",
        "10-dimension Statement of Work audit",
        "Clause extraction across 13 contract types",
        "Invoice-to-SOW reconciliation and spend leakage detection",
      ],
      publisher: { "@id": "https://blue-iq.com/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
