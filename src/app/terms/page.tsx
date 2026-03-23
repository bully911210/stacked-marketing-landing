import type { Metadata } from "next";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Stacked Marketing",
  description:
    "Terms of service for Stacked Marketing. No contracts, full ownership, transparent pricing.",
  alternates: {
    canonical: "https://www.stackedmarketing.co.za/terms",
  },
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
              <strong>Last updated:</strong> 23 March 2026
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
              Stacked Marketing provides the following services:
            </p>
            <ul>
              <li>
                <strong>Basic Starter Website (R2,499 once-off):</strong> A 4-page
                custom-built website delivered in 5 business days
              </li>
              <li>
                <strong>Meta Ads Accelerator (R4,999/mo):</strong> Daily managed Meta
                advertising campaigns with creative production and reporting
              </li>
              <li>
                <strong>Stacked Core (R11,999/mo):</strong> Full-stack marketing
                including website, Meta Ads management, and automation
              </li>
            </ul>
            <p>
              All prices are exclusive of VAT. The specific scope of services
              will be agreed upon before commencement of any project.
            </p>

            <h2>3. No Lock-In Contracts</h2>
            <p>
              Our recurring services (Meta Ads Accelerator, Stacked Core) operate
              on a month-to-month basis unless otherwise agreed in writing.
              You may cancel recurring services at any time by providing written
              notice before the start of the next billing period. Once-off
              services such as website builds are non-refundable once delivered.
            </p>

            <h2>4. Ownership — &quot;You Own Everything&quot;</h2>
            <p>
              Upon full payment, you own all code, content, designs, and creative
              assets produced by Stacked Marketing for your project. Specifically:
            </p>
            <ul>
              <li>Website source code and all associated files</li>
              <li>Ad creative assets (images, videos, copy)</li>
              <li>Automation workflows built on your accounts</li>
              <li>All data collected through your campaigns</li>
            </ul>
            <p>
              We do not retain any proprietary rights over deliverables. You are
              free to modify, transfer, or host your assets wherever you choose.
              If you leave, you take everything with you.
            </p>

            <h2>5. Payment</h2>
            <p>
              Payment terms will be communicated before project commencement.
              For once-off services, payment is required before delivery. For
              recurring services, invoices are issued monthly and are due
              within 7 days of receipt. Late payments may result in suspension
              of services.
            </p>

            <h2>6. Upgrade Credit</h2>
            <p>
              Clients who start with the Basic Starter Website (R2,499) and
              subsequently upgrade to Meta Ads Accelerator or Stacked Core
              receive a R2,000 credit toward their first month of the upgraded
              service. This credit is non-transferable and has no cash value.
            </p>

            <h2>7. Advertising Spend</h2>
            <p>
              Advertising budget (ad spend) is separate from our management
              fees and is paid directly to the advertising platform (e.g.
              Meta). We do not handle or mark up your advertising budget.
              All ad spend is transparent and visible in your Meta Business
              Manager account. Campaign budget recommendations are provided
              as guidance and are not guarantees of performance.
            </p>

            <h2>8. Results Disclaimer</h2>
            <p>
              While we use proven strategies and share our own advertising
              results transparently, we cannot guarantee specific results
              for your business. Performance depends on many factors
              including industry, budget, targeting, creative quality, and
              market conditions. Past results do not guarantee future
              performance.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              The Stacked Marketing brand, logo, and website design remain
              the property of Stacked Marketing. You may not use our
              branding without prior written consent.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              Stacked Marketing shall not be liable for any indirect,
              incidental, or consequential damages arising from the use of
              our services. Our total liability shall not exceed the amount
              paid for the services in question during the preceding 3 months.
            </p>

            <h2>11. Privacy</h2>
            <p>
              Your use of our services is also governed by our{" "}
              <a
                href="/privacy"
                style={{
                  color: "var(--lime-on-light)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Privacy Policy
              </a>
              . Please review it for details on how we collect and use your
              information.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Republic of South
              Africa. Any disputes shall be resolved in the courts of
              Pretoria, Gauteng.
            </p>

            <h2>13. Changes</h2>
            <p>
              We reserve the right to update these terms at any time.
              Continued use of our services after changes constitutes
              acceptance of the revised terms.
            </p>

            <h2>14. Contact</h2>
            <p>
              For questions about these terms, contact us via WhatsApp at
              +27 62 177 9799 or visit our{" "}
              <a
                href="/#contact"
                style={{
                  color: "var(--lime-on-light)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                contact page
              </a>
              .
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
