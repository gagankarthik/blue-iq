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

type Variant = "primary" | "secondary" | "quiet";
type Tone = "light" | "dark";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-sans-g font-semibold whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,transform] duration-150 ease-out active:translate-y-px " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:active:translate-y-0 aria-disabled:opacity-45 aria-disabled:cursor-not-allowed aria-busy:cursor-progress";

const SIZE = { md: "h-10 px-5 text-[15px]", lg: "h-12 px-7 text-base" } as const;

const LOOK: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: "bg-[#1E2130] text-white hover:bg-[#2A2E42] active:bg-[#14161F] shadow-[0_1px_2px_rgba(0,0,0,0.12)]",
    dark: "bg-white text-[#1F1F1F] hover:bg-[#F3F3F5] active:bg-[#E9E9EC]",
  },
  secondary: {
    light: "bg-white text-[#1F1F1F] border border-[#E2E2E6] hover:border-[#C9C9CF] hover:bg-[#FAFAFA] active:bg-[#F3F3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
    dark: "bg-white/10 text-white border border-white/30 hover:bg-white/20 active:bg-white/25",
  },
  quiet: {
    light: "px-0 h-auto text-[#2F5FE0] hover:text-[#1F47B8] active:text-[#1A3C9C] underline-offset-4 hover:underline",
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
