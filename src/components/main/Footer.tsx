"use client";

import { WHATSAPP_LINK } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: "var(--bg-dark)",
        paddingTop: 100,
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
              STACKED MARKETING
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
                className="footer-link"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-body)",
                  width: "fit-content",
                  position: "relative",
                }}
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
              className="footer-link"
              style={{
                color: "var(--lime)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                width: "fit-content",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
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
            paddingTop: 32,
            marginTop: 24,
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
        .footer-link {
          transition: color 0.2s ease !important;
        }
        .footer-link:hover {
          color: #FFFFFF !important;
          text-decoration: underline !important;
          text-underline-offset: 4px;
        }
      `}</style>
    </footer>
  );
}
