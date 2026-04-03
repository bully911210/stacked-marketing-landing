"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "stacked_cookie_consent";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";

function loadTrackingScripts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;

  // Load Meta Pixel
  if (PIXEL_ID && !w.fbq) {
    const n = function () {
      // eslint-disable-next-line prefer-rest-params
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    } as any;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [] as any[];
    w.fbq = n;
    w._fbq = n;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    w.fbq("init", PIXEL_ID);
    w.fbq("track", "PageView");
  }

  // Load GA4
  if (GA4_ID && !w.gtag) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(gaScript);

    w.dataLayer = w.dataLayer || [];
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    }
    w.gtag = gtag;
    (gtag as any)("js", new Date());
    (gtag as any)("config", GA4_ID);
  }
}

export function trackLead() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.fbq) w.fbq("track", "Lead");
  if (w.gtag) w.gtag("event", "generate_lead", { event_category: "form", event_label: "game_plan" });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted") {
      loadTrackingScripts();
      return;
    }
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    loadTrackingScripts();
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 998,
        backgroundColor: "rgba(26, 26, 26, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "16px clamp(12px, 3vw, 24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        flexWrap: "wrap",
        animation: "slideUpIn 0.4s ease-out",
      }}
    >
      <p
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: "0.8125rem",
          fontFamily: "var(--font-body)",
          lineHeight: 1.5,
          maxWidth: 600,
        }}
      >
        We use cookies (Meta Pixel, Google Analytics) to improve your experience
        and measure performance.{" "}
        <a
          href="/privacy"
          style={{
            color: "var(--lime)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          Privacy Policy
        </a>
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={accept}
          style={{
            background: "var(--lime)",
            color: "#1A1A1A",
            border: "none",
            borderRadius: 6,
            padding: "8px 20px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          style={{
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 6,
            padding: "8px 20px",
            fontSize: "0.8125rem",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
