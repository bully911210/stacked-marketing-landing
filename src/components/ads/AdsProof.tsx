"use client";

const proofCards = [
  {
    vertical: "INSURANCE",
    metric: "3,000+",
    context: "Customers acquired",
    details:
      "R205K total ad spend. R68 cost per customer. R23.67 CPM. R1.81 per click. In a category Meta actively throttles. Recurring revenue product with month-one payback on total ad spend.",
  },
  {
    vertical: "NON-PROFIT (ADVOCACY)",
    metric: "Database from Zero",
    context: "Supporters mobilised",
    details:
      "Built the database from zero. Petition funnels, donor acquisition, and advocacy campaigns. All Meta.",
  },
  {
    vertical: "NON-PROFIT (AGRICULTURE)",
    metric: "Niche Audience",
    context: "Member acquisition",
    details:
      "Niche agricultural audience in South Africa. Found them, converted them, grew the base. Meta only.",
  },
  {
    vertical: "FINANCIAL SERVICES (BROKERAGE)",
    metric: "Compliance-Heavy",
    context: "Qualified lead generation",
    details:
      "Compliance-heavy vertical. Every ad approved. Every lead qualified. Meta as the sole acquisition channel.",
  },
  {
    vertical: "RECRUITMENT (BPO)",
    metric: "At Volume",
    context: "Full recruitment pipeline",
    details:
      "Full recruitment pipeline for a large call centre operation. Meta to application to floor. Ongoing acquisition at volume.",
  },
];

export default function AdsProof() {
  return (
    <section style={{ paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)" }}>
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
            color: "#a0a0a0",
            marginBottom: 48,
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          We did not learn this from a course. We built it with our own money, in
          our own businesses, across completely different industries. All on Meta.
        </p>

        {/* Cards grid */}
        <div className="ads-proof-grid" style={{ marginBottom: 48 }}>
          {proofCards.map((card) => (
            <div
              key={card.vertical}
              className="ads-card"
              style={{
                padding: 28,
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
                  color: "#a0a0a0",
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
                  color: "#a0a0a0",
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
