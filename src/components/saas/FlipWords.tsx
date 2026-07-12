"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   Flip words (Aceternity's pattern, rebuilt in our system rather than
   dropped in at its defaults — no gradient text, no neon, our spring).

   It earns its place here because the cycling word is *true*: Sonar reads
   contracts and resumes and invoices, so the line means something different
   each time it lands. A flip effect over synonyms would be decoration; this
   one is the product's actual claim.

   The word sits in a fixed-height, absolutely-positioned slot, so the flip
   never reflows the headline above it.
   ──────────────────────────────────────────────────────────────── */

const SPRING = { type: "spring" as const, stiffness: 160, damping: 22, mass: 0.7 };

export default function FlipWords({
  words,
  interval = 2200,
  className = "",
  style,
}: {
  words: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval, reduce]);

  /* reduced motion gets the first word, held — never a flashing element */
  if (reduce) {
    return (
      <span className={className} style={style}>
        {words[0]}
      </span>
    );
  }

  return (
    <span className="relative block" style={{ height: "1.05em" }} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          className={`absolute inset-0 flex items-center justify-center whitespace-nowrap ${className}`}
          style={style}
          initial={{ opacity: 0, y: "0.28em", filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-0.28em", filter: "blur(8px)" }}
          transition={SPRING}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
