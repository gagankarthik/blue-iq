"use client";

import { usePathname } from "next/navigation";

/* The address that was asked for, so the visitor can see what went wrong. */
export default function MissingPath() {
  const path = usePathname();
  if (!path || path === "/") return null;
  return (
    <p
      className="mt-6 mx-auto max-w-full inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white font-sans-g text-[15px]"
      style={{ border: "1px solid #ECECEF", color: "#3A3B44" }}
    >
      <span className="shrink-0">Nothing lives at</span>
      <code className="font-mono-g text-[14px] truncate" style={{ color: "#0F1B3D" }}>
        {path}
      </code>
    </p>
  );
}
