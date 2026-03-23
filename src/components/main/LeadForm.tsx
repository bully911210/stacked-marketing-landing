"use client";

import { useState, useEffect, type FormEvent } from "react";
import { WEBHOOK_URL, WHATSAPP_LINK } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const interestOptions = [
  { value: "not-sure", label: "Not sure yet - help me choose" },
  { value: "starter", label: "Basic Starter Website (R2,499)" },
  { value: "ads", label: "Meta Ads Accelerator (R4,999/mo)" },
  { value: "core", label: "Stacked Core (R11,999/mo)" },
];

const sourceOptions = [
  "Meta Ad (Facebook/Instagram)",
  "Google Search",
  "Referral / Word of Mouth",
  "WhatsApp Forward",
  "LinkedIn",
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
  consent: boolean;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  email?: string;
  consent?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.whatsapp.trim()) {
    errors.whatsapp = "WhatsApp number is required";
  } else {
    const cleaned = data.whatsapp.replace(/[\s-]/g, "");
    if (!/^\+27\d{9}$/.test(cleaned)) {
      errors.whatsapp = "Must be a valid +27 number (e.g. +27 62 177 9799)";
    }
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.consent) {
    errors.consent = "Please consent to being contacted";
  }

  return errors;
}

export default function LeadForm() {
  const { ref, isVisible } = useScrollReveal(0.2);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    whatsapp: "",
    email: "",
    business: "",
    interest: "not-sure",
    source: "",
    consent: false,
  });

  // Load saved form data and pre-select interest from URL hash
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

    // Check URL params for interest pre-selection (without useSearchParams)
    const params = new URLSearchParams(window.location.search);
    const interestParam = params.get("interest");
    if (interestParam) {
      setFormData((prev) => ({ ...prev, interest: interestParam }));
    }
  }, []);

  // Save to localStorage on change (exclude consent)
  useEffect(() => {
    try {
      const { consent: _consent, ...rest } = formData;
      void _consent;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch {
      // Ignore storage errors
    }
  }, [formData]);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const updated = { ...formData, [field]: value };
      const errors = validateForm(updated);
      setFieldErrors((prev) => ({ ...prev, [field]: errors[field as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errors = validateForm(formData);
    setFieldErrors((prev) => ({ ...prev, [field]: errors[field as keyof FormErrors] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const errors = validateForm(formData);
    setFieldErrors(errors);
    setTouched({ name: true, whatsapp: true, email: true, consent: true });

    if (Object.keys(errors).length > 0) {
      return;
    }

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
            {/* Animated checkmark */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              style={{ marginInline: "auto", marginBottom: 24 }}
            >
              <circle cx="32" cy="32" r="30" stroke="#22C55E" strokeWidth="3" fill="#DCFCE7" />
              <path
                d="M20 33L28 41L44 25"
                stroke="#22C55E"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 40,
                  strokeDashoffset: 40,
                  animation: "checkDraw 0.5s ease-out 0.3s forwards",
                }}
              />
            </svg>
            <h2
              className="text-h2"
              style={{ marginBottom: 16 }}
            >
              Game plan incoming.
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
              We will WhatsApp you within 24 hours.
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
            Get Your Game Plan
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
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
                Name *
              </label>
              <input
                id="name"
                type="text"
                className={`form-input ${fieldErrors.name && touched.name ? "form-input--error" : ""}`}
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                required
              />
              {fieldErrors.name && touched.name && (
                <p className="form-error">{fieldErrors.name}</p>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="whatsapp">
                WhatsApp Number *
              </label>
              <input
                id="whatsapp"
                type="tel"
                className={`form-input ${fieldErrors.whatsapp && touched.whatsapp ? "form-input--error" : ""}`}
                placeholder="+27 62 177 9799"
                value={formData.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value)}
                onBlur={() => handleBlur("whatsapp")}
                required
              />
              {fieldErrors.whatsapp && touched.whatsapp && (
                <p className="form-error">{fieldErrors.whatsapp}</p>
              )}
            </div>
          </div>

          {/* Row 2: Email + Business */}
          <div className="form-row-2" style={{ marginTop: 20 }}>
            <div>
              <label className="form-label" htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                type="email"
                className={`form-input ${fieldErrors.email && touched.email ? "form-input--error" : ""}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                required
              />
              {fieldErrors.email && touched.email && (
                <p className="form-error">{fieldErrors.email}</p>
              )}
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
              style={{ appearance: "auto" }}
            >
              <option value="">Select an option</option>
              {sourceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* POPIA Consent */}
          <div style={{ marginTop: 24 }}>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => updateField("consent", e.target.checked)}
                onBlur={() => handleBlur("consent")}
                style={{
                  width: 18,
                  height: 18,
                  marginTop: 2,
                  accentColor: "var(--lime-on-light)",
                  flexShrink: 0,
                }}
                required
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                I consent to Stacked Marketing contacting me via WhatsApp and
                email regarding my enquiry. View our{" "}
                <a
                  href="/privacy"
                  style={{
                    color: "var(--lime-on-light)",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Privacy Policy
                </a>
                . *
              </span>
            </label>
            {fieldErrors.consent && touched.consent && (
              <p className="form-error" style={{ marginLeft: 28 }}>
                {fieldErrors.consent}
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                color: "var(--color-error)",
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
