"use client";

import { useEffect, useState, useCallback } from "react";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 64) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(currentY > 10);
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`nav-bar ${hidden && !mobileOpen ? "nav-hidden" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: 1000,
          backgroundColor: scrolled ? "rgba(255, 255, 255, 1)" : "rgba(250, 250, 248, 0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: scrolled ? "0 1px 8px rgba(0, 0, 0, 0.06)" : "none",
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
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src="https://i.ibb.co/jv57TQ9s/Generated-Image-March-21-2026-5-07-AM-removebg-preview.png"
              alt="Stacked Marketing"
              style={{
                height: 40,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </a>

          {/* Desktop links */}
          <div
            className="desktop-only"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <a
              href="/#contact"
              className="btn-primary"
              style={{
                padding: "10px 24px",
                fontSize: "0.8125rem",
              }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-only"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 8,
            }}
          >
            <span
              style={{
                width: 22,
                height: 2,
                backgroundColor: "var(--text-primary)",
                display: "block",
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                backgroundColor: "var(--text-primary)",
                display: "block",
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                backgroundColor: "var(--text-primary)",
                display: "block",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <button
            onClick={closeMobile}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              fontSize: "1.5rem",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            X
          </button>

          <a
            href="/#contact"
            onClick={closeMobile}
            className="btn-primary"
            style={{ fontSize: "1rem" }}
          >
            Get Started
          </a>
        </div>
      )}
    </>
  );
}
