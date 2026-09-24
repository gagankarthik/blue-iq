"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import SonarField from "@/components/art/SonarField";
import { IconArrow } from "@/components/icons/BqIcons";

/* ────────────────────────────────────────────────────────────────
   The hero — centred on navy, over the Sonar field.

   The background is the product's own metaphor, and it answers the visitor:
   move the pointer or tap and a pulse spreads from that point, lighting the
   grid as it passes. The one moving word is the document Sonar is reading,
   so the sentence lands differently each time it turns.
   ──────────────────────────────────────────────────────────────── */

const READS = ["contracts", "invoices", "resumes", "licences", "agreements"];

/* The rotating word. Every word is rendered once, stacked in one grid cell;
   the longest fixes the width so the line never reflows. Switching is a CSS
   transition on transform/opacity: nothing mounts or unmounts, so nothing
   can pile up when the browser throttles a background tab. */
function Rotating({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const prev = (i - 1 + words.length) % words.length;
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [reduce, words.length]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] text-left" aria-hidden>
      <span className="invisible col-start-1 row-start-1">{longest}</span>
      {words.map((w, k) => {
        const on = k === i;
        const gone = k === prev;
        return (
          <span
            key={w}
            className="col-start-1 row-start-1 transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              color: "#6AA3FF",
              opacity: on ? 1 : 0,
              transform: on ? "translateY(0)" : gone ? "translateY(-100%)" : "translateY(100%)",
            }}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}

/* Entrance animation is CSS (.bq-rise in globals.css), so the hero paints on
   first load before any JavaScript runs. */
export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden min-h-[100dvh] flex items-center justify-center text-center"
      style={{ background: SA.navy }}
      aria-labelledby="hero-h"
    >
      <SonarField />
      {/* keeps the headline readable over the brightest returns, and fades
          the grid into the page below */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 48% 42% at 50% 46%, rgba(8,16,43,0.82), rgba(8,16,43,0) 100%)" }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(8,16,43,0), ${SA.navy})` }} />

      <div className="bq-hero-pad relative w-full max-w-[1040px] px-5 sm:px-8 pt-28 pb-20 sm:pt-36 sm:pb-24">
        <h1
          id="hero-h"
          className="bq-rise font-display font-semibold leading-[1.04] text-white"
          style={{ fontSize: "clamp(2.3rem, 5vw, 4.4rem)", letterSpacing: "-0.045em" }}
        >
          <span className="block">We build the products</span>
          <span className="block">
            that read your <Rotating words={READS} />
          </span>
          <span className="sr-only">contracts, invoices, resumes, licences and agreements</span>
        </h1>

        <p
          className="bq-rise mt-7 mx-auto font-sans-g leading-[1.65]"
          style={{
            animationDelay: "0.15s", fontSize: "clamp(1.02rem, 1.4vw, 1.15rem)", color: "rgba(255,255,255,0.78)", maxWidth: "60ch" }}
        >
          Blue-IQ is a document AI platform. Capture, Spend and Govern extract, reconcile and review the data in your
          documents, powered by Sonar, our AI that scores every field and flags what it cannot read.
        </p>

        <div className="bq-rise mt-10 flex flex-col sm:flex-row items-center justify-center gap-3" style={{ animationDelay: "0.25s" }}>
          <a
            href="/contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 font-sans-g text-[15px] font-semibold px-7 py-4 rounded-full transition-colors active:scale-[0.98] hover:bg-[#EDF3FF]"
            style={{ background: "#fff", color: SA.ink }}
          >
            Book a demo
            <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#how"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-sans-g text-[15px] font-semibold px-7 py-4 rounded-full text-white transition-colors active:scale-[0.98] hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.26)" }}
          >
            See how Sonar works
          </a>
        </div>
      </div>
    </section>
  );
}
