import { randomUUID } from "node:crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { SOURCES, isSource } from "@/lib/contacts";
import { issueToken, checkToken, contentSmell, throttled, verifyTurnstile } from "@/lib/spam";

/* ────────────────────────────────────────────────────────────────
   /api/contact — the one inbox for every Blue-IQ product.

   GET   → { token }  a signed form token; fetch it when the form renders
   POST  → saves one request to DynamoDB

   Table `blue-iq-contacts-form` (us-east-2):
     source       (partition)  website | capture | govern | spend | …
     submittedAt  (sort)       2026-10-13T09:41:07.512Z#3f9c1a2b
     GSI email-index   email + submittedAt   → one person, every product
     GSI status-index  status + submittedAt  → every "new" request, triaged

   Products on *.blue-iq.ai call it directly (CORS below). Credentials come
   from the default AWS chain: a local profile in dev, the host's role or
   env keys in production. Spam layers live in src/lib/spam.ts.
   ──────────────────────────────────────────────────────────────── */

export const dynamic = "force-dynamic";

const TABLE = process.env.CONTACTS_TABLE ?? "blue-iq-contacts-form";
const REGION = process.env.CONTACTS_REGION ?? process.env.AWS_REGION ?? "us-east-2";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }), {
  marshallOptions: { removeUndefinedValues: true },
});

/* any https://*.blue-iq.ai, plus extra origins from CONTACT_ALLOWED_ORIGINS */
const EXTRA = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
function allowed(origin: string | null) {
  if (!origin) return false;
  if (EXTRA.includes(origin)) return true;
  if (process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  try {
    const u = new URL(origin);
    return u.protocol === "https:" && (u.hostname === "blue-iq.ai" || u.hostname.endsWith(".blue-iq.ai"));
  } catch {
    return false;
  }
}

function cors(origin: string | null): Record<string, string> {
  if (!allowed(origin)) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin!,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ipOf = (req: Request) => (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

/* more than 3 requests from one email in an hour, across every product */
async function emailFlooding(email: string) {
  try {
    const since = new Date(Date.now() - 3600_000).toISOString();
    const r = await db.send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e AND submittedAt > :s",
        ExpressionAttributeValues: { ":e": email, ":s": since },
        Select: "COUNT",
      })
    );
    return (r.Count ?? 0) >= 3;
  } catch {
    return false;
  }
}

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req.headers.get("origin")) });
}

export async function GET(req: Request) {
  const headers = { ...cors(req.headers.get("origin")), "Cache-Control": "no-store" };
  return Response.json({ token: issueToken() }, { headers });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const headers = cors(origin);
  const reply = (status: number, body: object) => Response.json(body, { status, headers });
  /* what a bot sees: success, nothing stored, nothing learned */
  const shrug = (why: string) => {
    console.info(`[contact] dropped as spam: ${why}`);
    return reply(201, { ok: true, id: randomUUID() });
  };

  if (origin && !allowed(origin)) return reply(403, { ok: false, error: "Origin not allowed." });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return reply(400, { ok: false, error: "Send JSON." });
  }

  const ip = ipOf(req);
  if (throttled(`ip:${ip}`)) return reply(429, { ok: false, error: "Too many requests. Try again in a few minutes." });

  if (str(body.website, 200)) return shrug("honeypot");

  const tokenProblem = checkToken(body.token);
  if (tokenProblem === "too-fast") return shrug("too-fast");
  if (tokenProblem) return reply(400, { ok: false, error: "This form has expired. Refresh the page and try again." });

  if (!(await verifyTurnstile(body.turnstile, ip))) return reply(400, { ok: false, error: "Please complete the security check." });

  const source = isSource(body.source) ? body.source : "website";
  const name = str(body.name, 120);
  const email = str(body.email, 254).toLowerCase();
  const message = str(body.message, 5000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please add your name.";
  if (!EMAIL_RE.test(email)) errors.email = "That email does not look right.";
  if (!message) errors.message = "Tell us a little about what you need.";
  if (Object.keys(errors).length) return reply(422, { ok: false, errors });

  const smell = contentSmell(message, name);
  if (smell === "too-short") return reply(422, { ok: false, errors: { message: "A few more words would help us reply properly." } });
  if (smell) return shrug(smell);

  if (await emailFlooding(email)) return reply(429, { ok: false, error: "We already have several requests from this email. We will be in touch." });

  const now = new Date().toISOString();
  const id = randomUUID();

  try {
    await db.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          source,
          submittedAt: `${now}#${id.slice(0, 8)}`,
          id,
          status: "new",
          sourceLabel: SOURCES[source].label,
          createdAt: now,
          topic: str(body.topic, 60) || undefined,
          product: str(body.product, 60) || undefined,
          name,
          email,
          company: str(body.company, 160) || undefined,
          role: str(body.role, 120) || undefined,
          volume: str(body.volume, 60) || undefined,
          message,
          page: str(body.page, 500) || req.headers.get("referer") || undefined,
          origin: origin ?? undefined,
          userAgent: str(req.headers.get("user-agent"), 300) || undefined,
        },
        ConditionExpression: "attribute_not_exists(submittedAt)",
      })
    );
  } catch (err) {
    console.error("[contact] DynamoDB put failed", err);
    return reply(502, { ok: false, error: "We could not save your message." });
  }

  return reply(201, { ok: true, id });
}
