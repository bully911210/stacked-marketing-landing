"use client";

const dataRows = [
  { label: "TOTAL AD SPEND", value: "R205,000+" },
  { label: "CUSTOMERS ACQUIRED", value: "3,000+" },
  { label: "COST PER ACQUISITION", value: "R68" },
  { label: "CPM (COST PER 1K IMPRESSIONS)", value: "R23.67" },
  { label: "BLENDED CTR", value: "4.31%" },
  { label: "COST PER CLICK", value: "R1.81" },
  { label: "TOTAL REACH", value: "8.6M+" },
  { label: "VERTICALS TESTED", value: "4" },
  { label: "PAYBACK PERIOD", value: "< 30 days" },
];

export default function AdsNumbers() {
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
          BY THE NUMBERS
        </div>

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
          We Spend Our Own Money Before We Spend Yours.
        </h2>

        {/* Data grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 2,
            marginBottom: 48,
          }}
        >
          {dataRows.map((row) => (
            <div
              key={row.label}
              className="ads-card"
              style={{
                padding: "24px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#8a8a80",
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  fontWeight: 800,
                  color: "#f5f5f0",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {row.value}
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
          Imagine what we do in an unrestricted vertical like yours.
        </p>
      </div>
    </section>
  );
}
