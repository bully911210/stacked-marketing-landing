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
    metricLabel: "across 5,000 policyholders",
    narrative:
      "R205K of our own money spent in a restricted advertising category. We built the full funnel, optimised every audience segment, and achieved month-one payback on every campaign.",
    tag: "Lead Ads",
  },
  {
    industry: "NON-PROFIT (ADVOCACY)",
    metric: "Database built from zero",
    metricLabel: "petition funnels and donor acquisition",
    narrative:
      "Started with no existing list, no brand recognition, and a tight budget. Petition funnels drove sign-ups while donor acquisition campaigns funded the next round of growth.",
    tag: "Awareness",
  },
  {
    industry: "NON-PROFIT (AGRICULTURE)",
    metric: "Niche audience, national reach",
    metricLabel: "found them, converted them, grew the base",
    narrative:
      "An audience that barely existed online. We found them through layered targeting, converted them with tailored messaging, and grew the supporter base across all nine provinces.",
    tag: "Lookalikes",
  },
  {
    industry: "FINANCIAL SERVICES",
    metric: "Regulated lead generation",
    metricLabel: "compliance-heavy, every lead qualified",
    narrative:
      "Every ad had to pass compliance review. Every lead had to meet qualification criteria. We built a pipeline that satisfied the regulators and delivered volume the sales team could handle.",
    tag: "Retargeting",
  },
  {
    industry: "RECRUITMENT (BPO)",
    metric: "50+ seats filled",
    metricLabel: "full pipeline, Meta to application to floor",
    narrative:
      "From ad click to completed application to seated agent. We built the entire pipeline on Meta, tracked every step, and filled over 50 seats in a single campaign cycle.",
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
        className="card"
        style={{
          padding: 40,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vertical label */}
        <span
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "rotate(-90deg) translateX(-50%)",
            transformOrigin: "left center",
            color: "var(--lime-on-light)",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          {study.industry}
        </span>

        <div style={{ marginLeft: 32 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "2.5rem",
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
    <section id="proof" className="section-spacing">
      <div className="container-main">
        <div
          ref={headingRef}
          className={`fade-up ${headingVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h1"
            style={{ maxWidth: 700, marginBottom: 48 }}
          >
            We Spent Our Own Money Before We Ever Touched a Client Campaign.
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
            marginTop: 64,
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
