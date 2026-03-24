"use client";

import { useEffect, useState, useCallback } from "react";

export default function BiabNav() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 77) setHidden(true);
    else setHidden(false);
    setScrolled(currentY > 10);
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`nav-bar ${hidden ? "nav-hidden" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 77,
        zIndex: 1000,
        backgroundColor: scrolled
          ? "rgba(13, 13, 13, 0.95)"
          : "rgba(13, 13, 13, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="container-main"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="/images/stacked-logo.png"
            alt="Stacked Marketing"
            width={160}
            height={53}
            style={{ height: 53, width: "auto", objectFit: "contain" }}
          />
          <span
            style={{
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "1.25rem",
              letterSpacing: "0.05em",
              marginLeft: 8,
              fontFamily: "var(--font-heading)",
            }}
          >
            STACKED
          </span>
        </a>

        {/* CTA */}
        <a
          href="#order"
          className="btn-primary"
          style={{
            padding: "10px 24px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            borderRadius: "var(--radius-pill)",
            whiteSpace: "nowrap",
          }}
        >
          GET THE BOX / R2,999
        </a>
      </div>
    </nav>
  );
}
