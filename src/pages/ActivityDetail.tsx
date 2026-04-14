import { useParams, Link } from "react-router-dom";
import { Leaf, MapPin, Star, ArrowLeft, ArrowRight, Clock, Users, Check, X as XIcon, Gauge } from "lucide-react";
import { activities } from "@/data/activities";
import ReservationModal from "@/components/ReservationModal";
import { useState } from "react";

const ActivityDetail = () => {
  const { slug } = useParams();
  const act = activities.find((a) => a.slug === slug);
  const [showReservation, setShowReservation] = useState(false);

  if (!act) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Activité introuvable</h1>
          <Link to="/activites" className="text-primary hover:underline">← Retour aux activités</Link>
        </div>
      </div>
    );
  }

  const otherActs = activities.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-serif font-bold text-foreground">BackToEarth</span>
          </Link>
          <Link to="/activites" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Toutes les activités
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Leaf className="h-3 w-3" /> {act.score}
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
              {act.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{act.name}</h1>
          <p className="text-white/80 text-lg flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {act.location}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-accent/50 rounded-xl p-4 text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Durée</p>
                <p className="font-bold text-foreground">{act.duration}</p>
              </div>
              <div className="bg-accent/50 rounded-xl p-4 text-center">
                <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Groupe</p>
                <p className="font-bold text-foreground">{act.groupSize} pers.</p>
              </div>
              <div className="bg-accent/50 rounded-xl p-4 text-center">
                <Gauge className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Difficulté</p>
                <p className="font-bold text-foreground">{act.difficulty}</p>
              </div>
              <div className="bg-accent/50 rounded-xl p-4 text-center">
                <Star className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Note</p>
                <p className="font-bold text-foreground">{act.rating}/5</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{act.longDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" /> Inclus
                </h3>
                <ul className="space-y-2">
                  {act.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3 flex items-center gap-2">
                  <XIcon className="h-5 w-5 text-destructive" /> Non inclus
                </h3>
                <ul className="space-y-2">
                  {act.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XIcon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {act.tags.map((tag) => (
                <span key={tag} className="bg-accent text-accent-foreground text-sm px-4 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-5 sticky top-20">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-foreground">{act.price}<span className="text-base font-normal text-muted-foreground">/pers.</span></p>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{act.rating}</span>
                  <span className="text-muted-foreground text-sm">({act.reviews})</span>
                </div>
              </div>

              <button
                onClick={() => setShowReservation(true)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Réserver maintenant <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-xs text-muted-foreground text-center">Annulation gratuite jusqu'à 48h avant</p>
            </div>

            <div className="bg-accent/30 rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-primary" />
                <h3 className="font-serif font-bold text-foreground">Engagement éco</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Score écologique : <strong className="text-foreground">{act.score}</strong>. Cette activité respecte les principes du tourisme durable et soutient directement les communautés locales.
              </p>
            </div>
          </div>
        </div>

        {/* Other activities */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Autres activités</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherActs.map((a) => (
              <Link key={a.slug} to={`/activites/${a.slug}`} className="bg-card rounded-2xl overflow-hidden border border-border group hover:shadow-lg transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Leaf className="h-3 w-3" /> {a.score}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-foreground">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">{a.location} • {a.price}/pers.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={showReservation}
        onClose={() => setShowReservation(false)}
        item={{ name: act.name, price: act.price, location: act.location, image: act.image }}
        type="activité"
      />
    </div>
  );
};

export default ActivityDetail;
