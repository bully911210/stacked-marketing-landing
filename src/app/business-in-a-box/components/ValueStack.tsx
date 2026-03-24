"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const lineItems = [
  { name: "Custom website (freelancer rate)", price: "R8,000" },
  { name: "Facebook page setup + content bridge", price: "R2,500" },
  { name: "Google Business Profile setup", price: "R1,500" },
  { name: "WhatsApp Business setup", price: "R800" },
  { name: "Brand kit (logo, colours, fonts, card)", price: "R3,500" },
  { name: "5 social media creatives", price: "R2,000" },
  { name: "30-day launch playbook", price: "R1,000" },
  { name: "Strategy call (consulting rate)", price: "R1,500" },
  { name: "R2,000 Meta Ads credit", price: "R2,000" },
  { name: "Elevator pitch template", price: "R500" },
  { name: "WhatsApp quick replies pack", price: "R500" },
  { name: "First 5 customers checklist", price: "R500" },
];

export default function ValueStack() {
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
            Here is what our agency clients pay for the same deliverables.
          </h2>

          {/* Line items */}
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            {lineItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 8px",
                  borderBottom: "1px solid var(--border)",
                  background: i % 2 === 1 ? "rgba(255, 255, 255, 0.015)" : "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    fontSize: "var(--text-body)",
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    textDecoration: "line-through",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  {item.price}
                </span>
              </div>
            ))}

            {/* Total row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontSize: "var(--text-caption)",
                  letterSpacing: "0.5px",
                }}
              >
                TOTAL SEPARATE VALUE
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textDecoration: "line-through",
                  fontSize: "1.15rem",
                }}
              >
                R24,300
              </span>
            </div>
          </div>

          {/* Primary pricing card */}
          <div
            className="biab-value-price-card"
            style={{
              maxWidth: 600,
              margin: "24px auto 0",
              background: "var(--color-accent-muted)",
              border: "1px solid var(--border-accent)",
              borderRadius: "var(--card-radius)",
              padding: "28px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Badge */}
            <span
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "var(--lime)",
                background: "rgba(200, 255, 0, 0.12)",
                padding: "4px 10px",
                borderRadius: "var(--radius-pill)",
              }}
            >
              MOST POPULAR
            </span>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "var(--text-primary)",
              }}
            >
              You Pay Today
            </span>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--lime)",
              }}
            >
              R2,999
            </span>
          </div>

          {/* Upsell card */}
          <div
            className="biab-value-upsell-card"
            style={{
              maxWidth: 600,
              margin: "16px auto 0",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--card-radius)",
              padding: "28px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Badge */}
            <span
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "var(--text-muted)",
                background: "rgba(255, 255, 255, 0.06)",
                padding: "4px 10px",
                borderRadius: "var(--radius-pill)",
              }}
            >
              HANDS-FREE
            </span>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                Want us to keep posting for you?
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  fontSize: "var(--text-body)",
                }}
              >
                Business in a Box + 3 Months Content. Everything in the box, plus 10 designed social posts per month for 3 months. We post. You sell.
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "var(--lime)",
                  lineHeight: 1,
                }}
              >
                R5,999
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  marginTop: 4,
                }}
              >
                once-off
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "var(--text-muted)",
              fontSize: "var(--text-body)",
              textAlign: "center",
              marginTop: 24,
            }}
          >
            R2,999 is the self-starter. R5,999 is hands-free.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .biab-value-price-card {
            flex-direction: column !important;
            text-align: center;
            gap: 12px;
            padding: 24px 20px !important;
          }
          .biab-value-upsell-card {
            flex-direction: column !important;
            padding: 24px 20px !important;
          }
          .biab-value-upsell-card > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
