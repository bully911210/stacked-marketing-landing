"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the minimum ad spend I need?",
    a: "We recommend a minimum of R3,000 per month in ad spend on top of the management fee. Many of our best results came from modest budgets with sharp targeting. We scale what works, not what is expensive.",
  },
  {
    q: "Do I need a website first?",
    a: "Not necessarily. Our Convert and Dominate packages include landing page design. If you already have a site, we will audit it and optimise it for conversions. If you do not, we build one as part of the package.",
  },
  {
    q: "Have you worked in my industry?",
    a: "We have hands-on experience across insurance, financial services, non-profit advocacy, agriculture, and recruitment. But the system works across most industries. If you sell something people want, we can get it in front of them.",
  },
  {
    q: "What if I already have someone running my ads?",
    a: "We audit your existing setup, fix tracking issues, restructure campaigns, and build on what is already there. No need to start from scratch. Your ad account stays yours throughout.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most campaigns go live within 5 business days. Initial data starts coming in within the first 48 to 72 hours of spend. Meaningful optimisation happens in weeks 2 to 4 as we gather enough data to scale winners.",
  },
  {
    q: "Can I change my package later?",
    a: "Yes. You can upgrade or downgrade at any time. There are no penalties and no lock-in. We want you on the plan that makes sense for where your business is right now.",
  },
  {
    q: "What happens if ads are not working?",
    a: "We diagnose fast. If a campaign is underperforming, we adjust targeting, swap creatives, test new angles, or reallocate budget. You get honest reporting and clear next steps, not excuses.",
  },
  {
    q: "Do you run Google Ads too?",
    a: "Right now we specialise in Meta ads (Facebook and Instagram). It is where we have the deepest expertise and the strongest track record. Google Ads may be added in future, but we would rather be excellent at one thing than average at two.",
  },
];

export default function AdsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 48,
            lineHeight: 1.1,
          }}
        >
          Got Questions? We Have Got Answers.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="ads-card"
              style={{ overflow: "hidden", flexDirection: "column" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "22px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "#f5f5f0",
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className={`ads-faq-chevron${openIndex === i ? " open" : ""}`}
                  style={{
                    color: "#c8ff00",
                    fontSize: 20,
                    flexShrink: 0,
                    fontWeight: 300,
                  }}
                >
                  +
                </span>
              </button>
              <div
                className={`ads-faq-content${openIndex === i ? " open" : ""}`}
              >
                <div
                  style={{
                    padding: "0 24px 22px",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    color: "#a0a0a0",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
