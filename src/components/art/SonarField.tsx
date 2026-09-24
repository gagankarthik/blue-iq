"use client";

import { useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────────
   The Sonar field — the hero's interactive background.

   A grid of faint dots on navy. Sonar sends a pulse from the centre every
   few seconds, and from wherever the visitor points or taps: a ring widens
   across the grid, and the dots it passes light up and are pushed outward,
   the way a return shows on a sonar screen. Dots near the cursor glow softly.

   One <canvas>, one rAF loop. It pauses when off screen or in a background
   tab, caps the pixel ratio at 2, and under reduced motion draws the grid
   once and stops. The canvas never takes pointer events — listeners live on
   the parent section, so the text and buttons above stay fully interactive.
   ──────────────────────────────────────────────────────────────── */

type Ring = { x: number; y: number; t0: number };

export default function SonarField({
  gap = 26,
  auto = 2800,
  className = "",
}: {
  gap?: number;
  auto?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let lastAuto = -1e9;
    let lastPointerPulse = -1e9;
    const rings: Ring[] = [];
    const pointer = { x: -9999, y: -9999, on: false };

    const SPEED = 0.34; // px per ms
    const BAND = 46; // ring thickness that lights dots
    const LIFE = 4200; // ms

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(performance.now());
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;

      for (let i = rings.length - 1; i >= 0; i--) if (now - rings[i].t0 > LIFE) rings.splice(i, 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let x = ox + c * gap;
          let y = oy + r * gap;
          let glow = 0;

          for (const ring of rings) {
            const age = now - ring.t0;
            const rad = age * SPEED;
            const dx = x - ring.x;
            const dy = y - ring.y;
            const d = Math.hypot(dx, dy) || 1;
            const off = Math.abs(d - rad);
            if (off < BAND) {
              const k = (1 - off / BAND) * (1 - age / LIFE);
              glow = Math.max(glow, k);
              x += (dx / d) * k * 5;
              y += (dy / d) * k * 5;
            }
          }

          if (pointer.on) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            if (d < 150) glow = Math.max(glow, (1 - d / 150) * 0.55);
          }

          if (glow > 0.02) {
            /* blend from the logo blue to its cyan as the return strengthens */
            const g = Math.round(122 + 72 * glow);
            ctx.fillStyle = `rgba(${Math.round(41 + 11 * glow)},${g},255,${0.22 + glow * 0.78})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.1 + glow * 1.5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
      }
    };

    const loop = (now: number) => {
      if (now - lastAuto > auto) {
        rings.push({ x: w / 2, y: h * 0.46, t0: now });
        lastAuto = now;
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const local = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.on = e.pointerType === "mouse";
      const now = performance.now();
      if (now - lastPointerPulse > 900) {
        rings.push({ x: p.x, y: p.y, t0: now });
        lastPointerPulse = now;
      }
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      rings.push({ x: p.x, y: p.y, t0: performance.now() });
      lastPointerPulse = performance.now();
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onVis = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(host);

    resize();
    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerdown", onDown);
      host.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVis);
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [gap, auto]);

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 pointer-events-none ${className}`} />;
}
