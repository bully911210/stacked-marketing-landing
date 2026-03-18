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
    <section id="pricing" style={{ padding: "120px 24px 80px" }}>
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
            color: "#8a8a80",
            marginBottom: 48,
            maxWidth: 700,
            lineHeight: 1.6,
          }}
        >
          No contracts. No lock-in. Cancel any time. Every plan includes a real
          human in Pretoria who answers your WhatsApp.
        </p>

        {/* Pricing grid */}
        <div className="ads-pricing-grid" style={{ marginBottom: 32 }}>
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={pkg.featured ? "ads-card-featured" : "ads-card"}
              style={{
                padding: 32,
                flexDirection: "column",
                position: "relative",
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
                    position: "absolute",
                    top: 0,
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
                  color: "#8a8a80",
                  marginBottom: 8,
                  marginTop: pkg.banner ? 24 : 0,
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
                    color: "#5a5a52",
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
                  gap: 12,
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
                className={pkg.featured ? "ads-btn-filled" : "ads-btn-ghost"}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  padding: "14px 24px",
                  textDecoration: "none",
                  display: "block",
                  ...(pkg.featured
                    ? { background: "#c8ff00", color: "#0a0a0a" }
                    : {
                        background: "transparent",
                        color: "#f5f5f0",
                        border: "1px solid #5a5a52",
                      }),
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
            color: "#5a5a52",
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
