"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const tiers = [
  {
    name: "Basic Starter Website",
    price: "R2,499",
    priceNote: "once-off",
    featured: false,
    interest: "starter",
    deliverables: [
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
    price: "R4,999",
    priceNote: "/mo",
    featured: false,
    interest: "ads",
    deliverables: [
      "Daily optimisation of up to 5 campaigns",
      "8 brand-new creatives tested every month",
      "Weekly performance dashboard + 1× 30-min strategy call",
      "Minimum recommended ad spend: R8,000–R12,000",
      "Full Conversions API + tracking setup",
    ],
  },
  {
    name: "Stacked Core",
    price: "R11,999",
    priceNote: "/mo",
    featured: true,
    interest: "core",
    intro: "Everything in Meta Ads Accelerator +",
    deliverables: [
      "Advanced 5–7 page custom-built website (with CMS)",
      "6 powerful automations in Make.com (instant WhatsApp replies, lead notification, CRM pipeline, nurture sequence, retargeting triggers)",
      "Full lead forms + booking integration",
      '"Live in 5 business days" guarantee',
      "Full site transfer – you own everything",
    ],
  },
];

interface FeatureRow {
  label: string;
  values: string[];
}

const features: FeatureRow[] = [
  {
    label: "Website",
    values: [
      "4-page Premium (Custom)",
      "–",
      "5–7 page Advanced (Custom)",
    ],
  },
  {
    label: "Meta Ads Management",
    values: ["–", "Daily (up to 5 campaigns)", "Daily"],
  },
  {
    label: "Automations (Make.com)",
    values: ["–", "–", "6 core automations"],
  },
  {
    label: "New Ad Creatives per month",
    values: ["–", "8", "8"],
  },
  {
    label: "Reporting & Strategy Calls",
    values: ["–", "Weekly dashboard + 1×30min", "Bi-weekly + 2×30min"],
  },
  {
    label: "Direct WhatsApp Support",
    values: ["check", "check", "check"],
  },
  {
    label: "Live Ad Spend Transparency",
    values: ["–", "check", "check"],
  },
  {
    label: "Delivery Time",
    values: ["Live in 5 days", "Live in 3 days", "Full system in 5 days"],
  },
  {
    label: "You Own Everything",
    values: ["check", "check", "check"],
  },
];

const tools = ["Custom Code", "Make.com", "Meta Conversions API", "Google Looker Studio"];

function CellContent({ value }: { value: string }) {
  if (value === "check") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        role="img"
        aria-label="Included"
        style={{ display: "inline-block" }}
      >
        <circle cx="11" cy="11" r="11" fill="#DCFCE7" />
        <path
          d="M7 11.5L9.5 14L15 8.5"
          stroke="#22C55E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (value === "–") {
    return (
      <span
        aria-label="Not included"
        style={{ color: "#64748B", fontSize: "1.1rem", fontWeight: 300 }}
      >
        –
      </span>
    );
  }
  return <span>{value}</span>;
}

