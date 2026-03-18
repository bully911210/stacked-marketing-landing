"use client";

import { useState, useEffect } from "react";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("+27");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768) return;

    let triggered = false;
    const dismissed = sessionStorage.getItem("exit_intent_dismissed");
    if (dismissed) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) {
        triggered = true;
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("exit_intent_dismissed", "true");
  };

  const handleSubmit = () => {
    if (phone.length > 4) {
      setSent(true);
      setTimeout(dismiss, 2000);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] exit-overlay flex items-center justify-center p-4" onClick={dismiss}>
      <div
        className="bg-dark-card border border-white/10 rounded-2xl p-8 max-w-md w-full animate-fade-in-up relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={dismiss} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-whatsapp/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-whatsapp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl font-bold">We&apos;ll call you shortly!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">
                <svg className="w-12 h-12 mx-auto text-amber-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-2">Wait — Want Us to Call You?</h3>
              <p className="text-gray-400">Leave your number and we&apos;ll reach out within 24 hours.</p>
            </div>

            <div className="space-y-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+27 61 234 5678"
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-brand transition-colors"
              />
              <button
                onClick={handleSubmit}
                className="btn-primary w-full bg-amber-brand hover:bg-amber-brand-dark text-dark font-extrabold py-4 rounded-xl text-lg"
              >
                Call Me Back
              </button>
            </div>

            <p className="text-center text-gray-600 text-xs mt-4">
              No spam. Just a quick chat about your website.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
