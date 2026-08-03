import { create } from 'zustand'
import { 
  HOUSING_DATA, FOOD_DATA, TRANSPORT_DATA, DIGITAL_DATA, 
  LIFESTYLE_DATA, HEALTH_DATA, VISA_DATA, SETUP_DATA 
} from '@/lib/constants'

export type HousingType = keyof typeof HOUSING_DATA.types;
export type HousingLocation = keyof typeof HOUSING_DATA.locations;
export type HousingStyle = keyof typeof HOUSING_DATA.usage_styles;

export type CookingFreq = keyof typeof FOOD_DATA.cooking;
export type RestaurantFreq = keyof typeof FOOD_DATA.restaurant;
export type DeliveryFreq = keyof typeof FOOD_DATA.delivery;
export type ConvenienceFreq = keyof typeof FOOD_DATA.convenience;
export type CafeFreq = keyof typeof FOOD_DATA.cafe_snacks;

export type TransportType = keyof typeof TRANSPORT_DATA.types;

export type BehaviorLevel = 'survival' | 'moderate' | 'comfortable' | 'none';

export type VisaType = keyof typeof VISA_DATA;
export type LifestylePlan = 'survival' | 'moderate' | 'comfortable';

interface BudgetState {
  language: 'en' | 'fr'
  // Config
  duration: number
  visaType: VisaType
  lifestylePlan: LifestylePlan
  currency: 'KRW' | 'USD' | 'EUR'
  proOptimized: boolean

  // Housing
  housingType: HousingType
  housingLocation: HousingLocation
  housingStyle: HousingStyle

  // Food
  cookingFreq: CookingFreq
  restaurantFreq: RestaurantFreq
  deliveryFreq: DeliveryFreq
  convenienceFreq: ConvenienceFreq
  cafeFreq: CafeFreq

  // Transport
  transportType: TransportType

  // Digital
  digitalSim: boolean
  digitalSubs: boolean
  digitalSaas: boolean
  digitalCreator: boolean
  useCustomDigital: boolean
  customDigitalAmount: number
  amountSim: number
  amountSubs: number
  amountSaas: number
  amountCreator: number

  // Lifestyle
  socialLevel: BehaviorLevel
  shoppingLevel: BehaviorLevel
  clothingLevel: BehaviorLevel
  entertainmentLevel: BehaviorLevel

  // Health
  healthBasic: BehaviorLevel
  healthGym: BehaviorLevel
  healthClinic: BehaviorLevel
  healthPersonal: BehaviorLevel

  // Actions
  setVal: (key: keyof BudgetState, val: any) => void
  applyPreset: (plan: LifestylePlan) => void
  
  calculateTotals: () => {
    monthlyBurn: number
    totalUpfront: number
    totalBudgetRequired: number
    stabilityScore: number
    breakdown: Record<string, number>
    potentialSavings: number
  }
}

