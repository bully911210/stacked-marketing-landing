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
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="card proof-card"
        style={{
          padding: "clamp(28px, 4vw, 48px)",
          position: "relative",
          overflow: "hidden",
          borderLeft: "3px solid transparent",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)",
          height: "100%",
        }}
      >
        {/* Industry label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--lime-on-light)",
            marginBottom: 12,
          }}
        >
          {study.industry}
        </p>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
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
            padding: "6px 14px",
            backgroundColor: "var(--color-accent-muted)",
            border: "1px solid var(--color-accent-border)",
            borderRadius: "var(--radius-pill)",
            color: "var(--lime-on-light)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            letterSpacing: "0.05em",
          }}
        >
          {study.tag}
        </span>
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
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2
            className="text-h1"
            style={{ maxWidth: 800, marginInline: "auto" }}
          >
            R205K spent. R68 CPA. 5,000 policyholders. All our own money, in a restricted category.
          </h2>
        </div>

        {/* Consistent card grid */}
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
            marginTop: 64,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: "var(--text-secondary)",
              fontStyle: "italic",
              maxWidth: 650,
              marginInline: "auto",
              lineHeight: 1.5,
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
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .proof-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .proof-card:hover {
          border-left-color: var(--lime) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04) !important;
          transform: translateY(-4px);
        }
        @media (max-width: 1023px) {
          .proof-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .proof-grid > :last-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 767px) {
          .proof-grid {
            grid-template-columns: 1fr;
          }
          .proof-grid > :last-child {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
}
