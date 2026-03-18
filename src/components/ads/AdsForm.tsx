"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";

interface FormData {
  fullName: string;
  whatsapp: string;
  email: string;
  businessName: string;
  hasWebsite: string;
  budget: string;
  package: string;
  heardFrom: string;
}

const initialForm: FormData = {
  fullName: "",
  whatsapp: "",
  email: "",
  businessName: "",
  hasWebsite: "",
  budget: "",
  package: "",
  heardFrom: "",
};

const STORAGE_KEY = "stacked-ads-form";

const labelStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "#a0a0a0",
  marginBottom: 8,
  display: "block",
};

export default function AdsForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load saved form data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormData>;
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage errors
    }
  }, [form]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(
        "https://hook.eu2.make.com/tuiu1c514j6zjx32jc4yht4h1xfyng3j",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      // Fire Meta Pixel Lead event
      const w = window as Window & typeof globalThis & { fbq?: (...args: unknown[]) => void };
      if (typeof w.fbq === "function") {
        w.fbq("track", "Lead");
      }

      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please try again or message us on WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="form" style={{ paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)" }}>
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#c8ff00",
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            We have got your details.
          </div>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 16,
              color: "#d0d0c8",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Our team will review your information and get back to you within 24
            hours. Want to speed things up?
          </p>
          <a
            href="https://wa.me/27621779799?text=Hi%2C%20I%20just%20submitted%20the%20form%20on%20your%20ads%20page."
            target="_blank"
            rel="noopener noreferrer"
            className="ads-btn-filled"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "16px 40px",
              borderRadius: 8,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            MESSAGE US ON WHATSAPP
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="form" style={{ paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 8,
            lineHeight: 1.1,
          }}
        >
          Ready to Stop Guessing and Start Growing?
        </h2>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15,
            color: "#a0a0a0",
            marginBottom: 40,
            lineHeight: 1.6,
          }}
        >
          Fill in the form below. We will come back to you within 24 hours with
          a game plan.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#161616",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "clamp(1.5rem, 2vw, 2.5rem)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
              marginBottom: 20,
            }}
          >
            {/* Full Name */}
            <div>
              <label style={labelStyle}>
                Full Name <span style={{ color: "#ff4444" }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="ads-input"
                placeholder="John Smith"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label style={labelStyle}>
                WhatsApp Number <span style={{ color: "#ff4444" }}>*</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                required
                className="ads-input"
                placeholder="062 177 9799"
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>
                Email <span style={{ color: "#ff4444" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="ads-input"
                placeholder="john@company.co.za"
              />
            </div>

            {/* Business Name */}
            <div>
              <label style={labelStyle}>
                Business Name <span style={{ color: "#ff4444" }}>*</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                required
                className="ads-input"
                placeholder="Acme Pty Ltd"
              />
            </div>

            {/* Website */}
            <div>
              <label style={labelStyle}>Do you have a website?</label>
              <select
                name="hasWebsite"
                value={form.hasWebsite}
                onChange={handleChange}
                className="ads-input"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Needs work">Yes, but it needs work</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label style={labelStyle}>Monthly ad budget</label>
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="ads-input"
              >
                <option value="">Select</option>
                <option value="R3,000 - R5,000">R3,000 - R5,000</option>
                <option value="R5,000 - R10,000">R5,000 - R10,000</option>
                <option value="R10,000 - R20,000">R10,000 - R20,000</option>
                <option value="R20,000+">R20,000+</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            {/* Package */}
            <div>
              <label style={labelStyle}>Interested in</label>
              <select
                name="package"
                value={form.package}
                onChange={handleChange}
                className="ads-input"
              >
                <option value="">Select a package</option>
                <option value="Launch (R4,999/mo)">Launch (R4,999/mo)</option>
                <option value="Convert (R7,999/mo)">Convert (R7,999/mo)</option>
                <option value="Dominate (R12,999/mo)">
                  Dominate (R12,999/mo)
                </option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            {/* Heard from */}
            <div>
              <label style={labelStyle}>How did you hear about us?</label>
              <select
                name="heardFrom"
                value={form.heardFrom}
                onChange={handleChange}
                className="ads-input"
              >
                <option value="">Select</option>
                <option value="Google">Google</option>
                <option value="Facebook/Instagram">Facebook / Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {error && (
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: "#ff4444",
                marginBottom: 16,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="ads-btn-filled"
            style={{
              width: "100%",
              fontFamily: "'Space Mono', monospace",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "1.125rem 2rem",
              borderRadius: 8,
              border: "2px solid #c8ff00",
              cursor: submitting ? "wait" : "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "SENDING..." : "GET MY GAME PLAN"}
          </button>
        </form>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: "#666666",
            textAlign: "center",
            marginTop: 24,
            letterSpacing: "0.02em",
          }}
        >
          Join 200+ Pretoria businesses that trust Stacked Marketing.
        </p>
      </div>
    </section>
  );
}
