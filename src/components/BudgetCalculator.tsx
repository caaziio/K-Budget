import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  useBudgetStore, 
  HousingType, 
  HousingLocation, 
  HousingStyle, 
  CookingFreq, 
  RestaurantFreq, 
  DeliveryFreq, 
  ConvenienceFreq, 
  CafeFreq, 
  TransportType, 
  BehaviorLevel, 
  VisaType, 
  LifestylePlan 
} from '@/store/useBudgetStore'
import { 
  HOUSING_DATA, 
  FOOD_DATA, 
  TRANSPORT_DATA, 
  DIGITAL_DATA, 
  LIFESTYLE_DATA, 
  HEALTH_DATA, 
  VISA_DATA, 
  LIFESTYLE_PLAN_DATA,
  SETUP_DATA,
  INSURANCE_BY_VISA
} from '@/lib/constants'
import { translations } from '@/lib/translations'
import styles from './BudgetCalculator.module.css'
import { 
  Plane, 
  Home, 
  Utensils, 
  Wallet, 
  ChevronLeft, 
  ChevronRight, 
  Coffee, 
  Car, 
  Heart, 
  ShoppingBag, 
  Zap, 
  AlertCircle, 
  Dumbbell, 
  BookOpen, 
  User, 
  Smartphone, 
  Info,
  Globe,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  Calendar,
  ShieldAlert,
  Sliders,
  RotateCcw,
  Building,
  GraduationCap,
  Briefcase,
  Compass,
  MapPin,
  Clock
} from 'lucide-react'

const getTranslation = (text: string, lang: 'en' | 'fr'): string => {
  if (lang === 'en') return text;
  
  const frMap: Record<string, string> = {
    // Section Headers
    "Onboarding & Mode Selection": "Intégration & Choix du Mode",
    "survival": "Économe",
    "moderate": "Standard",
    "comfortable": "Confort",
    "none": "Aucun",
    "Stay Duration (Months)": "Durée du Séjour (Mois)",
    "Target Neighborhood": "Quartier Cible",
    "Display Currency": "Devise d'Affichage",
    "Visa Status": "Statut du Visa",
    "Choose Budget Behavior Mode": "Mode de Budget de Base",
    "Selecting a preset mode automatically populates default habits that you can customize in subsequent steps.": "La sélection d'un mode de base remplit automatiquement des habitudes que vous pouvez personnaliser ensuite.",
    "Home Setup": "Installation Logement",
    "Living Space & Housing": "Espace de Vie & Logement",
    "Housing Type": "Type de Logement",
    "Outside Seoul": "Hors de Séoul (Busan, Daegu, Incheon)",
    "Seoul Outskirts": "Périphérie de Séoul (Gyeonggi, Banlieue)",
    "Seoul Central (Baseline)": "Centre de Séoul (Mapo, Yongsan, Gangbuk)",
    "Premium (Gangnam/Seocho)": "Quartiers Premium (Gangnam, Seocho, Songpa)",
    "Eco-conscious": "Consommation économe",
    "Minimal heating/AC, thrifty electricity usage.": "Chauffage et climatisation minimaux, électricité maîtrisée.",
    "Standard": "Standard",
    "Comfortable daily AC in summer and floor heating (ondol) in winter.": "Climatisation quotidienne en été et chauffage au sol (ondol) confortable en hiver.",
    "High Usage": "Consommation élevée",
    "Continuous heating/AC, multiple heavy appliances, long showers.": "Chauffage/clim en continu, appareils énergivores, douches longues.",
    "100% Free (Host covers all utilities & internet)": "100% Gratuit (L'hôte prend toutes les charges & internet en charge)",
    "Contribute to household utilities": "Partage des factures & participation aux charges",
    "Your host covers electricity, water, heating and internet.": "Votre hôte prend en charge l’électricité, l’eau, le chauffage et Internet.",
    "Contribute your share towards electricity, heating, water & high-speed Wi-Fi.": "Participez aux factures d'électricité, chauffage, eau et connexion Wi-Fi.",
    "Tourist Lease Notice:": "Avis baux touristiques :",
    "Short Stay Lease Notice:": "Avis séjours courts :",
    "Utility & Climate Usage Style": "Consommation des charges & énergie",
    "Dining & Grocery Behavior": "Alimentation & Boissons",
    "Suggested Profiles": "Profils Suggérés",
    "Personalized Habit Calculator": "Calculateur Personnalisé",
    "Suggested profiles": "Profils Suggérés",
    "My own habits": "Calculateur Personnalisé",
    "Enter your actual monthly habits for a more personal estimate.": "Renseignez vos habitudes réelles de repas pour un calcul sur-mesure.",
    "Home-cooked meals per month": "Repas cuisinés à la maison par mois",
    "Average cost per home-cooked meal": "Coût moyen par repas cuisiné",
    "Restaurant meals per month": "Repas au restaurant par mois",
    "Average cost per restaurant meal": "Coût moyen par repas au restaurant",
    "Delivery orders per month": "Commandes en livraison par mois",
    "Average cost per delivery": "Coût moyen par commande livraison",
    "Monthly convenience-store budget": "Budget mensuel supérette (CVS)",
    "Monthly cafe and snack budget": "Budget mensuel boissons & cafés",
    "Personal food estimate": "Budget alimentaire estimé",
    "Low": "Minimum (Économe)",
    "Expected": "Moyenne Prévue",
    "High": "Maximum (Confort)",
    "Home Cooking & Groceries": "Courses & Cuisine à la maison",
    "Restaurant Meals": "Repas au Restaurant",
    "Delivery App Dining": "Livraison de Repas (Baemin/Coupang)",
    "Convenience Store Dining": "Supérettes Coréennes (GS25/CU/7-Eleven)",
    "Cafes, Tea, Bubble Tea & Drinks": "Cafés, Thés, Bubble Tea & Boissons",
    "Cafes & Snacks": "Cafés, Thés, Bubble Tea & Boissons",
    "Transit & Travel Commutes": "Transports & Déplacements",
    "Primary Transit Behavior": "Moyen de transport principal",
    "Primary Transit Method": "Moyen de transport principal",
    "Wellness, Fitness & Health": "Santé, Bien-être & Fitness",
    "Basic Insurance & Regular Visits": "Assurance Santé & Soins de Base",
    "Fitness & Active Lifestyle": "Sport, Gym & Activités Physiques",
    "Medical Clinics & Specialists": "Cliniques Médicales & Spécialistes",
    "Personal & Self Care": "Soins Personnels & Esthétique",
    "Lifestyle, Shopping & Socials": "Style de Vie, Shopping & Sorties",
    "Social Life & Outings": "Sorties & Soirées",
    "Shopping & Consumption": "Shopping & Achats Courants",
    "Shopping & Consumer Goods": "Shopping & Biens de Consommation",
    "Fashion & Clothing updates": "Mode & Garde-robe",
    "Fashion & Clothing Updates": "Mode & Garde-robe",
    "Entertainment, cinema, and events": "Divertissements, Cinéma & Événements",
    "Entertainment & Leisure (Cinema/Events)": "Divertissements & Loisirs (Concerts, Cinéma)",
    "Digital Subscriptions & SaaS": "Abonnements Numériques, SIM & SaaS",
    "Plan-based Pricing": "Forfait selon Profil",
    "Custom Manual Amount": "Montant Personnalisé",
    "Custom Monthly Digital Budget": "Budget Numérique Mensuel Personnalisé",
    "Runway Summary": "Résumé de la Réserve Budgétaire",
    "Behavior Engine Notice": "Note du Moteur Budgétaire",
    "Your KCalc is calculated dynamically based on your chosen behavior habits.": "Votre budget KCalc est calculé dynamiquement selon vos habitudes de vie.",
    "Month-by-Month Runway Schedule": "Échéancier Mensuel de la Réserve",
    "Behavior-Based Budget Breakdown": "Répartition Budgétaire Comportementale",
    "Go Back": "Retour",
    "Get Full Diagnostic": "Rapport de Diagnostic Complet",
    "Cancel": "Annuler",
    "Submit & Request Payment": "Soumettre & Demander le Paiement",
    "Back": "Retour",
    "Next": "Suivant",
    "Preview AI Optimized Budget": "Aperçu du Budget Optimisé par IA",
    "Reset to Standard": "Réinitialiser au Standard",
    "Buy Package - $229": "Acheter le Pack - 229$",
    "Seoul Relocation Consultation & Local Cost Optimization Package": "Consultation de Relocalisation à Séoul & Pack d'Optimisation des Coûts",

    // Visa Labels
    "Student Visa (D-2 / D-4)": "Visa Étudiant (D-2 Université / D-4 Langue)",
    "Student (D-2 / D-4)": "Visa Étudiant (D-2 Université / D-4 Langue)",
    "Digital Nomad (F-1-D Workcation)": "Nomade Digital (F-1-D Workcation)",
    "Working Holiday (H-1 Visa)": "Visa Vacances-Travail (H-1 / WHV)",
    "Professional (E-Series / F-Visa)": "Visa Professionnel (E-Series / Résident F)",
    "Professional / Resident (E / F Visa)": "Visa Professionnel (E-Series / Résident F)",
    "Tourist / Long-stay (> 1 month)": "Tourisme Long Séjour / Visiteur (> 1 mois)",
    "Digital Nomad / F-Visa": "Nomade Digital / Visa F",
    "Professional / E-Visa": "Professionnel / Visa E",
    "Working Holiday": "Vacances-Travail (H-1)",
    "Tourist / Short-stay": "Touriste / Court séjour",

    // Housing types & descriptions
    "Goshiwon (고시원)": "Goshiwon (고시원)",
    "Shared Apartment (Sharehouse)": "Appartement Partagé (Sharehouse)",
    "One-room Studio (원룸)": "Studio One-Room (원룸)",
    "Officetel (오피스텔)": "Officetel (오피스텔)",
    "Apartment (아파트)": "Appartement Résidentiel (아파트)",
    "Guest House / Hostel": "Maison d'Hôtes / Auberge",
    "Staying with Friend / Family": "Hébergement chez un proche / Ami",
    "Very small compact private room (3-6m²) with bed and desk. Shared bathroom, kitchen, and laundry. Highly flexible monthly stay, zero long-term lease commitment, and minimal deposit.": "Très petite chambre privée (3 à 6 m²) avec lit et bureau. Salle de bain, cuisine et buanderie partagées. Sans engagement de bail et avec caution minimale.",
    "Compact private micro-room (3-6m²) with bed and desk. Shared bathroom, kitchen, and laundry. Highly flexible monthly stay, zero long-term commitment, and minimal deposit.": "Très petite chambre privée (3 à 6 m²) avec lit et bureau. Salle de bain, cuisine et buanderie partagées. Sans engagement de bail et avec caution minimale.",
    "Private furnished bedroom in a shared flat with common kitchen, living area, and bathroom. Great for community living with medium-to-low deposit.": "Chambre privée meublée dans une colocation avec cuisine, salon et salle de bain partagés. Idéal pour vivre en communauté avec caution modérée.",
    "Independent private studio with self-contained kitchenette and private bathroom. Korea's standard expat housing; typically requires a 1-year contract and a ₩5M-₩10M deposit.": "Studio indépendant avec kitchenette et salle de bain privées. Logement standard en Corée, nécessitant généralement un bail d'un an et une caution de 5M à 10M ₩.",
    "Modern studio in a commercial high-rise with elevator, 24/7 security, and built-in appliances. Requires high deposit (₩10M+) and monthly building management fees.": "Studio moderne en immeuble sécurisé avec gardien 24/7, ascenseur et électroménager encastré. Requiert une caution élevée (10M+ ₩) et des charges de copropriété.",
    "Full-sized multi-room residential apartment complex with large kitchen and living room. Best for families and long stays; requires the highest key-money deposit.": "Grand appartement multi-pièces en complexe résidentiel avec grande cuisine et salon. Idéal familles et séjours longs ; requiert la caution la plus importante.",
    "Furnished short-stay private room or dorm. Includes all utilities and Wi-Fi, flexible daily/monthly booking, with zero deposit required.": "Chambre privée ou dortoir pour court séjour. Charges et Wi-Fi inclus, réservation flexible au jour/mois, zéro caution exigée.",
    "Living with friends or family without rent or rental contract. You can choose below whether you pay ₩0 (all bills covered by host) or share household utilities.": "Logé chez de la famille ou des amis sans loyer ni bail. Choisissez ci-dessous si vous ne payez rien (toutes charges incluses) ou si vous participez aux factures.",

    // Setup Matrix
    "Essential Setup (Thrift/Daiso)": "Installation Économe (Friperie / Daiso)",
    "Floor sleeping pad, basic Daiso kitchenware, minimal setup.": "Matelas au sol (yo), ustensiles Daiso de base, installation minimale.",
    "Standard Setup (Today's House/IKEA)": "Installation Standard (Today's House / IKEA)",
    "Bed topper/duvet, full cooking starter pack, basic folding desk/chair.": "Surmatelas/couette, kit de cuisine complet, bureau et chaise pliants.",
    "Premium Setup (Premium furniture)": "Installation Confort (Mobilier complet)",
    "Brand spring mattress, complete kitchen appliances (air fryer/microwave), full ergonomic desk set.": "Matelas de marque à ressorts, électroménager complet (air fryer/micro-ondes), bureau ergonomique.",

    // Food labels
    "No Home Cooking (100% Out)": "Pas de cuisine maison (100% Extérieur)",
    "Zero grocery shopping; rely entirely on dining out and delivery.": "Aucune course alimentaire ; repas pris entièrement à l'extérieur ou en livraison.",
    "Basic Grocery Essentials": "Courses Essentielles & Cuisine Économe",
    "Rice, eggs, tofu, instant noodles, budget mart staples (~₩4,000/day).": "Riz, œufs, tofu, nouilles instantanées, produits de base discount (~4 000 ₩/jour).",
    "Standard Varied Groceries": "Courses Standards Variées",
    "Fresh vegetables, meat, dairy, fruits, regular home cooking (~₩8,000/day).": "Légumes frais, viande, produits laitiers, fruits, cuisine régulière (~8 000 ₩/jour).",
    "Balanced Home Groceries": "Courses Standards Variées",
    "Gourmet & Premium Groceries": "Courses Gourmandes & Produits Frais",
    "Imported products, premium beef, specialty organic ingredients (~₩14,000/day).": "Produits importés, bœuf de qualité, ingrédients bio et de spécialité (~14 000 ₩/jour).",

    "Rarely Dine Out": "Rarement au restaurant",
    "Cook at home, university cafeteria, or convenience store meals.": "Cuisine maison, cantine universitaire ou repas rapides en supérette.",
    "Occasional Budget Dining (2-3x/week)": "Restos Économiques (2-3x/semaine)",
    "Affordable Korean bunsik, kimbap, street food, student cafeterias (~₩10,000 × 12 meals).": "Petits restos coréens abordables, bunsik, kimbap, street food, cantines (~10 000 ₩ × 12 repas).",
    "Affordable Korean bunsik, kimbap, street food, student eateries (~₩10,000 × 12 meals).": "Petits restos coréens abordables, bunsik, kimbap, street food (~10 000 ₩ × 12 repas).",
    "Daily Standard Dining (1 meal/day)": "Repas Quotidien au Restaurant (1/jour)",
    "Regular Daily Dining Out (1 meal/day)": "Repas Quotidien au Restaurant (1/jour)",
    "1 standard lunch/dinner at local neighborhood eateries (~₩11,000 × 30 meals).": "1 déjeuner ou dîner quotidien dans les restaurants de quartier (~11 000 ₩ × 30 repas).",
    "Frequent & Premium Dining (2 meals/day + BBQ)": "Restaurants Fréquents & Barbecues (2/jour)",
    "Two restaurant meals daily, weekend Korean BBQ (samgyeopsal), trendy hot spots (~₩25,000/day).": "Deux repas par jour au restaurant, barbecues le week-end, adresses branchées (~25 000 ₩/jour).",

    "No Delivery Spending": "Aucune livraison",
    "Zero food delivery app orders.": "Aucune commande sur les applications de livraison.",
    "Occasional Delivery (1-2x/week)": "Livraison Occasionnelle (1-2x/semaine)",
    "Weekend comfort food, late-night fried chicken or pizza (~₩18,000 × 7 orders).": "Poulet frit nocturne, pizza ou repas de secours le week-end (~18 000 ₩ × 7 commandes).",
    "Frequent Delivery (3-4x/week)": "Livraison Fréquente (3-4x/semaine)",
    "Regular Baemin/Coupang Eats delivery meals (~₩22,000 × 14 orders).": "Commandes régulières de repas à domicile (~22 000 ₩ × 14 commandes).",

    "Basic Emergency Snacks": "Dépannage & En-cas",
    "Bottled water, ramen, quick convenience runs (~₩1,300/day).": "Bouteilles d'eau, ramen instantané, petites courses rapides (~1 300 ₩/jour).",
    "Regular Convenience Meals": "Repas Réguliers en Supérette",
    "Convenience lunch boxes (Dosirak), triangle kimbap, drinks (~₩2,700/day).": "Plateaux repas Dosirak, kimbap triangulaires, boissons (~2 700 ₩/jour).",
    "Convenience lunch boxes (Dosirak), triangle kimbap, canned coffee (~₩2,700/day).": "Plateaux repas Dosirak, kimbap triangulaires, boissons (~2 700 ₩/jour).",
    "Frequent CVS Lifestyle": "Habitué des Supérettes Coréennes",
    "Daily ready-to-eat meals, premium ice cream, late-night convenience visits (~₩4,700/day).": "Plats préparés quotidiens, glaces, boissons, passages quotidiens (~4 700 ₩/jour).",

    "No Cafe Spending": "Aucune dépense boisson/café",
    "No Cafe & Drink Spend": "Aucune dépense boisson/café",
    "Free instant Maxim coffee at home or office.": "Eau ou café instantané Maxim gratuit à la maison / bureau.",
    "Free water or instant Maxim coffee at home / office.": "Eau ou café instantané Maxim gratuit à la maison / bureau.",
    "Budget Drinks & Coffee (Mega / Compose)": "Boissons Économiques (Mega Coffee / Compose)",
    "Budget Coffee / Casual Visits": "Boissons Économiques (Mega Coffee / Compose)",
    "Iced tea, Americano, Mega Coffee 3-4x/week (~₩2,000-₩3,000/drink).": "Thé glacé, café, Mega Coffee 3-4x par semaine (~2 000 à 3 000 ₩/boisson).",
    "Mega Coffee, Compose, Paik's Coffee 3-4x/week (~₩2,000-₩3,000/drink).": "Thé glacé, café, Mega Coffee 3-4x par semaine (~2 000 à 3 000 ₩/boisson).",
    "Specialty Cafes, Bubble Tea & Desserts": "Cafés Spéciaux, Bubble Tea & Desserts",
    "Specialty Cafes & Desserts": "Cafés Spéciaux, Bubble Tea & Desserts",
    "Starbucks, Gong Cha bubble tea, matcha, aesthetic cafes & pastries (~₩5,000/day).": "Starbucks, bubble tea Gong Cha, matcha, cafés branchés & pâtisseries (~5 000 ₩/jour).",
    "Daily Starbucks, aesthetic cafes in Seongsu/Hongdae, pastries & desserts (~₩5,000/day).": "Starbucks, bubble tea Gong Cha, matcha, cafés branchés & pâtisseries (~5 000 ₩/jour).",

    // Transport
    "Metro & Bus Only": "Métro & Bus Uniquement",
    "Base commute with public transport (Subway + Bus with transfer discount).": "Trajets quotidiens en transports publics (Métro + Bus avec correspondance gratuite).",
    "Mixed Transport": "Transports Mixtes (Métro + Taxis)",
    "Regular public transit + occasional KakaoTaxi rides.": "Transports en commun réguliers + trajets occasionnels en KakaoTaxi.",
    "Taxi Heavy": "Taxi Fréquent",
    "Frequent private taxi rides and convenient late-night transit.": "Trajets réguliers en taxi privé et déplacements nocturnes pratiques.",
    "Frequent private taxi rides, late-night nightlife mobility.": "Trajets réguliers en taxi privé et déplacements nocturnes pratiques.",
    "Car Owner": "Propriétaire de Voiture",
    "Gas, insurance, toll, parking, maintenance (Premium).": "Carburant, assurance, péages, stationnement, entretien (Premium).",

    // Digital
    "SIM Card & Basic Apps": "Carte SIM & Applications Essentielles",
    "Entertainment Subscriptions": "Abonnements Streaming & Musique",
    "SaaS & AI Productivity Tools": "Outils SaaS, IA & Productivité",
    "Creative Professional Stack": "Pack Créatif & Multimédia Professionnel",
    "Active SIM line + essential daily navigation apps.": "Ligne SIM coréenne active + applications de navigation (Naver Map/Kakao).",
    "Streaming, music, and simple tools.": "Netflix, Spotify/YouTube Premium et divertissement.",
    "Heavy AI, cloud storage, and work tools.": "ChatGPT Plus, stockage cloud et outils professionnels.",
    "Professional multimedia stack for designers & devs.": "Adobe Creative Cloud, GitHub Pro, Figma et outils professionnels.",

    // Health
    "Basic Care & Insurance": "Assurance Santé & Soins de Base",
    "Fitness & Gym Membership": "Fitness & Abonnement Salle de Sport",
    "Private Healthcare & Clinics": "Cliniques Médicales & Spécialistes",
    "Personal Care & Grooming": "Soins Personnels & Coiffure",
    "Home workouts / basic community center gym.": "Entraînement à la maison / gymnase municipal de quartier.",
    "Standard commercial gym membership.": "Abonnement classique en salle de sport commerciale.",
    "Premium fitness club + periodic personal training.": "Club de sport premium + séances de coaching personnalisé.",
    "Occasional public health clinic visits.": "Consultations occasionnelles en centre de santé publique.",
    "Standard private local clinics as needed.": "Consultations en cliniques privées locales de quartier.",
    "High-end general hospitals / regular specialist visits.": "Hôpitaux universitaires renommés / consultations spécialistes.",
    "Basic grooming essentials & cuts.": "Produits d'hygiène essentiels et coiffure de base.",
    "Standard haircut and basic skincare.": "Coupe de cheveux régulière et soins de peau basiques.",
    "Premium salons, dermatology, & treatments.": "Salons haut de gamme, dermatologie et soins esthétiques coréens.",

    // Lifestyle
    "Socializing & Gathering Habits": "Sorties & Soirées",
    "Shopping & Retail Frequency": "Shopping & Achats Courants",
    "Clothing & Apparel Habits": "Vêtements & Garde-robe",
    "Entertainment & Hobbies": "Divertissements & Loisirs",
    "Rare outings, mostly free home gatherings.": "Sorties rares, soirées principalement gratuites à la maison.",
    "Weekly social meetups & casual restaurant drinks.": "Sorties régulières et verres décontractés entre amis.",
    "Frequent premium dinners, high-end nightlife, & parties.": "Dîners de standing fréquents, événements VIP et soirées.",
    "Strictly essentials only, no consumer goods.": "Strictement le nécessaire, aucun achat superflu.",
    "Occasional retail shopping & hobby items.": "Achats plaisir occasionnels et articles de loisirs.",
    "Frequent high-end consumption & electronics shopping.": "Achats fréquents haut de gamme et produits high-tech.",
    "Minimal replacement of worn functional items.": "Remplacement minimal des pièces usées indispensables.",
    "Seasonal wardrobe updates and mid-tier brands.": "Mise à jour saisonnière de la garde-robe (marques courantes).",
    "Frequent designer brands & luxury fashion upgrades.": "Marques de créateurs régulières et shopping de qualité.",
    "No paid tickets, stick to free online media.": "Aucun billet payant, streaming et médias gratuits en ligne.",
    "Occasional cinema, museum visits, & local shows.": "Cinéma occasionnel, musées et spectacles locaux.",
    "VIP seats at concerts, festivals, & high-end events.": "Places VIP pour concerts, festivals et grands événements.",

    // Notices
    "Private Travel/Expat Insurance Required:": "Assurance Voyage / Expatrié Obligatoire :",
    "Tourist visa holders are ineligible for the South Korean National Health Insurance Service (NHIS) subsidy. You must purchase comprehensive travel or expat insurance to cover medical care.": "Les visiteurs sous visa touristique ne sont pas éligibles à la sécurité sociale coréenne (NHIS). Vous devez souscrire une assurance voyage ou expatrié couvrant les frais médicaux.",
    "Officetels, Apartments, and standard Shared Apartments typically require an Alien Registration Card (ARC) and a long-term lease. Since you are on a Tourist visa, you will need to find short-term sub-leases or use specialized tourist-friendly expat rental services.": "Les officetels, appartements et colocations standard requièrent généralement une carte de résident (ARC) et un bail d'un an. En visa touriste, privilégiez les sous-locations temporaires, maisons d'hôtes, goshiwons ou services pour expatriés.",
    "Officetels usually require a minimum 1-year contract. For stays under 3 months, consider specialized short-term rental platforms or co-living spaces instead.": "Les officetels exigent généralement un bail d'un an minimum. Pour les séjours de moins de 3 mois, privilégiez les plateformes de courte durée ou les goshiwons.",

    // Custom food presets
    "Eat out daily @ ₩10k": "Resto tous les jours @ 10k ₩",
    "Student cooking & thrift": "Étudiant & Cuisine économe",
    "Balanced 50/50": "Équilibré 50/50",
    "Foodie & Delivery": "Gourmet & Livraisons"
  };
  
  return frMap[text] || text;
};

