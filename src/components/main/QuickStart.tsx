"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const options = [
  {
    name: "Basic Starter Website",
    price: "R2,499",
    note: "once-off",
    platform: "Framer",
    description:
      "A beautiful 4-page custom website, live in 5 days. Mobile-perfect, lightning-fast, 100% yours.",
  },
];

export default function QuickStart() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section
      id="quickstart"
      className="section-spacing"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h2"
            style={{
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Quick Start Options
          </h2>
        </div>

        <div className="qs-grid">
          {options.map((option, i) => (
            <QuickStartCard key={option.name} option={option} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .qs-grid {
          display: flex;
          justify-content: center;
          gap: 24px;
          max-width: 480px;
          margin: 0 auto;
        }
      `}</style>
    </section>
  );
}

function QuickStartCard({
  option,
  index,
}: {
  option: (typeof options)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "clamp(28px, 4vw, 40px) clamp(24px, 3vw, 32px)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.boxShadow =
          "0 4px 16px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "var(--text-primary)",
          marginBottom: 8,
        }}
      >
        {option.name}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "2rem",
          color: "var(--lime-on-light)",
          marginBottom: 4,
        }}
      >
        {option.price}
      </p>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 16,
        }}
      >
        {option.note}
        {option.platform && ` • ${option.platform}`}
      </span>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: 24,
          maxWidth: 320,
        }}
      >
        {option.description}
      </p>
      <a
        href="#contact"
        className="btn-primary"
        style={{
          padding: "14px 32px",
          fontSize: "0.875rem",
          width: "100%",
          textAlign: "center",
          display: "block",
        }}
      >
        Get Started
      </a>
    </div>
  );
}
