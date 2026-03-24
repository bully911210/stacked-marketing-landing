"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 205, prefix: "R", suffix: "K", label: "Own ad spend" },
  { value: 68, prefix: "R", suffix: "", label: "Cost per acquisition" },
  { value: 5000, prefix: "", suffix: "+", label: "Subscription clients acquired" },
];

const sites = [
  {
    name: "Stacked Marketing",
    url: "stackedmarketing.co.za",
  },
  {
    name: "Business Client Site",
    url: "Delivered in 5 days",
  },
  {
    name: "E-Commerce Launch",
    url: "Delivered in 7 days",
  },
];

export default function SocialProof() {
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
            THE PROOF
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
            Built by a team that{" "}
            <span style={{ color: "var(--lime)" }}>spends their own money.</span>
          </h2>

          {/* Stat counters */}
          <div className="biab-proof-stats">
            {stats.map((stat, i) => (
              <StatCounter key={i} stat={stat} isVisible={isVisible} />
            ))}
          </div>

          {/* Businesses launched */}
          <div
            style={{
              textAlign: "center",
              marginTop: 48,
              padding: "32px 24px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--card-radius)",
              maxWidth: 640,
              margin: "48px auto 0",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--lime)",
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              12+
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              Businesses launched and live
            </p>
          </div>

          {/* What clients say */}
          <div
            style={{
              maxWidth: 640,
              margin: "32px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              {
                quote: "I went from a WhatsApp-only business to a full online presence in 5 days. My customers take me seriously now.",
                name: "Cleaning service owner, Pretoria",
              },
              {
                quote: "I was quoted R18K by a designer. Stacked did more for R2,999 and it was live before the designer even sent a brief.",
                name: "Mobile mechanic, Centurion",
              },
              {
                quote: "The strategy call alone was worth the money. They actually care about your business working.",
                name: "Beauty salon owner, Midrand",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--card-radius)",
                  padding: 24,
                  borderLeft: "2px solid var(--lime)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontSize: "var(--text-body)",
                    fontStyle: "italic",
                    marginBottom: 12,
                  }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.5px",
                  }}
                >
                  &mdash; {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .biab-proof-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--card-gap);
          max-width: 640px;
          margin: 0 auto;
        }
        @media (max-width: 767px) {
          .biab-proof-stats {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}

function StatCounter({
  stat,
  isVisible,
}: {
  stat: { value: number; prefix: string; suffix: string; label: string };
  isVisible: boolean;
}) {
  const count = useCountUp(stat.value, isVisible, 1500);

  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          color: "var(--lime)",
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}
