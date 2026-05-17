import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Stacked Marketing - Two things, done brilliantly.";
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
          backgroundColor: "#FFFFFF",
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
            backgroundColor: "#6B7A3F",
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
              backgroundColor: "#6B7A3F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            S
          </div>
          <span
            style={{
              color: "#1C2010",
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
            color: "#1C2010",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 900,
          }}
        >
          Two things,{" "}
          <span style={{ color: "#6B7A3F" }}>done brilliantly.</span>
        </h1>

        {/* Subline */}
        <p
          style={{
            color: "#4A5230",
            fontSize: 24,
            marginTop: 24,
            lineHeight: 1.5,
          }}
        >
          Websites · Managed Ads | Pretoria, South Africa
        </p>

        {/* URL */}
        <p
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            color: "#7A8868",
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
