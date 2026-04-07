import { ArrowRight, Leaf, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-forest.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-earth-forest/50" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-2 mb-8">
          <Leaf className="h-4 w-4 text-earth-sage" />
          <span className="text-sm text-earth-sage font-medium">
            Voyagez responsable, préservez la Terre
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-earth-cream mb-6 leading-tight">
          Retournez à{" "}
          <span className="italic text-earth-sage">l'Essentiel</span>
        </h1>

        <p className="text-lg md:text-xl text-earth-cream/80 max-w-2xl mx-auto mb-10 font-light">
          Découvrez des voyages qui respectent notre planète. Comparez les vols,
          mesurez votre impact et réservez des hébergements éco-responsables.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => navigate("/destinations")} className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-opacity">
            Explorer les destinations
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 border border-earth-cream/40 text-earth-cream px-8 py-3.5 rounded-full text-base font-medium hover:bg-earth-cream/10 transition-colors">
            En savoir plus
          </button>
        </div>
      </div>

      <Leaf className="absolute left-8 top-1/3 h-16 w-16 text-earth-sage/20" />
      <Globe className="absolute right-12 top-1/2 h-14 w-14 text-earth-sage/15" />
    </section>
  );
};

export default HeroSection;
