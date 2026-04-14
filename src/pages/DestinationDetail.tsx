import { useParams, Link } from "react-router-dom";
import { Leaf, MapPin, Star, ArrowLeft, ArrowRight, Calendar, Thermometer, Banknote, Check } from "lucide-react";
import { destinations } from "@/data/destinations";
import ReservationModal from "@/components/ReservationModal";
import { useState } from "react";

const DestinationDetail = () => {
  const { slug } = useParams();
  const dest = destinations.find((d) => d.slug === slug);
  const [showReservation, setShowReservation] = useState(false);

  if (!dest) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Destination introuvable</h1>
          <Link to="/destinations" className="text-primary hover:underline">← Retour aux destinations</Link>
        </div>
      </div>
    );
  }

  const otherDests = destinations.filter((d) => d.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-serif font-bold text-foreground">BackToEarth</span>
          </Link>
          <Link to="/destinations" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Toutes les destinations
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Leaf className="h-3 w-3" /> {dest.score}
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
              CO₂ : {dest.co2}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{dest.name}</h1>
          <p className="text-white/80 text-lg flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {dest.region}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">À propos</h2>
              <p className="text-muted-foreground leading-relaxed">{dest.longDescription}</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Points forts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 bg-accent/50 rounded-xl px-4 py-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm text-foreground font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {dest.tags.map((tag) => (
                <span key={tag} className="bg-accent text-accent-foreground text-sm px-4 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">{dest.price}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{dest.rating}</span>
                  <span className="text-muted-foreground text-sm">({dest.reviews})</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Meilleure saison :</span>
                  <span className="font-medium text-foreground">{dest.bestSeason}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Thermometer className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Température :</span>
                  <span className="font-medium text-foreground">{dest.avgTemp}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Banknote className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Devise :</span>
                  <span className="font-medium text-foreground">{dest.currency}</span>
                </div>
              </div>

              <button
                onClick={() => setShowReservation(true)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Réserver cette destination <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-accent/30 rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-primary" />
                <h3 className="font-serif font-bold text-foreground">Impact environnemental</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Niveau CO₂ : <strong className="text-foreground">{dest.co2}</strong>. Tous les hébergements partenaires sont certifiés éco-responsables et compensent 100% de leurs émissions.
              </p>
            </div>
          </div>
        </div>

        {/* Other destinations */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Autres destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherDests.map((d) => (
              <Link key={d.slug} to={`/destinations/${d.slug}`} className="bg-card rounded-2xl overflow-hidden border border-border group hover:shadow-lg transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> {d.score}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-foreground">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.region} • {d.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={showReservation}
        onClose={() => setShowReservation(false)}
        item={{ name: dest.name, price: dest.price.replace("À partir de ", ""), location: dest.region, image: dest.image }}
        type="hébergement"
      />
    </div>
  );
};

export default DestinationDetail;
