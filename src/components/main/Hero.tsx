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
          "radial-gradient(ellipse at 50% 30%, rgba(200, 255, 0, 0.04) 0%, transparent 60%) var(--bg-primary)",
      }}
    >
      <div
        className="container-main hero-content"
        style={{ paddingTop: "clamp(32px, 4vw, 48px)" }}
      >
        {/* Pill label */}
        <div
          className="hero-fade"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            border: "1px solid var(--border-accent)",
            borderRadius: 100,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caption)",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--lime)",
            }}
          >
            WEBSITE + ADS + AUTOMATIONS
          </span>
        </div>

        <h1
          className="text-h1 hero-fade hero-fade-delay-1"
          style={{ maxWidth: 800 }}
        >
          Your Marketing Isn&apos;t Broken.
          <br />
          <span style={{ color: "var(--lime)" }}>It&apos;s Disconnected.</span>
        </h1>

        <p
          className="hero-fade hero-fade-delay-2"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "var(--text-body-lg)",
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
            className="btn-primary"
            style={{
              padding: "18px 40px",
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            GET MY FREE GAME PLAN
            <span aria-hidden="true" style={{ marginLeft: 8 }}>&rarr;</span>
          </a>
          <a
            href="#pricing"
            className="btn-secondary"
          >
            SEE PRICING
            <span aria-hidden="true" style={{ marginLeft: 6 }}>&darr;</span>
          </a>
        </div>

        {/* Microcopy */}
        <p
          className="hero-fade hero-fade-delay-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-caption)",
            color: "var(--text-muted)",
            marginTop: 12,
          }}
        >
          Free. No obligation. We WhatsApp you within 24 hours.
        </p>

        {/* 4-column USP strip */}
        <div
          className="hero-fade hero-fade-delay-4 hero-usp-grid"
          style={{
            display: "grid",
            gap: 16,
            marginTop: 56,
          }}
        >
          {[
            { icon: "🔓", label: "No Contracts" },
            { icon: "🛡️", label: "You Own Everything" },
            { icon: "⚡", label: "Live in 5 Days" },
            { icon: "↑", label: "R2,000 Upgrade Credit" },
          ].map((usp) => (
            <div
              key={usp.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontSize: "1.25rem",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  backgroundColor: "var(--color-accent-muted)",
                  flexShrink: 0,
                }}
              >
                {usp.icon}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.02em",
                }}
              >
                {usp.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated chevron */}
      <a
        href="#proof"
        aria-label="Scroll to results"
        className="hero-fade hero-fade-delay-4 desktop-only"
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ animation: "chevronPulse 2s ease-in-out infinite" }}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <style>{`
        .hero-content {
          text-align: left;
        }
        .hero-usp-grid {
          grid-template-columns: repeat(4, auto);
          justify-content: start;
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
          .hero-usp-grid {
            grid-template-columns: 1fr 1fr;
            justify-content: center;
            justify-items: start;
            gap: 12px;
          }
        }
        @media (max-width: 374px) {
          .hero-usp-grid {
            grid-template-columns: 1fr;
            justify-items: center;
          }
        }
      `}</style>
    </section>
  );
}
