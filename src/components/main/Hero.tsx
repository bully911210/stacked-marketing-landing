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
      <div className="container-main hero-content" style={{ paddingTop: "clamp(32px, 4vw, 48px)" }}>
        <h1
          className="text-display hero-fade"
          style={{ maxWidth: 800 }}
        >
          Stop Paying Three Companies to Do One Job.
        </h1>

        <p
          className="hero-fade hero-fade-delay-1"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "1.25rem",
            color: "var(--text-secondary)",
            maxWidth: 560,
            marginTop: 24,
            marginBottom: 32,
          }}
        >
          Website. Ads. Email. One team. One invoice. Pretoria.
        </p>

        <div
          className="hero-fade hero-fade-delay-2"
          style={{
            display: "flex",
            gap: 16,
            marginTop: 8,
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
            Get Your Game Plan
          </a>
          <a href="#proof" className="btn-ghost">
            See What We&apos;ve Done
          </a>
        </div>
      </div>

      {/* Gradient fade at bottom of hero transitioning to trust bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(180deg, transparent 0%, rgba(26, 26, 26, 0.03) 60%, rgba(26, 26, 26, 0.06) 100%)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @media (max-width: 767px) {
          .hero-content {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        @media (min-width: 768px) {
          .hero-content {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
