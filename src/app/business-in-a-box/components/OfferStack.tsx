"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface OfferItem {
  number: string;
  heading: string;
  description: string;
  tag: string;
}

const tiers: { label: string; items: OfferItem[] }[] = [
  {
    label: "THE FOUNDATION",
    items: [
      {
        number: "01",
        heading: "Business-Grade Website",
        description:
          "Custom designed, mobile-first, lightning-fast. Contact form, WhatsApp click-to-chat, and smooth animations. Not a template. Yours.",
        tag: "LIVE IN 7 DAYS",
      },
      {
        number: "02",
        heading: "WhatsApp Business Setup",
        description:
          "Branded WhatsApp Business profile with auto-reply greeting, away message, and product catalogue stub. The channel your customers actually use.",
        tag: "PROFESSIONAL FROM MESSAGE ONE",
      },
      {
        number: "03",
        heading: "Full Suite SEO",
        description:
          "On-page SEO, meta titles, meta descriptions, schema markup, XML sitemap, and speed optimisation baked into your website from day one. Not bolted on later. Built in.",
        tag: "SEARCH-READY FROM LAUNCH",
      },
    ],
  },
  {
    label: "THE UNFAIR ADVANTAGE",
    items: [
      {
        number: "04",
        heading: "Facebook Profile + Content Bridge",
        description:
          "Fully branded Facebook Business page. Your feed is wired to your website. Post on Facebook and it automatically appears as a blog post on your site. One action, two channels.",
        tag: "POST ONCE, PUBLISH EVERYWHERE",
      },
      {
        number: "05",
        heading: "Brand Starter Kit",
        description:
          "Logo lockup, colour palette, font pairing, and a business card template. Everything in a Canva kit you can edit yourself forever.",
        tag: "EDITABLE IN CANVA",
      },
      {
        number: "06",
        heading: "5 Ready-to-Post Social Creatives",
        description:
          "Five designed, captioned, ready-to-publish social media posts. No staring at a blank screen. Just hit post.",
        tag: "CONTENT FROM DAY ONE",
      },
    ],
  },
  {
    label: "THE SECRET WEAPON",
    items: [
      {
        number: "07",
        heading: "30-Day Launch Playbook",
        description:
          "Step-by-step PDF guide for your first 30 days in business. What to do, when to do it, and how to land your first five customers.",
        tag: "YOUR FIRST 5 CUSTOMERS",
      },
      {
        number: "08",
        heading: "30-Minute Launch Strategy Call",
        description:
          "Not support. Not troubleshooting. A proper one-on-one session where we map out how you get customers. And when you are ready to scale, we are already here.",
        tag: "1-ON-1 WITH OUR STRATEGIST",
      },
    ],
  },
];

export default function OfferStack() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="whats-inside"
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-main">
        <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""}`}>
          {/* Section label */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--lime)",
              opacity: 0.7,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            WHAT&apos;S IN THE BOX
          </p>

          {/* Section title */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-h2)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Everything to go from idea to{" "}
            <span style={{ color: "var(--lime)" }}>open for business.</span>
          </h2>

          {/* Items list */}
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {tiers.map((tier, tierIndex) => (
              <div key={tierIndex}>
                {/* Tier label */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "var(--lime)",
                    marginBottom: 16,
                    marginTop: tierIndex === 0 ? 0 : 48,
                  }}
                >
                  {tier.label}
                </p>

                {tier.items.map((item, itemIndex) => {
                  const isLastInTier = itemIndex === tier.items.length - 1;
                  return (
                    <div
                      key={item.number}
                      className="biab-offer-item"
                      style={{
                        display: "flex",
                        gap: 20,
                        paddingBlock: 24,
                        borderBottom: isLastInTier
                          ? "none"
                          : "1px solid var(--border)",
                      }}
                    >
                      {/* Number */}
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 700,
                          fontSize: "2rem",
                          color: "rgba(200, 255, 0, 0.15)",
                          minWidth: 48,
                          lineHeight: 1,
                        }}
                      >
                        {item.number}
                      </span>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 600,
                            fontSize: "1.15rem",
                            color: "var(--text-primary)",
                            marginBottom: 8,
                          }}
                        >
                          {item.heading}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 400,
                            color: "var(--text-secondary)",
                            lineHeight: 1.7,
                            fontSize: "var(--text-body)",
                            marginBottom: 12,
                          }}
                        >
                          {item.description}
                        </p>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            color: "var(--lime)",
                            opacity: 0.7,
                            background: "var(--color-accent-muted)",
                            padding: "4px 12px",
                            borderRadius: "var(--radius-pill)",
                            display: "inline-block",
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .biab-offer-item {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
