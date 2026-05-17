"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const credentials = [
  { value: "R205K+", label: "Own Ad Spend" },
  { value: "5,000+", label: "Clients Generated" },
  { value: "5 Days", label: "Average Launch" },
  { value: "0", label: "Contracts Required" },
];

const differentiators = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Skin in the game.",
    description: "We ran restricted-category Meta ads with our own money, our own accounts, and our own risk. We know what works because we paid to find out.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    title: "You own everything.",
    description: "Your website code, your ad accounts, your audience data. Leave tomorrow and take all of it. No hostage situations.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Live in 5 business days.",
    description: "Not 6 weeks. Not \"we'll be in touch.\" Your site or your ads go live within 5 business days of sign-off. We've never missed it.",
  },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal(0.15);
  const { ref: credRef, isVisible: credVisible } = useScrollReveal(0.15);
  const { ref: diffRef, isVisible: diffVisible } = useScrollReveal(0.15);

  return (
    <section
      id="about"
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="section-divider" style={{ marginBottom: "var(--section-gap-desktop)" }} />

      <div className="container-main">
        {/* Heading */}
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
          style={{
            maxWidth: 700,
            marginInline: "auto",
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          <h2
            className="text-h2"
            style={{
              marginBottom: 16,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
            }}
          >
            Why this is different.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-lg)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            Based in Pretoria. Built for businesses that want results, not reports.
          </p>
        </div>

        {/* Credentials strip */}
        <div
          ref={credRef}
          className={`fade-up ${credVisible ? "visible" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginBottom: 56,
            maxWidth: 800,
            marginInline: "auto",
          }}
        >
          {credentials.map((cred) => (
            <div key={cred.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 3vw, 2rem)",
                  color: "var(--gold)",
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {cred.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {cred.label}
              </p>
            </div>
          ))}
        </div>

        {/* Differentiator cards */}
        <div
          ref={diffRef}
          className={`fade-up about-diff-grid ${diffVisible ? "visible" : ""}`}
        >
          {differentiators.map((d) => (
            <div
              key={d.title}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: 32,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--color-accent-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginInline: "auto",
                  marginBottom: 16,
                }}
              >
                {d.icon}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                {d.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {d.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-diff-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 767px) {
          .about-diff-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin-inline: auto;
          }
        }
      `}</style>
    </section>
  );
}
