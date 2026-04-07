import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ComparatorSection from "@/components/ComparatorSection";
import ImpactSection from "@/components/ImpactSection";
import LodgingSection from "@/components/LodgingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />
      <div id="hero"><HeroSection /></div>
      <div id="destinations"><HowItWorks /></div>
      <div id="comparateur"><ComparatorSection /></div>
      <div id="impact"><ImpactSection /></div>
      <div id="hebergements"><LodgingSection /></div>
      <div id="activites"><LodgingSection /></div>
      <Footer />
    </div>
  );
};

export default Index;
