"use client";

function TickIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2.5 7L5.5 10L11.5 4" stroke="var(--lime-on-light)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const proofItems = [
  "No contracts",
  "You own everything",
  "Live in 5 days",
  "R68 avg. CPA",
];

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
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80vw 60vh at 50% 0%, rgba(107,122,63,0.10) 0%, transparent 70%), linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        poster="/brand/hero-16x9.jpg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.22,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <source src="/brand/hero-16x9.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(247,245,239,0.78) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="container-main hero-content"
        style={{ paddingTop: "clamp(32px, 4vw, 48px)", position: "relative", zIndex: 1 }}
      >
        {/* Pill label */}
        <div
          className="hero-fade"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            border: "1px solid rgba(107,122,63,0.25)",
            background: "rgba(107,122,63,0.08)",
            borderRadius: 100,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--lime)",
              animation: "eyebrowPulse 2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--lime)",
            }}
          >
            WEBSITES &middot; MANAGED ADS
          </span>
        </div>

        <h1
          className="hero-fade hero-fade-delay-1"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-hero)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            maxWidth: 820,
          }}
        >
          We spent R205K of our own money{" "}
          <span
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--gold)",
            }}
          >
            first.
          </span>
        </h1>

        <p
          className="hero-fade hero-fade-delay-2"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            maxWidth: 580,
            marginTop: 24,
            lineHeight: 1.75,
          }}
        >
          R68 cost per lead. 5,000 subscription clients.
          A restricted category everyone told us was impossible.
          We proved the model on our own rand — then opened it to clients.
        </p>

        {/* Proof ribbon */}
        <div
          className="hero-fade hero-fade-delay-3 hero-proof-ribbon"
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: 28,
            marginBottom: 32,
          }}
        >
          {proofItems.map((label) => (
            <span
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
              }}
            >
              <TickIcon />
              {label}
            </span>
          ))}
        </div>

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
            }}
          >
            Get my free game plan
            <span aria-hidden="true" style={{ marginLeft: 8 }}>&rarr;</span>
          </a>
          <a
            href="#pricing"
            className="btn-secondary"
          >
            See what we charge
            <span aria-hidden="true" style={{ marginLeft: 6 }}>&darr;</span>
          </a>
        </div>

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
          zIndex: 1,
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
          .hero-proof-ribbon {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
