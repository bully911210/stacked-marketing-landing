"use client";

import {
  useState,
  useEffect,
  useContext,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { ServicesTierContext } from "@/app/services/ServicesTierContext";

interface FormData {
  fullName: string;
  whatsapp: string;
  email: string;
  tier: string;
  businessName: string;
  industry: string;
  location: string;
  hasWebsite: string;
  businessDescription: string;
  servicesList: string;
  preferredStyle: string;
  adBudget: string;
  targetAudience: string;
  businessGoals: string;
  hasEmailList: string;
  salesProcess: string;
  timeline: string;
  heardFrom: string;
  anythingElse: string;
}

const initialForm: FormData = {
  fullName: "",
  whatsapp: "+27",
  email: "",
  tier: "",
  businessName: "",
  industry: "",
  location: "",
  hasWebsite: "",
  businessDescription: "",
  servicesList: "",
  preferredStyle: "",
  adBudget: "",
  targetAudience: "",
  businessGoals: "",
  hasEmailList: "",
  salesProcess: "",
  timeline: "",
  heardFrom: "",
  anythingElse: "",
};

const STORAGE_KEY = "stacked_services_form";

const industries = [
  "Accounting",
  "Agriculture",
  "Automotive",
  "Construction",
  "Education",
  "Financial Services",
  "Healthcare",
  "Hospitality",
  "Insurance",
  "Legal",
  "Real Estate",
  "Retail",
  "Other",
];

const labelStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#a0a0a0",
  marginBottom: 8,
  display: "block",
};

const required = <span style={{ color: "#ff4444" }}>*</span>;

