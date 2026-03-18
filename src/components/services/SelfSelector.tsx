"use client";

import { useContext } from "react";
import { ServicesTierContext } from "@/app/services/ServicesTierContext";

const options = [
  {
    id: "starter",
    icon: "\uD83C\uDF10",
    title: "I Need a Website",
    subtitle: "Custom site, full ownership, R1,999 once-off",
  },
  {
    id: "growth",
    icon: "\uD83D\uDCE2",
    title: "I Need Ads That Convert",
    subtitle: "Meta ads management from R4,999/month",
  },
  {
    id: "fullstack",
    icon: "\uD83D\uDE80",
    title: "I Need the Full Package",
    subtitle: "Website + Ads + Email from R11,999/month",
  },
];

export default function SelfSelector() {
  const { selectedTier, setSelectedTier } = useContext(ServicesTierContext);

  const handleSelect = (id: string) => {
    setSelectedTier(id);
    setTimeout(() => {
      const el = document.getElementById("tiers");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section
      style={{
        paddingBlock: "clamp(4rem, 3rem + 5vw, 8rem)",
        paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 48,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          What Do You Need Right Now?
        </h2>

        <div className="svc-selector-grid">
          {options.map((opt) => {
            const isSelected = selectedTier === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className="svc-selector-card"
                style={{
                  background: isSelected
                    ? "rgba(200, 255, 0, 0.04)"
                    : "#161616",
                  border: isSelected
                    ? "2px solid #c8ff00"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: 32,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                    marginBottom: 16,
                  }}
                >
                  {opt.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#f5f5f0",
                    marginBottom: 8,
                  }}
                >
                  {opt.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    color: "#a0a0a0",
                    lineHeight: 1.5,
                  }}
                >
                  {opt.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
