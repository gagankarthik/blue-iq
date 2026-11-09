"use client";

import { useSyncExternalStore } from "react";

/* The address that was asked for, so the visitor can see what went wrong.
   The 404 page is prerendered, so the server cannot know the path: it is
   read in the browser only (server snapshot null), which avoids a
   hydration mismatch. */
const noop = () => () => {};
export default function MissingPath() {
  const path = useSyncExternalStore(
    noop,
    () => window.location.pathname,
    () => null
  );
  if (!path || path === "/") return null;
  return (
    <p
      className="mt-8 max-w-full inline-flex items-center gap-2 min-h-12 px-4 py-2 rounded-[12px] bg-white font-sans-g t-base"
      style={{ border: "1px solid #D9DCE2", color: "#2E333D" }}
    >
      <span className="shrink-0">Nothing lives at</span>
      <code className="font-mono-g text-[13px] truncate" style={{ color: "#0E1116" }}>
        {path}
      </code>
    </p>
  );
}
