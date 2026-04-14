import destCostarica from "@/assets/dest-costarica.jpg";
import destLisbonne from "@/assets/dest-lisbonne.jpg";
import destIslande from "@/assets/dest-islande.jpg";
import destThailande from "@/assets/dest-thailande.jpg";
import destKenya from "@/assets/dest-kenya.jpg";
import destNorvege from "@/assets/dest-norvege.jpg";
import ecolodge1 from "@/assets/ecolodge-1.jpg";
import ecolodge2 from "@/assets/ecolodge-2.jpg";

export interface Destination {
  slug: string;
  name: string;
  region: string;
  image: string;
  score: string;
  rating: number;
  reviews: number;
  co2: string;
  price: string;
  tags: string[];
  description: string;
  longDescription: string;
  highlights: string[];
  bestSeason: string;
  avgTemp: string;
  currency: string;
}

export const destinations: Destination[] = [
  {
    slug: "costa-rica", name: "Costa Rica", region: "Amérique", image: destCostarica, score: "A+", rating: 4.9, reviews: 234, co2: "Faible", price: "À partir de 89€/nuit", tags: ["Éco-lodge", "Randonnée", "Biodiversité"],
    description: "Explorez la biodiversité exceptionnelle du Costa Rica à travers des hébergements 100% éco-responsables.",
    longDescription: "Le Costa Rica est un véritable paradis pour les amoureux de la nature et du tourisme durable. Avec plus de 25% de son territoire protégé, ce petit pays d'Amérique centrale abrite 5% de la biodiversité mondiale. Des forêts tropicales luxuriantes aux plages immaculées, chaque recoin offre une expérience unique. Les éco-lodges certifiés vous accueillent dans un cadre respectueux de l'environnement, utilisant l'énergie solaire et des pratiques de permaculture.",
    highlights: ["Parc national du Corcovado", "Volcan Arenal", "Plages de Nicoya", "Réserve de Monteverde", "Tortuguero"],
    bestSeason: "Décembre à Avril", avgTemp: "24-30°C", currency: "Colón (CRC)"
  },
  {
    slug: "lisbonne", name: "Lisbonne", region: "Europe", image: destLisbonne, score: "A", rating: 4.7, reviews: 189, co2: "Très faible", price: "À partir de 65€/nuit", tags: ["Culture", "Gastronomie", "Plage"],
    description: "Découvrez la capitale portugaise et ses initiatives durables en matière de tourisme vert.",
    longDescription: "Lisbonne, la capitale ensoleillée du Portugal, s'impose comme une destination éco-responsable de premier plan en Europe. La ville a investi massivement dans les transports verts, les espaces verts urbains et la gastronomie locale. Explorez les ruelles colorées de l'Alfama, dégustez des pastéis de nata dans une pâtisserie centenaire, et découvrez comment la ville concilie patrimoine historique et innovation durable.",
    highlights: ["Alfama", "Tour de Belém", "Parc des Nations", "Sintra", "Plages de Cascais"],
    bestSeason: "Mai à Octobre", avgTemp: "18-28°C", currency: "Euro (€)"
  },
  {
    slug: "islande", name: "Islande", region: "Europe", image: destIslande, score: "A+", rating: 4.9, reviews: 156, co2: "Faible", price: "À partir de 120€/nuit", tags: ["Géothermie", "Aurores boréales", "Randonnée"],
    description: "Le pays de la géothermie et des paysages lunaires, pionnier du tourisme durable.",
    longDescription: "L'Islande est un laboratoire naturel de durabilité. Alimentée à 100% par les énergies renouvelables (géothermie et hydroélectricité), cette île offre des paysages à couper le souffle : geysers, glaciers, volcans et aurores boréales. Le tourisme y est encadré pour préserver ces écosystèmes fragiles, avec des sentiers balisés et des hébergements respectueux de l'environnement.",
    highlights: ["Cercle d'Or", "Blue Lagoon", "Jökulsárlón", "Landmannalaugar", "Húsavík (baleines)"],
    bestSeason: "Juin à Août / Sept à Mars (aurores)", avgTemp: "0-15°C", currency: "Couronne islandaise (ISK)"
  },
  {
    slug: "thailande", name: "Thaïlande", region: "Asie", image: destThailande, score: "A", rating: 4.8, reviews: 312, co2: "Moyen", price: "À partir de 45€/nuit", tags: ["Temples", "Kayak", "Bio"],
    description: "Entre temples ancestraux et plages paradisiaques, vivez la Thaïlande autrement.",
    longDescription: "La Thaïlande propose une alternative éco-responsable au tourisme de masse. Des communautés locales aux îles préservées, découvrez un pays riche en culture et en nature. Les éco-resorts en bambou, les cours de cuisine bio et les excursions en kayak dans les mangroves offrent des expériences authentiques et respectueuses de l'environnement.",
    highlights: ["Chiang Mai", "Koh Lanta", "Khao Sok", "Ayutthaya", "Pai"],
    bestSeason: "Novembre à Février", avgTemp: "25-35°C", currency: "Baht (THB)"
  },
  {
    slug: "kenya", name: "Kenya", region: "Afrique", image: destKenya, score: "A+", rating: 4.8, reviews: 98, co2: "Moyen", price: "À partir de 110€/nuit", tags: ["Safari", "Communautés locales", "Nature"],
    description: "Safaris éco-responsables au cœur de la savane, en soutien aux communautés locales.",
    longDescription: "Le Kenya est le berceau du safari responsable. Les conservancies communautaires protègent la faune tout en soutenant les populations Maasaï. Des camps éco-luxe alimentés à l'énergie solaire aux randonnées guidées par des rangers locaux, chaque expérience contribue directement à la conservation et au développement communautaire.",
    highlights: ["Masai Mara", "Amboseli", "Lac Nakuru", "Lamu", "Mont Kenya"],
    bestSeason: "Juillet à Octobre", avgTemp: "20-28°C", currency: "Shilling kenyan (KES)"
  },
  {
    slug: "norvege", name: "Norvège", region: "Europe", image: destNorvege, score: "A+", rating: 4.9, reviews: 143, co2: "Faible", price: "À partir de 95€/nuit", tags: ["Fjords", "Énergie verte", "Randonnée"],
    description: "Naviguez les fjords majestueux d'un pays leader en énergie renouvelable.",
    longDescription: "La Norvège est pionnière en matière de tourisme durable avec ses fjords classés UNESCO, ses ferries électriques et ses cabanes traditionnelles en pleine nature. Le pays investit massivement dans les infrastructures vertes et propose des expériences uniques : randonnées sur glacier, observation des baleines responsable et nuits sous les aurores boréales.",
    highlights: ["Geirangerfjord", "Lofoten", "Trolltunga", "Bergen", "Cap Nord"],
    bestSeason: "Mai à Septembre", avgTemp: "5-20°C", currency: "Couronne norvégienne (NOK)"
  },
  {
    slug: "bali", name: "Bali", region: "Asie", image: ecolodge1, score: "A", rating: 4.7, reviews: 267, co2: "Moyen", price: "À partir de 55€/nuit", tags: ["Yoga", "Rizières", "Éco-resort"],
    description: "Retraites éco-responsables entre rizières en terrasses et temples millénaires.",
    longDescription: "Bali, l'île des dieux, offre un cadre idéal pour une retraite éco-responsable. Les rizières en terrasses de Tegallalang, les temples ancestraux et les éco-resorts en bambou créent une atmosphère unique. Yoga au lever du soleil, cuisine bio locale et artisanat traditionnel : Bali conjugue bien-être et respect de l'environnement.",
    highlights: ["Ubud", "Tegallalang", "Temple Uluwatu", "Mont Batur", "Amed"],
    bestSeason: "Avril à Octobre", avgTemp: "27-30°C", currency: "Roupie indonésienne (IDR)"
  },
  {
    slug: "nouvelle-zelande", name: "Nouvelle-Zélande", region: "Océanie", image: ecolodge2, score: "A+", rating: 4.9, reviews: 121, co2: "Élevé", price: "À partir de 130€/nuit", tags: ["Nature", "Aventure", "Éco-tourisme"],
    description: "L'aventure au bout du monde dans un pays qui protège ses écosystèmes uniques.",
    longDescription: "La Nouvelle-Zélande est un modèle mondial de conservation avec ses parcs nationaux spectaculaires, sa faune unique (kiwis, dauphins) et son engagement envers le tourisme régénératif. Des Great Walks aux fjords du Milford Sound, chaque aventure est pensée pour minimiser l'impact tout en maximisant l'émerveillement.",
    highlights: ["Milford Sound", "Tongariro Alpine", "Abel Tasman", "Rotorua", "Queenstown"],
    bestSeason: "Décembre à Mars", avgTemp: "15-25°C", currency: "Dollar néo-zélandais (NZD)"
  },
];
