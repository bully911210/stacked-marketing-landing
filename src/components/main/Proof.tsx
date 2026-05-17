"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCallback } from "react";

const bigStats = [
  { value: "R68", label: "Average cost per lead" },
  { value: "5,000+", label: "Subscription clients" },
  { value: "R205K", label: "Own ad spend" },
  { value: "9", label: "Provinces reached" },
];

interface StoryCard {
  pill: string;
  stat: string;
  description: string;
  category: string;
  featured?: boolean;
}

const storyCards: StoryCard[] = [
  {
    pill: "Lead Ads",
    stat: "R68 CPA",
    description:
      "5,000 subscription clients. R205K own money. Month-one payback.",
    category: "Insurance",
    featured: true,
  },
  {
    pill: "Awareness",
    stat: "Database from zero",
    description:
      "Built entire supporter base on Meta. 40,000+ contacts from zero.",
    category: "Non-Profit",
  },
  {
    pill: "Lookalikes",
    stat: "National reach",
    description:
      "All 9 provinces in 60 days. Audience barely existed online.",
    category: "Agriculture",
  },
  {
    pill: "Retargeting",
    stat: "Regulated leads",
    description:
      "Every ad approved. Every lead qualified. 100% compliance-approved.",
    category: "Fin. Services",
  },
  {
    pill: "Volume",
    stat: "50+ seats filled",
    description:
      "Full pipeline on Meta. One campaign cycle. Every step tracked.",
    category: "Recruitment",
  },
];

function StoryCardItem({ card, index }: { card: StoryCard; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-up card-spotlight ${isVisible ? "visible" : ""} ${card.featured ? "story-card--featured" : "story-card"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseMove={handleMouseMove}
    >
      <span className={`story-card__pill ${card.featured ? "story-card__pill--featured" : ""}`}>
        {card.pill}
      </span>
      <span className="story-card__stat">{card.stat}</span>
      <span className="story-card__desc">{card.description}</span>
      <span className={`story-card__cat ${card.featured ? "story-card__cat--featured" : ""}`}>
        {card.category}
      </span>
    </div>
  );
}

export default function Proof() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal(0.15);
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.1);
  const { ref: closingRef, isVisible: closingVisible } = useScrollReveal(0.2);

  return (
    <section
      id="proof"
      style={{
        backgroundColor: "var(--bg-primary)",
        paddingTop: "var(--section-gap-desktop)",
        paddingBottom: "var(--section-gap-desktop)",
      }}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className={`fade-up container-main ${headingVisible ? "visible" : ""}`}
        style={{ marginBottom: 48, textAlign: "center" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-h2)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            maxWidth: 800,
            marginInline: "auto",
            marginBottom: 20,
          }}
        >
          We didn&apos;t start with clients.{" "}
          <br />
          We started with conviction.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            maxWidth: 640,
            marginInline: "auto",
            lineHeight: 1.7,
          }}
        >
          R205K spent. R68 CPA. 5,000 subscription clients. All our own money, in a restricted category.
        </p>
      </div>

      {/* Full-width dark stat grid */}
      <div
        ref={statsRef}
        className={`fade-up ${statsVisible ? "visible" : ""}`}
        style={{
          background: "var(--bg-contrast)",
          padding: "60px 40px",
          marginBottom: 0,
        }}
      >
        <div className="proof-stat-grid">
          {bigStats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(2.8rem, 5vw, 4rem)",
                  color: "var(--gold)",
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--text-on-dark)",
                  opacity: 0.75,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story cards */}
      <div
        ref={cardsRef}
        className={`fade-up container-main ${cardsVisible ? "visible" : ""}`}
        style={{ marginTop: 48 }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--lime)",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Results across restricted categories.
        </p>

        <div>
          {storyCards.map((card, i) => (
            <StoryCardItem key={card.category} card={card} index={i} />
          ))}
        </div>

        {/* Closing tagline */}
        <div
          ref={closingRef}
          className={`fade-up ${closingVisible ? "visible" : ""}`}
        >
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              maxWidth: 600,
              margin: "48px auto 0",
              fontFamily: "var(--font-body)",
              lineHeight: 1.7,
            }}
          >
            Every category above required compliance approval. Every lead was qualified. None of it used a client&apos;s money to learn.
          </p>
        </div>
      </div>

      <style>{`
        .proof-stat-grid {
          max-width: 1100px;
          margin-inline: auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        @media (max-width: 767px) {
          .proof-stat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 24px;
          }
        }

        .story-card {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          border: 1px solid rgba(28,32,16,0.08);
          background: transparent;
          border-radius: 14px;
          padding: 18px 24px;
          margin-bottom: 12px;
          position: relative;
          overflow: hidden;
        }
        .story-card:last-child { margin-bottom: 0; }
        .story-card--featured {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          border: 1px solid rgba(107,122,63,0.3);
          background: rgba(107,122,63,0.06);
          border-radius: 14px;
          padding: 20px 24px;
          margin-bottom: 12px;
          position: relative;
          overflow: hidden;
        }
        .story-card__pill {
          background: rgba(107,122,63,0.1);
          color: var(--lime);
          opacity: 0.9;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 14px;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .story-card__pill--featured { background: rgba(107,122,63,0.16); opacity: 1; }
        .story-card__stat {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-primary);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .story-card__desc {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          flex: 1;
          min-width: 0;
        }
        .story-card__cat {
          font-size: 0.75rem;
          color: var(--text-muted);
          opacity: 0.6;
          text-align: right;
          white-space: nowrap;
          margin-left: auto;
          flex-shrink: 0;
        }
        .story-card__cat--featured { color: var(--lime); opacity: 0.9; }

        @media (max-width: 767px) {
          .story-card, .story-card--featured {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 16px 18px;
          }
          .story-card--featured { padding: 18px 20px; }
          .story-card__stat { white-space: normal; }
          .story-card__cat { margin-left: 0; }
        }
        @media (max-width: 400px) {
          .story-card__cat { display: none; }
        }
      `}</style>
    </section>
  );
}
