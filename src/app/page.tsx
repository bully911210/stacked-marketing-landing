import { Suspense } from "react";
import Nav from "@/components/main/Nav";
import Hero from "@/components/main/Hero";
import TrustBar from "@/components/main/TrustBar";
import Proof from "@/components/main/Proof";
import Testimonials from "@/components/main/Testimonials";
import Offers from "@/components/main/Offers";
import Process from "@/components/main/Process";
import Comparison from "@/components/main/Comparison";
import LeadForm from "@/components/main/LeadForm";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustBar />
      <Proof />
      <Testimonials />
      <Offers />
      <Process />
      <Comparison />
      <Suspense>
        <LeadForm />
      </Suspense>
      <Footer />
      <WhatsApp />
    </main>
  );
}
