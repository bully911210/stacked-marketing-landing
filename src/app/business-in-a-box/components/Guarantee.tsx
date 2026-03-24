"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const guarantees = [
  {
    heading: "The 'Look Legit' Guarantee",
    body: "If your website is not live and looking professional within 7 business days, we keep working until it is. Zero extra cost.",
  },
  {
    heading: "The 'No Blank Screen' Guarantee",
    body: "If you still do not know what to post after your 5 creatives and 30-day playbook, book a second strategy call with us. Free.",
  },
];

export default function Guarantee() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-main">
        <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""}`}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-h2)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Two guarantees.{" "}
            <span style={{ color: "var(--lime)" }}>Zero risk.</span>
          </h2>

          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {guarantees.map((g, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(200, 255, 0, 0.03)",
                  border: "1px solid var(--border-accent)",
                  borderRadius: "var(--card-radius)",
                  padding: 32,
                  borderTop: "2px solid var(--lime)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--text-primary)",
                    marginBottom: 12,
                  }}
                >
                  {g.heading}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontSize: "var(--text-body)",
                  }}
                >
                  {g.body}
                </p>
              </div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a
              href="#order"
              className="btn-primary"
              style={{
                padding: "16px 36px",
                borderRadius: "var(--radius-pill)",
                fontWeight: 700,
              }}
            >
              I WANT THIS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
