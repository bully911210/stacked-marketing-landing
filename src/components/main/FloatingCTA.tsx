"use client";

import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show when hero is NOT visible (scrolled past)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#contact"
      className="mobile-only"
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        right: "auto",
        zIndex: 990,
        background: "var(--lime)",
        color: "var(--text-on-accent)",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "0.875rem",
        padding: "14px 24px",
        borderRadius: "var(--radius-pill)",
        textDecoration: "none",
        boxShadow: "0 4px 20px rgba(200, 255, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: 6,
        animation: "slideUpIn 0.3s ease-out",
      }}
    >
      Get My Plan
      <span aria-hidden="true">↑</span>
    </a>
  );
}
