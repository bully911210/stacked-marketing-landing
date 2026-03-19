/* Testimonials section: set showTestimonials to true and populate
   the testimonials array when real testimonials are available. */

const showTestimonials = false;

interface Testimonial {
  quote: string;
  name: string;
  business: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "[Placeholder testimonial text]",
    name: "[Client Name]",
    business: "[Business Name]",
  },
  {
    quote: "[Placeholder testimonial text]",
    name: "[Client Name]",
    business: "[Business Name]",
  },
  {
    quote: "[Placeholder testimonial text]",
    name: "[Client Name]",
    business: "[Business Name]",
  },
];

export default function Testimonials() {
  if (!showTestimonials) return null;

  return (
    <section className="section-spacing">
      <div className="container-main">
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                borderLeft: "3px solid var(--lime-on-light)",
                background: "var(--bg-card)",
                padding: 32,
                borderRadius: 8,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
              }}
            >
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "1rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                {t.quote}
              </p>
              <p
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                }}
              >
                {t.business}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 767px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
