"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { WEBHOOK_URL, WHATSAPP_LINK } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const interestOptions = [
  { value: "starter", label: "Basic Starter Website (R2,499 one-time)" },
  { value: "ads", label: "Meta Ads Accelerator (R4,999/mo)" },
  { value: "core", label: "Stacked Core (R11,999/mo)" },
];

const sourceOptions = [
  "Google",
  "Facebook",
  "WhatsApp",
  "Referral",
  "Other",
];

const STORAGE_KEY = "stacked_form_data";

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  business: string;
  interest: string;
  source: string;
}

export default function LeadForm() {
  const searchParams = useSearchParams();
  const { ref, isVisible } = useScrollReveal(0.2);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    whatsapp: "",
    email: "",
    business: "",
    interest: "",
    source: "",
  });

  // Load saved form data and pre-select interest from URL
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormData>;
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parse errors
    }

    const interestParam = searchParams.get("interest");
    if (interestParam) {
      setFormData((prev) => ({ ...prev, interest: interestParam }));
    }
  }, [searchParams]);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      setError(
        "Something went wrong. Please try again or WhatsApp us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="section-spacing">
        <div
          className="container-main"
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              maxWidth: 560,
              marginInline: "auto",
              padding: 48,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: "3rem",
                color: "#2D6A4F",
                marginBottom: 24,
              }}
            >
              &#10003;
            </p>
            <h2
              className="text-h2"
              style={{ marginBottom: 16 }}
            >
              Thank You
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                marginBottom: 32,
                lineHeight: 1.6,
              }}
            >
              We have got everything we need. A member of our team will
              WhatsApp you within 24 hours.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="section-spacing"
      style={{ backgroundColor: "#F5F4F0" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h1"
            style={{
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Let&apos;s Get You Growing – From R2,499 Framer Website or Full Stack
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 600,
            marginInline: "auto",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "clamp(28px, 5vw, 56px)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Row 1: Name + WhatsApp */}
          <div className="form-row-2">
            <div>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="whatsapp">
                WhatsApp Number
              </label>
              <input
                id="whatsapp"
                type="tel"
                className="form-input"
                placeholder="+27..."
                value={formData.whatsapp}
                onChange={(e) =>
                  updateField("whatsapp", e.target.value)
                }
                required
              />
            </div>
          </div>

          {/* Row 2: Email + Business */}
          <div className="form-row-2" style={{ marginTop: 20 }}>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="business">
                Business Name
              </label>
              <input
                id="business"
                type="text"
                className="form-input"
                placeholder="Your business"
                value={formData.business}
                onChange={(e) =>
                  updateField("business", e.target.value)
                }
              />
            </div>
          </div>

          {/* Row 3: Interest */}
          <div style={{ marginTop: 20 }}>
            <label className="form-label" htmlFor="interest">
              I&apos;m interested in...
            </label>
            <select
              id="interest"
              className="form-input"
              value={formData.interest}
              onChange={(e) => updateField("interest", e.target.value)}
              style={{ appearance: "auto" }}
            >
              <option value="">Select a plan</option>
              {interestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Row 4: Source */}
          <div style={{ marginTop: 20 }}>
            <label className="form-label" htmlFor="source">
              How did you hear about us?
            </label>
            <select
              id="source"
              className="form-input"
              value={formData.source}
              onChange={(e) => updateField("source", e.target.value)}
              style={{
                appearance: "auto",
              }}
            >
              <option value="">Select an option</option>
              {sourceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                color: "#D32F2F",
                fontSize: "0.875rem",
                marginTop: 16,
                fontFamily: "var(--font-body)",
              }}
            >
              {error}
            </p>
          )}

          {/* Trust line */}
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.8125rem",
              fontFamily: "var(--font-body)",
              textAlign: "center",
              marginTop: 24,
              marginBottom: 4,
            }}
          >
            No spam. No hard sell. Just a straight answer.
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="btn-accent"
            disabled={submitting}
            style={{
              width: "100%",
              marginTop: 12,
              padding: "20px 32px",
              fontSize: "16px",
              letterSpacing: "0.08em",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Sending..." : "Send My Game Plan"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            maxWidth: 600,
            marginInline: "auto",
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
            }}
          >
            We will WhatsApp you within 24 hours.
          </p>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              marginTop: 8,
            }}
          >
            Prefer to chat?{" "}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--lime-on-light)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              WhatsApp us directly.
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 767px) {
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
