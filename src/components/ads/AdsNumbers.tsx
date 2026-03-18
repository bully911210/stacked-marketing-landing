"use client";

const dataRows = [
  { label: "TOTAL AD SPEND", value: "R205,000+" },
  { label: "CUSTOMERS ACQUIRED", value: "3,000+" },
  { label: "COST PER ACQUISITION", value: "R68" },
  { label: "BLENDED CPM", value: "R23.67" },
  { label: "BLENDED CTR", value: "4.31%" },
  { label: "COST PER CLICK", value: "R1.81" },
  { label: "UNIQUE REACH", value: "1.4M" },
  { label: "VERTICAL", value: "Restricted (Insurance)" },
  { label: "PAYBACK", value: "Month One" },
];

export default function AdsNumbers() {
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
          BY THE NUMBERS
        </div>

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
          We Spend Our Own Money Before We Spend Yours.
        </h2>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 16,
            color: "#a0a0a0",
            marginBottom: 48,
            maxWidth: 700,
            lineHeight: 1.6,
          }}
        >
          These are not client dashboards we are showing off. This is our money.
          From one ad account. In a category Meta actively restricts.
        </p>

        {/* Data grid */}
        <div className="ads-numbers-grid" style={{ marginBottom: 48 }}>
          {dataRows.map((row) => (
            <div
              key={row.label}
              className="ads-card"
              style={{
                padding: "24px 28px",
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
                  color: "#a0a0a0",
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
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
