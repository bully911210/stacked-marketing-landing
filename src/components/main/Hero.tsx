"use client";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 64,
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div className="container-main hero-content">
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
          }}
        >
          Website. Ads. Email. One team. One invoice. Pretoria.
        </p>

        <div
          className="hero-fade hero-fade-delay-2"
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
            flexWrap: "wrap",
          }}
        >
          <a href="#contact" className="btn-primary">
            Get Your Game Plan
          </a>
          <a href="#proof" className="btn-ghost">
            See What We&apos;ve Done
          </a>
        </div>
      </div>

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
