"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CaseStudy {
  industry: string;
  metric: string;
  metricLabel: string;
  narrative: string;
  tag: string;
  kpi: string;
}

const caseStudies: CaseStudy[] = [
  {
    industry: "INSURANCE",
    metric: "R68 CPA",
    metricLabel: "5,000 policyholders acquired",
    narrative: "R205K own money. Restricted category.",
    kpi: "Month-one payback on R205K spend",
    tag: "Lead Ads",
  },
  {
    industry: "NON-PROFIT",
    metric: "Database from zero",
    metricLabel: "Petition funnels, donor acquisition",
    narrative: "No list, no brand recognition. Built the entire supporter base on Meta.",
    kpi: "40,000+ contacts acquired from zero",
    tag: "Awareness",
  },
  {
    industry: "AGRICULTURE",
    metric: "National reach",
    metricLabel: "Niche audience, all nine provinces",
    narrative: "Found an audience that barely existed online. Converted them at scale.",
    kpi: "Reached all 9 provinces in 60 days",
    tag: "Lookalikes",
  },
  {
    industry: "FINANCIAL SERVICES",
    metric: "Regulated leads",
    metricLabel: "Compliance-approved, qualified pipeline",
    narrative: "Every ad approved. Every lead qualified. Volume the sales team could handle.",
    kpi: "100% compliance-approved creative",
    tag: "Retargeting",
  },
  {
    industry: "RECRUITMENT",
    metric: "50+ seats filled",
    metricLabel: "Ad to application to floor",
    narrative: "Full pipeline on Meta. Every step tracked. One campaign cycle.",
    kpi: "50+ seats filled in one campaign cycle",
    tag: "Volume",
  },
];

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="card proof-card"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Industry label */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "var(--text-caption)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--lime)",
            marginBottom: 16,
          }}
        >
          {study.industry}
        </span>

        {/* Big metric */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: "var(--text-stat)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          {study.metric}
        </p>

        {/* Metric label */}
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--text-body)",
            fontFamily: "var(--font-body)",
            marginTop: 4,
          }}
        >
          {study.metricLabel}
        </p>

        {/* Narrative */}
        <p
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "var(--text-caption)",
            marginTop: 12,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {study.narrative}
        </p>

        {/* Specific KPI */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "var(--text-primary)",
            marginTop: 16,
          }}
        >
          {study.kpi}
        </p>

        {/* Tag */}
        <span
          style={{
            display: "inline-block",
            marginTop: 16,
            padding: "6px 14px",
            backgroundColor: "var(--color-accent-muted)",
            border: "1px solid var(--color-accent-border)",
            borderRadius: "var(--radius-pill)",
            color: "var(--lime)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            letterSpacing: "0.05em",
            width: "fit-content",
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
    <section
      id="proof"
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container-main">
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
            style={{ maxWidth: 900, marginInline: "auto", textAlign: "center", marginBottom: 56 }}
          >
            R205K spent. R68 CPA. 5,000 policyholders. All our own money, in a restricted category.
          </h2>
        </div>

        <div className="proof-grid">
          {caseStudies.map((study, i) => (
            <CaseCard key={study.industry} study={study} index={i} />
          ))}
        </div>

        <div
          ref={closingRef}
          className={`fade-up ${closingVisible ? "visible" : ""}`}
          style={{ textAlign: "center", marginTop: 64 }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "var(--text-body-lg)",
              color: "var(--text-secondary)",
              fontStyle: "italic",
              maxWidth: 650,
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
          grid-template-columns: repeat(3, 1fr);
          gap: var(--card-gap);
        }
        .proof-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .proof-card:hover {
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