export default function ServicesLeadForm() {
  const { selectedTier, formRef } = useContext(ServicesTierContext);
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Sync tier from context
  useEffect(() => {
    if (selectedTier) {
      const tierMap: Record<string, string> = {
        starter: "Starter R1,999",
        growth: "Growth from R4,999/mo",
        fullstack: "Full Stack R11,999/mo",
      };
      setForm((prev) => ({
        ...prev,
        tier: tierMap[selectedTier] || prev.tier,
      }));
    }
  }, [selectedTier]);

  // Load saved form data
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

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage errors
    }
  }, [form]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadio = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const currentTierKey = (): string => {
    if (form.tier.toLowerCase().includes("starter")) return "starter";
    if (form.tier.toLowerCase().includes("growth")) return "growth";
    if (form.tier.toLowerCase().includes("full stack")) return "fullstack";
    return "";
  };

  const canProceed = (s: number): boolean => {
    if (s === 1) {
      return !!(form.fullName && form.whatsapp && form.email && form.tier);
    }
    if (s === 2) {
      return !!form.businessName;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(
        "https://hook.eu2.make.com/rw71138jxaqdksi2i1ganhueiczxnx6g",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            source: "services-page",
            submittedAt: new Date().toISOString(),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      // Fire Meta Pixel Lead event
      const w = window as Window &
        typeof globalThis & {
          fbq?: (...args: unknown[]) => void;
        };
      if (typeof w.fbq === "function") {
        w.fbq("track", "Lead", {
          content_name: form.tier,
          content_category: "services",
        });
      }

      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);

      // Confetti
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#c8ff00", "#f5f5f0", "#0a0a0a"],
        });
      } catch {
        // Confetti is optional
      }
    } catch {
      setError(
        "Something went wrong. Please try again or message us on WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = (step / 4) * 100;

  if (submitted) {
    const tierKey = currentTierKey();
    const messages: Record<string, string> = {
      starter:
        "Your website brief is on its way to our team. We will WhatsApp you within 24 hours with a plan.",
      growth:
        "Your ads campaign brief is on its way. We will WhatsApp you within 24 hours with a custom strategy.",
      fullstack:
        "Your Full Stack brief is on its way. Website, ads, and email automation. We will WhatsApp you within 24 hours with your complete game plan.",
    };
    const msg =
      messages[tierKey] ||
      "We have got your details. We will WhatsApp you within 24 hours with a custom game plan.";

    return (
      <section
        id="lead-form"
        ref={formRef}
        style={{
          paddingBlock: "clamp(4rem, 3rem + 5vw, 8rem)",
          paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
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
            You are in.
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
            {msg}
          </p>
          <a
            href="https://wa.me/27621779799?text=Hi%2C%20I%20just%20submitted%20the%20form%20on%20your%20services%20page."
            target="_blank"
            rel="noopener noreferrer"
            className="svc-btn-filled"
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
              border: "2px solid #c8ff00",
            }}
          >
            MESSAGE US ON WHATSAPP
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      id="lead-form"
      ref={formRef}
      style={{
        paddingBlock: "clamp(4rem, 3rem + 5vw, 8rem)",
        paddingInline: "clamp(1.25rem, 1rem + 1.25vw, 2.5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f5f5f0",
            marginBottom: 8,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Let&apos;s Get You Growing.
        </h2>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15,
            color: "#a0a0a0",
            textAlign: "center",
            marginBottom: 40,
            lineHeight: 1.6,
          }}
        >
          Fill in the form. We will WhatsApp you within 24 hours with a custom
          game plan.
        </p>

        {/* Progress bar */}
        <div
          style={{
            background: "#161616",
            borderRadius: 4,
            height: 6,
            marginBottom: 32,
            overflow: "hidden",
          }}
        >
          <div
            className="svc-progress-fill"
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: "#c8ff00",
              borderRadius: 4,
            }}
          />
        </div>

        {/* Step indicator */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#666666",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Step {step} of 4
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "clamp(1.5rem, 2vw, 2.5rem)",
            }}
          >
            {/* STEP 1: Contact */}
            {step === 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div>
                  <label style={labelStyle}>Full Name {required}</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="svc-input"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label style={labelStyle}>WhatsApp Number {required}</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    required
                    className="svc-input"
                    placeholder="+27 62 177 9799"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email {required}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="svc-input"
                    placeholder="john@company.co.za"
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    What are you interested in? {required}
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {[
                      "Starter R1,999",
                      "Growth from R4,999/mo",
                      "Full Stack R11,999/mo",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleRadio("tier", option)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 16px",
                          background:
                            form.tier === option
                              ? "rgba(200, 255, 0, 0.06)"
                              : "#111111",
                          border:
                            form.tier === option
                              ? "1px solid #c8ff00"
                              : "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 8,
                          cursor: "pointer",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border:
                              form.tier === option
                                ? "2px solid #c8ff00"
                                : "2px solid rgba(255,255,255,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {form.tier === option && (
                            <div
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#c8ff00",
                              }}
                            />
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 14,
                            color: "#f5f5f0",
                          }}
                        >
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Business */}
            {step === 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div>
                  <label style={labelStyle}>Business Name {required}</label>
                  <input
                    type="text"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    required
                    className="svc-input"
                    placeholder="Acme Pty Ltd"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Industry</label>
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="svc-input"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="svc-input"
                    placeholder="Pretoria, Gauteng"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Do you have a website?</label>
                  <select
                    name="hasWebsite"
                    value={form.hasWebsite}
                    onChange={handleChange}
                    className="svc-input"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Needs work">Yes, but it needs work</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: Conditional */}
            {step === 3 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* STARTER fields */}
                {currentTierKey() === "starter" && (
                  <>
                    <div>
                      <label style={labelStyle}>
                        Describe your business briefly
                      </label>
                      <textarea
                        name="businessDescription"
                        value={form.businessDescription}
                        onChange={handleChange}
                        className="svc-input"
                        rows={3}
                        placeholder="What does your business do? Who do you serve?"
                        style={{ resize: "vertical", minHeight: 80 }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        List your main services or products
                      </label>
                      <textarea
                        name="servicesList"
                        value={form.servicesList}
                        onChange={handleChange}
                        className="svc-input"
                        rows={3}
                        placeholder="Service 1, Service 2, Service 3..."
                        style={{ resize: "vertical", minHeight: 80 }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Preferred style</label>
                      <select
                        name="preferredStyle"
                        value={form.preferredStyle}
                        onChange={handleChange}
                        className="svc-input"
                      >
                        <option value="">Select a style</option>
                        {[
                          "Clean",
                          "Bold",
                          "Dark",
                          "Warm",
                          "Corporate",
                          "Creative",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* GROWTH fields */}
                {currentTierKey() === "growth" && (
                  <>
                    <div>
                      <label style={labelStyle}>Monthly ad budget range</label>
                      <select
                        name="adBudget"
                        value={form.adBudget}
                        onChange={handleChange}
                        className="svc-input"
                      >
                        <option value="">Select</option>
                        <option value="Under R3,000">Under R3,000</option>
                        <option value="R3,000 - R5,000">
                          R3,000 to R5,000
                        </option>
                        <option value="R5,000 - R10,000">
                          R5,000 to R10,000
                        </option>
                        <option value="R10,000+">R10,000+</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Describe your target audience
                      </label>
                      <textarea
                        name="targetAudience"
                        value={form.targetAudience}
                        onChange={handleChange}
                        className="svc-input"
                        rows={3}
                        placeholder="Who are your ideal customers? Age, location, interests..."
                        style={{ resize: "vertical", minHeight: 80 }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        What are your business goals?
                      </label>
                      <textarea
                        name="businessGoals"
                        value={form.businessGoals}
                        onChange={handleChange}
                        className="svc-input"
                        rows={3}
                        placeholder="More leads, more sales, brand awareness..."
                        style={{ resize: "vertical", minHeight: 80 }}
                      />
                    </div>
                  </>
                )}

                {/* FULL STACK fields */}
                {currentTierKey() === "fullstack" && (
                  <>
                    <div>
                      <label style={labelStyle}>Monthly ad budget range</label>
                      <select
                        name="adBudget"
                        value={form.adBudget}
                        onChange={handleChange}
                        className="svc-input"
                      >
                        <option value="">Select</option>
                        <option value="Under R3,000">Under R3,000</option>
                        <option value="R3,000 - R5,000">
                          R3,000 to R5,000
                        </option>
                        <option value="R5,000 - R10,000">
                          R5,000 to R10,000
                        </option>
                        <option value="R10,000+">R10,000+</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Describe your target audience
                      </label>
                      <textarea
                        name="targetAudience"
                        value={form.targetAudience}
                        onChange={handleChange}
                        className="svc-input"
                        rows={3}
                        placeholder="Who are your ideal customers?"
                        style={{ resize: "vertical", minHeight: 80 }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        What are your business goals?
                      </label>
                      <textarea
                        name="businessGoals"
                        value={form.businessGoals}
                        onChange={handleChange}
                        className="svc-input"
                        rows={3}
                        placeholder="More leads, more sales, brand awareness..."
                        style={{ resize: "vertical", minHeight: 80 }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Do you have an existing email list?
                      </label>
                      <select
                        name="hasEmailList"
                        value={form.hasEmailList}
                        onChange={handleChange}
                        className="svc-input"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Describe your sales process briefly
                      </label>
                      <textarea
                        name="salesProcess"
                        value={form.salesProcess}
                        onChange={handleChange}
                        className="svc-input"
                        rows={3}
                        placeholder="How do leads currently become customers?"
                        style={{ resize: "vertical", minHeight: 80 }}
                      />
                    </div>
                  </>
                )}

                {/* No tier selected */}
                {!currentTierKey() && (
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 15,
                      color: "#a0a0a0",
                      textAlign: "center",
                      padding: 24,
                    }}
                  >
                    Please go back to Step 1 and select a package to see
                    relevant questions.
                  </p>
                )}
              </div>
            )}

            {/* STEP 4: Final */}
            {step === 4 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <div>
                  <label style={labelStyle}>How soon do you need this?</label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {[
                      "ASAP",
                      "Within 2 weeks",
                      "Within a month",
                      "Just exploring",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleRadio("timeline", option)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 16px",
                          background:
                            form.timeline === option
                              ? "rgba(200, 255, 0, 0.06)"
                              : "#111111",
                          border:
                            form.timeline === option
                              ? "1px solid #c8ff00"
                              : "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 8,
                          cursor: "pointer",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border:
                              form.timeline === option
                                ? "2px solid #c8ff00"
                                : "2px solid rgba(255,255,255,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {form.timeline === option && (
                            <div
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: "#c8ff00",
                              }}
                            />
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 14,
                            color: "#f5f5f0",
                          }}
                        >
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>
                    How did you hear about us?
                  </label>
                  <select
                    name="heardFrom"
                    value={form.heardFrom}
                    onChange={handleChange}
                    className="svc-input"
                  >
                    <option value="">Select</option>
                    <option value="Google">Google</option>
                    <option value="Facebook/Instagram">
                      Facebook / Instagram
                    </option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Anything else?</label>
                  <textarea
                    name="anythingElse"
                    value={form.anythingElse}
                    onChange={handleChange}
                    className="svc-input"
                    rows={3}
                    placeholder="Tell us anything else that might help us prepare your game plan."
                    style={{ resize: "vertical", minHeight: 80 }}
                  />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: "#ff4444",
                  marginTop: 16,
                }}
              >
                {error}
              </p>
            )}

            {/* Navigation buttons */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
              }}
            >
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="svc-btn-ghost"
                  style={{
                    flex: 1,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    background: "transparent",
                    color: "#f5f5f0",
                    padding: "14px 24px",
                    borderRadius: 8,
                    border: "2px solid rgba(255,255,255,0.15)",
                    cursor: "pointer",
                  }}
                >
                  BACK
                </button>
              )}
              {step < 4 && (
                <button
                  type="button"
                  onClick={() => {
                    if (canProceed(step)) {
                      setStep(step + 1);
                    }
                  }}
                  className="svc-btn-filled"
                  style={{
                    flex: 1,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    background: canProceed(step) ? "#c8ff00" : "#333333",
                    color: canProceed(step) ? "#0a0a0a" : "#666666",
                    padding: "14px 24px",
                    borderRadius: 8,
                    border: canProceed(step)
                      ? "2px solid #c8ff00"
                      : "2px solid #333333",
                    cursor: canProceed(step) ? "pointer" : "not-allowed",
                  }}
                >
                  NEXT
                </button>
              )}
              {step === 4 && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="svc-btn-filled"
                  style={{
                    flex: 1,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    background: "#c8ff00",
                    color: "#0a0a0a",
                    padding: "16px 24px",
                    borderRadius: 8,
                    border: "2px solid #c8ff00",
                    cursor: submitting ? "wait" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? "SENDING..." : "GET MY GAME PLAN"}
                </button>
              )}
            </div>
          </div>
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
