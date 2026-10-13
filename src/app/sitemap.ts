import type { MetadataRoute } from "next";

/* The indexable routes, with the date each page's content last really
   changed (not the build time, which would tell crawlers everything changed
   on every deploy). Update a date when you change that page's content.
   Product apps on subdomains have their own sitemaps. */
const BASE = "https://blue-iq.ai";

export const ROUTES: { path: string; updated: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", updated: "2026-10-13", priority: 1.0, freq: "weekly" },
  { path: "/platform", updated: "2026-10-13", priority: 0.9, freq: "monthly" },
  { path: "/products", updated: "2026-10-13", priority: 0.9, freq: "monthly" },
  { path: "/solutions", updated: "2026-10-13", priority: 0.9, freq: "monthly" },
  ...["it", "education", "workforce", "healthcare", "legal", "procurement"].map((id) => ({
    path: `/solutions/${id}`,
    updated: "2026-10-13",
    priority: 0.7,
    freq: "monthly" as const,
  })),
  { path: "/trust", updated: "2026-10-13", priority: 0.6, freq: "monthly" },
  { path: "/faq", updated: "2026-10-13", priority: 0.6, freq: "monthly" },
  { path: "/resources", updated: "2026-10-13", priority: 0.7, freq: "monthly" },
  { path: "/about", updated: "2026-10-13", priority: 0.6, freq: "monthly" },
  { path: "/contact", updated: "2026-10-13", priority: 0.7, freq: "yearly" },
  { path: "/privacy", updated: "2026-07-11", priority: 0.3, freq: "yearly" },
  { path: "/terms", updated: "2026-07-11", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, updated, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(updated),
    changeFrequency: freq,
    priority,
  }));
}