const STEPS = [
  { id: 1, title: 'Identity', icon: Plane },
  { id: 2, title: 'Housing', icon: Home },
  { id: 3, title: 'Dining', icon: Utensils },
  { id: 4, title: 'Transport', icon: Car },
  { id: 5, title: 'Wellness', icon: Heart },
  { id: 6, title: 'Lifestyle', icon: ShoppingBag },
  { id: 7, title: 'Result', icon: Wallet },
]

const BEHAVIOR_LEVELS: BehaviorLevel[] = ['survival', 'moderate', 'comfortable', 'none']

const getWellnessDesc = (category: string, l: BehaviorLevel, visaType?: VisaType) => {
  const lang = useBudgetStore.getState().language;
  const gt = (txt: string) => getTranslation(txt, lang);
  if (l === 'none') return lang === 'fr' ? 'Aucune dépense pour cette catégorie.' : 'Opt out / No spending.'
  
  if (category === 'basic') {
    if (visaType === 'tourist') {
      if (l === 'survival') return lang === 'fr' ? 'Assurance médicale d’urgence (hospitalisation et soins vitaux uniquement).' : 'Essential emergency medical coverage (inpatient hospital & emergency only).'
      if (l === 'moderate') return lang === 'fr' ? 'Assurance voyage internationale complète (consultations, médicaments et rapatriement).' : 'Comprehensive international travel policy (outpatient clinics, meds & repatriation).'
      if (l === 'comfortable') return lang === 'fr' ? 'Assurance expatrié mondiale premium (zéro franchise, plafonds élevés).' : 'Premium worldwide expat health plan (zero deductible, high coverage limits).'
    }
    if (visaType === 'student') {
      if (l === 'survival') return lang === 'fr' ? 'Tarif étudiant NHIS obligatoire (subventionné à ~50% pour D-2/D-4).' : 'Mandatory subsidized student NHIS rate (~50% discount for D-2/D-4).'
      if (l === 'moderate') return lang === 'fr' ? 'NHIS étudiant obligatoire + assurance santé campus complémentaire.' : 'Mandatory student NHIS + university campus supplementary clinic coverage.'
      if (l === 'comfortable') return lang === 'fr' ? 'NHIS complet + assurance internationale étudiante renforcée.' : 'Full NHIS + international student comprehensive policy with specialist care.'
    }
    if (visaType === 'working_holiday') {
      if (l === 'survival') return lang === 'fr' ? 'Assurance voyage PVT basique (exigée pour l’obtention du visa).' : 'Basic working holiday travel medical policy (required for visa approval).'
      if (l === 'moderate') return lang === 'fr' ? 'Assurance PVT complète (frais médicaux courants, dentaire d’urgence et rapatriement).' : 'Comprehensive WHV medical & repatriation insurance with low deductible.'
      if (l === 'comfortable') return lang === 'fr' ? 'NHIS (après obtention de l’ARC) + complémentaire internationale haut de gamme.' : 'NHIS (upon ARC registration) + top-tier private international travel policy.'
    }
    if (visaType === 'nomad') {
      if (l === 'survival') return lang === 'fr' ? 'Assurance santé internationale conforme visa nomade (couverture min. 100M ₩).' : 'Visa-compliant international travel health policy (covers min. ₩100M).'
      if (l === 'moderate') return lang === 'fr' ? 'Formule mondiale pour nomades digitaux (consultations courantes et urgences).' : 'Digital nomad global health plan (worldwide outpatient clinics & emergency).'
      if (l === 'comfortable') return lang === 'fr' ? 'Pack nomade international premium + bien-être et soins dentaires complets.' : 'Premium global nomad medical plan + full wellness, optical & dental.'
    }
    // Professional / default
    if (l === 'survival') return lang === 'fr' ? 'Cotisation NHIS salarié standard (prise en charge 50% par l’employeur).' : 'Standard employer-sponsored NHIS contribution (50% paid by company).'
    if (l === 'moderate') return lang === 'fr' ? 'NHIS salarié + assurance complémentaire coréenne 실비 (Silbi).' : 'Employer NHIS + standard Korean private supplementary insurance (Silbi 실비).'
    if (l === 'comfortable') return lang === 'fr' ? 'NHIS cadre + mutuelle d’entreprise haut de gamme et soins spécialisés.' : 'High-bracket NHIS + premium corporate executive supplementary health plan.'
  }

  if (category === 'gym') {
    if (l === 'survival') return gt('Home workouts / basic community center gym.')
    if (l === 'moderate') return gt('Standard commercial gym membership.')
    if (l === 'comfortable') return gt('Premium fitness club + periodic personal training.')
  }
  if (category === 'clinic') {
    if (l === 'survival') return gt('Occasional public health clinic visits.')
    if (l === 'moderate') return gt('Standard private local clinics as needed.')
    if (l === 'comfortable') return gt('High-end general hospitals / regular specialist visits.')
  }
  if (category === 'personal') {
    if (l === 'survival') return gt('Basic grooming essentials & cuts.')
    if (l === 'moderate') return gt('Standard haircut and basic skincare.')
    if (l === 'comfortable') return gt('Premium salons, dermatology, & treatments.')
  }
  return ''
}

