"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const bonuses = [
  {
    heading: "What to Say When Someone Asks What You Do",
    body: "A 1-page elevator pitch template. Fill in the blanks, practise it twice, never fumble the question again.",
    value: "R500",
  },
  {
    heading: "WhatsApp Quick Replies Pack",
    body: "10 pre-written customer response templates for quotes, availability, pricing, and follow-ups. Copy, paste, close.",
    value: "R500",
  },
  {
    heading: "First 5 Customers Checklist",
    body: "The exact steps to land your first five paying customers in 30 days. Extracted from our playbook for people who want the quick win now.",
    value: "R500",
  },
];

export default function Bonuses() {
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
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--lime)",
              opacity: 0.7,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            BONUSES
          </p>

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
            Wait. There is{" "}
            <span style={{ color: "var(--lime)" }}>more in the box.</span>
          </h2>

          <div className="biab-bonus-grid">
            {bonuses.map((bonus, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--card-radius)",
                  padding: 32,
                  borderTop: "2px solid var(--lime)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    color: "var(--text-primary)",
                    marginBottom: 12,
                  }}
                >
                  {bonus.heading}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    fontSize: "var(--text-body)",
                    marginBottom: 16,
                  }}
                >
                  {bonus.body}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
                  }}
                >
                  Value: {bonus.value}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              color: "var(--text-secondary)",
              fontSize: "var(--text-body)",
              textAlign: "center",
              marginTop: 32,
            }}
          >
            Total bonus value: R1,500.{" "}
            <span style={{ color: "var(--lime)" }}>Included free.</span>
          </p>
        </div>
      </div>

      <style>{`
        .biab-bonus-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--card-gap);
        }
        @media (max-width: 767px) {
          .biab-bonus-grid {
            grid-template-columns: 1fr;
          }
          .biab-bonus-grid > div {
            padding: var(--card-padding-mobile) !important;
          }
        }
      `}</style>
    </section>
  );
}
