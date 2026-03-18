import Hero from "@/components/Hero";
import ValueStack from "@/components/ValueStack";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Questionnaire from "@/components/Questionnaire";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Hero />
      <ValueStack />
      <HowItWorks />
      <SocialProof />
      <FAQ />
      <Questionnaire />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
