import type { Metadata } from "next";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Stacked Marketing",
  description:
    "Privacy policy for Stacked Marketing. POPIA compliant. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.stackedmarketing.co.za/privacy",
  },
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
              <strong>Last updated:</strong> 23 March 2026
            </p>

            <h2>1. Introduction</h2>
            <p>
              Stacked Marketing (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting
              your personal information in accordance with the Protection of
              Personal Information Act (POPIA) of South Africa. This privacy
              policy explains how we collect, use, and safeguard your
              information when you visit our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following personal information:</p>
            <ul>
              <li>Name and surname</li>
              <li>Email address</li>
              <li>Phone number (WhatsApp)</li>
              <li>Business name</li>
              <li>Service interest and referral source</li>
              <li>Website usage data via cookies and analytics tools (see Section 8)</li>
            </ul>

            <h2>3. How We Collect Your Information</h2>
            <p>We collect your information through:</p>
            <ul>
              <li>Our website contact form (name, email, WhatsApp number, business name)</li>
              <li>Direct WhatsApp communication</li>
              <li>Meta Pixel tracking (browsing behaviour, page views, conversions)</li>
              <li>Google Analytics 4 (page views, session data, device information, geographic region)</li>
            </ul>

            <h2>4. How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Respond to your enquiries and provide requested services</li>
              <li>Send you relevant marketing communications (with your consent)</li>
              <li>Improve our website and services through analytics</li>
              <li>Build advertising audiences for remarketing purposes</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>5. Legal Basis for Processing</h2>
            <p>
              We process your personal information based on your consent, our
              legitimate business interests, and contractual necessity. You
              may withdraw consent at any time by contacting us (see Section 11).
            </p>

            <h2>6. Data Sharing with Third Parties</h2>
            <p>
              We do not sell your personal information. We share data with
              the following trusted third-party service providers:
            </p>
            <ul>
              <li>
                <strong>Meta Platforms (Facebook/Instagram):</strong> We use Meta Pixel
                to track website conversions and build advertising audiences. Meta
                receives browsing data including pages visited, actions taken, and
                device information. See Meta&apos;s Data Policy for details.
              </li>
              <li>
                <strong>Google (Google Analytics 4):</strong> We use GA4 to analyse
                website traffic and user behaviour. Google receives anonymised usage
                data. See Google&apos;s Privacy Policy for details.
              </li>
              <li>
                <strong>Make.com:</strong> We use Make.com to process form submissions
                and automate communications. Form data is transmitted to Make.com for
                processing.
              </li>
              <li>
                <strong>Vercel:</strong> Our website is hosted on Vercel. Server logs
                may contain IP addresses and request data.
              </li>
            </ul>
            <p>
              All third parties are required to maintain the confidentiality
              of your information and process it only for the purposes we specify.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information only for as long as
              necessary to fulfil the purposes for which it was collected, or
              as required by law. Specifically:
            </p>
            <ul>
              <li>Contact form submissions: retained for 24 months after last interaction</li>
              <li>Analytics data: retained according to Google and Meta default retention periods</li>
              <li>Client project data: retained for the duration of our business relationship plus 12 months</li>
            </ul>
            <p>
              When no longer needed, your information is securely deleted or anonymised.
            </p>

            <h2>8. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar technologies. When you first visit
              our site, you will see a cookie consent banner. You may accept or
              decline non-essential cookies.
            </p>
            <ul>
              <li>
                <strong>Essential cookies:</strong> Required for basic site functionality.
                These do not require consent.
              </li>
              <li>
                <strong>Analytics cookies (Google Analytics 4):</strong> Used to understand
                how visitors use our site. Only loaded after you accept cookies.
              </li>
              <li>
                <strong>Advertising cookies (Meta Pixel):</strong> Used to track conversions
                and build remarketing audiences. Only loaded after you accept cookies.
              </li>
            </ul>
            <p>
              If you decline cookies, Meta Pixel and Google Analytics will not be loaded
              and no tracking data will be collected. You can change your preference at
              any time by clearing your browser&apos;s local storage for this site.
            </p>

            <h2>9. Your Rights Under POPIA</h2>
            <p>Under the Protection of Personal Information Act, you have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to the processing of your information</li>
              <li>Withdraw consent previously given</li>
              <li>Lodge a complaint with the Information Regulator (South Africa)</li>
            </ul>
            <p>
              To exercise any of these rights, contact us using the details in Section 11.
              We will respond to your request within 30 days.
            </p>

            <h2>10. Security</h2>
            <p>
              We implement appropriate technical and organisational measures
              to protect your personal information against unauthorised
              access, alteration, disclosure, or destruction. Our website uses
              HTTPS encryption for all data transmission.
            </p>

            <h2>11. Contact and Consent Withdrawal</h2>
            <p>
              If you have questions about this privacy policy, wish to
              exercise your rights, or want to withdraw consent, please contact us:
            </p>
            <ul>
              <li>WhatsApp: +27 62 177 9799</li>
              <li>Website: stackedmarketing.co.za/contact</li>
              <li>Location: Pretoria, South Africa</li>
            </ul>

            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any
              changes will be posted on this page with an updated effective
              date. We encourage you to review this policy periodically.
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
