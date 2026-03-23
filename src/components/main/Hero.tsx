"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 77,
        paddingBottom: 0,
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        background:
          "radial-gradient(ellipse at 80% 0%, rgba(200, 255, 0, 0.06) 0%, transparent 60%) var(--bg-primary)",
      }}
    >
      <div
        className="container-main hero-content"
        style={{ paddingTop: "clamp(32px, 4vw, 48px)" }}
      >
        {/* Eyebrow */}
        <p
          className="hero-fade"
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
          className="text-display hero-fade hero-fade-delay-1"
          style={{ maxWidth: 800 }}
        >
          Your Marketing Isn&apos;t Broken.
          {" "}It&apos;s Disconnected.
        </h1>

        <p
          className="hero-fade hero-fade-delay-2"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "1.25rem",
            color: "var(--text-secondary)",
            maxWidth: 600,
            marginTop: 24,
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          One system that turns ad spend into paying customers.
          Website. Ads. Automations. All connected.
        </p>

        <div
          className="hero-buttons hero-fade hero-fade-delay-3"
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a
            href="#contact"
            className="btn-accent"
            style={{
              padding: "18px 40px",
              fontSize: "1.125rem",
            }}
          >
            Get Your Game Plan
            <span aria-hidden="true" style={{ marginLeft: 8 }}>&rarr;</span>
          </a>
          <a
            href="#pricing"
            className="btn-ghost"
          >
            See Pricing
            <span aria-hidden="true" style={{ marginLeft: 6 }}>&darr;</span>
          </a>
        </div>

        {/* Trust bar pills */}
        <div
          className="hero-fade hero-fade-delay-4 hero-trust-bar"
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 40,
          }}
        >
          {[
            "No contracts",
            "You own everything",
            "Live in 5 days",
            "Upgrade anytime with R2,000 credit",
          ].map((badge) => (
            <span
              key={badge}
              style={{
                display: "inline-block",
                backgroundColor: "var(--color-accent-muted)",
                border: "1px solid var(--color-accent-border)",
                color: "var(--lime-on-light)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                padding: "6px 16px",
                borderRadius: "var(--radius-pill)",
                textTransform: "uppercase",
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-fade hero-fade-delay-4"
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{
            animation: "scrollBounce 2s ease-in-out infinite",
          }}
        >
          <path
            d="M8 4L8 18M8 18L14 12M8 18L2 12"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          .hero-trust-bar {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
