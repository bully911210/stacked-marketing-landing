"use client";

export default function ServicesHero() {
  const handleScrollToTiers = () => {
    const el = document.getElementById("tiers");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      style={{
        paddingTop: 80,
        paddingBottom: "clamp(4rem, 3rem + 5vw, 8rem)",
        paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Scarcity badge */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c8ff00",
            background: "rgba(200, 255, 0, 0.06)",
            border: "1px solid rgba(200, 255, 0, 0.2)",
            borderRadius: 100,
            padding: "8px 20px",
            display: "inline-block",
            marginBottom: 32,
          }}
        >
          Only 5 Full Stack slots left this month
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
            marginBottom: 24,
          }}
        >
          Stop Paying Three Companies to Do{" "}
          <span style={{ color: "#c8ff00" }}>One Job.</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1.1rem, 1rem + 0.5vw, 1.35rem)",
            fontWeight: 400,
            color: "#a0a0a0",
            lineHeight: 1.6,
            maxWidth: 650,
            margin: "0 auto 40px",
          }}
        >
          Website. Ads. Email automation. One team. One invoice. One strategy
          that actually works.
        </p>

        {/* CTA */}
        <button
          onClick={handleScrollToTiers}
          className="svc-btn-filled"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: "#c8ff00",
            color: "#0a0a0a",
            padding: "16px 48px",
            borderRadius: 8,
            border: "2px solid #c8ff00",
            cursor: "pointer",
            marginBottom: 48,
          }}
        >
          SEE THE PACKAGES
        </button>

        {/* Trust row */}
        <div className="svc-trust-row">
          {[
            "No contracts",
            "You own everything",
            "Cancel anytime",
            "Pretoria-based",
          ].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#666666",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
