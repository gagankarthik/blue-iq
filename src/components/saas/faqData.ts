/* Real questions an enterprise buyer asks before a pilot. Answers stay
   inside what the company already claims: no invented numbers or customers.
   Shared with the page, which emits matching FAQPage structured data. */
export const FAQS: [string, string][] = [
  [
    "What is Blue-IQ?",
    "Blue-IQ is a document AI platform. Its products, Capture, Spend and Govern, turn contracts, invoices, resumes and licences into structured data, reconcile spend and review contract risk. Campus and Workforce editions package them for higher education and for staffing and healthcare.",
  ],
  [
    "What is Sonar?",
    "Sonar is the AI inside every Blue-IQ product. It reads a document the way a person would, extracts each field, scores its confidence in every value, and flags anything it cannot read instead of guessing.",
  ],
  [
    "What happens when the engine cannot read a field?",
    "It flags it. Every value comes back with a confidence score, and anything the engine is unsure of is sent for review rather than guessed. A wrong value that looks confident costs far more than a field marked for a person to check.",
  ],
  [
    "Do we have to change our systems to use it?",
    "No. Sonar returns schema-validated JSON over a documented REST API and signed webhooks, plus native connectors, so the output lands in the ATS, ERP, CRM or warehouse you already run.",
  ],
  [
    "What document types can it handle?",
    "PDFs, DOCX, images and exports, including scans and pages photographed on a phone, which go through OCR first. If your team can read it, the engine is built to read it.",
  ],
  ["How does it handle volume?", "Up to 200 documents per API call, with throughput that holds steady across batches."],
  [
    "How is our data protected?",
    "Documents move over TLS, projects stay isolated in private workspaces, access is controlled by role and by single sign-on through your identity provider, and personal data is handled to GDPR standards. Our handling is aligned to SOC 2, HIPAA and GDPR.",
  ],
  [
    "What if none of your products fit our workflow?",
    "Then we build the one that does. Custom builds run on the same engine, are shaped around how your team works, and are engineered and supported by us.",
  ],
];

/* Security questions: shown on /trust and in the security group on /faq. */
export const TRUST_FAQS: [string, string][] = [
  [
    "Are you SOC 2 certified?",
    "Our handling is aligned to SOC 2, HIPAA and GDPR. We describe it as aligned because that is accurate; ask us for our security documentation as part of your review.",
  ],
  [
    "Who can see our documents?",
    "Only the people you name. Projects sit in private workspaces, access is role-based, and sign-in runs through your identity provider.",
  ],
  ["How long do you keep our data?", "Per your agreement. After termination, content is available for export for 30 days, after which it may be deleted."],
  ["How do we report a security issue?", "Use the contact form and choose 'Security review'. A person will respond."],
];
