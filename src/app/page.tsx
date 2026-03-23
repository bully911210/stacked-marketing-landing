import { Suspense } from "react";
import Nav from "@/components/main/Nav";
import Hero from "@/components/main/Hero";
import PricingTable from "@/components/main/PricingTable";
import Proof from "@/components/main/Proof";
import About from "@/components/main/About";
import Process from "@/components/main/Process";
import FAQ from "@/components/main/FAQ";
import LeadForm from "@/components/main/LeadForm";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";
import CookieConsent from "@/components/main/CookieConsent";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PricingTable />
      <Proof />
      <About />
      <Process />
      <FAQ />
      <Suspense>
        <LeadForm />
      </Suspense>
      <Footer />
      <WhatsApp />
      <CookieConsent />
    </main>
  );
}
