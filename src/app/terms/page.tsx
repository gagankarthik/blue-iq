import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing use of the Blue-IQ platform and its products, Capture, Spend and Govern.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  { h: "Agreement to terms", body: ["These Terms & Conditions (the “Terms”) govern your access to and use of the Blue-IQ platform, websites, and products, including Capture, Spend and Govern (together, the “Service”). By accessing or using the Service, you agree to be bound by these Terms on behalf of yourself and the organization you represent.", "If you do not agree to these Terms, do not access or use the Service."] },
  { h: "The service", body: ["Blue-IQ provides document-intelligence software that extracts and structures data from resumes, contracts, and related documents. Specific features, limits, and support levels are described in your order form or subscription plan. We may update, add, or remove features over time; material changes will be communicated to account administrators."] },
  { h: "Accounts and eligibility", body: ["You must provide accurate account information and are responsible for activity that occurs under your credentials. You must be at least 18 years old and authorized to bind your organization. Keep your credentials confidential and notify us promptly of any unauthorized use."] },
  { h: "Subscriptions, fees, and billing", body: ["Paid plans are billed in advance on the cycle stated in your order form and renew automatically unless cancelled before the renewal date. Fees are exclusive of taxes, which you are responsible for. Except where required by law, payments are non-refundable. We may revise pricing with reasonable notice effective at your next renewal."] },
  { h: "Acceptable use", body: ["You agree not to misuse the Service, including by attempting to access it without authorization, interfering with its operation, reverse-engineering it, scraping data at scale, reselling it without permission, or using it to violate any law or third-party right. We may suspend access for conduct that threatens the security or integrity of the Service."] },
  { h: "Customer data and confidentiality", body: ["You retain all rights to the data you submit to the Service (“Customer Data”). You grant Blue-IQ a limited license to process Customer Data solely to provide and improve the Service, as described in our Privacy Policy and Data Processing Addendum. Each party will protect the other’s confidential information with reasonable care."] },
  { h: "Intellectual property", body: ["The Service, including its software, design, and documentation, is owned by Blue-IQ and its licensors and is protected by intellectual-property laws. These Terms grant you a non-exclusive, non-transferable right to use the Service during your subscription; no other rights are granted by implication."] },
  { h: "Third-party services", body: ["The Service may integrate with third-party tools such as CRM, ATS, ERP, and procurement systems. Your use of those tools is governed by their own terms, and Blue-IQ is not responsible for third-party services or content."] },
  { h: "Warranties and disclaimers", body: ["The Service is provided “as is” and “as available.” To the maximum extent permitted by law, Blue-IQ disclaims all implied warranties, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted or error-free."] },
  { h: "Limitation of liability", body: ["To the maximum extent permitted by law, neither party will be liable for indirect, incidental, special, or consequential damages. Blue-IQ’s total liability arising out of or related to the Service will not exceed the amounts you paid for the Service in the twelve months preceding the event giving rise to the claim."] },
  { h: "Indemnification", body: ["You agree to indemnify and hold Blue-IQ harmless from claims arising out of your Customer Data, your use of the Service in violation of these Terms, or your violation of applicable law or third-party rights."] },
  { h: "Term and termination", body: ["These Terms remain in effect while you use the Service. Either party may terminate for material breach not cured within 30 days of notice. On termination, your right to use the Service ends and we will make Customer Data available for export for 30 days, after which it may be deleted."] },
  { h: "Governing law and disputes", body: ["These Terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws rules. The parties will attempt to resolve disputes in good faith before pursuing formal proceedings in the courts located in Delaware, unless a binding arbitration agreement applies to your account."] },
  { h: "Changes to these terms", body: ["We may update these Terms from time to time. When we make material changes, we will notify account administrators and update the “Last updated” date above. Continued use of the Service after changes take effect constitutes acceptance."] },
  { h: "Contact", body: ["Questions about these Terms can be sent to hello@blue-iq.ai."] },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="11 July 2026"
      intro="The rules for using Blue-IQ and our products, forming a binding agreement between your organization and us. Please read them carefully."
      sections={sections}
    />
  );
}
