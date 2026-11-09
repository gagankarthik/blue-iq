"use client";

import { memo, useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────────
   The hero's background image, made of small pixel dots: a stack of three
   documents (header bar, lines of text, one form field) drawn as a halftone
   on the right of the hero. A Sonar ping sweeps out from the front page;
   where it passes, the dots it reads grow and turn cobalt, and the one
   field it is unsure of lights amber (the product's idea: it flags instead
   of guessing). Everything else stays a quiet ink halftone.

   Canvas, ~24fps, paused off screen or in a hidden tab. The document image
   is computed once per resize; each frame only adds the ping. Reduced
   motion draws one still frame. Phones (< 768px) draw nothing: the type
   spans the full width there. Isolated memo leaf: never re-renders.
   ──────────────────────────────────────────────────────────────── */

const CELL = 8; // grid pitch, px
const INK = "14,17,22";
const COBALT = "#1F4FE6";
const AMBER = "#F5B544";

type Cell = { x: number; y: number; m: number; flag: boolean; d: number };

/* the documents, in the field's own 0..1 space; front sheet last */
const SHEETS = [
  { u0: 0.06, u1: 0.62, v0: 0.04, v1: 0.82, dim: 0.45 },
  { u0: 0.2, u1: 0.78, v0: 0.11, v1: 0.9, dim: 0.7 },
  { u0: 0.34, u1: 0.94, v0: 0.18, v1: 0.98, dim: 1 },
];

/* one sheet's content at local (a, b) in 0..1: returns ink density */
function sheetInk(a: number, b: number, front: boolean): { m: number; flag: boolean } {
  if (a < 0.025 || a > 0.975 || b < 0.018 || b > 0.982) return { m: 0.75, flag: false }; // edge
  if (b > 0.06 && b < 0.1 && a > 0.08 && a < 0.46) return { m: 0.85, flag: false }; // title bar
  if (front && b > 0.6 && b < 0.69 && a > 0.08 && a < 0.62) {
    const edge = b < 0.612 || b > 0.678 || a < 0.092 || a > 0.608;
    return { m: edge ? 0.8 : 0.12, flag: true }; // the form field
  }
  if (b > 0.15 && b < 0.92) {
    const row = Math.floor((b - 0.15) / 0.06);
    const inLine = (b - 0.15) % 0.06 < 0.024;
    const end = 0.92 - ((row * 37) % 5) * 0.08; // ragged line ends
    if (inLine && a > 0.08 && a < end) return { m: 0.5, flag: false };
  }
  return { m: 0.06, flag: false }; // paper
}

function SonarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let cells: Cell[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;
    const t0 = performance.now();

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = [];
      if (w < 768) return;

      // the field box: right side of the hero, clear of the nav band
      const x0 = w * 0.6;
      const x1 = w * 0.99;
      const y0 = Math.max(104, h * 0.12);
      const y1 = h * 0.94;
      // the ping starts at the front sheet's form field
      const front = SHEETS[2];
      const sx = x0 + (front.u0 + (front.u1 - front.u0) * 0.35) * (x1 - x0);
      const sy = y0 + (front.v0 + (front.v1 - front.v0) * 0.645) * (y1 - y0);
      const reach = Math.hypot(Math.max(sx - x0, x1 - sx), Math.max(sy - y0, y1 - sy));

      for (let y = y0; y < y1; y += CELL) {
        for (let x = x0; x < x1; x += CELL) {
          const u = (x - x0) / (x1 - x0);
          const v = (y - y0) / (y1 - y0);
          let m = 0;
          let flag = false;
          for (let k = SHEETS.length - 1; k >= 0; k--) {
            const s = SHEETS[k];
            if (u >= s.u0 && u <= s.u1 && v >= s.v0 && v <= s.v1) {
              const ink = sheetInk((u - s.u0) / (s.u1 - s.u0), (v - s.v0) / (s.v1 - s.v0), k === 2);
              m = ink.m * s.dim;
              flag = ink.flag;
              break;
            }
          }
          if (m <= 0) continue;
          // fade toward the type on the left
          m *= Math.min(1, Math.max(0, (u - 0.02) / 0.18));
          cells.push({ x, y, m, flag, d: Math.hypot(x - sx, y - sy) / reach });
        }
      }
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const phase = ((t - t0) / 4200) % 1; // one ping every 4.2s
      for (const c of cells) {
        // the ping: a band travelling outward, fading as it goes
        const ring = Math.exp(-Math.pow((c.d - phase) / 0.05, 2)) * (1 - phase * 0.6);
        // what it has passed stays faintly read until the next ping
        const read = c.d < phase ? 0.25 * (1 - phase) : 0;
        const size = Math.min(CELL - 2, 1.5 + c.m * 2.6 + ring * 2.2);
        const off = (CELL - size) / 2;
        if (c.flag && (ring > 0.25 || read > 0.05)) ctx!.fillStyle = AMBER;
        else if (ring > 0.3) ctx!.fillStyle = COBALT;
        else ctx!.fillStyle = `rgba(${INK},${Math.min(0.85, 0.14 + c.m * 0.7 + read)})`;
        ctx!.fillRect(c.x + off, c.y + off, size, size);
      }
    }

    function loop(t: number) {
      raf = requestAnimationFrame(loop);
      if (!visible || t - last < 42) return;
      last = t;
      draw(t);
    }

    build();
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(t0 + 1500);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const onVis = () => (visible = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    if (reduce) draw(t0 + 1500);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 w-full h-full" />;
}

export default memo(SonarField);
