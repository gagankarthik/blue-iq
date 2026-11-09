"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { BB } from "@/lib/theme";
import { SOURCES, TOPICS, isSource, type Source } from "@/lib/contacts";
import { PageHero, WRAP } from "@/components/page/kit";
import { BtnButton } from "@/components/system/Btn";
import { I, Tile, type Ico } from "@/components/home/icons";
import { Head, Stagger } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /contact: one job, send a request. Reading order:
     1. the header (what this page is),
     2. the form, the primary object, with "what happens next" beside it,
     3. other ways in, for people who do not need the form.

   Every request is saved to the shared `blue-iq-contacts-form` table through
   POST /api/contact. A product that links here passes ?source=govern (or
   capture, spend…) and the record says so; ?email= pre-fills the field
   from the home page CTA; ?product= pre-selects the product; ?topic= or
   #pricing sets the topic.
   ──────────────────────────────────────────────────────────────── */

/* Cloudflare Turnstile switches on when its site key is set */
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const PRODUCTS = ["Not sure yet", "Capture", "Spend", "Govern", "Campus edition", "Workforce edition", "Custom build"];
const VOLUMES = ["", "Under 1,000", "1,000 to 10,000", "10,000 to 100,000", "Over 100,000"];

/* each topic as a choice: an icon, one line, and the example the message box shows */
const TOPIC_INFO: Record<string, { icon: Ico; d: string; eg: string }> = {
  "A demo": { icon: I.sonar, d: "Sonar on your own files", eg: "For example: 2,000 vendor invoices a month, mostly scanned PDFs." },
  Pricing: { icon: I.pricing, d: "Plans for your volume", eg: "For example: around 5,000 contracts a year across two teams." },
  "A custom build": { icon: I.custom, d: "Built on Sonar for you", eg: "For example: we need credential checks pulled from licence scans into our ATS." },
  "Security review": { icon: I.trust, d: "Controls and documentation", eg: "For example: our security team needs your data handling and access details." },
  Support: { icon: I.team, d: "Help with a product", eg: "For example: which product, what happened, and when." },
  "Something else": { icon: I.faq, d: "Any other question", eg: "Tell us what you are looking for." },
};

const NEXT: { t: string; d: string }[] = [
  { t: "A person reads your request", d: "Someone from our team, not a bot." },
  { t: "You share a few real documents", d: "The messy ones are the useful ones." },
  { t: "We read them with Sonar, live", d: "Every field, every score, every flag." },
];

const MORE: { icon: Ico; t: string; d: string; href: string; cta: string }[] = [
  {
    icon: I.capture,
    t: "Already a customer?",
    d: "Sign in to your product, or send us a support request with the form above.",
    href: "https://www.parsinglab.blue-iq.ai/",
    cta: "Open Capture",
  },
  {
    icon: I.trust,
    t: "Security review",
    d: "Controls, data handling and compliance, in one place for your security team.",
    href: "/trust",
    cta: "Visit the Trust Center",
  },
  {
    icon: I.custom,
    t: "Scoping a custom build?",
    d: "See how we build document AI apps, migrations and integrations on Sonar.",
    href: "/solutions#custom",
    cta: "Custom builds",
  },
];

type Fields = { name: string; email: string; company: string; role: string; volume: string; product: string; message: string; website: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const LABEL = "font-sans-g t-base font-medium";
const HELP = "font-sans-g t-meta-13";
const RED = "#B91C1C";

/* an inline field error: words under the field, tied to it by aria-describedby */
function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className={`${HELP} font-medium`} style={{ color: RED }}>
      {msg}
    </p>
  );
}

/* the "(optional)" note after a label, quieter than the label itself */
function Optional() {
  return (
    <span className="font-normal" style={{ color: BB.ink3 }}>
      {" "}
      (optional)
    </span>
  );
}

/* while the form reads the URL, the card keeps its shape */
function FormFallback() {
  return <div aria-hidden className="rounded-2xl bg-white min-h-[720px]" style={{ border: `1px solid ${BB.line}` }} />;
}

