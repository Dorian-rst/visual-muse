import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Search, X, MapPin } from "lucide-react";

const navLinks = [
  { label: "Accueil", target: "hero" },
  { label: "Comparateur", target: "comparateur" },
  { label: "Destinations", target: "destinations" },
  { label: "Hébergements", target: "hebergements" },
  { label: "Activités", target: "activites" },
];

const destinations = [
  { name: "Costa Rica", region: "Amérique Centrale", tags: ["Éco-lodge", "Randonnée", "Biodiversité"] },
  { name: "Lisbonne", region: "Portugal", tags: ["Culture", "Gastronomie", "Plage"] },
  { name: "Thaïlande", region: "Asie du Sud-Est", tags: ["Temples", "Kayak", "Bio"] },
  { name: "Islande", region: "Europe du Nord", tags: ["Géothermie", "Aurores boréales", "Randonnée"] },
  { name: "Nouvelle-Zélande", region: "Océanie", tags: ["Nature", "Aventure", "Éco-tourisme"] },
  { name: "Kenya", region: "Afrique de l'Est", tags: ["Safari", "Communautés locales", "Nature"] },
  { name: "Norvège", region: "Scandinavie", tags: ["Fjords", "Énergie verte", "Randonnée"] },
  { name: "Bali", region: "Indonésie", tags: ["Yoga", "Rizières", "Éco-resort"] },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConnexion, setShowConnexion] = useState(false);

  const filteredDestinations = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-serif font-bold text-foreground">BackToEarth</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowConnexion(!showConnexion)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Connexion
            </button>
            <button
              onClick={() => scrollTo("hero")}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Commencer
            </button>
          </div>
        </div>
      </nav>

      {/* Connexion Modal */}
      {showConnexion && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setShowConnexion(false)}>
          <div className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-foreground">Connexion</h2>
              <button onClick={() => setShowConnexion(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Se connecter
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Pas encore de compte ?{" "}
                <button className="text-primary font-semibold hover:underline">S'inscrire</button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="container mx-auto px-4 pt-24" onClick={(e) => e.stopPropagation()}>
            <div className="bg-card rounded-2xl shadow-2xl max-w-2xl mx-auto overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une destination, une activité..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-base focus:outline-none"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((dest) => (
                    <button
                      key={dest.name}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        scrollTo("destinations");
                      }}
                      className="w-full flex items-start gap-4 px-6 py-4 hover:bg-accent/50 transition-colors text-left"
                    >
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">{dest.name}</p>
                        <p className="text-xs text-muted-foreground">{dest.region}</p>
                        <div className="flex gap-1.5 mt-1.5">
                          {dest.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-muted-foreground text-sm">
                    Aucune destination trouvée pour "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
