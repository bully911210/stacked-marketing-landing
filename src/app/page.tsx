import Nav from "@/components/main/Nav";
import Hero from "@/components/main/Hero";
import Proof from "@/components/main/Proof";
import Process from "@/components/main/Process";
import PricingTable from "@/components/main/PricingTable";
import About from "@/components/main/About";
import FAQ from "@/components/main/FAQ";
import LeadForm from "@/components/main/LeadForm";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";
import FloatingCTA from "@/components/main/FloatingCTA";
import CookieConsent from "@/components/main/CookieConsent";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Proof />
      <Process />
      <PricingTable />
      <About />
      <FAQ />
      <LeadForm />
      <Footer />
      <WhatsApp />
      <FloatingCTA />
      <CookieConsent />
    </main>
  );
}
