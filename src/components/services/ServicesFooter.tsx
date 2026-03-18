export default function ServicesFooter() {
  return (
    <footer
      style={{
        paddingBlock: "clamp(3rem, 2rem + 3vw, 5rem)",
        paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#f5f5f0",
            marginBottom: 12,
          }}
        >
          <span style={{ color: "#c8ff00" }}>S</span>TACKED MARKETING
        </div>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 14,
            color: "#a0a0a0",
            marginBottom: 16,
          }}
        >
          One team. One invoice. One strategy that actually works.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 24,
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
              letterSpacing: "0.05em",
            }}
          >
            WhatsApp
          </a>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: "#666666",
            }}
          >
            Pretoria, South Africa
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "#444444",
            letterSpacing: "0.05em",
          }}
        >
          &copy; 2026 Stacked Marketing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
