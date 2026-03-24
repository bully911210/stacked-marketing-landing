import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Business in a Box - R2,999 - Stacked Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0D0D0D",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            fontSize: 14,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#C8FF00",
            background: "rgba(200, 255, 0, 0.15)",
            padding: "8px 20px",
            borderRadius: 999,
          }}
        >
          LIMITED LAUNCH OFFER
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Business in a Box
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#C8FF00",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          R2,999
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#A0A0A0",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Website. Google. Facebook. WhatsApp. Brand kit. Live in 7 days.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 16,
            fontWeight: 700,
            color: "#0D0D0D",
            background: "#C8FF00",
            padding: "14px 32px",
            borderRadius: 999,
          }}
        >
          stackedmarketing.co.za
        </div>
      </div>
    ),
    { ...size }
  );
}