const getLifestyleDesc = (category: string, l: BehaviorLevel) => {
  const lang = useBudgetStore.getState().language;
  const gt = (txt: string) => getTranslation(txt, lang);
  if (l === 'none') return lang === 'fr' ? 'Aucune dépense pour cette catégorie.' : 'No spending in this category.'
  if (category === 'social') {
    if (l === 'survival') return gt('Rare outings, mostly free home gatherings.')
    if (l === 'moderate') return gt('Weekly social meetups & casual restaurant drinks.')
    if (l === 'comfortable') return gt('Frequent premium dinners, high-end nightlife, & parties.')
  }
  if (category === 'shopping') {
    if (l === 'survival') return gt('Strictly essentials only, no consumer goods.')
    if (l === 'moderate') return gt('Occasional retail shopping & hobby items.')
    if (l === 'comfortable') return gt('Frequent high-end consumption & electronics shopping.')
  }
  if (category === 'clothing') {
    if (l === 'survival') return gt('Minimal replacement of worn functional items.')
    if (l === 'moderate') return gt('Seasonal wardrobe updates and mid-tier brands.')
    if (l === 'comfortable') return gt('Frequent designer brands & luxury fashion upgrades.')
  }
  if (category === 'entertainment') {
    if (l === 'survival') return gt('No paid tickets, stick to free online media.')
    if (l === 'moderate') return gt('Occasional cinema, museum visits, & local shows.')
    if (l === 'comfortable') return gt('VIP seats at concerts, festivals, & high-end events.')
  }
  return ''
}

const LOCATION_OPTIONS: { id: HousingLocation; labelEn: string; labelFr: string; badgeEn: string; badgeFr: string; descEn: string; descFr: string; icon: any }[] = [
  {
    id: 'central',
    labelEn: 'Seoul Central (Mapo, Yongsan, Gangbuk)',
    labelFr: 'Centre de Séoul (Mapo, Yongsan, Gangbuk)',
    badgeEn: 'Baseline (1.0x)',
    badgeFr: 'Référence (1.0x)',
    descEn: 'Vibrant central districts with prime subway connectivity & student life.',
    descFr: 'Quartiers centraux, vivants, proches des universités et du métro.',
    icon: Building
  },
  {
    id: 'premium',
    labelEn: 'Premium (Gangnam, Seocho, Songpa)',
    labelFr: 'Quartiers Premium (Gangnam, Seocho, Songpa)',
    badgeEn: '+25% Rent / +15% Dining',
    badgeFr: '+25% Loyer / +15% Resto',
    descEn: 'Prestigious corporate towers, high-end nightlife & luxury avenues.',
    descFr: 'Quartiers d\'affaires de prestige, vie nocturne chic et shopping haut de gamme.',
    icon: Sparkles
  },
  {
    id: 'outskirts',
    labelEn: 'Seoul Outskirts (Gyeonggi, Suburbs)',
    labelFr: 'Périphérie de Séoul (Gyeonggi, Banlieue)',
    badgeEn: '-15% Rent',
    badgeFr: '-15% Loyer',
    descEn: 'More spacious, affordable studios within commuter subway access to Seoul.',
    descFr: 'Plus d\'espace à loyer modéré avec accès direct en métro/train vers Séoul.',
    icon: Home
  },
  {
    id: 'outside_seoul',
    labelEn: 'Outside Seoul (Busan, Daegu, Incheon)',
    labelFr: 'Hors de Séoul (Busan, Daegu, Incheon)',
    badgeEn: '-30% Rent',
    badgeFr: '-30% Loyer',
    descEn: 'Scenic coastal hubs or major provincial metro cities at minimal rent prices.',
    descFr: 'Grandes métropoles régionales et villes côtières à loyers très avantageux.',
    icon: MapPin
  }
];

const VISA_OPTIONS: { id: VisaType; labelEn: string; labelFr: string; descEn: string; descFr: string; icon: any }[] = [
  {
    id: 'student',
    labelEn: 'Student Visa (D-2 / D-4)',
    labelFr: 'Visa Étudiant (D-2 / D-4)',
    descEn: 'University degree programs or intensive language school courses.',
    descFr: 'Études universitaires (D-2) ou cours intensifs de coréen (D-4).',
    icon: GraduationCap
  },
  {
    id: 'working_holiday',
    labelEn: 'Working Holiday (H-1 / WHV)',
    labelFr: 'Visa Vacances-Travail (H-1 / PVT)',
    descEn: '1-year flexible working holiday for eligible partner nations.',
    descFr: 'Séjour flexible de 1 an alliant voyage, découverte et petit job.',
    icon: Compass
  },
  {
    id: 'nomad',
    labelEn: 'Digital Nomad (F-1-D Workcation)',
    labelFr: 'Nomade Digital (F-1-D Workcation)',
    descEn: 'Remote tech/knowledge workers for overseas companies (min. ₩85M/yr).',
    descFr: 'Télétravailleurs pour employeur étranger (revenu min. ~85M ₩/an).',
    icon: Globe
  },
  {
    id: 'professional',
    labelEn: 'Professional / Resident (E / F Visa)',
    labelFr: 'Visa Professionnel (E-Series / Résident F)',
    descEn: 'Local employment contracts (E-7/E-2), long-term residents (F-2/F-5) or spousal (F-6).',
    descFr: 'Salarié d\'entreprise en Corée, résident permanent ou conjoint.',
    icon: Briefcase
  },
  {
    id: 'tourist',
    labelEn: 'Tourist / Long-stay (> 1 month)',
    labelFr: 'Tourisme Long Séjour (> 1 mois)',
    descEn: 'K-ETA or tourist visa visitors staying up to 90 days without work permit.',
    descFr: 'Visiteurs K-ETA ou visa court terme séjournant plus d\'un mois sans permis de travail.',
    icon: Plane
  }
];

