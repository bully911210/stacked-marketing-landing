"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    question: "Do I need to pay for ad spend separately?",
    answer:
      "Yes. Your ad spend goes directly to Meta — you control it, you see every rand in real time. Our fee covers strategy, optimisation, creative production, and reporting.",
    defaultOpen: true,
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No contracts, no lock-in, no cancellation fees. We keep you because results keep you, not paperwork.",
    defaultOpen: true,
  },
  {
    question: 'What does "you own everything" actually mean?',
    answer:
      "Your website code, your ad accounts, your automations, your data. All of it belongs to you. If you leave, you take everything with you. No hostage situations.",
    defaultOpen: true,
  },
  {
    question: "What if I already have a website?",
    answer:
      "No problem. You can start with the Meta Ads Accelerator and we will work with your existing site. If it needs improvements for conversion, we will let you know, but there is no obligation to rebuild.",
    defaultOpen: false,
  },
  {
    question: "Do you work with businesses outside Pretoria?",
    answer:
      "Absolutely. Everything is delivered remotely. Your website, ads, and automations work regardless of your location.",
    defaultOpen: false,
  },
  {
    question: "What is the R2,000 upgrade credit?",
    answer:
      "If you start with the Basic Starter Website (R2,499) and later upgrade to Meta Ads Accelerator or Stacked Core, we apply R2,000 as a credit toward your first month. It makes starting small risk-free.",
    defaultOpen: false,
  },
];

function FAQItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <details className="faq-details" open={faq.defaultOpen || undefined}>
        <summary className="faq-summary">
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "1rem",
              color: "var(--text-primary)",
              lineHeight: 1.4,
            }}
          >
            {faq.question}
          </span>
          <span className="faq-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 8L10 13L15 8"
                stroke="var(--lime)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </summary>
        <div style={{ padding: "0 0 16px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              paddingTop: 8,
            }}
          >
            {faq.answer}
          </p>
        </div>
      </details>
    </div>
  );
}

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      id="faq"
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-tertiary)" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caption)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--lime)",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            className="text-h2"
            style={{
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Got questions? We&apos;ve got answers.
          </h2>
        </div>

        <div style={{ maxWidth: 700, marginInline: "auto" }}>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .faq-details {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
        }
        .faq-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          cursor: pointer;
          list-style: none;
        }
        .faq-summary::-webkit-details-marker {
          display: none;
        }
        .faq-summary::marker {
          display: none;
          content: "";
        }
        .faq-icon {
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .faq-details[open] .faq-icon {
          transform: rotate(180deg);
        }
        .faq-details[open] {
          border-color: var(--border-accent);
        }
        .faq-details > div {
          padding-inline: 24px;
        }
      `}</style>
    </section>
  );
}
