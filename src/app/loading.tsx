"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";

/* ────────────────────────────────────────────────────────────────
   The loading state.

   Not a spinner. A spinner says "something is happening" and nothing else —
   it is the same animation every site on the internet uses, and it tells the
   reader nothing about where they are.

   This is a scan: a hairline of accent travelling down the wordmark, which is
   the one gesture the whole company is about. The engine reads a page top to
   bottom and reports what it found. The loader does the same thing to our own
   name.

   Under reduced motion it holds still and simply says the word. A person who
   has asked the OS to stop moving things should not be shown a travelling
   line, and a static loader is a perfectly good loader.
   ──────────────────────────────────────────────────────────────── */
export default function Loading() {
  const reduce = useReducedMotion();

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center"
      style={{ background: SA.bg }}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading</span>

      <div className="relative">
        <div
          className="font-display font-normal select-none"
          style={{
            fontSize: "clamp(2.2rem, 7vw, 4rem)",
            letterSpacing: "-0.045em",
            color: SA.ink,
          }}
        >
          Blue-IQ
        </div>

        {/* the scan line. It overshoots the wordmark on both sides so it reads
            as passing THROUGH the word rather than being contained by it. */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute left-[-12%] w-[124%] h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${SA.accent}, transparent)`,
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
              repeat: Infinity,
              repeatDelay: 0.25,
              times: [0, 0.15, 0.85, 1],
            }}
          />
        )}
      </div>

      {/* a hairline progress rule under the mark — an indeterminate bar that
          travels rather than fills, because we do not know the duration and a
          fake percentage is a lie */}
      {!reduce && (
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px overflow-hidden"
          style={{ background: SA.line }}
        >
          <motion.span
            className="block h-px w-1/3"
            style={{ background: SA.accent }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
}
