"use client";

const comparisons = [
  {
    label: "Monthly Cost",
    them: "R15,000 to R30,000+",
    us: "R4,999 to R12,999",
  },
  {
    label: "Proven Verticals",
    them: "We specialise in everything",
    us: "5 businesses. 4 industries. Built from scratch",
  },
  {
    label: "CPA Track Record",
    them: "We will optimise over time",
    us: "R68. Month one. Our money",
  },
  {
    label: "CTR",
    them: "Industry average is 1 to 2%",
    us: "4.31% across 8.6M impressions",
  },
  {
    label: "Contracts",
    them: "6 to 12 months locked in",
    us: "Month to month. Leave any time",
  },
  {
    label: "Account Ownership",
    them: "They own your ad account",
    us: "You own everything",
  },
  {
    label: "Communication",
    them: "Email a strategist and wait 3 days",
    us: "WhatsApp us. Same day",
  },
  {
    label: "Reporting",
    them: "Pretty dashboards, no context",
    us: "Plain English: what worked, what did not, what is next",
  },
  {
    label: "Onboarding",
    them: "2 to 4 weeks",
    us: "5 business days",
  },
];

const cellLabel: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 9,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 4,
  display: "none",
};

export default function AdsComparison() {
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
          WHY STACKED
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 48,
            lineHeight: 1.05,
          }}
        >
          We Are Not an Agency. We Are Your Ads Team.
        </h2>

        {/* Table header: hidden on mobile via CSS */}
        <div className="ads-comparison-row ads-comparison-header">
          <div
            style={{
              padding: "16px 20px",
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#666666",
            }}
          />
          <div
            style={{
              padding: "16px 20px",
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#888888",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            BIG AGENCY
          </div>
          <div
            style={{
              padding: "16px 20px",
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#c8ff00",
              background: "rgba(200,255,0,0.04)",
              borderLeft: "2px solid #c8ff00",
            }}
          >
            STACKED MARKETING
          </div>
        </div>

        {/* Rows */}
        {comparisons.map((row) => (
          <div key={row.label} className="ads-comparison-row" style={{ marginBottom: 2 }}>
            {/* Label column */}
            <div
              style={{
                padding: "16px 20px",
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#f5f5f0",
                display: "flex",
                alignItems: "center",
              }}
            >
              {row.label}
            </div>
            {/* Big Agency */}
            <div
              style={{
                padding: "16px 20px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: "#888888",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 4,
              }}
            >
              <div className="ads-cell-label" style={{ ...cellLabel, color: "#666666" }}>Big Agency</div>
              {row.them}
            </div>
            {/* Stacked */}
            <div
              style={{
                padding: "16px 20px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: "#f5f5f0",
                fontWeight: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "rgba(200,255,0,0.04)",
                borderLeft: "2px solid #c8ff00",
                borderRadius: 4,
              }}
            >
              <div className="ads-cell-label" style={{ ...cellLabel, color: "#c8ff00" }}>Stacked Marketing</div>
              {row.us}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
