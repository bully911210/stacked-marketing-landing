"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    quote:
      "They WhatsApp'd us within 4 hours with a plan that actually made sense. No hard sell, no BS. Our leads tripled within the first month.",
    name: "Johan V.",
    role: "Insurance Broker, Pretoria",
    stars: 5,
  },
  {
    quote:
      "We went from zero online presence to 40,000+ contacts in our database. Stacked built the whole system and it just works. Every day, new leads come in.",
    name: "Thandi M.",
    role: "Non-Profit Director, Gauteng",
    stars: 5,
  },
  {
    quote:
      "Best money I ever spent on marketing. R68 per lead in a category everyone told us was impossible. And we own everything — the site, the data, the lot.",
    name: "Pieter D.",
    role: "Business Owner, Centurion",
    stars: 5,
  },
];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--lime)">
      <path d="M8 0l2.47 4.94L16 5.82l-4 3.86.94 5.46L8 12.48l-4.94 2.66.94-5.46-4-3.86 5.53-.88L8 0z" />
    </svg>
  );
}

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
          <span className="section-eyebrow">CLIENT RESULTS</span>
          <h2 className="text-h2">
            Don&apos;t take our word for it.
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
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
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
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
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient border wrapper */}
      <div
        style={{
          padding: 1,
          borderRadius: "calc(var(--card-radius) + 1px)",
          background: "linear-gradient(135deg, rgba(200,255,0,0.2), transparent 60%, rgba(200,255,0,0.08))",
          height: "100%",
        }}
      >
        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "var(--card-radius)",
            padding: 32,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Quote mark */}
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "3rem",
              color: "rgba(200, 255, 0, 0.15)",
              lineHeight: 1,
              marginBottom: -8,
              userSelect: "none",
            }}
          >
            &ldquo;
          </span>

          {/* Stars */}
          <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
            {Array.from({ length: testimonial.stars }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>

          {/* Quote */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.7,
              flex: 1,
              marginBottom: 24,
            }}
          >
            {testimonial.quote}
          </p>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(200, 255, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "var(--lime)",
                flexShrink: 0,
              }}
            >
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: "var(--text-primary)",
                }}
              >
                {testimonial.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
