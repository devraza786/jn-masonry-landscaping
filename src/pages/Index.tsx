import Navbar from "@/components/Navbar";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
