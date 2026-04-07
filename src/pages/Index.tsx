import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ComparatorSection from "@/components/ComparatorSection";
import ImpactSection from "@/components/ImpactSection";
import LodgingSection from "@/components/LodgingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <ComparatorSection />
      <ImpactSection />
      <LodgingSection />
      <Footer />
    </div>
  );
};

export default Index;
