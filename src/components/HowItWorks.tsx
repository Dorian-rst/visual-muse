import { Search, BarChart3, BookOpen, Plane } from "lucide-react";

const steps = [
  { icon: Search, number: "01", title: "Recherchez", description: "Entrez votre destination et vos dates. Notre algorithme trouve les options les plus écologiques." },
  { icon: BarChart3, number: "02", title: "Comparez", description: "Visualisez l'impact environnemental de chaque option grâce à notre système de notation." },
  { icon: BookOpen, number: "03", title: "Réservez", description: "Réservez vols, hébergements et activités en quelques clics avec compensation carbone incluse." },
  { icon: Plane, number: "04", title: "Voyagez", description: "Profitez de votre voyage responsable et suivez votre impact positif dans votre espace personnel." },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          Comment ça <span className="italic text-primary">fonctionne?</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-16 max-w-xl mx-auto">
          En 4 étapes simples, planifiez un voyage qui fait du bien à la planète.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
