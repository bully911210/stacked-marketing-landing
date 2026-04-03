"use client";

const industries = [
  { name: "Insurance", icon: "\u{1F6E1}\uFE0F" },
  { name: "Non-Profit", icon: "\u{1F91D}" },
  { name: "Agriculture", icon: "\u{1F33E}" },
  { name: "Financial Services", icon: "\u{1F4C8}" },
  { name: "Recruitment", icon: "\u{1F465}" },
  { name: "E-Commerce", icon: "\u{1F6D2}" },
  { name: "Healthcare", icon: "\u{2695}\uFE0F" },
  { name: "Real Estate", icon: "\u{1F3E0}" },
  { name: "Education", icon: "\u{1F393}" },
  { name: "Automotive", icon: "\u{1F697}" },
];

export default function LogoMarquee() {
  const doubled = [...industries, ...industries];

  return (
    <section
      style={{
        paddingBlock: 48,
        backgroundColor: "var(--bg-primary)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}
        >
          TRUSTED ACROSS INDUSTRIES
        </p>
      </div>

      <div
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 48,
            animation: "marqueeScroll 40s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((industry, i) => (
            <div
              key={`${industry.name}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexShrink: 0,
                opacity: 0.4,
                transition: "opacity 0.3s ease",
              }}
              onMouseOver={(e) => { e.currentTarget.style.opacity = "0.8"; }}
              onMouseOut={(e) => { e.currentTarget.style.opacity = "0.4"; }}
            >
              <span style={{ fontSize: "1.5rem" }}>{industry.icon}</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                }}
              >
                {industry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
