"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ComparisonRow {
  feature: string;
  diy: string;
  agency: string;
  stacked: string;
}

const rows: ComparisonRow[] = [
  {
    feature: "Meta Ads Management",
    diy: "x",
    agency: "R15K+/mo",
    stacked: "from R4,999/mo",
  },
  {
    feature: "Full Stack (Ads + Web + Email)",
    diy: "x",
    agency: "x",
    stacked: "R11,999/mo",
  },
  {
    feature: "You Own Everything",
    diy: "x",
    agency: "x",
    stacked: "check",
  },
  {
    feature: "No Contracts",
    diy: "check",
    agency: "x",
    stacked: "check",
  },
  {
    feature: "WhatsApp Support",
    diy: "x",
    agency: "x",
    stacked: "check",
  },
  {
    feature: "Real Ad Spend Proof",
    diy: "x",
    agency: "x",
    stacked: "check",
  },
  {
    feature: "Pretoria Based",
    diy: "N/A",
    agency: "Sometimes",
    stacked: "check",
  },
];

function CellValue({
  value,
  isStacked,
}: {
  value: string;
  isStacked: boolean;
}) {
  if (value === "check") {
    return (
      <span style={{ color: "#2D6A4F", fontSize: "1.25rem", fontWeight: 700 }}>
        &#10003;
      </span>
    );
  }
  if (value === "x") {
    return (
      <span style={{ color: "#BFBFBF", fontSize: "1.25rem" }}>
        &#10005;
      </span>
    );
  }
  return (
    <span
      style={{
        color: isStacked ? "var(--text-primary)" : "var(--text-secondary)",
        fontSize: "0.875rem",
        fontFamily: "var(--font-body)",
        fontWeight: isStacked ? 600 : 400,
      }}
    >
      {value}
    </span>
  );
}

export default function Comparison() {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="comparison" className="section-spacing" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h1"
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            Why Stacked?
          </h2>
        </div>

        {/* Desktop table */}
        <div className="comparison-desktop desktop-only">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-body)",
              backgroundColor: "var(--bg-card)",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "20px 24px",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    fontSize: "0.8125rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    borderBottom: "2px solid var(--border)",
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "20px 24px",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    fontSize: "0.8125rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    borderBottom: "2px solid var(--border)",
                  }}
                >
                  DIY
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "20px 24px",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    fontSize: "0.8125rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    borderBottom: "2px solid var(--border)",
                  }}
                >
                  Typical Agency
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "20px 24px",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    backgroundColor: "var(--lime)",
                    color: "var(--text-primary)",
                    borderBottom: "2px solid var(--border)",
                  }}
                >
                  Stacked Marketing
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  style={{
                    backgroundColor: i % 2 === 1 ? "var(--bg-primary)" : "transparent",
                    transition: "background-color 0.15s",
                  }}
                >
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "var(--text-primary)",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {row.feature}
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <CellValue value={row.diy} isStacked={false} />
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <CellValue value={row.agency} isStacked={false} />
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--border)",
                      backgroundColor: i % 2 === 1 ? "#F0FFD6" : "#F5FFD6",
                    }}
                  >
                    <CellValue value={row.stacked} isStacked={true} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div
          className="mobile-only"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {[
            { title: "DIY", key: "diy" as const },
            { title: "Typical Agency", key: "agency" as const },
            { title: "Stacked Marketing", key: "stacked" as const },
          ].map((col) => (
            <div
              key={col.title}
              className="card"
              style={{
                padding: 24,
                borderColor:
                  col.key === "stacked"
                    ? "var(--lime-on-light)"
                    : "var(--border)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color:
                    col.key === "stacked"
                      ? "var(--lime-on-light)"
                      : "var(--text-primary)",
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {col.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {rows.map((row) => (
                  <div
                    key={row.feature}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 8,
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8125rem",
                      }}
                    >
                      {row.feature}
                    </span>
                    <CellValue
                      value={row[col.key]}
                      isStacked={col.key === "stacked"}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
