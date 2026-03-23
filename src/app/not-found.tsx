import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-primary)",
        padding: 24,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "4rem",
            fontWeight: 700,
            color: "var(--lime-on-light)",
            marginBottom: 16,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 12,
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--lime)",
              color: "var(--text-on-accent)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "14px 28px",
              border: "none",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "14px 28px",
              border: "1px solid var(--border)",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
