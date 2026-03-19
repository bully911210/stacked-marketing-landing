import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/main/Nav";
import LeadForm from "@/components/main/LeadForm";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";

export const metadata: Metadata = {
  title: "Contact | Stacked Marketing",
  description:
    "Get in touch with Stacked Marketing. Website, ads, email automation. One team. One invoice. Pretoria.",
};

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <section style={{ paddingTop: 160 }}>
        <div className="container-main">
          <h1
            className="text-display"
            style={{
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Get in Touch
          </h1>
        </div>
      </section>
      <Suspense>
        <LeadForm />
      </Suspense>
      <Footer />
      <WhatsApp />
    </main>
  );
}
