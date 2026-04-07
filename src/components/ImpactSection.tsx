import { Leaf, Droplets, Zap, TreePine } from "lucide-react";

const stats = [
  { icon: Leaf, value: "1.2T", unit: "CO₂/an", label: "Empreinte Carbone", description: "Réduction moyenne par voyageur" },
  { icon: Droplets, value: "45k", unit: "litres", label: "Eau Préservée", description: "Par partenariat éco-responsable" },
  { icon: Zap, value: "100%", unit: "renouvelable", label: "Énergie Verte", description: "Nos hébergements partenaires" },
  { icon: TreePine, value: "25k+", unit: "arbres", label: "Arbres Plantés", description: "Programme de reforestation" },
];

const ImpactSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-6">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">Impact environnemental</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          Mesurez votre <span className="italic text-primary">impact positif</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-16">
          Chaque réservation via BackToEarth contribue à un tourisme plus durable. Suivez en temps réel l'impact de vos choix.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-serif font-bold text-foreground">
                {stat.value} <span className="text-base font-sans font-normal text-muted-foreground">{stat.unit}</span>
              </p>
              <p className="font-semibold text-foreground mt-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
