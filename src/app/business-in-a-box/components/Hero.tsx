"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: 120,
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          background:
            "radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative" }}>
        {/* Pill tag */}
        <div
          className="hero-fade"
          style={{ animationDelay: "0s" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "var(--lime)",
              opacity: 0.7,
              background: "var(--color-accent-muted)",
              padding: "6px 16px",
              borderRadius: "var(--radius-pill)",
              display: "inline-block",
            }}
          >
            LIMITED LAUNCH OFFER
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-fade"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-hero)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginTop: 24,
            animationDelay: "0.1s",
          }}
        >
          Nobody Trusts a Business{" "}
          <br className="desktop-only" />
          They Can&apos;t{" "}
          <span style={{ color: "var(--lime)" }}>Google.</span>
        </h1>

        {/* Subtext */}
        <p
          className="hero-fade"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body-lg)",
            color: "var(--text-secondary)",
            maxWidth: 580,
            marginTop: 24,
            lineHeight: 1.6,
            animationDelay: "0.2s",
          }}
        >
          Look like you have been in business for years. Be live in 7 days.
        </p>

        {/* Price block */}
        <div
          className="hero-fade"
          style={{ marginTop: 32, animationDelay: "0.3s" }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "var(--lime)",
              lineHeight: 1.1,
            }}
          >
            R2,999
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caption)",
              color: "var(--text-muted)",
              marginTop: 8,
            }}
          >
            Once-off. No monthly fees.{" "}
            <span
              style={{
                color: "var(--text-secondary)",
                fontWeight: 700,
              }}
            >
              You own everything.
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div
          className="hero-fade biab-hero-buttons"
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
            animationDelay: "0.4s",
          }}
        >
          <a
            href="#order"
            className="btn-primary"
            style={{
              padding: "16px 36px",
              borderRadius: "var(--radius-pill)",
              fontWeight: 700,
            }}
          >
            I WANT THIS
          </a>
          <a
            href="#whats-inside"
            className="btn-secondary"
            style={{
              padding: "16px 36px",
              borderRadius: "var(--radius-pill)",
              color: "var(--text-secondary)",
              fontWeight: 500,
            }}
          >
            See what&apos;s included
          </a>
        </div>

        {/* USP strip */}
        <div
          className="hero-fade biab-usp-strip"
          style={{
            marginTop: 40,
            animationDelay: "0.5s",
          }}
        >
          {[
            "No contracts",
            "You own everything",
            "Live in 7 days",
            "R2,000 upgrade credit",
          ].map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {i > 0 && (
                <span
                  className="biab-usp-divider"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.6rem",
                  }}
                >
                  |
                </span>
              )}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-caption)",
                  color: "var(--text-muted)",
                }}
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .biab-hero-buttons {
          flex-wrap: wrap;
        }
        .biab-usp-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        @media (max-width: 767px) {
          .biab-hero-buttons {
            flex-direction: column;
          }
          .biab-hero-buttons .btn-primary,
          .biab-hero-buttons .btn-secondary {
            width: 100% !important;
            text-align: center;
            justify-content: center;
          }
          .biab-usp-strip {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 8px !important;
          }
          .biab-usp-divider {
            display: none !important;
          }
          #hero {
            text-align: center;
          }
          #hero .container-main {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
