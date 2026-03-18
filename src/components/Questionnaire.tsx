"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WHATSAPP_POST_SUBMIT_LINK, WEBHOOK_URL } from "@/lib/constants";

const STORAGE_KEY = "stacked_marketing_form";

const INDUSTRIES = [
  "Restaurant / Food",
  "Beauty / Salon",
  "Construction / Trade",
  "Real Estate",
  "Health / Fitness",
  "Retail / Shop",
  "Professional Services (Legal / Accounting)",
  "Automotive",
  "Education / Training",
  "Photography / Creative",
  "Church / Non-Profit",
  "Other",
];

const HEAR_ABOUT_OPTIONS = ["Facebook", "Instagram", "Google", "Referral", "Other"];

const CTA_ACTIONS = [
  "Call me",
  "WhatsApp me",
  "Fill in a form",
  "Visit my shop",
  "Book an appointment",
  "Buy online",
];

const VIBES = [
  { id: "minimal", label: "Clean & Minimal", desc: "White space, modern", colors: ["#FFFFFF", "#F8F8F8", "#333333"] },
  { id: "bold", label: "Bold & Energetic", desc: "Bright, punchy", colors: ["#FF4D4D", "#FFD700", "#1A1A1A"] },
  { id: "dark", label: "Dark & Premium", desc: "Dark bg, luxury feel", colors: ["#1A1A1A", "#C9A84C", "#F5F5F5"] },
  { id: "warm", label: "Warm & Friendly", desc: "Earth tones, approachable", colors: ["#D4A373", "#CCD5AE", "#FEFAE0"] },
  { id: "corporate", label: "Corporate & Professional", desc: "Structured, trustworthy", colors: ["#1B4965", "#CAE9FF", "#FFFFFF"] },
  { id: "creative", label: "Creative & Colorful", desc: "Artistic, playful", colors: ["#9B5DE5", "#F15BB5", "#00F5D4"] },
];

interface FormData {
  // Step 1
  fullName: string;
  whatsapp: string;
  email: string;
  heardFrom: string;
  // Step 2
  businessName: string;
  businessDescription: string;
  industry: string;
  industryOther: string;
  location: string;
  // Step 3
  services: string;
  tagline: string;
  ctaActions: string[];
  businessPhone: string;
  physicalAddress: string;
  // Step 4
  hasLogo: string;
  vibe: string;
  brandColors: string;
  referenceWebsites: string;
  // Step 5
  hasPhotos: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTiktok: string;
  hasExistingWebsite: string;
  existingWebsiteUrl: string;
  anythingElse: string;
  timeline: string;
}

const defaultFormData: FormData = {
  fullName: "",
  whatsapp: "+27",
  email: "",
  heardFrom: "",
  businessName: "",
  businessDescription: "",
  industry: "",
  industryOther: "",
  location: "",
  services: "",
  tagline: "",
  ctaActions: [],
  businessPhone: "+27",
  physicalAddress: "",
  hasLogo: "",
  vibe: "",
  brandColors: "",
  referenceWebsites: "",
  hasPhotos: "",
  socialFacebook: "",
  socialInstagram: "",
  socialTiktok: "",
  hasExistingWebsite: "",
  existingWebsiteUrl: "",
  anythingElse: "",
  timeline: "",
};

