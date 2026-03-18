"use client";

import { useState, useEffect, useContext } from "react";
import { ServicesTierContext } from "@/app/services/ServicesTierContext";

export default function StickyTierBar() {
  const { setSelectedTier } = useContext(ServicesTierContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const form = document.getElementById("lead-form");
    if (!hero) return;

    let heroOut = false;
    let formIn = false;

    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          heroOut = !entry.isIntersecting;
          setVisible(heroOut && !formIn);
        }
      },
      { threshold: 0 }
    );

    const formObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          formIn = entry.isIntersecting;
          setVisible(heroOut && !formIn);
        }
      },
      { threshold: 0 }
    );

    heroObserver.observe(hero);
    if (form) formObserver.observe(form);

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  const handleClick = (tier: string) => {
    setSelectedTier(tier);
    const el = document.getElementById("tiers");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <div
      className="svc-sticky-bar-enter"
      style={{
        position: "fixed",
        top: 72,
        left: 0,
        right: 0,
        zIndex: 45,
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "8px clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div className="svc-sticky-tiers">
          {/* Starter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 12px",
              borderRadius: 6,
              background: "transparent",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#a0a0a0",
                }}
              >
                STARTER
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#f5f5f0",
                }}
              >
                R1,999
              </div>
            </div>
            <button
              onClick={() => handleClick("starter")}
              className="svc-btn-ghost"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "transparent",
                color: "#f5f5f0",
                padding: "6px 12px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
              }}
            >
              SELECT
            </button>
          </div>

          {/* Growth */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 12px",
              borderRadius: 6,
              background: "transparent",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#a0a0a0",
                }}
              >
                GROWTH
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#f5f5f0",
                }}
              >
                From R4,999/mo
              </div>
            </div>
            <button
              onClick={() => handleClick("growth")}
              className="svc-btn-ghost"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "transparent",
                color: "#f5f5f0",
                padding: "6px 12px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
              }}
            >
              SELECT
            </button>
          </div>

          {/* Full Stack (highlighted) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 12px",
              borderRadius: 6,
              background: "rgba(200, 255, 0, 0.06)",
              border: "1px solid rgba(200, 255, 0, 0.2)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#c8ff00",
                }}
              >
                FULL STACK
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#f5f5f0",
                }}
              >
                R11,999/mo
              </div>
            </div>
            <button
              onClick={() => handleClick("fullstack")}
              className="svc-btn-filled"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "#c8ff00",
                color: "#0a0a0a",
                padding: "6px 12px",
                borderRadius: 4,
                border: "1px solid #c8ff00",
                cursor: "pointer",
              }}
            >
              SELECT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
