import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stackedmarketing.co.za"),
  title: "Stacked Marketing | Meta Ads and Websites. Pretoria.",
  description:
    "Professional websites from R3,999. Managed Meta Ads from R4,999/mo. Two things done brilliantly, no contracts, you own everything. Pretoria, South Africa.",
  keywords:
    "marketing Pretoria, Meta ads management, Facebook ads Pretoria, website design Pretoria, full-stack marketing, Stacked Marketing, lead generation South Africa",
  openGraph: {
    title: "Stacked Marketing | Meta Ads and Websites. Pretoria.",
    description:
      "Professional websites from R3,999. Managed Meta Ads from R4,999/mo. Two things done brilliantly. No contracts. You own everything.",
    type: "website",
    locale: "en_ZA",
    siteName: "Stacked Marketing",
    url: "https://www.stackedmarketing.co.za",
    images: [
      {
        url: "https://www.stackedmarketing.co.za/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Stacked Marketing - Two things, done brilliantly.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacked Marketing | Meta Ads and Websites. Pretoria.",
    description:
      "Professional websites from R3,999. Managed Meta Ads from R4,999/mo. No contracts. You own everything. Pretoria.",
    images: ["https://www.stackedmarketing.co.za/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.stackedmarketing.co.za",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.stackedmarketing.co.za/#organization",
      name: "Stacked Marketing",
      url: "https://www.stackedmarketing.co.za",
      description:
        "Professional websites and managed Meta Ads for growing businesses in Pretoria, South Africa.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pretoria",
        addressCountry: "ZA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+27621779799",
        contactType: "sales",
        availableLanguage: ["English", "Afrikaans"],
      },
      sameAs: ["https://www.linkedin.com/company/111745526"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.stackedmarketing.co.za/#website",
      url: "https://www.stackedmarketing.co.za",
      name: "Stacked Marketing",
      publisher: {
        "@id": "https://www.stackedmarketing.co.za/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.stackedmarketing.co.za/#webpage",
      url: "https://www.stackedmarketing.co.za",
      name: "Stacked Marketing | Meta Ads and Websites. Pretoria.",
      description:
        "Professional websites from R3,999. Managed Meta Ads from R4,999/mo. Two things done brilliantly. No contracts. You own everything.",
      isPartOf: {
        "@id": "https://www.stackedmarketing.co.za/#website",
      },
      about: {
        "@id": "https://www.stackedmarketing.co.za/#organization",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.stackedmarketing.co.za/#starter-website",
      name: "Professional Website",
      description:
        "Beautiful 4-page fully custom-built website. Mobile responsive, fast loading, with contact form and WhatsApp integration. Delivered in 5 business days.",
      provider: {
        "@id": "https://www.stackedmarketing.co.za/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
      offers: {
        "@type": "Offer",
        price: "3999",
        priceCurrency: "ZAR",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.stackedmarketing.co.za/#meta-ads",
      name: "Meta Ads Management",
      description:
        "Daily managed Meta (Facebook and Instagram) advertising campaigns with audience research, creative production, and performance reporting.",
      provider: {
        "@id": "https://www.stackedmarketing.co.za/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
      offers: {
        "@type": "Offer",
        price: "4999",
        priceCurrency: "ZAR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "4999",
          priceCurrency: "ZAR",
          unitText: "month",
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.stackedmarketing.co.za/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Stacked Marketing do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We do two things, obsessively well: build professional websites and manage Meta (Facebook and Instagram) ad campaigns for businesses in South Africa.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Meta Ads management cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A professional website starts from R3,999 once-off. Managed Meta Ads start from R4,999 per month. No contracts, cancel any time.",
          },
        },
        {
          "@type": "Question",
          name: "Do you require long-term contracts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We operate month to month with no lock-in contracts. You stay because the results speak for themselves, not because you are locked in.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to pay for ad spend separately?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our management fee covers strategy, optimisation, creative production, and reporting. Your ad spend goes directly to Meta. You control the budget and can see every rand spent in real time.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. No contracts, no lock-in. We keep you because results keep you, not paperwork.",
          },
        },
        {
          "@type": "Question",
          name: 'What does "you own everything" actually mean?',
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your website code, your ad accounts, your data. All of it belongs to you. If you leave, you take everything with you. No hostage situations.",
          },
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.stackedmarketing.co.za/#localbusiness",
      name: "Stacked Marketing",
      url: "https://www.stackedmarketing.co.za",
      telephone: "+27621779799",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pretoria",
        addressRegion: "Gauteng",
        addressCountry: "ZA",
      },
      priceRange: "R3,999 - R4,999",
      sameAs: ["https://www.linkedin.com/company/111745526"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%232D3820'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='20' fill='%23FFFFFF'>S</text></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#hero" className="skip-link">
          Skip to content
        </a>

        {children}

        {/* Analytics loaded exclusively via CookieConsent component — no duplication */}
      </body>
    </html>
  );
}
