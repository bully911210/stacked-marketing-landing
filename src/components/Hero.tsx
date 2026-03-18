"use client";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("questionnaire")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-mesh min-h-screen flex items-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-brand/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-brand/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-brand/10 border border-amber-brand/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-amber-brand rounded-full animate-pulse" />
            <span className="text-amber-brand text-sm font-semibold tracking-wide uppercase">
              Limited Slots Available
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Get a Custom Website for{" "}
            <span className="text-amber-brand">R1999</span>.{" "}
            <br className="hidden sm:block" />
            Once-Off.{" "}
            <span className="text-amber-brand">You Own Everything.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
            No lock-in. No contracts. No monthly fees. Just a professional
            website built by Pretoria&apos;s own team.
          </p>

          {/* CTA */}
          <button
            onClick={scrollToForm}
            className="btn-primary bg-amber-brand hover:bg-amber-brand-dark text-dark font-extrabold text-lg px-10 py-5 rounded-xl inline-flex items-center gap-3"
          >
            BUILD MY WEBSITE
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", label: "100% Local Team" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "No Contracts" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "30 Days Support" },
            { icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", label: "Domain Included" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
            >
              <svg className="w-5 h-5 text-amber-brand flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
              </svg>
              <span className="text-sm font-medium text-gray-300">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-dark/95 backdrop-blur-sm border-t border-white/10 p-3">
        <button
          onClick={scrollToForm}
          className="btn-primary w-full bg-amber-brand hover:bg-amber-brand-dark text-dark font-extrabold text-base py-4 rounded-xl"
        >
          BUILD MY WEBSITE — R1999
        </button>
      </div>
    </section>
  );
}
