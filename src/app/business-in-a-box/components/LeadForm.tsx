"use client";

import { useState, FormEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const stageOptions = [
  "I have an idea but haven't started",
  "I've started but have no online presence",
  "I have a basic setup but need it done properly",
  "I'm running but need to look more professional",
];

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  idea: string;
  stage: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  email?: string;
}

export default function LeadForm() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [form, setForm] = useState<FormData>({
    name: "",
    whatsapp: "",
    email: "",
    idea: "",
    stage: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.whatsapp.trim()) errs.whatsapp = "Please enter your WhatsApp number.";
    if (!form.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    // WhatsApp deep link as fallback
    const waMessage = encodeURIComponent(
      `Hi, I'd like the Business in a Box!\n\nName: ${form.name}\nWhatsApp: ${form.whatsapp}\nEmail: ${form.email}\nBusiness idea: ${form.idea}\nStage: ${form.stage}`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

    // Fire webhook
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          whatsapp: form.whatsapp,
          email: form.email,
          idea: form.idea,
          stage: form.stage,
          source: "business-in-a-box",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Fallback: WhatsApp link ensures lead is captured
    }

    // Open WhatsApp as fallback
    window.open(waLink, "_blank", "noopener,noreferrer");

    // Fire Meta Pixel Lead event
    if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: (...args: string[]) => void }).fbq === "function") {
      (window as unknown as { fbq: (...args: string[]) => void }).fbq("track", "Lead");
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    height: "var(--input-height)" as const,
    background: "var(--bg-primary)",
    border: `1px solid ${hasError ? "#ff4444" : "var(--border)"}`,
    borderRadius: "var(--input-radius)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: "0.95rem",
    padding: "0 16px",
    outline: "none",
    transition: "border-color 0.2s ease",
  });

  const labelStyle = (isFirst: boolean) => ({
    display: "block",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginTop: isFirst ? 0 : 18,
    marginBottom: 8,
  });

  if (submitted) {
    return (
      <section
        id="order"
        className="section-spacing"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderTop: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 500,
            background:
              "radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div className="container-main" style={{ textAlign: "center", position: "relative" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            You&apos;re in.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-lg)",
              color: "var(--text-secondary)",
            }}
          >
            We will WhatsApp you within 24 hours to kick things off.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="order"
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative" }}>
        <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""}`}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                color: "var(--text-primary)",
                marginBottom: 16,
              }}
            >
              Get your Business in a Box.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-lg)",
                color: "var(--text-secondary)",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Fill this in. We WhatsApp you within 24 hours. You answer a few questions. We build everything.
            </p>
          </div>

          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            className="biab-form-card"
            style={{
              maxWidth: 480,
              margin: "0 auto",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--card-radius)",
              padding: 36,
            }}
          >
            {/* Name */}
            <label style={labelStyle(true)}>YOUR NAME</label>
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle(!!errors.name)}
              className="biab-input"
            />
            {errors.name && (
              <p style={{ color: "#ff4444", fontSize: "0.8rem", marginTop: 4 }}>
                {errors.name}
              </p>
            )}

            {/* WhatsApp */}
            <label style={labelStyle(false)}>WHATSAPP NUMBER</label>
            <input
              type="tel"
              placeholder="e.g. 082 123 4567"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              style={inputStyle(!!errors.whatsapp)}
              className="biab-input"
            />
            {errors.whatsapp && (
              <p style={{ color: "#ff4444", fontSize: "0.8rem", marginTop: 4 }}>
                {errors.whatsapp}
              </p>
            )}

            {/* Email */}
            <label style={labelStyle(false)}>EMAIL</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle(!!errors.email)}
              className="biab-input"
            />
            {errors.email && (
              <p style={{ color: "#ff4444", fontSize: "0.8rem", marginTop: 4 }}>
                {errors.email}
              </p>
            )}

            {/* Business idea */}
            <label style={labelStyle(false)}>WHAT&apos;S YOUR BUSINESS IDEA?</label>
            <input
              type="text"
              placeholder="e.g. Mobile car wash, online bakery, consulting..."
              value={form.idea}
              onChange={(e) => setForm({ ...form, idea: e.target.value })}
              style={inputStyle(false)}
              className="biab-input"
            />

            {/* Stage */}
            <label style={labelStyle(false)}>WHERE ARE YOU RIGHT NOW?</label>
            <select
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: e.target.value })}
              style={{
                ...inputStyle(false),
                appearance: "none",
                cursor: "pointer",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
                paddingRight: 40,
              }}
            >
              <option value="" disabled>
                Select an option
              </option>
              {stageOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Consent */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginTop: 24,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                style={{
                  marginTop: 3,
                  accentColor: "var(--lime)",
                  width: 18,
                  height: 18,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                I consent to Stacked Marketing contacting me via WhatsApp and email.{" "}
                <a
                  href="/privacy"
                  style={{ color: "var(--lime)", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !form.consent}
              style={{
                width: "100%",
                height: 56,
                marginTop: 24,
                background: submitting || !form.consent ? "var(--text-muted)" : "var(--lime)",
                color: "var(--text-on-accent)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "1rem",
                border: "none",
                borderRadius: "var(--radius-pill)",
                cursor: submitting || !form.consent ? "not-allowed" : "pointer",
                opacity: submitting ? 0.6 : 1,
                transition: "background 0.2s ease, opacity 0.2s ease",
              }}
            >
              {submitting ? "Sending..." : "GET MY BUSINESS IN A BOX"}
            </button>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                textAlign: "center",
                marginTop: 16,
              }}
            >
              No spam. No hard sell. We WhatsApp you within 24 hours.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .biab-input:focus {
          border-color: var(--lime) !important;
          box-shadow: 0 0 0 3px rgba(200, 255, 0, 0.15);
        }
        .biab-form-card select option {
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        @media (max-width: 767px) {
          .biab-form-card {
            padding: 28px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
