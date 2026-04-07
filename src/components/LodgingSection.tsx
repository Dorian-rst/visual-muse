import { ArrowRight, Star, Leaf, MapPin } from "lucide-react";
import ecolodge1 from "@/assets/ecolodge-1.jpg";
import ecolodge2 from "@/assets/ecolodge-2.jpg";

const lodgings = [
  {
    image: ecolodge1,
    score: "A+",
    name: "EcoLodge Amazonia",
    location: "Costa Rica",
    rating: 4.9,
    reviews: 127,
    tags: ["Énergie solaire", "Eau recyclée", "Bio"],
    price: "89€",
  },
  {
    image: ecolodge2,
    score: "A",
    name: "Green Haven Resort",
    location: "Thaïlande",
    rating: 4.8,
    reviews: 89,
    tags: ["Zéro plastique", "Local", "Bio"],
    price: "75€",
  },
];

const activities = [
  { name: "Randonnée écologique", score: "A+", price: "35€", duration: "4h" },
  { name: "Kayak mangrove", score: "A", price: "45€", duration: "3h" },
  { name: "Visite ferme bio", score: "A", price: "25€", duration: "2h" },
];

const LodgingSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-6">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Hébergements & Activités</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Réservez <span className="italic text-primary">éco-responsable</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des hébergements certifiés et des activités qui respectent l'environnement et soutiennent les communautés locales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {lodgings.map((lodge) => (
            <div key={lodge.name} className="bg-card rounded-2xl overflow-hidden border border-border group">
              <div className="relative h-56 overflow-hidden">
                <img src={lodge.image} alt={lodge.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Leaf className="h-3 w-3" /> {lodge.score}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-foreground">{lodge.name}</h3>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {lodge.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{lodge.rating}</span>
                    <span className="text-muted-foreground">({lodge.reviews})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 my-4">
                  {lodge.tags.map((tag) => (
                    <span key={tag} className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-foreground">
                    {lodge.price}<span className="text-sm font-normal text-muted-foreground">/nuit</span>
                  </p>
                  <button className="flex items-center gap-1 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                    Réserver <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">Activités éco-responsables</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <div key={activity.name} className="bg-card rounded-xl p-5 border border-border text-center">
                <h4 className="font-semibold text-foreground text-sm mb-1">{activity.name}</h4>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> {activity.score}
                  </span>
                  <span className="text-lg font-bold text-foreground">{activity.price}</span>
                </div>
                <p className="text-xs text-muted-foreground">{activity.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LodgingSection;
