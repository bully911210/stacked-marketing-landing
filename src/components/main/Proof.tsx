"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CaseStudy {
  industry: string;
  metric: string;
  metricLabel: string;
  narrative: string;
  tag: string;
}

const caseStudies: CaseStudy[] = [
  {
    industry: "INSURANCE",
    metric: "R68 CPA",
    metricLabel: "5,000 policyholders acquired",
    narrative:
      "R205K own money. Restricted category. Month-one payback.",
    tag: "Lead Ads",
  },
  {
    industry: "NON-PROFIT",
    metric: "Database from zero",
    metricLabel: "petition funnels, donor acquisition",
    narrative:
      "No list, no brand recognition. Built the entire supporter base on Meta.",
    tag: "Awareness",
  },
  {
    industry: "AGRICULTURE",
    metric: "National reach",
    metricLabel: "niche audience, all nine provinces",
    narrative:
      "Found an audience that barely existed online. Converted them at scale.",
    tag: "Lookalikes",
  },
  {
    industry: "FINANCIAL SERVICES",
    metric: "Regulated leads",
    metricLabel: "compliance-approved, qualified pipeline",
    narrative:
      "Every ad approved. Every lead qualified. Volume the sales team could handle.",
    tag: "Retargeting",
  },
  {
    industry: "RECRUITMENT",
    metric: "50+ seats filled",
    metricLabel: "ad to application to floor",
    narrative:
      "Full pipeline on Meta. Every step tracked. One campaign cycle.",
    tag: "Volume",
  },
];

function CaseCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{
        transitionDelay: `${index * 80}ms`,
        gridColumn: index % 2 === 0 ? "1 / 8" : "5 / 13",
      }}
    >
      <div
        className="card proof-card"
        style={{
          padding: 48,
          position: "relative",
          overflow: "hidden",
          borderLeft: "3px solid transparent",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Vertical label */}
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "rotate(-90deg) translateX(-50%)",
            transformOrigin: "left center",
            color: "var(--lime-on-light)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          {study.industry}
        </span>

        <div style={{ marginLeft: 36 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: "3rem",
              color: "var(--text-primary)",
              lineHeight: 1.1,
            }}
          >
            {study.metric}
          </p>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              marginTop: 4,
            }}
          >
            {study.metricLabel}
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1rem",
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            {study.narrative}
          </p>
          <span
            style={{
              display: "inline-block",
              marginTop: 16,
              padding: "8px 16px",
              backgroundColor: "#F0FFB3",
              borderRadius: 100,
              color: "var(--lime-on-light)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            {study.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Proof() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal(0.2);
  const { ref: closingRef, isVisible: closingVisible } = useScrollReveal(0.2);

  return (
    <section id="proof" className="section-spacing" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-main">
        <div
          ref={headingRef}
          className={`fade-up ${headingVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h1"
            style={{ maxWidth: 700, marginBottom: 48 }}
          >
            R205K of our own ad spend before we touched a client campaign.
          </h2>
        </div>

        {/* Desktop staggered grid */}
        <div className="proof-grid">
          {caseStudies.map((study, i) => (
            <CaseCard key={study.industry} study={study} index={i} />
          ))}
        </div>

        <div
          ref={closingRef}
          className={`fade-up ${closingVisible ? "visible" : ""}`}
          style={{
            textAlign: "center",
            marginTop: 80,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              fontStyle: "italic",
              maxWidth: 600,
              marginInline: "auto",
              lineHeight: 1.6,
            }}
          >
            These results come from restricted, hard-to-advertise verticals.
            Imagine what we do in yours.
          </p>
        </div>
      </div>

      <style>{`
        .proof-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
        }
        .proof-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .proof-card:hover {
          border-left-color: var(--lime) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04) !important;
        }
        @media (max-width: 767px) {
          .proof-grid {
            grid-template-columns: 1fr;
          }
          .proof-grid > div {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
