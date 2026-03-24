"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const items = [
  "Your business name",
  "A headshot or product photo (phone camera is fine)",
  "30 minutes on a call",
];

export default function WhatWeNeed() {
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
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
          style={{ textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-h2)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            What we need from you.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "var(--text-secondary)",
              fontSize: "var(--text-body)",
              marginBottom: 32,
            }}
          >
            This is a done-for-you service. Here is your entire to-do list:
          </p>

          <div
            style={{
              maxWidth: 480,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {items.map((item, i) => (
              <p key={i} style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginRight: 8,
                  }}
                >
                  {i + 1}.
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-body)",
                  }}
                >
                  {item}
                </span>
              </p>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              color: "var(--text-primary)",
              fontSize: "var(--text-body)",
              marginTop: 32,
            }}
          >
            That is it. We handle everything else.
          </p>
        </div>
      </div>
    </section>
  );
}
