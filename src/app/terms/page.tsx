import type { Metadata } from "next";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Stacked Marketing",
  description: "Terms of service for Stacked Marketing.",
};

export default function TermsPage() {
  return (
    <main>
      <Nav />

      <section style={{ paddingTop: 160, paddingBottom: 80 }}>
        <div className="container-main" style={{ maxWidth: 720 }}>
          <h1 className="text-display" style={{ marginBottom: 48 }}>
            Terms of Service
          </h1>

          <div className="legal-content">
            <p>
              <strong>Effective date:</strong> 1 January 2026
            </p>
            <p>
              <strong>Last updated:</strong> 1 January 2026
            </p>

            <h2>1. Overview</h2>
            <p>
              These terms of service govern your use of the Stacked Marketing
              website and services. By using our website or engaging our
              services, you agree to these terms. Stacked Marketing operates
              from Pretoria, South Africa.
            </p>

            <h2>2. Services</h2>
            <p>
              Stacked Marketing provides website design and development,
              Meta advertising management, email automation, and related
              digital marketing services. The specific scope of services
              will be agreed upon before commencement of any project.
            </p>

            <h2>3. No Lock-In Contracts</h2>
            <p>
              Our services operate on a month-to-month basis unless
              otherwise agreed in writing. You may cancel recurring services
              at any time by providing written notice. Once-off services
              such as website builds are non-refundable once delivered.
            </p>

            <h2>4. Ownership</h2>
            <p>
              Upon full payment, you own all code, content, and creative
              assets produced by Stacked Marketing for your project. We do
              not retain any proprietary rights over deliverables. You are
              free to modify, transfer, or host your assets wherever you
              choose.
            </p>

            <h2>5. Payment</h2>
            <p>
              Payment terms will be communicated before project
              commencement. For once-off services, payment is required
              before delivery. For recurring services, invoices are issued
              monthly and are due within 7 days of receipt. Late payments
              may result in suspension of services.
            </p>

            <h2>6. Advertising Spend</h2>
            <p>
              Advertising budget (ad spend) is separate from our management
              fees and is paid directly to the advertising platform (e.g.
              Meta). We do not handle or mark up your advertising budget.
              Campaign budget recommendations are provided as guidance and
              are not guarantees of performance.
            </p>

            <h2>7. Results Disclaimer</h2>
            <p>
              While we use proven strategies and share our own advertising
              results transparently, we cannot guarantee specific results
              for your business. Performance depends on many factors
              including industry, budget, targeting, and market conditions.
              Past results do not guarantee future performance.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The Stacked Marketing brand, logo, and website design remain
              the property of Stacked Marketing. You may not use our
              branding without prior written consent.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              Stacked Marketing shall not be liable for any indirect,
              incidental, or consequential damages arising from the use of
              our services. Our total liability shall not exceed the amount
              paid for the services in question.
            </p>

            <h2>10. Privacy</h2>
            <p>
              Your use of our services is also governed by our Privacy
              Policy. Please review our privacy policy for details on how
              we collect and use your information.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Republic of South
              Africa. Any disputes shall be resolved in the courts of
              Pretoria, Gauteng.
            </p>

            <h2>12. Changes</h2>
            <p>
              We reserve the right to update these terms at any time.
              Continued use of our services after changes constitutes
              acceptance of the revised terms.
            </p>

            <h2>13. Contact</h2>
            <p>
              For questions about these terms, contact us via WhatsApp at
              +27 62 177 9799 or visit our contact page.
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
      `}</style>
    </main>
  );
}
