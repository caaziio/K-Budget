import React, { useState } from 'react'
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
  SETUP_DATA
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
  Calendar
} from 'lucide-react'

const getTranslation = (text: string, lang: 'en' | 'fr'): string => {
  if (lang === 'en') return text;
  
  const frMap: Record<string, string> = {
    // Section Headers
    "Onboarding & Mode Selection": "Intégration & Choix du Mode",
    "Stay Duration (Months)": "Durée du Séjour (Mois)",
    "Target Neighborhood": "Quartier Cible",
    "Display Currency": "Devise d'Affichage",
    "Visa Status": "Statut du Visa",
    "Choose Budget Behavior Mode": "Mode de Budget de Base",
    "Selecting a preset mode automatically populates default habits that you can customize in subsequent steps.": "La sélection d'un mode de base remplit automatiquement des habitudes que vous pouvez personnaliser ensuite.",
    "Home Setup": "Installation Maison",
    "Living Space & Housing": "Espace de Vie & Logement",
    "Housing Type": "Type de Logement",
    "Tourist Lease Notice": "Note sur les baux touristiques",
    "Short Stay Lease Notice": "Note sur les séjours courts",
    "Utility & Climate Usage Style": "Style de consommation des services publics",
    "Dining & Grocery Behavior": "Alimentation & Épicerie",
    "Home Cooking & Groceries": "Cuisine à la maison & Épicerie",
    "Restaurant Meals": "Repas au restaurant",
    "Delivery App Dining": "Livraison de repas",
    "Convenience Store Dining": "Supérettes (Convenience Store)",
    "Cafes & Snacks": "Cafés & En-cas",
    "Transit & Travel Commutes": "Transports & Déplacements",
    "Primary Transit Behavior": "Comportement de transport principal",
    "Wellness & Healthcare Plans": "Bien-être & Soins de santé",
    "Basic Insurance & Regular Visits": "Assurance de base & consultations",
    "Fitness & Active Lifestyle": "Fitness & Style de vie actif",
    "Medical Clinics & Specialists": "Cliniques médicales & Spécialistes",
    "Personal & Self Care": "Soins personnels & Bien-être",
    "Lifestyle, Shopping & Socials": "Style de vie, Shopping & Sorties",
    "Socializing & Gathering Habits": "Sorties & Vie sociale",
    "Shopping & Retail Frequency": "Shopping & Dépenses courantes",
    "Clothing & Apparel Habits": "Vêtements & Mode",
    "Entertainment & Hobbies": "Divertissements & Loisirs",
    "Runway Summary": "Résumé de la Réserve",
    "Behavior Engine Notice": "Avis du Moteur de Comportement",
    "Your KCalc is calculated dynamically based on your chosen behavior habits.": "Votre budget KCalc est calculé dynamiquement selon vos habitudes de vie.",
    "Month-by-Month Runway Schedule": "Échéancier Mensuel de la Réserve",
    "Behavior-Based Budget Breakdown": "Répartition Budgétaire Comportementale",
    "Go Back": "Retour",
    "Get Full Diagnostic": "Rapport de Diagnostic",
    "Cancel": "Annuler",
    "Submit & Request Payment": "Soumettre & Demander le Paiement",
    "Back": "Retour",
    "Next": "Suivant",
    "Preview AI Optimized Budget": "Aperçu du Budget Optimisé par IA",
    "Reset to Standard": "Réinitialiser au Standard",
    "Buy Package - $229": "Acheter le Pack - 229$",
    "Seoul Relocation Consultation & Local Cost Optimization Package": "Consultation de Relocalisation à Séoul & Pack d'Optimisation des Coûts",

    // Options (Housing types)
    "Goshiwon (고시원)": "Goshiwon (고시원)",
    "Shared Apartment": "Appartement Partagé",
    "One-room Studio (원룸)": "Studio One-Room (원룸)",
    "Officetel (오피스텔)": "Officetel (오피스텔)",
    "Apartment (아파트)": "Appartement (아파트)",
    "Guest House / Hostel": "Maison d'Hôtes / Auberge",
    "Free / Friend's Place": "Gratuit / Chez un Ami",
    
    // Housing descriptions
    "Micro-room, shared shower/laundry, no private kitchen.": "Chambre minuscule, douche/buanderie partagées, pas de cuisine privée.",
    "Private bedroom in a shared flat, kitchen access.": "Chambre privée dans un appartement en colocation, accès cuisine.",
    "Standard private studio flat with kitchen.": "Studio privé standard avec cuisine.",
    "Premium high-ceiling studio, modern kitchen facilities.": "Studio haut de gamme avec hauteur sous plafond élevée, cuisine moderne.",
    "Luxury multi-room flat with large full-size kitchen.": "Appartement de standing multi-pièces avec grande cuisine équipée.",
    "Short-stay hostel or guest house room. Fully furnished, flexible daily/monthly rates, zero deposit.": "Chambre en auberge ou maison d'hôtes pour court séjour. Entièrement meublée, tarifs flexibles, zéro caution.",
    "Staying with family/friends or host housing.": "Logé chez de la famille/des amis ou hébergement d'accueil.",

    // Warning alerts
    "Tourist Lease Notice:": "Avis aux touristes :",
    "Officetels, Apartments, and standard Shared Apartments typically require an Alien Registration Card (ARC) and a long-term lease. Since you are on a Tourist visa, you will need to find short-term sub-leases or use specialized tourist-friendly expat rental services.": "Les Officetels, appartements et colocations standard nécessitent généralement une carte d'identité de résident coréen (ARC) et un bail à long terme. Comme vous êtes sous visa touristique, vous devrez vous tourner vers des sous-locations à court terme ou des services spécialisés pour expatriés.",
    "Short Stay Lease Notice:": "Avis aux séjours courts :",
    "Officetels usually require a minimum 1-year contract. For stays under 3 months, consider specialized short-term rental platforms or co-living spaces instead.": "Les Officetels requièrent généralement un contrat d'un an minimum. Pour des séjours de moins de 3 mois, envisagez des plateformes de location meublée de courte durée ou des espaces de co-living.",

    // Utility usage levels
    "Survival Utility Add-on": "Niveau Survie",
    "Strict economy utilities, minimal AC & floor heating.": "Factures très limitées, climatisation et chauffage au sol minimaux.",
    "Moderate Utility Add-on": "Niveau Équilibré",
    "Typical usage, comfortable AC & heating.": "Consommation standard, climatisation et chauffage confortables.",
    "Comfortable Utility Add-on": "Niveau Élevé",
    "High usage, unrestricted AC, warm winter heating.": "Consommation élevée, climatisation sans restriction, chauffage chaud en hiver.",

    // Wellness / Health options
    "Opt out / No spending.": "Pas de dépenses.",
    "NHIS basic public health insurance coverage.": "Couverture de base de la sécurité sociale publique (NHIS).",
    "Standard insurance + occasional general practitioner visits.": "Assurance standard + consultations occasionnelles chez le généraliste.",
    "Comprehensive insurance + specialized treatments.": "Assurance complète + traitements spécialisés ou privés.",
    "Home workouts / basic community center gym.": "Entraînement à la maison / gymnase municipal de quartier.",
    "Standard commercial gym membership.": "Abonnement classique dans une salle de sport.",
    "Premium fitness club + periodic personal training.": "Club de sport haut de gamme + séances de coaching privé.",
    "Occasional public health clinic visits.": "Consultations occasionnelles en centre de santé publique.",
    "Standard private local clinics as needed.": "Consultations en cliniques privées locales au besoin.",
    "High-end general hospitals / regular specialist visits.": "Hôpitaux généraux de standing / visites régulières chez des spécialistes.",
    "Basic grooming essentials & cuts.": "Coiffure de base et produits d'hygiène essentiels.",
    "Standard haircut and basic skincare.": "Coupe de cheveux classique et soins de base.",
    "Premium salons, dermatology, & treatments.": "Salons haut de gamme, dermatologie et soins esthétiques.",

    // Lifestyle options
    "No spending in this category.": "Aucune dépense pour cette catégorie.",
    "Rare outings, mostly free home gatherings.": "Sorties rares, principalement soirées gratuites à la maison.",
    "Weekly social meetups & casual restaurant drinks.": "Sorties hebdomadaires et boissons décontractées au restaurant.",
    "Frequent premium dinners, high-end nightlife, & parties.": "Dîners haut de gamme fréquents, sorties nocturnes VIP et soirées.",
    "Strictly essentials only, no consumer goods.": "Strictement le nécessaire, pas d'achats de plaisir.",
    "Occasional retail shopping & hobby items.": "Achats occasionnels et articles de loisir.",
    "Frequent high-end consumption & electronics shopping.": "Achats fréquents haut de gamme et produits électroniques.",
    "Minimal replacement of worn functional items.": "Remplacement minimal des articles usés indispensables.",
    "Seasonal wardrobe updates and mid-tier brands.": "Mise à jour saisonnière de la garde-robe et marques moyennes.",
    "Frequent designer brands & luxury fashion upgrades.": "Marques de créateurs régulières et pièces de luxe.",
    "No paid tickets, stick to free online media.": "Aucune place payante, médias en ligne gratuits uniquement.",
    "Occasional cinema, museum visits, & local shows.": "Cinéma occasionnel, visites de musées et spectacles locaux.",
    "VIP seats at concerts, festivals, & high-end events.": "Places VIP aux concerts, festivals et événements prestigieux.",

    // Food Categories
    "Survival Groceries": "Épicerie Survie",
    "Strict home cooking (KRW 4k per meal, 30 days).": "Cuisine maison stricte (4k KRW par repas, 30 jours).",
    "Moderate Groceries": "Épicerie Standard",
    "Standard home cooking (KRW 4k per meal, 30 days).": "Cuisine maison classique (4k KRW par repas, 30 jours).",
    "Minimal Groceries": "Épicerie Minimale",
    "Basic grocery shopping (KRW 4k per meal, 20 days).": "Épicerie de base (4k KRW par repas, 20 jours).",
    "Almost No Cooking": "Presque pas de cuisine",
    "100% eating out / delivery.": "Repas 100% au restaurant / livraison.",

    "Budget Eating Out": "Restaurant Budget",
    "Simple meals (KRW 9k × 2 × 30 days).": "Repas simples (9k KRW × 2 × 30 jours).",
    "Balanced Dining": "Repas Équilibrés",
    "Standard restaurant meals (KRW 11k × 1 × 30 days).": "Repas classiques (11k KRW × 1 × 30 jours).",
    "Premium Dining": "Repas Premium",
    "High-end restaurants (KRW 12.5k × 2 × 30 days).": "Resto haut de gamme (12.5k KRW × 2 × 30 jours).",
    "Rarely Dine Out": "Rarement de restaurant",
    "Home-cooked or delivery focus.": "Cuisine maison ou livraison.",

    "No Delivery": "Pas de livraison",
    "Avoid food delivery apps entirely.": "Pas d'applications de livraison.",
    "Moderate Delivery": "Livraison Occasionnelle",
    "Occasional deliveries (KRW 13k × 10 orders).": "Livraisons occasionnelles (13k KRW × 10 commandes).",
    "Heavy Delivery": "Livraison Fréquente",
    "Frequent app delivery orders (KRW 15k × 20 orders).": "Livraisons fréquentes (15k KRW × 20 commandes).",

    "Basic CVS Spending": "Supérette Budget",
    "Snacks, instant food (KRW 40k/mo).": "En-cas, plats instantanés (40k KRW/mois).",
    "Regular CVS Spending": "Supérette Standard",
    "CVS meals, quick runs (KRW 80k/mo).": "Repas supérette, petites courses (80k KRW/mois).",
    "Comfort CVS Spending": "Supérette Confort",
    "Frequent CVS trips (KRW 100k/mo).": "Courses supérette fréquentes (100k KRW/mois).",

    "No Cafe Spend": "Pas de Café",
    "Stick to free/instant options.": "Café gratuit/instantané uniquement.",
    "Casual Cafe Visits": "Café Occasionnel",
    "Occasional cafe outings (KRW 60k/mo).": "Sorties café occasionnelles (60k KRW/mois).",
    "Premium Cafe / Snacks": "Café Premium",
    "Daily specialty coffee & dessert (KRW 150k/mo).": "Café de spécialité & dessert quotidien (150k KRW/mois).",

    // Transport Categories
    "Metro & Bus Only": "Métro & Bus Uniquement",
    "Base commute with public transport.": "Déplacements de base en transports publics.",
    "Mixed Transport": "Transports Mixtes",
    "Metro + occasional taxi rides.": "Métro + trajets occasionnels en taxi.",
    "Taxi Heavy": "Taxi Uniquement",
    "Frequent private taxi rides, active social life.": "Trajets réguliers en taxi privé, vie sociale active.",
    "Car Owner": "Propriétaire de Voiture",
    "Gas, insurance, toll, maintenance (Premium).": "Carburant, assurance, péages, entretien (Premium).",

    // Digital SaaS & Lifestyle headers
    "Digital Subscriptions & SaaS": "Abonnements Numériques & SaaS",
    "Custom Monthly Digital Budget": "Budget Numérique Mensuel Personnalisé",
    "SIM Card & Navigation Apps": "Carte SIM & Applications de Navigation",
    "Streaming & Music Subs": "Abonnements Streaming & Musique",
    "Work SaaS & AI Tools": "Outils de Travail SaaS & IA",
    "Creator Stack (Creative Cloud/GitHub)": "Pack Créateur (Creative Cloud/GitHub)",

    "Active SIM line + essential daily navigation apps.": "Ligne SIM active + applications de navigation quotidiennes essentielles.",
    "Streaming, music, and simple tools.": "Streaming, musique et outils simples.",
    "Heavy AI, cloud storage, and work tools.": "IA avancée, stockage cloud et outils professionnels.",
    "Professional multimedia stack for designers & devs.": "Pack multimédia professionnel pour designers & développeurs.",

    "Social Life & Outings": "Vie Sociale & Sorties",
    "Shopping & Consumer Goods": "Shopping & Biens de Consommation",
    "Fashion & Clothing Updates": "Mode & Garde-robe",
    "Entertainment & Leisure (Cinema/Events)": "Divertissements & Loisirs (Cinéma/Événements)",
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

const getWellnessDesc = (category: string, l: BehaviorLevel) => {
  const lang = useBudgetStore.getState().language;
  const gt = (txt: string) => getTranslation(txt, lang);
  if (l === 'none') return gt('Opt out / No spending.')
  if (category === 'basic') {
    if (l === 'survival') return gt('NHIS basic public health insurance coverage.')
    if (l === 'moderate') return gt('Standard insurance + occasional general practitioner visits.')
    if (l === 'comfortable') return gt('Comprehensive insurance + specialized treatments.')
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
  if (l === 'none') return gt('No spending in this category.')
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


export default function BudgetCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [booked, setBooked] = useState(false)
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [purchaseForm, setPurchaseForm] = useState({
    name: '',
    email: '',
    contactMethod: 'WhatsApp',
    contactId: ''
  })
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const store = useBudgetStore()
  const t = translations[store.language]
  const gt = (txt: string) => getTranslation(txt, store.language);

  const toggleExpand = (itemKey: string) => {
    setExpandedItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }))
  }

  const getStepSelectionPreview = (stepId: number) => {
    switch(stepId) {
      case 1:
        const presetName = store.lifestylePlan === 'survival' ? t.survival.split(' ')[0] :
                           store.lifestylePlan === 'moderate' ? t.moderate.split(' ')[0] :
                           t.comfortable.split(' ')[0];
        return `${store.duration} ${store.language === 'fr' ? 'mois' : 'mo'} • ${presetName}`;
      case 2:
        return t[store.housingType] ? t[store.housingType].split(' ')[0] : store.housingType;
      case 3:
        return `${store.language === 'fr' ? 'Cuisine' : 'Cook'}: ${t[store.cookingFreq]?.split(' ')[0] || store.cookingFreq} • ${store.language === 'fr' ? 'Resto' : 'Rest'}: ${t[store.restaurantFreq]?.split(' ')[0] || store.restaurantFreq}`;
      case 4:
        return store.transportType === 'metro' ? (store.language === 'fr' ? 'Transit' : 'Transit') :
               store.transportType === 'mixed' ? (store.language === 'fr' ? 'Mixte' : 'Mixed') :
               store.transportType === 'taxi' ? 'Taxi' :
               (store.language === 'fr' ? 'Voiture' : 'Car');
      case 5:
        return `Gym: ${t[store.healthGym]?.split(' ')[0] || store.healthGym} • ${store.language === 'fr' ? 'Clinique' : 'Clinic'}: ${t[store.healthClinic]?.split(' ')[0] || store.healthClinic}`;
      case 6:
        return `Social: ${t[store.socialLevel]?.split(' ')[0] || store.socialLevel} • ${store.language === 'fr' ? 'Shopping' : 'Shop'}: ${t[store.shoppingLevel]?.split(' ')[0] || store.shoppingLevel}`;
      case 7:
        return `Total: ${formatPrice(totals.totalBudgetRequired)}`;
      default:
        return '';
    }
  }

  const handleNext = () => setCurrentStep((prev: number) => Math.min(prev + 1, STEPS.length))
  const handleBack = () => setCurrentStep((prev: number) => Math.max(prev - 1, 1))

  const handlePurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!purchaseForm.name || !purchaseForm.email || !purchaseForm.contactId) {
      alert('Please fill out all fields so we can contact you.')
      return
    }
    
    try {
      await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...purchaseForm,
          totals: {
            potentialSavings: totals.potentialSavings,
            totalBudgetRequired: totals.totalBudgetRequired,
            monthlyBurn: totals.monthlyBurn,
            totalUpfront: totals.totalUpfront
          },
          selections: {
            duration: store.duration,
            lifestylePlan: store.lifestylePlan,
            housingType: store.housingType,
            housingLocation: store.housingLocation
          }
        })
      })
    } catch (err) {
      console.error('Failed to submit purchase request:', err)
    }

    setBooked(true)
    setShowPurchaseForm(false)
  }

  const totals = store.calculateTotals()

  const getExchangeRate = () => {
    if (store.currency === 'USD') return 1380;
    if (store.currency === 'EUR') return 1490;
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

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>{gt("Onboarding & Mode Selection")}</h2>
            <div className={styles.formGrid}>
               <div className={styles.inputGroup}>
                <label>{gt("Stay Duration (Months)")}</label>
                <input type="number" min="1" value={store.duration} onChange={(e) => store.setVal('duration', Math.max(1, parseInt(e.target.value) || 1))} />
              </div>
              <div className={styles.inputGroup}>
                <label>{gt("Target Neighborhood")}</label>
                <select value={store.housingLocation} onChange={(e) => store.setVal('housingLocation', e.target.value as HousingLocation)}>
                   {(Object.keys(HOUSING_DATA.locations) as HousingLocation[]).map(l => (
                     <option key={l} value={l}>{gt(HOUSING_DATA.locations[l].label)}</option>
                   ))}
                </select>
              </div>
               <div className={styles.inputGroupFull} style={{ marginTop: '1rem' }}>
                 <label><Globe size={14} style={{ marginRight: '4px' }} /> {gt("Display Currency")}</label>
                 <div className={styles.selectionGrid}>
                    {(['KRW', 'USD', 'EUR'] as const).map(curr => {
                      const labels = { KRW: gt('KRW (₩)'), USD: gt('USD ($)'), EUR: gt('EUR (€)') };
                      return (
                        <div key={curr} className={store.currency === curr ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('currency', curr)}>
                          <span style={{ fontWeight: 700 }}>{labels[curr]}</span>
                        </div>
                      )
                    })}
                 </div>
               </div>
               <div className={styles.inputGroupFull} style={{ marginTop: '1rem' }}>
                 <label><User size={14} style={{ marginRight: '4px' }} /> {gt("Visa Status")}</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(VISA_DATA) as VisaType[]).map(v => {
                       const visaLabel = v === 'student' ? t.visaStudent : 
                                         v === 'nomad' ? t.visaNomad : 
                                         v === 'working_holiday' ? t.visaWorkingHoliday : 
                                         v === 'professional' ? t.visaProfessional : 
                                         t.visaTourist;
                       return (
                         <div key={v} className={store.visaType === v ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('visaType', v)}>
                           <span>{visaLabel}</span>
                         </div>
                       )
                    })}
                 </div>
               </div>
               <div className={styles.inputGroupFull} style={{ marginTop: '1.5rem' }}>
                 <label><Zap size={14} style={{ marginRight: '4px' }} /> {gt("Choose Budget Behavior Mode")}</label>
                 <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.75rem' }}>
                   {gt("Selecting a preset mode automatically populates default habits that you can customize in subsequent steps.")}
                 </p>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(LIFESTYLE_PLAN_DATA) as LifestylePlan[]).map(lp => {
                       const setupInfo = SETUP_DATA.installation_matrix[lp];
                       const planTitle = lp === 'survival' ? gt('Survival Mode') : 
                                         lp === 'moderate' ? gt('Moderate Mode') : 
                                         gt('Comfortable Mode');
                       const planDesc = lp === 'survival' ? gt('Survival Mode (Minimal / Thrift)') :
                                        lp === 'moderate' ? gt('Moderate Mode (Balanced / Typical)') :
                                        gt('Comfortable Mode (Relaxed / Higher End)');
                       const setupLabel = setupInfo.label === 'Thrift Setup' ? (store.language === 'fr' ? 'Économique' : 'Thrift') :
                                          setupInfo.label === 'Moderate Setup' ? (store.language === 'fr' ? 'Modéré' : 'Moderate') :
                                          (store.language === 'fr' ? 'Confortable' : 'Comfortable');
                       return (
                         <div key={lp} className={store.lifestylePlan === lp ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('lifestylePlan', lp)}>
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
            <h2 className={styles.stepTitle}>{gt("Living Space & Housing")}</h2>
            <div className={styles.formGrid}>
               <div className={styles.inputGroupFull}>
                <label>
                  {gt("Housing Type")}{' '}
                  {locMult !== 1 && (
                    <span style={{ color: '#b45309', fontSize: '0.75rem', textTransform: 'none' }}>
                      ({locMult > 1 ? `+${Math.round((locMult - 1) * 100)}%` : `-${Math.round((1 - locMult) * 100)}%`}{' '}
                      {gt(HOUSING_DATA.locations[store.housingLocation].label)} {store.language === 'fr' ? 'Ajustement' : 'Adjustment'})
                    </span>
                  )}
                </label>
                <div className={styles.selectionGrid}>
                  {(Object.keys(HOUSING_DATA.types) as HousingType[]).map(h => {
                    const house = HOUSING_DATA.types[h];
                    const baseRent = typeof house[store.lifestylePlan] === 'number' 
                      ? (house[store.lifestylePlan] as number) 
                      : (house.moderate as number);
                    
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
              </div>

              {showTouristWarning && (
                <div className={styles.inputGroupFull}>
                  <div className={styles.warningAlert} style={{ marginBottom: '0.5rem' }}>
                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>{gt("Tourist Lease Notice:")}</strong>{' '}
                      {gt("Officetels, Apartments, and standard Shared Apartments typically require an Alien Registration Card (ARC) and a long-term lease. Since you are on a Tourist visa, you will need to find short-term sub-leases or use specialized tourist-friendly expat rental services.")}
                    </div>
                  </div>
                </div>
              )}

              {showDurationWarning && (
                <div className={styles.inputGroupFull}>
                  <div className={styles.warningAlert} style={{ marginBottom: '0.5rem' }}>
                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>{gt("Short Stay Lease Notice:")}</strong>{' '}
                      {gt("Officetels usually require a minimum 1-year contract. For stays under 3 months, consider specialized short-term rental platforms or co-living spaces instead.")}
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.inputGroupFull}>
                 <label>{gt("Utility & Climate Usage Style")}</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(HOUSING_DATA.usage_styles) as HousingStyle[]).map(s => {
                      const util = HOUSING_DATA.usage_styles[s];
                      const locMult = HOUSING_DATA.locations[store.housingLocation].mult;
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
            </div>
          </motion.div>
        )
      case 3:
        const isPremiumLoc = store.housingLocation === 'premium';
        const locFoodMult = isPremiumLoc ? 1.15 : 1.0;

        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>{gt("Dining & Grocery Behavior")}</h2>
            <div className={styles.behavioralCluster}>
               <section>
                 <h3><Utensils size={14} /> {gt("Home Cooking & Groceries")}</h3>
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
               </section>

               <section>
                 <h3>
                   {gt("Restaurant Meals")}{' '}
                   {isPremiumLoc && (
                     <span style={{ color: '#b45309', fontSize: '0.75rem', textTransform: 'none' }}>
                       ({store.language === 'fr' ? '+15% Majoration Gangnam Active' : '+15% Gangnam Markup Active'})
                     </span>
                   )}
                 </h3>
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
               </section>

               <section>
                 <h3>{gt("Delivery App Dining")}</h3>
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
               </section>

               <section>
                 <h3>{gt("Convenience Store Dining")}</h3>
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
               </section>

               <section>
                 <h3>
                   <Coffee size={14} /> {gt("Cafes & Snacks")}{' '}
                   {isPremiumLoc && (
                     <span style={{ color: '#b45309', fontSize: '0.75rem', textTransform: 'none' }}>
                       ({store.language === 'fr' ? '+15% Majoration Gangnam Active' : '+15% Gangnam Markup Active'})
                     </span>
                   )}
                 </h3>
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
               </section>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>{gt("Transit & Travel Commutes")}</h2>
            <div className={styles.formGrid}>
               <div className={styles.inputGroupFull}>
                 <label>{gt("Primary Transit Behavior")}</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(TRANSPORT_DATA.types) as TransportType[]).map(t => {
                      const transit = TRANSPORT_DATA.types[t];
                      const currentCost = typeof transit[store.lifestylePlan] === 'number' 
                        ? (transit[store.lifestylePlan] as number) 
                        : (transit.moderate as number);
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
            </div>
          </motion.div>
        )
      case 5:
        const isTourist = store.visaType === 'tourist';
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>{gt("Wellness, Fitness & Health")}</h2>
            <div className={styles.behavioralCluster}>
               {isTourist && (
                 <div className={styles.warningAlert}>
                   <AlertCircle size={20} style={{ flexShrink: 0 }} />
                   <div>
                     <strong>{gt("Private Travel/Expat Insurance Required:")}</strong>{' '}
                     {gt("Tourist visa holders are ineligible for the South Korean National Health Insurance Service (NHIS) subsidy. You must purchase comprehensive travel or expat insurance to cover medical care.")}
                   </div>
                 </div>
               )}
               <section>
                 <h3>{gt("Basic Insurance & Regular Visits")}</h3>
                 <div className={styles.selectionGrid}>
                    {BEHAVIOR_LEVELS.map(l => {
                      const val = HEALTH_DATA.basic[l as keyof typeof HEALTH_DATA.basic];
                      const cost = l === 'none' ? 0 : (val as number);
                      const tierLabel = l === 'none' ? gt('none') : `${gt(l)} ${store.language === 'fr' ? 'Niveau' : 'Tier'}`;
                      return (
                        <div key={l} className={store.healthBasic === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthBasic', l)}>
                          <div className={styles.cardHeader}>
                            <span style={{ textTransform: 'capitalize' }}>{tierLabel}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getWellnessDesc('basic', l)}</p>
                        </div>
                      )
                    })}
                 </div>
               </section>

               <section>
                 <h3>{gt("Fitness & Active Lifestyle")}</h3>
                 <div className={styles.selectionGrid}>
                    {BEHAVIOR_LEVELS.map(l => {
                      const val = HEALTH_DATA.gym[l as keyof typeof HEALTH_DATA.gym];
                      const cost = l === 'none' ? 0 : (val as number);
                      const tierLabel = l === 'none' ? gt('none') : `${gt(l)} ${store.language === 'fr' ? 'Niveau' : 'Tier'}`;
                      return (
                        <div key={l} className={store.healthGym === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthGym', l)}>
                          <div className={styles.cardHeader}>
                            <span style={{ textTransform: 'capitalize' }}>{tierLabel}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getWellnessDesc('gym', l)}</p>
                        </div>
                      )
                    })}
                 </div>
               </section>

               <section>
                 <h3>{gt("Medical Clinics & Specialists")}</h3>
                 <div className={styles.selectionGrid}>
                    {BEHAVIOR_LEVELS.map(l => {
                      const val = HEALTH_DATA.healthcare[l as keyof typeof HEALTH_DATA.healthcare];
                      const cost = l === 'none' ? 0 : (val as number);
                      const tierLabel = l === 'none' ? gt('none') : `${gt(l)} ${store.language === 'fr' ? 'Niveau' : 'Tier'}`;
                      return (
                        <div key={l} className={store.healthClinic === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthClinic', l)}>
                          <div className={styles.cardHeader}>
                            <span style={{ textTransform: 'capitalize' }}>{tierLabel}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getWellnessDesc('clinic', l)}</p>
                        </div>
                      )
                    })}
                 </div>
               </section>

               <section>
                 <h3>{gt("Personal & Self Care")}</h3>
                 <div className={styles.selectionGrid}>
                    {BEHAVIOR_LEVELS.map(l => {
                      const val = HEALTH_DATA.personal[l as keyof typeof HEALTH_DATA.personal];
                      const cost = l === 'none' ? 0 : (val as number);
                      const tierLabel = l === 'none' ? gt('none') : `${gt(l)} ${store.language === 'fr' ? 'Niveau' : 'Tier'}`;
                      return (
                        <div key={l} className={store.healthPersonal === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthPersonal', l)}>
                          <div className={styles.cardHeader}>
                            <span style={{ textTransform: 'capitalize' }}>{tierLabel}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getWellnessDesc('personal', l)}</p>
                        </div>
                      )
                    })}
                 </div>
               </section>
            </div>
          </motion.div>
        )
      case 6:
        const isPremiumLocForS6 = store.housingLocation === 'premium';
        const locFoodMultForS6 = isPremiumLocForS6 ? 1.15 : 1.0;
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>{gt("Lifestyle, Shopping & Socials")}</h2>
            <div className={styles.behavioralCluster}>
               <section>
                 <h3><Smartphone size={14} style={{ marginRight: '4px' }} /> {gt("Digital Subscriptions & SaaS")}</h3>
                 <div className={styles.selectionGrid} style={{ marginBottom: '1.25rem' }}>
                    <div className={!store.useCustomDigital ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('useCustomDigital', false)}>
                       <span>{store.language === 'fr' ? 'Tarification par Plan' : 'Plan-based Pricing'}</span>
                    </div>
                    <div className={store.useCustomDigital ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('useCustomDigital', true)}>
                       <span>{store.language === 'fr' ? 'Montant Personnalisé' : 'Custom Manual Amount'}</span>
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
                      <div 
                        className={store.digitalSim ? styles.checkboxRowActive : styles.checkboxRow} 
                        onClick={() => store.setVal('digitalSim', !store.digitalSim)}
                      >
                        <input type="checkbox" checked={store.digitalSim} readOnly />
                        <div className={styles.checkboxText}>
                          <span className={styles.checkboxLabel}>{gt(DIGITAL_DATA.types.sim_apps.label)}</span>
                          <span className={styles.checkboxDesc}>
                            {gt("Active SIM line + essential daily navigation apps.")} ({store.language === 'fr' ? 'Par défaut :' : 'Default:'} {formatPrice(DIGITAL_DATA.types.sim_apps[store.lifestylePlan])}/{store.language === 'fr' ? 'mois' : 'mo'})
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
                            {gt("Streaming, music, and simple tools.")} ({store.language === 'fr' ? 'Par défaut :' : 'Default:'} {formatPrice(DIGITAL_DATA.types.subscriptions[store.lifestylePlan])}/{store.language === 'fr' ? 'mois' : 'mo'})
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
                            {gt("Heavy AI, cloud storage, and work tools.")} ({store.language === 'fr' ? 'Par défaut :' : 'Default:'} {formatPrice(DIGITAL_DATA.types.saas_ai[store.lifestylePlan])}/{store.language === 'fr' ? 'mois' : 'mo'})
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
                            {gt("Professional multimedia stack for designers & devs.")} ({store.language === 'fr' ? 'Par défaut :' : 'Default:'} {formatPrice(DIGITAL_DATA.types.creator_stack[store.lifestylePlan])}/{store.language === 'fr' ? 'mois' : 'mo'})
                          </span>
                        </div>
                      </div>
                      {store.digitalCreator && (
                        <div 
                          className={styles.inputGroup} 
                          style={{ marginLeft: '2.5rem', marginBottom: '1.25rem', width: 'calc(100% - 2.5rem)', animation: 'fadeIn 0.2s ease' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                            {store.language === 'fr' ? 'Coût Mensuel Creative Stack' : 'Creator Stack Monthly Cost'} ({store.currency})
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
               </section>

               <section>
                 <h3>
                   {gt("Social Life & Outings")}{' '}
                   {isPremiumLocForS6 && (
                     <span style={{ color: '#b45309', fontSize: '0.75rem', textTransform: 'none' }}>
                       ({store.language === 'fr' ? '+15% Majoration Gangnam Active' : '+15% Gangnam Markup Active'})
                     </span>
                   )}
                 </h3>
                 <div className={styles.selectionGrid}>
                    {BEHAVIOR_LEVELS.map(l => {
                      const cost = l === 'none' ? 0 : (LIFESTYLE_DATA.social[l as keyof typeof LIFESTYLE_DATA.social] as number);
                      const displayCost = cost * locFoodMultForS6;
                      const tierLabel = l === 'none' ? gt('none') : `${gt(l)} ${store.language === 'fr' ? 'Social' : 'Social'}`;
                      return (
                        <div key={l} className={store.socialLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('socialLevel', l)}>
                          <div className={styles.cardHeader}>
                            <span style={{ textTransform: 'capitalize' }}>{tierLabel}</span>
                            <span className={styles.cardPrice}>{formatPrice(displayCost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getLifestyleDesc('social', l)}</p>
                        </div>
                      )
                    })}
                 </div>
               </section>

               <section>
                 <h3>{gt("Shopping & Consumer Goods")}</h3>
                 <div className={styles.selectionGrid}>
                    {BEHAVIOR_LEVELS.map(l => {
                      const cost = l === 'none' ? 0 : (LIFESTYLE_DATA.shopping[l as keyof typeof LIFESTYLE_DATA.shopping] as number);
                      const tierLabel = l === 'none' ? gt('none') : `${gt(l)} ${store.language === 'fr' ? 'Achats' : 'Shop'}`;
                      return (
                        <div key={l} className={store.shoppingLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('shoppingLevel', l)}>
                          <div className={styles.cardHeader}>
                            <span style={{ textTransform: 'capitalize' }}>{tierLabel}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getLifestyleDesc('shopping', l)}</p>
                        </div>
                      )
                    })}
                 </div>
               </section>

               <section>
                 <h3>{gt("Fashion & Clothing Updates")}</h3>
                 <div className={styles.selectionGrid}>
                    {BEHAVIOR_LEVELS.map(l => {
                      const cost = l === 'none' ? 0 : (LIFESTYLE_DATA.clothing[l as keyof typeof LIFESTYLE_DATA.clothing] as number);
                      const tierLabel = l === 'none' ? gt('none') : `${gt(l)} ${store.language === 'fr' ? 'Style' : 'Style'}`;
                      return (
                        <div key={l} className={store.clothingLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('clothingLevel', l)}>
                          <div className={styles.cardHeader}>
                            <span style={{ textTransform: 'capitalize' }}>{tierLabel}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getLifestyleDesc('clothing', l)}</p>
                        </div>
                      )
                    })}
                 </div>
               </section>

               <section>
                 <h3>{gt("Entertainment & Leisure (Cinema/Events)")}</h3>
                 <div className={styles.selectionGrid}>
                    {BEHAVIOR_LEVELS.map(l => {
                      const cost = l === 'none' ? 0 : (LIFESTYLE_DATA.entertainment[l as keyof typeof LIFESTYLE_DATA.entertainment] as number);
                      const tierLabel = l === 'none' ? gt('none') : `${gt(l)} ${store.language === 'fr' ? 'Loisir' : 'Fun'}`;
                      return (
                        <div key={l} className={store.entertainmentLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('entertainmentLevel', l)}>
                          <div className={styles.cardHeader}>
                            <span style={{ textTransform: 'capitalize' }}>{tierLabel}</span>
                            <span className={styles.cardPrice}>{formatPrice(cost)}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{getLifestyleDesc('entertainment', l)}</p>
                        </div>
                      )
                    })}
                 </div>
               </section>
            </div>
          </motion.div>
        )
      case 7:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className={styles.summaryContent}>
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
                    ? `1er Mois Loyer/Factures + Caution + ${gt(SETUP_DATA.installation_matrix[store.lifestylePlan]?.label || 'Setup').split(' ')[0]} + Visa`
                    : `1st Month Rent/Bills + Deposit + ${SETUP_DATA.installation_matrix[store.lifestylePlan]?.label.split(' ')[0] || 'Setup'} + Visa`
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
                         {isMonthOne ? (store.language === 'fr' ? 'Démarrage + Dépenses' : 'Setup + Burn') : (store.language === 'fr' ? 'Dépenses Courantes' : 'Regular Burn')}
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
                      housing: store.language === 'fr' ? 'Logement' : 'housing',
                      food: store.language === 'fr' ? 'Alimentation' : 'food',
                      transport: store.language === 'fr' ? 'Transport' : 'transport',
                      digital: store.language === 'fr' ? 'Numérique' : 'digital',
                      lifestyle: store.language === 'fr' ? 'Style de vie' : 'lifestyle',
                      health: store.language === 'fr' ? 'Santé' : 'health',
                      visa: store.language === 'fr' ? 'Visa' : 'visa',
                      setup: store.language === 'fr' ? 'Installation' : 'setup',
                    };
                    const displayName = categoryTranslation[name.toLowerCase()] || name;
                    return (
                      <div key={name} className={styles.barItem}>
                         <div className={styles.barLabel}>
                           <span style={{ fontWeight: 700, color: '#334155', textTransform: 'capitalize' }}>{displayName}</span> 
                           <span>{formatPrice(val)}/{store.language === 'fr' ? 'mois' : 'mo'} ({Math.round((val / totals.monthlyBurn) * 100)}%)</span>
                         </div>
                         <div className={styles.barLine}>
                           <div style={{ width: `${((val) / Math.max(1, totals.monthlyBurn)) * 100}%` }} />
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
                  <div style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', padding: '1rem 1.25rem', borderRadius: '1rem', marginBottom: '1.25rem', fontSize: '0.875rem', color: '#93c5fd', lineHeight: '1.5' }}>
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
    <div className={styles.calculatorWrapper}>
      <div className={styles.stepperNav}>
        {STEPS.map((step) => (
          <div 
            key={step.id} 
            className={`${styles.stepIndicator} ${currentStep === step.id ? styles.active : ''} ${currentStep > step.id ? styles.completed : ''}`}
            onClick={() => setCurrentStep(step.id)}
          >
            <div className={styles.iconCircle}>{<step.icon size={16} />}</div>
            <div className={styles.stepTextContainer}>
              <span>
                {step.id === 1 ? t.stepPresets :
                 step.id === 2 ? t.stepHousing :
                 step.id === 3 ? t.stepFood :
                 step.id === 4 ? t.stepTransport :
                 step.id === 5 ? t.stepHealth :
                 step.id === 6 ? t.stepLifestyle :
                 t.stepSummary}
              </span>
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
            onClick={currentStep === STEPS.length ? () => setShowDiagnostic(true) : handleNext} 
            className={styles.nextBtn}
          >
            {currentStep === STEPS.length ? (store.language === 'fr' ? 'Rapport de Diagnostic' : 'Get Full Diagnostic') : t.nextBtn} <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {showDiagnostic && (
        (() => {
          const depositCost = HOUSING_DATA.types[store.housingType].deposit * (HOUSING_DATA.locations[store.housingLocation]?.mult || 1);
          const baseRent = HOUSING_DATA.types[store.housingType][store.lifestylePlan] || HOUSING_DATA.types[store.housingType].moderate;
          const rentCost = baseRent * (HOUSING_DATA.locations[store.housingLocation]?.mult || 1);
          const utilitiesCost = HOUSING_DATA.usage_styles[store.housingStyle].util_add * (HOUSING_DATA.locations[store.housingLocation]?.mult || 1);
          const installationCost = SETUP_DATA.installation_matrix[store.lifestylePlan]?.amount || 600000;
          const visaCost = VISA_DATA[store.visaType].add + SETUP_DATA.base_admin;
          const emergencyCost = SETUP_DATA.emergency_cash;
          
          const basicCost = store.healthBasic !== 'none' ? HEALTH_DATA.basic[store.healthBasic] : 0;
          const gymCost = store.healthGym !== 'none' ? HEALTH_DATA.gym[store.healthGym] : 0;
          const clinicCost = store.healthClinic !== 'none' ? HEALTH_DATA.healthcare[store.healthClinic] : 0;
          const personalCost = store.healthPersonal !== 'none' ? HEALTH_DATA.personal[store.healthPersonal] : 0;

          const homeCost = FOOD_DATA.cooking[store.cookingFreq]?.add || 0;
          const restCost = (FOOD_DATA.restaurant[store.restaurantFreq]?.add || 0) * (store.housingLocation === 'premium' ? 1.15 : 1.0);
          const delCost = FOOD_DATA.delivery[store.deliveryFreq]?.add || 0;
          const cvsCost = FOOD_DATA.convenience[store.convenienceFreq]?.add || 0;
          const cafeCost = (FOOD_DATA.cafe_snacks[store.cafeFreq]?.add || 0) * (store.housingLocation === 'premium' ? 1.15 : 1.0);

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
          const locMult = HOUSING_DATA.locations[store.housingLocation].mult;

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
                      <Wallet size={18} style={{ color: '#2563eb' }} />
                      <h3>{store.language === 'fr' ? 'Répartition du Capital de Départ' : 'Day 1 Setup Cash Breakdown'}</h3>
                    </div>
                    <div className={styles.diagnosticList}>
                      
                      <div 
                        className={styles.diagnosticItem} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleExpand('deposit')}
                      >
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Caution de Logement' : 'Housing Security Deposit'}{' '}
                            {expandedItems['deposit'] ? '▴' : '▾'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(depositCost)}</span>
                        </div>
                        {expandedItems['deposit'] && (
                          <div style={{ marginTop: '0.75rem', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem', color: '#475569', borderLeft: '2px solid #2563eb', animation: 'fadeIn 0.2s ease' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Caution de base :' : 'Base Deposit:'} ({gt(HOUSING_DATA.types[store.housingType].label).split(' ')[0]}):</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(HOUSING_DATA.types[store.housingType].deposit)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Multiplicateur de quartier :' : 'Neighborhood Multiplier:'}</span>
                              <span style={{ fontWeight: 600 }}>{locMult}x ({gt(HOUSING_DATA.locations[store.housingLocation].label)})</span>
                            </div>
                          </div>
                        )}
                        {depositCost >= 5000000 && (
                          <div className={styles.itemAdvice} onClick={(e) => e.stopPropagation()}>
                            <span className={styles.warningLabel}>{store.language === 'fr' ? 'Capital Élevé ⚠️' : 'High Capital ⚠️'}</span>
                            <p style={{ marginTop: '0.25rem' }}>
                              {store.language === 'fr'
                                ? "Les cautions en Corée sont très élevées. Notre équipe de relocalisation vous met en relation avec des propriétaires négociés ou des Goshiwons/espaces de co-living à faible caution."
                                : "Deposits in Korea are heavy key money. Our premium relocation team connects you with deposit-negotiated properties or low-deposit Goshiwons/Co-livings to free up cash."
                              }</p>
                          </div>
                        )}
                      </div>

                      <div 
                        className={styles.diagnosticItem} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleExpand('installation')}
                      >
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? "Éléments d'Installation" : 'Installation Essentials'} ({gt(store.lifestylePlan).split(' ')[0]}) {expandedItems['installation'] ? '▴' : '▾'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(installationCost)}</span>
                        </div>
                        {expandedItems['installation'] && (
                          <div style={{ marginTop: '0.75rem', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem', color: '#475569', borderLeft: '2px solid #2563eb', animation: 'fadeIn 0.2s ease' }} onClick={(e) => e.stopPropagation()}>
                            <p style={{ margin: 0, fontStyle: 'italic', color: '#64748b', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                              {store.language === 'fr' ? `Breakdown estimé pour le niveau ${gt(store.lifestylePlan)} :` : `Estimated breakdown for ${store.lifestylePlan} tier:`}
                            </p>
                            {store.lifestylePlan === 'survival' ? (
                              <>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Literie au sol :' : 'Floor Sleeping Bedding:'}</span>
                                  <span>₩70,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Ustensiles Daiso de base :' : 'Basic Daiso Kitchenware:'}</span>
                                  <span>₩50,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Rangement minimal :' : 'Minimal Room Storage:'}</span>
                                  <span>₩30,000</span>
                                </div>
                              </>
                            ) : store.lifestylePlan === 'moderate' ? (
                              <>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Surmatelas & Literie IKEA :' : 'IKEA Mattress Topper & Bedding:'}</span>
                                  <span>₩250,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Ustensiles de cuisine de base :' : "Today's House Kitchen Starter Pack:"}</span>
                                  <span>₩150,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Bureau pliant & Chaise de bureau :' : 'Folding Workdesk & Office Chair:'}</span>
                                  <span>₩120,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Portant à vêtements / Commode :' : 'Clothing Rack / Chest of Drawers:'}</span>
                                  <span>₩80,000</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Literie à ressorts premium :' : 'Premium Spring Bedding Set:'}</span>
                                  <span>₩700,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Cuiseur à riz, friteuse, vaisselle :' : 'Rice Cooker, Air Fryer, Dinnerware:'}</span>
                                  <span>₩500,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Bureau de bureau & Chaise ergonomique :' : 'Full office desk & ergonomic chair:'}</span>
                                  <span>₩400,000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Tapis confortables, luminaires, table basse :' : 'Cozy rugs, lights, side table:'}</span>
                                  <span>₩200,000</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                        {installationCost >= 600000 && (
                          <div className={styles.itemAdvice} onClick={(e) => e.stopPropagation()}>
                            <span className={styles.warningLabel}>{store.language === 'fr' ? "Frais d'Installation Élevés ⚠️" : 'High Setup Cost ⚠️'}</span>
                            <p style={{ marginTop: '0.25rem' }}>
                              {store.language === 'fr'
                                ? "L'achat de literie neuve, d'ustensiles de cuisine et de bureaux s'accumule vite. Remplacez-les par nos packs d'occasion Karrot Market (당근마켓) en Mode Pro pour économiser 15% immédiatement."
                                : "Purchasing new bedding, kitchenware, and desks adds up fast. Swap for our secondhand Karrot Market (당근마켓) student packs in Pro Mode to save 15% immediately."
                              }</p>
                          </div>
                        )}
                      </div>

                      <div className={styles.diagnosticItem}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>{store.language === 'fr' ? "Dépenses de Vie du Premier Mois" : "First Month Living Spend (Burn)"}</span>
                          <span className={styles.itemVal}>{formatPrice(totals.monthlyBurn)}</span>
                        </div>
                      </div>

                      <div className={styles.diagnosticItem}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>{store.language === 'fr' ? "Frais de Visa & Administratifs" : "Visa Fees & Base Admin Costs"}</span>
                          <span className={styles.itemVal}>{formatPrice(visaCost)}</span>
                        </div>
                      </div>

                      <div className={styles.diagnosticItem}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>{store.language === 'fr' ? "Réserve de Sécurité d'Urgence" : "Emergency Cash Cushion Buffer"}</span>
                          <span className={styles.itemVal}>{formatPrice(emergencyCost)}</span>
                        </div>
                      </div>
                      
                      {store.transportType === 'car' && (
                        <div className={styles.diagnosticItem}>
                          <div className={styles.itemRow}>
                            <span className={styles.itemName}>{store.language === 'fr' ? 'Frais de Véhicule Uniques' : 'One-Time Vehicle Fees'}</span>
                            <span className={styles.itemVal}>{formatPrice(1500000)}</span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Column 2: Regular Month Burn */}
                  <div className={styles.diagnosticColumn}>
                    <div className={styles.columnHeader}>
                      <Zap size={18} style={{ color: '#10b981' }} />
                      <h3>{store.language === 'fr' ? 'Dépenses Mensuelles Courantes' : 'Standard Monthly Burn Breakdown'}</h3>
                    </div>
                    <div className={styles.diagnosticList}>

                      <div className={styles.diagnosticItem}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Loyer Mensuel' : 'Monthly Rent'} ({gt(HOUSING_DATA.types[store.housingType]?.label).split(' ')[0]})
                          </span>
                          <span className={styles.itemVal}>{formatPrice(rentCost)}</span>
                        </div>
                        {rentCost >= 900000 && (
                          <div className={styles.itemAdvice}>
                            <span className={styles.warningLabel}>{store.language === 'fr' ? 'Loyer Élevé ⚠️' : 'High Rent ⚠️'}</span>
                            <p style={{ marginTop: '0.25rem' }}>
                              {store.language === 'fr'
                                ? "Le loyer est votre plus grosse dépense. Choisir des quartiers périphériques ou des colocations réduit le loyer de 25 à 40%."
                                : "Rent is your biggest budget drain. Selecting outskirts neighborhoods or shared apartment models reduces rent by 25-40%."
                              }</p>
                          </div>
                        )}
                      </div>

                      <div className={styles.diagnosticItem}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>{store.language === 'fr' ? 'Services Publics & Climatisation' : 'Utilities & Climate Billing'}</span>
                          <span className={styles.itemVal}>{formatPrice(utilitiesCost)}</span>
                        </div>
                      </div>

                      <div 
                        className={styles.diagnosticItem} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleExpand('dining')}
                      >
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>{store.language === 'fr' ? 'Repas & Épicerie' : 'Dining & Groceries'} {expandedItems['dining'] ? '▴' : '▾'}</span>
                          <span className={styles.itemVal}>{formatPrice(totals.breakdown.food)}</span>
                        </div>
                        {expandedItems['dining'] && (
                          <div style={{ marginTop: '0.75rem', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem', color: '#475569', borderLeft: '2px solid #10b981', animation: 'fadeIn 0.2s ease' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Épicerie Maison :' : 'Home Groceries:'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(homeCost)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Restaurants (avec majoration locale) :' : 'Restaurants (with local markups):'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(restCost)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Applications de Livraison :' : 'Food Delivery Apps:'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(delCost)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Supérettes (CVS) :' : 'Convenience Store (CVS):'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(cvsCost)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Cafés & Boulangeries :' : 'Cafes & Bakeries:'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(cafeCost)}</span>
                            </div>
                          </div>
                        )}
                        {totals.breakdown.food >= 600000 && (
                          <div className={styles.itemAdvice} onClick={(e) => e.stopPropagation()}>
                            <span className={styles.warningLabel}>{store.language === 'fr' ? 'Frais de Nourriture Élevés ⚠️' : 'High Food Cost ⚠️'}</span>
                            <p style={{ marginTop: '0.25rem' }}>
                              {store.language === 'fr'
                                ? "Les repas à l'extérieur et les cafés augmentent votre budget. Nous vous conseillons de faire vos courses dans des supermarchés discount locaux."
                                : "Eating out and cafe bills are driving your food burn rate. We recommend purchasing groceries at local wholesale discount marts instead of premium department stores."
                              }</p>
                          </div>
                        )}
                      </div>

                      <div className={styles.diagnosticItem}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>{store.language === 'fr' ? 'Transports & Transit' : 'Mobility & Transit'}</span>
                          <span className={styles.itemVal}>{formatPrice(totals.breakdown.transport)}</span>
                        </div>
                        {(store.transportType === 'taxi' || store.transportType === 'car') && (
                          <div className={styles.itemAdvice}>
                            <span className={styles.warningLabel}>{store.language === 'fr' ? 'Transports Premium ⚠️' : 'Premium Transport ⚠️'}</span>
                            <p style={{ marginTop: '0.25rem' }}>
                              {store.language === 'fr'
                                ? "Prendre souvent le taxi ou posséder une voiture coûte cher à Séoul. Envisagez les cartes de transport public (Climate Card/K-Pass) pour limiter vos frais à 65k ₩/mois."
                                : "Frequent taxis or owning a car is costly in Seoul. Consider public transit configurations (Climate Card/K-Pass) to cap your monthly transit costs at ₩65k."
                              }</p>
                          </div>
                        )}
                      </div>

                      <div 
                        className={styles.diagnosticItem} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleExpand('wellness')}
                      >
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Santé, Fitness & Soins' : 'Health, Fitness & Grooming'} {expandedItems['wellness'] ? '▴' : '▾'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(totals.breakdown.wellness)}</span>
                        </div>
                        {expandedItems['wellness'] && (
                          <div style={{ marginTop: '0.75rem', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem', color: '#475569', borderLeft: '2px solid #10b981', animation: 'fadeIn 0.2s ease' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Assurance de base :' : 'Basic Insurance:'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(basicCost)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Salle de Sport & Fitness :' : 'Gym & Fitness:'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(gymCost)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Cliniques & Spécialistes :' : 'Clinics & Specialists:'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(clinicCost)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{store.language === 'fr' ? 'Soins de la peau & Coiffeur :' : 'Skincare & Hair Grooming:'}</span>
                              <span style={{ fontWeight: 600 }}>{formatPrice(personalCost)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div 
                        className={styles.diagnosticItem} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleExpand('digital')}
                      >
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>
                            {store.language === 'fr' ? 'Abonnements Numériques & SaaS' : 'Digital Subscriptions & SaaS'} {expandedItems['digital'] ? '▴' : '▾'}
                          </span>
                          <span className={styles.itemVal}>{formatPrice(digitalCost)}</span>
                        </div>
                        {expandedItems['digital'] && (
                          <div style={{ marginTop: '0.75rem', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem', color: '#475569', borderLeft: '2px solid #10b981', animation: 'fadeIn 0.2s ease' }} onClick={(e) => e.stopPropagation()}>
                            {store.useCustomDigital ? (
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{store.language === 'fr' ? 'Montant Numérique Personnalisé :' : 'Custom Digital Amount:'}</span>
                                <span style={{ fontWeight: 600 }}>{formatPrice(store.customDigitalAmount)}</span>
                              </div>
                            ) : (
                              <>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Forfait Mobile SIM :' : 'SIM Card Line:'}</span>
                                  <span style={{ fontWeight: 600 }}>{formatPrice(store.digitalSim ? store.amountSim : 0)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Abonnements Streaming :' : 'Streaming Subs:'}</span>
                                  <span style={{ fontWeight: 600 }}>{formatPrice(store.digitalSubs ? store.amountSubs : 0)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Outils SaaS / IA :' : 'SaaS / AI Tools:'}</span>
                                  <span style={{ fontWeight: 600 }}>{formatPrice(store.digitalSaas ? store.amountSaas : 0)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{store.language === 'fr' ? 'Pack Créateur :' : 'Creator Stack:'}</span>
                                  <span style={{ fontWeight: 600 }}>{formatPrice(store.digitalCreator ? store.amountCreator : 0)}</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button className={styles.backBtn} onClick={() => setShowDiagnostic(false)}>
                    {store.language === 'fr' ? 'Fermer le Diagnostic' : 'Close Diagnostic'}
                  </button>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#10b981' }}>
                      {store.proOptimized 
                        ? (store.language === 'fr' ? 'Mode Optimisé par IA Activé' : 'AI Optimized Mode Enabled') 
                        : `${store.language === 'fr' ? 'Potentiel d\'économie Pro :' : 'Pro saving potential:'} ${formatPrice(totals.potentialSavings)}`
                      }
                    </span>
                    {booked ? (
                      <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <CheckCircle2 size={16} /> {store.language === 'fr' ? 'Consultation Réservée' : 'Consultation Booked'}
                      </span>
                    ) : (
                      <button className={styles.proBtnPrimary} onClick={() => { setBooked(true); setShowDiagnostic(false); }}>
                        {store.language === 'fr' ? 'Débloquer Pro & Réserver la Consultation' : 'Unlock Pro & Book Consultation'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      )}
    </div>
  )
}
