"use client";

const proofCards = [
  {
    vertical: "INSURANCE",
    metric: "3,000+",
    context: "Customers acquired",
    details: "R205K spend, R68 CPA, R23.67 CPM, R1.81 CPC",
  },
  {
    vertical: "NON-PROFIT (ADVOCACY)",
    metric: "Tens of Thousands",
    context: "Supporters mobilised",
    details: "Awareness and advocacy campaigns at national scale",
  },
  {
    vertical: "NON-PROFIT (AGRICULTURE)",
    metric: "At Scale",
    context: "Member acquisition",
    details: "Sustainable growth across rural and urban audiences",
  },
  {
    vertical: "FINANCIAL SERVICES",
    metric: "Regulated",
    context: "Lead generation",
    details: "Compliant campaigns in a heavily restricted category",
  },
  {
    vertical: "RECRUITMENT (BPO)",
    metric: "50+",
    context: "Seats filled",
    details: "High-volume hiring funnels for business process outsourcing",
  },
];

export default function AdsProof() {
  return (
    <section style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Tag */}
        <div
          className="ads-tag"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "#c8ff00",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          THE PROOF
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 16,
            lineHeight: 1.05,
          }}
        >
          Five Businesses. Four Verticals. One System.
        </h2>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 16,
            color: "#8a8a80",
            marginBottom: 48,
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          Every one of these was built with our own money, our own risk, and our
          own system. We are not theorists. We are operators.
        </p>

        {/* Cards grid with 2px gap */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
            marginBottom: 48,
          }}
        >
          {proofCards.map((card) => (
            <div
              key={card.vertical}
              className="ads-card"
              style={{
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#8a8a80",
                }}
              >
                {card.vertical}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  color: "#c8ff00",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {card.metric}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#f5f5f0",
                }}
              >
                {card.context}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  color: "#5a5a52",
                  lineHeight: 1.5,
                }}
              >
                {card.details}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#c8ff00",
            textAlign: "center",
            fontWeight: 500,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          Whatever your industry, we have probably already cracked something
          harder.
        </p>
      </div>
    </section>
  );
}
