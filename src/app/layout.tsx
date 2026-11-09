import type { Metadata, Viewport } from "next";
import { Figtree, IBM_Plex_Mono, Hanken_Grotesk } from "next/font/google";
import "@/app/globals.css";

/* Three faces, each with one job (2026-11):
   · Hanken Grotesk — every headline (the face the wordmark is drawn from)
   · Figtree — every word of UI and body copy
   · IBM Plex Mono — labels and data (scores, values, code)
   The older CSS variable names are kept so nothing downstream changes. */
/* Hanken Grotesk — the home page, nav and footer headlines (the face the
   wordmark is drawn from): a tight, confident grotesque */
const head = Hanken_Grotesk({
  variable: "--font-head",
  subsets: ["latin"],
  display: "swap",
});

const sans = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  /* variable font: one file covers every weight */
});

const geistMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: false /* data only, never above the fold */,
});

const TITLE = "Blue-IQ | Document AI for Contracts, Invoices and Records";
const DESC =
  "Blue-IQ builds document AI: extract data, reconcile invoices and review contracts with Sonar, the AI that scores every field and flags what it can't read.";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blue-iq.ai"),
  title: {
    default: TITLE,
    template: "%s | Blue-IQ",
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
      alternateName: ["BlueIQ", "Blue IQ"],
      url: "https://blue-iq.ai",
      logo: {
        "@type": "ImageObject",
        "@id": "https://blue-iq.ai/#logo",
        url: "https://blue-iq.ai/brand/icon-512.png",
        width: 512,
        height: 512,
        caption: "Blue-IQ",
      },
      image: { "@id": "https://blue-iq.ai/#logo" },
      description: DESC,
      brand: { "@type": "Brand", name: "Blue-IQ", logo: "https://blue-iq.ai/brand/logo.png" },
      contactPoint: { "@type": "ContactPoint", contactType: "sales", url: "https://blue-iq.ai/contact", availableLanguage: ["English"] },
      subOrganization: [
        { "@type": "Organization", name: "Blue-IQ Capture", url: "https://www.parsinglab.blue-iq.ai/" },
        { "@type": "Organization", name: "Blue-IQ Govern", url: "https://govern.blue-iq.ai/" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://blue-iq.ai/#website",
      url: "https://blue-iq.ai",
      name: "Blue-IQ",
      alternateName: "BlueIQ",
      inLanguage: "en",
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
      <body className={`${sans.variable} ${head.variable} ${geistMono.variable} antialiased`}>
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
