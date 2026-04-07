import { ArrowRight, Plane, Calendar, Users, Leaf } from "lucide-react";

const flights = [
  { airline: "EcoAir France", route: "CDG → LIS", duration: "2h 35min", type: "Direct", score: "A", scoreColor: "bg-primary", co2: "85 kg CO₂", price: "129€", highlight: true },
  { airline: "TAP Portugal", route: "CDG → LIS", duration: "2h 40min", type: "Direct", score: "B", scoreColor: "bg-earth-olive", co2: "102 kg CO₂", price: "99€", highlight: false },
];

const ComparatorSection = () => {
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
            Comparez les compagnies aériennes selon leur empreinte carbone et trouvez l'option la plus écologique pour votre voyage.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Départ</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
                <Plane className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Paris (CDG)</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Arrivée</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
                <Plane className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Lisbonne (LIS)</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Date</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">15 Jan 2025</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Passagers</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">2 adultes</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            Rechercher les vols
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {flights.map((flight) => (
            <div
              key={flight.airline}
              className={`bg-card rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${flight.highlight ? "border-2 border-primary shadow-md" : "border border-border"}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Plane className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{flight.airline}</p>
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
                  <p className="text-xs text-muted-foreground">par personne</p>
                </div>
                <button className={`px-5 py-2 rounded-lg text-sm font-semibold transition-opacity ${flight.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:bg-accent"}`}>
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-card rounded-xl p-6 border border-border">
          <h3 className="font-serif font-bold text-foreground text-lg mb-3">Calculez l'impact de votre prochain voyage</h3>
          <p className="text-sm text-muted-foreground mb-5">Nous compensons automatiquement 100% de vos émissions via nos programmes partenaires</p>
          <div className="relative mb-2">
            <div className="w-full h-3 bg-accent rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "42%" }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0 kg CO₂</span>
              <span className="font-semibold text-foreground">Votre impact: 85 kg</span>
              <span>200 kg CO₂</span>
            </div>
          </div>
          <div className="flex items-start gap-3 mt-5 bg-accent/50 rounded-lg p-4">
            <Leaf className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Compensation automatique incluse</p>
              <p className="text-xs text-muted-foreground">2 arbres seront plantés pour ce voyage via notre partenaire ReforestAction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparatorSection;
