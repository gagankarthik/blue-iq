/* The products in the Blue-IQ portfolio, at company level: what each is
   for, in one line, and where it lives. The site speaks for the company;
   each product's own app or page carries its detail. */

export type ProductSlug = "capture" | "spend" | "govern";

export type Product = {
  slug: ProductSlug;
  name: string;
  role: string;
  /** one line: what it is for */
  line: string;
  /** where the product lives; internal when it has no public app yet */
  href: string;
  external?: boolean;
  cta: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "capture",
    name: "Capture",
    role: "Document data",
    line: "Turns incoming documents into clean, structured data.",
    href: "https://www.parsinglab.blue-iq.ai/",
    external: true,
    cta: "Visit Capture",
  },
  {
    slug: "spend",
    name: "Spend",
    role: "Spend control",
    line: "Keeps invoices in line with what was agreed.",
    href: "/contact?product=Spend",
    cta: "Ask about Spend",
  },
  {
    slug: "govern",
    name: "Govern",
    role: "Contracts",
    line: "Keeps contracts and obligations in view.",
    href: "https://govern.blue-iq.ai/",
    external: true,
    cta: "Visit Govern",
  },
];
