"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Tell Us Your Goals",
    description:
      "Fill in the form. We WhatsApp you within 24 hours with a custom game plan. Not a sales pitch — a real recommendation.",
  },
  {
    number: "02",
    title: "We Stack Your System",
    description:
      "Website, Meta Ads setup, and automations. Built as one connected system. Live in 5 business days.",
  },
  {
    number: "03",
    title: "Leads Start Flowing",
    description:
      "Leads come in. Automations follow up. You see every number. No lock-in. Stay because it works.",
  },
];

export default function Process() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section
      id="process"
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-contrast)" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caption)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-h2"
            style={{
              textAlign: "center",
              marginBottom: 64,
              maxWidth: 700,
              marginInline: "auto",
              color: "var(--text-on-light)",
            }}
          >
            Three steps to a connected system
          </h2>
        </div>

        <div className="process-grid">
          {steps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          position: relative;
        }
        .process-step {
          text-align: center;
          padding: 24px 16px;
          position: relative;
        }
        @media (max-width: 767px) {
          .process-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`fade-up process-step ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Step number */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          fontSize: "var(--text-stat)",
          color: "var(--lime)",
          opacity: 0.3,
          lineHeight: 1,
          marginBottom: 16,
          userSelect: "none",
        }}
      >
        {step.number}
      </p>
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: "var(--text-h3)",
          color: "var(--text-on-light)",
          marginBottom: 12,
        }}
      >
        {step.title}
      </p>
      <p
        style={{
          color: "#4A4A4A",
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "var(--text-body)",
          maxWidth: 320,
          marginInline: "auto",
          lineHeight: 1.6,
        }}
      >
        {step.description}
      </p>
    </div>
  );
}