export default function PricingTable() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="pricing"
      style={{
        backgroundColor: "var(--bg-dark)",
        padding: "clamp(3rem, 3rem + 5vw, 7rem) 0",
      }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          {/* Trust Badges */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            {[
              "No contracts",
              "You own everything",
              "Live in 5 days",
              "Upgrade anytime with R2,000 credit",
            ].map((badge) => (
              <span
                key={badge}
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(200, 255, 0, 0.15)",
                  color: "var(--lime)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  padding: "6px 16px",
                  borderRadius: 100,
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <h2
            className="text-h1"
            style={{
              textAlign: "center",
              color: "#FFFFFF",
              marginBottom: 48,
            }}
          >
            Choose Your Stack
          </h2>
        </div>

        {/* ─── Desktop Table ─── */}
        <div className="pt-desktop">
          <table className="pt-table">
            <thead>
              <tr>
                <th className="pt-feature-header">Feature</th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className={`pt-tier-header ${tier.featured ? "pt-tier-featured" : ""}`}
                  >
                    {tier.featured && (
                      <span className="pt-badge">RECOMMENDED</span>
                    )}
                    <span className="pt-tier-name">{tier.name}</span>
                    <span className="pt-tier-price">
                      {tier.price}
                      <span className="pt-tier-note"> {tier.priceNote}</span>
                    </span>
                    <span className="pt-tier-vat">ex VAT</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr
                  key={feature.label}
                  className={`pt-row ${i % 2 === 0 ? "pt-row-alt" : ""}`}
                >
                  <td className="pt-feature-cell">{feature.label}</td>
                  {feature.values.map((val, j) => (
                    <td
                      key={j}
                      className={`pt-cell ${tiers[j].featured ? "pt-cell-featured" : ""}`}
                    >
                      <CellContent value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="pt-feature-cell" />
                {tiers.map((tier) => (
                  <td
                    key={tier.name}
                    className={`pt-cell pt-cta-cell ${tier.featured ? "pt-cell-featured" : ""}`}
                  >
                    <a href="#contact" className="pt-cta-btn">
                      Get Started
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ─── Mobile Cards ─── */}
        <div className="pt-mobile">
          {[...tiers]
            .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
            .map((tier) => (
              <div
                key={tier.name}
                className={`pt-mobile-card ${tier.featured ? "pt-mobile-card-featured" : ""}`}
              >
                {tier.featured && (
                  <span className="pt-mobile-badge">RECOMMENDED</span>
                )}
                <h3 className="pt-mobile-tier-name">{tier.name}</h3>
                <p className="pt-mobile-price">
                  {tier.price}
                  <span className="pt-mobile-note"> {tier.priceNote}</span>
                </p>
                <span className="pt-mobile-vat">ex VAT</span>
                <div className="pt-mobile-features">
                  {features.map((feature) => {
                    const tierIdx = tiers.findIndex(
                      (t) => t.name === tier.name
                    );
                    return (
                      <div key={feature.label} className="pt-mobile-row">
                        <span className="pt-mobile-label">
                          {feature.label}
                        </span>
                        <span className="pt-mobile-value">
                          <CellContent value={feature.values[tierIdx]} />
                        </span>
                      </div>
                    );
                  })}
                </div>
                <a href="#contact" className="pt-cta-btn">
                  Get Started
                </a>
              </div>
            ))}
        </div>

        {/* ─── Detailed Deliverables ─── */}
        <div
          style={{
            marginTop: 56,
            paddingTop: 48,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
              color: "#FFFFFF",
              marginBottom: 32,
            }}
          >
            What&apos;s Included in Each Package
          </h3>
          <div className="pt-deliverables-grid">
            {tiers.map((tier, i) => (
              <DeliverableCard key={tier.name} tier={tier} index={i} />
            ))}
          </div>
        </div>

        {/* ─── Tools Trust Bar ─── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginRight: 8,
            }}
          >
            Tools we use:
          </span>
          {tools.map((tool, i) => (
            <span
              key={tool}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {tool}
              </span>
              {i < tools.length - 1 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.4rem",
                  }}
                >
                  ●
                </span>
              )}
            </span>
          ))}
        </div>

        {/* ─── Stats Mini-bar ─── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(16px, 3vw, 40px)",
            flexWrap: "wrap",
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {[
            { value: "R68", label: "Average CPA" },
            { value: "5,000+", label: "Policyholders acquired" },
            { value: "R205K", label: "Own ad spend" },
            { value: "4.31%", label: "Average CTR" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--lime)",
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pt-desktop {
          display: block;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-top: 16px;
        }

        .pt-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: rgba(255,255,255,0.04);
          border-radius: 16px;
          overflow: visible;
          border: 1px solid rgba(255,255,255,0.08);
          min-width: 700px;
        }

        .pt-feature-header {
          text-align: left;
          padding: 20px 24px;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          border-radius: 16px 0 0 0;
        }

        .pt-tier-header {
          text-align: center;
          padding: 28px 16px 20px;
          color: #FFFFFF;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          position: relative;
          vertical-align: top;
          min-width: 160px;
        }

        .pt-tier-featured {
          background: rgba(200, 255, 0, 0.06);
          border-left: 1px solid rgba(200, 255, 0, 0.15);
          border-right: 1px solid rgba(200, 255, 0, 0.15);
        }

        .pt-badge {
          display: inline-block;
          background: var(--lime);
          color: #1A1A1A;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: 100px;
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          z-index: 10;
        }

        .pt-tier-name {
          display: block;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }

        .pt-tier-price {
          display: block;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--lime);
        }

        .pt-tier-note {
          font-weight: 400;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
        }

        .pt-tier-vat {
          display: block;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.35);
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .pt-row { transition: background-color 0.15s ease; }
        .pt-row:hover { background-color: rgba(255,255,255,0.03); }
        .pt-row-alt { background-color: rgba(255,255,255,0.02); }

        .pt-feature-cell {
          padding: 14px 24px;
          color: rgba(255,255,255,0.8);
          font-size: 0.875rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          line-height: 1.4;
        }

        .pt-cell {
          padding: 14px 16px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          vertical-align: middle;
          color: rgba(255,255,255,0.7);
          font-size: 0.8125rem;
        }

        .pt-cell-featured {
          background: rgba(200, 255, 0, 0.06);
          border-left: 1px solid rgba(200, 255, 0, 0.15);
          border-right: 1px solid rgba(200, 255, 0, 0.15);
          color: #FFFFFF;
          font-weight: 500;
        }

        .pt-cta-cell { padding: 20px 16px; border-bottom: none; }

        .pt-cta-btn {
          display: inline-block;
          background: var(--lime);
          color: #1A1A1A;
          font-weight: 700;
          font-size: 0.8125rem;
          padding: 12px 28px;
          border-radius: 8px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: background 0.2s, transform 0.15s;
          width: 100%;
          text-align: center;
        }

        .pt-cta-btn:hover {
          background: var(--lime-hover);
          transform: translateY(-1px);
        }

        /* Mobile cards */
        .pt-mobile { display: none; flex-direction: column; gap: 20px; }

        .pt-mobile-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: clamp(20px, 4vw, 28px) clamp(16px, 3vw, 24px);
          position: relative;
        }

        .pt-mobile-card-featured {
          border-color: rgba(200, 255, 0, 0.3);
          background: rgba(200, 255, 0, 0.06);
        }

        .pt-mobile-badge {
          display: inline-block;
          background: var(--lime);
          color: #1A1A1A;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 12px;
        }

        .pt-mobile-tier-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }

        .pt-mobile-price {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--lime);
          margin-bottom: 2px;
        }

        .pt-mobile-note { font-weight: 400; font-size: 0.85rem; color: rgba(255,255,255,0.5); }

        .pt-mobile-vat {
          display: block;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 16px;
        }

        .pt-mobile-features {
          border-top: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 16px;
        }

        .pt-mobile-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .pt-mobile-row:last-child { border-bottom: none; }

        .pt-mobile-label {
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          flex: 1;
          padding-right: 12px;
        }

        .pt-mobile-value {
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 500;
          text-align: right;
          max-width: 50%;
        }

        /* Deliverables grid */
        .pt-deliverables-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .pt-del-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: clamp(20px, 3vw, 28px) clamp(16px, 2.5vw, 24px);
          transition: border-color 0.2s ease;
        }

        .pt-del-card:hover {
          border-color: rgba(255,255,255,0.15);
        }

        .pt-del-card-featured {
          border-color: rgba(200, 255, 0, 0.2);
          background: rgba(200, 255, 0, 0.04);
        }

        .pt-del-card-featured:hover {
          border-color: rgba(200, 255, 0, 0.35);
        }

        @media (max-width: 767px) {
          .pt-desktop { display: none; }
          .pt-mobile { display: flex; }
          .pt-deliverables-grid { grid-template-columns: 1fr; }
        }

        @media (min-width: 768px) {
          .pt-mobile { display: none; }
        }
      `}</style>
    </section>
  );
}

function DeliverableCard({
  tier,
}: {
  tier: (typeof tiers)[number];
  index: number;
}) {
  return (
    <div
      className={`pt-del-card ${tier.featured ? "pt-del-card-featured" : ""}`}
    >
      <h4
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "0.85rem",
          color: "#FFFFFF",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 4,
        }}
      >
        {tier.name}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "var(--lime)",
          marginBottom: 2,
        }}
      >
        {tier.price}
        <span
          style={{
            fontWeight: 400,
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {" "}
          {tier.priceNote}
        </span>
      </p>
      <span
        style={{
          display: "block",
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 16,
        }}
      >
        ex VAT
      </span>

      {"intro" in tier && tier.intro && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--lime)",
            marginBottom: 12,
            fontStyle: "italic",
          }}
        >
          {tier.intro}
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tier.deliverables.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 8,
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "var(--lime)",
                marginTop: 6,
                flexShrink: 0,
                opacity: 0.7,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
