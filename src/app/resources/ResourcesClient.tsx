"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SA } from "@/lib/theme";
import { SectionHead } from "@/components/saas/parts";
import { SPRING_SOFT } from "@/components/saas/motion";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PageHero, Band, Ruled,  Cta, WRAP } from "@/components/page/kit";

/* ────────────────────────────────────────────────────────────────
   /resources — the honest version.

   The nav promises Documentation, API reference, Guides, Customer stories,
   Webinars & events, Results & ROI. Four of those six do not exist. The old
   page shipped a nine-card grid where every card linked to /contact — a
   library with no books in it, including a "Customer stories" card for a
   company with no customers it can name.

   What is left is what is true: how the engine takes input, what it hands
   back, how you connect to it, how the data is handled, and the questions
   buyers actually ask. Nothing here is a placeholder for a thing we have
   not built. Anything that could only exist by inventing a customer, a
   logo, a number, or an event was cut rather than dressed as "coming soon".
   ──────────────────────────────────────────────────────────────── */

/* how you connect — all of this exists today */
const integration: { t: string; d: string }[] = [
  {
    t: "Schema-validated JSON",
    d: "Every read comes back against a schema, so the shape of the response is a contract rather than a surprise. If a field is in the schema, it is in the payload — with a value, or with a flag saying the engine could not read it.",
  },
  {
    t: "A documented REST API",
    d: "Authenticate, post documents, get structured records. Up to 200 documents in a single call, with a sub-second median read.",
  },
  {
    t: "Signed webhooks",
    d: "Long jobs do not need polling. We sign the callback, you verify it, and the result lands in your system the moment it is ready.",
  },
  {
    t: "Native connectors",
    d: "The output goes into the ATS, CRM, or warehouse you already run. There is no export step, no CSV in the middle, and nothing for your team to re-key.",
  },
  {
    t: "Custom builds",
    d: "If the shape of your workflow does not fit Capture, Spend or Govern, we build the one that does — same engine, engineered and supported by us.",
  },
];

/* what you can hand it */
const inputs: { t: string; d: string }[] = [
  {
    t: "PDF and DOCX",
    d: "The everyday cases: exports, generated documents, and the master agreement someone sent as a Word file with tracked changes still in it.",
  },
  {
    t: "Images and scans",
    d: "Scanned paper goes through OCR before the read, so a document that was never digital to begin with is still a document.",
  },
  {
    t: "Photographed on a phone",
    d: "A page held under a desk lamp and shot at an angle. It is how a lot of documents actually arrive, so it is a first-class input, not an edge case.",
  },
];

/* What the score means where you actually consume it. /about#sonar argues WHY
   the engine scores itself; this is what that costs and buys you in code. */
const behaviour: { t: string; d: string }[] = [
  {
    t: "The score is per field, not per document",
    d: "One number for the whole file would tell you nothing useful. A licence number you can act on and an expiry date the engine squinted at are two different facts, and they arrive as two different scores.",
  },
  {
    t: "Route on it, don't just display it",
    d: "Pick a threshold and let the score do the triage: auto-accept above it, queue the rest for a human. That single branch is the difference between a pipeline that runs unattended and one that someone checks by hand.",
  },
  {
    t: "A flagged field is not an error",
    d: "It is a value the engine declined to invent. Your code should expect it, and treat it as work routed to a person — not as a failed call to retry.",
  },
];




