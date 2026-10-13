import { DATA_HANDLING } from "@/lib/trust";
import { pageMetadata, breadcrumbLd, webPageLd, faqLd, ldScript } from "@/lib/seo";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { ControlsTable } from "@/components/saas/Security";
import { DetailHeader, Block, FaqList, Glance } from "@/components/page/blocks";
import { SA } from "@/lib/theme";
import { TRUST_FAQS } from "@/components/saas/faqData";

/* /trust — the page a security reviewer opens first.
   Order: status at a glance → controls → data handling → how accuracy is
   protected → how to request documentation or report an issue → questions.
   States compliance exactly as the company does: aligned, not certified. */

const TITLE = "Trust Center: Security, Privacy and Compliance";
const DESC =
  "How Blue-IQ protects your documents: TLS in transit, SSO and role-based access, private workspaces, data handling and retention, and handling aligned to SOC 2, HIPAA and GDPR.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/trust",
  keywords: ["document AI security", "SOC 2 aligned", "HIPAA aligned", "GDPR", "data retention"],
});

export default function TrustPage() {
  return (
    <div className="overflow-x-clip" style={{ background: SA.bg, color: SA.ink }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(
          webPageLd({ name: TITLE, description: DESC, path: "/trust" }),
          breadcrumbLd("Trust Center", "/trust"),
          faqLd(TRUST_FAQS)
        )}
      />
      <SiteNav overDark={false} />
      <main id="main">
        <DetailHeader
          here="Trust Center"
          eyebrow="Security and privacy"
          title="How we protect the documents you trust us with"
          lede="Clinical records, contracts and financial data are some of the most sensitive files a business holds. Here is exactly how we handle them."
          primary={{ label: "Request security documentation", href: "/contact?topic=Security%20review" }}
          secondary={{ label: "Read the privacy policy", href: "/privacy" }}
          aside={
            <Glance
              title="Status"
              rows={[
                ["Compliance", "SOC 2, HIPAA and GDPR aligned"],
                ["In transit", "TLS"],
                ["Sign-in", "SSO through your identity provider"],
                ["Isolation", "Private workspaces"],
              ]}
            />
          }
        />

        <Block kicker="Controls" title="The controls in place today">
          <ControlsTable />
        </Block>

        <Block tone="tint" kicker="Data handling" title="What happens to your content">
          <dl className="grid md:grid-cols-2 gap-3">
            {DATA_HANDLING.map(([t, d]) => (
              <div key={t} className="rounded-[24px] bg-white p-7" style={{ border: `1px solid ${SA.line}` }}>
                <dt className="font-sans-g text-[1.125rem] font-medium" style={{ color: SA.ink }}>
                  {t}
                </dt>
                <dd className="mt-2 font-sans-g text-base leading-[1.6]" style={{ color: SA.sub }}>
                  {d}
                </dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block
          kicker="Accuracy"
          title="A wrong value that looks right is a security problem too"
          sub="Every value Sonar extracts carries its own confidence score. Anything under your review line goes to a person with the evidence attached, so an uncertain field never flows silently into your systems."
        >
          <p className="mx-auto text-center font-sans-g text-base leading-[1.6] max-w-[60ch]" style={{ color: SA.sub }}>
            You set the review line per workflow. Raising it sends more fields to review; lowering it lets more flow straight through. Either way, nothing is
            guessed.
          </p>
        </Block>

        <Block tone="tint" kicker="Questions" title="Security questions, answered">
          <FaqList faqs={TRUST_FAQS} />
        </Block>
      </main>
      <SiteFooter cta={{ title: "Running a security review?", sub: "Tell us what your team needs and we will send our security documentation." }} />
    </div>
  );
}
