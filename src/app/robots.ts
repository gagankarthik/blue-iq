import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://blue-iq.ai/sitemap.xml",
    host: "https://blue-iq.ai",
  };
}
