import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, MapPin, Star, ArrowRight, ArrowLeft, Search, Clock, Users, Zap } from "lucide-react";

import actRandonnee from "@/assets/act-randonnee.jpg";
import actSnorkeling from "@/assets/act-snorkeling.jpg";
import actFerme from "@/assets/act-ferme.jpg";
import actYoga from "@/assets/act-yoga.jpg";
import actOiseaux from "@/assets/act-oiseaux.jpg";
import actVelo from "@/assets/act-velo.jpg";
import ecolodge2 from "@/assets/ecolodge-2.jpg";
import ecolodge1 from "@/assets/ecolodge-1.jpg";

const categories = ["Toutes", "Aventure", "Bien-être", "Culture", "Nature"];

const activities = [
  { name: "Randonnée en forêt tropicale", image: actRandonnee, category: "Aventure", location: "Costa Rica", score: "A+", price: "35€", duration: "4h", groupSize: "2-12", rating: 4.9, reviews: 87, description: "Parcourez les sentiers de la forêt tropicale avec un guide naturaliste certifié. Observation de la faune et flore endémiques.", tags: ["Zéro émission", "Guide local", "Petit groupe"] },
  { name: "Kayak dans la mangrove", image: ecolodge2, category: "Aventure", location: "Thaïlande", score: "A", price: "45€", duration: "3h", groupSize: "2-8", rating: 4.8, reviews: 124, description: "Explorez les mangroves en kayak, un écosystème fragile et fascinant. Activité silencieuse respectueuse de la faune.", tags: ["Sans moteur", "Éducatif", "Faune marine"] },
  { name: "Snorkeling récif corallien", image: actSnorkeling, category: "Nature", location: "Bali", score: "A", price: "40€", duration: "2h30", groupSize: "4-10", rating: 4.7, reviews: 203, description: "Plongée avec masque et tuba sur des récifs protégés. Sensibilisation à la préservation des coraux.", tags: ["Récif protégé", "Éducatif", "Petit groupe"] },
  { name: "Yoga & méditation en pleine nature", image: actYoga, category: "Bien-être", location: "Bali", score: "A+", price: "25€", duration: "1h30", groupSize: "2-15", rating: 4.9, reviews: 156, description: "Séances de yoga au lever du soleil sur une terrasse face aux rizières. Connexion profonde avec la nature.", tags: ["Plein air", "Lever de soleil", "Tous niveaux"] },
  { name: "Visite ferme biologique", image: actFerme, category: "Culture", location: "Provence, France", score: "A+", price: "30€", duration: "3h", groupSize: "4-20", rating: 4.8, reviews: 92, description: "Découvrez une ferme bio locale : cueillette, dégustation et atelier cuisine avec des produits de saison.", tags: ["Bio", "Local", "Dégustation"] },
  { name: "Observation des oiseaux", image: actOiseaux, category: "Nature", location: "Costa Rica", score: "A+", price: "28€", duration: "3h", groupSize: "2-8", rating: 4.9, reviews: 67, description: "Avec un ornithologue expert, observez les espèces rares dans leur habitat naturel au petit matin.", tags: ["Faune locale", "Expert", "Aube"] },
  { name: "Vélo à travers les champs", image: actVelo, category: "Aventure", location: "Provence, France", score: "A+", price: "20€", duration: "2h", groupSize: "2-12", rating: 4.7, reviews: 145, description: "Balade à vélo à travers les champs de lavande et les vignobles provençaux. Location de vélos incluse.", tags: ["Zéro émission", "Paysages", "Facile"] },
  { name: "Plantation de coraux", image: ecolodge1, category: "Nature", location: "Thaïlande", score: "A+", price: "55€", duration: "4h", groupSize: "4-10", rating: 4.9, reviews: 43, description: "Participez activement à la restauration des récifs coralliens aux côtés de biologistes marins.", tags: ["Impact positif", "Scientifique", "Unique"] },
];

const Activites = () => {
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [search, setSearch] = useState("");

  const filtered = activities.filter((a) => {
    const matchCat = activeCategory === "Toutes" || a.category === activeCategory;
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
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
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Activités éco-responsables</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Vivez des expériences <span className="italic text-primary">durables</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Des activités sélectionnées pour leur faible impact environnemental et leur soutien aux communautés locales.
          </p>

          <div className="max-w-lg mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une activité..." className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-accent"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Aucune activité trouvée.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((act) => (
              <div key={act.name} className="bg-card rounded-2xl overflow-hidden border border-border group hover:shadow-lg transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img src={act.image} alt={act.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> {act.score}
                  </span>
                  <span className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                    {act.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg text-foreground mb-1">{act.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5" /> {act.location}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{act.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {act.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {act.groupSize} pers.</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {act.rating} ({act.reviews})</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {act.tags.map((tag) => (
                      <span key={tag} className="bg-accent text-accent-foreground text-xs px-2.5 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-foreground">{act.price}<span className="text-sm font-normal text-muted-foreground">/pers.</span></p>
                    <button className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                      Réserver <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Activites;
