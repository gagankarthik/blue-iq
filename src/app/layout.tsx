import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blue-iq.com"),
  title: "Blue-IQ — Intelligence for workforce, vendors & services",
  description:
    "Traditional VMS and ATS tools track workflow. Blue-IQ reads it — turning every hire, contract, and dollar into decisions you can act on.",
  openGraph: {
    title: "Blue-IQ — Intelligence for workforce, vendors & services",
    description:
      "Turning every hire, contract, and dollar into decisions you can act on.",
    images: ["/logo_large.webp"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
