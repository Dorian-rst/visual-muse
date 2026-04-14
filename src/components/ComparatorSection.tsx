import { useState } from "react";
import { ArrowRight, Plane, Calendar, Users, Leaf, Search, ArrowLeftRight } from "lucide-react";

const airports = [
  "Paris (CDG)", "Lisbonne (LIS)", "Bangkok (BKK)", "San José (SJO)", "Reykjavik (KEF)",
  "Nairobi (NBO)", "Oslo (OSL)", "Denpasar (DPS)", "Auckland (AKL)", "Athènes (ATH)",
  "Lyon (LYS)", "Marseille (MRS)", "Nice (NCE)", "Bordeaux (BOD)"
];

interface FlightResult {
  airline: string;
  route: string;
  duration: string;
  type: string;
  score: string;
  scoreColor: string;
  co2: string;
  price: string;
  highlight: boolean;
}

const generateFlights = (from: string, to: string, passengers: number): FlightResult[] => {
  const fromCode = from.match(/\(([^)]+)\)/)?.[1] || "???";
  const toCode = to.match(/\(([^)]+)\)/)?.[1] || "???";
  const route = `${fromCode} → ${toCode}`;

  const airlines = [
    { name: "EcoAir", score: "A", scoreColor: "bg-primary", co2Base: 75, priceBase: 110, duration: "2h 35min" },
    { name: "GreenWings", score: "A+", scoreColor: "bg-primary", co2Base: 62, priceBase: 145, duration: "2h 50min" },
    { name: "SkyConnect", score: "B", scoreColor: "bg-earth-olive", co2Base: 105, priceBase: 85, duration: "2h 20min" },
    { name: "AirNatura", score: "A", scoreColor: "bg-primary", co2Base: 80, priceBase: 125, duration: "3h 10min" },
  ];

  const randomOffset = () => Math.floor(Math.random() * 40) - 20;

  return airlines.map((a, i) => ({
    airline: a.name,
    route,
    duration: a.duration,
    type: i === 3 ? "1 escale" : "Direct",
    score: a.score,
    scoreColor: a.scoreColor,
    co2: `${a.co2Base + randomOffset()} kg CO₂`,
    price: `${(a.priceBase + randomOffset()) * passengers}€`,
    highlight: i === 1,
  })).sort((a, b) => {
    const scoreOrder: Record<string, number> = { "A+": 0, "A": 1, "B": 2, "C": 3 };
    return (scoreOrder[a.score] || 9) - (scoreOrder[b.score] || 9);
  });
};

const ComparatorSection = () => {
  const [from, setFrom] = useState("Paris (CDG)");
  const [to, setTo] = useState("Lisbonne (LIS)");
  const [date, setDate] = useState("2026-06-15");
  const [passengers, setPassengers] = useState(2);
  const [results, setResults] = useState<FlightResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (from === to) return;
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      setResults(generateFlights(from, to, passengers));
      setSearched(true);
      setLoading(false);
    }, 1200);
  };

  const bestCo2 = results.length > 0 ? Math.min(...results.map(r => parseInt(r.co2))) : 0;

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-6">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Comparateur de vols</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Trouvez le vol le plus <span className="italic text-primary">responsable</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Comparez les compagnies aériennes selon leur empreinte carbone et trouvez l'option la plus écologique.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Départ</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none">
                  {airports.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Arrivée</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none">
                  {airports.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Passagers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none">
                  {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? "adulte" : "adultes"}</option>)}
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={from === to || loading}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Recherche en cours...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Rechercher les vols
              </>
            )}
          </button>
          {from === to && <p className="text-xs text-destructive mt-2">Veuillez choisir des villes différentes.</p>}
        </div>

        {searched && results.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-muted-foreground mb-2">{results.length} vols trouvés • Triés par score écologique</p>
            {results.map((flight) => (
              <div
                key={flight.airline}
                className={`bg-card rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${flight.highlight ? "border-2 border-primary shadow-md" : "border border-border"}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Plane className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-sm">{flight.airline}</p>
                      {flight.highlight && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Recommandé</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{flight.route} • {flight.duration} • {flight.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className={`${flight.scoreColor} text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full`}>
                      Score {flight.score}
                    </span>
                    <span className="text-xs text-muted-foreground">~{flight.co2}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{flight.price}</p>
                    <p className="text-xs text-muted-foreground">{passengers > 1 ? `${passengers} passagers` : "par personne"}</p>
                  </div>
                  <button className={`px-5 py-2 rounded-lg text-sm font-semibold transition-opacity ${flight.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:bg-accent"}`}>
                    Réserver
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-card rounded-xl p-6 border border-border mt-6">
              <h3 className="font-serif font-bold text-foreground text-lg mb-3">Impact de votre vol</h3>
              <p className="text-sm text-muted-foreground mb-5">Nous compensons automatiquement 100% de vos émissions via nos programmes partenaires</p>
              <div className="relative mb-2">
                <div className="w-full h-3 bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${Math.min((bestCo2 / 200) * 100, 100)}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 kg CO₂</span>
                  <span className="font-semibold text-foreground">Meilleur : {bestCo2} kg</span>
                  <span>200 kg CO₂</span>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-5 bg-accent/50 rounded-lg p-4">
                <Leaf className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Compensation automatique incluse</p>
                  <p className="text-xs text-muted-foreground">{Math.ceil(bestCo2 / 40)} arbres seront plantés pour ce voyage via notre partenaire ReforestAction</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!searched && !loading && (
          <div className="max-w-3xl mx-auto text-center py-12">
            <ArrowLeftRight className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Sélectionnez vos villes et lancez la recherche pour comparer les vols.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparatorSection;
