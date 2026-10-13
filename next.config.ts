import type { NextConfig } from "next";

/* ────────────────────────────────────────────────────────────────
   Security headers, on every response.

   CSP: everything first-party, plus Cloudflare Turnstile (script + frame +
   verify) for the contact form. 'unsafe-inline' for scripts is needed by
   Next's inline bootstrap and our JSON-LD; 'unsafe-eval' only in dev for
   React Refresh. No third-party trackers are loaded, so nothing else is
   allowed. frame-ancestors 'none' stops clickjacking.
   ──────────────────────────────────────────────────────────────── */

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' https://challenges.cloudflare.com${isDev ? " ws: wss:" : ""}`,
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  /* first-visit speed: Tailwind CSS is small, so ship it inside the HTML
     instead of a render-blocking stylesheet request */
  experimental: { inlineCss: true },
  /* lets the dev server hydrate when opened as 127.0.0.1 (screenshot tooling) */
  allowedDevOrigins: ["127.0.0.1"],
  /* product detail pages were retired: the site speaks for the company */
  async redirects() {
    return [{ source: "/products/:slug", destination: "/products", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
