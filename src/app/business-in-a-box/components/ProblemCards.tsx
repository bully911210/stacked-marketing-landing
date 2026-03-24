"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const problems = [
  {
    heading: "Designers charge R15K+",
    body: "For a basic website that takes 6 weeks, needs 'a few more revisions', and still looks like a template.",
  },
  {
    heading: "'Just DM me on WhatsApp'",
    body: "That is what you tell people instead of sending them to a real website. And you know how it sounds.",
  },
  {
    heading: "Invisible on Google",
    body: "Someone searches your exact business type in your area. You are nowhere. Your competitor with a worse service is top of the list.",
  },
];

export default function ProblemCards() {
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
            You have the idea. You just don&apos;t have{" "}
            <span style={{ color: "var(--lime)" }}>the setup.</span>
          </h2>

          <div className="biab-problem-grid">
            {problems.map((problem, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--card-radius)",
                  padding: 32,
                  borderTop: "2px solid var(--lime)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    color: "var(--text-primary)",
                    marginBottom: 12,
                  }}
                >
                  {problem.heading}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    fontSize: "var(--text-body)",
                  }}
                >
                  {problem.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .biab-problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--card-gap);
        }
        @media (max-width: 767px) {
          .biab-problem-grid {
            grid-template-columns: 1fr;
          }
          .biab-problem-grid > div {
            padding: var(--card-padding-mobile) !important;
          }
        }
      `}</style>
    </section>
  );
}
