"use client";

export default function AdsNav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#f5f5f0",
          }}
        ><span style={{ color: "#c8ff00" }}>S</span>TACKED MARKETING</span>

        <a
          href="https://wa.me/27621779799"
          target="_blank"
          rel="noopener noreferrer"
          className="ads-btn-filled"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            background: "#c8ff00",
            color: "#0a0a0a",
            padding: "10px 24px",
            borderRadius: 6,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          GET STARTED
        </a>
      </div>
    </nav>
  );
}
