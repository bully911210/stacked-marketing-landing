"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    title: "You tell us where you want to go.",
    description:
      "Fill in the form. We WhatsApp you within 24 hours with a real recommendation — not a sales pitch.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--sage-pastel)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "We build it. You own every piece of it.",
    description:
      "A website that converts, or ads that generate leads. Delivered live in 5 business days.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--sage-pastel)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Leads arrive. You stay because it works.",
    description:
      "Leads come in. You see every number. No contracts. No lock-in. If it stops working, you leave. Simple.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--sage-pastel)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
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
          style={{ textAlign: "center" }}
        >
          <span className="section-eyebrow" style={{ color: "var(--sage-pastel)", borderColor: "rgba(200, 213, 168, 0.35)", background: "rgba(200, 213, 168, 0.1)" }}>
            HOW IT WORKS
          </span>
          <h2
            className="text-h2"
            style={{
              textAlign: "center",
              marginBottom: 64,
              maxWidth: 700,
              marginInline: "auto",
              color: "var(--text-on-dark)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
            }}
          >
            Three steps to paying customers.
          </h2>
        </div>

        <div className="process-grid">
          {steps.map((step, i) => (
            <ProcessStep key={step.title} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative;
        }
        .process-step {
          text-align: center;
          padding: 32px 24px;
          position: relative;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(200, 213, 168, 0.14);
          border-radius: 16px;
        }
        .process-connector { display: none; }
        @media (min-width: 768px) {
          .process-connector {
            display: block;
            position: absolute;
            top: 50%;
            right: -24px;
            width: 24px;
            height: 2px;
            z-index: 1;
          }
          .process-connector::before {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, rgba(200, 213, 168, 0.45), rgba(200, 213, 168, 0.12));
          }
          .process-connector::after {
            content: '';
            position: absolute;
            top: -3px; right: 0;
            width: 8px; height: 8px;
            border-radius: 50%;
            background: rgba(200, 213, 168, 0.35);
          }
        }
        @media (max-width: 767px) {
          .process-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            max-width: 500px;
            margin-inline: auto;
          }
        }
      `}</style>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`fade-up process-step ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Icon */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "rgba(200, 213, 168, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginInline: "auto",
          marginBottom: 20,
        }}
      >
        {step.icon}
      </div>

      {/* Gold dot indicator */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "var(--gold)",
          marginInline: "auto",
          marginBottom: 16,
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: "var(--text-h3)",
          color: "var(--text-on-dark)",
          marginBottom: 12,
        }}
      >
        {step.title}
      </p>
      <p
        style={{
          color: "rgba(232, 237, 216, 0.72)",
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

      {!isLast && <div className="process-connector" />}
    </div>
  );
}
