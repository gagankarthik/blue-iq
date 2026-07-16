import { ImageResponse } from "next/og";

/* A real 1200×630 raster for link previews. An SVG logo does not render as an
   OG image on most platforms; this does, and it stays on-brand: the deep-blue
   canvas, the wordmark, and the one-line story. Next applies it site-wide as
   og:image and twitter:image unless a page overrides it. */

export const alt = "Blue-IQ — the document intelligence platform";
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
          background: "linear-gradient(135deg, #002181 0%, #0B0B0F 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: 34, fontWeight: 600, letterSpacing: "-0.01em" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#2C49D6", display: "flex" }} />
          Blue-IQ
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 900 }}>
            The document intelligence platform.
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.72)", lineHeight: 1.3, maxWidth: 860 }}>
            Sonar reads any document and scores its confidence. Capture · Spend · Govern.
          </div>
        </div>

        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
          SOC 2 · HIPAA · GDPR aligned
        </div>
      </div>
    ),
    { ...size }
  );
}
