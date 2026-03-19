"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 5, suffix: "", label: "Businesses Built" },
  { value: 205, suffix: "K+", prefix: "R", label: "Own Ad Spend" },
  { value: 68, suffix: "", prefix: "R", label: "Average CPA" },
  { value: 4.31, suffix: "%", label: "Average CTR", isDecimal: true },
  { value: 0, suffix: "", label: "Contracts Required" },
];

function StatItem({
  stat,
  index,
  isVisible,
}: {
  stat: (typeof stats)[number];
  index: number;
  isVisible: boolean;
}) {
  const countedValue = useCountUp(
    stat.isDecimal ? 431 : stat.value,
    isVisible,
    1500,
    index * 100
  );

  const displayValue = stat.isDecimal
    ? (countedValue / 100).toFixed(2)
    : countedValue;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        minWidth: 160,
        scrollSnapAlign: "center",
        padding: "0 16px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "clamp(2.25rem, 3.5vw, 3.25rem)",
          color: "var(--lime)",
        }}
      >
        {stat.prefix || ""}
        {displayValue}
        {stat.suffix}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function TrustBar() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section
      id="trust"
      ref={ref}
      style={{
        backgroundColor: "var(--bg-dark)",
      }}
    >
      {/* Desktop */}
      <div
        className="container-main desktop-only"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
          paddingBlock: "48px 56px",
        }}
      >
        {stats.map((stat, i) => (
          <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  height: 48,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  marginInline: 24,
                }}
              />
            )}
            <StatItem stat={stat} index={i} isVisible={isVisible} />
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div
        className="mobile-only"
        style={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          display: "flex",
          gap: 8,
          paddingBlock: "32px 40px",
          paddingInline: 16,
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {stats.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
