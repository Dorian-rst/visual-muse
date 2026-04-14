import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, MapPin, Star, ArrowRight, Search, ArrowLeft } from "lucide-react";
import { destinations } from "@/data/destinations";

const regions = ["Toutes", "Europe", "Amérique", "Asie", "Afrique", "Océanie"];

const Destinations = () => {
  const [activeRegion, setActiveRegion] = useState("Toutes");
  const [search, setSearch] = useState("");

  const filtered = destinations.filter((d) => {
    const matchRegion = activeRegion === "Toutes" || d.region === activeRegion;
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchRegion && matchSearch;
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
            <span className="text-sm text-primary font-medium">Destinations certifiées</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Voyagez <span className="italic text-primary">responsable</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Des destinations sélectionnées pour leur engagement environnemental et leur authenticité.
          </p>
          <div className="max-w-lg mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une destination..." className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {regions.map((r) => (
              <button key={r} onClick={() => setActiveRegion(r)} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeRegion === r ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-accent"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Aucune destination trouvée.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest) => (
              <div key={dest.slug} className="bg-card rounded-2xl overflow-hidden border border-border group hover:shadow-lg transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> {dest.score}
                  </span>
                  <span className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                    CO₂ : {dest.co2}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-foreground">{dest.name}</h3>
                      <p className="text-xs text-muted-foreground">{dest.region}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">{dest.rating}</span>
                      <span className="text-muted-foreground text-xs">({dest.reviews})</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 mb-4 line-clamp-2">{dest.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.tags.map((tag) => (
                      <span key={tag} className="bg-accent text-accent-foreground text-xs px-2.5 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{dest.price}</p>
                    <Link to={`/destinations/${dest.slug}`} className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                      Découvrir <ArrowRight className="h-4 w-4" />
                    </Link>
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

export default Destinations;
