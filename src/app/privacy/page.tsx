import type { Metadata } from "next";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Stacked Marketing",
  description: "Privacy policy for Stacked Marketing. POPIA compliant.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Nav />

      <section style={{ paddingTop: 160, paddingBottom: 80 }}>
        <div className="container-main" style={{ maxWidth: 720 }}>
          <h1 className="text-display" style={{ marginBottom: 48 }}>
            Privacy Policy
          </h1>

          <div className="legal-content">
            <p>
              <strong>Effective date:</strong> 1 January 2026
            </p>
            <p>
              <strong>Last updated:</strong> 1 January 2026
            </p>

            <h2>1. Introduction</h2>
            <p>
              Stacked Marketing (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting
              your personal information in accordance with the Protection of
              Personal Information Act (POPIA) of South Africa. This privacy
              policy explains how we collect, use, and safeguard your
              information.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following personal information:</p>
            <ul>
              <li>Name and surname</li>
              <li>Email address</li>
              <li>Phone number (WhatsApp)</li>
              <li>Business name</li>
              <li>Website usage data via cookies and analytics tools</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Respond to your enquiries and provide requested services</li>
              <li>Send you relevant marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Legal Basis for Processing</h2>
            <p>
              We process your personal information based on your consent, our
              legitimate business interests, and contractual necessity. You
              may withdraw consent at any time by contacting us.
            </p>

            <h2>5. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share your
              information with trusted third-party service providers who
              assist us in operating our business, including analytics
              providers, email service providers, and advertising platforms.
              All third parties are required to maintain the confidentiality
              of your information.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as
              necessary to fulfil the purposes for which it was collected, or
              as required by law. When no longer needed, your information is
              securely deleted or anonymised.
            </p>

            <h2>7. Your Rights</h2>
            <p>Under POPIA, you have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to the processing of your information</li>
              <li>Withdraw consent previously given</li>
              <li>Lodge a complaint with the Information Regulator</li>
            </ul>

            <h2>8. Cookies</h2>
            <p>
              Our website uses cookies and similar technologies to enhance
              your browsing experience, analyse site traffic, and serve
              targeted advertisements. You can manage cookie preferences
              through your browser settings.
            </p>

            <h2>9. Security</h2>
            <p>
              We implement appropriate technical and organisational measures
              to protect your personal information against unauthorised
              access, alteration, disclosure, or destruction.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any
              changes will be posted on this page with an updated effective
              date.
            </p>

            <h2>11. Contact</h2>
            <p>
              If you have questions about this privacy policy or wish to
              exercise your rights, please contact us via WhatsApp at +27 62
              177 9799 or visit our contact page.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .legal-content h2 {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-top: 40px;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .legal-content p {
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .legal-content strong {
          color: var(--text-primary);
          font-weight: 500;
        }
        .legal-content ul {
          list-style: none;
          padding: 0;
          margin-bottom: 16px;
        }
        .legal-content li {
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.8;
          padding-left: 20px;
          position: relative;
        }
        .legal-content li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 12px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--lime-on-light);
        }
      `}</style>
    </main>
  );
}
