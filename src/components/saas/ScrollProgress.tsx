"use client";

import { memo } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";

/* A hairline of accent across the very top of the page, tracking read position.
   Spring-damped so flicking the wheel doesn't make it twitch. */
function ScrollProgressBase() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70] pointer-events-none"
      style={{ scaleX, background: `linear-gradient(90deg, ${SA.accent}, ${SA.accent2})` }}
    />
  );
}

export default memo(ScrollProgressBase);
