"use client";

import { useState, useEffect, useRef } from "react";
import { ServicesTierContext } from "@/app/services/ServicesTierContext";
import ServicesNav from "@/components/services/ServicesNav";
import ServicesHero from "@/components/services/ServicesHero";
import ProblemSection from "@/components/services/ProblemSection";
import SelfSelector from "@/components/services/SelfSelector";
import ServiceTiers from "@/components/services/ServiceTiers";
import BundleCalculator from "@/components/services/BundleCalculator";
import ProofWall from "@/components/services/ProofWall";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import ComparisonTable from "@/components/services/ComparisonTable";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesLeadForm from "@/components/services/ServicesLeadForm";
import ServicesFooter from "@/components/services/ServicesFooter";
import ServicesWhatsApp from "@/components/services/ServicesWhatsApp";
import StickyTierBar from "@/components/services/StickyTierBar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WindowWithFbq = Window & typeof globalThis & { fbq?: (...args: any[]) => void };

function trackFbq(...args: unknown[]) {
  const w = window as WindowWithFbq;
  if (typeof w.fbq === "function") {
    w.fbq(...args);
  }
}

export default function ServicesPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const hasFiredViewContent = useRef(false);

  useEffect(() => {
    trackFbq("track", "PageView");
  }, []);

  // IntersectionObserver for ViewContent on tiers section
  useEffect(() => {
    const el = tiersRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasFiredViewContent.current) {
            hasFiredViewContent.current = true;
            trackFbq("track", "ViewContent", {
              content_name: "Services Tiers Section",
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
    <ServicesTierContext.Provider
      value={{ selectedTier, setSelectedTier, formRef }}
    >
      <div
        className="services-page"
        style={{
          fontFamily: "'Outfit', sans-serif",
          background: "#0a0a0a",
          color: "#f5f5f0",
          minHeight: "100vh",
        }}
      >
        <ServicesNav />
        <StickyTierBar />
        <ServicesHero />
        <ProblemSection />
        <SelfSelector />
        <div ref={tiersRef}>
          <ServiceTiers />
        </div>
        <BundleCalculator />
        <ProofWall />
        <ProcessTimeline />
        <ComparisonTable />
        <ServicesFAQ />
        <ServicesLeadForm />
        <ServicesFooter />
        <ServicesWhatsApp />
      </div>
    </ServicesTierContext.Provider>
  );
}
