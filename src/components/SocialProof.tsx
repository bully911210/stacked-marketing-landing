"use client";

import { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    name: "Thandi M.",
    biz: "Beauty Salon, Pretoria East",
    text: "Stacked Marketing built my salon website in days. I get 5-10 WhatsApp enquiries a week now. Best R1999 I ever spent.",
    stars: 5,
  },
  {
    name: "Johan V.",
    biz: "JV Plumbing & Electrical",
    text: "I didn't think I needed a website until I saw how professional mine looked. Clients find me on Google now instead of me chasing them.",
    stars: 5,
  },
  {
    name: "Nomsa K.",
    biz: "NK Catering Services",
    text: "They gave me full access to everything. No monthly fees, no surprises. The site looks like I paid ten times more.",
    stars: 5,
  },
];

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export default function SocialProof() {
  const counter = useCounter(200, 2000);

  return (
    <section className="py-20 sm:py-28 bg-dark-lighter relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Counter */}
        <div className="text-center mb-16 reveal" ref={counter.ref}>
          <div className="inline-flex items-center gap-3 bg-amber-brand/10 border border-amber-brand/20 rounded-2xl px-8 py-4">
            <span className="text-5xl sm:text-6xl font-black text-amber-brand">
              {counter.count}+
            </span>
            <span className="text-left text-gray-300 text-lg font-medium leading-tight">
              Pretoria businesses
              <br />
              trust us
            </span>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="reveal bg-dark-card border border-white/5 rounded-2xl p-8 relative hover:border-amber-brand/20 transition-colors"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-6 text-amber-brand/20 text-6xl font-serif leading-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <svg key={s} className="w-5 h-5 text-amber-brand" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-gray-500 text-sm">{t.biz}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating badge */}
        <div className="mt-12 text-center reveal">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-5 h-5 text-amber-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold text-white">5.0</span>
            <span>on Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
