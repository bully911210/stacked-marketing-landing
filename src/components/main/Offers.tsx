"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface OfferCard {
  tier: string;
  price: string;
  qualifier: string;
  features: string[];
  cta: string;
  interest: string;
  featured?: boolean;
  badge?: string;
  includesLine?: string;
}

const offers: OfferCard[] = [
  {
    tier: "META ADS",
    price: "From R4,999",
    qualifier: "/month",
    features: [
      "3 ad campaigns, active daily management",
      "Audience research and targeting",
      "Ad creative (copy + visuals)",
      "Meta Pixel and conversion tracking",
      "Monthly performance report",
      "WhatsApp support",
      "Campaign budget recommendations",
      "No contracts, cancel any time",
    ],
    cta: "Get Started",
    interest: "ads",
  },
  {
    tier: "FULL STACK",
    price: "R11,999",
    qualifier: "/month",
    includesLine: "Website + Ads + Automation",
    featured: true,
    badge: "RECOMMENDED",
    features: [
      "Everything in Meta Ads, plus:",
      "Custom website (built and managed)",
      "Custom landing pages (up to 3)",
      "Lead automation sequences",
      "Full-funnel strategy (awareness to conversion)",
      "Lookalike audience building",
      "Bi-weekly strategy calls",
      "Priority WhatsApp support (same-day response)",
      "Monthly strategy session (45 min)",
    ],
    cta: "Get Started",
    interest: "fullstack",
  },
];

export default function Offers() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="offers" className="section-spacing" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h2"
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            Two Ways to Work With Us
          </h2>
        </div>

        <div className="offers-grid">
          {offers.map((offer) => (
            <OfferCardComponent key={offer.tier} offer={offer} />
          ))}
        </div>
      </div>

      <style>{`
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        @media (max-width: 767px) {
          .offers-grid {
            grid-template-columns: 1fr;
          }
          .offers-grid .card {
            transform: none !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .offers-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin-inline: auto;
          }
        }
      `}</style>
    </section>
  );
}

function OfferCardComponent({ offer }: { offer: OfferCard }) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`card fade-up ${isVisible ? "visible" : ""}`}
      style={{
        padding: "40px 32px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...(offer.featured
          ? {
              boxShadow:
                "0 8px 32px rgba(200, 255, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
              zIndex: 2,
            }
          : {}),
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: offer.featured ? 3 : 0,
          backgroundColor: offer.featured ? "var(--lime)" : "transparent",
          borderRadius: "8px 8px 0 0",
        }}
      />

      {/* Badge - centred on top */}
      {offer.badge && (
        <span
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--lime)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            padding: "4px 14px",
            borderRadius: 100,
            whiteSpace: "nowrap",
          }}
        >
          {offer.badge}
        </span>
      )}

      {/* Tier */}
      <p
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 12,
          marginTop: offer.badge ? 8 : 0,
        }}
      >
        {offer.tier}
      </p>

      {/* Price */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          fontSize: "2.5rem",
          color: offer.featured ? "var(--lime-on-light)" : "var(--text-primary)",
          lineHeight: 1.2,
        }}
      >
        {offer.price}
      </p>

      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.875rem",
          fontFamily: "var(--font-body)",
          marginBottom: offer.includesLine ? 8 : 24,
        }}
      >
        {offer.qualifier}
      </p>

      {/* Includes line */}
      {offer.includesLine && (
        <p
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "0.875rem",
            marginBottom: 24,
          }}
        >
          {offer.includesLine}
        </p>
      )}

      {/* Features */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
          marginBottom: 24,
        }}
      >
        {offer.features.map((feature) => (
          <li
            key={feature}
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              paddingLeft: 16,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 8,
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--lime-on-light)",
                display: "inline-block",
              }}
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* Divider above CTA */}
      <div
        style={{
          height: 1,
          backgroundColor: "var(--border)",
          marginBottom: 24,
        }}
      />

      {/* CTA */}
      <a
        href={`/#contact?interest=${offer.interest}`}
        className={offer.featured ? "btn-accent" : "btn-ghost"}
        style={{
          width: "100%",
          textAlign: "center",
          padding: "16px 32px",
        }}
      >
        {offer.cta}
      </a>
    </div>
  );
}
