"use client";

import { useEffect, useState, useCallback } from "react";

const navLinks = [
  { label: "Results", href: "#proof" },
  { label: "How It Works", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  // Active section tracking
  useEffect(() => {
    const sections = ["proof", "process", "pricing", "faq", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
          height: 77,
          zIndex: 1000,
          backgroundColor: scrolled ? "rgba(13, 13, 13, 0.95)" : "rgba(13, 13, 13, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container-main" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src="/images/stacked-logo.png" alt="Stacked Marketing" width={160} height={53}
              style={{ height: 53, width: "auto", objectFit: "contain" }} />
            <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "0.05em", marginLeft: 8, fontFamily: "var(--font-heading)" }}>
              STACKED
            </span>
          </a>

          {/* Desktop */}
          <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                style={{
                  color: activeSection === link.href ? "var(--lime)" : "var(--text-secondary)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s ease",
                  borderBottom: activeSection === link.href ? "2px solid var(--lime)" : "2px solid transparent",
                  paddingBottom: 4,
                }}
                onMouseOver={(e) => { if (activeSection !== link.href) e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseOut={(e) => { if (activeSection !== link.href) e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.8125rem", fontWeight: 600 }}>
              Get My Plan
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="mobile-only" onClick={() => setMobileOpen(true)} aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 8 }}>
            <span style={{ width: 22, height: 2, backgroundColor: "#FFFFFF", display: "block" }} />
            <span style={{ width: 22, height: 2, backgroundColor: "#FFFFFF", display: "block" }} />
            <span style={{ width: 22, height: 2, backgroundColor: "#FFFFFF", display: "block" }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 2000,
          backgroundColor: "rgba(13, 13, 13, 0.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem",
        }}>
          <button onClick={closeMobile} aria-label="Close menu"
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#FFFFFF", fontSize: "1.5rem", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 500 }}>
            ✕
          </button>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMobile}
              style={{ color: "var(--text-primary)", textDecoration: "none", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1.25rem" }}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={closeMobile} className="btn-primary" style={{ fontSize: "1rem", marginTop: 8 }}>
            Get My Plan
          </a>
        </div>
      )}
    </>
  );
}
