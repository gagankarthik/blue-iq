import { ImageResponse } from "next/og";

/* A real 1200×630 raster for link previews. An SVG logo does not render as an
   OG image on most platforms; this does, and it stays on-brand: the deep-blue
   canvas, the wordmark, and the one-line story. Next applies it site-wide as
   og:image and twitter:image unless a page overrides it. */

export const alt = "Blue-IQ, the document AI platform powered by Sonar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#08102B",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: 34, fontWeight: 600, letterSpacing: "-0.01em" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#297AFF", display: "flex" }} />
          Blue-IQ
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 900 }}>
            Read every document. Trust every field.
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.78)", lineHeight: 1.3, maxWidth: 860 }}>
            Document AI for extraction, spend and contracts. Powered by Sonar.
          </div>
        </div>

        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.62)", letterSpacing: "0.02em" }}>
          SOC 2 · HIPAA · GDPR aligned
        </div>
      </div>
    ),
    { ...size }
  );
}