export default function ResourcesClient() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <SiteNav />

      <main>
        <PageHero
          title="Everything you need to read a document with us."
          lede="What the engine takes, what it hands back, how you connect to it, and how your documents are handled — written down rather than promised."
          meta={["REST API", "Signed webhooks", "OCR", "Sonar engine"]}
        />

        {/* ── connecting ── */}
        <Band tone="grey" id="api">
          <SectionHead
            title="Getting it into what you already run"
            sub="Sonar is a read, not a destination. The result belongs in your systems, so everything here exists to get it there without a person in the middle."
          />
          <Ruled rows={integration} />

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ ...SPRING_SOFT, delay: 0.1 }}
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-x-10 gap-y-4"
          >
            <Cta href="https://www.parsinglab.blue-iq.ai/" label="Capture" external />
            <Cta href="https://govern.blue-iq.ai/" label="Govern" external />
            <p className="font-sans-g text-[14.5px] leading-[1.6] sm:ml-auto max-w-[42ch]" style={{ color: SA.faint }}>
              There is no public docs portal yet. The API reference goes out with your keys — ask us and we will send
              both.
            </p>
          </motion.div>
        </Band>

        {/* ── input and output ── */}
        <Band tone="white" id="formats">
          <SectionHead
            title="Hand it the document as it actually arrives"
            sub="Not the clean version you wish you had. The scan, the photo, the export nobody can open."
          />
          <Ruled rows={inputs} />
          {/* the four-stat strip lived here too. It is on /about#sonar, which
              owns the engine's case, and nowhere else — a reader who has walked
              the site had met those same four numbers on four pages. */}
        </Band>

        {/* ── what an integration actually has to handle ──
            This is the one thing only /resources can say: the engine's output
            has a shape, and the shape has consequences for the code you write
            against it. It is not the confidence *argument* (that is /about's
            job) — it is what confidence means at the call site. ── */}
        <Band tone="grey" id="confidence">
          <SectionHead
            title="Writing code against a score"
            sub="Every field comes back with a confidence, which means your integration gets to make a decision rather than a leap of faith."
          />
          <Ruled rows={behaviour} />
          <div className="mt-10">
            <Cta href="/about#sonar" label="Why the engine scores its own work" />
          </div>
        </Band>

        {/* Three sections used to sit here and none of them belonged to this
            page: a security ledger with the same headline and the same rows as
            the home page, an FAQ that was the home page's six questions
            reworded, and a confidence argument already made on /about#sonar.
            Reading the site end-to-end, you met all three twice. They now live
            in exactly one place each, and this page points at them. */}
        <Band tone="white">
          <SectionHead
            title="The rest of it lives elsewhere"
            sub="Rather than say the same things again in different words, here is where each answer actually is."
          />
          <div className="mt-14 grid sm:grid-cols-3 gap-x-10 gap-y-10">
            {[
              { t: "How your documents are handled", d: "TLS, private workspaces, role-based access and SSO, with the full privacy terms.", href: "/privacy", label: "Security & privacy" },
              { t: "Why it scores itself", d: "The one opinion the engine holds, and the four numbers behind it.", href: "/about#sonar", label: "The Sonar engine" },
              { t: "Everything else", d: "A security questionnaire, a schema to match, a document type you do not see here.", href: "/contact", label: "Ask a person" },
            ].map((c) => (
              <div key={c.t} className="pt-6" style={{ borderTop: `1px solid ${SA.line2}` }}>
                <h3
                  className="font-display font-normal leading-[1.25]"
                  style={{ fontSize: "1.25rem", letterSpacing: "-0.025em", color: SA.ink }}
                >
                  {c.t}
                </h3>
                <p className="mt-3 font-sans-g text-[15px] leading-[1.7]" style={{ color: SA.sub }}>
                  {c.d}
                </p>
                <div className="mt-5">
                  <Cta href={c.href} label={c.label} />
                </div>
              </div>
            ))}
          </div>
        </Band>

        {/* ── the close ── */}
        <Band tone="tint">
          <div className={`${WRAP} !px-0`}>
            <div className="max-w-[720px]">
              <motion.h2
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={SPRING_SOFT}
                className="font-display font-normal leading-[1.06]"
                style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.4rem)", letterSpacing: "-0.032em", color: SA.ink }}
              >
                Anything this page did not answer, a person will.
              </motion.h2>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ ...SPRING_SOFT, delay: 0.1 }}
                className="mt-6 font-sans-g leading-[1.75] max-w-[54ch]"
                style={{ fontSize: "1.05rem", color: SA.sub }}
              >
                A security questionnaire, a schema you need matched, a document type you do not see covered here. Tell
                us what you are trying to read and we will tell you plainly whether we can read it.
              </motion.p>
              <div className="mt-9">
                <Cta href="/contact" label="Talk to us" />
              </div>
            </div>
          </div>
        </Band>
      </main>

      <SiteFooter />
    </div>
  );
}
