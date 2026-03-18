import type { Metadata } from "next";
import "./services.css";

export const metadata: Metadata = {
  title: "Website + Ads + Email Automation | Stacked Marketing Pretoria",
  description:
    "One team. One invoice. One strategy that actually works. Custom website R1,999. Meta ads from R4,999/mo. Full Stack from R11,999/mo. No contracts. Pretoria-based.",
  keywords:
    "Stacked Marketing, website design Pretoria, Meta ads management, email automation, full stack marketing, digital marketing South Africa, R1999 website, lead generation",
  openGraph: {
    title: "Website + Ads + Email Automation | Stacked Marketing",
    description:
      "One team. One invoice. One strategy that actually works. Website, ads, and email automation from R11,999/mo. No contracts. You own everything.",
    type: "website",
    locale: "en_ZA",
    url: "https://stackedmarketing.co.za/services",
  },
  alternates: {
    canonical: "https://stackedmarketing.co.za/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="services-grain"
      style={{ background: "#0a0a0a", color: "#f5f5f0", minHeight: "100vh" }}
    >
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
