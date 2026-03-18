"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What if I don't like the design?",
    a: "You get a free revision round included. We'll work with you until you're happy with the design before going live. Your satisfaction is guaranteed.",
  },
  {
    q: "Do I really own the website?",
    a: "100%. You get full admin access, your own login credentials, and the complete source code. Host it wherever you want. It's yours forever.",
  },
  {
    q: "What about hosting?",
    a: "We provide guidance on affordable hosting options and can help you set it up. Many of our clients pay as little as R50-R100/month for reliable hosting.",
  },
  {
    q: "Can I update the site myself?",
    a: "Absolutely. You get full content management access. We'll show you how to make basic updates like changing text, adding images, and updating your services.",
  },
  {
    q: "What happens after the 30 days of support?",
    a: "After your included 30 days of priority support, optional maintenance packages are available if you need ongoing help. But many clients manage just fine on their own.",
  },
  {
    q: "Is R1999 really the full price?",
    a: "Yes. R1999 once-off is the full price for everything listed above. No hidden fees, no surprise charges, no monthly payments. What you see is what you pay.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-dark relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-amber-brand/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
          Got Questions?
        </h2>
        <p className="text-gray-400 text-center text-lg mb-12">
          We&apos;ve got answers. No BS.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`reveal glass-card rounded-xl overflow-hidden transition-all duration-300 faq-active-bar ${
                open === i ? "faq-open border-amber-brand/30 shadow-lg shadow-amber-brand/5" : "hover:border-amber-brand/10"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className="font-bold text-white pr-4 group-hover:text-amber-brand transition-colors duration-300">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  open === i ? "bg-amber-brand/20 rotate-180" : "bg-white/5"
                }`}>
                  <svg
                    className="w-4 h-4 text-amber-brand transition-transform duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                className={`faq-content ${open === i ? "open" : ""}`}
                style={{ maxHeight: open === i ? "500px" : "0" }}
              >
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
