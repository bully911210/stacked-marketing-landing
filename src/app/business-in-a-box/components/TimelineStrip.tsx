"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { day: "DAY 1", desc: "Onboarding call + brand briefing" },
  { day: "DAY 2-3", desc: "Brand kit + website build" },
  { day: "DAY 4-5", desc: "Facebook, WhatsApp, SEO setup" },
  { day: "DAY 6", desc: "Content loaded + final review" },
  { day: "DAY 7", desc: "You are live. Open for business." },
];

export default function TimelineStrip() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-main">
        <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""}`}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-h2)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Your 7-day timeline.
          </h2>

          {/* Desktop timeline */}
          <div className="biab-timeline-desktop desktop-only">
            {steps.map((step, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    color: "var(--lime)",
                    marginBottom: 12,
                  }}
                >
                  {step.day}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
            {/* Connecting line */}
            <div
              style={{
                position: "absolute",
                top: 8,
                left: "10%",
                right: "10%",
                height: 1,
                background: "var(--border)",
                zIndex: 0,
              }}
            />
          </div>

          {/* Mobile timeline */}
          <div className="biab-timeline-mobile mobile-only">
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 20,
                  paddingBottom: 24,
                  position: "relative",
                }}
              >
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 6,
                      top: 18,
                      bottom: 0,
                      width: 1,
                      background: "var(--border)",
                    }}
                  />
                )}
                {/* Dot */}
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "var(--lime)",
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      color: "var(--lime)",
                      marginBottom: 4,
                    }}
                  >
                    {step.day}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom text */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              color: "var(--text-secondary)",
              fontSize: "var(--text-body)",
              textAlign: "center",
              marginTop: 48,
            }}
          >
            Agencies take 6 to 12 weeks. Freelancers take 3 to 6. We built a system. You get{" "}
            <span style={{ color: "var(--lime)" }}>7 days</span>.
          </p>
        </div>
      </div>

      <style>{`
        .biab-timeline-desktop {
          display: flex;
          position: relative;
          gap: 0;
          padding: 0 20px;
        }
      `}</style>
    </section>
  );
}
