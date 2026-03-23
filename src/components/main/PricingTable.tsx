"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const tiers = [
  {
    name: "Basic Starter Website",
    price: "R2,499",
    priceNote: "once-off",
    featured: false,
    bestFor: "Businesses that need a professional site, fast.",
    cta: "GET MY WEBSITE",
    benefits: [
      "Beautiful 4-page custom website, live in 5 days",
      "Mobile-first, lightning-fast, smooth animations",
      "Working contact form + WhatsApp click-to-chat",
      "Full ownership — we transfer everything to your hosting",
    ],
  },
  {
    name: "Meta Ads Accelerator",
    price: "R4,999",
    priceNote: "/mo",
    featured: false,
    bestFor: "Businesses ready to generate leads from Meta ads.",
    cta: "START ADS",
    benefits: [
      "Daily campaign optimisation (up to 5 campaigns)",
      "8 new ad creatives tested every month",
      "Weekly dashboard + monthly strategy call",
      "Full Conversions API + tracking setup included",
    ],
    note: "Recommended ad spend: R8,000 - R12,000/mo",
  },
  {
    name: "Stacked Core",
    price: "R11,999",
    priceNote: "/mo",
    featured: true,
    bestFor: "Businesses that want the full system working together.",
    cta: "GET THE FULL STACK",
    benefits: [
      "Everything in Meta Ads Accelerator, plus:",
      "Advanced 5-7 page website with CMS",
      "6 automations: WhatsApp replies, CRM, nurture, retargeting",
      "Full lead forms + booking integration",
      "Live in 5 business days. You own everything.",
    ],
  },
];

function PricingCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={tier.featured ? "card-featured" : "card"}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {tier.featured && (
          <span
            style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--lime)",
              color: "var(--text-on-accent)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              padding: "6px 20px",
              borderRadius: 100,
              whiteSpace: "nowrap",
            }}
          >
            RECOMMENDED
          </span>
        )}

        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "var(--text-h3)",
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          {tier.name}
        </h3>

        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: "var(--text-price)",
              color: tier.featured ? "var(--lime)" : "var(--text-primary)",
            }}
          >
            {tier.price}
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caption)",
              color: "var(--text-secondary)",
              marginLeft: 4,
            }}
          >
            {tier.priceNote}
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: 2,
            }}
          >
            ex VAT
          </span>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            color: "var(--text-secondary)",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {tier.bestFor}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
          {tier.benefits.map((benefit) => (
            <li
              key={benefit}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: 12,
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body)",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                style={{ flexShrink: 0, marginTop: 3 }}
              >
                <circle cx="9" cy="9" r="9" fill="rgba(200,255,0,0.15)" />
                <path
                  d="M5.5 9.5L7.5 11.5L12.5 6.5"
                  stroke="var(--lime)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>

        {"note" in tier && tier.note && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caption)",
              color: "var(--text-muted)",
              marginTop: 8,
              marginBottom: 8,
              fontStyle: "italic",
            }}
          >
            {tier.note}
          </p>
        )}

        <a
          href="#contact"
          className={tier.featured ? "btn-primary" : "btn-secondary"}
          style={{
            marginTop: 24,
            textAlign: "center",
            width: "100%",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            fontWeight: 700,
          }}
        >
          {tier.cta}
        </a>
      </div>
    </div>
  );
}

export default function PricingTable() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="pricing"
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-tertiary)" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caption)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--lime)",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            CHOOSE YOUR STACK
          </p>
          <h2
            className="text-h2"
            style={{
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            Simple pricing. No lock-in. Upgrade anytime.
          </h2>
        </div>

        {/* 3 pricing cards */}
        <div className="pricing-cards-grid">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Upgrade credit banner */}
        <div
          style={{
            marginTop: 48,
            background: "var(--color-accent-muted)",
            borderLeft: "4px solid var(--lime)",
            borderRadius: 12,
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>↑</span>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            Start with a website → Get <strong style={{ color: "var(--lime)" }}>R2,000 off</strong> when you upgrade to ads or full stack.
          </p>
        </div>
      </div>

      <style>{`
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--card-gap);
          align-items: stretch;
        }
        @media (max-width: 1023px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin-inline: auto;
          }
        }
      `}</style>
    </section>
  );
}
