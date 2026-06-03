import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "SPEND — vendor spend & invoice-to-SOW reconciliation",
  description:
    "Blue-IQ SPEND reconciles every invoice against its SOW, benchmarks rates, and flags leakage before quarter close. Vendor performance scoring built in.",
  alternates: { canonical: "/spend" },
  openGraph: {
    title: "Blue-IQ SPEND — vendor spend & invoice reconciliation",
    description: "Reconcile every invoice to its SOW and catch leakage before quarter close.",
    url: "https://blue-iq.com/spend", type: "website",
  },
};

export default function Page() {
  return <ProductPage id="spend" />;
}
