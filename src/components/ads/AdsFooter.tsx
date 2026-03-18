"use client";

export default function AdsFooter() {
  return (
    <footer
      style={{
        padding: "48px clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f5f5f0",
              marginBottom: 8,
            }}
          >
<span style={{ color: "#c8ff00" }}>S</span>TACKED MARKETING
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              color: "#666666",
              lineHeight: 1.6,
            }}
          >
            Meta ads management for businesses that want leads, not dashboards.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          <a
            href="https://wa.me/27621779799"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: "#c8ff00",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            +27 62 177 9799
          </a>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#666666",
              letterSpacing: "0.03em",
            }}
          >
            Pretoria, South Africa
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#333333",
              letterSpacing: "0.03em",
            }}
          >
            {"\u00A9"} {new Date().getFullYear()} Stacked Marketing. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
