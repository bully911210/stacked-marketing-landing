import type { Metadata } from "next";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";

export const metadata: Metadata = {
  title: "About | Stacked Marketing",
  description:
    "The story behind Stacked Marketing. We spent our own money before we ever touched a client campaign. Pretoria-based. No contracts.",
};

export default function AboutPage() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section
        style={{
          paddingTop: 160,
          paddingBottom: 80,
        }}
      >
        <div className="container-main">
          <h1
            className="text-display"
            style={{ marginBottom: 16 }}
          >
            Franz Baden
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1.25rem",
            }}
          >
            Founder, Stacked Marketing. Pretoria.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-spacing">
        <div
          className="container-main"
          style={{ maxWidth: 720 }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            I started Stacked Marketing because I was tired of watching
            businesses pay three different companies to do one job badly. A
            website agency here, an ads manager there, someone else handling
            emails. None of them talking to each other. None of them
            accountable for the result.
          </p>

          <div
            style={{
              borderLeft: "3px solid var(--lime-on-light)",
              paddingLeft: 24,
              marginBottom: 32,
            }}
          >
            <p
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "1.125rem",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              Before I ever asked a client for a cent, I spent R205K of my
              own money on Meta ads across five different industries. I
              needed to know what actually works, not what the textbook
              says.
            </p>
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            That R205K taught me more than any certification ever could.
            Insurance, non-profits, financial services, recruitment. All
            restricted categories. All requiring different strategies,
            different creative approaches, different compliance
            frameworks. I learnt what a R68 CPA looks like in insurance. I
            learnt how to build a supporter database from zero for an
            advocacy organisation. I learnt how to fill 50 seats in a BPO
            call centre through Meta alone.
          </p>

          <p
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            Now, when a client comes to us, we are not guessing. We are
            not testing on their budget. We are applying patterns that
            have already been proven with our own money, in harder
            verticals than most businesses will ever operate in.
          </p>

          <div
            style={{
              borderLeft: "3px solid var(--lime-on-light)",
              paddingLeft: 24,
              marginBottom: 32,
            }}
          >
            <p
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "1.125rem",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              The model is simple. One team builds your website, runs
              your ads, and sets up your email automation. One invoice.
              One strategy. Everything connected.
            </p>
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            We are based in Pretoria. We answer WhatsApp the same day. We
            do not lock you into contracts because we believe you should
            stay because it works, not because a piece of paper says you
            have to. Everything we build, you own. The code, the content,
            the data. If you leave, it all goes with you. That is how it
            should be.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing">
        <div
          className="container-main"
          style={{ maxWidth: 720 }}
        >
          <h2
            className="text-h2"
            style={{ marginBottom: 40 }}
          >
            What We Stand For
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {[
              "No contracts. Stay because it works.",
              "You own everything we build.",
              "We answer WhatsApp same day.",
              "We spend our own money first.",
            ].map((value) => (
              <p
                key={value}
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  paddingLeft: 20,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 8,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "var(--lime-on-light)",
                    display: "inline-block",
                  }}
                />
                {value}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing" style={{ textAlign: "center" }}>
        <div className="container-main">
          <h2
            className="text-h1"
            style={{ marginBottom: 24 }}
          >
            Ready?
          </h2>
          <a href="/#contact" className="btn-primary">
            Get Your Game Plan
          </a>
        </div>
      </section>

      <Footer />
      <WhatsApp />
    </main>
  );
}
