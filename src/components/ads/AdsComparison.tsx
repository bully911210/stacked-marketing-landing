"use client";

const comparisons = [
  { label: "Monthly Cost", them: "R15,000 - R50,000+", us: "R4,999 - R12,999" },
  { label: "Verticals Tested", them: "Theory from case studies", us: "5 real businesses, 4 verticals" },
  { label: "Best CPA Achieved", them: "They will not tell you", us: "R68 (restricted category)" },
  { label: "Blended CTR", them: "Industry average 1-2%", us: "4.31% across 8.6M impressions" },
  { label: "Contracts", them: "6-12 month lock-in", us: "Month-to-month. Cancel anytime." },
  { label: "Asset Ownership", them: "They own your audiences", us: "You own everything. Always." },
  { label: "Communication", them: "Email chains, weekly at best", us: "WhatsApp. Direct. Fast." },
  { label: "Reporting", them: "Dashboards you never read", us: "Clear metrics that matter" },
  { label: "Onboarding Time", them: "2-4 weeks", us: "5 days to live ads" },
  { label: "Skin in the Game", them: "Your money, their experiments", us: "We spent R205K+ of our own first" },
];

export default function AdsComparison() {
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
          WHY STACKED
        </div>

        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5a5a52",
            }}
          />
          <div
            style={{
              padding: "16px 20px",
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5a5a52",
              background: "rgba(245,245,240,0.02)",
            }}
          >
            BIG AGENCY
          </div>
          <div
            style={{
              padding: "16px 20px",
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#c8ff00",
              background: "rgba(200,255,0,0.03)",
            }}
          >
            STACKED MARKETING
          </div>
        </div>

        {/* Rows */}
        {comparisons.map((row) => (
          <div
            key={row.label}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 2,
              marginBottom: 2,
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#8a8a80",
                display: "flex",
                alignItems: "center",
              }}
            >
              {row.label}
            </div>
            <div
              className="ads-card"
              style={{
                padding: "16px 20px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: "#5a5a52",
                display: "flex",
                alignItems: "center",
              }}
            >
              {row.them}
            </div>
            <div
              style={{
                padding: "16px 20px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: "#f5f5f0",
                fontWeight: 500,
                background: "rgba(200,255,0,0.03)",
                border: "1px solid rgba(200,255,0,0.06)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {row.us}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
