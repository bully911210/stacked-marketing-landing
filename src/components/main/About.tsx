"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      id="about"
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
          style={{
            maxWidth: 700,
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "var(--text-h3)",
              color: "var(--text-primary)",
              marginBottom: 16,
              fontStyle: "italic",
            }}
          >
            Built by Practitioners, Not an Agency.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-lg)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            We spent R205K of our own money on Meta ads before we ever spent a
            client&apos;s. Based in Pretoria. Built for businesses that want results.
          </p>
        </div>
      </div>
    </section>
  );
}