export const useBudgetStore = create<BudgetState>((set, get) => ({
  language: 'en',
  duration: 6,
  visaType: 'professional',
  lifestylePlan: 'moderate',
  currency: 'KRW',
  proOptimized: false,

  // Housing
  housingType: 'studio',
  housingLocation: 'central',
  housingStyle: 'standard',

  // Food
  cookingFreq: 'moderate',
  restaurantFreq: 'moderate',
  deliveryFreq: 'moderate',
  convenienceFreq: 'moderate',
  cafeFreq: 'moderate',

  // Transport
  transportType: 'metro',

  // Digital
  digitalSim: true,
  digitalSubs: true,
  digitalSaas: false,
  digitalCreator: false,
  useCustomDigital: false,
  customDigitalAmount: 0,
  amountSim: 50000,
  amountSubs: 70000,
  amountSaas: 0,
  amountCreator: 0,

  // Lifestyle
  socialLevel: 'moderate',
  shoppingLevel: 'moderate',
  clothingLevel: 'moderate',
  entertainmentLevel: 'moderate',

  // Health
  healthBasic: 'moderate',
  healthGym: 'moderate',
  healthClinic: 'moderate',
  healthPersonal: 'moderate',

  setVal: (key, val) => {
    set((s) => {
      const updated = { ...s, [key]: val } as any;

      // INTERCEPTOR 1: Auto-initialize custom amounts when checkboxes are enabled
      if (key === 'digitalSim' && val === true && s.amountSim === 0) {
        updated.amountSim = DIGITAL_DATA.types.sim_apps[s.lifestylePlan];
      }
      if (key === 'digitalSubs' && val === true && s.amountSubs === 0) {
        updated.amountSubs = DIGITAL_DATA.types.subscriptions[s.lifestylePlan];
      }
      if (key === 'digitalSaas' && val === true && s.amountSaas === 0) {
        updated.amountSaas = DIGITAL_DATA.types.saas_ai[s.lifestylePlan];
      }
      if (key === 'digitalCreator' && val === true && s.amountCreator === 0) {
        updated.amountCreator = DIGITAL_DATA.types.creator_stack[s.lifestylePlan];
      }



      return updated;
    });
  },

  applyPreset: (plan: LifestylePlan) => {
    if (plan === 'survival') {
      set({
        lifestylePlan: 'survival',
        housingType: 'goshiwon',
        housingStyle: 'minimal',
        cookingFreq: 'survival', // Shared kitchen cooking enabled
        restaurantFreq: 'survival', // Eat cheap street food/CVS
        deliveryFreq: 'survival', // 0 delivery
        convenienceFreq: 'survival',
        cafeFreq: 'survival', // 0 cafe
        transportType: 'metro',
        digitalSim: true,
        digitalSubs: false,
        digitalSaas: false,
        digitalCreator: false,
        useCustomDigital: false,
        customDigitalAmount: 0,
        amountSim: 30000,
        amountSubs: 0,
        amountSaas: 0,
        amountCreator: 0,
        socialLevel: 'survival',
        shoppingLevel: 'survival',
        clothingLevel: 'survival',
        entertainmentLevel: 'survival',
        healthBasic: 'survival',
        healthGym: 'survival',
        healthClinic: 'survival',
        healthPersonal: 'survival'
      });
    } else if (plan === 'moderate') {
      set({
        lifestylePlan: 'moderate',
        housingType: 'studio',
        housingStyle: 'standard',
        cookingFreq: 'moderate',
        restaurantFreq: 'moderate',
        deliveryFreq: 'moderate',
        convenienceFreq: 'moderate',
        cafeFreq: 'moderate',
        transportType: 'mixed',
        digitalSim: true,
        digitalSubs: true,
        digitalSaas: false,
        digitalCreator: false,
        useCustomDigital: false,
        customDigitalAmount: 0,
        amountSim: 50000,
        amountSubs: 70000,
        amountSaas: 0,
        amountCreator: 0,
        socialLevel: 'moderate',
        shoppingLevel: 'moderate',
        clothingLevel: 'moderate',
        entertainmentLevel: 'moderate',
        healthBasic: 'moderate',
        healthGym: 'moderate',
        healthClinic: 'moderate',
        healthPersonal: 'moderate'
      });
    } else if (plan === 'comfortable') {
      set({
        lifestylePlan: 'comfortable',
        housingType: 'officetel',
        housingStyle: 'premium',
        cookingFreq: 'comfortable',
        restaurantFreq: 'comfortable',
        deliveryFreq: 'comfortable',
        convenienceFreq: 'comfortable',
        cafeFreq: 'comfortable',
        transportType: 'taxi',
        digitalSim: true,
        digitalSubs: true,
        digitalSaas: true,
        digitalCreator: false,
        useCustomDigital: false,
        customDigitalAmount: 0,
        amountSim: 80000,
        amountSubs: 150000,
        amountSaas: 300000,
        amountCreator: 0,
        socialLevel: 'comfortable',
        shoppingLevel: 'comfortable',
        clothingLevel: 'comfortable',
        entertainmentLevel: 'comfortable',
        healthBasic: 'comfortable',
        healthGym: 'comfortable',
        healthClinic: 'comfortable',
        healthPersonal: 'comfortable'
      });
    }
  },

  calculateTotals: () => {
    const s = get();

    const runCalculation = (proMode: boolean) => {
      const mode = s.lifestylePlan;

      // 1. Housing Calculation
      const housingConfig = HOUSING_DATA.types[s.housingType];
      const baseRent = housingConfig[mode] !== undefined ? housingConfig[mode] : housingConfig.moderate;
      let rent = baseRent;
      
      const locMult = HOUSING_DATA.locations[s.housingLocation].mult;
      let utilities = HOUSING_DATA.usage_styles[s.housingStyle].util_add * locMult;

      if (proMode) {
        rent = rent * 0.90; // Save 10% on monthly rent with local expert channels
        utilities = utilities * 0.85; // Save 15% on utilities via smart energy habits
      }
      const housing_total = (rent * locMult) + utilities;

      // 2. Food Calculation (Behavior Engine + Regional Modifier)
      const isPremiumLoc = s.housingLocation === 'premium';
      const locFoodMult = isPremiumLoc ? 1.15 : 1.0;

      const homeCost = FOOD_DATA.cooking[s.cookingFreq]?.add || 0;
      const restCost = (FOOD_DATA.restaurant[s.restaurantFreq]?.add || 0) * locFoodMult;
      const delCost = FOOD_DATA.delivery[s.deliveryFreq]?.add || 0;
      const cvsCost = FOOD_DATA.convenience[s.convenienceFreq]?.add || 0;
      const cafeCost = (FOOD_DATA.cafe_snacks[s.cafeFreq]?.add || 0) * locFoodMult;
      const baseFood = homeCost + restCost + delCost + cvsCost + cafeCost;

      let food_monthly = baseFood; // Decoupled from housing type modifiers

      if (proMode) {
        food_monthly = food_monthly * 0.85; // Save 15% on groceries & dining via local discount marts/apps
      }

      // 3. Transport
      const transConfig = TRANSPORT_DATA.types[s.transportType];
      let transport_monthly = transConfig[mode] !== undefined ? transConfig[mode] : transConfig.moderate;

      if (proMode) {
        transport_monthly = transport_monthly * 0.85; // Save 15% with optimized local transit pass (K-Pass)
      }

      // 4. Health & Personal
      const basicCost = s.healthBasic !== 'none' ? HEALTH_DATA.basic[s.healthBasic] : 0;
      const gymCost = s.healthGym !== 'none' ? HEALTH_DATA.gym[s.healthGym] : 0;
      const clinicCost = s.healthClinic !== 'none' ? HEALTH_DATA.healthcare[s.healthClinic] : 0;
      const personalCost = s.healthPersonal !== 'none' ? HEALTH_DATA.personal[s.healthPersonal] : 0;
      let health_personal_monthly = basicCost + gymCost + clinicCost + personalCost;

      if (proMode) {
        health_personal_monthly = health_personal_monthly * 0.90; // Save 10% on grooming/fitness deals
      }

      // 5. Lifestyle & Social (Premium Neighborhood Multiplier)
      const locLifestyleMult = isPremiumLoc ? 1.15 : 1.0;
      const socCost = (s.socialLevel !== 'none' ? LIFESTYLE_DATA.social[s.socialLevel] : 0) * locLifestyleMult;
      const shopCost = s.shoppingLevel !== 'none' ? LIFESTYLE_DATA.shopping[s.shoppingLevel] : 0;
      const clothCost = s.clothingLevel !== 'none' ? LIFESTYLE_DATA.clothing[s.clothingLevel] : 0;
      const entCost = s.entertainmentLevel !== 'none' ? LIFESTYLE_DATA.entertainment[s.entertainmentLevel] : 0;
      let lifestyle_shopping_monthly = socCost + shopCost + clothCost + entCost;

      if (proMode) {
        lifestyle_shopping_monthly = lifestyle_shopping_monthly * 0.90; // Save 10% on entertainment & clothing
      }

      // 6. Digital Subscriptions (SIM + Checked categories OR Custom manual amount)
      let digital_monthly = 0;
      if (s.useCustomDigital) {
        digital_monthly = s.customDigitalAmount;
      } else {
        const simCost = s.digitalSim ? s.amountSim : 0;
        const subsCost = s.digitalSubs ? s.amountSubs : 0;
        const saasCost = s.digitalSaas ? s.amountSaas : 0;
        const creatorCost = s.digitalCreator ? s.amountCreator : 0;
        digital_monthly = simCost + subsCost + saasCost + creatorCost;
      }

      if (proMode) {
        digital_monthly = Math.max(0, digital_monthly - 15000); // Save 15,000 KRW/mo using local budget MVNO SIM
      }

      // Final Burn Calculation
      const monthlyBurn = Math.round(
        housing_total + 
        food_monthly + 
        transport_monthly + 
        health_personal_monthly + 
        lifestyle_shopping_monthly + 
        digital_monthly
      );

      // Upfront Costs
      const deposit = housingConfig.deposit * locMult;
      const visa_extra = VISA_DATA[s.visaType].add;
      const installationCost = SETUP_DATA.installation_matrix[mode]?.amount || 600000;
      
      // Immediate Setup Cash includes: 1st Month Living Spending + Deposit + Setup Essentials + Visa Fees + Emergency Buffer
      let upfront = monthlyBurn + SETUP_DATA.base_admin + installationCost + SETUP_DATA.emergency_cash + deposit + visa_extra;
      
      // Car owner fee addition
      if (s.transportType === 'car') {
        upfront += 1500000; // Add ₩1,500,000 setup fee in Month 1 for registration/inspection
      }

      if (proMode) {
        // Pro savings: 15% discount on installation cost via Karrot Market (당근마켓) second-hand bundle deals
        upfront = upfront - (installationCost * 0.15);
      }

      const totalBudgetRequired = upfront + (monthlyBurn * (s.duration - 1));

      // Stability Score logic
      const survival_floor = 450000 + 160000 + 80000 + 100000; // housing rent + food floor + transit + health basic
      const flexible_spending = Math.max(0, monthlyBurn - survival_floor);
      const stabilityScore = Math.min(100, Math.max(0, 100 - (flexible_spending / survival_floor) * 35));

      return {
        monthlyBurn,
        totalUpfront: upfront,
        totalBudgetRequired,
        stabilityScore,
        breakdown: {
          housing: housing_total,
          food: food_monthly,
          transport: transport_monthly,
          wellness: health_personal_monthly,
          lifestyle: lifestyle_shopping_monthly + digital_monthly
        }
      };
    };

    const normal = runCalculation(false);
    const optimized = runCalculation(true);

    const active = s.proOptimized ? optimized : normal;
    const potentialSavings = normal.totalBudgetRequired - optimized.totalBudgetRequired;

    return {
      ...active,
      potentialSavings
    };
  }
}))
