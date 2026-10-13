"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Btn } from "@/components/system/Btn";

/* ────────────────────────────────────────────────────────────────
   The hero, composed the way sarvam.ai composes theirs: a full-bleed soft
   colour wash (saturated brand blue at the top, melting through periwinkle
   into the page), a light
   display-serif headline, one supporting line, two pills.
   ──────────────────────────────────────────────────────────────── */

const READS = ["contracts", "invoices", "resumes", "licences", "agreements"];

/* every word stacked in one grid cell; the longest fixes the width */
function Rotating({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const prev = (i - 1 + words.length) % words.length;
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [reduce, words.length]);
  return (
    <span className="relative inline-grid overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] text-left" aria-hidden>
      <span className="invisible col-start-1 row-start-1">{longest}</span>
      {words.map((w, k) => (
        <span
          key={w}
          className="col-start-1 row-start-1 italic transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ color: "#2F5FE0", opacity: k === i ? 1 : 0, transform: k === i ? "translateY(0)" : k === prev ? "translateY(-100%)" : "translateY(100%)" }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-h">
      {/* the wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(95% 70% at 50% -10%, #8FAEFF 0%, #A9C0FF 30%, rgba(196,210,255,0.75) 50%, rgba(250,250,250,0) 78%)",
            "radial-gradient(48% 46% at -4% 72%, rgba(170,190,255,0.75) 0%, rgba(250,250,250,0) 70%)",
            "radial-gradient(48% 46% at 104% 72%, rgba(150,215,255,0.7) 0%, rgba(250,250,250,0) 70%)",
            "#FAFAFA",
          ].join(", "),
        }}
      />

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-36 sm:pt-44 pb-20 sm:pb-28 text-center">
        <h1 id="hero-h" className="mx-auto font-display t-display max-w-[21ch]" style={{ color: "#1F1F1F" }}>
          We build the products that read your <Rotating words={READS} />
          <span className="sr-only">contracts, invoices, resumes, licences and agreements</span>
        </h1>

        <p className="mt-6 mx-auto font-sans-g text-[1.125rem] sm:text-[1.25rem] leading-[1.6] max-w-[58ch]" style={{ color: "#3A3B44" }}>
          Blue-IQ turns business documents into answers you can act on. Capture structures what comes in, Spend checks every invoice against what you agreed,
          and Govern keeps each contract in view. Underneath, Sonar scores every value and sends anything uncertain to a person.
        </p>

        <div className="bq-rise mt-9 flex flex-col sm:flex-row items-center justify-center gap-3" style={{ animationDelay: "0.1s" }}>
          <Btn href="/contact?topic=A%20demo" size="lg" className="w-full sm:w-auto">
            Book a demo
          </Btn>
          <Btn href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
            Contact us
          </Btn>
        </div>
      </div>
    </section>
  );
}
