"use client";

import { PaperTexture } from "@paper-design/shaders-react";

/* ────────────────────────────────────────────────────────────────
   A photograph run through the paper shader.

   This is the one decorative device on the page that actually argues for the
   product: the image arrives creased, fibrous, and dropped-on — it looks like
   a document that has been handled, which is exactly the input Sonar reads.
   It is not a texture for the sake of texture.

   `width`/`height` are inline CSS on the shader's own div, so "100%" makes it
   fill the panel; `fit="cover"` crops rather than letterboxes.

   The <img> underneath is not a duplicate — it is the fallback. PaperTexture
   is WebGL, and WebGL is not guaranteed: a blocked context, a software-render
   blocklist, or a lost context all end with an empty canvas. The photo stays
   under it so the panel degrades to a plain image instead of a black box. The
   shader paints over it opaquely wherever it works.

   The image URL is sampled as a WebGL texture, which means it is subject to
   CORS — a cross-origin image without `Access-Control-Allow-Origin` taints the
   canvas and the draw fails. images.unsplash.com sends `*`; verified before
   these were chosen. Any new host must be checked the same way.
   ──────────────────────────────────────────────────────────────── */

export default function PaperImage({ src, seed = 5.8 }: { src: string; seed?: number }) {
  return (
    <span aria-hidden className="absolute inset-0 overflow-hidden">
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <PaperTexture
        width="100%"
        height="100%"
        image={src}
        colorBack="#ffffff"
        colorFront="#9fadbc"
        contrast={0.3}
        roughness={0.4}
        fiber={0.3}
        fiberSize={0.2}
        crumples={0.3}
        crumpleSize={0.35}
        folds={0.65}
        foldCount={5}
        drops={0.2}
        fade={0}
        seed={seed}
        /* scale is a zoom on the image inside the canvas, NOT a fit mode. The
           reference snippet's 0.6 shrinks the photo to 60% and leaves blank
           paper around it — fine in a 1280x720 demo box, but in a tall panel it
           renders the picture as a small square floating in grey. 1 fills it. */
        scale={1}
        fit="cover"
        style={{ position: "absolute", inset: 0 }}
      />
    </span>
  );
}
