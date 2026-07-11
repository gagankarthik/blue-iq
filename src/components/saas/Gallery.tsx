"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SA } from "@/lib/theme";
import { SPRING, SPRING_SOFT, Spotlight, Tilt, Words } from "@/components/saas/motion";
import {
  JsonPreview,
  ClausePreview,
  ConfidencePreview,
  ThroughputPreview,
  IntegrationsPreview,
  PipelinePreview,
} from "@/components/saas/previews";

type Cat = "Products" | "Engine" | "Integrations";
const CATS: ("All" | Cat)[] = ["All", "Products", "Engine", "Integrations"];

type Card = {
  id: string;
  cat: Cat;
  title: string;
  blurb: string;
  meta: string;
  href: string;
  external?: boolean;
  preview: React.ReactNode;
};

const cards: Card[] = [
  {
    id: "parsinglab",
    cat: "Products",
    title: "ParsingLab",
    blurb: "Resumes and CVs into schema-validated JSON, every field scored.",
    meta: "Live",
    href: "https://www.parsinglab.blue-iq.ai/",
    external: true,
    preview: <JsonPreview />,
  },
  {
    id: "govern",
    cat: "Products",
    title: "Govern",
    blurb: "Reads contracts against your playbook and ranks the risk before you sign.",
    meta: "Live",
    href: "https://govern.blue-iq.ai/",
    external: true,
    preview: <ClausePreview />,
  },
  {
    id: "custom",
    cat: "Products",
    title: "Custom builds",
    blurb: "When nothing in the suite fits, we ship a product shaped around your workflow.",
    meta: "Service",
    href: "/solutions",
    preview: <PipelinePreview />,
  },
  {
    id: "confidence",
    cat: "Engine",
    title: "Confidence scoring",
    blurb: "Every value carries a score. What Sonar cannot read comes back flagged, never guessed.",
    meta: "Sonar",
    href: "/about#sonar",
    preview: <ConfidencePreview />,
  },
  {
    id: "throughput",
    cat: "Engine",
    title: "Batch throughput",
    blurb: "Up to 200 documents per call, with the second batch as clean as the first.",
    meta: "Sonar",
    href: "/about#sonar",
    preview: <ThroughputPreview />,
  },
  {
    id: "integrations",
    cat: "Integrations",
    title: "Drops into your stack",
    blurb: "A documented REST API, signed webhooks, and native connectors. No re-architecting.",
    meta: "Platform",
    href: "/solutions#integrations",
    preview: <IntegrationsPreview />,
  },
];

function GalleryCard({ c }: { c: Card }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(4px)" }}
      transition={SPRING_SOFT}
    >
      <Tilt max={4} lift={5} className="h-full">
        <Spotlight className="h-full rounded-xl">
          <a
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            className="group flex flex-col h-full rounded-xl overflow-hidden transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(11,11,15,0.04),0_22px_44px_-20px_rgba(11,11,15,0.20)]"
            style={{ background: SA.surface, border: `1px solid ${SA.line}` }}
          >
            {/* preview well — the mock inside is alive on its own loop */}
            <div
              className="relative grid place-items-center px-6 py-8 h-[228px] overflow-hidden"
              style={{ background: SA.bg3, borderBottom: `1px solid ${SA.line}` }}
            >
              <div className="w-full flex justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
                {c.preview}
              </div>
            </div>

            {/* meta */}
            <div className="flex items-start gap-3 p-4 flex-1">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans-g text-[14.5px] font-semibold truncate" style={{ color: SA.ink }}>
                    {c.title}
                  </h3>
                  <span
                    className="font-mono-g text-[9.5px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded shrink-0"
                    style={{ background: SA.bg2, border: `1px solid ${SA.line}`, color: SA.faint }}
                  >
                    {c.meta}
                  </span>
                </div>
                <p className="mt-1.5 font-sans-g text-[13px] leading-relaxed" style={{ color: SA.sub }}>
                  {c.blurb}
                </p>
              </div>

              <span className="grid place-items-center w-7 h-7 shrink-0" style={{ color: SA.faint }}>
                {c.external ? (
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
                )}
              </span>
            </div>
          </a>
        </Spotlight>
      </Tilt>
    </motion.div>
  );
}

export default function Gallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const reduce = useReducedMotion();
  const shown = cat === "All" ? cards : cards.filter((c) => c.cat === cat);

  return (
    <section className="relative px-5 sm:px-8 pt-4 pb-20 sm:pb-28" style={{ background: SA.bg }} aria-labelledby="gal-h">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-10">
          <Words
            as="h2"
            text="The suite, and the engine"
            accent="underneath"
            className="font-display font-normal tracking-[-0.035em] leading-[1.08]"
            style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", color: SA.ink }}
            accentClassName="font-serif-i"
            accentStyle={{ fontSize: "1.06em", color: SA.accent }}
          />
          <h2 id="gal-h" className="sr-only">
            The Blue-IQ suite and the Sonar engine
          </h2>
        </div>

        {/* filter chips — the active pill is a single shared element that slides */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="Filter">
          {CATS.map((c) => {
            const on = c === cat;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={on}
                onClick={() => setCat(c)}
                className="relative font-sans-g text-[13.5px] font-medium px-4 py-2 rounded-full transition-colors active:scale-[0.97]"
                style={{ border: `1px solid ${on ? "transparent" : SA.line2}`, color: on ? "#fff" : SA.sub }}
              >
                {on && (
                  <motion.span
                    layoutId={reduce ? undefined : "chip"}
                    className="absolute inset-0 rounded-full"
                    style={{ background: SA.ink }}
                    transition={SPRING}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            );
          })}
        </div>

        {/* the grid — cards reflow on a spring when the filter changes */}
        <motion.div layout transition={SPRING_SOFT} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {shown.map((c) => (
              <GalleryCard key={c.id} c={c} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
