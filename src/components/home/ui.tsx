import Link from "next/link";
import { BB } from "@/lib/theme";
import { I } from "@/components/home/icons";

/* ────────────────────────────────────────────────────────────────
   Blueprint primitives for the home page, nav and footer (server-safe).
   Sharp corners everywhere: radius 0 is the shape rule for this system.
   ──────────────────────────────────────────────────────────────── */

type Tone = "ink" | "cobalt" | "outline" | "light";

const TONE: Record<Tone, string> = {
  ink: "bg-[#0E1116] text-white hover:bg-[#1F4FE6]",
  cobalt: "bg-[#1F4FE6] text-white hover:bg-[#1638B8]",
  outline: "bg-transparent text-[#0E1116] border border-dashed border-[#9AA0AC] hover:border-solid hover:border-[#0E1116] hover:bg-white",
  light: "bg-white text-[#0E1116] hover:bg-[#E7EAF0]",
};

/** Square button. Mono uppercase label, arrow nudges on hover, presses 1px. */
export function SqBtn({
  href,
  children,
  tone = "ink",
  arrow = false,
  className = "",
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  arrow?: boolean;
  className?: string;
  size?: "md" | "lg";
}) {
  const h = size === "lg" ? "h-14 px-8" : "h-12 px-6";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-4 rounded-[12px] font-mono-g text-[13px] font-medium uppercase tracking-[0.06em] whitespace-nowrap transition-[background-color,border-color,color] duration-200 active:translate-y-px ${h} ${TONE[tone]} ${className}`}
    >
      {children}
      {arrow && <I.arrow size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
    </Link>
  );
}

/** Mono label with a cobalt plus mark, the system's eyebrow. Rationed. */
export function Label({ children, tone = "light", className = "" }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono-g text-[13px] uppercase tracking-[0.06em] ${className}`}
      style={{ color: tone === "dark" ? "#E4E7ED" : BB.ink2 }}
    >
      <span aria-hidden style={{ color: tone === "dark" ? BB.sky : BB.cobalt }}>
        +
      </span>
      {children}
    </p>
  );
}

/** Four corner ticks around a block: the blueprint's way of framing a cell. */
export function Ticks({ color = BB.cobalt }: { color?: string }) {
  const s = { borderColor: color } as React.CSSProperties;
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className="absolute left-0 top-0 w-2 h-2 border-l-2 border-t-2" style={s} />
      <span className="absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2" style={s} />
      <span className="absolute left-0 bottom-0 w-2 h-2 border-l-2 border-b-2" style={s} />
      <span className="absolute right-0 bottom-0 w-2 h-2 border-r-2 border-b-2" style={s} />
    </span>
  );
}

/** The page's two end guides: dashed hairlines on the column's left and
    right edges, behind everything, desktop only. Blocks run edge to edge
    between them; text sits a 32px gutter inside them. */
export function Guides() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden lg:block">
      <div className="relative h-full max-w-[1176px] mx-auto">
        {["0%", "100%"].map((l) => (
          <span
            key={l}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: l, backgroundImage: `linear-gradient(${BB.guide} 50%, transparent 0)`, backgroundSize: "1px 8px" }}
          />
        ))}
      </div>
    </div>
  );
}
