export default function ProblemSection() {
  const cards = [
    {
      title: "Your Web Designer",
      text: "Builds a pretty site. Has no idea what your ads say. Does not care about your email list.",
    },
    {
      title: "Your Ads Agency",
      text: "Sends traffic to your site. Has no control over the landing page. Does not follow up on leads.",
    },
    {
      title: "Your Email Marketer",
      text: "Sends newsletters. Has no idea where the leads came from. Works from a different brief entirely.",
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
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#c8ff00",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          The problem
        </div>

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
          The Three-Vendor Trap
        </h2>

        <div className="svc-problem-grid">
          {cards.map((card) => (
            <div
              key={card.title}
              className="svc-card-hover"
              style={{
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: 32,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#f5f5f0",
                  marginBottom: 16,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15,
                  color: "#a0a0a0",
                  lineHeight: 1.7,
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.2rem)",
            color: "#a0a0a0",
            textAlign: "center",
            marginTop: 48,
            lineHeight: 1.6,
          }}
        >
          Three invoices. Three strategies. Zero alignment.
          <br />
          Sound familiar?
        </p>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1.1rem, 1rem + 0.5vw, 1.4rem)",
            fontWeight: 700,
            color: "#c8ff00",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          There is a better way.
        </p>
      </div>
    </section>
  );
}
