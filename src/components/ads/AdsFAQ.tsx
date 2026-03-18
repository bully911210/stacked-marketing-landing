"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need a massive budget to get started?",
    a: "No. We recommend a minimum ad spend of R3,000/month on top of the management fee. Many of our best results have come from modest budgets with sharp targeting. We scale what works, not what is expensive.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most campaigns go live within 5 business days. Initial data starts coming in within the first 48-72 hours of spend. Meaningful optimisation happens in weeks 2-4 as we gather enough data to scale winners.",
  },
  {
    q: "Do I own the ad account and all the assets?",
    a: "Yes. 100%. Your ad account, your audiences, your pixel data, your creatives. Everything belongs to you. If you leave, you take it all with you.",
  },
  {
    q: "What if I already have a Meta ad account?",
    a: "Perfect. We audit your existing setup, fix tracking issues, restructure campaigns, and build on what is already there. No need to start from scratch.",
  },
  {
    q: "Is there a contract or lock-in period?",
    a: "No contracts. No lock-in. You stay because the results make it obvious. If we are not delivering, you can cancel at any time with 30 days notice.",
  },
  {
    q: "What makes you different from other agencies?",
    a: "We have built 5 businesses across 4 verticals using our own money. R205K+ in personal ad spend before we ever touched a client account. We are not theorists. We are operators who bet on ourselves first.",
  },
  {
    q: "Do you work with businesses outside Pretoria?",
    a: "Yes. While we are based in Pretoria, Meta ads are digital. We work with businesses anywhere in South Africa and beyond. Communication happens via WhatsApp and video calls.",
  },
  {
    q: "What industries do you work with?",
    a: "We have hands-on experience in insurance, financial services, non-profit advocacy, agriculture, and recruitment (BPO). But the system works across most industries. If you sell something people want, we can get it in front of them.",
  },
];

export default function AdsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: "120px 24px 80px" }}>
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
              style={{ overflow: "hidden" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "20px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 16,
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
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  ▾
                </span>
              </button>
              <div
                className={`ads-faq-content${openIndex === i ? " open" : ""}`}
              >
                <div
                  style={{
                    padding: "0 24px 20px",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    color: "#8a8a80",
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
