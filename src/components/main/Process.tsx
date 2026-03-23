"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "TELL US WHAT YOU NEED",
    description:
      "Fill in the form. We WhatsApp you within 24 hours with a custom game plan.",
  },
  {
    number: "02",
    title: "WE BUILD IT",
    description:
      "Your fast custom website, full Meta Ads setup, or complete stacked system with automations. Delivered in 5 days. You own everything.",
  },
  {
    number: "03",
    title: "YOU GROW",
    description:
      "Leads start coming in. You see the numbers. No lock-in: stay because it works.",
  },
];

export default function Process() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="process" className="section-spacing" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h1"
            style={{
              textAlign: "center",
              marginBottom: 56,
              maxWidth: 700,
              marginInline: "auto",
            }}
          >
            Live in 5 Days. No Contracts. You Own Everything.
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
          border-radius: 12px;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .process-step:hover {
          background-color: var(--bg-primary);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
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
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "2rem",
          color: "var(--lime-on-light)",
          marginBottom: 16,
        }}
      >
        {step.number}
      </p>
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "var(--text-primary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 12,
        }}
      >
        {step.title}
      </p>
      <p
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "1rem",
          maxWidth: 300,
          marginInline: "auto",
          lineHeight: 1.6,
        }}
      >
        {step.description}
      </p>
    </div>
  );
}
