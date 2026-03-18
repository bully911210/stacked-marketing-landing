export default function ComparisonTable() {
  const rows = [
    {
      label: "Setup time",
      diy: "Weeks to months",
      agency: "2 to 4 weeks",
      stacked: "Under 2 weeks",
    },
    {
      label: "Monthly cost",
      diy: "Scattered tools + time",
      agency: "R15,000 to R30,000+",
      stacked: "From R4,999/mo",
    },
    {
      label: "Integrated strategy",
      diy: "No",
      agency: "Rarely",
      stacked: "Built in",
    },
    {
      label: "Points of contact",
      diy: "You (doing everything)",
      agency: "3 to 5 people",
      stacked: "1 dedicated contact",
    },
    {
      label: "Asset ownership",
      diy: "Depends on tools",
      agency: "Often locked in",
      stacked: "You own everything",
    },
    {
      label: "Lock-in",
      diy: "Tool subscriptions",
      agency: "6 to 12 month contracts",
      stacked: "Cancel anytime",
    },
    {
      label: "Local team",
      diy: "Just you",
      agency: "Often outsourced",
      stacked: "Pretoria-based",
    },
    {
      label: "Reporting",
      diy: "Manual tracking",
      agency: "Monthly PDFs",
      stacked: "Cross-channel, weekly",
    },
  ];

  const headerCellStyle: React.CSSProperties = {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "12px 16px",
    background: "#111111",
  };

  const cellStyle: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 14,
    padding: "14px 16px",
    background: "#161616",
    lineHeight: 1.5,
  };

  return (
    <section
      style={{
        paddingBlock: "clamp(4rem, 3rem + 5vw, 8rem)",
        paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 48,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Why Businesses Choose Us
        </h2>

        {/* Header */}
        <div
          className="svc-comparison-grid svc-comparison-header"
          style={{ marginBottom: 2 }}
        >
          <div style={{ ...headerCellStyle, color: "#666666" }}></div>
          <div style={{ ...headerCellStyle, color: "#666666" }}>DIY</div>
          <div style={{ ...headerCellStyle, color: "#666666" }}>Agency</div>
          <div
            style={{
              ...headerCellStyle,
              color: "#c8ff00",
              borderLeft: "2px solid #c8ff00",
              background: "rgba(200, 255, 0, 0.04)",
            }}
          >
            Stacked
          </div>
        </div>

        {/* Rows */}
        {rows.map((row) => (
          <div
            key={row.label}
            className="svc-comparison-grid"
            style={{ marginBottom: 2 }}
          >
            <div
              style={{
                ...cellStyle,
                fontWeight: 600,
                color: "#f5f5f0",
              }}
            >
              {row.label}
            </div>
            <div style={{ ...cellStyle, color: "#666666" }}>
              <span
                className="svc-cell-label"
                style={{
                  display: "none",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#444444",
                  marginBottom: 4,
                }}
              >
                DIY
              </span>
              {row.diy}
            </div>
            <div style={{ ...cellStyle, color: "#666666" }}>
              <span
                className="svc-cell-label"
                style={{
                  display: "none",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#444444",
                  marginBottom: 4,
                }}
              >
                Agency
              </span>
              {row.agency}
            </div>
            <div
              style={{
                ...cellStyle,
                color: "#f5f5f0",
                fontWeight: 600,
                borderLeft: "2px solid #c8ff00",
                background: "rgba(200, 255, 0, 0.04)",
              }}
            >
              <span
                className="svc-cell-label"
                style={{
                  display: "none",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#c8ff00",
                  marginBottom: 4,
                }}
              >
                Stacked
              </span>
              {row.stacked}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
