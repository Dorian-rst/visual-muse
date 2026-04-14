import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, MapPin, Star, ArrowRight, ArrowLeft, Search, Wifi, Droplets, Zap, TreePine } from "lucide-react";
import ReservationModal from "@/components/ReservationModal";

import ecolodge1 from "@/assets/ecolodge-1.jpg";
import ecolodge2 from "@/assets/ecolodge-2.jpg";
import hebBamboo from "@/assets/heb-bamboo.jpg";
import hebCabin from "@/assets/heb-cabin.jpg";
import hebMed from "@/assets/heb-med.jpg";
import hebSafari from "@/assets/heb-safari.jpg";

const types = ["Tous", "Éco-lodge", "Cabane", "Maison d'hôtes", "Camp"];

const hebergements = [
  { name: "EcoLodge Amazonia", image: ecolodge1, type: "Éco-lodge", location: "Costa Rica", score: "A+", price: "89€", rating: 4.9, reviews: 127, capacity: "2-4 pers.", description: "Lodge en bois certifié au cœur de la forêt tropicale. Énergie solaire, eau de pluie recyclée et cuisine bio locale.", tags: ["Énergie solaire", "Eau recyclée", "Bio"], amenities: ["wifi", "water", "energy", "trees"] },
  { name: "Bamboo Treehouse", image: hebBamboo, type: "Éco-lodge", location: "Bali, Indonésie", score: "A+", price: "75€", rating: 4.8, reviews: 203, capacity: "2 pers.", description: "Maison dans les arbres en bambou avec vue sur les rizières. Architecture traditionnelle et matériaux 100% naturels.", tags: ["Bambou", "Vue rizières", "Artisanal"], amenities: ["wifi", "trees"] },
  { name: "Nordic Eco Cabin", image: hebCabin, type: "Cabane", location: "Norvège", score: "A+", price: "120€", rating: 4.9, reviews: 89, capacity: "2-6 pers.", description: "Cabane en bois massif chauffée au poêle, isolée en pleine nature. Construction bois certifié et zéro déchet.", tags: ["Bois certifié", "Poêle", "Zéro déchet"], amenities: ["energy", "trees"] },
  { name: "Casa Sol", image: hebMed, type: "Maison d'hôtes", location: "Crète, Grèce", score: "A", price: "65€", rating: 4.7, reviews: 156, capacity: "2-3 pers.", description: "Maison méditerranéenne avec panneaux solaires, jardin bio et vue imprenable sur la mer Égée.", tags: ["Solaire", "Jardin bio", "Vue mer"], amenities: ["wifi", "water", "energy"] },
  { name: "Savanna Eco Camp", image: hebSafari, type: "Camp", location: "Kenya", score: "A+", price: "150€", rating: 4.9, reviews: 67, capacity: "2 pers.", description: "Camp de tentes luxueuses en pleine savane, géré par les communautés Maasaï. Safari responsable inclus.", tags: ["Communautaire", "Safari", "Luxe responsable"], amenities: ["water", "trees"] },
  { name: "Green Haven Resort", image: ecolodge2, type: "Éco-lodge", location: "Thaïlande", score: "A", price: "55€", rating: 4.8, reviews: 189, capacity: "2-4 pers.", description: "Resort en bordure de mangrove, construit en matériaux recyclés. Activités nautiques écologiques incluses.", tags: ["Zéro plastique", "Local", "Recyclé"], amenities: ["wifi", "water", "energy", "trees"] },
];

const amenityIcons: Record<string, { icon: typeof Wifi; label: string }> = {
  wifi: { icon: Wifi, label: "Wi-Fi" },
  water: { icon: Droplets, label: "Eau recyclée" },
  energy: { icon: Zap, label: "Énergie verte" },
  trees: { icon: TreePine, label: "Environnement naturel" },
};

const Hebergements = () => {
  const [activeType, setActiveType] = useState("Tous");
  const [search, setSearch] = useState("");
  const [selectedHeb, setSelectedHeb] = useState<typeof hebergements[0] | null>(null);

  const filtered = hebergements.filter((h) => {
    const matchType = activeType === "Tous" || h.type === activeType;
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase()) ||
      h.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-serif font-bold text-foreground">BackToEarth</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </div>
      </nav>

      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-6">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Hébergements certifiés</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Dormez <span className="italic text-primary">éco-responsable</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Des hébergements certifiés qui allient confort, authenticité et respect de l'environnement.
          </p>

          <div className="max-w-lg mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un hébergement..." className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {types.map((t) => (
              <button key={t} onClick={() => setActiveType(t)} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeType === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-accent"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Aucun hébergement trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((h) => (
              <div key={h.name} className="bg-card rounded-2xl overflow-hidden border border-border group hover:shadow-lg transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> {h.score}
                  </span>
                  <span className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                    {h.type}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-foreground">{h.name}</h3>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {h.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">{h.rating}</span>
                      <span className="text-muted-foreground text-xs">({h.reviews})</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 mb-3 line-clamp-2">{h.description}</p>

                  <div className="flex items-center gap-3 mb-3">
                    {h.amenities.map((a) => {
                      const info = amenityIcons[a];
                      if (!info) return null;
                      const Icon = info.icon;
                      return (
                        <div key={a} className="flex items-center gap-1 text-xs text-muted-foreground" title={info.label}>
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                      );
                    })}
                    <span className="text-xs text-muted-foreground ml-auto">{h.capacity}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {h.tags.map((tag) => (
                      <span key={tag} className="bg-accent text-accent-foreground text-xs px-2.5 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-foreground">{h.price}<span className="text-sm font-normal text-muted-foreground">/nuit</span></p>
                    <button
                      onClick={() => setSelectedHeb(h)}
                      className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Réserver <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReservationModal
        isOpen={!!selectedHeb}
        onClose={() => setSelectedHeb(null)}
        item={selectedHeb ? { name: selectedHeb.name, price: selectedHeb.price, location: selectedHeb.location, image: selectedHeb.image } : { name: "", price: "0€", location: "", image: "" }}
        type="hébergement"
      />
    </div>
  );
};

export default Hebergements;
