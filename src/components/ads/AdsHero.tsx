"use client";

export default function AdsHero() {
  const stats = [
    { value: "5", label: "Businesses built on Meta" },
    { value: "R68", label: "Lowest CPA (restricted category)" },
    { value: "4.31%", label: "Blended CTR at 8.6M impressions" },
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* Eyebrow */}
        <div
          className="ads-tag"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "#c8ff00",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          META ADS MANAGEMENT // PRETORIA
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#f5f5f0",
            marginBottom: 32,
            maxWidth: 900,
          }}
        >
          We Don&apos;t Run Ads.
          <br />
          We Build{" "}
          <span style={{ color: "#c8ff00" }}>Businesses.</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            fontWeight: 300,
            lineHeight: 1.6,
            color: "#d0d0c8",
            maxWidth: 560,
            marginBottom: 48,
          }}
        >
          Five businesses. Four industries. All built from scratch on Meta ads.
          Now we build yours. No contracts. No lock-in. Just leads, or you walk.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
          <a
            href="#pricing"
            className="ads-btn-filled"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "14px 32px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            SEE PRICING
          </a>
          <a
            href="https://wa.me/27621779799"
            target="_blank"
            rel="noopener noreferrer"
            className="ads-btn-ghost"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background: "transparent",
              color: "#f5f5f0",
              padding: "14px 32px",
              textDecoration: "none",
              display: "inline-block",
              border: "1px solid #5a5a52",
            }}
          >
            WHATSAPP US
          </a>
        </div>

        {/* Trust Stats */}
        <div
          style={{
            borderTop: "1px solid rgba(245,245,240,0.08)",
            paddingTop: 32,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 32,
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  color: "#c8ff00",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#8a8a80",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
