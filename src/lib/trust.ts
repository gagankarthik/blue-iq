/* Security controls, as data: shared by the home Security section and the
   Trust Center. Every line is a claim the company already makes publicly
   (site and privacy policy). Nothing here is a certification not held. */

export type Control = { icon: "shield" | "lock" | "fingerprint" | "key" | "folder" | "server" | "flag"; area: string; control: string; detail: string };

export const CONTROLS: Control[] = [
  {
    icon: "shield",
    area: "Compliance",
    control: "SOC 2, HIPAA and GDPR aligned",
    detail: "Handling aligned to all three, for clinical, financial and personal data.",
  },
  { icon: "lock", area: "Encryption", control: "TLS in transit", detail: "From your systems to ours and back." },
  { icon: "fingerprint", area: "Identity", control: "Single sign-on", detail: "Through your identity provider. Offboarding is instant." },
  { icon: "key", area: "Access", control: "Role-based access", detail: "People see only the projects they are on." },
  { icon: "folder", area: "Isolation", control: "Private workspaces", detail: "Projects isolated to the people you name." },
  { icon: "server", area: "Infrastructure", control: "Monitored cloud regions", detail: "Hardened hosting with redundancy." },
  { icon: "flag", area: "Accuracy", control: "Human review on low confidence", detail: "Values under your review line go to a person, never a guess." },
];

/* restated from the Privacy Policy */
export const DATA_HANDLING: [string, string][] = [
  ["Your content stays yours", "Customer content is processed only to deliver the service under your agreement. We do not sell personal information."],
  ["Retention you control", "Content is kept per your agreement and available for export for 30 days after termination, after which it may be deleted."],
  ["Subprocessors", "Service providers that help run the platform work under confidentiality obligations."],
  ["International transfers", "Where required, transfers are protected with safeguards such as Standard Contractual Clauses."],
];
