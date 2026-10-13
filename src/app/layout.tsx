import type { Metadata, Viewport } from "next";
import { Newsreader, Figtree, IBM_Plex_Mono } from "next/font/google";
import "@/app/globals.css";

/* Three faces, each with one job:
   · Newsreader — headlines: a soft, low-contrast display serif set light and
     tight (the role Season Mix plays on sarvam.ai)
   · Figtree — every word of UI and body copy: a clean geometric sans
   · IBM Plex Mono — data only (scores, values, code)
   The older CSS variable names are kept so nothing downstream changes. */
const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const sans = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const geistMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const TITLE = "Blue-IQ | Document AI Platform Powered by Sonar";
const DESC =
  "Blue-IQ is a document AI platform. Extract data, reconcile invoices and review contracts with Sonar, the AI that scores every field and flags what it can't read.";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blue-iq.ai"),
  title: {
    default: TITLE,
    template: "%s · Blue-IQ",
  },
  description: DESC,
  applicationName: "Blue-IQ",
  keywords: [
    "document AI",
    "enterprise document AI",
    "intelligent document processing",
    "IDP software",
    "document data extraction",
    "AI contract review software",
    "contract intelligence",
    "clause extraction",
    "candidate data extraction",
    "credential parsing",
    "confidence scoring",
    "spend intelligence",
    "entitlement reconciliation",
    "invoice reconciliation",
    "contract compliance",
    "SAM license reconciliation",
    "enterprise document automation",
    "legacy parser migration",
    "document AI integrations",
    "schema-validated JSON",
    "SOC 2",
    "HIPAA",
    "GDPR",
    "Blue-IQ Capture",
    "Blue-IQ Spend",
    "Blue-IQ Govern",
    "Sonar AI",
    "Sonar engine",
    "document AI platform",
    "Campus edition",
    "Workforce edition",
  ],
  authors: [{ name: "Blue-IQ" }],
  creator: "Blue-IQ",
  publisher: "Blue-IQ",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
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
  /* Search Console / Bing Webmaster verification: set these env vars at deploy */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
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
      "@id": "https://blue-iq.ai/#platform",
      name: "Blue-IQ",
      url: "https://blue-iq.ai",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESC,
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
      <body className={`${display.variable} ${sans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-sm"
          style={{ background: "#0F172A" }}
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
