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
      <section id="hero"><HeroSection /></section>
      <section id="destinations"><HowItWorks /></section>
      <section id="comparateur"><ComparatorSection /></section>
      <section id="impact"><ImpactSection /></section>
      <section id="hebergements">
        <div id="activites">
          <LodgingSection />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
