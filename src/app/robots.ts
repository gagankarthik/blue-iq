import type { MetadataRoute } from "next";

/* Everything public is crawlable; the API and Next internals are not.
   AI search crawlers are welcome too — /llms.txt gives them a summary. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] }],
    sitemap: "https://blue-iq.ai/sitemap.xml",
    host: "https://blue-iq.ai",
  };
}
