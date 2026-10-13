import type { Metadata } from "next";
import { INDUSTRIES } from "@/lib/industries";

/* ────────────────────────────────────────────────────────────────
   SEO helpers. One place builds every page's metadata and structured data,
   so titles, canonicals, Open Graph and JSON-LD stay consistent.

   · pageMetadata  title (≤ 60 chars before the template), description
                   (≤ 160), canonical, OG/Twitter with the shared image
   · *Ld builders  schema.org graphs. Every @id hangs off the site URL so
                   Google can join them into one entity graph. Claims stay
                   inside what the company already says: no ratings, no
                   prices, no certifications it does not hold.
   ──────────────────────────────────────────────────────────────── */

export const SITE = "https://blue-iq.ai";
export const ORG_ID = `${SITE}/#org`;
export const SITE_ID = `${SITE}/#website`;
export const PLATFORM_ID = `${SITE}/#platform`;

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Blue-IQ, the document AI platform powered by Sonar" };

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | Blue-IQ`,
      description,
      url: `${SITE}${path}`,
      type: "website",
      siteName: "Blue-IQ",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: `${title} | Blue-IQ`, description, images: [OG_IMAGE.url] },
  };
}

type Crumb = [name: string, path: string];

export function breadcrumbLd(...trail: Crumb[] | [string, string]) {
  const items: Crumb[] = typeof trail[0] === "string" ? [[trail[0] as string, trail[1] as string]] : (trail as Crumb[]);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      ...items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 2, name, item: `${SITE}${path}` })),
    ],
  };
}

/* the page itself, tied to the site and the breadcrumb */
export function webPageLd({ type = "WebPage", name, description, path }: { type?: string; name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE}${path}#webpage`,
    url: `${SITE}${path}`,
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

const PRODUCTS = [
  {
    id: "capture",
    name: "Blue-IQ Capture",
    url: "https://www.parsinglab.blue-iq.ai/",
    description: "Document data extraction for any file: PDFs, Word documents, scans and phone photos, returned as structured, confidence-scored data.",
  },
  {
    id: "spend",
    name: "Blue-IQ Spend",
    url: `${SITE}/products#spend`,
    description: "Invoice reconciliation against contracts, purchase orders and entitlements, with overbilling flagged as it is billed.",
  },
  {
    id: "govern",
    name: "Blue-IQ Govern",
    url: "https://govern.blue-iq.ai/",
    description: "AI contract review against your own playbook, with every deviating clause risk-rated.",
  },
];

export function productsLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blue-IQ products",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${SITE}/#${p.id}`,
        name: p.name,
        url: p.url,
        description: p.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": PLATFORM_ID },
      },
    })),
  };
}

const SERVICES = [
  {
    id: "custom",
    name: "Custom document AI development",
    description: "Document AI apps built on Sonar around your real documents, shipped as an API, an app, or both.",
  },
  {
    id: "migrations",
    name: "Legacy document parser migration",
    description: "Replace a legacy parser without losing history: every field mapped, archives re-read, run side by side before cutover.",
  },
  {
    id: "integrations",
    name: "Document AI integrations",
    description: "Structured data delivered to your ATS, ERP or CLM over REST, signed webhooks and native connectors.",
  },
];

export function solutionsLd() {
  const sectors = INDUSTRIES.map((x) => ({
    "@type": "Service",
    "@id": `${SITE}/solutions/${x.id}#service`,
    name: `Document AI for ${x.name}`,
    serviceType: "Intelligent document processing",
    description: `${x.h} ${x.d}`,
    provider: { "@id": ORG_ID },
    url: `${SITE}/solutions/${x.id}`,
  }));
  const services = SERVICES.map((s) => ({
    "@type": "Service",
    "@id": `${SITE}/solutions#${s.id}`,
    name: s.name,
    description: s.description,
    provider: { "@id": ORG_ID },
    url: `${SITE}/solutions#${s.id}`,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blue-IQ solutions",
    itemListElement: [...sectors, ...services].map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
  };
}

export function faqLd(faqs: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

/* render any number of graphs as one script tag */
export function ldScript(...graphs: object[]) {
  return { __html: JSON.stringify(graphs.length === 1 ? graphs[0] : graphs).replace(/</g, "\\u003c") };
}
