"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ComparisonRow {
  feature: string;
  agency: string;
  stacked: string;
}

const rows: ComparisonRow[] = [
  {
    feature: "We Manage and Scale Your Ads Daily",
    agency: "R15K+/mo",
    stacked: "From R4,999/mo",
  },
  {
    feature: "Ads + Website + Automation Done For You",
    agency: "dash",
    stacked: "R11,999/mo",
  },
  {
    feature: "You Keep All Assets (No Lock-in)",
    agency: "dash",
    stacked: "check",
  },
  {
    feature: "No Contracts. Cancel Anytime.",
    agency: "dash",
    stacked: "check",
  },
  {
    feature: "Direct WhatsApp Support",
    agency: "dash",
    stacked: "check",
  },
  {
    feature: "Live Ad Spend Transparency",
    agency: "dash",
    stacked: "check",
  },
  {
    feature: "Start for just R2,499 with a premium custom website",
    agency: "dash",
    stacked: "check",
  },
  {
    feature: "Crystal-clear upgrade path: move up anytime with R2,000 credit",
    agency: "dash",
    stacked: "check",
  },
];

function CellValue({ value, isStacked }: { value: string; isStacked: boolean }) {
  if (value === "check") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display: "block", margin: "0 auto" }}>
        <circle cx="11" cy="11" r="11" fill={isStacked ? "#DCFCE7" : "#F0FDF4"} />
        <path d="M7 11.5L9.5 14L15 8.5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (value === "dash") {
    return (
      <span style={{ color: "#CBD5E1", fontSize: "1.25rem", fontWeight: 300, display: "block", textAlign: "center" }}>
        -
      </span>
    );
  }
  return (
    <span
      style={{
        color: isStacked ? "#0F172A" : "#64748B",
        fontSize: "0.875rem",
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
    <section
      id="comparison"
      className="section-spacing"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <div className="container-main">
        <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""}`}>
          <h2
            className="text-h2"
            style={{
              textAlign: "center",
              marginBottom: 16,
              color: "#0F172A",
            }}
          >
            Why Stacked?
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#64748B",
              fontSize: "1.05rem",
              maxWidth: 600,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            Most agencies charge more, deliver less, and lock you in. Stacked
            Marketing gives you full control, full transparency, and real results.
          </p>
        </div>

        {/* Desktop table */}
        <div className="comparison-wrap desktop-only">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="ct-feature-header">Feature</th>
                <th className="ct-header">Typical Agency</th>
                <th className="ct-stacked-header">
                  <span className="ct-badge">Best Value</span>
                  Stacked Marketing
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={`ct-row ${i % 2 === 0 ? "ct-row-alt" : ""}`}>
                  <td className="ct-feature">{row.feature}</td>
                  <td className="ct-cell">
                    <CellValue value={row.agency} isStacked={false} />
                  </td>
                  <td className="ct-cell ct-stacked-cell">
                    <CellValue value={row.stacked} isStacked={true} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} />
                <td className="ct-cta-cell">
                  <a href="#contact" className="ct-cta-btn">
                    Get Started
                  </a>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mobile-only" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Stacked card FIRST on mobile */}
          <div className="ct-mobile-card ct-mobile-featured">
            <div className="ct-mobile-badge">Best Value</div>
            <h3 className="ct-mobile-title ct-mobile-title-featured">Stacked Marketing</h3>
            {rows.map((row) => (
              <div key={row.feature} className="ct-mobile-row">
                <span className="ct-mobile-label">{row.feature}</span>
                <CellValue value={row.stacked} isStacked={true} />
              </div>
            ))}
            <a href="#contact" className="ct-cta-btn" style={{ marginTop: 16 }}>Get Started</a>
          </div>
          <div className="ct-mobile-card">
            <h3 className="ct-mobile-title">Typical Agency</h3>
            {rows.map((row) => (
              <div key={row.feature} className="ct-mobile-row">
                <span className="ct-mobile-label">{row.feature}</span>
                <CellValue value={row.agency} isStacked={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .comparison-wrap {
          max-width: 900px;
          margin: 0 auto;
          padding-top: 16px;
        }

        .comparison-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #FFFFFF;
          border-radius: 12px;
          overflow: visible;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.05);
          border: 1px solid #E2E8F0;
        }

        .ct-feature-header {
          text-align: left;
          padding: 18px 24px;
          color: #64748B;
          font-weight: 500;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 1px solid #E2E8F0;
          background: #FFFFFF;
          border-radius: 12px 0 0 0;
        }

        .ct-header {
          text-align: center;
          padding: 18px 20px;
          color: #64748B;
          font-weight: 500;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 1px solid #E2E8F0;
          background: #FFFFFF;
        }

        .ct-stacked-header {
          text-align: center;
          padding: 24px 20px 18px;
          color: #0F172A;
          font-weight: 700;
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-bottom: 1px solid #BBF7D0;
          background: #F0FDF4;
          position: relative;
          border-radius: 0 12px 0 0;
        }

        .ct-badge {
          display: inline-block;
          background: #22C55E;
          color: #FFFFFF;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: 100px;
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(34, 197, 94, 0.3);
        }

        .ct-row {
          transition: background-color 0.15s ease;
        }

        .ct-row:hover {
          background-color: #F8FAFC !important;
        }

        .ct-row-alt {
          background-color: #FAFBFC;
        }

        .ct-feature {
          padding: 14px 24px;
          color: #0F172A;
          font-size: 0.9rem;
          font-weight: 500;
          border-bottom: 1px solid #F1F5F9;
          line-height: 1.4;
        }

        .ct-cell {
          padding: 14px 20px;
          text-align: center;
          border-bottom: 1px solid #F1F5F9;
          vertical-align: middle;
        }

        .ct-stacked-cell {
          background: #F0FDF4;
          border-left: 1px solid #BBF7D0;
        }

        .ct-row-alt .ct-stacked-cell {
          background: #ECFDF5;
        }

        .ct-cta-cell {
          background: #F0FDF4;
          border-left: 1px solid #BBF7D0;
          padding: 20px;
          text-align: center;
          border-radius: 0 0 12px 0;
        }

        .ct-cta-btn {
          display: inline-block;
          background: #22C55E;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 12px 32px;
          border-radius: 8px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.25);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          width: 100%;
          text-align: center;
        }

        .ct-cta-btn:hover {
          background: #16A34A;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.3);
        }

        /* Mobile cards */
        .ct-mobile-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
        }

        .ct-mobile-featured {
          border-color: #BBF7D0;
          background: linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 40%);
          box-shadow: 0 2px 12px rgba(34, 197, 94, 0.1), 0 1px 3px rgba(15, 23, 42, 0.04);
          position: relative;
        }

        .ct-mobile-badge {
          display: inline-block;
          background: #22C55E;
          color: #FFFFFF;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 12px;
        }

        .ct-mobile-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .ct-mobile-title-featured {
          color: #16A34A;
        }

        .ct-mobile-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #F1F5F9;
        }

        .ct-mobile-row:last-of-type {
          border-bottom: none;
        }

        .ct-mobile-label {
          color: #64748B;
          font-size: 0.8125rem;
          flex: 1;
          padding-right: 12px;
          min-width: 0;
          word-break: break-word;
        }
      `}</style>
    </section>
  );
}
