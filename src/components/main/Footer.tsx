"use client";

import { WHATSAPP_LINK } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-dark)",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      <div
        className="container-main"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}
      >
        {/* Desktop 3-column layout */}
        <div
          style={{
            display: "grid",
            gap: "2rem",
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "#FFFFFF",
                marginBottom: 12,
              }}
            >
              STACKED
            </p>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                maxWidth: 300,
              }}
            >
              One team. One invoice. One strategy that works.
            </p>
          </div>

          {/* Col 2: Links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s",
                  width: "fit-content",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#FFFFFF")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Col 3: Contact */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--lime)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
              }}
            >
              WhatsApp Us
            </a>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
              }}
            >
              +27 62 177 9799
            </p>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
              }}
            >
              Pretoria, South Africa
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 24,
            marginTop: 16,
          }}
        >
          <p
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-body)",
              textAlign: "center",
            }}
          >
            &copy; 2026 Stacked Marketing. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
