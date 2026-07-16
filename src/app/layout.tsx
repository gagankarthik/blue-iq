import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

/* One neutral geometric grotesque across the whole site.

   Was Space Grotesk, and it was the wrong face for this. Space Grotesk is a
   *display* grotesque with deliberately mannered letterforms — the splayed t,
   the hooked y, the flicked r — and those quirks get louder the larger you set
   it. At the 5rem the hero runs at, the type was doing the talking instead of
   the words. Geist is the same register as the reference's Roobert: geometric,
   quiet, and built to hold at display size with tight tracking. */
const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const TITLE = "Blue-IQ | The Document Intelligence Platform";
const DESC =
  "The document intelligence platform. Blue-IQ's Sonar engine reads any document and scores its confidence; Capture turns it into structured, trusted data, with Spend and Govern for invoices and contracts, packaged as the Campus and Workforce editions. SOC 2, HIPAA and GDPR aligned.";

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
    "candidate data extraction", "credential parsing", "confidence scoring", "spend intelligence",
    "entitlement reconciliation", "invoice reconciliation", "contract compliance", "SAM license reconciliation",
    "enterprise document automation", "legacy parser migration", "document AI integrations", "schema-validated JSON",
    "SOC 2", "HIPAA", "GDPR", "Blue-IQ Capture", "Blue-IQ Spend", "Blue-IQ Govern", "Sonar engine",
    "Campus edition", "Workforce edition",
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
    /* og:image comes from app/opengraph-image.tsx (a real 1200×630 raster) */
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    /* twitter:image also comes from app/opengraph-image.tsx */
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
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Capture, Spend and Govern via scoped demo; Campus and Workforce editions and custom solutions scoped on request" },
      featureList: [
        "Any document into structured, confidence-scored data (Capture)",
        "Spend and entitlement reconciliation across invoices, POs and contracts (Spend)",
        "Contract and compliance intelligence against your own playbook (Govern)",
        "Campus and Workforce editions packaging Capture, Spend and Govern by industry",
        "Enterprise legacy-parser migrations and integrations",
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
        className={`${sans.variable} ${geistMono.variable} antialiased`}
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
