import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stacked Marketing. Website. Ads. Email. One Team.",
  description:
    "Full-stack marketing for growing businesses in Pretoria. Custom websites from R1,999. Meta Ads management. Email automation. No contracts. You own everything.",
  keywords:
    "marketing Pretoria, website design Pretoria, Meta ads management, email automation, full-stack marketing, Stacked Marketing",
  openGraph: {
    title: "Stacked Marketing. Website. Ads. Email. One Team.",
    description:
      "Full-stack marketing for growing businesses. Website. Ads. Email. One team. One invoice. Pretoria.",
    type: "website",
    locale: "en_ZA",
    siteName: "Stacked Marketing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacked Marketing. Website. Ads. Email. One Team.",
    description:
      "Full-stack marketing for growing businesses. One team. One invoice. Pretoria.",
  },
  robots: {
    index: true,
    follow: true,
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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231A1A1A'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='20' fill='%23C8FF00'>S</text></svg>"
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
