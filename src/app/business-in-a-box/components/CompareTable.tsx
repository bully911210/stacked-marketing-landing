"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const rows = [
  { feature: "Custom website", diy: "Template", freelancer: "Maybe", agency: "Yes", stacked: "\u2713" },
  { feature: "Facebook + content bridge", diy: "\u2717", freelancer: "\u2717", agency: "Extra cost", stacked: "\u2713" },
  { feature: "Google Business setup", diy: "\u2717", freelancer: "\u2717", agency: "Extra cost", stacked: "\u2713" },
  { feature: "WhatsApp Business", diy: "\u2717", freelancer: "\u2717", agency: "\u2717", stacked: "\u2713" },
  { feature: "Brand kit", diy: "\u2717", freelancer: "R3,000+", agency: "R8,000+", stacked: "\u2713" },
  { feature: "Social content", diy: "\u2717", freelancer: "\u2717", agency: "R3,000/mo", stacked: "\u2713" },
  { feature: "Strategy call", diy: "\u2717", freelancer: "\u2717", agency: "Maybe", stacked: "\u2713" },
  { feature: "Bonuses (pitch template, quick replies, checklist)", diy: "No", freelancer: "No", agency: "No", stacked: "\u2713" },
  { feature: "Meta Ads upgrade credit", diy: "No", freelancer: "No", agency: "No", stacked: "R2,000" },
  { feature: "Live in 7 days", diy: "Weeks", freelancer: "3-6 weeks", agency: "6-12 weeks", stacked: "\u2713" },
  { feature: "You own everything", diy: "No (platform lock)", freelancer: "Maybe", agency: "Rarely", stacked: "\u2713" },
  { feature: "Price", diy: "R0 + months", freelancer: "R8,000+", agency: "R25,000+", stacked: "R2,999", isPrice: true },
];

export default function CompareTable() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-main">
        <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""}`}>
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
            Business in a Box vs. the alternatives
          </h2>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table
              style={{
                width: "100%",
                minWidth: 700,
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  {["What you get", "DIY / Wix", "Freelancer", "Agency", "Stacked Box"].map(
                    (header, i) => (
                      <th
                        key={i}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: i === 4 ? "var(--lime)" : "var(--text-muted)",
                          textAlign: i === 0 ? "left" : "center",
                          padding: "14px 16px",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="biab-table-row"
                  >
                    <td
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: row.isPrice ? 700 : 500,
                        color: row.isPrice ? "var(--text-primary)" : "var(--text-secondary)",
                        padding: "14px 16px",
                        borderBottom: "1px solid var(--border)",
                        fontSize: "var(--text-body)",
                      }}
                    >
                      {row.feature}
                    </td>
                    {[row.diy, row.freelancer, row.agency].map((val, j) => (
                      <td
                        key={j}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 400,
                          color: "var(--text-muted)",
                          textAlign: "center",
                          padding: "14px 16px",
                          borderBottom: "1px solid var(--border)",
                          fontSize: "var(--text-body)",
                        }}
                      >
                        {val}
                      </td>
                    ))}
                    <td
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: row.isPrice ? 700 : 600,
                        color: "var(--lime)",
                        textAlign: "center",
                        padding: "14px 16px",
                        borderBottom: "1px solid var(--border)",
                        fontSize: row.isPrice ? "1.1rem" : "var(--text-body)",
                      }}
                    >
                      {row.stacked}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .biab-table-row:hover {
          background: rgba(255, 255, 255, 0.015);
        }
      `}</style>
    </section>
  );
}
