"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 64,
        paddingBottom: 0,
        backgroundColor: "var(--bg-primary)",
        position: "relative",
      }}
    >
      <div
        className="container-main hero-content"
        style={{ paddingTop: "clamp(32px, 4vw, 48px)" }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--lime-on-light)",
            marginBottom: 24,
          }}
        >
          WEBSITE + ADS + AUTOMATIONS
        </p>

        <h1
          className="text-display"
          style={{ maxWidth: 800 }}
        >
          Your Marketing Isn&apos;t Broken.
          It&apos;s Disconnected.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "1.25rem",
            color: "var(--text-secondary)",
            maxWidth: 560,
            marginTop: 24,
            marginBottom: 40,
          }}
        >
          Website. Ads. Automations. Three parts of one system.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a
            href="#contact"
            className="btn-primary"
            style={{
              padding: "18px 40px",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            See How It Stacks
          </a>
          <a
            href="#proof"
            className="btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            View Case Studies
            <span aria-hidden="true" style={{ fontSize: "1.1em" }}>&rarr;</span>
          </a>
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(26, 26, 26, 0.03) 60%, rgba(26, 26, 26, 0.06) 100%)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        .hero-content {
          text-align: left;
        }
        @media (max-width: 767px) {
          .hero-content {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
