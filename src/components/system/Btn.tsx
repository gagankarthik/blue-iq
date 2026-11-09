import Link from "next/link";
import { IconArrow, IconArrowUpRight } from "@/components/icons/BqIcons";

/* ────────────────────────────────────────────────────────────────
   The one button. Every action on the site is one of three variants, so
   the same job always looks the same (similarity), and only `primary`
   carries the accent (one focal action per screen).

   All six states are defined here and nowhere else:
     default · hover · focus-visible (2px ring, globals.css) · active
     (pressed: darker, 1px down) · disabled (45%, not-allowed) · loading
     (spinner, aria-busy, inert)
   Heights sit on the 4px grid: md 40px, lg 48px. Hover and press
   respond in 150ms.
   ──────────────────────────────────────────────────────────────── */

type Variant = "primary" | "brand" | "secondary" | "quiet";
type Tone = "light" | "dark";

const BASE =
  "group relative inline-flex items-center justify-center gap-4 rounded-[12px] font-mono-g font-medium uppercase tracking-[0.06em] whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,transform] duration-150 ease-out active:translate-y-px " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:active:translate-y-0 aria-disabled:opacity-45 aria-disabled:cursor-not-allowed aria-busy:cursor-progress";

const SIZE = { md: "h-12 px-6 text-[13px]", lg: "h-14 px-8 text-[13px]" } as const;

const LOOK: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: "bg-[#0E1116] text-white hover:bg-[#1F4FE6] active:bg-[#1638B8]",
    dark: "bg-white text-[#0E1116] hover:bg-[#E7EAF0] active:bg-[#D9DCE2]",
  },
  /* brand blue fill: the home page and nav. On blue, white with blue text */
  brand: {
    light: "bg-[#1F4FE6] text-white hover:bg-[#1638B8] active:bg-[#122E96]",
    dark: "bg-white text-[#1638B8] hover:bg-[#EEF3FF] active:bg-[#DCE6FF]",
  },
  secondary: {
    light: "bg-white text-[#0E1116] border border-[#D9DCE2] hover:border-[#0E1116] active:bg-[#E7EAF0]",
    dark: "bg-white/10 text-white border border-white/30 hover:bg-white/20 active:bg-white/25",
  },
  quiet: {
    light: "px-0 h-auto text-[#1F4FE6] hover:text-[#1638B8] active:text-[#122E96] underline-offset-4 hover:underline",
    dark: "px-0 h-auto text-white hover:text-white/80 underline-offset-4 hover:underline",
  },
};

type Common = {
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: keyof typeof SIZE;
  arrow?: boolean;
  className?: string;
};

/* a plain trailing arrow that nudges forward on hover */
function Inner({
  children,
  arrow,
  external,
  loading,
}: {
  children: React.ReactNode;
  arrow?: boolean;
  external?: boolean;
  loading?: boolean;
  variant?: Variant;
  tone?: Tone;
  size?: keyof typeof SIZE;
}) {
  const A = external ? IconArrowUpRight : IconArrow;
  return (
    <>
      {loading && <span aria-hidden className="w-4 h-4 rounded-full border-2 border-current/30 border-t-current animate-spin" />}
      {children}
      {arrow && !loading && <A size={16} className="transition-transform duration-150 ease-out group-hover:translate-x-0.5" />}
    </>
  );
}

export function Btn({
  href,
  external,
  variant = "primary",
  tone = "light",
  size = "md",
  arrow,
  className = "",
  children,
  onClick,
}: Common & { href: string; external?: boolean; onClick?: () => void }) {
  const cls = `${BASE} ${variant === "quiet" ? "" : SIZE[size]} ${LOOK[variant][tone]} ${className}`;
  const inner = (
    <Inner arrow={arrow} external={external} variant={variant} tone={tone} size={size}>
      {children}
    </Inner>
  );
  /* internal routes use Link (client-side navigation, prefetch); anything
     off-site, mail or hash-only stays a plain anchor */
  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={cls}>
      {inner}
    </a>
  );
}

export function BtnButton({
  variant = "primary",
  tone = "light",
  size = "md",
  arrow,
  className = "",
  children,
  loading,
  disabled,
  type = "button",
  onClick,
}: Common & { loading?: boolean; disabled?: boolean; type?: "button" | "submit"; onClick?: () => void }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${BASE} ${variant === "quiet" ? "" : SIZE[size]} ${LOOK[variant][tone]} ${className}`}
    >
      <Inner arrow={arrow} loading={loading} variant={variant} tone={tone} size={size}>
        {children}
      </Inner>
    </button>
  );
}
