import Nav from "@/components/main/Nav";
import Hero from "@/components/main/Hero";
import LogoMarquee from "@/components/main/LogoMarquee";
import Proof from "@/components/main/Proof";
import Testimonials from "@/components/main/Testimonials";
import Process from "@/components/main/Process";
import PricingTable from "@/components/main/PricingTable";
import About from "@/components/main/About";
import FAQ from "@/components/main/FAQ";
import LeadForm from "@/components/main/LeadForm";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";
import FloatingCTA from "@/components/main/FloatingCTA";
import CookieConsent from "@/components/main/CookieConsent";
import ScrollProgress from "@/components/main/ScrollProgress";
import GrainOverlay from "@/components/main/GrainOverlay";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <GrainOverlay />
      <Nav />
      <Hero />
      <LogoMarquee />
      <Proof />
      <Testimonials />
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
