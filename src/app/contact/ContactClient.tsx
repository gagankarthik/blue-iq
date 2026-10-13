"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { SA } from "@/lib/theme";
import { SOURCES, TOPICS, isSource, type Source } from "@/lib/contacts";
import { WRAP, Crumbs, Wash, SpotWell } from "@/components/page/kit";
import { BtnButton } from "@/components/system/Btn";
import { IconCheck, IconArrow } from "@/components/icons/BqIcons";
import {
  type Spot,
  SpotChat,
  SpotRead,
  SpotScore,
  SpotCapture,
  SpotSecure,
  SpotCustom,
  SpotSonar,
  SpotSpend,
  SpotTeam,
  SpotFaq,
} from "@/components/icons/Spots";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ────────────────────────────────────────────────────────────────
   /contact — a split navy header with the form in it, so the form is the
   first thing on screen at every width.

   Every request is saved to the shared `blue-iq-contacts-form` table through
   POST /api/contact. A product that links here passes ?source=govern (or
   capture, spend…) and the record says so; ?email= pre-fills the field
   from the home page CTA; ?product= pre-selects the product.
   ──────────────────────────────────────────────────────────────── */

/* Cloudflare Turnstile switches on when its site key is set */
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const PRODUCTS = ["Not sure yet", "Capture", "Spend", "Govern", "Campus edition", "Workforce edition", "Custom build"];
const VOLUMES = ["", "Under 1,000", "1,000 to 10,000", "10,000 to 100,000", "Over 100,000"];

/* each topic as a card: a spot, one line, and the example the message box shows */
const TOPIC_INFO: Record<string, { Spot: Spot; d: string; eg: string }> = {
  "A demo": { Spot: SpotSonar, d: "Sonar on your own files", eg: "For example: 2,000 vendor invoices a month, mostly scanned PDFs." },
  Pricing: { Spot: SpotSpend, d: "Plans for your volume", eg: "For example: around 5,000 contracts a year across two teams." },
  "A custom build": { Spot: SpotCustom, d: "Built on Sonar for you", eg: "For example: we need credential checks pulled from licence scans into our ATS." },
  "Security review": { Spot: SpotSecure, d: "Controls and documentation", eg: "For example: our security team needs your data handling and access details." },
  Support: { Spot: SpotTeam, d: "Help with a product", eg: "For example: which product, what happened, and when." },
  "Something else": { Spot: SpotFaq, d: "Any other question", eg: "Tell us what you are looking for." },
};

const NEXT: { Spot: Spot; t: string; d: string }[] = [
  { Spot: SpotChat, t: "A person reads your request", d: "Someone from our team, not a bot." },
  { Spot: SpotRead, t: "You share a few real documents", d: "The messy ones are the useful ones." },
  { Spot: SpotScore, t: "We read them with Sonar, live", d: "Every field, every score, every flag." },
];

const MORE: { Spot: Spot; t: string; d: string; href: string; cta: string }[] = [
  {
    Spot: SpotCapture,
    t: "Already a customer?",
    d: "Sign in to your product, or send us a support request with the form above.",
    href: "https://www.parsinglab.blue-iq.ai/",
    cta: "Open Capture",
  },
  {
    Spot: SpotSecure,
    t: "Security review",
    d: "Controls, data handling and compliance, in one place for your security team.",
    href: "/trust",
    cta: "Visit the Trust Center",
  },
  {
    Spot: SpotCustom,
    t: "Scoping a custom build?",
    d: "See how we build document AI apps, migrations and integrations on Sonar.",
    href: "/solutions#custom",
    cta: "Custom builds",
  },
];

type Fields = { name: string; email: string; company: string; role: string; volume: string; product: string; message: string; website: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const LABEL = "font-sans-g text-[14px] font-medium";

/* an inline field error: icon and words, never colour alone */
function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="font-sans-g t-meta" style={{ color: SA.red }}>
      <span aria-hidden>⚠ </span>
      {msg}
    </p>
  );
}

