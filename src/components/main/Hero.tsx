"use client";

const services = [
  { label: "Website", descriptor: "Built to convert" },
  { label: "Ads", descriptor: "Targeted to your buyer" },
  { label: "Automations", descriptor: "Routed instantly" },
];

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
        className="container-main hero-layout"
        style={{ paddingTop: "clamp(32px, 4vw, 48px)" }}
      >
        {/* Left column: headline, subheadline, CTAs */}
        <div className="hero-left">
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

        {/* Right column: services block */}
        <div className="hero-right hero-fade hero-fade-delay-2">
          <div className="hero-services-block">
            {services.map((svc, i) => (
              <div
                key={svc.label}
                className="hero-service-row"
                style={{
                  borderTop: i === 0 ? "1px solid #222222" : "none",
                  borderBottom: "1px solid #222222",
                }}
              >
                <span className="hero-service-label">{svc.label}</span>
                <span className="hero-service-desc">{svc.descriptor}</span>
              </div>
            ))}
          </div>
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
        /* Desktop: two-column layout */
        @media (min-width: 768px) {
          .hero-layout {
            display: grid;
            grid-template-columns: 1fr 35%;
            gap: 48px;
            align-items: center;
            text-align: left;
          }
          .hero-right {
            align-self: center;
          }
        }

        /* Mobile: single column */
        @media (max-width: 767px) {
          .hero-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .hero-right {
            width: 100%;
            margin-top: 48px;
          }
        }

        /* Services block */
        .hero-services-block {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
          border-left: 2px solid #C8FF00;
          padding-left: 20px;
        }

        /* Service row: desktop */
        .hero-service-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
        }

        .hero-service-label {
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.125rem;
          flex-shrink: 0;
          white-space: nowrap;
          font-family: var(--font-body);
        }

        .hero-service-desc {
          color: #666666;
          font-size: 0.875rem;
          font-weight: 400;
          text-align: right;
          white-space: nowrap;
          flex-shrink: 0;
          font-family: var(--font-body);
        }

        /* Service row: mobile */
        @media (max-width: 767px) {
          .hero-service-row {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px 0;
            gap: 4px;
          }
          .hero-service-desc {
            text-align: left;
          }
          .hero-services-block {
            padding-left: 16px;
          }
        }
      `}</style>
    </section>
  );
}
