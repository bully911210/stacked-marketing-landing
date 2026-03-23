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
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--lime-on-light)",
              marginBottom: 16,
            }}
          >
            About Us
          </p>
          <h2
            className="text-h1"
            style={{ marginBottom: 24 }}
          >
            Built by Practitioners, Not an Agency.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            Stacked Marketing was born from R205K of our own ad spend in one of
            Meta&apos;s most restricted categories: firearms insurance. We did not
            learn performance marketing from a course. We learned it by spending
            our own money, in a market where one policy violation kills your ad
            account.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            That experience is now yours.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              marginTop: 24,
              letterSpacing: "0.02em",
            }}
          >
            Based in Pretoria. Built for businesses that want results.
          </p>
        </div>
      </div>
    </section>
  );
}
