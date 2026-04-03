"use client";

import { useState, useEffect, type FormEvent } from "react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackLead } from "@/components/main/CookieConsent";

const STORAGE_KEY = "stacked_form_data";

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  business: string;
  consent: boolean;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  email?: string;
  consent?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
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
  if (!data.consent) errors.consent = "Please consent to being contacted";
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
    consent: false,
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
  });

  useEffect(() => {
    // Capture UTM params
    const params = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
    }));

    // Load saved form data
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormData>;
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      const { consent: _c, utm_source: _a, utm_medium: _b, utm_campaign: _d, utm_content: _e, ...rest } = formData;
      void _c; void _a; void _b; void _d; void _e;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch { /* ignore */ }
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
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
      trackLead();
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="section-spacing" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-main" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: 560, marginInline: "auto", padding: 48 }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginInline: "auto", marginBottom: 24 }}>
              <circle cx="32" cy="32" r="30" stroke="var(--color-success)" strokeWidth="3" fill="rgba(0,230,118,0.1)" />
              <path d="M20 33L28 41L44 25" stroke="var(--color-success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: "checkDraw 0.5s ease-out 0.3s forwards" }} />
            </svg>
            <h2 className="text-h2" style={{ marginBottom: 16 }}>Game plan incoming.</h2>
            <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)", fontSize: "var(--text-body)", marginBottom: 32, lineHeight: 1.6 }}>
              We will WhatsApp you within 24 hours.
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">WhatsApp Us Now</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="section-spacing"
      style={{
        backgroundColor: "var(--bg-primary)",
        background: "radial-gradient(ellipse at 50% 50%, rgba(200,255,0,0.04) 0%, transparent 60%) var(--bg-primary)",
      }}
    >
      <div className="container-main">
        <div ref={ref} className={`fade-up ${isVisible ? "visible" : ""}`}>
          <h2 className="text-h2" style={{ textAlign: "center", marginBottom: 12 }}>
            Get Your Game Plan
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body-lg)",
            color: "var(--text-secondary)",
            textAlign: "center",
            marginBottom: 40,
            maxWidth: 500,
            marginInline: "auto",
          }}>
            Free. We WhatsApp you within 24 hours with a custom recommendation.
          </p>
        </div>

        {/* Trust strip */}
        <div style={{
          textAlign: "center",
          marginBottom: 32,
          maxWidth: 500,
          marginInline: "auto",
        }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            color: "var(--text-secondary)",
            fontStyle: "italic",
            lineHeight: 1.6,
            marginBottom: 8,
          }}>
            &quot;They WhatsApp&apos;d us within 4 hours with a plan that actually made sense. No hard sell, no BS.&quot;
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-caption)",
            color: "var(--text-muted)",
          }}>
            — Local business owner, Pretoria
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            maxWidth: 500,
            marginInline: "auto",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--card-radius)",
            padding: "var(--card-padding-desktop)",
          }}
        >
          {/* Row 1: Name + WhatsApp */}
          <div className="form-row-2">
            <div>
              <label className="form-label" htmlFor="name">Name *</label>
              <input id="name" type="text"
                className={`form-input ${fieldErrors.name && touched.name ? "form-input--error" : ""}`}
                placeholder="Your name" value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => handleBlur("name")} required />
              {fieldErrors.name && touched.name && <p className="form-error">{fieldErrors.name}</p>}
            </div>
            <div>
              <label className="form-label" htmlFor="whatsapp">WhatsApp *</label>
              <input id="whatsapp" type="tel"
                className={`form-input ${fieldErrors.whatsapp && touched.whatsapp ? "form-input--error" : ""}`}
                placeholder="+27 62 177 9799" value={formData.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value)}
                onBlur={() => handleBlur("whatsapp")} required />
              {fieldErrors.whatsapp && touched.whatsapp && <p className="form-error">{fieldErrors.whatsapp}</p>}
            </div>
          </div>

          {/* Row 2: Email */}
          <div style={{ marginTop: "var(--input-gap)" }}>
            <label className="form-label" htmlFor="email">Email *</label>
            <input id="email" type="email"
              className={`form-input ${fieldErrors.email && touched.email ? "form-input--error" : ""}`}
              placeholder="you@example.com" value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              onBlur={() => handleBlur("email")} required />
            {fieldErrors.email && touched.email && <p className="form-error">{fieldErrors.email}</p>}
          </div>

          {/* Row 3: Business (optional) */}
          <div style={{ marginTop: "var(--input-gap)" }}>
            <label className="form-label" htmlFor="business">Business Name</label>
            <input id="business" type="text" className="form-input"
              placeholder="Optional" value={formData.business}
              onChange={(e) => updateField("business", e.target.value)} />
          </div>

          {/* Consent */}
          <div style={{ marginTop: 20 }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={formData.consent}
                onChange={(e) => updateField("consent", e.target.checked)}
                onBlur={() => handleBlur("consent")}
                style={{ width: 16, height: 16, marginTop: 2, accentColor: "var(--lime)", flexShrink: 0 }}
                required />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                I consent to Stacked Marketing contacting me via WhatsApp and email.{" "}
                <a href="/privacy" style={{ color: "var(--lime)", textDecoration: "underline", textUnderlineOffset: 3 }}>Privacy Policy</a>
              </span>
            </label>
            {fieldErrors.consent && touched.consent && <p className="form-error" style={{ marginLeft: 26 }}>{fieldErrors.consent}</p>}
          </div>

          {error && (
            <p style={{ color: "var(--color-error)", fontSize: "0.875rem", marginTop: 16, fontFamily: "var(--font-body)" }}>
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={submitting}
            style={{ width: "100%", marginTop: 24, padding: "18px 32px", fontSize: "1rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.04em", opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Sending..." : "SEND MY GAME PLAN"}
          </button>

          <p style={{ color: "var(--text-muted)", fontSize: "var(--text-caption)", fontFamily: "var(--font-body)", textAlign: "center", marginTop: 16 }}>
            No spam. No hard sell. Just a straight answer.
          </p>
        </form>
      </div>

      <style>{`
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--input-gap);
        }
        @media (max-width: 767px) {
          .form-row-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
