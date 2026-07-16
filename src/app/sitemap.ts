import type { MetadataRoute } from "next";

/* Static sitemap for the marketing site. metadataBase in layout.tsx sets the
   host; here we enumerate the real, indexable routes with sensible priorities.
   The login destinations live on other subdomains and are intentionally out. */
const BASE = "https://blue-iq.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/products", priority: 0.9, freq: "monthly" },
    { path: "/solutions", priority: 0.8, freq: "monthly" },
    { path: "/resources", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
