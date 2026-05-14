import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles, Leaf, Plane, Gauge } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Person = { age: string };

type Trip = {
  title: string;
  region: string;
  description: string;
  budget: number;
  co2: number;
  miles: number;
  vibe: string;
  ecoScore: "A+" | "A";
};

const MEMORY_OPTIONS = [
  { id: "nature", label: "Communion avec la nature", emoji: "🌿" },
  { id: "rencontres", label: "Rencontres locales", emoji: "🤝" },
  { id: "aventure", label: "Sensations & aventure", emoji: "🧗" },
  { id: "deconnexion", label: "Déconnexion totale", emoji: "🧘" },
  { id: "culture", label: "Immersion culturelle", emoji: "🏛️" },
  { id: "gastronomie", label: "Saveurs & gastronomie", emoji: "🍷" },
  { id: "faune", label: "Observation de la faune", emoji: "🐋" },
  { id: "contemplation", label: "Paysages à couper le souffle", emoji: "🏔️" },
];

const buildTrips = (memory: string[], budgetMin: number, budgetMax: number, people: Person[], comfort: number): Trip[] => {
  const avg = (budgetMin + budgetMax) / 2 || 800;
  const n = Math.max(people.length, 1);
  const base = Math.round(avg);

  const easy: Trip = {
    title: "Cabane perchée en Cévennes",
    region: "France · Train de nuit",
    description: "Réveil dans la canopée, randonnées guidées et table fermière 100% locale. Idéal pour décrocher en douceur.",
    budget: Math.round(base * 0.75 * n),
    co2: 32 * n,
    miles: 410,
    vibe: "Doux & ressourçant",
    ecoScore: "A+",
  };
  const medium: Trip = {
    title: "Éco-village des fjords norvégiens",
    region: "Norvège · Ferry + train",
    description: "Kayak entre les fjords, sauna scandinave, hébergement passif alimenté à l'hydroélectrique.",
    budget: Math.round(base * 1.0 * n),
    co2: 95 * n,
    miles: 1380,
    vibe: "Aventure mesurée",
    ecoScore: "A",
  };
  const bold: Trip = {
    title: "Réserve communautaire au Costa Rica",
    region: "Amérique Centrale · Vol compensé",
    description: "Immersion dans une réserve gérée par les Bribris, nuits en éco-lodge, traversée de la forêt nuageuse.",
    budget: Math.round(base * 1.3 * n),
    co2: 380 * n,
    miles: 5640,
    vibe: "Hors zone de confort",
    ecoScore: "A",
  };

  const trips = [easy, medium, bold];
  if (comfort >= 70) return [bold, medium, easy];
  if (comfort <= 30) return [easy, medium, bold];
  return trips;
};

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [memory, setMemory] = useState<string[]>([]);
  const [budgetMin, setBudgetMin] = useState("500");
  const [budgetMax, setBudgetMax] = useState("1500");
  const [people, setPeople] = useState<Person[]>([{ age: "" }]);
  const [comfort, setComfort] = useState(50);
  const [results, setResults] = useState<Trip[] | null>(null);

  const addPerson = () => people.length < 6 && setPeople([...people, { age: "" }]);
  const removePerson = (i: number) => setPeople(people.filter((_, idx) => idx !== i));
  const updateAge = (i: number, age: string) => setPeople(people.map((p, idx) => (idx === i ? { age } : p)));

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else setResults(buildTrips(memory, Number(budgetMin), Number(budgetMax), people, comfort));
  };
  const back = () => step > 0 && setStep(step - 1);

  const canNext = () => {
    if (step === 0) return memory.trim().length > 0;
    if (step === 1) return Number(budgetMin) > 0 && Number(budgetMax) >= Number(budgetMin);
    if (step === 2) return people.every((p) => Number(p.age) > 0);
    return true;
  };

  if (results) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-28 pb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Voyages surprises</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              3 escapades pensées pour vous
            </h1>
            <p className="text-muted-foreground">Sélectionnées selon vos envies, votre budget et votre soif d'aventure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {results.map((trip, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                <div className="bg-gradient-to-br from-primary/20 to-earth-sage/10 p-6 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Surprise #{i + 1}</span>
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">Éco {trip.ecoScore}</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-foreground mb-1">{trip.title}</h2>
                  <p className="text-sm text-muted-foreground">{trip.region}</p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-foreground/80 mb-6 flex-1">{trip.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground"><Gauge className="h-4 w-4" /> Budget total</span>
                      <span className="font-semibold text-foreground">{trip.budget} €</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground"><Leaf className="h-4 w-4" /> Émissions CO₂</span>
                      <span className="font-semibold text-foreground">{trip.co2} kg</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground"><Plane className="h-4 w-4" /> Distance</span>
                      <span className="font-semibold text-foreground">{trip.miles} miles</span>
                    </div>
                  </div>
                  <span className="text-xs italic text-muted-foreground mb-4">{trip.vibe}</span>
                  <button
                    onClick={() => navigate("/planifier")}
                    className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Planifier ce voyage
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => { setResults(null); setStep(0); }}
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Refaire le test
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Test de personnalité</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Trouvons votre voyage idéal</h1>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Étape {step + 1} sur {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Quels types de souvenirs voulez-vous créer ?</h2>
                <p className="text-sm text-muted-foreground mb-6">Décrivez avec vos mots l'expérience qui vous ferait rêver.</p>
                <textarea
                  value={memory}
                  onChange={(e) => setMemory(e.target.value)}
                  placeholder="Ex : observer une aurore boréale en silence, partager un repas avec une famille locale, dormir dans la canopée…"
                  rows={6}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Quel est votre budget ?</h2>
                <p className="text-sm text-muted-foreground mb-6">Par personne, en euros.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Minimum</label>
                    <input
                      type="number"
                      min="0"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Maximum</label>
                    <input
                      type="number"
                      min="0"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Combien êtes-vous, et quel âge avez-vous ?</h2>
                <p className="text-sm text-muted-foreground mb-6">Ajoutez chaque voyageur du groupe.</p>
                <div className="space-y-3">
                  {people.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground w-24 shrink-0">Personne {i + 1}</span>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={p.age}
                        onChange={(e) => updateAge(i, e.target.value)}
                        placeholder="Âge"
                        className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      {people.length > 1 && (
                        <button onClick={() => removePerson(i)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Retirer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {people.length < 6 && (
                    <button
                      onClick={addPerson}
                      className="w-full flex items-center justify-center gap-2 border border-dashed border-border rounded-lg py-2.5 text-sm font-medium text-primary hover:bg-accent/50 transition-colors"
                    >
                      <Plus className="h-4 w-4" /> Ajouter une personne
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">À quel point êtes-vous prêt à sortir de votre zone de confort ?</h2>
                <p className="text-sm text-muted-foreground mb-8">Glissez la jauge selon votre soif d'aventure.</p>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Cocon douillet</span>
                    <span>Aventurier total</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={comfort}
                    onChange={(e) => setComfort(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="text-center">
                    <span className="text-4xl font-serif font-bold text-primary">{comfort}%</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={back}
                disabled={step === 0}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" /> Précédent
              </button>
              <button
                onClick={next}
                disabled={!canNext()}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === totalSteps - 1 ? "Voir mes voyages" : "Continuer"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
