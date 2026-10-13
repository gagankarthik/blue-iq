import type { MetadataRoute } from "next";

/* Everything public is crawlable, including /_next (Google needs the CSS
   and JS to render pages); only the API is not.
   AI search crawlers are welcome too — /llms.txt gives them a summary. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://blue-iq.ai/sitemap.xml",
    host: "https://blue-iq.ai",
  };
}
