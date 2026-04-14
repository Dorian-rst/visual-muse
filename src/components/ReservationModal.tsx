import { useState } from "react";
import { X, Calendar, Users, Check, Leaf } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    price: string;
    location: string;
    image: string;
  };
  type: "activité" | "hébergement";
}

const ReservationModal = ({ isOpen, onClose, item, type }: ReservationModalProps) => {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
  };

  const handleClose = () => {
    setStep("form");
    setDate("");
    setGuests(2);
    setName("");
    setEmail("");
    onClose();
  };

  const priceNum = parseInt(item.price.replace(/[^\d]/g, ""));
  const total = priceNum * guests;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-border animate-in fade-in zoom-in-95 duration-200">
        <button onClick={handleClose} className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors">
          <X className="h-5 w-5" />
        </button>

        {step === "form" ? (
          <>
            <div className="relative h-40 overflow-hidden rounded-t-2xl">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-xs opacity-80 mb-1">{item.location}</p>
                <h3 className="font-serif font-bold text-lg">{item.name}</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <h2 className="text-xl font-serif font-bold text-foreground">
                Réserver {type === "activité" ? "cette activité" : "cet hébergement"}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    <Calendar className="h-3.5 w-3.5 inline mr-1.5" />
                    {type === "hébergement" ? "Date d'arrivée" : "Date"}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    <Users className="h-3.5 w-3.5 inline mr-1.5" />
                    Participants
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "personne" : "personnes"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Nom complet</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@email.com"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="bg-secondary rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{item.price} × {guests} {guests === 1 ? "personne" : "personnes"}</span>
                  <span>{total}€</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Frais de service</span>
                  <span>0€</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span>{total}€</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Leaf className="h-4 w-4" />
                Confirmer la réservation
              </button>
              <p className="text-xs text-muted-foreground text-center">Annulation gratuite jusqu'à 48h avant</p>
            </form>
          </>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground">Réservation confirmée !</h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Votre réservation pour <strong>{item.name}</strong> le <strong>{date}</strong> pour <strong>{guests} {guests === 1 ? "personne" : "personnes"}</strong> a bien été enregistrée.
            </p>
            <p className="text-sm text-muted-foreground">Un email de confirmation a été envoyé à <strong>{email}</strong></p>
            <div className="bg-accent rounded-xl p-4 inline-flex items-center gap-2 text-sm text-primary font-medium">
              <Leaf className="h-4 w-4" />
              Merci de voyager de manière responsable 🌍
            </div>
            <button onClick={handleClose} className="block mx-auto mt-4 text-sm text-primary hover:underline">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
