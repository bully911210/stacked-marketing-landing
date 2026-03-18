"use client";

const steps = [
  {
    num: "01",
    title: "Fill In the Form Below",
    desc: "Tell us about your business. Takes 3 minutes.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "We Build Your Mockup",
    desc: "You'll see a preview before we go live.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Your Site Goes Live",
    desc: "Full admin login sent to you. Done.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-dark relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-brand/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            How It Works — <span className="gradient-text-animate">3 Simple Steps</span>
          </h2>
          <p className="text-gray-400 text-lg">
            From form to live website. No complicated process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Animated connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 animated-line rounded-full">
            {/* Floating dots on the line */}
            <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-brand shadow-lg shadow-amber-brand/60" style={{ left: '25%', animation: 'dot-float-1 5s ease-in-out infinite' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-brand/80 shadow-md shadow-amber-brand/40" style={{ left: '60%', animation: 'dot-float-2 6s ease-in-out infinite 1.5s' }} />
          </div>

          {steps.map((step, i) => (
            <div key={i} className="reveal relative text-center">
              {/* Step circle with premium gradient border */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-brand/20 to-amber-brand/5" />
                {/* Premium border circle */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-brand/30 via-transparent to-amber-brand/10 p-[2px]">
                  <div className="w-full h-full bg-dark-card rounded-full flex items-center justify-center">
                    <div className="text-amber-brand icon-glow">{step.icon}</div>
                  </div>
                </div>
                {/* Step number badge with pulse */}
                <div className="step-badge absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-brand to-amber-brand-dark rounded-full flex items-center justify-center shadow-lg shadow-amber-brand/30">
                  <span className="text-dark font-black text-sm">{step.num}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
