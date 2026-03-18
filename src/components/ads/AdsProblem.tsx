"use client";

const painPoints = [
  "Boosted posts with zero strategy",
  "No pixel, no tracking, no idea what is working",
  '"Agency" charging R15K+ for dashboards you never read',
  "Leads that ghost you because the funnel is broken",
  "No idea what your cost per lead actually is",
];

export default function AdsProblem() {
  return (
    <section style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <div>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#f5f5f0",
                lineHeight: 1.1,
              }}
            >
              Spending Money on Ads and Getting{" "}
              <span style={{ color: "#ff3b30" }}>Nothing</span> Back?
            </h2>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {painPoints.map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 16,
                    color: "#ff3b30",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  ✕
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 16,
                    color: "#d0d0c8",
                    lineHeight: 1.5,
                  }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
