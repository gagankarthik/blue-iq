import { FAQS, TRUST_FAQS } from "@/components/saas/faqData";
import { pageMetadata, breadcrumbLd, webPageLd, faqLd, ldScript } from "@/lib/seo";
import { BB } from "@/lib/theme";
import { WRAP, PageHero } from "@/components/page/kit";
import { I, Tile, type Ico } from "@/components/home/icons";
import { Head } from "@/components/home/motion";
import { SqBtn } from "@/components/home/ui";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

/* /faq: one job, answer a question fast. Reading order:
     1. the header (what this page is + ask us directly),
     2. a contents list of the three topics (sticky beside the answers on
        desktop, a plain ruled list above them on phones),
     3. each topic as a section: heading, one line, then its questions as a
        ruled accordion in one white card,
     4. still have a question? one action.
   Native <details>, so it works without JavaScript; one FAQPage block of
   structured data covers the lot. */

const TITLE = "Frequently Asked Questions";
const DESC =
  "Answers about Blue-IQ and Sonar: how documents are read and scored, what happens to uncertain values, integrations, formats, security and custom builds.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/faq",
  keywords: ["Blue-IQ FAQ", "document AI questions", "Sonar AI", "confidence scoring", "document AI security"],
});

const pick = (re: RegExp) => FAQS.filter(([q]) => re.test(q));

const GROUPS: { id: string; t: string; d: string; icon: Ico; faqs: [string, string][] }[] = [
  { id: "about", t: "Blue-IQ and Sonar", d: "Who we are and the AI under every product.", icon: I.sonar, faqs: pick(/What is Blue-IQ|What is Sonar/) },
  {
    id: "how",
    t: "How it works",
    d: "Reading, scoring, formats, volume and your systems.",
    icon: I.scores,
    faqs: pick(/cannot read|change our systems|document types|volume|none of your products/),
  },
  {
    id: "security",
    t: "Security and data",
    d: "Who sees your documents and how they are kept.",
    icon: I.trust,
    faqs: [...pick(/data protected/), ...TRUST_FAQS],
  },
];

/* one question: a ruled row that opens in place */
function Question({ q, a, first }: { q: string; a: string; first: boolean }) {
  return (
    <details className="group" style={first ? undefined : { borderTop: `1px solid ${BB.line}` }}>
      <summary
        className="flex items-start justify-between gap-8 px-6 sm:px-8 py-6 cursor-pointer list-none font-sans-g t-base font-medium rounded-2xl [&::-webkit-details-marker]:hidden"
        style={{ color: BB.ink }}
      >
        <span>{q}</span>
        <span
          aria-hidden
          className="shrink-0 grid place-items-center w-8 h-8 rounded-[8px] transition-transform duration-200 group-open:rotate-90"
          style={{ background: BB.mist2, color: BB.cobalt }}
        >
          <I.arrow size={16} />
        </span>
      </summary>
      <p className="px-6 sm:px-8 pb-8 -mt-2 font-sans-g t-base max-w-[68ch]" style={{ color: BB.ink3 }}>
        {a}
      </p>
    </details>
  );
}

/* the topic list: same links on every width, sticky only on desktop */
function Contents() {
  return (
    <nav aria-labelledby="faq-topics-h">
      <p id="faq-topics-h" className="font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.ink3 }}>
        Topics
      </p>
      <ul className="mt-4">
        {GROUPS.map((g) => (
          <li key={g.id} style={{ borderTop: `1px solid ${BB.line}` }}>
            <a href={`#${g.id}`} className="group flex items-center gap-4 py-4">
              <Tile icon={g.icon} size={40} />
              <span className="min-w-0 flex-1">
                <span className="block font-sans-g t-base font-medium group-hover:underline underline-offset-4" style={{ color: BB.ink }}>
                  {g.t}
                </span>
                <span className="block font-mono-g text-[13px] uppercase tracking-[0.06em]" style={{ color: BB.ink3 }}>
                  {g.faqs.length} questions
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.faqs);
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(webPageLd({ name: TITLE, description: DESC, path: "/faq" }), breadcrumbLd("FAQ", "/faq"), faqLd(all))}
      />
      <SiteNav overDark={false} />
      <main id="main">
        <PageHero
          here="FAQ"
          id="faq-h"
          title="Frequently asked questions"
          lede="Straight answers about Blue-IQ, Sonar, and how we handle your documents. Can't find yours? Ask us directly."
          primary={{ label: "Ask a question", href: "/contact?topic=Something%20else" }}
          secondary={{ label: "Visit the Trust Center", href: "/trust" }}
        />

        <div aria-hidden className={WRAP}>
          <div className="h-px" style={{ background: BB.line }} />
        </div>

        <div className={`${WRAP} py-24 grid lg:grid-cols-[280px_minmax(0,1fr)] gap-16 items-start`}>
          <aside className="lg:sticky lg:top-28">
            <Contents />
          </aside>

          <div className="grid gap-24 min-w-0">
            {GROUPS.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28" aria-labelledby={`${g.id}-h`}>
                <Head id={`${g.id}-h`} title={g.t} sub={g.d} />
                <div className="mt-8 rounded-2xl bg-white" style={{ border: `1px solid ${BB.line}` }}>
                  {g.faqs.map(([q, a], k) => (
                    <Question key={q} q={q} a={a} first={k === 0} />
                  ))}
                </div>
              </section>
            ))}

            <section aria-labelledby="faq-more-h" className="rounded-2xl bg-white p-8" style={{ border: `1px solid ${BB.line}` }}>
              <h2 id="faq-more-h" className="font-head h-card" style={{ color: BB.ink }}>
                Still have a question?
              </h2>
              <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                A person from our team will reply. See also the{" "}
                <Link href="/resources" className="underline underline-offset-4" style={{ color: BB.cobalt }}>
                  developer guide
                </Link>
                .
              </p>
              <div className="mt-8">
                <SqBtn href="/contact?topic=Something%20else" tone="ink" arrow>
                  Contact us
                </SqBtn>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter
        cta={{ title: "See Sonar on your own documents", sub: "Send us a few real files. We will read them live and answer your questions as we go." }}
      />
    </div>
  );
}
