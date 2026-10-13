import Link from "next/link";
import { FAQS, TRUST_FAQS } from "@/components/saas/faqData";
import { pageMetadata, breadcrumbLd, webPageLd, faqLd, ldScript } from "@/lib/seo";
import { SA } from "@/lib/theme";
import { WRAP, PageHero, CARD, CARD_EDGE, SpotWell } from "@/components/page/kit";
import { FaqList } from "@/components/page/blocks";
import { Btn } from "@/components/system/Btn";
import { type Spot, SpotSonar, SpotRead, SpotSecure } from "@/components/icons/Spots";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* /faq — every question in one place, grouped by topic. A contents card
   sticks beside the answers on desktop and becomes a row of chips on
   mobile. Native <details>, so it works without JavaScript; one FAQPage
   block of structured data covers the lot. */

const TITLE = "Frequently Asked Questions";
const DESC =
  "Answers about Blue-IQ and Sonar: how documents are read and scored, what happens when a value is uncertain, integrations, formats, volume, security and custom builds.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/faq",
  keywords: ["Blue-IQ FAQ", "document AI questions", "Sonar AI", "confidence scoring", "document AI security"],
});

const pick = (re: RegExp) => FAQS.filter(([q]) => re.test(q));

const GROUPS: { id: string; t: string; d: string; Spot: Spot; faqs: [string, string][] }[] = [
  { id: "about", t: "Blue-IQ and Sonar", d: "Who we are and the AI under every product.", Spot: SpotSonar, faqs: pick(/What is Blue-IQ|What is Sonar/) },
  {
    id: "how",
    t: "How it works",
    d: "Reading, scoring, formats, volume and your systems.",
    Spot: SpotRead,
    faqs: pick(/cannot read|change our systems|document types|volume|none of your products/),
  },
  {
    id: "security",
    t: "Security and data",
    d: "Who sees your documents and how they are kept.",
    Spot: SpotSecure,
    faqs: [...pick(/data protected/), ...TRUST_FAQS],
  },
];

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.faqs);
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
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

        {/* mobile: topics as a scrolling row of chips */}
        <nav
          aria-label="FAQ topics"
          className="lg:hidden sticky top-[72px] z-10 border-y"
          style={{ background: "rgba(250,250,250,0.96)", borderColor: SA.line }}
        >
          <ul className={`${WRAP} flex gap-2 overflow-x-auto py-3`}>
            {GROUPS.map((g) => (
              <li key={g.id} className="shrink-0">
                <a
                  href={`#${g.id}`}
                  className="h-10 inline-flex items-center px-4 rounded-full bg-white font-sans-g text-[15px]"
                  style={{ color: SA.ink, border: `1px solid ${SA.line2}` }}
                >
                  {g.t}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${WRAP} py-12 sm:py-20 grid lg:grid-cols-[300px_minmax(0,1fr)] gap-10 lg:gap-14 items-start`}>
          {/* desktop: a contents card that stays in view */}
          <aside className="hidden lg:block sticky top-28">
            <nav aria-label="FAQ topics" className={`${CARD} p-3`} style={CARD_EDGE}>
              <p className="px-3 pt-2 pb-3 font-sans-g text-[13px] font-medium uppercase tracking-[0.12em]" style={{ color: SA.faint }}>
                Topics
              </p>
              <ul className="grid gap-1">
                {GROUPS.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="flex items-center gap-3 rounded-[14px] p-2 transition-colors duration-150 hover:bg-[#F5F5F7]">
                      <SpotWell size={44}>
                        <g.Spot size={30} />
                      </SpotWell>
                      <span className="min-w-0">
                        <span className="block font-sans-g text-[15px] font-medium" style={{ color: SA.ink }}>
                          {g.t}
                        </span>
                        <span className="block font-sans-g text-[13px]" style={{ color: SA.faint }}>
                          {g.faqs.length} questions
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="grid gap-16 sm:gap-20 min-w-0">
            {GROUPS.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-40 lg:scroll-mt-28" aria-labelledby={`${g.id}-h`}>
                <div className="flex items-center gap-4">
                  <SpotWell size={56}>
                    <g.Spot size={38} />
                  </SpotWell>
                  <div className="min-w-0">
                    <h2 id={`${g.id}-h`} className="font-display t-h2" style={{ color: SA.ink }}>
                      {g.t}
                    </h2>
                    <p className="mt-1 font-sans-g text-[15px]" style={{ color: SA.sub }}>
                      {g.d}
                    </p>
                  </div>
                </div>
                <div className="mt-6 [&>div]:max-w-none">
                  <FaqList faqs={g.faqs} />
                </div>
              </section>
            ))}

            <div className={`${CARD} p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5`} style={CARD_EDGE}>
              <div>
                <p className="font-sans-g text-[1.25rem] font-medium" style={{ color: SA.ink }}>
                  Still have a question?
                </p>
                <p className="mt-1 font-sans-g text-base" style={{ color: SA.sub }}>
                  A person from our team will reply. See also the{" "}
                  <Link href="/resources" className="underline underline-offset-4" style={{ color: "#2348B8" }}>
                    developer guide
                  </Link>
                  .
                </p>
              </div>
              <Btn href="/contact?topic=Something%20else" size="lg" className="w-full sm:w-auto shrink-0">
                Contact us
              </Btn>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter
        cta={{ title: "See Sonar on your own documents", sub: "Send us a few real files. We will read them live and answer your questions as we go." }}
      />
    </div>
  );
}
