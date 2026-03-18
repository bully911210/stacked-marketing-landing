"use client";

const steps = [
  {
    num: "01",
    title: "Fill In the Form",
    desc: "Tell us about your business, your goals, and your budget. Takes two minutes.",
  },
  {
    num: "02",
    title: "Strategy Call",
    desc: "We review your market, competitors, and opportunities. Then we map the plan.",
  },
  {
    num: "03",
    title: "We Build Everything",
    desc: "Pixel, audiences, creatives, copy, campaign structure. All done for you.",
  },
  {
    num: "04",
    title: "Ads Go Live",
    desc: "Your campaigns launch. We monitor, optimise, and report. You get leads.",
  },
];

export default function AdsProcess() {
  return (
    <section style={{ paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Tag */}
        <div
          className="ads-tag"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "#c8ff00",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          THE PROCESS
        </div>

        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 48,
            lineHeight: 1.05,
          }}
        >
          Live Ads in 5 Days. Not 5 Weeks.
        </h2>

        <div className="ads-process-grid">
          {steps.map((step) => (
            <div
              key={step.num}
              className="ads-card"
              style={{
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Large faded bg number */}
              <div className="ads-step-number">{step.num}</div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 12,
                    color: "#c8ff00",
                    marginBottom: 16,
                    letterSpacing: "0.05em",
                  }}
                >
                  STEP {step.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#f5f5f0",
                    marginBottom: 12,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    color: "#a0a0a0",
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
