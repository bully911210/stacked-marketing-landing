"use client";

import { useContext } from "react";
import { ServicesTierContext } from "@/app/services/ServicesTierContext";

const checkIcon = (
  <span style={{ color: "#c8ff00", marginRight: 8, fontSize: 14 }}>
    &#10003;
  </span>
);

const starterFeatures = [
  "Custom website",
  "Mobile responsive",
  "WhatsApp integration",
  "2 lead capture forms",
  "Meta Pixel installed",
  "Google Analytics",
  "SEO strategy",
  "Domain included",
  "30 days support",
  "Full ownership",
];

const growthFeatures = [
  "Meta ads strategy",
  "Ad creative design",
  "Audience targeting",
  "Campaign optimisation",
  "Weekly reporting",
  "Retargeting setup",
  "A/B testing",
  "Full account ownership",
];

const fullstackFeatures = [
  "Everything in Starter",
  "Everything in Growth (Convert tier)",
  "Email automation setup",
  "Welcome email sequence",
  "Lead nurture flows",
  "Re-engagement campaigns",
  "Cross-channel monthly reporting",
  "Single point of contact",
  "Integrated strategy",
];

export default function ServiceTiers() {
  const { setSelectedTier } = useContext(ServicesTierContext);

  const handleCTA = (tier: string) => {
    setSelectedTier(tier);
    setTimeout(() => {
      const el = document.getElementById("lead-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const featureItem = (text: string) => (
    <li
      key={text}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 14,
        color: "#d0d0c8",
        lineHeight: 1.6,
        display: "flex",
        alignItems: "flex-start",
        marginBottom: 8,
      }}
    >
      {checkIcon}
      <span>{text}</span>
    </li>
  );

  return (
    <section
      id="tiers"
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
            marginBottom: 8,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Choose Your Growth Path.
        </h2>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15,
            color: "#a0a0a0",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          No contracts. No lock-in. Cancel any time.
        </p>

        <div className="svc-tiers-grid">
          {/* STARTER */}
          <div
            className="svc-card-hover"
            style={{
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: 32,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#c8ff00",
                marginBottom: 12,
              }}
            >
              WEBSITE ONLY
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: "#a0a0a0",
                marginBottom: 16,
              }}
            >
              Your digital home base.
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#f5f5f0",
                marginBottom: 4,
                letterSpacing: "-0.02em",
              }}
            >
              R1,999
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                color: "#666666",
                marginBottom: 24,
              }}
            >
              once-off
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                marginBottom: 32,
                flex: 1,
              }}
            >
              {starterFeatures.map(featureItem)}
            </ul>
            <button
              onClick={() => handleCTA("starter")}
              className="svc-btn-ghost"
              style={{
                width: "100%",
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "transparent",
                color: "#f5f5f0",
                padding: "14px 24px",
                borderRadius: 6,
                border: "2px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
              }}
            >
              GET MY WEBSITE
            </button>
          </div>

          {/* GROWTH */}
          <div
            className="svc-card-hover"
            style={{
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: 32,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#c8ff00",
                marginBottom: 12,
              }}
            >
              ADS MANAGEMENT
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: "#a0a0a0",
                marginBottom: 16,
              }}
            >
              Get leads flowing.
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#f5f5f0",
                marginBottom: 4,
                letterSpacing: "-0.02em",
              }}
            >
              From R4,999
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                color: "#666666",
                marginBottom: 12,
              }}
            >
              per month
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                color: "#a0a0a0",
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              Launch R4,999 | Convert R7,999 | Dominate R12,999
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                marginBottom: 32,
                flex: 1,
              }}
            >
              {growthFeatures.map(featureItem)}
            </ul>
            <button
              onClick={() => handleCTA("growth")}
              className="svc-btn-ghost"
              style={{
                width: "100%",
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "transparent",
                color: "#f5f5f0",
                padding: "14px 24px",
                borderRadius: 6,
                border: "2px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
              }}
            >
              START GROWING
            </button>
          </div>

          {/* FULL STACK */}
          <div
            className="svc-card-featured-hover"
            style={{
              background: "#111111",
              border: "1px solid #c8ff00",
              borderRadius: 8,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* RECOMMENDED badge */}
            <div
              style={{
                position: "absolute",
                top: -14,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "#c8ff00",
                color: "#0a0a0a",
                padding: "4px 16px",
                borderRadius: 100,
                whiteSpace: "nowrap",
              }}
            >
              RECOMMENDED
            </div>

            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#c8ff00",
                marginBottom: 12,
                marginTop: 8,
              }}
            >
              WEBSITE + ADS + EMAIL
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: "#a0a0a0",
                marginBottom: 16,
              }}
            >
              The complete growth engine.
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#f5f5f0",
                marginBottom: 4,
                letterSpacing: "-0.02em",
              }}
            >
              R11,999
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                color: "#666666",
                marginBottom: 12,
              }}
            >
              per month
            </div>

            {/* FREE website badge */}
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: "#c8ff00",
                marginBottom: 24,
              }}
            >
              Website FREE in month 1
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                marginBottom: 32,
                flex: 1,
              }}
            >
              {fullstackFeatures.map(featureItem)}
            </ul>
            <button
              onClick={() => handleCTA("fullstack")}
              className="svc-btn-filled"
              style={{
                width: "100%",
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "#c8ff00",
                color: "#0a0a0a",
                padding: "14px 24px",
                borderRadius: 8,
                border: "2px solid #c8ff00",
                cursor: "pointer",
              }}
            >
              GET THE FULL STACK
            </button>
          </div>
        </div>

        {/* Trust badges below tiers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(1rem, 2vw, 2rem)",
            flexWrap: "wrap",
            marginTop: 32,
          }}
        >
          {["No contracts", "Own everything", "Cancel anytime"].map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#666666",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
