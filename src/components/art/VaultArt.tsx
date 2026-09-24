"use client";

import { memo } from "react";
import { useReducedMotion } from "framer-motion";
import { makeIso, Box, Plane, IsoDefs, TONES } from "@/components/art/iso";

/* The security illustration: documents sealed inside a vault block that sits
   on its own isolated pad, a keyhole on its face, a thin boundary line
   around the pad — a private workspace, drawn. Same iso kit as everything
   else on the page, set on the navy band. */
function VaultArt() {
  const reduce = useReducedMotion();
  const iso = makeIso(250, 70, 40);
  const [kx, ky] = iso.p(4.6, 3.3, 1.35);
  return (
    <svg viewBox="40 -40 420 356" className="w-full h-auto block" role="img" aria-label="Illustration: documents sealed in a vault on an isolated workspace">
      <IsoDefs />
      {/* isolation boundary */}
      <Plane iso={iso} x={0.2} y={0.2} w={5.6} d={5.6} fill="none" stroke="#6AA3FF" dash="6 6" opacity={0.55} />
      <Box iso={iso} x={0.8} y={0.8} z={-0.25} w={4.4} d={4.4} h={0.25} tone={{ top: "#16275A", left: "#101C45", right: "#0A1330" }} />
      {/* pages waiting to go in */}
      <g className={reduce ? "" : "bq-float"}>
        <Box iso={iso} x={1.1} y={1.2} z={2.9} w={1.3} d={1.7} h={0.06} tone={TONES.paper} />
        <Box iso={iso} x={1.25} y={1.05} z={3.15} w={1.3} d={1.7} h={0.06} tone={TONES.paper} />
      </g>
      {/* the vault */}
      <Box iso={iso} x={1.6} y={1.6} w={3} d={3} h={2.4} tone={TONES.blue} />
      <Box iso={iso} x={1.6} y={1.6} z={2.4} w={3} d={3} h={0.12} tone={TONES.sky} />
      {/* door seam on the right face */}
      <polygon
        points={iso.pts([
          [4.6, 2.0, 2.05],
          [4.6, 4.2, 2.05],
          [4.6, 4.2, 0.35],
          [4.6, 2.0, 0.35],
        ])}
        fill="none"
        stroke="#8FB6FF"
        strokeWidth={1.2}
      />
      {/* keyhole */}
      <circle cx={kx} cy={ky} r={9} fill="#0A1330" />
      <path d={`M${kx - 3} ${ky + 4} l-2 12 h10 l-2 -12z`} fill="#0A1330" />
      <circle cx={kx} cy={ky} r={16} fill="none" stroke="#8FE0FF" strokeWidth={1.4}>
        {!reduce && <animate attributeName="opacity" values="0.9;0.25;0.9" dur="3s" repeatCount="indefinite" />}
      </circle>
    </svg>
  );
}

export default memo(VaultArt);
