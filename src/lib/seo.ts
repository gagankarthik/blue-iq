import type { Metadata } from "next";

/* ────────────────────────────────────────────────────────────────
   SEO helpers. One place builds every page's metadata and its breadcrumb
   structured data, so titles, canonicals and Open Graph stay consistent.
   The site-wide Organization / WebSite / SoftwareApplication graph lives in
   app/layout.tsx; the FAQPage graph lives on the home page.
   ──────────────────────────────────────────────────────────────── */

export const SITE = "https://blue-iq.ai";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · Blue-IQ`, description, url: `${SITE}${path}`, type: "website", siteName: "Blue-IQ" },
    twitter: { card: "summary_large_image", title: `${title} · Blue-IQ`, description },
  };
}

export function breadcrumbLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
    ],
  };
}
