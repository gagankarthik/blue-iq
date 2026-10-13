"use client";

import { useState } from "react";

/* Copies a block of text and says so, in words and to screen readers. */
export default function CopyText({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      setDone(false);
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="h-10 px-4 rounded-full font-sans-g text-[14px] font-medium bg-white border border-[#DEDEE3] text-[#1F1F1F] transition-colors duration-150 hover:border-[#8A8B94] active:translate-y-px"
      aria-label={`Copy ${label}`}
    >
      <span aria-live="polite">{done ? "Copied" : "Copy text"}</span>
    </button>
  );
}
