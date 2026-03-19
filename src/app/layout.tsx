import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stacked Marketing | Meta Ads and Websites. Pretoria.",
  description:
    "Meta Ads management from R4,999/mo. Full-stack marketing (ads + website + automation) for R11,999/mo. No contracts. You own everything. Pretoria, South Africa.",
  keywords:
    "marketing Pretoria, Meta ads management, Facebook ads Pretoria, website design Pretoria, full-stack marketing, Stacked Marketing, lead generation South Africa",
  openGraph: {
    title: "Stacked Marketing | Meta Ads and Websites. Pretoria.",
    description:
      "Meta Ads management from R4,999/mo. Full-stack marketing for R11,999/mo. No contracts. You own everything.",
    type: "website",
    locale: "en_ZA",
    siteName: "Stacked Marketing",
    url: "https://stackedmarketing.co.za",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacked Marketing | Meta Ads and Websites. Pretoria.",
    description:
      "Meta Ads management from R4,999/mo. No contracts. You own everything. Pretoria.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://stackedmarketing.co.za",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://stackedmarketing.co.za/#organization",
      name: "Stacked Marketing",
      url: "https://stackedmarketing.co.za",
      description:
        "Meta Ads management and full-stack marketing for growing businesses in Pretoria, South Africa.",
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
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://stackedmarketing.co.za/#website",
      url: "https://stackedmarketing.co.za",
      name: "Stacked Marketing",
      publisher: {
        "@id": "https://stackedmarketing.co.za/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://stackedmarketing.co.za/#webpage",
      url: "https://stackedmarketing.co.za",
      name: "Stacked Marketing | Meta Ads and Websites. Pretoria.",
      description:
        "Meta Ads management from R4,999/mo. Full-stack marketing for R11,999/mo. No contracts. You own everything.",
      isPartOf: {
        "@id": "https://stackedmarketing.co.za/#website",
      },
      about: {
        "@id": "https://stackedmarketing.co.za/#organization",
      },
    },
    {
      "@type": "Service",
      "@id": "https://stackedmarketing.co.za/#meta-ads",
      name: "Meta Ads Management",
      description:
        "Daily managed Meta (Facebook and Instagram) advertising campaigns with audience research, creative production, and performance reporting.",
      provider: {
        "@id": "https://stackedmarketing.co.za/#organization",
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
      "@type": "Service",
      "@id": "https://stackedmarketing.co.za/#full-stack",
      name: "Full Stack Marketing",
      description:
        "Complete marketing system including Meta Ads management, custom website, landing pages, automation, and strategy calls.",
      provider: {
        "@id": "https://stackedmarketing.co.za/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
      offers: {
        "@type": "Offer",
        price: "11999",
        priceCurrency: "ZAR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "11999",
          priceCurrency: "ZAR",
          unitText: "month",
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://stackedmarketing.co.za/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Stacked Marketing do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We manage Meta (Facebook and Instagram) ad campaigns and build full-stack marketing systems including websites, landing pages, and automation for businesses in South Africa.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Meta Ads management cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Meta Ads management starts from R4,999 per month. Our Full Stack package (ads + website + automation) is R11,999 per month. No contracts, cancel any time.",
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
      ],
    },
  ],
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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231A1A1A'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='20' fill='%23C8FF00'>S</text></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA4_ID"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA4_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