/* The form: everything that needs the URL or the browser lives here, inside
   a Suspense boundary, so the rest of the page stays server-rendered. */
function ContactForm() {
  /* ?email= pre-fills, ?product= or ?source= pre-selects, ?topic= or #pricing sets the topic */
  const params = useSearchParams();
  const [v, setV] = useState<Fields>(() => {
    const s = params.get("source");
    const want = params.get("product") ?? (isSource(s) && s !== "website" ? SOURCES[s].label : null);
    const match = want ? PRODUCTS.find((x) => x.toLowerCase() === want.toLowerCase()) : undefined;
    return { name: "", email: params.get("email") ?? "", company: "", role: "", volume: "", product: match ?? PRODUCTS[0], message: "", website: "" };
  });
  const [topic, setTopic] = useState<string>(() => {
    const t = params.get("topic");
    const match = t ? TOPICS.find((x) => x.toLowerCase() === t.toLowerCase()) : undefined;
    if (match) return match;
    return typeof window !== "undefined" && window.location.hash === "#pricing" ? "Pricing" : TOPICS[0];
  });
  const [source] = useState<Source>(() => {
    const s = params.get("source");
    return isSource(s) ? s : "website";
  });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [ref, setRef] = useState("");
  const [fail, setFail] = useState("");
  const [token, setToken] = useState("");
  const [human, setHuman] = useState("");

  /* the signed form token: proves the form was rendered, and when */
  const loadToken = () =>
    fetch("/api/contact", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setToken(typeof d.token === "string" ? d.token : ""))
      .catch(() => {});

  useEffect(() => {
    loadToken();
    (window as unknown as Record<string, unknown>).bqTurnstile = (t: string) => setHuman(t);
  }, []);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => (k in p ? { ...p, [k]: undefined } : p));
  };

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!v.name.trim()) next.name = "Please add your name.";
    if (!v.email.trim()) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) next.email = "That email does not look right.";
    if (!v.message.trim()) next.message = "Tell us a little about what you need.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, topic, source, page: window.location.href, token, turnstile: human }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setRef(typeof data.id === "string" ? data.id.slice(0, 8).toUpperCase() : "");
        setState("sent");
        return;
      }
      if (res.status === 400) loadToken();
      if (data.errors) setErrors(data.errors);
      setFail(data.error ?? (data.errors ? "" : "Something went wrong on our side."));
      setState(data.errors ? "idle" : "failed");
    } catch {
      setFail("We could not reach the server. Check your connection and try again.");
      setState("failed");
    }
  }

  /* inputs: a 12px box, a 3:1 border, ink text, the global 2px focus ring
     plus a cobalt border on focus; an error doubles the border in red */
  const field = (bad?: string) =>
    `w-full min-h-12 rounded-[12px] px-4 py-2 font-sans-g t-base text-[#0E1116] bg-white border transition-[border-color] duration-150 focus:border-[#1F4FE6] disabled:opacity-45 disabled:cursor-not-allowed ${bad ? "border-[#B91C1C] border-2" : "border-[#8A8B94] hover:border-[#0E1116]"}`;

  const describe = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;
  const first = v.name.trim().split(/\s+/)[0];

  return (
    <div className="relative rounded-2xl bg-white p-6 sm:p-8" style={{ border: `1px solid ${BB.line}` }}>
      {state === "sent" ? (
        <div className="py-8" role="status">
          <Tile icon={I.check} size={64} />
          <h2 className="mt-8 font-head h-card" style={{ color: BB.ink }}>
            Thanks{first ? `, ${first}` : ""}. Your request is in.
          </h2>
          <p className="mt-4 font-sans-g t-base max-w-[48ch]" style={{ color: BB.ink3 }}>
            A person from our team will reply to <strong style={{ color: BB.ink }}>{v.email.trim()}</strong>.
          </p>
          {ref && (
            <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
              Reference{" "}
              <span className="font-mono-g font-medium tabular-nums" style={{ color: BB.ink }}>
                {ref}
              </span>
            </p>
          )}
          <div className="mt-8">
            <SqBtn href="/" tone="outline" arrow>
              Back to the home page
            </SqBtn>
          </div>
        </div>
      ) : (
        <form onSubmit={send} noValidate className="flex flex-col gap-8">
          {/* step 1: the topic routes the request to the right person */}
          <fieldset>
            <legend className="font-head h-card" style={{ color: BB.ink }}>
              What can we help with?
            </legend>
            <p className="mt-2 font-sans-g t-base" style={{ color: BB.ink3 }}>
              Choose one, so the right person replies.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOPICS.map((t) => {
                const on = t === topic;
                const info = TOPIC_INFO[t];
                return (
                  <label key={t} className="relative cursor-pointer">
                    <input type="radio" name="topic" value={t} checked={on} onChange={() => setTopic(t)} className="peer sr-only" />
                    <span
                      className={`flex h-full items-center gap-4 rounded-[12px] bg-white p-4 transition-[border-color] duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#2563EB] ${on ? "" : "hover:border-[#0E1116]"}`}
                      style={{ border: on ? `2px solid ${BB.cobalt}` : `1px solid ${BB.line}`, margin: on ? 0 : 1 }}
                    >
                      {info && <Tile icon={info.icon} size={40} />}
                      <span className="min-w-0 flex-1">
                        <span className="block font-sans-g t-base font-medium" style={{ color: BB.ink }}>
                          {t}
                        </span>
                        {info && (
                          <span className={`block ${HELP}`} style={{ color: BB.ink3 }}>
                            {info.d}
                          </span>
                        )}
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 grid place-items-center w-5 h-5 rounded-full"
                        style={{ background: on ? BB.cobalt : "transparent", border: on ? "none" : "1.5px solid #8A8B94", color: "#FFFFFF" }}
                      >
                        {on && <I.check size={12} weight="bold" />}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* step 2: who you are */}
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={LABEL} style={{ color: BB.ink }}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={v.name}
                onChange={set("name")}
                className={field(errors.name)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-err" : undefined}
              />
              <FieldError id="name-err" msg={errors.name} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={LABEL} style={{ color: BB.ink }}>
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={v.email}
                onChange={set("email")}
                className={field(errors.email)}
                aria-invalid={!!errors.email}
                aria-describedby={describe(errors.email ? "email-err" : "email-help")}
              />
              {errors.email ? (
                <FieldError id="email-err" msg={errors.email} />
              ) : (
                <p id="email-help" className={HELP} style={{ color: BB.ink3 }}>
                  We reply to this address.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className={LABEL} style={{ color: BB.ink }}>
                Company
                <Optional />
              </label>
              <input id="company" name="company" autoComplete="organization" value={v.company} onChange={set("company")} className={field()} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className={LABEL} style={{ color: BB.ink }}>
                Job title
                <Optional />
              </label>
              <input id="role" name="role" autoComplete="organization-title" value={v.role} onChange={set("role")} className={field()} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="product" className={LABEL} style={{ color: BB.ink }}>
                Product
              </label>
              <select id="product" name="product" value={v.product} onChange={set("product")} className={`${field()} appearance-none bq-select pr-10`}>
                {PRODUCTS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="volume" className={LABEL} style={{ color: BB.ink }}>
                Documents a month
                <Optional />
              </label>
              <select id="volume" name="volume" value={v.volume} onChange={set("volume")} className={`${field()} appearance-none bq-select pr-10`}>
                {VOLUMES.map((x) => (
                  <option key={x} value={x}>
                    {x || "Choose a range"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* step 3: the request itself */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className={LABEL} style={{ color: BB.ink }}>
              What are you trying to read?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={v.message}
              onChange={set("message")}
              placeholder={TOPIC_INFO[topic]?.eg ?? "Tell us what you are looking for."}
              className={`${field(errors.message)} resize-y placeholder:text-[#6B6C75]`}
              aria-invalid={!!errors.message}
              aria-describedby={describe(errors.message ? "message-err" : "message-help")}
            />
            {errors.message ? (
              <FieldError id="message-err" msg={errors.message} />
            ) : (
              <p id="message-help" className={HELP} style={{ color: BB.ink3 }}>
                The document types and rough volumes are enough to start.
              </p>
            )}
          </div>

          {/* honeypot: hidden from people and screen readers */}
          <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
          </div>

          {TURNSTILE_KEY && (
            <>
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
              <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-callback="bqTurnstile" data-theme="light" data-size="flexible" />
            </>
          )}

          {state === "failed" && (
            <p role="alert" className="rounded-[12px] bg-white px-4 py-4 font-sans-g t-base" style={{ color: RED, border: `2px solid ${RED}` }}>
              {fail} Please try again in a moment.
            </p>
          )}

          <div className="pt-8 flex flex-col sm:flex-row sm:items-center gap-4" style={{ borderTop: `1px solid ${BB.line}` }}>
            <BtnButton type="submit" variant="brand" size="lg" arrow loading={state === "sending"} className="w-full sm:w-auto">
              {state === "sending" ? "Sending" : "Send request"}
            </BtnButton>
            <p className={HELP} style={{ color: BB.ink3 }}>
              We use your details only to reply. See our{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-[#0E1116]">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactClient() {
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        {/* 1 + 2: the header, then the form with what happens next beside it */}
        <PageHero
          here="Contact"
          id="contact-h"
          title="Talk to the Blue-IQ team"
          lede="Book a demo on your own documents, ask about pricing, or scope a custom build."
        >
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 min-w-0">
              <Suspense fallback={<FormFallback />}>
                <ContactForm />
              </Suspense>
            </div>

            <aside aria-labelledby="next-h" className="lg:sticky lg:top-28">
              <h2 id="next-h" className="font-head h-card" style={{ color: BB.ink }}>
                What happens next
              </h2>
              <Stagger as="ol" className="mt-4">
                {NEXT.map((x, k) => (
                  <li key={x.t} className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 py-4" style={{ borderTop: `1px solid ${BB.line}` }}>
                    <span className="font-mono-g text-[13px] uppercase tracking-[0.06em] pt-1 tabular-nums" style={{ color: BB.cobalt }}>
                      0{k + 1}
                    </span>
                    <span>
                      <span className="block font-sans-g t-base font-medium" style={{ color: BB.ink }}>
                        {x.t}
                      </span>
                      <span className="block font-sans-g t-base" style={{ color: BB.ink3 }}>
                        {x.d}
                      </span>
                    </span>
                  </li>
                ))}
              </Stagger>
            </aside>
          </div>
        </PageHero>

        {/* 3: other ways in */}
        <section className={`${WRAP} py-24`} aria-labelledby="more-h">
          <Head id="more-h" title="Other ways in" />
          <Stagger as="ul" className="mt-12 grid md:grid-cols-3 gap-4">
            {MORE.map((x) => {
              const inner = (
                <>
                  <Tile icon={x.icon} />
                  <span className="mt-8 font-head h-card" style={{ color: BB.ink }}>
                    {x.t}
                  </span>
                  <span className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                    {x.d}
                  </span>
                  <span
                    className="mt-auto pt-8 inline-flex items-center gap-2 font-mono-g text-[13px] font-medium uppercase tracking-[0.06em]"
                    style={{ color: BB.cobalt }}
                  >
                    {x.cta}
                    <I.arrow size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
                  </span>
                </>
              );
              const cls =
                "group h-full flex flex-col rounded-2xl bg-white p-8 border border-[#D9DCE2] transition-[border-color] duration-200 hover:border-[#0E1116]";
              return (
                <li key={x.t}>
                  {x.href.startsWith("/") ? (
                    <Link href={x.href} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={x.href} className={cls}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </Stagger>
        </section>
      </main>
      <SiteFooter cta={false} />
    </div>
  );
}
