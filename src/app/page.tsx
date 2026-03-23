import { Suspense } from "react";
import Nav from "@/components/main/Nav";
import Hero from "@/components/main/Hero";
import PricingTable from "@/components/main/PricingTable";
import StackOptions from "@/components/main/StackOptions";
import Proof from "@/components/main/Proof";
import Process from "@/components/main/Process";
import Comparison from "@/components/main/Comparison";
import QuickStart from "@/components/main/QuickStart";
import LeadForm from "@/components/main/LeadForm";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PricingTable />
      <StackOptions />
      <Proof />
      <Process />
      <Comparison />
      <QuickStart />
      <Suspense>
        <LeadForm />
      </Suspense>
      <Footer />
      <WhatsApp />
    </main>
  );
}
