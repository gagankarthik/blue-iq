/* The six sectors, shared by the home page tabs, /solutions, the industry
   pages (/solutions/[id]), structured data and the nav. */

export type IndustryId = "it" | "education" | "workforce" | "healthcare" | "legal" | "procurement";

export type Industry = {
  id: IndustryId;
  name: string;
  /** who it is for, as a subject ("IT teams") and as a modifier ("IT") */
  audience: string;
  noun: string;
  /** one-line job, used in indexes */
  line: string;
  /** the headline used when a sector has the page to itself */
  h: string;
  d: string;
  reads: string[];
  out: string[];
  /** SEO for /solutions/[id] */
  title: string;
  description: string;
  problem: string;
  faqs: [string, string][];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "it",
    audience: "IT teams",
    noun: "IT",
    name: "IT sector",
    line: "Vendor contracts and licences under control.",
    h: "Vendor contract and licence management, automated.",
    d: "Renewal dates, liability caps and licence counts extracted from every MSA and SOW.",
    reads: ["Master service agreements", "Statements of work", "Vendor invoices", "Software entitlements"],
    out: ["Renewal calendar", "Licence counts", "Rate drift"],
    title: "Document AI for IT: Vendor Contracts and Licences",
    description: "Extract renewal dates, liability caps and licence counts from every MSA, SOW and vendor invoice, and catch licence overages before renewal.",
    problem:
      "IT teams hold hundreds of vendor agreements, each with its own renewal window, cap and entitlement. Missed notice periods and unused seats cost real money.",
    faqs: [
      [
        "Can it track renewal notice periods?",
        "Yes. Renewal dates and notice periods are extracted from each agreement and scored, so nothing auto-renews unnoticed.",
      ],
      ["Does it compare licences to invoices?", "Yes. Spend checks billed seats and units against what each licence allows."],
    ],
  },
  {
    id: "education",
    audience: "Universities and colleges",
    noun: "education",
    name: "Education",
    line: "Applications into clean student records.",
    h: "Admissions and transcript processing without data entry.",
    d: "Applications and transcripts read into records your student information system can use.",
    reads: ["Admissions applications", "Transcripts", "Supplier agreements", "Grant paperwork"],
    out: ["Student records", "Course histories", "Supplier terms"],
    title: "Document AI for Admissions and Transcripts",
    description:
      "Read admissions applications and transcripts into clean student records, and keep supplier agreements and grant paperwork in view. The Campus edition.",
    problem: "Admissions teams re-key the same applications and transcripts every cycle, in every format, under deadline.",
    faqs: [
      ["Which edition fits universities?", "The Campus edition packages Capture, Spend and Govern for higher education."],
      ["Can it read international transcripts?", "Scans and photos go through OCR first; values Sonar is unsure of are flagged for review."],
    ],
  },
  {
    id: "workforce",
    audience: "Staffing firms",
    noun: "staffing",
    name: "Workforce",
    line: "Candidates onboarded from one read.",
    h: "Resume parsing and candidate onboarding in minutes.",
    d: "Skills, certifications and expiry dates extracted straight into your ATS.",
    reads: ["Resumes", "Certifications", "Right-to-work documents", "Compliance files"],
    out: ["Candidate profiles", "Credential expiries", "ATS-ready records"],
    title: "Document AI for Staffing: Resume Parsing",
    description:
      "Parse resumes, certifications and right-to-work documents into ATS-ready candidate records, with credential expiries tracked. The Workforce edition.",
    problem: "Recruiters spend hours turning resumes and compliance files into ATS records, and expired credentials surface too late.",
    faqs: [
      ["Does it work with our ATS?", "Records arrive as schema-validated JSON over REST or webhooks, or through native connectors."],
      ["Which edition fits staffing firms?", "The Workforce edition packages the products for staffing and healthcare."],
    ],
  },
  {
    id: "healthcare",
    audience: "Healthcare staffing teams",
    noun: "healthcare staffing",
    name: "Healthcare staffing",
    line: "Clinicians credentialed faster.",
    h: "Faster clinician credentialing.",
    d: "Licence numbers, issuing boards and expiry dates extracted and scored. Smudged stamps are flagged.",
    reads: ["Clinical resumes", "Nursing licences", "Immunisation records", "Compliance files"],
    out: ["Licence checks", "Expiry tracking", "Compliance status"],
    title: "Document AI for Clinician Credentialing",
    description:
      "Extract licence numbers, issuing boards and expiry dates from clinical credentials and immunisation records, with unreadable stamps flagged for review.",
    problem: "Credentialing a clinician means checking a stack of licences and records by hand. One misread expiry date is a compliance risk.",
    faqs: [
      ["How is clinical data protected?", "Handling is aligned to HIPAA, SOC 2 and GDPR, with role-based access and private workspaces."],
      ["What if a stamp is smudged?", "The value is flagged with its confidence score and sent to a person, never guessed."],
    ],
  },
  {
    id: "legal",
    audience: "Legal teams",
    noun: "legal",
    name: "Legal and contracts",
    line: "Risk surfaced before signature.",
    h: "AI contract review before signature.",
    d: "Every deviation from your playbook comes back with a risk rating.",
    reads: ["Agreements", "Amendments", "NDAs", "Your playbook"],
    out: ["Clause risk ratings", "Playbook deviations", "Obligation dates"],
    title: "AI Contract Review and Drafting for Legal Teams",
    description:
      "Draft and review contracts against your playbook. Every deviating clause risk-rated, obligations and dates extracted, unreadable clauses flagged.",
    problem:
      "Legal teams review the same clauses under deadline, and deviations from standard terms slip through on the agreements nobody had time to read twice.",
    faqs: [
      ["Does it replace legal review?", "No. It applies your playbook to every clause and puts the risky ones in front of your lawyers first."],
      ["Can it draft agreements?", "Yes. Govern drafts from plain-language requests, using your templates and playbook."],
    ],
  },
  {
    id: "procurement",
    audience: "Finance and procurement teams",
    noun: "procurement",
    name: "Procurement and finance",
    line: "Spend reconciled as it is billed.",
    h: "Automated invoice reconciliation.",
    d: "Invoices matched to contracts and POs, with overbilling flagged as it is billed.",
    reads: ["Invoices", "Purchase orders", "Contracts", "Receipts"],
    out: ["Three-way match", "Leakage alerts", "Entitlement checks"],
    title: "AI Invoice Reconciliation for Procurement",
    description: "Match every invoice to its purchase order and contract automatically. Overbilling, rate drift and licence overages flagged before payment.",
    problem: "Finance teams approve invoices without re-reading the contracts behind them, so small overcharges compound across thousands of payments.",
    faqs: [
      ["Does it do a three-way match?", "Yes. Invoice, purchase order and contract are compared line by line."],
      ["When are mismatches flagged?", "When the invoice arrives, before it is approved for payment."],
    ],
  },
];

export const industryById = (id: string) => INDUSTRIES.find((x) => x.id === id);
