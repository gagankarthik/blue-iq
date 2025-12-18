import HeroSection from "@/components/landing/HeroSection";
import WhyUs from "@/components/landing/WhyUs";
import Features from "@/components/landing/Features";
import TrustedCompanies from "@/components/landing/TrustedCompanies";
import Footer from "@/components/landing/Footer";
import CTA from "@/components/landing/CTA";
import Plans from "@/components/landing/Plans";
import FAQ from "@/components/landing/FAQ";
import Testimonials from "@/components/landing/Testonimals";
import Benefits from "@/components/landing/Benfits";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-white dark:bg-black">
      <main className="flex flex-col">
    
        <HeroSection />
        <WhyUs />
        <Features />
        <Benefits />
        <TrustedCompanies />
        <Plans />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
