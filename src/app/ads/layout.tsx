import type { Metadata } from "next";
import "./ads.css";

export const metadata: Metadata = {
  title: "Meta Ads Management from R4,999/month | Stacked Marketing",
  description:
    "Five businesses. Four industries. All built from scratch on Meta ads. No contracts, no lock-in. Just leads, or you walk. Pretoria-based Meta ads management.",
  keywords:
    "Meta ads Pretoria, Facebook ads management, Instagram ads, lead generation South Africa, Stacked Marketing, Meta advertising agency",
  openGraph: {
    title: "Meta Ads Management from R4,999/month | Stacked Marketing",
    description:
      "Five businesses built from scratch on Meta ads. Now we build yours. No contracts. No lock-in. Just leads, or you walk.",
    type: "website",
    locale: "en_ZA",
    url: "https://stackedmarketing.co.za/ads",
  },
  alternates: {
    canonical: "https://stackedmarketing.co.za/ads",
  },
};

export default function AdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ads-grain" style={{ background: "#0a0a0a", color: "#f5f5f0", minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  );
}
