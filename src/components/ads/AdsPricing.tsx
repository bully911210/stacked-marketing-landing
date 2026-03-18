"use client";

const packages = [
  {
    name: "LAUNCH",
    price: "R4,999",
    period: "/month",
    featured: false,
    banner: null,
    tagline: "Get leads flowing.",
    intro: null,
    features: [
      "3 ad campaigns (active management)",
      "Audience research and targeting",
      "Ad creative (copy + basic graphics)",
      "Monthly performance report",
      "WhatsApp support",
      "Meta Pixel installation",
      "Campaign budget recommendations",
    ],
    ctaText: "START WITH LAUNCH",
    whatsappMsg: "Hi, I am interested in the Launch package at R4,999/month.",
  },
  {
    name: "CONVERT",
    price: "R7,999",
    period: "/month",
    featured: true,
    banner: "MOST POPULAR",
    tagline: "Turn clicks into customers.",
    intro: "Everything in Launch, plus:",
    features: [
      "Conversion API (server-side tracking)",
      "Custom landing page design",
      "A/B testing on ad creatives",
      "Lead form optimisation",
      "Retargeting campaigns",
      "Bi-weekly performance calls",
      "Google Analytics setup",
    ],
    ctaText: "START WITH CONVERT",
    whatsappMsg: "Hi, I am interested in the Convert package at R7,999/month.",
  },
  {
    name: "DOMINATE",
    price: "R12,999",
    period: "/month",
    featured: false,
    banner: null,
    tagline: "Full stack. Full send.",
    intro: "Everything in Convert, plus:",
    features: [
      "Full website management",
      "Ongoing landing page updates",
      "Full-funnel strategy (awareness to conversion)",
      "Lookalike audience building",
      "Creative refresh every 2 weeks",
      "Priority WhatsApp support (same-day response)",
      "Monthly strategy session (45 min)",
    ],
    ctaText: "START WITH DOMINATE",
    whatsappMsg:
      "Hi, I am interested in the Dominate package at R12,999/month.",
  },
];

export default function AdsPricing() {
  return (
    <section id="pricing" style={{ paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)" }}>
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
          PACKAGES
        </div>

        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 16,
            lineHeight: 1.05,
          }}
        >
          Pick Your Lane.
        </h2>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 16,
            color: "#a0a0a0",
            marginBottom: 48,
            maxWidth: 700,
            lineHeight: 1.6,
          }}
        >
          No contracts. No lock-in. Cancel any time. Every plan includes a real
          human in Pretoria who answers your WhatsApp.
        </p>

        {/* Pricing grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            alignItems: "start",
            marginBottom: 32,
          }}
          className="ads-pricing-grid"
        >
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              style={{
                padding: 32,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background: pkg.featured ? "#111111" : "#161616",
                border: pkg.featured
                  ? "1px solid #c8ff00"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
              }}
            >
              {pkg.banner && (
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#0a0a0a",
                    background: "#c8ff00",
                    padding: "6px 16px",
                    borderRadius: 100,
                    position: "absolute",
                    top: -14,
                    right: 24,
                    fontWeight: 700,
                  }}
                >
                  {pkg.banner}
                </div>
              )}

              {/* Package name */}
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#a0a0a0",
                  marginBottom: 8,
                  marginTop: pkg.banner ? 12 : 0,
                }}
              >
                {pkg.name}
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: "#c8ff00",
                  marginBottom: 16,
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                {pkg.tagline}
              </div>

              {/* Price */}
              <div style={{ marginBottom: 24 }}>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 2.8rem)",
                    fontWeight: 800,
                    color: "#f5f5f0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {pkg.price}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    color: "#666666",
                  }}
                >
                  {pkg.period}
                </span>
              </div>

              {/* Intro line */}
              {pkg.intro && (
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    color: "#c8ff00",
                    marginBottom: 16,
                    fontWeight: 500,
                  }}
                >
                  {pkg.intro}
                </p>
              )}

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginBottom: 32,
                  flex: 1,
                }}
              >
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 14,
                      color: "#d0d0c8",
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        color: "#c8ff00",
                        flexShrink: 0,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      +
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/27621779799?text=${encodeURIComponent(pkg.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase" as const,
                  textAlign: "center" as const,
                  padding: "14px 24px",
                  borderRadius: 6,
                  textDecoration: "none",
                  display: "block",
                  background: pkg.featured ? "#c8ff00" : "transparent",
                  color: pkg.featured ? "#0a0a0a" : "#f5f5f0",
                  border: pkg.featured
                    ? "2px solid #c8ff00"
                    : "2px solid rgba(255,255,255,0.15)",
                }}
              >
                {pkg.ctaText}
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "#666666",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          All prices exclude ad spend. Minimum recommended ad budget is
          R3,000/month. No contracts. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
