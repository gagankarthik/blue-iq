"use client";

import { motion } from "framer-motion";
import { MoveRight, ArrowUpRight } from "lucide-react";
import { UI } from "@/lib/theme";
import { fadeUp, Reveal } from "@/components/motion";
import Magnetic from "@/components/Magnetic";

type Action = { label: string; href: string; external?: boolean };

/**
 * Site-wide closing CTA. A deep-blue band with a related Unsplash photograph
 * on one side, kept on-brand with a blue overlay. Reused on every page.
 */
export default function CtaBand({
  eyebrow = "Let's talk",
  title,
  text,
  primary = { label: "Talk to us", href: "/contact" },
  secondary,
  image,
  imageAlt = "",
}: {
  eyebrow?: string;
  title: string;
  text: string;
  primary?: Action;
  secondary?: Action;
  image: string;
  imageAlt?: string;
}) {
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24">
      <Reveal className="max-w-[1280px] mx-auto">
        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[1.75rem] grid lg:grid-cols-2" style={{ background: "#001A6B", minHeight: 360 }}>
          {/* copy */}
          <div className="relative z-10 px-8 sm:px-14 py-14 sm:py-20 flex flex-col justify-center">
            <span className="font-sans-g text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: UI.blue3 }}>{eyebrow}</span>
            <h2 className="mt-4 font-display font-bold tracking-[-0.03em] leading-[1.03]" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", color: "#fff" }}>
              {title}
            </h2>
            <p className="mt-5 font-sans-g leading-relaxed max-w-[44ch]" style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.74)" }}>
              {text}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic href={primary.href} external={primary.external} className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold px-7 py-3.5 rounded-lg" style={{ background: "#fff", color: UI.blue }}>
                {primary.label} {primary.external ? <ArrowUpRight className="w-4 h-4" strokeWidth={2} /> : <MoveRight className="w-4 h-4" strokeWidth={2} />}
              </Magnetic>
              {secondary && (
                <a href={secondary.href} target={secondary.external ? "_blank" : undefined} rel={secondary.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 font-sans-g text-[15px] font-semibold text-white px-6 py-3.5 rounded-lg transition-colors hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.32)" }}>
                  {secondary.label} {secondary.external && <ArrowUpRight className="w-4 h-4" strokeWidth={2} />}
                </a>
              )}
            </div>
          </div>

          {/* image */}
          <div className="relative min-h-[220px] lg:min-h-full">
            <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            {/* brand wash so any photo stays on-theme */}
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, #001A6B 0%, rgba(0,26,107,0.55) 30%, rgba(0,33,129,0.32) 100%)" }} />
            <div aria-hidden className="absolute inset-0 lg:hidden" style={{ background: "rgba(0,26,107,0.35)" }} />
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
