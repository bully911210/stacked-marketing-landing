"use client";

import { useEffect, useRef } from "react";
import AdsNav from "@/components/ads/AdsNav";
import AdsHero from "@/components/ads/AdsHero";
import AdsProof from "@/components/ads/AdsProof";
import AdsProblem from "@/components/ads/AdsProblem";
import AdsPricing from "@/components/ads/AdsPricing";
import AdsIncluded from "@/components/ads/AdsIncluded";
import AdsProcess from "@/components/ads/AdsProcess";
import AdsNumbers from "@/components/ads/AdsNumbers";
import AdsComparison from "@/components/ads/AdsComparison";
import AdsFAQ from "@/components/ads/AdsFAQ";
import AdsForm from "@/components/ads/AdsForm";
import AdsFooter from "@/components/ads/AdsFooter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WindowWithFbq = Window & typeof globalThis & { fbq?: (...args: any[]) => void };

function trackFbq(...args: unknown[]) {
  const w = window as WindowWithFbq;
  if (typeof w.fbq === "function") {
    w.fbq(...args);
  }
}

export default function AdsPage() {
  const pricingRef = useRef<HTMLDivElement>(null);
  const hasFiredViewContent = useRef(false);

  useEffect(() => {
    trackFbq("track", "PageView");
  }, []);

  useEffect(() => {
    const el = pricingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasFiredViewContent.current) {
            hasFiredViewContent.current = true;
            trackFbq("track", "ViewContent", {
              content_name: "Pricing Section",
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="ads-page"
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: "#0a0a0a",
        color: "#f5f5f0",
        minHeight: "100vh",
      }}
    >
      <AdsNav />
      <AdsHero />
      <AdsProof />
      <AdsProblem />
      <div ref={pricingRef}>
        <AdsPricing />
      </div>
      <AdsIncluded />
      <AdsProcess />
      <AdsNumbers />
      <AdsComparison />
      <AdsFAQ />
      <AdsForm />
      <AdsFooter />
    </div>
  );
}
