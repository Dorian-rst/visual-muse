import actRandonnee from "@/assets/act-randonnee.jpg";
import actSnorkeling from "@/assets/act-snorkeling.jpg";
import actFerme from "@/assets/act-ferme.jpg";
import actYoga from "@/assets/act-yoga.jpg";
import actOiseaux from "@/assets/act-oiseaux.jpg";
import actVelo from "@/assets/act-velo.jpg";
import ecolodge2 from "@/assets/ecolodge-2.jpg";
import ecolodge1 from "@/assets/ecolodge-1.jpg";

export interface Activity {
  slug: string;
  name: string;
  image: string;
  category: string;
  location: string;
  score: string;
  price: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  description: string;
  longDescription: string;
  tags: string[];
  included: string[];
  notIncluded: string[];
  difficulty: string;
}

export const activities: Activity[] = [
  {
    slug: "randonnee-foret-tropicale", name: "Randonnée en forêt tropicale", image: actRandonnee, category: "Aventure", location: "Costa Rica", score: "A+", price: "35€", duration: "4h", groupSize: "2-12", rating: 4.9, reviews: 87,
    description: "Parcourez les sentiers de la forêt tropicale avec un guide naturaliste certifié. Observation de la faune et flore endémiques.",
    longDescription: "Plongez au cœur de la forêt tropicale costaricienne lors d'une randonnée immersive de 4 heures. Accompagné d'un guide naturaliste certifié, vous découvrirez un écosystème d'une richesse incroyable : toucans, paresseux, grenouilles dendrobates, orchidées sauvages... Le sentier traverse des ponts suspendus offrant une vue panoramique sur la canopée. Cette activité a un impact carbone nul et soutient directement la conservation de la réserve.",
    tags: ["Zéro émission", "Guide local", "Petit groupe"],
    included: ["Guide naturaliste certifié", "Eau et collation bio", "Jumelles d'observation", "Poncho de pluie", "Assurance"],
    notIncluded: ["Transport jusqu'au point de départ", "Pourboires", "Photos professionnelles (en option)"],
    difficulty: "Modéré"
  },
  {
    slug: "kayak-mangrove", name: "Kayak dans la mangrove", image: ecolodge2, category: "Aventure", location: "Thaïlande", score: "A", price: "45€", duration: "3h", groupSize: "2-8", rating: 4.8, reviews: 124,
    description: "Explorez les mangroves en kayak, un écosystème fragile et fascinant. Activité silencieuse respectueuse de la faune.",
    longDescription: "Glissez silencieusement en kayak à travers les mangroves thaïlandaises, un écosystème essentiel pour la biodiversité marine. Votre guide local vous expliquera le rôle crucial des mangroves dans la protection côtière et la nurserie des poissons. Vous observerez crabes, oiseaux migrateurs et peut-être même des loutres. Une expérience sans moteur, 100% respectueuse de cet environnement fragile.",
    tags: ["Sans moteur", "Éducatif", "Faune marine"],
    included: ["Kayak double", "Guide local bilingue", "Gilet de sauvetage", "Bouteille d'eau réutilisable", "Briefing sécurité"],
    notIncluded: ["Transport", "Crème solaire (apportez une crème bio)", "Pourboires"],
    difficulty: "Facile"
  },
  {
    slug: "snorkeling-recif", name: "Snorkeling récif corallien", image: actSnorkeling, category: "Nature", location: "Bali", score: "A", price: "40€", duration: "2h30", groupSize: "4-10", rating: 4.7, reviews: 203,
    description: "Plongée avec masque et tuba sur des récifs protégés. Sensibilisation à la préservation des coraux.",
    longDescription: "Découvrez les merveilles sous-marines de Bali lors d'une session de snorkeling encadrée sur un récif corallien protégé. Un biologiste marin vous accompagne pour identifier les espèces et vous sensibiliser à la fragilité des coraux. L'activité inclut un briefing sur les gestes à adopter pour ne pas endommager le récif. Chaque participant contribue au programme de surveillance des coraux.",
    tags: ["Récif protégé", "Éducatif", "Petit groupe"],
    included: ["Équipement snorkeling", "Biologiste marin", "Briefing environnemental", "Photos sous-marines", "Donation programme coraux"],
    notIncluded: ["Transport bateau (15€)", "Combinaison néoprène (en option)", "Pourboires"],
    difficulty: "Facile"
  },
  {
    slug: "yoga-meditation", name: "Yoga & méditation en pleine nature", image: actYoga, category: "Bien-être", location: "Bali", score: "A+", price: "25€", duration: "1h30", groupSize: "2-15", rating: 4.9, reviews: 156,
    description: "Séances de yoga au lever du soleil sur une terrasse face aux rizières. Connexion profonde avec la nature.",
    longDescription: "Éveillez vos sens lors d'une séance de yoga et méditation au lever du soleil, sur une terrasse en teck surplombant les rizières de Tegallalang. Le professeur certifié adapte la pratique à tous les niveaux, mêlant hatha yoga, pranayama et méditation guidée. Un thé aux herbes bio est servi après la séance. Cette expérience unique vous reconnecte profondément à la nature et à vous-même.",
    tags: ["Plein air", "Lever de soleil", "Tous niveaux"],
    included: ["Tapis et accessoires yoga", "Professeur certifié", "Thé bio après séance", "Serviette", "Accès terrasse"],
    notIncluded: ["Transport", "Petit-déjeuner (disponible sur place)", "Pourboires"],
    difficulty: "Facile"
  },
  {
    slug: "ferme-biologique", name: "Visite ferme biologique", image: actFerme, category: "Culture", location: "Provence, France", score: "A+", price: "30€", duration: "3h", groupSize: "4-20", rating: 4.8, reviews: 92,
    description: "Découvrez une ferme bio locale : cueillette, dégustation et atelier cuisine avec des produits de saison.",
    longDescription: "Immergez-vous dans le quotidien d'une ferme biologique provençale. Commencez par une visite des cultures et du potager, puis participez à la cueillette de fruits et légumes de saison. L'atelier cuisine vous apprend à préparer un repas 100% local que vous dégusterez ensemble. Le fermier partage sa passion pour l'agriculture régénérative et les circuits courts.",
    tags: ["Bio", "Local", "Dégustation"],
    included: ["Visite guidée complète", "Cueillette", "Atelier cuisine", "Dégustation repas", "Panier de produits à emporter"],
    notIncluded: ["Transport", "Boissons alcoolisées", "Pourboires"],
    difficulty: "Facile"
  },
  {
    slug: "observation-oiseaux", name: "Observation des oiseaux", image: actOiseaux, category: "Nature", location: "Costa Rica", score: "A+", price: "28€", duration: "3h", groupSize: "2-8", rating: 4.9, reviews: 67,
    description: "Avec un ornithologue expert, observez les espèces rares dans leur habitat naturel au petit matin.",
    longDescription: "Partez au petit matin avec un ornithologue expert pour observer les espèces les plus rares du Costa Rica : quetzal resplendissant, toucan à carène, colibris... Le silence de l'aube offre les meilleures conditions d'observation. Votre guide vous apprendra à identifier les chants et comportements de chaque espèce. Un carnet d'observation est fourni pour garder une trace de vos découvertes.",
    tags: ["Faune locale", "Expert", "Aube"],
    included: ["Ornithologue expert", "Jumelles professionnelles", "Carnet d'observation", "Café et viennoiseries", "Liste des espèces"],
    notIncluded: ["Appareil photo", "Transport", "Pourboires"],
    difficulty: "Facile"
  },
  {
    slug: "velo-champs", name: "Vélo à travers les champs", image: actVelo, category: "Aventure", location: "Provence, France", score: "A+", price: "20€", duration: "2h", groupSize: "2-12", rating: 4.7, reviews: 145,
    description: "Balade à vélo à travers les champs de lavande et les vignobles provençaux. Location de vélos incluse.",
    longDescription: "Enfourchez votre vélo et partez à la découverte des paysages provençaux : champs de lavande ondulants, vignobles dorés et villages perchés en pierre. L'itinéraire de 20 km suit des chemins plats et sécurisés, accessibles à tous. Un arrêt dégustation dans un domaine viticole bio est inclus. Une manière douce et zéro émission de découvrir la Provence.",
    tags: ["Zéro émission", "Paysages", "Facile"],
    included: ["Vélo et casque", "Carte de l'itinéraire", "Dégustation vin bio", "Kit de réparation", "Eau"],
    notIncluded: ["Assurance personnelle", "Pourboires"],
    difficulty: "Facile"
  },
  {
    slug: "plantation-coraux", name: "Plantation de coraux", image: ecolodge1, category: "Nature", location: "Thaïlande", score: "A+", price: "55€", duration: "4h", groupSize: "4-10", rating: 4.9, reviews: 43,
    description: "Participez activement à la restauration des récifs coralliens aux côtés de biologistes marins.",
    longDescription: "Devenez acteur de la préservation marine en participant à un programme de restauration des récifs coralliens. Sous la supervision de biologistes marins, vous apprendrez à fragmenter et fixer de nouveaux coraux sur des structures artificielles. Un briefing théorique précède la plongée. Vous recevrez un certificat et pourrez suivre la croissance de 'votre' corail via une plateforme en ligne.",
    tags: ["Impact positif", "Scientifique", "Unique"],
    included: ["Équipement complet", "Biologiste marin", "Formation théorique", "Certificat de plantation", "Suivi en ligne du corail"],
    notIncluded: ["Transport bateau", "Photos professionnelles", "Pourboires"],
    difficulty: "Modéré"
  },
];
