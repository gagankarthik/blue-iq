import { DATA_HANDLING } from "@/lib/trust";
import { pageMetadata, breadcrumbLd, webPageLd, faqLd, ldScript } from "@/lib/seo";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { ControlsTable } from "@/components/saas/Security";
import { DetailHeader, Block, FaqList, Glance, RouteLegend } from "@/components/page/blocks";
import { BB } from "@/lib/theme";
import { Stagger } from "@/components/home/motion";
import { I, Tile } from "@/components/home/icons";
import { TRUST_FAQS } from "@/components/saas/faqData";

/* /trust: how we protect your documents, the page a security reviewer
   opens first. Order: status at a glance (header) → every control, as a
   grid of cards → privacy: what happens to your content → human review:
   how accuracy is protected → security questions → close (request the
   documentation). States compliance exactly as the company does: aligned,
   not certified. */

const TITLE = "Trust Center: Security, Privacy and Compliance";
const DESC =
  "How Blue-IQ protects your documents: TLS in transit, SSO, role-based access, private workspaces, retention, and handling aligned to SOC 2, HIPAA and GDPR.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESC,
  path: "/trust",
  keywords: ["document AI security", "SOC 2 aligned", "HIPAA aligned", "GDPR", "data retention"],
});

/* one glyph per DATA_HANDLING card, same order */
const DATA_ICONS = [I.trust, I.docs, I.team, I.cloud];

export default function TrustPage() {
  return (
    <div className="overflow-x-clip" style={{ color: BB.ink }}>
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

        <Block seam id="controls" title="The controls in place today">
          <ControlsTable />
        </Block>

        <Block seam id="privacy" title="What happens to your content">
          <Stagger as="dl" className="grid md:grid-cols-2 gap-4">
            {DATA_HANDLING.map(([t, d], k) => (
              <div key={t} className="rounded-2xl bg-white p-8" style={{ border: `1px solid ${BB.line}` }}>
                <Tile icon={DATA_ICONS[k] ?? I.trust} size={40} />
                <dt className="mt-8 font-sans-g t-sub font-medium" style={{ color: BB.ink }}>
                  {t}
                </dt>
                <dd className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                  {d}
                </dd>
              </div>
            ))}
          </Stagger>
        </Block>

        <Block
          seam
          id="review"
          title="A wrong value that looks right is a security problem too"
          sub="Every value Sonar extracts carries its own confidence score. Anything under your review line goes to a person with the evidence attached, so an uncertain field never flows silently into your systems."
        >
          <div className="grid lg:grid-cols-2 gap-4 items-start">
            <RouteLegend
              rows={[
                { low: false, t: "At or above your review line", d: "Flows on to your systems." },
                { low: true, t: "Under your review line", d: "Goes to a person with the evidence attached." },
              ]}
            />
            <div className="rounded-2xl bg-white p-8" style={{ border: `1px solid ${BB.line}` }}>
              <Tile icon={I.scores} size={40} />
              <h3 className="mt-8 font-sans-g t-sub font-medium" style={{ color: BB.ink }}>
                You set the review line
              </h3>
              <p className="mt-4 font-sans-g t-base" style={{ color: BB.ink3 }}>
                You set the review line per workflow. Raising it sends more fields to review; lowering it lets more flow straight through. Either way, nothing
                is guessed.
              </p>
            </div>
          </div>
        </Block>

        <Block seam id="questions" title="Security questions, answered">
          <FaqList faqs={TRUST_FAQS} />
        </Block>
      </main>
      <SiteFooter cta={{ title: "Running a security review?", sub: "Tell us what your team needs and we will send our security documentation." }} />
    </div>
  );
}
