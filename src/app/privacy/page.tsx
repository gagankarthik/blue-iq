import { pageMetadata, breadcrumbLd, webPageLd, ldScript } from "@/lib/seo";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Blue-IQ collects, uses, shares, and protects personal information across its platform and products, including Capture, Spend and Govern.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    h: "Overview",
    body: [
      "This Privacy Policy explains how Blue-IQ (“we,” “us”) collects, uses, shares, and protects personal information when you use our platform, websites, and products, including Capture, Spend and Govern (the “Service”). It applies to visitors, customers, and the authorized users of our customers.",
    ],
  },
  {
    h: "Information we collect",
    body: [
      "Account information you provide, such as name, work email, company, and role.",
      "Usage data, such as log files, device and browser details, and how you interact with the Service.",
      "Content you upload or connect, such as resumes, statements of work, invoices, and integration data, processed on behalf of our customers.",
      "Cookies and similar technologies used to operate and improve the Service.",
    ],
  },
  {
    h: "The contact form on this website",
    body: [
      "When you send the contact form we store what you enter (name, work email, and optionally company, job title, product, topic, document volume and your message), plus the page you sent it from and your browser's user-agent string. We use it only to reply to you and to handle your request.",
      "Your IP address is used for a few minutes, in memory, to stop automated spam. It is not stored with your request. If our optional Cloudflare Turnstile check is switched on, Cloudflare processes browser signals to tell people from bots, under its own privacy policy.",
      "Requests are stored in Amazon Web Services (DynamoDB, United States). We keep them for as long as needed to handle the request and our relationship with you, and delete them on request.",
    ],
  },
  {
    h: "How we use information",
    body: [
      "We use information to provide, secure, and improve the Service; to authenticate users and prevent abuse; to provide support; to communicate about your account; and to comply with legal obligations. Where we act as a processor for customer content, we use it only to deliver the Service under our customer agreements.",
    ],
  },
  {
    h: "Legal bases",
    body: [
      "Where the GDPR or similar laws apply, we process personal information on the bases of performance of a contract, our legitimate interests in operating and securing the Service, your consent where required, and compliance with legal obligations.",
    ],
  },
  {
    h: "How we share information",
    body: [
      "We share information with service providers and subprocessors that help us operate the Service under confidentiality obligations; when required by law or to protect rights and safety; and in connection with a merger, acquisition, or asset sale. We do not sell personal information.",
    ],
  },
  {
    h: "Data retention",
    body: [
      "We retain personal information for as long as needed to provide the Service and for legitimate business or legal purposes. Customer content is retained according to the customer’s agreement and made available for export for 30 days after termination, after which it may be deleted.",
    ],
  },
  {
    h: "Security",
    body: [
      "We maintain administrative, technical, and physical safeguards designed to protect personal information. Documents move over TLS, projects sit in private workspaces isolated to the teammates you name, and access is role-based and authenticated through your own identity provider via SSO. Our handling is aligned to SOC 2, HIPAA, and GDPR. No method of transmission or storage is completely secure, but we work to protect information in line with industry standards.",
    ],
  },
  {
    h: "International transfers",
    body: [
      "We may process information in countries other than where you are located. Where required, we use appropriate safeguards such as Standard Contractual Clauses to protect international transfers.",
    ],
  },
  {
    h: "Your rights",
    body: [
      "Depending on your location, you may have rights to access, correct, delete, or port your personal information, and to object to or restrict certain processing. To exercise these rights, contact us through the form at blue-iq.ai/contact. If you are an authorized user of a Blue-IQ customer, please direct requests to that organization, which controls the relevant data.",
    ],
  },
  {
    h: "Cookies and tracking",
    body: [
      "This website does not use advertising or analytics cookies, and it does not track you across other sites. Browsing it sets no cookies. The contact form uses a short-lived signed token, not a cookie.",
      "Our products, once you sign in, use essential cookies to keep you signed in and secure. If we ever add analytics to this website, we will update this policy first and ask for your consent where the law requires it.",
    ],
  },
  {
    h: "Selling and sharing",
    body: ["We do not sell your personal information, and we do not share it for cross-context behavioural advertising."],
  },
  {
    h: "Children’s privacy",
    body: [
      "The Service is intended for business use and is not directed to children under 16. We do not knowingly collect personal information from children.",
    ],
  },
  {
    h: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. When we make material changes, we will update the “Last updated” date above and, where appropriate, provide additional notice.",
    ],
  },
  { h: "Contact", body: ["For privacy questions or requests, use the contact form at blue-iq.ai/contact and choose 'Something else'."] },
];

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(
          webPageLd({
            name: "Privacy Policy",
            description:
              "How Blue-IQ collects, uses, shares, and protects personal information across its platform and products, including Capture, Spend and Govern.",
            path: "/privacy",
          }),
          breadcrumbLd("Privacy Policy", "/privacy")
        )}
      />
      <LegalPage
        title="Privacy Policy"
        updated="13 October 2026"
        intro="What we collect, how we use it, and the rights and choices you have across the Blue-IQ platform and its products."
        sections={sections}
      />
    </>
  );
}
