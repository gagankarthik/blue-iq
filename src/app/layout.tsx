import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Instrument_Serif } from "next/font/google";
import "@/app/globals.css";

/* Single modern geometric grotesque across the whole site. Rendered behind the
   "Phonic" family name so a self-hosted Phonic swaps in automatically if added. */
const phonic = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Used for exactly one thing: the italic word inside a headline. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
});

const TITLE = "Blue-IQ | Enterprise Document AI Platform";
const DESC =
  "Enterprise document AI that turns resumes, contracts, and invoices into structured, confidence-scored data. Powered by the Blue-IQ Sonar engine. SOC 2, HIPAA and GDPR aligned.";

export const metadata: Metadata = {
  metadataBase: new URL("https://blue-iq.ai"),
  title: {
    default: TITLE,
    template: "%s · Blue-IQ",
  },
  description: DESC,
  applicationName: "Blue-IQ",
  keywords: [
    "document AI", "enterprise document AI", "intelligent document processing", "IDP software",
    "document data extraction", "AI contract review software", "contract intelligence", "clause extraction",
    "resume parsing API", "healthcare resume parser", "candidate data extraction", "confidence scoring",
    "enterprise document automation", "legacy parser migration", "document AI integrations", "schema-validated JSON",
    "SOC 2", "HIPAA", "GDPR", "ParsingLab", "Blue-IQ Govern", "Sonar engine",
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
    url: "https://blue-iq.ai",
    siteName: "Blue-IQ",
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: "Blue-IQ, enterprise software company" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/logo.svg"],
  },
  category: "technology",
};

/* site-wide structured data: Organization + WebSite + the platform as SoftwareApplication */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://blue-iq.ai/#org",
      name: "Blue-IQ",
      url: "https://blue-iq.ai",
      logo: "https://blue-iq.ai/logo.svg",
      description: DESC,
      sameAs: ["https://www.linkedin.com/company/blue-iq"],
    },
    {
      "@type": "WebSite",
      "@id": "https://blue-iq.ai/#website",
      url: "https://blue-iq.ai",
      name: "Blue-IQ",
      publisher: { "@id": "https://blue-iq.ai/#org" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Blue-IQ",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESC,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "ParsingLab API and Govern via scoped demo; custom solutions scoped on request" },
      featureList: [
        "Resume parsing to schema-validated JSON with confidence scoring (ParsingLab)",
        "Contract clause extraction and playbook risk scoring (Govern)",
        "Custom document and data product development",
        "Enterprise legacy-system migrations and integrations",
      ],
      publisher: { "@id": "https://blue-iq.ai/#org" },
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
        className={`${phonic.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
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
