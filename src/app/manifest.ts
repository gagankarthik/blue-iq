import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Blue-IQ — Document AI Platform",
    short_name: "Blue-IQ",
    description: "Document AI products powered by Sonar, the AI that scores every field and flags what it cannot read.",
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
