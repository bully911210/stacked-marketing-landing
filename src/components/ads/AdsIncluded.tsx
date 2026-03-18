"use client";

const items = [
  {
    num: "01",
    title: "Meta Business Suite Setup",
    desc: "Full configuration of your ad accounts, pages, and permissions.",
  },
  {
    num: "02",
    title: "Pixel and Tracking",
    desc: "Server-side and browser pixel installation with event verification.",
  },
  {
    num: "03",
    title: "Creative Production",
    desc: "Static and video ad creatives designed to convert, not just look pretty.",
  },
  {
    num: "04",
    title: "Audience Research",
    desc: "Custom audiences, lookalikes, and interest stacking based on real data.",
  },
  {
    num: "05",
    title: "Campaign Architecture",
    desc: "Structured campaigns with proper naming, budgets, and objectives.",
  },
  {
    num: "06",
    title: "Performance Reporting",
    desc: "Clear dashboards with the metrics that actually matter to your business.",
  },
  {
    num: "07",
    title: "Ongoing Optimisation",
    desc: "Continuous testing, scaling winners, and cutting what does not work.",
  },
  {
    num: "08",
    title: "Full Ownership",
    desc: "Every asset, every audience, every creative belongs to you. Always.",
  },
];

export default function AdsIncluded() {
  return (
    <section style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Tag */}
        <div
          className="ads-tag"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "#c8ff00",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          INCLUDED IN EVERY PLAN
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 2,
          }}
        >
          {items.map((item) => (
            <div
              key={item.num}
              className="ads-card"
              style={{ padding: 28 }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  color: "#c8ff00",
                  marginBottom: 12,
                  letterSpacing: "0.05em",
                }}
              >
                {item.num}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#f5f5f0",
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: "#8a8a80",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