export default function Questionnaire() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const toggleCtaAction = useCallback((action: string) => {
    setFormData((prev) => {
      const actions = prev.ctaActions.includes(action)
        ? prev.ctaActions.filter((a) => a !== action)
        : [...prev.ctaActions, action];
      return { ...prev, ctaActions: actions };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next["ctaActions"];
      return next;
    });
  }, []);

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};

    if (s === 1) {
      if (!formData.fullName.trim()) errs.fullName = "Name is required";
      if (!formData.whatsapp.trim() || formData.whatsapp === "+27") errs.whatsapp = "WhatsApp number is required";
      if (!formData.email.trim()) errs.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email address";
    }
    if (s === 2) {
      if (!formData.businessName.trim()) errs.businessName = "Business name is required";
      if (!formData.businessDescription.trim()) errs.businessDescription = "Please describe your business";
      if (!formData.industry) errs.industry = "Please select an industry";
      if (formData.industry === "Other" && !formData.industryOther.trim()) errs.industryOther = "Please specify your industry";
      if (!formData.location.trim()) errs.location = "Location is required";
    }
    if (s === 3) {
      if (!formData.services.trim()) errs.services = "Please list your services";
      if (formData.ctaActions.length === 0) errs.ctaActions = "Select at least one action";
      if (!formData.businessPhone.trim() || formData.businessPhone === "+27") errs.businessPhone = "Phone number is required";
    }
    if (s === 4) {
      if (!formData.hasLogo) errs.hasLogo = "Please select an option";
      if (!formData.vibe) errs.vibe = "Please pick a vibe";
    }
    if (s === 5) {
      if (!formData.hasPhotos) errs.hasPhotos = "Please select an option";
      if (!formData.timeline) errs.timeline = "Please select a timeline";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    setDirection("left");
    setStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setDirection("right");
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    setSubmitting(true);

    // Encode logo file to base64 if present
    let logoBase64 = "";
    let logoFileName = "";
    if (logoFile) {
      logoFileName = logoFile.name;
      try {
        const buffer = await logoFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = "";
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        logoBase64 = btoa(binary);
      } catch {
        // logo encoding failed, continue without it
      }
    }

    // Send to webhook
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          industry: formData.industry === "Other" ? formData.industryOther : formData.industry,
          logoFileName,
          logoBase64,
        }),
      });
    } catch {
      // Continue to success even if webhook fails — lead is saved in localStorage
    }

    // Fire confetti
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#F5A623", "#FFD700", "#FFFFFF", "#25D366"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5, x: 0.3 },
          colors: ["#F5A623", "#FFD700"],
        });
      }, 300);
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5, x: 0.7 },
          colors: ["#F5A623", "#FFD700"],
        });
      }, 500);
    } catch {
      // confetti is optional
    }

    localStorage.removeItem(STORAGE_KEY);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="questionnaire" className="py-20 sm:py-28 bg-dark-lighter relative">
        <div className="max-w-lg mx-auto px-4 text-center animate-fade-in-up">
          {/* Checkmark */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-whatsapp/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-whatsapp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            We&apos;ve Got Everything We Need!
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            A member of our team will WhatsApp you within 24 hours with a mockup
            preview of your website. No payment required until you&apos;re happy.
          </p>

          <a
            href={WHATSAPP_POST_SUBMIT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-lg px-8 py-4 rounded-xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us If You Have Questions
          </a>
        </div>
      </section>
    );
  }

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const inputClass = (field: string) =>
    `w-full bg-dark border ${
      errors[field] ? "border-red-500" : "border-white/10"
    } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-brand transition-colors`;

  const labelClass = "block text-sm font-semibold text-gray-300 mb-2";

  return (
    <section id="questionnaire" className="py-20 sm:py-28 bg-dark-lighter relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Let&apos;s Build <span className="text-amber-brand">Your Website</span>
          </h2>
          <p className="text-gray-400">
            Takes about 3 minutes. We&apos;ll use this to create your mockup.
          </p>
          {/* Social proof near form */}
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-whatsapp" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Join 200+ Pretoria businesses who trust us
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-dark rounded-full overflow-hidden">
            <div
              className="progress-bar h-full bg-gradient-to-r from-amber-brand to-amber-brand-dark rounded-full"
              style={{ width: `${Math.max(progress, 5)}%` }}
            />
          </div>
        </div>

        {/* Form card */}
        <div className="bg-dark-card border border-white/5 rounded-2xl p-6 sm:p-8">
          {/* Step 1: Contact Details */}
          {step === 1 && (
            <div className={direction === "left" ? "slide-left" : "slide-right"}>
              <h3 className="text-xl font-bold mb-6">Contact Details</h3>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    className={inputClass("fullName")}
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className={labelClass}>WhatsApp Number *</label>
                  <input
                    type="tel"
                    className={inputClass("whatsapp")}
                    placeholder="+27 61 234 5678"
                    value={formData.whatsapp}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                  />
                  {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    className={inputClass("email")}
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass}>Where did you hear about us?</label>
                  <select
                    className={inputClass("heardFrom")}
                    value={formData.heardFrom}
                    onChange={(e) => updateField("heardFrom", e.target.value)}
                  >
                    <option value="">Select an option</option>
                    {HEAR_ABOUT_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={nextStep} className="btn-primary w-full mt-8 bg-amber-brand hover:bg-amber-brand-dark text-dark font-extrabold py-4 rounded-xl text-lg">
                Next — Tell Us About Your Business
              </button>
            </div>
          )}

          {/* Step 2: Business Foundation */}
          {step === 2 && (
            <div className={direction === "left" ? "slide-left" : "slide-right"}>
              <h3 className="text-xl font-bold mb-6">Your Business</h3>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Business Name *</label>
                  <input
                    type="text"
                    className={inputClass("businessName")}
                    placeholder="Exact name as it should appear on your website"
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                  />
                  {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
                </div>
                <div>
                  <label className={labelClass}>What does your business do? *</label>
                  <textarea
                    className={inputClass("businessDescription")}
                    placeholder="Describe your business in 1-2 sentences — this will be used on your homepage"
                    rows={3}
                    maxLength={200}
                    value={formData.businessDescription}
                    onChange={(e) => updateField("businessDescription", e.target.value)}
                  />
                  <p className="text-gray-600 text-xs mt-1">{formData.businessDescription.length}/200</p>
                  {errors.businessDescription && <p className="text-red-500 text-sm mt-1">{errors.businessDescription}</p>}
                </div>
                <div>
                  <label className={labelClass}>Industry / Niche *</label>
                  <select
                    className={inputClass("industry")}
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                  >
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                  {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                  {formData.industry === "Other" && (
                    <div className="mt-3">
                      <input
                        type="text"
                        className={inputClass("industryOther")}
                        placeholder="Specify your industry"
                        value={formData.industryOther}
                        onChange={(e) => updateField("industryOther", e.target.value)}
                      />
                      {errors.industryOther && <p className="text-red-500 text-sm mt-1">{errors.industryOther}</p>}
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Business Location (City/Area) *</label>
                  <input
                    type="text"
                    className={inputClass("location")}
                    placeholder="e.g. Pretoria East, Centurion"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={prevStep} className="px-6 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors font-semibold">
                  Back
                </button>
                <button onClick={nextStep} className="btn-primary flex-1 bg-amber-brand hover:bg-amber-brand-dark text-dark font-extrabold py-4 rounded-xl text-lg">
                  Next — Your Services & Style
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Services & Content */}
          {step === 3 && (
            <div className={direction === "left" ? "slide-left" : "slide-right"}>
              <h3 className="text-xl font-bold mb-6">Services & Content</h3>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>List your main services or products *</label>
                  <textarea
                    className={inputClass("services")}
                    placeholder={"List 3-6 services/products, one per line:\nHaircuts\nColour & Highlights\nBridal Packages\nNail Services"}
                    rows={5}
                    value={formData.services}
                    onChange={(e) => updateField("services", e.target.value)}
                  />
                  {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
                </div>
                <div>
                  <label className={labelClass}>Business slogan or tagline?</label>
                  <input
                    type="text"
                    className={inputClass("tagline")}
                    placeholder="e.g. 'Where beauty meets confidence'"
                    value={formData.tagline}
                    onChange={(e) => updateField("tagline", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>What action should visitors take? *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CTA_ACTIONS.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => toggleCtaAction(action)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all text-left ${
                          formData.ctaActions.includes(action)
                            ? "border-amber-brand bg-amber-brand/10 text-amber-brand"
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                            formData.ctaActions.includes(action)
                              ? "bg-amber-brand border-amber-brand"
                              : "border-gray-600"
                          }`}>
                            {formData.ctaActions.includes(action) && (
                              <svg className="w-3 h-3 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          {action}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.ctaActions && <p className="text-red-500 text-sm mt-1">{errors.ctaActions}</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone number for the website *</label>
                  <input
                    type="tel"
                    className={inputClass("businessPhone")}
                    placeholder="+27 12 345 6789"
                    value={formData.businessPhone}
                    onChange={(e) => updateField("businessPhone", e.target.value)}
                  />
                  {errors.businessPhone && <p className="text-red-500 text-sm mt-1">{errors.businessPhone}</p>}
                </div>
                <div>
                  <label className={labelClass}>Physical address (if applicable)</label>
                  <textarea
                    className={inputClass("physicalAddress")}
                    placeholder="Your business address for the contact page"
                    rows={2}
                    value={formData.physicalAddress}
                    onChange={(e) => updateField("physicalAddress", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={prevStep} className="px-6 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors font-semibold">
                  Back
                </button>
                <button onClick={nextStep} className="btn-primary flex-1 bg-amber-brand hover:bg-amber-brand-dark text-dark font-extrabold py-4 rounded-xl text-lg">
                  Next — Your Look & Feel
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Brand & Visual */}
          {step === 4 && (
            <div className={direction === "left" ? "slide-left" : "slide-right"}>
              <h3 className="text-xl font-bold mb-6">Brand & Visual Direction</h3>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Do you have a logo? *</label>
                  <div className="flex gap-3">
                    {["Yes", "No", "I need one"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField("hasLogo", opt)}
                        className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.hasLogo === opt
                            ? "border-amber-brand bg-amber-brand/10 text-amber-brand"
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.hasLogo && <p className="text-red-500 text-sm mt-1">{errors.hasLogo}</p>}
                  {formData.hasLogo === "Yes" && (
                    <div className="mt-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setLogoFile(file);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full p-4 rounded-lg border-2 border-dashed border-white/10 text-gray-400 hover:border-amber-brand/30 hover:text-amber-brand transition-colors text-sm"
                      >
                        {logoFile ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 text-whatsapp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {logoFile.name}
                          </span>
                        ) : (
                          <>Click to upload your logo (PNG, JPG, SVG, PDF — max 10MB)</>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Pick your vibe *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {VIBES.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => updateField("vibe", v.id)}
                        className={`vibe-card p-4 rounded-xl border text-left ${
                          formData.vibe === v.id ? "selected border-amber-brand" : "border-white/10"
                        }`}
                      >
                        <div className="flex gap-1 mb-3">
                          {v.colors.map((c, ci) => (
                            <div
                              key={ci}
                              className="w-6 h-6 rounded-full border border-white/10"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                        <p className="font-bold text-white text-sm">{v.label}</p>
                        <p className="text-gray-500 text-xs">{v.desc}</p>
                      </button>
                    ))}
                  </div>
                  {errors.vibe && <p className="text-red-500 text-sm mt-1">{errors.vibe}</p>}
                </div>

                <div>
                  <label className={labelClass}>Brand colors (if you have them)</label>
                  <input
                    type="text"
                    className={inputClass("brandColors")}
                    placeholder="e.g. navy blue and gold, or #1B4965 and #C9A84C"
                    value={formData.brandColors}
                    onChange={(e) => updateField("brandColors", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Websites you like the look of (up to 3)</label>
                  <textarea
                    className={inputClass("referenceWebsites")}
                    placeholder={"Paste links to websites whose style you admire:\nhttps://example1.com\nhttps://example2.com"}
                    rows={3}
                    value={formData.referenceWebsites}
                    onChange={(e) => updateField("referenceWebsites", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={prevStep} className="px-6 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors font-semibold">
                  Back
                </button>
                <button onClick={nextStep} className="btn-primary flex-1 bg-amber-brand hover:bg-amber-brand-dark text-dark font-extrabold py-4 rounded-xl text-lg">
                  Next — Final Details
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Assets & Launch */}
          {step === 5 && (
            <div className={direction === "left" ? "slide-left" : "slide-right"}>
              <h3 className="text-xl font-bold mb-6">Final Details</h3>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Do you have photos of your business/products? *</label>
                  <div className="flex gap-3">
                    {["Yes, I'll send them", "No, use stock photos", "Some of both"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField("hasPhotos", opt)}
                        className={`flex-1 p-3 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                          formData.hasPhotos === opt
                            ? "border-amber-brand bg-amber-brand/10 text-amber-brand"
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.hasPhotos && <p className="text-red-500 text-sm mt-1">{errors.hasPhotos}</p>}
                </div>

                <div>
                  <label className={labelClass}>Social media links</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      className={inputClass("socialFacebook")}
                      placeholder="Facebook URL"
                      value={formData.socialFacebook}
                      onChange={(e) => updateField("socialFacebook", e.target.value)}
                    />
                    <input
                      type="text"
                      className={inputClass("socialInstagram")}
                      placeholder="Instagram URL"
                      value={formData.socialInstagram}
                      onChange={(e) => updateField("socialInstagram", e.target.value)}
                    />
                    <input
                      type="text"
                      className={inputClass("socialTiktok")}
                      placeholder="TikTok URL"
                      value={formData.socialTiktok}
                      onChange={(e) => updateField("socialTiktok", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Do you have an existing website?</label>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField("hasExistingWebsite", opt)}
                        className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.hasExistingWebsite === opt
                            ? "border-amber-brand bg-amber-brand/10 text-amber-brand"
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {formData.hasExistingWebsite === "Yes" && (
                    <input
                      type="url"
                      className={`${inputClass("existingWebsiteUrl")} mt-3`}
                      placeholder="https://your-current-site.com"
                      value={formData.existingWebsiteUrl}
                      onChange={(e) => updateField("existingWebsiteUrl", e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <label className={labelClass}>Anything else we should know?</label>
                  <textarea
                    className={inputClass("anythingElse")}
                    placeholder="Special requests, extra pages you need, anything at all..."
                    rows={3}
                    value={formData.anythingElse}
                    onChange={(e) => updateField("anythingElse", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>How soon do you need this? *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["ASAP (this week)", "Within 2 weeks", "Within a month", "Just exploring"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField("timeline", opt)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.timeline === opt
                            ? "border-amber-brand bg-amber-brand/10 text-amber-brand"
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={prevStep} className="px-6 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors font-semibold">
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary flex-1 bg-amber-brand hover:bg-amber-brand-dark text-dark font-extrabold py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "SUBMIT — LET'S BUILD YOUR WEBSITE"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
