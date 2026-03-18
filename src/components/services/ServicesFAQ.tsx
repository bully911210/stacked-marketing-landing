"use client";

import { useState } from "react";

const faqItems = [
  {
    q: "What is included in the Full Stack package?",
    a: "The Full Stack package includes a custom website (built free in month one), Meta ads management at the Convert tier (R7,999 value), and full email automation: welcome sequences, lead nurture flows, and re-engagement campaigns. You also get cross-channel monthly reporting and a single point of contact who manages everything.",
  },
  {
    q: "Do I really own the website?",
    a: "Yes, 100%. The website is yours. The code, the domain, the hosting account, the analytics. If you ever leave, you take everything with you. We do not hold anything hostage.",
  },
  {
    q: "What platforms do you advertise on?",
    a: "We specialise in Meta ads, which covers Facebook and Instagram. These platforms offer the most powerful targeting for South African businesses. If your audience is there, we will find them.",
  },
  {
    q: "How does the email automation work?",
    a: "We set up automated email sequences that trigger based on user actions. When someone fills in a form on your site, they immediately receive a welcome email. From there, a nurture sequence builds trust and moves them towards a purchase or booking. We also set up re-engagement campaigns for leads that have gone quiet.",
  },
  {
    q: "Can I start with just a website and upgrade later?",
    a: "Absolutely. Many clients start with the Starter package (R1,999 website) and add ads management or the Full Stack later. Your website is built to integrate seamlessly with our ads and email systems whenever you are ready.",
  },
  {
    q: "What is the minimum ad spend?",
    a: "We recommend a minimum ad spend of R3,000 per month on top of the management fee. This gives us enough budget to test audiences, optimise campaigns, and generate meaningful results. The ad spend goes directly to Meta. We do not mark it up.",
  },
  {
    q: "How quickly will I see results?",
    a: "Websites are typically live within 2 weeks. For ads, you can expect to see initial data within the first week, with meaningful optimisation happening over 2 to 4 weeks. Email automation starts working the moment your first lead comes in.",
  },
  {
    q: "What happens if I want to cancel?",
    a: "You cancel. That is it. No exit fees, no penalties, no awkward phone calls. You keep your website, your ad accounts, your email lists, and all the data. We believe in earning your business every month.",
  },
  {
    q: "Is R11,999 really the full price for the Full Stack?",
    a: "Yes. R11,999 per month covers everything: website (free in month one), ads management at the Convert tier, and full email automation. The only additional cost is your ad spend, which goes directly to Meta.",
  },
  {
    q: "Do you work with businesses outside Pretoria?",
    a: "Yes. While our team is based in Pretoria, we work with businesses across South Africa and beyond. Everything is managed digitally, so location is never a barrier.",
  },
  {
    q: "What makes you different from other agencies?",
    a: "We built five of our own businesses on Meta ads. We have spent over R205,000 of our own money on advertising. We are not theorists. We are practitioners who put our own money on the line before we ever touched a client campaign.",
  },
  {
    q: "Can I change my package later?",
    a: "Yes. You can upgrade, downgrade, or switch packages at any time. No lock-in periods, no penalties. We want you on the package that makes the most sense for your business right now.",
  },
];

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      style={{
        paddingBlock: "clamp(4rem, 3rem + 5vw, 8rem)",
        paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 48,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Your Questions. Straight Answers.
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {faqItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  background: "transparent",
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
                    paddingRight: 16,
                  }}
                >
                  {item.q}
                </span>
                <span
                  className={`svc-faq-chevron${openIndex === i ? " open" : ""}`}
                  style={{
                    color: "#c8ff00",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  &#9660;
                </span>
              </button>
              <div
                className={`svc-faq-content${openIndex === i ? " open" : ""}`}
              >
                <div
                  style={{
                    padding: "0 24px 20px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 15,
                      color: "#a0a0a0",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
