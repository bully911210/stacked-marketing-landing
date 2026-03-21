import type { Metadata } from "next";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";
import { WHATSAPP_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Thank You | Stacked Marketing",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main>
      <Nav />

      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 77,
        }}
      >
        <div
          className="container-main"
          style={{ textAlign: "center", maxWidth: 560 }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "4rem",
              color: "#2D6A4F",
              marginBottom: 24,
            }}
          >
            &#10003;
          </p>

          <h1
            className="text-display"
            style={{ marginBottom: 24 }}
          >
            Thank You
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "1.125rem",
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            We have got everything we need. A member of our team will WhatsApp
            you within 24 hours.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Us Now
            </a>
            <a
              href="/"
              className="btn-ghost"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
