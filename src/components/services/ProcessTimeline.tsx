export default function ProcessTimeline() {
  const phases = [
    {
      number: "01",
      title: "BUILD",
      text: "We design and launch your custom website in under 2 weeks. Optimised to capture leads from day one.",
    },
    {
      number: "02",
      title: "DRIVE",
      text: "We launch your Meta ads campaign. Targeted traffic hits your new site. Leads start flowing.",
    },
    {
      number: "03",
      title: "NURTURE",
      text: "Every lead gets an automated email sequence. Welcome series, follow-ups, re-engagement. No lead falls through the cracks.",
    },
  ];

  return (
    <section
      style={{
        paddingBlock: "clamp(4rem, 3rem + 5vw, 8rem)",
        paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 48,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          How the Full Stack Works
        </h2>

        <div className="svc-process-grid">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="svc-card-hover"
              style={{
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Large background number */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "6rem",
                  fontWeight: 900,
                  color: "rgba(200, 255, 0, 0.06)",
                  pointerEvents: "none",
                  lineHeight: 1,
                  userSelect: "none",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {phase.number}
              </div>

              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "#c8ff00",
                  marginBottom: 8,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {phase.number}
              </div>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#f5f5f0",
                  marginBottom: 12,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {phase.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15,
                  color: "#a0a0a0",
                  lineHeight: 1.7,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {phase.text}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1.1rem, 1rem + 0.5vw, 1.4rem)",
            fontWeight: 700,
            color: "#c8ff00",
            textAlign: "center",
            marginTop: 48,
          }}
        >
          The result: a self-sustaining growth engine.
        </p>
      </div>
    </section>
  );
}
