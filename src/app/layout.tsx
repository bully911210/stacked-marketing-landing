import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Custom Website for R1999 | Stacked Marketing Pretoria",
  description:
    "Get a professional custom website for R1999 once-off. No contracts, no monthly fees. Built by Pretoria's own team. You own everything.",
  keywords:
    "website design Pretoria, cheap website South Africa, R1999 website, custom website, web design Pretoria, Stacked Marketing",
  openGraph: {
    title: "Custom Website for R1999 | Stacked Marketing",
    description:
      "Professional custom website. Once-off R1999. No contracts. No monthly fees. You own everything.",
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
