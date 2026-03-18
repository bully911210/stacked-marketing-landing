export default function BundleCalculator() {
  return (
    <section
      style={{
        paddingBlock: "clamp(4rem, 3rem + 5vw, 8rem)",
        paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
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
          Do the Maths.
        </h2>

        <div className="svc-bundle-grid">
          {/* Left: Separate pricing */}
          <div
            style={{
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: 32,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#a0a0a0",
                marginBottom: 24,
              }}
            >
              If you bought separately:
            </div>
            {[
              { label: "Custom website", price: "R1,999" },
              { label: "Ads management (Convert)", price: "R7,999/mo" },
              { label: "Email automation", price: "R3,000/mo" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBlock: 12,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 15,
                    color: "#d0d0c8",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 14,
                    color: "#a0a0a0",
                  }}
                >
                  {item.price}
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 16,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#f5f5f0",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#ff4444",
                  textDecoration: "line-through",
                }}
              >
                R12,998+
              </span>
            </div>
          </div>

          {/* Right: Full Stack */}
          <div
            style={{
              background: "#111111",
              border: "1px solid #c8ff00",
              borderRadius: 8,
              padding: 32,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#c8ff00",
                marginBottom: 24,
              }}
            >
              Full Stack:
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 900,
                color: "#f5f5f0",
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}
            >
              R11,999
              <span
                style={{
                  fontSize: "0.4em",
                  fontWeight: 400,
                  color: "#a0a0a0",
                }}
              >
                /mo
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                color: "#c8ff00",
                marginBottom: 24,
              }}
            >
              Website FREE
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "#c8ff00",
                lineHeight: 1.6,
              }}
            >
              You save: R1,000+ every month.
              <br />
              R12,000+ per year.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
