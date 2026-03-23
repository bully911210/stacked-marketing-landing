"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── data ── */

const stats = [
  { value: "R68 CPA", label: "Insurance" },
  { value: "40K+", label: "Non-Profit" },
  { value: "9 provinces", label: "Agriculture" },
  { value: "100%", label: "Fin. Services" },
  { value: "50+ seats", label: "Recruitment" },
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

/* ── animation helpers ── */

const motionEase = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* ── component ── */

export default function Proof() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal(0.15);
  const { ref: stripRef, isVisible: stripVisible } = useScrollReveal(0.15);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.15);
  const { ref: closingRef, isVisible: closingVisible } = useScrollReveal(0.2);

  return (
    <section
      id="proof"
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container-main">
        {/* ── heading ── */}
        <div
          ref={headingRef}
          className={`fade-up ${headingVisible ? "visible" : ""}`}
          style={{ marginBottom: 16 }}
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
            PROOF, NOT PROMISES
          </p>
          <h2
            className="text-h2"
            style={{
              maxWidth: 900,
              marginInline: "auto",
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            R205K spent. R68 CPA. 5,000 subscription clients. All our own
            money, in a restricted category.
          </h2>
        </div>

        {/* ── stats strip ── */}
        <motion.div
          ref={stripRef}
          className="stats-strip"
          initial="hidden"
          animate={stripVisible ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: motionEase }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stats-strip__cell"
              style={
                i < stats.length - 1
                  ? { borderRight: "1px solid rgba(255,255,255,0.06)" }
                  : undefined
              }
            >
              <span className="stats-strip__value">{s.value}</span>
              <span className="stats-strip__label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── story cards ── */}
        <div ref={cardsRef} style={{ marginTop: 32 }}>
          {storyCards.map((card, i) => (
            <motion.div
              key={card.category}
              className={`story-card ${card.featured ? "story-card--featured" : ""}`}
              initial="hidden"
              animate={cardsVisible ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{
                duration: 0.5,
                ease: motionEase,
                delay: i * 0.08,
              }}
            >
              {/* pill */}
              <span
                className={`story-card__pill ${card.featured ? "story-card__pill--featured" : ""}`}
              >
                {card.pill}
              </span>

              {/* stat */}
              <span className="story-card__stat">{card.stat}</span>

              {/* description */}
              <span className="story-card__desc">{card.description}</span>

              {/* category */}
              <span
                className={`story-card__cat ${card.featured ? "story-card__cat--featured" : ""}`}
              >
                {card.category}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── closing tagline ── */}
        <div
          ref={closingRef}
          className={`fade-up ${closingVisible ? "visible" : ""}`}
        >
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              color: "#999",
              fontSize: "0.9rem",
              maxWidth: 560,
              margin: "48px auto 0",
              fontFamily: "var(--font-body)",
              lineHeight: 1.6,
            }}
          >
            These results come from restricted, hard-to-advertise verticals.
            Imagine what we do in yours.
          </p>
        </div>
      </div>

      <style>{`
        /* ── stats strip ── */
        .stats-strip {
          max-width: 1140px;
          margin-inline: auto;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 28px 0;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
        }
        .stats-strip__cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .stats-strip__value {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #ffffff;
        }
        .stats-strip__label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          color: #C8FF00;
          opacity: 0.7;
          margin-top: 6px;
        }

        /* mobile stats strip */
        @media (max-width: 768px) {
          .stats-strip {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px 0;
            padding: 24px 0;
          }
          /* hide right borders on 3rd and 5th cells for clean rows */
          .stats-strip__cell:nth-child(3),
          .stats-strip__cell:nth-child(5) {
            border-right: none !important;
          }
        }

        /* ── story cards ── */
        .story-card {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          border: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          border-radius: 14px;
          padding: 18px 24px;
          margin-bottom: 12px;
        }
        .story-card:last-child {
          margin-bottom: 0;
        }
        .story-card--featured {
          border: 1px solid rgba(200,255,0,0.3);
          background: rgba(200,255,0,0.03);
          padding: 20px 24px;
        }

        /* pill */
        .story-card__pill {
          background: rgba(200,255,0,0.06);
          color: #C8FF00;
          opacity: 0.7;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 14px;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .story-card__pill--featured {
          background: rgba(200,255,0,0.12);
          opacity: 1;
        }

        /* stat headline */
        .story-card__stat {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: #ffffff;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* description */
        .story-card__desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          color: #888888;
          flex: 1;
          min-width: 0;
        }
        .story-card--featured .story-card__desc {
          color: #A0A0A0;
        }

        /* category label */
        .story-card__cat {
          font-size: 0.75rem;
          color: #999;
          opacity: 0.35;
          text-align: right;
          white-space: nowrap;
          margin-left: auto;
          flex-shrink: 0;
        }
        .story-card__cat--featured {
          color: #C8FF00;
          opacity: 0.5;
        }

        /* mobile story cards */
        @media (max-width: 400px) {
          .story-card__cat {
            display: none;
          }
        }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .stats-strip,
          .story-card {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
