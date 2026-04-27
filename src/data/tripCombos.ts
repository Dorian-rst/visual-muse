import { destinations } from "./destinations";

export type TransportType = "train" | "bus" | "vol-direct" | "vol-escale" | "covoiturage";
export type HotelCertification = "Écotable" | "Green Key" | "Clef Verte" | "EU Ecolabel" | "Biosphere";

export interface TransportOption {
  type: TransportType;
  label: string;
  duration: string;
  co2: number; // kg CO₂ par personne
  price: number; // €
}

export interface HotelOption {
  name: string;
  certification: HotelCertification;
  pricePerNight: number;
  co2PerNight: number;
  rating: number;
}

export interface TripCombo {
  id: string;
  destinationSlug: string;
  transport: TransportOption;
  hotel: HotelOption;
  nights: number;
  totalCo2: number;
  totalPrice: number;
  ecoScore: "A+" | "A" | "B" | "C";
}

// Transport options par destination (depuis Paris)
const transportByDest: Record<string, TransportOption[]> = {
  "lisbonne": [
    { type: "train", label: "Train + Ferry", duration: "22h", co2: 35, price: 145 },
    { type: "vol-direct", label: "Vol direct", duration: "2h35", co2: 178, price: 110 },
    { type: "vol-escale", label: "Vol avec escale", duration: "5h10", co2: 245, price: 89 },
  ],
  "islande": [
    { type: "vol-direct", label: "Vol direct", duration: "3h45", co2: 320, price: 240 },
    { type: "vol-escale", label: "Vol avec escale", duration: "7h20", co2: 410, price: 195 },
  ],
  "norvege": [
    { type: "train", label: "Train + Ferry", duration: "32h", co2: 58, price: 220 },
    { type: "vol-direct", label: "Vol direct", duration: "2h45", co2: 195, price: 165 },
    { type: "vol-escale", label: "Vol avec escale", duration: "5h30", co2: 280, price: 130 },
  ],
  "costa-rica": [
    { type: "vol-direct", label: "Vol direct", duration: "11h30", co2: 1450, price: 720 },
    { type: "vol-escale", label: "Vol avec escale", duration: "15h", co2: 1680, price: 590 },
  ],
  "thailande": [
    { type: "vol-direct", label: "Vol direct", duration: "11h15", co2: 1620, price: 680 },
    { type: "vol-escale", label: "Vol avec escale", duration: "16h30", co2: 1890, price: 545 },
  ],
  "kenya": [
    { type: "vol-direct", label: "Vol direct", duration: "8h45", co2: 1280, price: 690 },
    { type: "vol-escale", label: "Vol avec escale", duration: "13h", co2: 1490, price: 560 },
  ],
  "bali": [
    { type: "vol-escale", label: "Vol avec escale", duration: "18h", co2: 2100, price: 780 },
  ],
  "nouvelle-zelande": [
    { type: "vol-escale", label: "Vol avec escale", duration: "26h", co2: 3200, price: 1290 },
  ],
};

// Hôtels par destination
const hotelsByDest: Record<string, HotelOption[]> = {
  "lisbonne": [
    { name: "Casa Verde Alfama", certification: "Écotable", pricePerNight: 95, co2PerNight: 8, rating: 4.8 },
    { name: "Eco Boutique Príncipe Real", certification: "Clef Verte", pricePerNight: 110, co2PerNight: 11, rating: 4.7 },
    { name: "Lisbon Green Hostel", certification: "EU Ecolabel", pricePerNight: 55, co2PerNight: 6, rating: 4.5 },
  ],
  "islande": [
    { name: "Reykjavik Eco Lodge", certification: "Green Key", pricePerNight: 165, co2PerNight: 4, rating: 4.9 },
    { name: "Geothermal Retreat", certification: "Biosphere", pricePerNight: 220, co2PerNight: 3, rating: 4.8 },
  ],
  "norvege": [
    { name: "Fjord Cabin Geiranger", certification: "Green Key", pricePerNight: 140, co2PerNight: 5, rating: 4.9 },
    { name: "Bergen Eco Hotel", certification: "EU Ecolabel", pricePerNight: 125, co2PerNight: 9, rating: 4.7 },
  ],
  "costa-rica": [
    { name: "Lapa Rios Ecolodge", certification: "Biosphere", pricePerNight: 180, co2PerNight: 7, rating: 4.9 },
    { name: "Finca Rosa Blanca", certification: "Green Key", pricePerNight: 145, co2PerNight: 10, rating: 4.8 },
    { name: "Monteverde Eco Inn", certification: "Écotable", pricePerNight: 89, co2PerNight: 12, rating: 4.6 },
  ],
  "thailande": [
    { name: "Bamboo Bay Eco Resort", certification: "Green Key", pricePerNight: 75, co2PerNight: 14, rating: 4.7 },
    { name: "Khao Sok Treehouse", certification: "Biosphere", pricePerNight: 65, co2PerNight: 9, rating: 4.8 },
  ],
  "kenya": [
    { name: "Mara Eco Camp", certification: "Biosphere", pricePerNight: 195, co2PerNight: 11, rating: 4.9 },
    { name: "Amboseli Tented Camp", certification: "Green Key", pricePerNight: 165, co2PerNight: 13, rating: 4.7 },
  ],
  "bali": [
    { name: "Bambu Indah Ubud", certification: "Biosphere", pricePerNight: 120, co2PerNight: 8, rating: 4.9 },
    { name: "Green School Stay", certification: "Green Key", pricePerNight: 85, co2PerNight: 10, rating: 4.7 },
  ],
  "nouvelle-zelande": [
    { name: "Milford Eco Lodge", certification: "Biosphere", pricePerNight: 175, co2PerNight: 12, rating: 4.9 },
  ],
};

const computeScore = (co2Total: number): "A+" | "A" | "B" | "C" => {
  if (co2Total < 200) return "A+";
  if (co2Total < 800) return "A";
  if (co2Total < 1800) return "B";
  return "C";
};

export const buildCombos = (destinationSlug: string, nights: number = 5): TripCombo[] => {
  const transports = transportByDest[destinationSlug] || [];
  const hotels = hotelsByDest[destinationSlug] || [];
  const combos: TripCombo[] = [];

  transports.forEach((t) => {
    hotels.forEach((h) => {
      const totalCo2 = t.co2 + h.co2PerNight * nights;
      const totalPrice = t.price + h.pricePerNight * nights;
      combos.push({
        id: `${destinationSlug}-${t.type}-${h.name.replace(/\s+/g, "-")}`,
        destinationSlug,
        transport: t,
        hotel: h,
        nights,
        totalCo2,
        totalPrice,
        ecoScore: computeScore(totalCo2),
      });
    });
  });

  return combos.sort((a, b) => a.totalCo2 - b.totalCo2);
};

export const searchDestinations = (query: string) => {
  if (!query.trim()) return destinations;
  const q = query.toLowerCase();
  return destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
  );
};
