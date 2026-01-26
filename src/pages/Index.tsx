import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import TrustBar from "@/components/TrustBar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceArea from "@/components/ServiceArea";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { useEffect } from "react";

const Index = () => {
  // Initialize promo height CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--promo-height', '44px');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />
      <Hero />
      <Intro />
      <TrustBar />
      <Services />
      <Gallery />
      <WhyChooseUs />
      <ServiceArea />
      <Contact />
      <Footer />
      <MobileCallButton />
    </div>
  );
};

export default Index;