/* while the form reads the URL, the card keeps its shape */
function FormFallback() {
  return <div aria-hidden className="rounded-[28px] bg-white min-h-[680px]" style={{ border: `1px solid ${SA.line}` }} />;
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

  const field = (bad?: string) =>
    `w-full min-h-12 rounded-[12px] px-4 py-2.5 font-sans-g text-base text-[#1F1F1F] bg-white border transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-[#2F5FE0] focus:shadow-[0_0_0_4px_rgba(47,95,224,0.16)] disabled:opacity-45 disabled:cursor-not-allowed ${bad ? "border-[#B91C1C] border-2" : "border-[#8A8B94] hover:border-[#1F1F1F]"}`;

  const first = v.name.trim().split(/\s+/)[0];

  /* right: the form */
  return (
    <div
      className="rounded-[32px] p-2"
      style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 40px 80px -48px rgba(30,40,90,0.45)" }}
    >
      <div className="relative rounded-[26px] bg-white p-6 sm:p-10" style={{ border: `1px solid ${SA.line}` }}>
        {state === "sent" ? (
          <div className="py-6 sm:py-10" role="status">
            <span className="grid place-items-center w-14 h-14 rounded-full" style={{ background: "#ECFDF5", color: "#065F46" }}>
              <IconCheck size={26} />
            </span>
            <h2 className="mt-6 font-display t-h2" style={{ color: SA.ink }}>
              Thanks{first ? `, ${first}` : ""}. Your request is in.
            </h2>
            <p className="mt-3 font-sans-g text-[15.5px] leading-[1.6] max-w-[44ch]" style={{ color: SA.sub }}>
              A person from our team will reply to <strong style={{ color: SA.ink }}>{v.email.trim()}</strong>.
            </p>
            {ref && (
              <p className="mt-6 font-sans-g text-[14px]" style={{ color: SA.faint }}>
                Reference{" "}
                <span className="font-mono-g font-medium tabular-nums" style={{ color: SA.ink }}>
                  {ref}
                </span>
              </p>
            )}
            <Link href="/" className="group mt-8 inline-flex items-center gap-2 font-sans-g text-[15px] font-medium" style={{ color: "#2348B8" }}>
              Back to the home page <IconArrow size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ) : (
          <form onSubmit={send} noValidate className="flex flex-col gap-5">
            <fieldset>
              <legend className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                What can we help with?
              </legend>
              <p className="mt-1 font-sans-g text-[14px]" style={{ color: SA.faint }}>
                Choose one, so the right person replies.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TOPICS.map((t) => {
                  const on = t === topic;
                  const info = TOPIC_INFO[t];
                  return (
                    <label key={t} className="relative cursor-pointer">
                      <input type="radio" name="topic" value={t} checked={on} onChange={() => setTopic(t)} className="peer sr-only" />
                      <span
                        className={`flex h-full flex-col gap-3 rounded-[16px] p-3.5 sm:p-4 transition-[border-color,background-color,box-shadow] duration-150 peer-focus-visible:shadow-[0_0_0_4px_rgba(47,95,224,0.25)] ${on ? "bg-[#F5F8FF]" : "bg-white hover:border-[#8A8B94]"}`}
                        style={{ border: on ? "2px solid #2F5FE0" : "1px solid #DEDEE3", margin: on ? 0 : 1 }}
                      >
                        <span className="flex items-start justify-between">
                          <span className="grid place-items-center w-11 h-11 rounded-[12px]" style={{ background: on ? "#FFFFFF" : "#EEF3FF" }}>
                            {info && <info.Spot size={30} />}
                          </span>
                          <span
                            aria-hidden
                            className="grid place-items-center w-5 h-5 rounded-full transition-colors duration-150"
                            style={{ background: on ? "#2F5FE0" : "transparent", border: on ? "none" : "1.5px solid #8A8B94", color: "#FFFFFF" }}
                          >
                            {on && <IconCheck size={12} />}
                          </span>
                        </span>
                        <span>
                          <span className="block font-sans-g text-[15px] font-medium leading-snug" style={{ color: SA.ink }}>
                            {t}
                          </span>
                          {info && (
                            <span className="block mt-0.5 font-sans-g text-[13px] leading-snug" style={{ color: SA.faint }}>
                              {info.d}
                            </span>
                          )}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className={LABEL} style={{ color: SA.ink }}>
                  Full name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  value={v.name}
                  onChange={set("name")}
                  className={field(errors.name)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-err" : undefined}
                />
                <FieldError id="name-err" msg={errors.name} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className={LABEL} style={{ color: SA.ink }}>
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={v.email}
                  onChange={set("email")}
                  className={field(errors.email)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                />
                <FieldError id="email-err" msg={errors.email} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className={LABEL} style={{ color: SA.ink }}>
                  Company{" "}
                  <span className="font-normal" style={{ color: SA.faint }}>
                    (optional)
                  </span>
                </label>
                <input id="company" autoComplete="organization" value={v.company} onChange={set("company")} className={field()} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="role" className={LABEL} style={{ color: SA.ink }}>
                  Job title{" "}
                  <span className="font-normal" style={{ color: SA.faint }}>
                    (optional)
                  </span>
                </label>
                <input id="role" autoComplete="organization-title" value={v.role} onChange={set("role")} className={field()} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="product" className={LABEL} style={{ color: SA.ink }}>
                  Product
                </label>
                <select id="product" value={v.product} onChange={set("product")} className={`${field()} appearance-none bq-select pr-10`}>
                  {PRODUCTS.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="volume" className={LABEL} style={{ color: SA.ink }}>
                  Documents a month{" "}
                  <span className="font-normal" style={{ color: SA.faint }}>
                    (optional)
                  </span>
                </label>
                <select id="volume" value={v.volume} onChange={set("volume")} className={`${field()} appearance-none bq-select pr-10`}>
                  {VOLUMES.map((x) => (
                    <option key={x} value={x}>
                      {x || "Choose a range"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className={LABEL} style={{ color: SA.ink }}>
                What are you trying to read?
              </label>
              <textarea
                id="message"
                rows={4}
                value={v.message}
                onChange={set("message")}
                placeholder={TOPIC_INFO[topic]?.eg ?? "Tell us what you are looking for."}
                className={`${field(errors.message)} resize-y placeholder:text-[#6B6C75]`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-err" : undefined}
              />
              <FieldError id="message-err" msg={errors.message} />
            </div>

            {/* honeypot: hidden from people and screen readers */}
            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
            </div>

            {TURNSTILE_KEY && (
              <>
                <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
                <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-callback="bqTurnstile" data-theme="light" data-size="flexible" />
              </>
            )}

            {state === "failed" && (
              <p
                role="alert"
                className="rounded-[10px] px-4 py-3 font-sans-g text-[14px]"
                style={{ background: "#FDF1EE", color: "#8A2F1C", border: "1px solid #F3C9BE" }}
              >
                {fail} Please try again in a moment.
              </p>
            )}

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-4">
              <BtnButton type="submit" size="lg" arrow loading={state === "sending"}>
                {state === "sending" ? "Sending" : "Send request"}
              </BtnButton>
              <p className="font-sans-g text-[13px] leading-[1.5]" style={{ color: SA.faint }}>
                We use your details only to reply. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-[#1F1F1F]">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactClient() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav overDark={false} />
      <main id="main">
        {/* header and form, on the wash */}
        <section className="relative isolate" aria-labelledby="contact-h">
          <Wash tall />
          <div className={`${WRAP} pt-32 sm:pt-40 pb-16 grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-start`}>
            <div className="lg:pt-4">
              <Crumbs here="Contact" />
              <h1 id="contact-h" className="mt-6 font-display t-display max-w-[14ch]" style={{ color: SA.ink }}>
                Talk to the Blue-IQ team
              </h1>
              <p className="mt-5 font-sans-g text-[1.125rem] sm:text-[1.25rem] leading-[1.6] max-w-[40ch]" style={{ color: "#3A3B44" }}>
                Book a demo on your own documents, ask about pricing, or scope a custom build.
              </p>

              <p className="mt-12 font-sans-g text-[13px] font-medium uppercase tracking-[0.12em]" style={{ color: "#4A4B53" }}>
                What happens next
              </p>
              <ol className="mt-4 grid gap-3">
                {NEXT.map((x, k) => (
                  <li key={x.t} className="flex items-center gap-4 rounded-[20px] bg-white p-4" style={{ border: `1px solid ${SA.line}` }}>
                    <SpotWell size={56}>
                      <x.Spot size={38} />
                    </SpotWell>
                    <span className="min-w-0">
                      <span className="block font-sans-g text-[16px] font-medium" style={{ color: SA.ink }}>
                        <span className="font-mono-g text-[13px] mr-2" style={{ color: SA.faint }}>
                          0{k + 1}
                        </span>
                        {x.t}
                      </span>
                      <span className="block mt-0.5 font-sans-g text-[14.5px]" style={{ color: SA.sub }}>
                        {x.d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </div>
        </section>

        {/* other ways in */}
        <section className={`${WRAP} pt-8 pb-24 sm:pb-32`} aria-labelledby="more-h">
          <h2 id="more-h" className="text-center font-display t-h1" style={{ color: SA.ink }}>
            Other ways in
          </h2>
          <ul className="mt-12 grid md:grid-cols-3 gap-3">
            {MORE.map((x) => (
              <li key={x.t}>
                <a
                  href={x.href}
                  className="group h-full flex flex-col rounded-[24px] bg-white p-7 sm:p-8 transition-[border-color,box-shadow] duration-200 hover:border-[#D4D4DA] hover:shadow-[0_16px_32px_-24px_rgba(30,33,48,0.3)]"
                  style={{ border: `1px solid ${SA.line}` }}
                >
                  <SpotWell>
                    <x.Spot size={56} />
                  </SpotWell>
                  <span className="mt-6 font-sans-g text-[1.25rem] font-medium" style={{ color: SA.ink }}>
                    {x.t}
                  </span>
                  <span className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
                    {x.d}
                  </span>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 font-sans-g text-[15px] font-medium" style={{ color: "#2348B8" }}>
                    {x.cta}
                    <IconArrow size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter cta={false} />
    </div>
  );
}
