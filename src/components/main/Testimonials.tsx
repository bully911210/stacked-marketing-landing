"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    category: "INSURANCE BROKER — PRETORIA",
    pill: "Lead Ads",
    quote: "Leads tripled in the first month.",
    body: "We WhatsApp'd them within 4 hours of their enquiry with a plan that actually made sense. No hard sell.",
    attribution: "Johan V., Insurance Broker, Pretoria",
  },
  {
    category: "NON-PROFIT — GAUTENG",
    pill: "Awareness",
    quote: "40,000+ contacts from zero. Every day, new leads come in.",
    body: "We built the full system — site, ads, database. It runs itself.",
    attribution: "Thandi M., Director, Gauteng",
  },
  {
    category: "BUSINESS OWNER — CENTURION",
    pill: "Lead Ads",
    quote: "R68 per lead in a category everyone said was impossible.",
    body: "Best money I ever spent on marketing. And we own everything — the site, the data, the lot.",
    attribution: "Pieter D., Business Owner, Centurion",
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="section-divider" style={{ marginBottom: "var(--section-gap-desktop)" }} />

      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2
            className="text-h2"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            In their words.
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.attribution} testimonial={t} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 767px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin-inline: auto;
          }
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        background: "white",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Category + pill row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {testimonial.category}
        </span>
        <span
          style={{
            background: "var(--color-accent-muted)",
            color: "var(--lime-on-light)",
            fontSize: "0.7rem",
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 100,
            whiteSpace: "nowrap",
          }}
        >
          {testimonial.pill}
        </span>
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "var(--text-primary)",
          lineHeight: 1.4,
          margin: "4px 0",
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {testimonial.body}
      </p>

      {/* Attribution */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          paddingTop: 12,
          marginTop: 4,
        }}
      >
        &mdash; {testimonial.attribution}
      </p>
    </div>
  );
}
