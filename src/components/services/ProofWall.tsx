export default function ProofWall() {
  const verticals = [
    { industry: "Insurance", stat: "3,000+ customers acquired" },
    { industry: "Non-profit", stat: "Advocacy campaign reach" },
    { industry: "Agriculture", stat: "Lead generation at scale" },
    { industry: "Financial Services", stat: "High-value lead pipeline" },
    { industry: "Recruitment BPO", stat: "Candidate acquisition" },
  ];

  const stats = [
    { value: "5", label: "Businesses built" },
    { value: "R68", label: "Lowest CPA" },
    { value: "4.31%", label: "Highest CTR" },
    { value: "R205K+", label: "Our own ad spend" },
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
          We Built Five Businesses on Meta.
          <br />
          Now We Build Yours.
        </h2>

        <div className="svc-proof-grid" style={{ marginBottom: 48 }}>
          {verticals.map((v) => (
            <div
              key={v.industry}
              className="svc-card-hover"
              style={{
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#f5f5f0",
                  marginBottom: 8,
                }}
              >
                {v.industry}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  color: "#a0a0a0",
                  lineHeight: 1.5,
                }}
              >
                {v.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="svc-stats-row"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "clamp(2rem, 1.5rem + 2vw, 3rem)",
            marginBottom: 32,
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 800,
                  color: "#c8ff00",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#a0a0a0",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.2rem)",
            fontWeight: 600,
            color: "#c8ff00",
            textAlign: "center",
          }}
        >
          Whatever your industry, we have probably already cracked something
          harder.
        </p>
      </div>
    </section>
  );
}
