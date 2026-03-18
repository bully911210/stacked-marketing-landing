"use client";

const items = [
  {
    num: "01",
    title: "Real Reporting",
    desc: "No vanity metrics. Cost per lead, cost per click, and what actually converted.",
  },
  {
    num: "02",
    title: "Meta Pixel + CAPI",
    desc: "Server-side tracking so your data survives iOS privacy changes.",
  },
  {
    num: "03",
    title: "WhatsApp Support",
    desc: "Message us any time. Real person. Pretoria. No chatbots.",
  },
  {
    num: "04",
    title: "Full Account Access",
    desc: "Your ad account, your data, your assets. We never hold anything hostage.",
  },
  {
    num: "05",
    title: "Mobile-First Creatives",
    desc: "Every ad designed for how people actually scroll: on their phones.",
  },
  {
    num: "06",
    title: "Local Market Knowledge",
    desc: "We know Pretoria. We know SA. We do not run your ads from overseas.",
  },
  {
    num: "07",
    title: "Fast Onboarding",
    desc: "Fill in the form, hop on a 15-min call, ads live within 5 business days.",
  },
  {
    num: "08",
    title: "No Contracts Ever",
    desc: "Month to month. If we are not delivering, you leave. Simple.",
  },
];

export default function AdsIncluded() {
  return (
    <section style={{ paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)" }}>
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

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 48,
            lineHeight: 1.05,
          }}
        >
          No Hidden Costs. No Surprises.
        </h2>

        <div className="ads-included-grid">
          {items.map((item) => (
            <div
              key={item.num}
              className="ads-card"
              style={{ padding: 28, flexDirection: "column" }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 14,
                  color: "#c8ff00",
                  marginBottom: 12,
                  letterSpacing: "0.05em",
                  fontWeight: 700,
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
                  color: "#a0a0a0",
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
