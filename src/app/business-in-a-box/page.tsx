import type { Metadata } from "next";
import Script from "next/script";
import BiabNav from "./components/BiabNav";
import Hero from "./components/Hero";
import ProblemCards from "./components/ProblemCards";
import SocialProof from "./components/SocialProof";
import OfferStack from "./components/OfferStack";
import TimelineStrip from "./components/TimelineStrip";
import Bonuses from "./components/Bonuses";
import ValueStack from "./components/ValueStack";
import CompareTable from "./components/CompareTable";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import WhatWeNeed from "./components/WhatWeNeed";
import LeadForm from "./components/LeadForm";
import StickyCTA from "./components/StickyCTA";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";
import CookieConsent from "@/components/main/CookieConsent";

export const metadata: Metadata = {
  title: "Business in a Box / R2,999 | Stacked Marketing",
  description:
    "Everything you need to launch your business in 7 days. Professional website, Facebook integration, Google profile, brand kit. R2,999 once-off.",
  openGraph: {
    title: "Business in a Box / R2,999 | Stacked Marketing",
    description:
      "Everything you need to launch your business in 7 days. Professional website, Facebook integration, Google profile, brand kit. R2,999 once-off.",
    type: "website",
    locale: "en_ZA",
    siteName: "Stacked Marketing",
    url: "https://www.stackedmarketing.co.za/business-in-a-box/",
    images: [
      {
        url: "https://www.stackedmarketing.co.za/images/og-business-in-a-box.png",
        width: 1200,
        height: 630,
        alt: "Business in a Box - R2,999 - Stacked Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business in a Box / R2,999 | Stacked Marketing",
    description:
      "Everything you need to launch your business in 7 days. Professional website, Facebook integration, Google profile, brand kit. R2,999 once-off.",
    images: [
      "https://www.stackedmarketing.co.za/images/og-business-in-a-box.png",
    ],
  },
  alternates: {
    canonical: "https://www.stackedmarketing.co.za/business-in-a-box/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Business in a Box",
  description:
    "Everything you need to launch your business in 7 days. Professional website, Facebook integration, Google profile, brand kit, social content, and strategy call.",
  url: "https://www.stackedmarketing.co.za/business-in-a-box/",
  brand: {
    "@type": "Organization",
    name: "Stacked Marketing",
    url: "https://www.stackedmarketing.co.za",
  },
  offers: {
    "@type": "Offer",
    price: "2999",
    priceCurrency: "ZAR",
    availability: "https://schema.org/InStock",
    url: "https://www.stackedmarketing.co.za/business-in-a-box/",
  },
};

export default function BusinessInABox() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BiabNav />
      <Hero />
      <ProblemCards />
      <SocialProof />
      <OfferStack />
      <TimelineStrip />
      <Bonuses />
      <ValueStack />
      <CompareTable />
      <Guarantee />
      <FAQ />
      <WhatWeNeed />
      <LeadForm />
      <Footer />
      <StickyCTA />
      <WhatsApp />
      <CookieConsent />

      {/* ViewContent pixel event */}
      <Script id="biab-viewcontent" strategy="afterInteractive">
        {`
          if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'ViewContent', {
              content_name: 'Business in a Box',
              content_type: 'product',
              value: 2999,
              currency: 'ZAR'
            });
          }
        `}
      </Script>
    </main>
  );
}
