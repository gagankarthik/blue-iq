import type { Metadata } from "next";
import { Figtree, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "@/app/globals.css";

/* Humanist sans for body — warm, legible, professional (renders accents cleanly) */
const bodySans = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Bold grotesque display — editorial, distinctive, agency-grade */
const display = Bricolage_Grotesque({
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

const TITLE = "Blue-IQ — enterprise software, engineered end to end";
const DESC =
  "Blue-IQ is an enterprise software company. We build our own products, including ParsingLab and Govern, and design custom platforms and migrations for clients, all on our Sonar engine. SOC 2, HIPAA & GDPR aligned.";

export const metadata: Metadata = {
  metadataBase: new URL("https://blue-iq.com"),
  title: {
    default: TITLE,
    template: "%s · Blue-IQ",
  },
  description: DESC,
  applicationName: "Blue-IQ",
  keywords: [
    "enterprise software company", "custom software development", "document intelligence",
    "resume parsing API", "contract review AI", "clause extraction", "legacy system migration",
    "enterprise integrations", "schema-validated JSON", "SOC 2", "HIPAA", "GDPR",
    "ParsingLab", "Blue-IQ Govern",
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
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: "Blue-IQ — enterprise software company" }],
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
      "@id": "https://blue-iq.com/#org",
      name: "Blue-IQ",
      url: "https://blue-iq.com",
      logo: "https://blue-iq.com/logo.svg",
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
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "ParsingLab API and Govern via scoped demo; custom solutions scoped on request" },
      featureList: [
        "Resume parsing to schema-validated JSON with confidence scoring (ParsingLab)",
        "Contract clause extraction and playbook risk scoring (Govern)",
        "Custom document and data product development",
        "Enterprise legacy-system migrations and integrations",
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
        className={`${bodySans.variable} ${geistMono.variable} ${display.variable} antialiased`}
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
