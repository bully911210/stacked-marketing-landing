"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCallback } from "react";

const tiers = [
  {
    name: "Professional Website",
    price: "R3,999",
    priceNote: "once-off",
    featured: false,
    media: "website-card",
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
    featured: true,
    media: "ads-card",
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
];

function PricingCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.15);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms`, height: "100%" }}
    >
      {tier.featured ? (
        /* Gradient glow border wrapper for featured card */
        <div
          style={{
            padding: 2,
            borderRadius: "calc(var(--card-radius) + 2px)",
            background: "linear-gradient(135deg, rgba(107,122,63,0.5), rgba(107,122,63,0.12) 50%, rgba(107,122,63,0.35))",
            height: "100%",
          }}
        >
          <div
            className="card-spotlight"
            onMouseMove={handleMouseMove}
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--card-radius)",
              padding: "var(--card-padding-desktop)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 8px 50px rgba(107, 122, 63, 0.18)",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: -14,
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--lime)",
                color: "var(--text-on-accent)",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                padding: "6px 20px",
                borderRadius: 100,
                whiteSpace: "nowrap",
              }}
            >
              RECOMMENDED
            </span>
            <CardContent tier={tier} />
          </div>
        </div>
      ) : (
        <div
          className="card card-spotlight"
          onMouseMove={handleMouseMove}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent tier={tier} />
        </div>
      )}
    </div>
  );
}

function CardContent({ tier }: { tier: (typeof tiers)[number] }) {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 24,
          background:
            "linear-gradient(135deg, var(--moss) 0%, var(--cream) 100%)",
        }}
      >
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          poster={`/brand/${tier.media}.jpg`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src={`/brand/${tier.media}.mp4`} type="video/mp4" />
        </video>
      </div>

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
              <circle cx="9" cy="9" r="9" fill="rgba(107,122,63,0.15)" />
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
    </>
  );
}

export default function PricingTable() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="pricing"
      className="section-spacing dot-grid-bg"
      style={{ backgroundColor: "var(--bg-tertiary)" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
          style={{ textAlign: "center" }}
        >
          <span className="section-eyebrow">TWO WAYS IN</span>
          <h2
            className="text-h2"
            style={{
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            Simple pricing. No lock-in.
          </h2>
        </div>

        <div className="pricing-cards-grid">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--card-gap);
          align-items: stretch;
          max-width: 880px;
          margin-inline: auto;
        }
        @media (max-width: 767px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }
        }
      `}</style>
    </section>
  );
}
