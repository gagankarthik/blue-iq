import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/* ────────────────────────────────────────────────────────────────
   Spam protection for /api/contact. Layers, cheapest first:

   1. honeypot      a hidden field people never fill (checked in the route)
   2. form token    an HMAC-signed timestamp issued by GET /api/contact;
                    a form sent in under 3 s (a bot) or after 2 h (a replay)
                    is refused
   3. throttles     per IP in memory, and per email against the table itself
                    (in the route), so the limit holds across instances
   4. content       link-stuffing and empty-ish messages
   5. Turnstile     Cloudflare's invisible challenge, verified server side —
                    on only when TURNSTILE_SECRET_KEY is set
   ──────────────────────────────────────────────────────────────── */

const MIN_MS = 3_000;
const MAX_MS = 2 * 60 * 60 * 1000;

/* In production set CONTACT_FORM_SECRET (any long random string). Without
   it, tokens are signed with a fixed development key and still work. */
const SECRET = process.env.CONTACT_FORM_SECRET ?? "blue-iq-dev-only-contact-secret";
if (process.env.NODE_ENV === "production" && !process.env.CONTACT_FORM_SECRET) {
  console.warn("[contact] CONTACT_FORM_SECRET is not set; form tokens use the development key.");
}

const sign = (t: string) => createHmac("sha256", SECRET).update(t).digest("base64url");

export function issueToken(now = Date.now()) {
  const t = String(now);
  return `${t}.${sign(t)}`;
}

export function checkToken(token: unknown, now = Date.now()): string | null {
  if (typeof token !== "string" || !token.includes(".")) return "missing";
  const [t, sig] = token.split(".");
  const want = Buffer.from(sign(t));
  const got = Buffer.from(sig ?? "");
  if (want.length !== got.length || !timingSafeEqual(want, got)) return "bad-signature";
  const age = now - Number(t);
  if (!Number.isFinite(age) || age < MIN_MS) return "too-fast";
  if (age > MAX_MS) return "expired";
  return null;
}

export function contentSmell(message: string, name: string): string | null {
  const links = (message.match(/https?:\/\/|www\./gi) ?? []).length;
  if (links > 2) return "links";
  if (/https?:\/\/|www\./i.test(name)) return "link-in-name";
  if (message.replace(/\s+/g, "").length < 8) return "too-short";
  return null;
}

/* per-instance memory throttle: `limit` requests per `windowMs` per key */
const buckets = new Map<string, number[]>();
export function throttled(key: string, limit = 5, windowMs = 600_000) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) buckets.clear();
  return recent.length > limit;
}

export const turnstileOn = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip !== "unknown" ? { remoteip: ip } : {}) }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
