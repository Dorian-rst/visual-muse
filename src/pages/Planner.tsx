import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Leaf, ArrowLeft, Search, Train, Bus, Plane, Car, Award, Star, Clock, Euro, ArrowRight, Sparkles, MapPin, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { destinations } from "@/data/destinations";
import { buildCombos, searchDestinations, type TripCombo, type TransportType } from "@/data/tripCombos";
import ReservationModal from "@/components/ReservationModal";
import { toast } from "sonner";

const transportIcons: Record<TransportType, typeof Train> = {
  "train": Train,
  "bus": Bus,
  "vol-direct": Plane,
  "vol-escale": Plane,
  "covoiturage": Car,
};

const scoreColor = (s: string) =>
  s === "A+" ? "bg-primary text-primary-foreground" :
  s === "A" ? "bg-primary/80 text-primary-foreground" :
  s === "B" ? "bg-earth-olive text-primary-foreground" :
  "bg-muted text-muted-foreground";

const Planner = () => {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [nights, setNights] = useState(5);
  const [co2Budget, setCo2Budget] = useState(2500);
  const [selectedCombo, setSelectedCombo] = useState<TripCombo | null>(null);

  const matches = useMemo(() => searchDestinations(query), [query]);
  const selectedDest = useMemo(
    () => destinations.find((d) => d.slug === selectedSlug),
    [selectedSlug]
  );

  const allCombos = useMemo(
    () => (selectedSlug ? buildCombos(selectedSlug, nights) : []),
    [selectedSlug, nights]
  );

  const filteredCombos = useMemo(
    () => allCombos.filter((c) => c.totalCo2 <= co2Budget).slice(0, 3),
    [allCombos, co2Budget]
  );

  const minCo2 = allCombos[0]?.totalCo2 ?? 0;
  const maxCo2 = allCombos[allCombos.length - 1]?.totalCo2 ?? 5000;

  const handleSelectDest = (slug: string) => {
    setSelectedSlug(slug);
    const combos = buildCombos(slug, nights);
    if (combos.length > 0) {
      setCo2Budget(combos[combos.length - 1].totalCo2);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-serif font-bold text-foreground">BackToEarth</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Accueil
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-secondary py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Planificateur éco-responsable</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-3">
            Composez votre voyage <span className="italic text-primary">bas-carbone</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Choisissez une destination, ajustez votre budget CO₂, comparez les combinaisons transport + hébergement certifié.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une destination (ex : Lisbonne, Costa Rica...)"
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Étape 1 : choisir une destination */}
        {!selectedSlug && (
          <>
            <h2 className="text-xl font-serif font-bold text-foreground mb-5">
              {query ? `${matches.length} destination(s) correspondent` : "Choisissez votre destination"}
            </h2>
            {matches.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">Aucune destination trouvée pour "{query}".</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {matches.map((d) => (
                  <button
                    key={d.slug}
                    onClick={() => handleSelectDest(d.slug)}
                    className="text-left bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/40 transition-all group"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Leaf className="h-3 w-3" /> {d.score}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-bold text-foreground">{d.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" /> {d.region}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Étape 2 : combinaisons */}
        {selectedSlug && selectedDest && (
          <div className="space-y-8">
            {/* Header destination + reset */}
            <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-4">
                <img src={selectedDest.image} alt={selectedDest.name} className="w-20 h-20 rounded-xl object-cover" />
                <div>
                  <p className="text-xs text-muted-foreground">Destination sélectionnée</p>
                  <h2 className="text-2xl font-serif font-bold text-foreground">{selectedDest.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {selectedDest.region}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setSelectedSlug(null); setQuery(""); }}
                className="text-sm text-primary hover:underline font-medium"
              >
                ← Changer de destination
              </button>
            </div>

            {/* Filtres */}
            <div className="bg-card rounded-2xl border border-border p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-foreground">Durée du séjour</label>
                  <span className="text-sm font-bold text-primary">{nights} nuits</span>
                </div>
                <Slider
                  value={[nights]}
                  onValueChange={(v) => setNights(v[0])}
                  min={2} max={14} step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>2 nuits</span>
                  <span>14 nuits</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Leaf className="h-4 w-4 text-primary" /> Budget CO₂ max
                  </label>
                  <span className="text-sm font-bold text-primary">{co2Budget} kg</span>
                </div>
                <Slider
                  value={[co2Budget]}
                  onValueChange={(v) => setCo2Budget(v[0])}
                  min={Math.max(50, Math.floor(minCo2))}
                  max={Math.ceil(maxCo2)}
                  step={10}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{Math.floor(minCo2)} kg (min)</span>
                  <span>{Math.ceil(maxCo2)} kg (max)</span>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-serif font-bold text-foreground">
                  {filteredCombos.length} option{filteredCombos.length > 1 ? "s" : ""} triée{filteredCombos.length > 1 ? "s" : ""} par score carbone
                </h2>
                <span className="text-xs text-muted-foreground hidden md:inline">Top 3 affichées</span>
              </div>

              {filteredCombos.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-2xl border border-dashed border-border">
                  <Leaf className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">Aucune combinaison sous {co2Budget} kg de CO₂.<br />Augmentez votre budget pour voir des options.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {filteredCombos.map((c, idx) => {
                    const Icon = transportIcons[c.transport.type];
                    const isBest = idx === 0;
                    return (
                      <div
                        key={c.id}
                        className={`bg-card rounded-2xl border p-5 flex flex-col ${isBest ? "border-2 border-primary shadow-lg relative" : "border-border"}`}
                      >
                        {isBest && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> Meilleur choix carbone
                          </span>
                        )}

                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-sm font-bold px-3 py-1 rounded-full ${scoreColor(c.ecoScore)}`}>
                            Score {c.ecoScore}
                          </span>
                          <span className="text-xs text-muted-foreground">{c.totalCo2} kg CO₂</span>
                        </div>

                        {/* Transport */}
                        <div className="border border-border rounded-xl p-4 mb-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Icon className="h-4 w-4 text-primary" /> Transport
                          </div>
                          <p className="font-semibold text-foreground">{c.transport.label}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.transport.duration}</span>
                            <span className="flex items-center gap-1"><Leaf className="h-3 w-3" /> {c.transport.co2} kg</span>
                            <span className="flex items-center gap-1"><Euro className="h-3 w-3" /> {c.transport.price}€</span>
                          </div>
                        </div>

                        {/* Hôtel */}
                        <div className="border border-border rounded-xl p-4 mb-4 flex-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Award className="h-4 w-4 text-primary" /> Hébergement certifié
                          </div>
                          <p className="font-semibold text-foreground">{c.hotel.name}</p>
                          <span className="inline-flex items-center gap-1 mt-1.5 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" /> {c.hotel.certification}
                          </span>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {c.hotel.rating}</span>
                            <span>{c.hotel.pricePerNight}€/nuit</span>
                            <span>{nights} nuits</span>
                          </div>
                        </div>

                        {/* Total + CTA */}
                        <div className="border-t border-border pt-4 mt-auto">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-muted-foreground">Total / pers.</span>
                            <span className="text-2xl font-bold text-foreground">{c.totalPrice}€</span>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedCombo(c);
                              toast.success(`Combinaison sélectionnée : ${c.transport.label} + ${c.hotel.name}`);
                            }}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-opacity flex items-center justify-center gap-2 ${isBest ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:bg-accent"}`}
                          >
                            Valider cette option <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Stats globales */}
              {filteredCombos.length > 0 && (
                <div className="mt-8 bg-accent/30 rounded-2xl p-6 border border-border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Empreinte minimale</p>
                      <p className="text-2xl font-bold text-primary">{filteredCombos[0].totalCo2} kg CO₂</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Économie vs. avion + hôtel standard</p>
                      <p className="text-2xl font-bold text-primary">
                        -{Math.max(0, Math.round(((maxCo2 - filteredCombos[0].totalCo2) / maxCo2) * 100))}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Arbres compensés</p>
                      <p className="text-2xl font-bold text-primary">{Math.ceil(filteredCombos[0].totalCo2 / 40)} 🌳</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedCombo && selectedDest && (
        <ReservationModal
          isOpen={!!selectedCombo}
          onClose={() => setSelectedCombo(null)}
          item={{
            name: `${selectedDest.name} – ${selectedCombo.transport.label} + ${selectedCombo.hotel.name}`,
            price: `${selectedCombo.totalPrice}€`,
            location: selectedDest.region,
            image: selectedDest.image,
          }}
          type="hébergement"
        />
      )}
    </div>
  );
};

export default Planner;
