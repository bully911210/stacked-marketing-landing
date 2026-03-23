import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Stacked Marketing - Your Marketing Isn't Broken. It's Disconnected.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#1A1A1A",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#C8FF00",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: "#C8FF00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            S
          </div>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            STACKED MARKETING
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 900,
          }}
        >
          Your Marketing Isn&apos;t Broken.{" "}
          <span style={{ color: "#C8FF00" }}>It&apos;s Disconnected.</span>
        </h1>

        {/* Subline */}
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 24,
            marginTop: 24,
            lineHeight: 1.5,
          }}
        >
          Website + Ads + Automations | Pretoria, South Africa
        </p>

        {/* URL */}
        <p
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            color: "rgba(255,255,255,0.3)",
            fontSize: 18,
            fontFamily: "monospace",
          }}
        >
          stackedmarketing.co.za
        </p>
      </div>
    ),
    { ...size }
  );
}