export default function BudgetCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const calculatorTopRef = useRef<HTMLDivElement>(null)
  const stepperRef = useRef<HTMLDivElement>(null)
  const hasChangedStepRef = useRef(false)
  const store = useBudgetStore()
  const [durationInput, setDurationInput] = useState(String(store.duration))
  const t = translations[store.language]

  const gt = (txt: string) => getTranslation(txt, store.language)
  const totals = store.calculateTotals()

  const getStepSelectionPreview = (stepId: number) => {
    switch(stepId) {
      case 1:
        if (store.lifestylePlan === 'none') {
          return `${store.duration} ${store.language === 'fr' ? 'mois' : 'mo'} • ${store.language === 'fr' ? 'Mode Perso' : 'Custom Mode'}`;
        }
        const presetName = store.lifestylePlan === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Essential') :
                           store.lifestylePlan === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                           (store.language === 'fr' ? 'Confort' : 'Comfortable');
        return `${store.duration} ${store.language === 'fr' ? 'mois' : 'mo'} • ${presetName}`;
      case 2:
        if (store.housingType === 'none' || !HOUSING_DATA.types[store.housingType as keyof typeof HOUSING_DATA.types]) {
          return store.language === 'fr' ? 'Non sélectionné' : 'Not selected';
        }
        return HOUSING_DATA.types[store.housingType as keyof typeof HOUSING_DATA.types]?.label 
          ? gt(HOUSING_DATA.types[store.housingType as keyof typeof HOUSING_DATA.types].label).split(' ')[0] 
          : store.housingType;
      case 3:
        if (store.useCustomFood) {
          return store.language === 'fr' ? 'Perso' : 'Custom';
        }
        if (store.cookingFreq === 'none' && store.restaurantFreq === 'none') {
          return store.language === 'fr' ? 'Non sélectionné' : 'Not selected';
        }
        const cookLvl = store.cookingFreq === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Essential') :
                        store.cookingFreq === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                        store.cookingFreq === 'comfortable' ? (store.language === 'fr' ? 'Confort' : 'Gourmet') :
                        (store.language === 'fr' ? 'Aucun' : 'None');
        const restLvl = store.restaurantFreq === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Budget') :
                        store.restaurantFreq === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Daily') :
                        store.restaurantFreq === 'comfortable' ? (store.language === 'fr' ? 'Fréquent' : 'Frequent') :
                        (store.language === 'fr' ? 'Rare' : 'Rare');
        return `${store.language === 'fr' ? 'Cuisine' : 'Cook'}: ${cookLvl} • ${store.language === 'fr' ? 'Resto' : 'Rest'}: ${restLvl}`;
      case 4:
        if (store.transportType === 'none') {
          return store.language === 'fr' ? 'Non sélectionné' : 'Not selected';
        }
        return store.transportType === 'metro' ? (store.language === 'fr' ? 'Métro/Bus' : 'Metro/Bus') :
               store.transportType === 'mixed' ? (store.language === 'fr' ? 'Mixte' : 'Mixed') :
               store.transportType === 'taxi' ? 'Taxi' :
               (store.language === 'fr' ? 'Voiture' : 'Car');
      case 5:
        if (store.healthGym === 'none' && store.healthClinic === 'none' && store.healthBasic === 'none') {
          return store.language === 'fr' ? 'Non sélectionné' : 'Not selected';
        }
        const gymLvl = store.healthGym === 'survival' ? (store.language === 'fr' ? 'Maison' : 'Home') :
                       store.healthGym === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                       store.healthGym === 'comfortable' ? (store.language === 'fr' ? 'Premium' : 'Premium') :
                       (store.language === 'fr' ? 'Aucun' : 'None');
        const clinicLvl = store.healthClinic === 'survival' ? (store.language === 'fr' ? 'Public' : 'Public') :
                          store.healthClinic === 'moderate' ? (store.language === 'fr' ? 'Privé' : 'Private') :
                          store.healthClinic === 'comfortable' ? (store.language === 'fr' ? 'Hôpital' : 'Hospital') :
                          (store.language === 'fr' ? 'Aucun' : 'None');
        return `Gym: ${gymLvl} • ${store.language === 'fr' ? 'Clinique' : 'Clinic'}: ${clinicLvl}`;
      case 6:
        if (store.socialLevel === 'none' && store.shoppingLevel === 'none') {
          return store.language === 'fr' ? 'Non sélectionné' : 'Not selected';
        }
        const socialLvl = store.socialLevel === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Low') :
                          store.socialLevel === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                          store.socialLevel === 'comfortable' ? (store.language === 'fr' ? 'Actif' : 'High') :
                          (store.language === 'fr' ? 'Aucun' : 'None');
        const shopLvl = store.shoppingLevel === 'survival' ? (store.language === 'fr' ? 'Essentiel' : 'Thrift') :
                        store.shoppingLevel === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                        store.shoppingLevel === 'comfortable' ? (store.language === 'fr' ? 'Premium' : 'High') :
                        (store.language === 'fr' ? 'Aucun' : 'None');
        return `Social: ${socialLvl} • ${store.language === 'fr' ? 'Achats' : 'Shop'}: ${shopLvl}`;
      case 7:
        return `Total: ${formatPrice(totals.totalBudgetRequired)}`;
      default:
        return '';
    }
  }

  const scrollToCalculatorTop = () => {
    if (calculatorTopRef.current) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
      const navOffset = isMobile ? 12 : 20;
      const elementPosition = calculatorTopRef.current.getBoundingClientRect().top + window.scrollY;
      const targetPosition = Math.max(0, elementPosition - navOffset);
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    if (!hasChangedStepRef.current) {
      hasChangedStepRef.current = true
      return
    }
    scrollToCalculatorTop()
    
    // Auto-scroll active stepper tab horizontally WITHOUT affecting vertical window scroll
    if (stepperRef.current) {
      const activeEl = stepperRef.current.querySelector(`.${styles.active}`) as HTMLElement;
      if (activeEl) {
        const container = stepperRef.current;
        const scrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentStep])

  useEffect(() => {
    setDurationInput(String(store.duration))
  }, [store.duration])

  const handleDurationChange = (value: string) => {
    if (value === '') {
      setDurationInput('')
      return
    }

    const parsedDuration = Number.parseInt(value, 10)
    if (Number.isNaN(parsedDuration)) return

    const duration = Math.min(60, Math.max(1, parsedDuration))
    setDurationInput(String(duration))
    store.setVal('duration', duration)
  }

  const commitDuration = () => {
    const parsedDuration = Number.parseInt(durationInput, 10)
    const duration = Number.isNaN(parsedDuration)
      ? 1
      : Math.min(60, Math.max(1, parsedDuration))

    setDurationInput(String(duration))
    store.setVal('duration', duration)
  }

  const goToStep = (step: number) => setCurrentStep(Math.max(1, Math.min(step, STEPS.length)))
  const handleNext = () => goToStep(currentStep + 1)
  const handleBack = () => goToStep(currentStep - 1)

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleReset = () => {
    store.resetAll()
    setShowPurchaseForm(false)
    setShowDiagnostic(false)
    setExpandedItems({})
    setCurrentStep(1)
    scrollToCalculatorTop()
  }

  const getExchangeRate = () => {
    if (store.currency === 'USD') return 1350;
    if (store.currency === 'EUR') return 1450;
    return 1;
  }

  const formatPrice = (amountInKRW: number) => {
    const rate = getExchangeRate();
    const currency = store.currency;
    const converted = amountInKRW / rate;
    
    if (currency === 'USD') {
      return `$${Math.round(converted).toLocaleString()}`;
    }
    if (currency === 'EUR') {
      return `€${Math.round(converted).toLocaleString()}`;
    }
    return `₩${Math.round(amountInKRW).toLocaleString()}`;
  }

  const getInsuranceCost = (level: BehaviorLevel) => {
    if (level === 'none') return 0
    const visaTiers = INSURANCE_BY_VISA[store.visaType] || INSURANCE_BY_VISA.professional;
    return visaTiers[level] || 0;
  }

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>{gt("Onboarding & Mode Selection")}</h2>
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={handleReset}
                title={store.language === 'fr' ? 'Réinitialiser toutes les entrées aux valeurs par défaut' : 'Reset all inputs to default'}
              >
                <RotateCcw size={14} />
                <span>{store.language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
              </button>
            </div>

            {/* Block 1: Duration & Currency */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Clock size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {store.language === 'fr' ? 'Durée du Séjour & Devise d\'Affichage' : 'Stay Duration & Display Currency'}
                  </span>
                </div>
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>{gt("Stay Duration (Months)")}</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="60" 
                    inputMode="numeric"
                    value={durationInput}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    onBlur={commitDuration}
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label><Globe size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {gt("Display Currency")}</label>
                  <div className={styles.selectionGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {(['KRW', 'USD', 'EUR'] as const).map(curr => {
                      const labels = { KRW: 'KRW (₩)', USD: 'USD ($)', EUR: 'EUR (€)' };
                      return (
                        <div 
                          key={curr} 
                          className={store.currency === curr ? styles.selectionCardActive : styles.selectionCard} 
                          onClick={() => store.setVal('currency', curr)}
                          style={{ padding: '0.65rem 0.5rem', textAlign: 'center' }}
                        >
                          <span style={{ fontWeight: 800, fontSize: '0.8125rem' }}>{labels[curr]}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Target Neighborhood */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <MapPin size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {store.language === 'fr' ? 'Quartier Cible & Indice du Coût de la Vie' : 'Target Neighborhood & Cost Index'}
                  </span>
                </div>
              </div>
              <p className={styles.sectionSubtitle}>
                {store.language === 'fr' 
                  ? 'Les loyers et frais de restauration s\'ajustent automatiquement selon la zone géographique choisie.' 
                  : 'Rent and dining expenses automatically adjust based on your chosen geographical district.'
                }
              </p>
              
              <div className={styles.selectionGrid}>
                {LOCATION_OPTIONS.map(loc => {
                  const isSelected = store.housingLocation === loc.id;
                  const IconComp = loc.icon;
                  return (
                    <div 
                      key={loc.id} 
                      className={isSelected ? styles.selectionCardActive : styles.selectionCard}
                      onClick={() => store.setVal('housingLocation', loc.id)}
                    >
                      <div className={styles.cardHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <IconComp size={16} style={{ color: isSelected ? '#059669' : '#64748b' }} />
                          <h4>{store.language === 'fr' ? loc.labelFr : loc.labelEn}</h4>
                        </div>
                        <span className={styles.cardPrice} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '9999px', background: isSelected ? 'rgba(5, 150, 105, 0.12)' : '#f1f5f9', color: isSelected ? '#059669' : '#475569' }}>
                          {store.language === 'fr' ? loc.badgeFr : loc.badgeEn}
                        </span>
                      </div>
                      <p>{store.language === 'fr' ? loc.descFr : loc.descEn}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Block 3: Visa Status */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Globe size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {store.language === 'fr' ? 'Statut du Visa & Réglementation d\'Immigration' : 'Visa & Immigration Status'}
                  </span>
                </div>
              </div>
              <p className={styles.sectionSubtitle}>
                {store.language === 'fr'
                  ? 'Détermine l\'éligibilité aux baux résidentiels et le régime d\'assurance santé obligatoire.'
                  : 'Determines long-term lease eligibility and mandatory health insurance regulations.'
                }
              </p>

              <div className={styles.selectionGrid}>
                {VISA_OPTIONS.map(v => {
                  const isSelected = store.visaType === v.id;
                  const IconComp = v.icon;
                  return (
                    <div 
                      key={v.id} 
                      className={isSelected ? styles.selectionCardActive : styles.selectionCard}
                      onClick={() => store.setVal('visaType', v.id)}
                    >
                      <div className={styles.cardHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <IconComp size={16} style={{ color: isSelected ? '#059669' : '#64748b' }} />
                          <h4>{store.language === 'fr' ? v.labelFr : v.labelEn}</h4>
                        </div>
                      </div>
                      <p>{store.language === 'fr' ? v.descFr : v.descEn}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Block 4: Budget Behavior Preset */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Sliders size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Choose Budget Behavior Mode")}
                  </span>
                </div>
              </div>
              <p className={styles.sectionSubtitle}>
                {gt("Selecting a preset mode automatically populates default habits that you can customize in subsequent steps.")}
              </p>
              
              <div className={styles.selectionGrid}>
                {(['survival', 'moderate', 'comfortable'] as const).map(lp => {
                  const setupInfo = SETUP_DATA.installation_matrix[lp];
                  const planTitle = lp === 'survival' ? (store.language === 'fr' ? 'Mode Économe (Budget serré)' : 'Essential Budget Mode') :
                                    lp === 'moderate' ? (store.language === 'fr' ? 'Mode Standard (Équilibré)' : 'Standard Mode') :
                                    (store.language === 'fr' ? 'Mode Confortable (Détendu)' : 'Comfortable Mode');
                  const planDesc = lp === 'survival' ? (store.language === 'fr' ? 'Dépenses indispensables, colocations & gestion rigoureuse.' : 'Focus on essential living, shared spaces & strict saving.') :
                                   lp === 'moderate' ? (store.language === 'fr' ? 'Style de vie équilibré standard en One-room studio.' : 'Standard balanced lifestyle in a private one-room studio.') :
                                   (store.language === 'fr' ? 'Confort optimal, officetel moderne, sorties & commodités.' : 'Premium comfortable lifestyle with high convenience.');
                  const setupLabel = lp === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Essential') :
                                     lp === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                                     (store.language === 'fr' ? 'Confortable' : 'Comfortable');
                  return (
                    <div key={lp} className={store.lifestylePlan === lp ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.applyPreset(lp)}>
                      <h4 style={{ textTransform: 'capitalize' }}>{planTitle}</h4>
                      <p>{planDesc}</p>
                      <p style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.5rem', fontWeight: 600 }}>
                        {gt("Home Setup")}: {formatPrice(setupInfo.amount)} ({setupLabel})
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )
      case 2:
        const showTouristWarning = store.visaType === 'tourist' && 
          (store.housingType === 'officetel' || store.housingType === 'apartment' || store.housingType === 'shared');
        const showDurationWarning = store.duration < 3 && store.housingType === 'officetel';
        const locMult = HOUSING_DATA.locations[store.housingLocation].mult;

        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>{gt("Living Space & Housing")}</h2>
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={handleReset}
                title={store.language === 'fr' ? 'Réinitialiser toutes les entrées aux valeurs par défaut' : 'Reset all inputs to default'}
              >
                <RotateCcw size={14} />
                <span>{store.language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
              </button>
            </div>

            {/* Section 1: Housing Type */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Home size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Housing Type")}{' '}
                    {locMult !== 1 && (
                      <span style={{ color: '#b45309', fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}>
                        ({locMult > 1 ? `+${Math.round((locMult - 1) * 100)}%` : `-${Math.round((1 - locMult) * 100)}%`}{' '}
                        {gt(HOUSING_DATA.locations[store.housingLocation].label)})
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <p className={styles.sectionSubtitle}>
                {store.language === 'fr' 
                  ? 'Choisissez votre type de logement. Les cautions coréennes (Wolse) sont intégralement remboursables en fin de bail.'
                  : 'Choose your accommodation type. Korean rental deposits (Wolse) are fully refundable upon move-out.'
                }
              </p>

              <div className={styles.selectionGrid}>
                {(Object.keys(HOUSING_DATA.types) as (keyof typeof HOUSING_DATA.types)[]).map(h => {
                  const house = HOUSING_DATA.types[h];
                  const planKey = (store.lifestylePlan === 'none' ? 'moderate' : store.lifestylePlan) as 'survival' | 'moderate' | 'comfortable';
                  const baseRent = house[planKey] !== undefined ? house[planKey] : house.moderate;
                  
                  const currentRent = baseRent * locMult;
                  const currentDeposit = house.deposit * locMult;
                  
                  return (
                    <div key={h} className={store.housingType === h ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('housingType', h)}>
                      <div className={styles.cardHeader}>
                        <h4>{gt(house.label)}</h4>
                        <span className={styles.cardPrice}>{formatPrice(currentRent)}/{store.language === 'fr' ? 'mois' : 'mo'}</span>
                      </div>
                      <p>{gt(house.desc)}</p>
                      <div className={styles.cardFooter}>
                        <span>{store.language === 'fr' ? 'Caution :' : 'Deposit:'} {formatPrice(currentDeposit)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {showTouristWarning && (
                <div className={styles.warningAlert} style={{ marginTop: '1.25rem' }}>
                  <AlertCircle size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>{gt("Tourist Lease Notice:")}</strong>{' '}
                    {gt("Officetels, Apartments, and standard Shared Apartments typically require an Alien Registration Card (ARC) and a long-term lease. Since you are on a Tourist visa, you will need to find short-term sub-leases or use specialized tourist-friendly expat rental services.")}
                  </div>
                </div>
              )}

              {showDurationWarning && (
                <div className={styles.warningAlert} style={{ marginTop: '1.25rem' }}>
                  <AlertCircle size={20} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>{gt("Short Stay Lease Notice:")}</strong>{' '}
                    {gt("Officetels usually require a minimum 1-year contract. For stays under 3 months, consider specialized short-term rental platforms or co-living spaces instead.")}
                  </div>
                </div>
              )}

              {store.housingType === 'friend' && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.75rem', display: 'block' }}>
                    {store.language === 'fr' ? 'Participation aux Factures & Charges' : 'Utility & Bill Sharing'}
                  </label>
                  <div className={styles.selectionGrid}>
                    <div
                      className={store.friendUtilitiesIncluded ? styles.selectionCardActive : styles.selectionCard}
                      onClick={() => store.setVal('friendUtilitiesIncluded', true)}
                    >
                      <div className={styles.cardHeader}>
                        <h4>{gt('100% Free (Host covers all utilities & internet)')}</h4>
                        <span className={styles.cardPrice}>{formatPrice(0)}/{store.language === 'fr' ? 'mois' : 'mo'}</span>
                      </div>
                      <p>{gt('Your host covers electricity, water, heating and internet.')}</p>
                    </div>
                    <div
                      className={!store.friendUtilitiesIncluded ? styles.selectionCardActive : styles.selectionCard}
                      onClick={() => store.setVal('friendUtilitiesIncluded', false)}
                    >
                      <h4>{gt('Contribute to household utilities')}</h4>
                      <p>{gt('Contribute your share towards electricity, heating, water & high-speed Wi-Fi.')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Utilities */}
            {!(store.housingType === 'friend' && store.friendUtilitiesIncluded) && (
              <div className={styles.sectionBlock}>
                <div className={styles.sectionBlockHeader}>
                  <div className={styles.sectionTitleBox}>
                    <div className={styles.sectionIconPill}>
                      <Zap size={16} />
                    </div>
                    <span className={styles.sectionTitleText}>
                      {gt("Utility & Climate Usage Style")}
                    </span>
                  </div>
                </div>
                <p className={styles.sectionSubtitle}>
                  {store.language === 'fr'
                    ? 'Chauffage au sol (ondol) en hiver et climatisation en été influencent grandement les factures d\'énergie.'
                    : 'Korean floor heating (ondol) in winter and heavy AC in summer drive seasonal utility variances.'
                  }
                </p>

                <div className={styles.selectionGrid}>
                  {(Object.keys(HOUSING_DATA.usage_styles) as HousingStyle[]).map(s => {
                    const util = HOUSING_DATA.usage_styles[s];
                    const calculatedUtil = util.util_add * locMult;
                    return (
                      <div key={s} className={store.housingStyle === s ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('housingStyle', s)}>
                        <div className={styles.cardHeader}>
                          <h4>{gt(util.label)}</h4>
                          <span className={styles.cardPrice}>+{formatPrice(calculatedUtil)}/{store.language === 'fr' ? 'mois' : 'mo'}</span>
                        </div>
                        <p>{gt(util.desc)}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )
      case 3:
        const isPremiumLoc = store.housingLocation === 'premium';
        const locFoodMult = isPremiumLoc ? 1.15 : 1.0;

        const applyFoodHabitPreset = (type: 'eatout10k' | 'student' | 'balanced' | 'foodie') => {
          if (type === 'eatout10k') {
            store.setVal('customHomeMeals', 0);
            store.setVal('customHomeMealCost', 0);
            store.setVal('customRestaurantMeals', 30);
            store.setVal('customRestaurantMealCost', 10000);
            store.setVal('customDeliveryOrders', 0);
            store.setVal('customDeliveryOrderCost', 0);
            store.setVal('customConvenienceBudget', 40000);
            store.setVal('customCafeBudget', 40000);
          } else if (type === 'student') {
            store.setVal('customHomeMeals', 30);
            store.setVal('customHomeMealCost', 4000);
            store.setVal('customRestaurantMeals', 10);
            store.setVal('customRestaurantMealCost', 8000);
            store.setVal('customDeliveryOrders', 2);
            store.setVal('customDeliveryOrderCost', 14000);
            store.setVal('customConvenienceBudget', 50000);
            store.setVal('customCafeBudget', 30000);
          } else if (type === 'balanced') {
            store.setVal('customHomeMeals', 25);
            store.setVal('customHomeMealCost', 7000);
            store.setVal('customRestaurantMeals', 20);
            store.setVal('customRestaurantMealCost', 12000);
            store.setVal('customDeliveryOrders', 4);
            store.setVal('customDeliveryOrderCost', 18000);
            store.setVal('customConvenienceBudget', 60000);
            store.setVal('customCafeBudget', 60000);
          } else if (type === 'foodie') {
            store.setVal('customHomeMeals', 10);
            store.setVal('customHomeMealCost', 10000);
            store.setVal('customRestaurantMeals', 35);
            store.setVal('customRestaurantMealCost', 18000);
            store.setVal('customDeliveryOrders', 10);
            store.setVal('customDeliveryOrderCost', 22000);
            store.setVal('customConvenienceBudget', 80000);
            store.setVal('customCafeBudget', 120000);
          }
        }

        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>{store.language === 'fr' ? 'Alimentation & Boissons' : 'Dining & Drinks Behavior'}</h2>
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={handleReset}
                title={store.language === 'fr' ? 'Réinitialiser toutes les entrées aux valeurs par défaut' : 'Reset all inputs to default'}
              >
                <RotateCcw size={14} />
                <span>{store.language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
              </button>
            </div>

            <div className={styles.modeSwitch}>
              <button 
                className={!store.useCustomFood ? styles.modeButtonActive : styles.modeButton} 
                onClick={() => store.setVal('useCustomFood', false)}
              >
                {gt('Suggested Profiles')}
              </button>
              <button 
                className={store.useCustomFood ? styles.modeButtonActive : styles.modeButton} 
                onClick={() => store.setVal('useCustomFood', true)}
              >
                <Sliders size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {gt('Personalized Habit Calculator')}
              </button>
            </div>

            {store.useCustomFood ? (
              <div className={styles.sectionBlock}>
                <div className={styles.sectionBlockHeader}>
                  <div className={styles.sectionTitleBox}>
                    <div className={styles.sectionIconPill}>
                      <Sliders size={16} />
                    </div>
                    <span className={styles.sectionTitleText}>
                      {gt('Personalized Habit Calculator')}
                    </span>
                  </div>
                </div>
                <p className={styles.sectionSubtitle}>
                  {gt('Enter your actual monthly habits for a more personal estimate.')}
                </p>

                {/* Quick Presets for Custom Calculator */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  <button 
                    type="button" 
                    onClick={() => applyFoodHabitPreset('eatout10k')}
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ✨ {gt("Eat out daily @ ₩10k")}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => applyFoodHabitPreset('student')}
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontWeight: 700, cursor: 'pointer' }}
                  >
                    🍳 {gt("Student cooking & thrift")}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => applyFoodHabitPreset('balanced')}
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ⚖️ {gt("Balanced 50/50")}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => applyFoodHabitPreset('foodie')}
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', background: '#fdf4ff', border: '1px solid #f5d0fe', color: '#86198f', fontWeight: 700, cursor: 'pointer' }}
                  >
                    🥩 {gt("Foodie & Delivery")}
                  </button>
                </div>

                <div className={styles.customInputGrid}>
                  {[
                    ['customHomeMeals', 'Home-cooked meals per month', false],
                    ['customHomeMealCost', 'Average cost per home-cooked meal', true],
                    ['customRestaurantMeals', 'Restaurant meals per month', false],
                    ['customRestaurantMealCost', 'Average cost per restaurant meal', true],
                    ['customDeliveryOrders', 'Delivery orders per month', false],
                    ['customDeliveryOrderCost', 'Average cost per delivery', true],
                    ['customConvenienceBudget', 'Monthly convenience-store budget', true],
                    ['customCafeBudget', 'Monthly cafe and snack budget', true],
                  ].map(([key, label, monetary]) => (
                    <div className={styles.inputGroup} key={String(key)}>
                      <label>{gt(String(label))}{monetary ? ` (${store.currency})` : ''}</label>
                      <input 
                        type="number" 
                        min="0" 
                        value={monetary ? Math.round((store[key as keyof typeof store] as number) / getExchangeRate()) : store[key as keyof typeof store] as number}
                        onChange={(e) => store.setVal(key as keyof typeof store, Math.max(0, Math.round(Number(e.target.value) * (monetary ? getExchangeRate() : 1))))} 
                      />
                    </div>
                  ))}
                </div>

                {(() => {
                  const estimate = (store.customHomeMeals * store.customHomeMealCost) + (store.customRestaurantMeals * store.customRestaurantMealCost * locFoodMult) + (store.customDeliveryOrders * store.customDeliveryOrderCost) + store.customConvenienceBudget + (store.customCafeBudget * locFoodMult);
                  return (
                    <div className={styles.estimateRange} style={{ marginTop: '1.25rem' }}>
                      <div>
                        <strong>{gt('Personal food estimate')}</strong>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', marginTop: '0.25rem' }}>
                          {formatPrice(estimate)}/{store.language === 'fr' ? 'mois' : 'mo'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8125rem' }}><strong>{gt('Low')}:</strong> {formatPrice(estimate * 0.9)}</span>
                        <span style={{ fontSize: '0.8125rem' }}><strong>{gt('Expected')}:</strong> {formatPrice(estimate)}</span>
                        <span style={{ fontSize: '0.8125rem' }}><strong>{gt('High')}:</strong> {formatPrice(estimate * 1.15)}</span>
                      </div>
                    </div>
                  )
                })()}
              </div>
            ) : (
            <div>
               {/* 1. Home Cooking */}
               <div className={styles.sectionBlock}>
                 <div className={styles.sectionBlockHeader}>
                   <div className={styles.sectionTitleBox}>
                     <div className={styles.sectionIconPill}>
                       <Utensils size={16} />
                     </div>
                     <span className={styles.sectionTitleText}>
                       {gt("Home Cooking & Groceries")}
                     </span>
                   </div>
                 </div>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOOD_DATA.cooking) as CookingFreq[]).map(c => {
                      const cost = FOOD_DATA.cooking[c].add;
                      return (
                        <div key={c} className={store.cookingFreq === c ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('cookingFreq', c)}>
                          <div className={styles.cardHeader}>
                            <span>{gt(FOOD_DATA.cooking[c].label)}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{gt(FOOD_DATA.cooking[c].desc)}</p>
                        </div>
                      )
                    })}
                 </div>
               </div>

               {/* 2. Restaurant Meals */}
               <div className={styles.sectionBlock}>
                 <div className={styles.sectionBlockHeader}>
                   <div className={styles.sectionTitleBox}>
                     <div className={styles.sectionIconPill}>
                       <Utensils size={16} />
                     </div>
                     <span className={styles.sectionTitleText}>
                       {gt("Restaurant Meals")}{' '}
                       {isPremiumLoc && (
                         <span style={{ color: '#b45309', fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}>
                           ({store.language === 'fr' ? '+15% Majoration Gangnam Active' : '+15% Gangnam Markup Active'})
                         </span>
                       )}
                     </span>
                   </div>
                 </div>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOOD_DATA.restaurant) as RestaurantFreq[]).map(r => {
                      const cost = FOOD_DATA.restaurant[r].add;
                      const displayCost = cost * locFoodMult;
                      return (
                        <div key={r} className={store.restaurantFreq === r ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('restaurantFreq', r)}>
                          <div className={styles.cardHeader}>
                            <span>{gt(FOOD_DATA.restaurant[r].label)}</span>
                            <span className={styles.cardPrice}>{formatPrice(displayCost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{gt(FOOD_DATA.restaurant[r].desc)}</p>
                        </div>
                      )
                    })}
                 </div>
               </div>

               {/* 3. Delivery App Dining */}
               <div className={styles.sectionBlock}>
                 <div className={styles.sectionBlockHeader}>
                   <div className={styles.sectionTitleBox}>
                     <div className={styles.sectionIconPill}>
                       <ShoppingBag size={16} />
                     </div>
                     <span className={styles.sectionTitleText}>
                       {gt("Delivery App Dining")}
                     </span>
                   </div>
                 </div>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOOD_DATA.delivery) as DeliveryFreq[]).map(d => {
                      const cost = FOOD_DATA.delivery[d].add;
                      return (
                        <div key={d} className={store.deliveryFreq === d ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('deliveryFreq', d)}>
                          <div className={styles.cardHeader}>
                            <span>{gt(FOOD_DATA.delivery[d].label)}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{gt(FOOD_DATA.delivery[d].desc)}</p>
                        </div>
                      )
                    })}
                 </div>
               </div>

               {/* 4. Convenience Stores */}
               <div className={styles.sectionBlock}>
                 <div className={styles.sectionBlockHeader}>
                   <div className={styles.sectionTitleBox}>
                     <div className={styles.sectionIconPill}>
                       <ShoppingBag size={16} />
                     </div>
                     <span className={styles.sectionTitleText}>
                       {gt("Convenience Store Dining")}
                     </span>
                   </div>
                 </div>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOOD_DATA.convenience) as ConvenienceFreq[]).map(c => {
                      const cost = FOOD_DATA.convenience[c].add;
                      return (
                        <div key={c} className={store.convenienceFreq === c ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('convenienceFreq', c)}>
                          <div className={styles.cardHeader}>
                            <span>{gt(FOOD_DATA.convenience[c].label)}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{gt(FOOD_DATA.convenience[c].desc)}</p>
                        </div>
                      )
                    })}
                 </div>
               </div>

               {/* 5. Cafes & Drinks */}
               <div className={styles.sectionBlock}>
                 <div className={styles.sectionBlockHeader}>
                   <div className={styles.sectionTitleBox}>
                     <div className={styles.sectionIconPill}>
                       <Coffee size={16} />
                     </div>
                     <span className={styles.sectionTitleText}>
                       {store.language === 'fr' ? 'Cafés, Thés, Bubble Tea & Boissons' : 'Cafes, Tea, Bubble Tea & Drinks'}{' '}
                       {isPremiumLoc && (
                         <span style={{ color: '#b45309', fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}>
                           ({store.language === 'fr' ? '+15% Majoration Gangnam Active' : '+15% Gangnam Markup Active'})
                         </span>
                       )}
                     </span>
                   </div>
                 </div>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOOD_DATA.cafe_snacks) as CafeFreq[]).map(c => {
                      const cost = FOOD_DATA.cafe_snacks[c].add;
                      const displayCost = cost * locFoodMult;
                      return (
                        <div key={c} className={store.cafeFreq === c ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('cafeFreq', c)}>
                          <div className={styles.cardHeader}>
                            <span>{gt(FOOD_DATA.cafe_snacks[c].label)}</span>
                            <span className={styles.cardPrice}>{formatPrice(displayCost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{gt(FOOD_DATA.cafe_snacks[c].desc)}</p>
                        </div>
                      )
                    })}
                 </div>
               </div>
            </div>
            )}
          </motion.div>
        )
      case 4:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>{store.language === 'fr' ? 'Transports & Déplacements' : 'Transit & Travel Commutes'}</h2>
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={handleReset}
                title={store.language === 'fr' ? 'Réinitialiser toutes les entrées aux valeurs par défaut' : 'Reset all inputs to default'}
              >
                <RotateCcw size={14} />
                <span>{store.language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
              </button>
            </div>

            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Car size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {store.language === 'fr' ? 'Moyen de transport principal' : 'Primary Transit Method'}
                  </span>
                </div>
              </div>
              <p className={styles.sectionSubtitle}>
                {store.language === 'fr' 
                  ? 'Le réseau de métro et bus de Séoul intègre des correspondances gratuites grâce à la carte T-Money ou K-Pass.'
                  : 'Seoul\'s world-class public transit features automatic transfer discounts via T-Money or K-Pass.'
                }
              </p>

              <div className={styles.selectionGrid}>
                {(Object.keys(TRANSPORT_DATA.types) as (keyof typeof TRANSPORT_DATA.types)[]).map(t => {
                  const transit = TRANSPORT_DATA.types[t];
                  const planKey = (store.lifestylePlan === 'none' ? 'moderate' : store.lifestylePlan) as 'survival' | 'moderate' | 'comfortable';
                  const currentCost = transit[planKey] !== undefined ? transit[planKey] : transit.moderate;
                  return (
                    <div key={t} className={store.transportType === t ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('transportType', t)}>
                      <div className={styles.cardHeader}>
                        <h4>{gt(transit.label)}</h4>
                        <span className={styles.cardPrice}>{formatPrice(currentCost)}/{store.language === 'fr' ? 'mois' : 'mo'}</span>
                      </div>
                      <p>{gt(transit.desc)}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )
      case 5:
        const isTourist = store.visaType === 'tourist';
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>{gt("Wellness, Fitness & Health")}</h2>
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={handleReset}
                title={store.language === 'fr' ? 'Réinitialiser toutes les entrées aux valeurs par défaut' : 'Reset all inputs to default'}
              >
                <RotateCcw size={14} />
                <span>{store.language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
              </button>
            </div>

            {isTourist && (
              <div className={styles.warningAlert} style={{ marginBottom: '1.5rem' }}>
                <ShieldAlert size={20} style={{ flexShrink: 0 }} />
                <div>
                  <strong>{gt("Private Travel/Expat Insurance Required:")}</strong>{' '}
                  {gt("Tourist visa holders are ineligible for the South Korean National Health Insurance Service (NHIS) subsidy. You must purchase comprehensive travel or expat insurance to cover medical care.")}
                </div>
              </div>
            )}

            {/* 1. Basic Health Insurance */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <ShieldAlert size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Basic Insurance & Regular Visits")}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid}>
                {BEHAVIOR_LEVELS.map(l => {
                  const cost = getInsuranceCost(l);
                  const tierLabel = l === 'none' ? gt('none') : 
                    l === 'survival' ? (store.language === 'fr' ? 'Niveau Économe (Essentiel)' : 'Essential Tier') :
                    l === 'moderate' ? (store.language === 'fr' ? 'Niveau Standard' : 'Standard Tier') :
                    (store.language === 'fr' ? 'Niveau Confort' : 'Comfort Tier');
                  return (
                    <div key={l} className={store.healthBasic === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthBasic', l)}>
                      <div className={styles.cardHeader}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{tierLabel}</span>
                        <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getWellnessDesc('basic', l, store.visaType)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 2. Fitness & Active Lifestyle */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Dumbbell size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Fitness & Active Lifestyle")}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid}>
                {BEHAVIOR_LEVELS.map(l => {
                  const val = HEALTH_DATA.gym[l as keyof typeof HEALTH_DATA.gym];
                  const cost = l === 'none' ? 0 : (val as number);
                  const tierLabel = l === 'none' ? gt('none') : 
                    l === 'survival' ? (store.language === 'fr' ? 'Niveau Économe' : 'Essential Tier') :
                    l === 'moderate' ? (store.language === 'fr' ? 'Niveau Standard' : 'Standard Tier') :
                    (store.language === 'fr' ? 'Niveau Confort' : 'Comfort Tier');
                  return (
                    <div key={l} className={store.healthGym === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthGym', l)}>
                      <div className={styles.cardHeader}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{tierLabel}</span>
                        <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getWellnessDesc('gym', l)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 3. Medical Clinics & Specialists */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Heart size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Medical Clinics & Specialists")}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid}>
                {BEHAVIOR_LEVELS.map(l => {
                  const val = HEALTH_DATA.healthcare[l as keyof typeof HEALTH_DATA.healthcare];
                  const cost = l === 'none' ? 0 : (val as number);
                  const tierLabel = l === 'none' ? gt('none') : 
                    l === 'survival' ? (store.language === 'fr' ? 'Niveau Économe' : 'Essential Tier') :
                    l === 'moderate' ? (store.language === 'fr' ? 'Niveau Standard' : 'Standard Tier') :
                    (store.language === 'fr' ? 'Niveau Confort' : 'Comfort Tier');
                  return (
                    <div key={l} className={store.healthClinic === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthClinic', l)}>
                      <div className={styles.cardHeader}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{tierLabel}</span>
                        <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getWellnessDesc('clinic', l)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 4. Personal & Self Care */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <User size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Personal & Self Care")}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid}>
                {BEHAVIOR_LEVELS.map(l => {
                  const val = HEALTH_DATA.personal[l as keyof typeof HEALTH_DATA.personal];
                  const cost = l === 'none' ? 0 : (val as number);
                  const tierLabel = l === 'none' ? gt('none') : 
                    l === 'survival' ? (store.language === 'fr' ? 'Niveau Économe' : 'Essential Tier') :
                    l === 'moderate' ? (store.language === 'fr' ? 'Niveau Standard' : 'Standard Tier') :
                    (store.language === 'fr' ? 'Niveau Confort' : 'Comfort Tier');
                  return (
                    <div key={l} className={store.healthPersonal === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthPersonal', l)}>
                      <div className={styles.cardHeader}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{tierLabel}</span>
                        <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getWellnessDesc('personal', l)}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )
      case 6:
        const isPremiumLocForS6 = store.housingLocation === 'premium';
        const locFoodMultForS6 = isPremiumLocForS6 ? 1.15 : 1.0;
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>{gt("Lifestyle, Shopping & Socials")}</h2>
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={handleReset}
                title={store.language === 'fr' ? 'Réinitialiser toutes les entrées aux valeurs par défaut' : 'Reset all inputs to default'}
              >
                <RotateCcw size={14} />
                <span>{store.language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
              </button>
            </div>

            {/* 1. Digital Subscriptions & SIM */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Smartphone size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Digital Subscriptions & SaaS")}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid} style={{ marginBottom: '1.25rem' }}>
                <div className={!store.useCustomDigital ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('useCustomDigital', false)}>
                   <span>{gt('Plan-based Pricing')}</span>
                </div>
                <div className={store.useCustomDigital ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('useCustomDigital', true)}>
                   <span>{gt('Custom Manual Amount')}</span>
                </div>
              </div>

              {store.useCustomDigital ? (
                <div className={styles.inputGroup} style={{ marginTop: '0.5rem' }}>
                  <label>{gt("Custom Monthly Digital Budget")} ({store.currency})</label>
                  <input 
                    type="number" 
                    placeholder={store.language === 'fr' ? `Saisissez le montant en ${store.currency}...` : `Enter amount in ${store.currency}...`} 
                    value={store.customDigitalAmount ? Math.round(store.customDigitalAmount / getExchangeRate()) : ''} 
                    onChange={(e) => store.setVal('customDigitalAmount', Math.max(0, Math.round(parseFloat(e.target.value) * getExchangeRate()) || 0))} 
                  />
                </div>
              ) : (
                <div className={styles.checkboxContainer}>
                  {(() => {
                    const planKey = (store.lifestylePlan === 'none' ? 'moderate' : store.lifestylePlan) as 'survival' | 'moderate' | 'comfortable';
                    return (
                      <>
                        <div 
                          className={store.digitalSim ? styles.checkboxRowActive : styles.checkboxRow} 
                          onClick={() => store.setVal('digitalSim', !store.digitalSim)}
                        >
                          <input type="checkbox" checked={store.digitalSim} readOnly />
                          <div className={styles.checkboxText}>
                            <span className={styles.checkboxLabel}>{gt(DIGITAL_DATA.types.sim_apps.label)}</span>
                            <span className={styles.checkboxDesc}>
                              {gt("Active SIM line + essential daily navigation apps.")} ({store.language === 'fr' ? 'Par défaut :' : 'Default:'} {formatPrice(DIGITAL_DATA.types.sim_apps[planKey])}/{store.language === 'fr' ? 'mois' : 'mo'})
                            </span>
                          </div>
                        </div>
                        {store.digitalSim && (
                          <div 
                            className={styles.inputGroup} 
                            style={{ marginLeft: '2.5rem', marginBottom: '1.25rem', width: 'calc(100% - 2.5rem)', animation: 'fadeIn 0.2s ease' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                              {store.language === 'fr' ? 'Coût Mensuel Carte SIM' : 'SIM Card Monthly Cost'} ({store.currency})
                            </label>
                            <input 
                              type="number" 
                              value={store.amountSim ? Math.round(store.amountSim / getExchangeRate()) : ''} 
                              onChange={(e) => store.setVal('amountSim', Math.max(0, Math.round(parseFloat(e.target.value) * getExchangeRate()) || 0))} 
                            />
                          </div>
                        )}

                        <div 
                          className={store.digitalSubs ? styles.checkboxRowActive : styles.checkboxRow} 
                          onClick={() => store.setVal('digitalSubs', !store.digitalSubs)}
                        >
                          <input type="checkbox" checked={store.digitalSubs} readOnly />
                          <div className={styles.checkboxText}>
                            <span className={styles.checkboxLabel}>{gt(DIGITAL_DATA.types.subscriptions.label)}</span>
                            <span className={styles.checkboxDesc}>
                              {gt("Streaming, music, and simple tools.")} ({store.language === 'fr' ? 'Par défaut :' : 'Default:'} {formatPrice(DIGITAL_DATA.types.subscriptions[planKey])}/{store.language === 'fr' ? 'mois' : 'mo'})
                            </span>
                          </div>
                        </div>
                        {store.digitalSubs && (
                          <div 
                            className={styles.inputGroup} 
                            style={{ marginLeft: '2.5rem', marginBottom: '1.25rem', width: 'calc(100% - 2.5rem)', animation: 'fadeIn 0.2s ease' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                              {store.language === 'fr' ? 'Coût Mensuel Abonnements' : 'Subscriptions Monthly Cost'} ({store.currency})
                            </label>
                            <input 
                              type="number" 
                              value={store.amountSubs ? Math.round(store.amountSubs / getExchangeRate()) : ''} 
                              onChange={(e) => store.setVal('amountSubs', Math.max(0, Math.round(parseFloat(e.target.value) * getExchangeRate()) || 0))} 
                            />
                          </div>
                        )}

                        <div 
                          className={store.digitalSaas ? styles.checkboxRowActive : styles.checkboxRow} 
                          onClick={() => store.setVal('digitalSaas', !store.digitalSaas)}
                        >
                          <input type="checkbox" checked={store.digitalSaas} readOnly />
                          <div className={styles.checkboxText}>
                            <span className={styles.checkboxLabel}>{gt(DIGITAL_DATA.types.saas_ai.label)}</span>
                            <span className={styles.checkboxDesc}>
                              {gt("Heavy AI, cloud storage, and work tools.")} ({store.language === 'fr' ? 'Par défaut :' : 'Default:'} {formatPrice(DIGITAL_DATA.types.saas_ai[planKey])}/{store.language === 'fr' ? 'mois' : 'mo'})
                            </span>
                          </div>
                        </div>
                        {store.digitalSaas && (
                          <div 
                            className={styles.inputGroup} 
                            style={{ marginLeft: '2.5rem', marginBottom: '1.25rem', width: 'calc(100% - 2.5rem)', animation: 'fadeIn 0.2s ease' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                              {store.language === 'fr' ? 'Coût Mensuel Outils SaaS & IA' : 'SaaS & AI Tools Monthly Cost'} ({store.currency})
                            </label>
                            <input 
                              type="number" 
                              value={store.amountSaas ? Math.round(store.amountSaas / getExchangeRate()) : ''} 
                              onChange={(e) => store.setVal('amountSaas', Math.max(0, Math.round(parseFloat(e.target.value) * getExchangeRate()) || 0))} 
                            />
                          </div>
                        )}

                        <div 
                          className={store.digitalCreator ? styles.checkboxRowActive : styles.checkboxRow} 
                          onClick={() => store.setVal('digitalCreator', !store.digitalCreator)}
                        >
                          <input type="checkbox" checked={store.digitalCreator} readOnly />
                          <div className={styles.checkboxText}>
                            <span className={styles.checkboxLabel}>{gt(DIGITAL_DATA.types.creator_stack.label)}</span>
                            <span className={styles.checkboxDesc}>
                              {gt("Professional multimedia stack for designers & devs.")} ({store.language === 'fr' ? 'Par défaut :' : 'Default:'} {formatPrice(DIGITAL_DATA.types.creator_stack[planKey])}/{store.language === 'fr' ? 'mois' : 'mo'})
                            </span>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                  {store.digitalCreator && (
                    <div 
                      className={styles.inputGroup} 
                      style={{ marginLeft: '2.5rem', marginBottom: '1.25rem', width: 'calc(100% - 2.5rem)', animation: 'fadeIn 0.2s ease' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                        {store.language === 'fr' ? 'Coût Mensuel Pack Créatif' : 'Creator Stack Monthly Cost'} ({store.currency})
                      </label>
                      <input 
                        type="number" 
                        value={store.amountCreator ? Math.round(store.amountCreator / getExchangeRate()) : ''} 
                        onChange={(e) => store.setVal('amountCreator', Math.max(0, Math.round(parseFloat(e.target.value) * getExchangeRate()) || 0))} 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Social Life & Outings */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Sparkles size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Social Life & Outings")}{' '}
                    {isPremiumLocForS6 && (
                      <span style={{ color: '#b45309', fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}>
                        ({store.language === 'fr' ? '+15% Majoration Gangnam Active' : '+15% Gangnam Markup Active'})
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid}>
                {BEHAVIOR_LEVELS.map(l => {
                  const cost = l === 'none' ? 0 : (LIFESTYLE_DATA.social[l as keyof typeof LIFESTYLE_DATA.social] as number);
                  const displayCost = cost * locFoodMultForS6;
                  const tierLabel = l === 'none' ? gt('none') : 
                    l === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Essential') :
                    l === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                    (store.language === 'fr' ? 'Confort' : 'Comfort');
                  return (
                    <div key={l} className={store.socialLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('socialLevel', l)}>
                      <div className={styles.cardHeader}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{tierLabel}</span>
                        <span className={styles.cardPrice}>{formatPrice(displayCost)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getLifestyleDesc('social', l)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 3. Shopping & Consumer Goods */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <ShoppingBag size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Shopping & Consumer Goods")}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid}>
                {BEHAVIOR_LEVELS.map(l => {
                  const cost = l === 'none' ? 0 : (LIFESTYLE_DATA.shopping[l as keyof typeof LIFESTYLE_DATA.shopping] as number);
                  const tierLabel = l === 'none' ? gt('none') : 
                    l === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Essential') :
                    l === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                    (store.language === 'fr' ? 'Confort' : 'Comfort');
                  return (
                    <div key={l} className={store.shoppingLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('shoppingLevel', l)}>
                      <div className={styles.cardHeader}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{tierLabel}</span>
                        <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getLifestyleDesc('shopping', l)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 4. Fashion & Clothing */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <ShoppingBag size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Fashion & Clothing Updates")}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid}>
                {BEHAVIOR_LEVELS.map(l => {
                  const cost = l === 'none' ? 0 : (LIFESTYLE_DATA.clothing[l as keyof typeof LIFESTYLE_DATA.clothing] as number);
                  const tierLabel = l === 'none' ? gt('none') : 
                    l === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Essential') :
                    l === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                    (store.language === 'fr' ? 'Confort' : 'Comfort');
                  return (
                    <div key={l} className={store.clothingLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('clothingLevel', l)}>
                      <div className={styles.cardHeader}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{tierLabel}</span>
                        <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getLifestyleDesc('clothing', l)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 5. Entertainment & Leisure */}
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHeader}>
                <div className={styles.sectionTitleBox}>
                  <div className={styles.sectionIconPill}>
                    <Zap size={16} />
                  </div>
                  <span className={styles.sectionTitleText}>
                    {gt("Entertainment & Leisure (Cinema/Events)")}
                  </span>
                </div>
              </div>
              <div className={styles.selectionGrid}>
                {BEHAVIOR_LEVELS.map(l => {
                  const cost = l === 'none' ? 0 : (LIFESTYLE_DATA.entertainment[l as keyof typeof LIFESTYLE_DATA.entertainment] as number);
                  const tierLabel = l === 'none' ? gt('none') : 
                    l === 'survival' ? (store.language === 'fr' ? 'Économe' : 'Essential') :
                    l === 'moderate' ? (store.language === 'fr' ? 'Standard' : 'Standard') :
                    (store.language === 'fr' ? 'Confort' : 'Comfort');
                  return (
                    <div key={l} className={store.entertainmentLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('entertainmentLevel', l)}>
                      <div className={styles.cardHeader}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>{tierLabel}</span>
                        <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getLifestyleDesc('entertainment', l)}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )
      case 7:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className={styles.summaryContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>{store.language === 'fr' ? 'Résumé de la Réserve Budgétaire' : 'Runway & Budget Summary'}</h2>
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={handleReset}
                title={store.language === 'fr' ? 'Réinitialiser toutes les entrées et le résumé' : 'Reset all inputs and runway summary'}
              >
                <RotateCcw size={14} />
                <span>{store.language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
              </button>
            </div>
            {store.proOptimized && (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
                <Sparkles size={20} />
                <div>
                  <strong>
                    {store.language === 'fr' ? "Mode d'Optimisation Locale par IA Activé !" : "AI Local Optimization Mode Active!"}
                  </strong>{' '}
                  {store.language === 'fr'
                    ? "Les chiffres ci-dessous reflètent des techniques dynamiques d'optimisation des coûts (remboursements K-Pass, cartes SIM MVNO économiques, tarifs de loyer direct négociés et installations de services économes)."
                    : "The numbers below reflect dynamic local cost optimization techniques (K-Pass rebates, MVNO SIM cards, negotiated direct rent rates, and thrift utility setups)."
                  }
                </div>
              </div>
            )}
            
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <h3>{store.language === 'fr' ? "Capital d'Installation Immédiat" : "Immediate Setup Cash"}</h3>
                <div className={styles.amount}>{formatPrice(totals.totalUpfront)}</div>
                <p>
                  {store.language === 'fr'
                    ? (totals.totalUpfront > 0 
                        ? `1er Mois Loyer/Charges + Caution + ${gt(SETUP_DATA.installation_matrix[store.lifestylePlan === 'none' ? 'moderate' : store.lifestylePlan]?.label || 'Setup').split(' ')[0]} + Visa`
                        : 'Sélectionnez vos options pour calculer votre capital initial.')
                    : (totals.totalUpfront > 0 
                        ? `1st Month Rent/Bills + Deposit + ${SETUP_DATA.installation_matrix[store.lifestylePlan === 'none' ? 'moderate' : store.lifestylePlan]?.label.split(' ')[0] || 'Setup'} + Visa`
                        : 'Select options to calculate your initial setup cash.')
                  }
                </p>
              </div>
              <div className={styles.summaryCard}>
                <h3>{store.language === 'fr' ? "Dépenses Mensuelles (Burn Rate)" : "Burn Rate"}</h3>
                <div className={styles.amount}>{formatPrice(totals.monthlyBurn)}</div>
                <p>
                  {store.language === 'fr'
                    ? "Dépenses mensuelles estimées selon vos habitudes"
                    : "Est. Monthly Behavior-Driven Cost"
                  }
                </p>
              </div>
               <div className={styles.summaryCardPrimary}>
                <h3>{store.language === 'fr' ? "Budget Total Requis (Runway)" : "Total Runway Budget"}</h3>
                <div className={styles.amountIndicator}>{formatPrice(totals.totalBudgetRequired)}</div>
                <p>
                  {store.language === 'fr'
                    ? `Capital initial + budget de réserve de ${store.duration} mois`
                    : `Immediate + ${store.duration} Months Duration Runway`
                  }
                </p>
              </div>
            </div>

            {/* Month-by-Month Budget Schedule */}
            <div style={{ marginTop: '2.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {store.language === 'fr' ? 'Échéancier Mensuel de la Réserve' : 'Month-by-Month Runway Schedule'}
              </h4>
              <div className={styles.monthCardsGrid}>
                 {Array.from({ length: store.duration }).map((_, idx) => {
                   const monthNum = idx + 1;
                   const isMonthOne = monthNum === 1;
                   const monthlyCost = isMonthOne ? totals.totalUpfront : totals.monthlyBurn;
                   
                   return (
                     <div key={monthNum} className={isMonthOne ? styles.monthCardActive : styles.monthCard}>
                       <h4>{store.language === 'fr' ? 'Mois' : 'Month'} {monthNum}</h4>
                       <div className={styles.monthCardVal}>{formatPrice(monthlyCost)}</div>
                       <p className={styles.monthCardDesc}>
                         {isMonthOne ? (store.language === 'fr' ? '🚀 Démarrage + Dépenses' : '🚀 Setup + Burn') : (store.language === 'fr' ? 'Dépenses Courantes' : 'Regular Burn')}
                       </p>
                     </div>
                   );
                 })}
              </div>
            </div>

            <div className={styles.breakdownBox} style={{ marginTop: '2.5rem' }}>
               <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                 {store.language === 'fr' ? 'Répartition Budgétaire Comportementale' : 'Behavior-Based Budget Breakdown'}
               </h4>
               <div className={styles.barChart}>
                  {Object.entries(totals.breakdown).map(([name, val]) => {
                    const categoryTranslation: Record<string, string> = {
                      housing: store.language === 'fr' ? 'Logement' : 'Housing',
                      food: store.language === 'fr' ? 'Alimentation' : 'Food',
                      transport: store.language === 'fr' ? 'Transport' : 'Transport',
                      digital: store.language === 'fr' ? 'Numérique & SIM' : 'Digital & SIM',
                      lifestyle: store.language === 'fr' ? 'Style de vie & Abonnements' : 'Lifestyle & Subs',
                      wellness: store.language === 'fr' ? 'Santé & Bien-être' : 'Wellness & Health',
                      health: store.language === 'fr' ? 'Santé' : 'Health',
                      visa: store.language === 'fr' ? 'Visa' : 'Visa',
                      setup: store.language === 'fr' ? 'Installation' : 'Setup',
                    };
                    const categoryColors: Record<string, string> = {
                      housing: 'linear-gradient(90deg, #059669 0%, #10b981 100%)',
                      food: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
                      transport: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                      digital: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
                      lifestyle: 'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)',
                      wellness: 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 100%)',
                      health: 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 100%)',
                      visa: 'linear-gradient(90deg, #64748b 0%, #94a3b8 100%)',
                      setup: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                    };
                    const displayName = categoryTranslation[name.toLowerCase()] || name;
                    const barColor = categoryColors[name.toLowerCase()] || 'linear-gradient(90deg, #059669 0%, #10b981 100%)';
                    return (
                      <div key={name} className={styles.barItem}>
                         <div className={styles.barLabel}>
                           <span style={{ fontWeight: 700, color: '#334155', textTransform: 'capitalize' }}>{displayName}</span> 
                           <span>{formatPrice(val)}/{store.language === 'fr' ? 'mois' : 'mo'} ({Math.round((val / totals.monthlyBurn) * 100)}%)</span>
                         </div>
                         <div className={styles.barLine}>
                           <div style={{ width: `${((val) / Math.max(1, totals.monthlyBurn)) * 100}%`, background: barColor }} />
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
               <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
                 <Info size={16} /> {store.language === 'fr' ? 'Avis du Moteur de Comportement' : 'Behavior Engine Notice'}
               </h4>
               <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.5' }}>
                 {store.language === 'fr' 
                   ? 'Votre budget KCalc est calculé dynamiquement selon vos habitudes de vie. Modifier vos choix dans le panneau de gauche mettra à jour instantanément votre réserve et votre calendrier de trésorerie.'
                   : 'Your KCalc is calculated dynamically based on your chosen behavior habits. Adjusting your selections in the left sidebar will instantly update your projected monthly runway and cash flow schedules.'
                 }
               </p>
            </div>

            {/* Premium Pro Consultation Callout Section */}
            <div className={styles.proCard}>
              <div className={styles.proHeader}>
                <span className={styles.proBadge}>
                  <Sparkles size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> KCalc Premium
                </span>
                <span className={styles.proSavingsAmount}>
                  $229 USD
                </span>
              </div>
              <div className={styles.proContent}>
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem 1.25rem', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', color: '#10b981' }}>{t.potentialSavings}</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#10b981' }}>{store.language === 'fr' ? 'Économisez jusqu\'à' : 'Save up to'} {formatPrice(totals.potentialSavings)}</span>
                  <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{t.potentialSavingsDesc}</span>
                </div>
                <h3 className={styles.proTitle}>{t.premiumTitle}</h3>
                <p className={styles.proText}>
                  {t.premiumDesc}
                </p>
                <div className={styles.proFeaturesList}>
                  <div className={styles.proFeatureItem}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span><strong>{t.counselorLabel}:</strong> {t.counselorDesc}</span>
                  </div>
                  <div className={styles.proFeatureItem}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span><strong>{t.optimizationLabel}:</strong> {t.optimizationDesc}</span>
                  </div>
                  <div className={styles.proFeatureItem}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span><strong>{t.settlingKitLabel}:</strong> {t.settlingKitDesc}</span>
                  </div>
                  <div className={styles.proFeatureItem}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span><strong>{t.hotlineLabel}:</strong> {t.hotlineDesc}</span>
                  </div>
                </div>
              </div>

              {showPurchaseForm ? (
                <div style={{ animation: 'fadeIn 0.3s ease', marginTop: '1.5rem' }}>
                  <div style={{ background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.2)', padding: '1rem 1.25rem', borderRadius: '1rem', marginBottom: '1.25rem', fontSize: '0.875rem', color: '#a7f3d0', lineHeight: '1.5' }}>
                    <strong>{t.howBookingWorks}</strong><br />
                    {t.howBookingDesc}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button className={styles.formCancelBtn} onClick={() => setShowPurchaseForm(false)}>
                      {t.goBack}
                    </button>
                  </div>
                  <iframe 
                    src="https://appt.link/meet-with-foranet-NrvCv15i/kcal-budget-korea" 
                    width="100%" 
                    height="700px" 
                    style={{ border: 'none', borderRadius: '1rem', background: 'white' }}
                    title="Book Consultation"
                  />
                </div>
              ) : (
                <div className={styles.proActions}>
                  <button className={styles.proBtnPrimary} onClick={() => setShowPurchaseForm(true)}>
                    <Calendar size={16} /> {t.buyPackage}
                  </button>
                  <button className={styles.proBtnSecondary} onClick={() => store.setVal('proOptimized', !store.proOptimized)}>
                    <TrendingDown size={16} />
                    {store.proOptimized ? t.resetStandard : t.previewOptimized}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.calculatorWrapper} ref={calculatorTopRef}>
      <div className={styles.mobileProgress}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{store.language === 'fr' ? 'Étape' : 'Step'} {currentStep} / {STEPS.length}</span>
          <strong style={{ fontSize: '0.8125rem' }}>
            {currentStep === 1 ? t.stepPresets : currentStep === 2 ? t.stepHousing : currentStep === 3 ? t.stepFood : currentStep === 4 ? t.stepTransport : currentStep === 5 ? t.stepHealth : currentStep === 6 ? t.stepLifestyle : t.stepSummary}
          </strong>
        </div>
        <div style={{ width: '100%', height: '4px', background: 'rgba(5, 150, 105, 0.15)', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
          <div style={{ width: `${(currentStep / STEPS.length) * 100}%`, height: '100%', background: '#059669', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      <div className={styles.stepperNav} ref={stepperRef}>
        {STEPS.map((step) => (
          <div 
            key={step.id} 
            className={`${styles.stepIndicator} ${currentStep === step.id ? styles.active : ''} ${currentStep > step.id ? styles.completed : ''}`}
            onClick={() => goToStep(step.id)}
          >
            <div className={styles.iconCircle}>
              <step.icon size={16} />
            </div>
            <div className={styles.stepTextContainer}>
              <div className={styles.stepHeaderRow}>
                <span>
                  {step.id === 1 ? t.stepPresets :
                   step.id === 2 ? t.stepHousing :
                   step.id === 3 ? t.stepFood :
                   step.id === 4 ? t.stepTransport :
                   step.id === 5 ? t.stepHealth :
                   step.id === 6 ? t.stepLifestyle :
                   t.stepSummary}
                </span>
                <span className={styles.stepNumber}>0{step.id}</span>
              </div>
              <span className={styles.selectionPreview}>{getStepSelectionPreview(step.id)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainPanel}>
        <div className={styles.contentArea}>
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
        <div className={styles.controls}>
          <button onClick={handleBack} disabled={currentStep === 1} className={styles.backBtn}>
            <ChevronLeft size={20} /> {t.backBtn}
          </button>
          
          <button 
            type="button" 
            className={styles.resetBtn} 
            onClick={handleReset}
            title={store.language === 'fr' ? 'Réinitialiser toutes les entrées' : 'Reset all inputs'}
          >
            <RotateCcw size={14} />
            <span>{store.language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
          </button>

          <button 
            onClick={currentStep === STEPS.length ? () => setShowDiagnostic(true) : handleNext} 
            className={styles.nextBtn}
          >
            {currentStep === STEPS.length ? (store.language === 'fr' ? 'Rapport de Diagnostic' : 'Get Full Diagnostic') : t.nextBtn} <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {showDiagnostic && (
        (() => {
          const houseKey = (store.housingType !== 'none' && (HOUSING_DATA.types as any)[store.housingType])
            ? (store.housingType as keyof typeof HOUSING_DATA.types)
            : null;
          const depositCost = houseKey ? (HOUSING_DATA.types[houseKey].deposit * (HOUSING_DATA.locations[store.housingLocation]?.mult || 1)) : 0;
          const planKey = (store.lifestylePlan === 'none' ? 'moderate' : store.lifestylePlan) as 'survival' | 'moderate' | 'comfortable';
          const baseRent = houseKey ? (HOUSING_DATA.types[houseKey][planKey] !== undefined ? HOUSING_DATA.types[houseKey][planKey] : HOUSING_DATA.types[houseKey].moderate) : 0;
          const rentCost = baseRent * (HOUSING_DATA.locations[store.housingLocation]?.mult || 1);
          const utilitiesCost = !houseKey || (store.housingType === 'friend' && store.friendUtilitiesIncluded)
            ? 0
            : (HOUSING_DATA.usage_styles[store.housingStyle]?.util_add || 0) * (HOUSING_DATA.locations[store.housingLocation]?.mult || 1);
          const installationCost = store.lifestylePlan !== 'none' ? (SETUP_DATA.installation_matrix[planKey]?.amount || 0) : (houseKey ? 300000 : 0);
          const visaCost = (VISA_DATA[store.visaType]?.add || 0) + SETUP_DATA.base_admin;
          const emergencyCost = SETUP_DATA.emergency_cash;
          
          const basicCost = getInsuranceCost(store.healthBasic);
          const gymCost = store.healthGym !== 'none' ? (HEALTH_DATA.gym[store.healthGym] || 0) : 0;
          const clinicCost = store.healthClinic !== 'none' ? (HEALTH_DATA.healthcare[store.healthClinic] || 0) : 0;
          const personalCost = store.healthPersonal !== 'none' ? (HEALTH_DATA.personal[store.healthPersonal] || 0) : 0;

          const homeCost = store.useCustomFood ? store.customHomeMeals * store.customHomeMealCost : (FOOD_DATA.cooking[store.cookingFreq]?.add || 0);
          const restCost = (store.useCustomFood ? store.customRestaurantMeals * store.customRestaurantMealCost : (FOOD_DATA.restaurant[store.restaurantFreq]?.add || 0)) * (store.housingLocation === 'premium' ? 1.15 : 1.0);
          const delCost = store.useCustomFood ? store.customDeliveryOrders * store.customDeliveryOrderCost : (FOOD_DATA.delivery[store.deliveryFreq as keyof typeof FOOD_DATA.delivery]?.add || 0);
          const cvsCost = store.useCustomFood ? store.customConvenienceBudget : (FOOD_DATA.convenience[store.convenienceFreq as keyof typeof FOOD_DATA.convenience]?.add || 0);
          const cafeCost = (store.useCustomFood ? store.customCafeBudget : (FOOD_DATA.cafe_snacks[store.cafeFreq as keyof typeof FOOD_DATA.cafe_snacks]?.add || 0)) * (store.housingLocation === 'premium' ? 1.15 : 1.0);

          let digitalCost = 0;
          if (store.useCustomDigital) {
            digitalCost = store.customDigitalAmount;
          } else {
            const simCost = store.digitalSim ? store.amountSim : 0;
            const subsCost = store.digitalSubs ? store.amountSubs : 0;
            const saasCost = store.digitalSaas ? store.amountSaas : 0;
            const creatorCost = store.digitalCreator ? store.amountCreator : 0;
            digitalCost = simCost + subsCost + saasCost + creatorCost;
          }

          const isPremiumLoc = store.housingLocation === 'premium';
          const locMult = HOUSING_DATA.locations[store.housingLocation]?.mult || 1.0;

          return (
            <div className={styles.modalOverlay} onClick={() => setShowDiagnostic(false)}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>
                    {store.language === 'fr' ? '📊 Rapport de Diagnostic des Coûts KCalc' : '📊 KCalc Cost Diagnostic Report'}
                  </h2>
                  <button className={styles.closeModalBtn} onClick={() => setShowDiagnostic(false)}>
                    <AlertCircle size={24} style={{ transform: 'rotate(45deg)' }} />
                  </button>
                </div>
                
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: '1.5' }}>
                  {store.language === 'fr' 
                    ? "Nous avons analysé votre visa, vos multiplicateurs de localisation et vos habitudes. Voici la répartition comparative de votre capital de départ par rapport à vos dépenses mensuelles régulières. Cliquez sur une carte pour voir les détails."
                    : "We analyzed your visa, location multipliers, and habit levels. Below is the side-by-side cost breakdown showing your Day 1 Capital vs. regular month burn rate. Click any card to expand its detailed items."
                  }
                </p>

                <div className={styles.modalGrid}>
                  {/* Column 1: Month 1 Startup */}
                  <div className={styles.diagnosticColumn}>
                    <div className={styles.columnHeader}>
                      <Home size={20} color="#059669" />
                      <h3>{store.language === 'fr' ? 'Capital de Départ Jour 1' : 'Month 1 Startup Capital'}</h3>
                    </div>
                    
                    <div className={styles.diagnosticList}>
                      {/* Deposit */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('deposit')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Caution Logement (Key Money)' : 'Housing Security Deposit'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(depositCost)}</span>
                        </div>
                        {expandedItems['deposit'] && (
                          <div className={styles.itemAdvice}>
                            {!houseKey
                              ? (store.language === 'fr' ? 'Aucun logement sélectionné.' : 'No housing selected.')
                              : store.housingType === 'friend' 
                                ? (store.language === 'fr' ? 'Logé chez un proche : aucune caution requise.' : 'Staying with friend/family: Zero security deposit required.')
                                : (store.language === 'fr' 
                                    ? `Basé sur le type "${gt(HOUSING_DATA.types[houseKey]?.label || '')}". En Corée (Jeonse/Wolse), la caution est restituée à la fin du bail.`
                                    : `Based on "${HOUSING_DATA.types[houseKey]?.label || ''}". In Korea's Wolse system, this deposit is fully refundable at move-out.`
                                  )
                            }
                          </div>
                        )}
                      </div>

                      {/* Setup Essentials */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('setup')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Kit d\'Installation & Literie' : 'Home Setup & Essentials'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(installationCost)}</span>
                        </div>
                        {expandedItems['setup'] && (
                          <div className={styles.itemAdvice}>
                            {(() => {
                              const plan = (store.lifestylePlan === 'none' ? 'moderate' : store.lifestylePlan) as 'survival' | 'moderate' | 'comfortable';
                              return store.language === 'fr' 
                                ? `${gt(SETUP_DATA.installation_matrix[plan]?.label || 'Setup')} : ${gt(SETUP_DATA.installation_matrix[plan]?.desc || '')}`
                                : `${SETUP_DATA.installation_matrix[plan]?.label}: ${SETUP_DATA.installation_matrix[plan]?.desc}`;
                            })()}
                          </div>
                        )}
                      </div>

                      {/* Visa & Admin */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('visa')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Frais de Visa & Carte ARC' : 'Visa Processing & ARC Card'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(visaCost)}</span>
                        </div>
                        {expandedItems['visa'] && (
                          <div className={styles.itemAdvice}>
                            {store.language === 'fr'
                              ? 'Comprend les frais d\'Alien Registration Card (ARC), de timbre fiscal et démarches consulaires d\'immigration.'
                              : 'Includes Alien Registration Card (ARC) government processing, revenue stamps, and entry administration fees.'
                            }
                          </div>
                        )}
                      </div>

                      {/* Emergency Buffer */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('emergency')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Réserve de Sécurité d\'Urgence' : 'Emergency Safety Cash'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(emergencyCost)}</span>
                        </div>
                        {expandedItems['emergency'] && (
                          <div className={styles.itemAdvice}>
                            {store.language === 'fr'
                              ? 'Fonds de réserve liquide recommandé pour les imprévus médicaux, transports initiaux et retards bancaires à l\'arrivée.'
                              : 'Recommended liquid cash buffer for unexpected initial transit, medical co-pays, or initial banking setup delays.'
                            }
                          </div>
                        )}
                      </div>

                      {/* Month 1 Living Burn */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('firstMonthBurn')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? '1er Mois de Dépenses Courantes' : 'First Month Living Expenses'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(totals.monthlyBurn)}</span>
                        </div>
                        {expandedItems['firstMonthBurn'] && (
                          <div className={styles.itemAdvice}>
                            {store.language === 'fr'
                              ? 'Premier mois de loyer, charges, courses, forfaits et transports inclus dans le capital initial.'
                              : 'First month\'s rent, utilities, food, transport, and personal expenses upfront.'
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Monthly Burn Rate */}
                  <div className={styles.diagnosticColumn}>
                    <div className={styles.columnHeader}>
                      <Wallet size={20} color="#10b981" />
                      <h3>{store.language === 'fr' ? 'Dépenses Mensuelles Régulières' : 'Regular Monthly Burn Rate'}</h3>
                    </div>

                    <div className={styles.diagnosticList}>
                      {/* Rent & Utilities */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('monthlyHousing')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Loyer Mensuel & Charges' : 'Monthly Rent & Utilities'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(rentCost + utilitiesCost)}</span>
                        </div>
                        {expandedItems['monthlyHousing'] && (
                          <div className={styles.itemAdvice}>
                            {store.language === 'fr'
                              ? `Loyer : ${formatPrice(rentCost)} + Charges estimées : ${formatPrice(utilitiesCost)} (${gt(HOUSING_DATA.usage_styles[store.housingStyle]?.label || 'Standard')}).`
                              : `Rent: ${formatPrice(rentCost)} + Estimated Utilities: ${formatPrice(utilitiesCost)} (${HOUSING_DATA.usage_styles[store.housingStyle]?.label}).`
                            }
                          </div>
                        )}
                      </div>

                      {/* Food & Dining */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('monthlyFood')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Alimentation & Boissons' : 'Food, Groceries & Drinks'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(totals.breakdown.food)}</span>
                        </div>
                        {expandedItems['monthlyFood'] && (
                          <div className={styles.itemAdvice}>
                            {store.useCustomFood
                              ? (store.language === 'fr'
                                  ? `Calcul personnalisé : ${store.customRestaurantMeals} repas resto (${formatPrice(restCost)}) + ${store.customHomeMeals} repas maison (${formatPrice(homeCost)}) + livraisons (${formatPrice(delCost)}) + supérette (${formatPrice(cvsCost)}) + boissons (${formatPrice(cafeCost)}).`
                                  : `Custom estimate: ${store.customRestaurantMeals} restaurant meals (${formatPrice(restCost)}) + ${store.customHomeMeals} home meals (${formatPrice(homeCost)}) + delivery (${formatPrice(delCost)}) + CVS (${formatPrice(cvsCost)}) + drinks (${formatPrice(cafeCost)}).`
                                )
                              : (store.language === 'fr'
                                  ? `Cuisine : ${gt(FOOD_DATA.cooking[store.cookingFreq]?.label)} (${formatPrice(homeCost)}) + Resto : ${gt(FOOD_DATA.restaurant[store.restaurantFreq]?.label)} (${formatPrice(restCost)}) + Livraisons (${formatPrice(delCost)}) + Supérettes (${formatPrice(cvsCost)}) + Boissons (${formatPrice(cafeCost)}).`
                                  : `Cooking: ${FOOD_DATA.cooking[store.cookingFreq]?.label} (${formatPrice(homeCost)}) + Restaurant: ${FOOD_DATA.restaurant[store.restaurantFreq]?.label} (${formatPrice(restCost)}) + Delivery (${formatPrice(delCost)}) + CVS (${formatPrice(cvsCost)}) + Drinks (${formatPrice(cafeCost)}).`
                                )
                            }
                          </div>
                        )}
                      </div>

                      {/* Transport */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('monthlyTransport')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Transports & Déplacements' : 'Transit & Commutes'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(totals.breakdown.transport)}</span>
                        </div>
                        {expandedItems['monthlyTransport'] && (
                          <div className={styles.itemAdvice}>
                            {store.transportType === 'none' || !TRANSPORT_DATA.types[store.transportType as keyof typeof TRANSPORT_DATA.types]
                              ? (store.language === 'fr' ? 'Aucun transport sélectionné.' : 'No transit method selected.')
                              : (store.language === 'fr'
                                  ? `${gt(TRANSPORT_DATA.types[store.transportType as keyof typeof TRANSPORT_DATA.types]?.label || '')} : ${gt(TRANSPORT_DATA.types[store.transportType as keyof typeof TRANSPORT_DATA.types]?.desc || '')}`
                                  : `${TRANSPORT_DATA.types[store.transportType as keyof typeof TRANSPORT_DATA.types]?.label}: ${TRANSPORT_DATA.types[store.transportType as keyof typeof TRANSPORT_DATA.types]?.desc}`
                                )
                            }
                          </div>
                        )}
                      </div>

                      {/* Health & Personal */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('monthlyHealth')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Santé & Bien-être' : 'Health & Personal Care'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(totals.breakdown.wellness)}</span>
                        </div>
                        {expandedItems['monthlyHealth'] && (
                          <div className={styles.itemAdvice}>
                            {store.language === 'fr'
                              ? `Assurance (${formatPrice(basicCost)}) + Fitness (${formatPrice(gymCost)}) + Cliniques (${formatPrice(clinicCost)}) + Soins personnels (${formatPrice(personalCost)}).`
                              : `Insurance (${formatPrice(basicCost)}) + Fitness (${formatPrice(gymCost)}) + Clinics (${formatPrice(clinicCost)}) + Personal Grooming (${formatPrice(personalCost)}).`
                            }
                          </div>
                        )}
                      </div>

                      {/* Lifestyle & Digital */}
                      <div className={styles.diagnosticItem} onClick={() => toggleExpand('monthlyLifestyle')}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Style de Vie, Numérique & Sorties' : 'Lifestyle, Digital & Social'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(totals.breakdown.lifestyle)}</span>
                        </div>
                        {expandedItems['monthlyLifestyle'] && (
                          <div className={styles.itemAdvice}>
                            {store.language === 'fr'
                              ? `Sorties + Shopping + Vêtements + Loisirs + Abonnements & SIM (${formatPrice(digitalCost)}).`
                              : `Social outings + Shopping + Apparel + Entertainment + Digital/SIM (${formatPrice(digitalCost)}).`
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <div>
                    <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                      {store.language === 'fr' ? 'Budget Total de Réserve sur' : 'Total Runway for'} {store.duration} {store.language === 'fr' ? 'mois' : 'months'}:
                    </span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                      {formatPrice(totals.totalBudgetRequired)}
                    </div>
                  </div>
                  <button className={styles.nextBtn} onClick={() => setShowDiagnostic(false)}>
                    {store.language === 'fr' ? 'Fermer le Diagnostic' : 'Close Diagnostic'}
                  </button>
                </div>
              </div>
            </div>
          )
        })()
      )}
    </div>
  )
}
