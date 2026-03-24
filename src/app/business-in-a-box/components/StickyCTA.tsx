"use client";

import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="biab-sticky-cta"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          padding: "12px 20px",
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
          background: "linear-gradient(to top, rgba(13,13,13,0.98) 60%, rgba(13,13,13,0))",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <a
          href="#order"
          className="btn-primary"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "14px 24px",
            borderRadius: "var(--radius-pill)",
            fontWeight: 700,
            fontSize: "0.95rem",
            boxShadow: "0 4px 20px rgba(200, 255, 0, 0.25)",
          }}
        >
          GET THE BOX&nbsp;&nbsp;/&nbsp;&nbsp;R2,999
        </a>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .biab-sticky-cta {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
