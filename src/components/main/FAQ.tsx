"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    question: "Do I need to pay for ad spend separately?",
    answer:
      "Yes. Our management fee covers strategy, optimisation, creative production, and reporting. Your ad spend goes directly to Meta. You control the budget and can see every rand spent in real time.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "No problem. You can start with the Meta Ads Accelerator and we will work with your existing site. If it needs improvements for conversion, we will let you know, but there is no obligation to rebuild.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No contracts, no lock-in. We keep you because results keep you, not paperwork.",
  },
  {
    question: "Do you work with businesses outside Pretoria?",
    answer:
      "Absolutely. Everything is delivered remotely. Your website, ads, and automations work regardless of your location.",
  },
  {
    question: 'What does "you own everything" actually mean?',
    answer:
      "Your website code, your ad accounts, your automations, your data. All of it belongs to you. If you leave, you take everything with you. No hostage situations.",
  },
  {
    question: "What is the R2,000 upgrade credit?",
    answer:
      "If you start with the Basic Starter Website (R2,499) and later upgrade to Meta Ads Accelerator or Stacked Core, we apply R2,000 as a credit toward your first month. It makes starting small risk-free.",
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
      <details className="faq-details">
        <summary
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            padding: "20px 0",
            borderBottom: "1px solid var(--border)",
            cursor: "pointer",
            listStyle: "none",
          }}
        >
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
          <span
            className="faq-icon"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.25rem",
              color: "var(--text-muted)",
              flexShrink: 0,
              transition: "transform 0.2s ease",
            }}
          >
            +
          </span>
        </summary>
        <div style={{ padding: "16px 0 8px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
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
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container-main">
        <div
          ref={ref}
          className={`fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2
            className="text-h1"
            style={{
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ maxWidth: 700, marginInline: "auto" }}>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .faq-details summary::-webkit-details-marker {
          display: none;
        }
        .faq-details summary::marker {
          display: none;
          content: "";
        }
        .faq-details[open] .faq-icon {
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  );
}
