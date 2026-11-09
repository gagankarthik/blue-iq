"use client";

import { useState } from "react";
import { I } from "@/components/home/icons";

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
      className="h-10 px-4 inline-flex items-center gap-2 rounded-[12px] bg-white border border-[#8A8B94] text-[#0E1116] font-mono-g text-[13px] font-medium uppercase tracking-[0.06em] whitespace-nowrap transition-[background-color,border-color] duration-150 hover:border-[#0E1116] hover:bg-[#E7EAF0] active:translate-y-px"
      aria-label={`Copy ${label}`}
    >
      {done && <I.check size={16} aria-hidden />}
      <span aria-live="polite">{done ? "Copied" : "Copy text"}</span>
    </button>
  );
}
