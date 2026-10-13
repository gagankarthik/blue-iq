/* ────────────────────────────────────────────────────────────────
   Where a contact request came from.

   Every Blue-IQ product posts its contact form to one endpoint
   (POST https://blue-iq.ai/api/contact) and every request lands in one
   DynamoDB table, `blue-iq-contacts-form`, partitioned by `source`. Adding
   a product is one line here; nothing else changes.

   Shared by the API route (validation) and the contact page (labels), so
   keep it free of server-only imports.
   ──────────────────────────────────────────────────────────────── */

export const SOURCES = {
  website: { label: "Blue-IQ website", host: "blue-iq.ai" },
  capture: { label: "Capture", host: "parsinglab.blue-iq.ai" },
  govern: { label: "Govern", host: "govern.blue-iq.ai" },
  spend: { label: "Spend", host: "blue-iq.ai/products#spend" },
  campus: { label: "Campus edition", host: "blue-iq.ai/products#editions" },
  workforce: { label: "Workforce edition", host: "blue-iq.ai/products#editions" },
  custom: { label: "Custom build", host: "blue-iq.ai/solutions#custom" },
} as const;

export type Source = keyof typeof SOURCES;

export const isSource = (s: unknown): s is Source => typeof s === "string" && Object.hasOwn(SOURCES, s);

export const TOPICS = ["A demo", "Pricing", "A custom build", "Security review", "Support", "Something else"] as const;
export type Topic = (typeof TOPICS)[number];

/* What a product sends. Only name, email and message are required. */
export type ContactPayload = {
  source: Source;
  topic?: string;
  name: string;
  email: string;
  company?: string;
  /* the product they are asking about (not where the form lives) */
  product?: string;
  role?: string;
  volume?: string;
  message: string;
  page?: string;
  /* honeypot: real people never see or fill this */
  website?: string;
};
