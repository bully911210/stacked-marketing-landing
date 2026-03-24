"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "Do I need my own domain and hosting?",
    a: "Yes, you will need a domain and hosting account. We will recommend the best options for your budget and help you set it up. Domain and hosting costs go directly to the provider, typically R50 to R150 per month.",
  },
  {
    q: "What if I already have a logo?",
    a: "Perfect. We will use your existing logo and build the brand kit around it. If your logo needs cleaning up, we will let you know, but there is no obligation.",
  },
  {
    q: "Can I upgrade to Meta Ads later?",
    a: "Absolutely. Every Business in a Box client gets a R2,000 upgrade credit toward our Meta Ads Accelerator (R4,999/mo) or Stacked Core (R9,999/mo) plans. Your website is already built for conversion. Adding ads is the natural next step.",
  },
  {
    q: "What does 'you own everything' mean?",
    a: "Your website code, your Facebook page, your Google profile, your brand kit files, your content. All of it is yours. If you leave, you take everything. No hostage situations.",
  },
  {
    q: "Do you work with businesses outside Pretoria?",
    a: "Yes. Everything is delivered remotely. Your location does not matter.",
  },
  {
    q: "What is the difference between R2,999 and R5,999?",
    a: "R2,999 gives you everything in the box. You handle your own posting after we hand over the 5 starter creatives and playbook. R5,999 includes everything in the box plus 10 designed social posts per month for 3 months. We post, you sell.",
  },
  {
    q: "What is the 1-month support?",
    a: "For 30 days after delivery, you can WhatsApp us with any questions, change requests, or issues. Small text edits, image swaps, minor layout tweaks, all covered. After that, support is available as a paid add-on.",
  },
];

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-main">
        <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""}`}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-h2)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Questions
          </h2>

          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="biab-faq-item"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  marginBottom: 12,
                }}
              >
                <summary
                  style={{
                    padding: "20px 24px",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {faq.q}
                  <svg
                    className="biab-faq-chevron"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginLeft: 16, transition: "transform 0.2s ease" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div style={{ paddingInline: 24, paddingBottom: 20 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      fontSize: "var(--text-body)",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .biab-faq-item summary::-webkit-details-marker {
          display: none;
        }
        .biab-faq-item[open] {
          border-color: var(--border-accent) !important;
        }
        .biab-faq-item[open] .biab-faq-chevron {
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
}
