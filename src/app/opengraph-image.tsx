import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* A real 1200×630 raster for link previews. An SVG logo does not render as an
   OG image on most platforms; this does: the night canvas, the outlined
   blue-iq lockup, and the one-line story. Next applies it site-wide as
   og:image and twitter:image unless a page overrides it. */

export const alt = "Blue-IQ, the document AI company. Every product runs on Sonar.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logo = readFileSync(join(process.cwd(), "public/brand/logo-on-dark.svg")).toString("base64");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#0F172A",
        color: "#FFFFFF",
        fontFamily: "sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/svg+xml;base64,${logo}`} width={230} height={60} alt="" />

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 940 }}>
          We build the products that read your documents.
        </div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.8)", lineHeight: 1.3, maxWidth: 1040 }}>
          Capture, Spend and Govern. Every one runs on Sonar, our AI.
        </div>
      </div>

      <div style={{ display: "flex", height: 8, width: 120, borderRadius: 4, background: "#2F5FE0" }} />
    </div>,
    { ...size }
  );
}
