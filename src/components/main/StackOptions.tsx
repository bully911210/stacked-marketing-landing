"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const packages = [
  {
    name: "Basic Starter Website",
    price: "R2,499 one-time",
    vat: "ex VAT",
    intro: null,
    items: [
      "Beautiful 4-page fully custom-built website",
      "Home, About, Services/Products, Contact",
      "Lightning-fast loading, mobile responsive, smooth animations",
      "Working contact form + WhatsApp click-to-chat button",
      "Basic on-page SEO + Google Analytics",
      "Delivered and live in 5 business days",
      "Full site transfer to your own hosting – 100% ownership",
    ],
  },
  {
    name: "Meta Ads Accelerator",
    price: "R4,999 / month",
    vat: "ex VAT",
    intro: null,
    items: [
      "Daily optimisation of up to 5 campaigns",
      "8 brand-new creatives tested every month",
      "Weekly performance dashboard + 1× 30-min strategy call",
      "Minimum recommended ad spend: R8,000–R12,000",
      "Full Conversions API + tracking setup",
    ],
  },
  {
    name: "Stacked Core",
    price: "R11,999 / month",
    vat: "ex VAT",
    intro: "Everything in Meta Ads Accelerator +",
    items: [
      "Advanced 5–7 page custom-built website (with CMS)",
      "6 powerful automations in Make.com (instant WhatsApp replies, lead notification, CRM pipeline, nurture sequence, retargeting triggers)",
      "Full lead forms + booking integration",
      '"Live in 5 business days" guarantee',
      "Full site transfer – you own everything",
    ],
  },
];

const tools = [
  "Custom Code",
  "Make.com",
  "Meta Conversions API",
  "Google Looker Studio",
];

export default function StackOptions() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="stack-options"
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h1"
            style={{
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Our Full Stack Options
          </h2>
        </div>

        <div className="so-grid">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Tools trust bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginRight: 8,
            }}
          >
            Tools we use:
          </span>
          {tools.map((tool, i) => (
            <span key={tool} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                }}
              >
                {tool}
              </span>
              {i < tools.length - 1 && (
                <span style={{ color: "var(--text-muted)", fontSize: "0.5rem" }}>
                  ●
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .so-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 1023px) {
          .so-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 639px) {
          .so-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

function PackageCard({
  pkg,
  index,
}: {
  pkg: (typeof packages)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{
        transitionDelay: `${index * 80}ms`,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.boxShadow =
          "0 4px 16px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--text-primary)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 4,
        }}
      >
        {pkg.name}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "var(--lime-on-light)",
          marginBottom: 2,
        }}
      >
        {pkg.price}
      </p>
      <span
        style={{
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 16,
        }}
      >
        {pkg.vat}
      </span>

      {pkg.intro && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--lime-on-light)",
            marginBottom: 12,
            fontStyle: "italic",
          }}
        >
          {pkg.intro}
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
        {pkg.items.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              marginBottom: 10,
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--lime-on-light)",
                marginTop: 6,
                flexShrink: 0,
              }}
            />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="btn-primary"
        style={{
          marginTop: 20,
          padding: "12px 24px",
          fontSize: "0.8125rem",
          textAlign: "center",
          width: "100%",
          display: "block",
        }}
      >
        Get Started
      </a>
    </div>
  );
}
