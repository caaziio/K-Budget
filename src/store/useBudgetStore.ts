import { create } from 'zustand'
import { 
  HOUSING_DATA, FOOD_DATA, TRANSPORT_DATA, DIGITAL_DATA, 
  LIFESTYLE_DATA, HEALTH_DATA, VISA_DATA, SETUP_DATA, INSURANCE_BY_VISA 
} from '@/lib/constants'

export type HousingType = keyof typeof HOUSING_DATA.types | 'none';
export type HousingLocation = keyof typeof HOUSING_DATA.locations;
export type HousingStyle = keyof typeof HOUSING_DATA.usage_styles;

export type CookingFreq = keyof typeof FOOD_DATA.cooking;
export type RestaurantFreq = keyof typeof FOOD_DATA.restaurant;
export type DeliveryFreq = keyof typeof FOOD_DATA.delivery;
export type ConvenienceFreq = keyof typeof FOOD_DATA.convenience;
export type CafeFreq = keyof typeof FOOD_DATA.cafe_snacks;

export type TransportType = keyof typeof TRANSPORT_DATA.types | 'none';

export type BehaviorLevel = 'survival' | 'moderate' | 'comfortable' | 'none';

export type VisaType = keyof typeof VISA_DATA;
export type LifestylePlan = 'survival' | 'moderate' | 'comfortable' | 'none';

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
  friendUtilitiesIncluded: boolean

  // Food
  cookingFreq: CookingFreq
  restaurantFreq: RestaurantFreq
  deliveryFreq: DeliveryFreq
  convenienceFreq: ConvenienceFreq
  cafeFreq: CafeFreq
  useCustomFood: boolean
  customHomeMeals: number
  customHomeMealCost: number
  customRestaurantMeals: number
  customRestaurantMealCost: number
  customDeliveryOrders: number
  customDeliveryOrderCost: number
  customConvenienceBudget: number
  customCafeBudget: number

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
  resetAll: () => void
  
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
  lifestylePlan: 'none',
  currency: 'KRW',
  proOptimized: false,

  // Housing
  housingType: 'none',
  housingLocation: 'central',
  housingStyle: 'standard',
  friendUtilitiesIncluded: true,

  // Food
  cookingFreq: 'none',
  restaurantFreq: 'none',
  deliveryFreq: 'none',
  convenienceFreq: 'none',
  cafeFreq: 'none',
  useCustomFood: false,
  customHomeMeals: 0,
  customHomeMealCost: 6000,
  customRestaurantMeals: 0,
  customRestaurantMealCost: 11000,
  customDeliveryOrders: 0,
  customDeliveryOrderCost: 15000,
  customConvenienceBudget: 0,
  customCafeBudget: 0,

  // Transport
  transportType: 'none',

  // Digital
  digitalSim: false,
  digitalSubs: false,
  digitalSaas: false,
  digitalCreator: false,
  useCustomDigital: false,
  customDigitalAmount: 0,
  amountSim: 0,
  amountSubs: 0,
  amountSaas: 0,
  amountCreator: 0,

  // Lifestyle
  socialLevel: 'none',
  shoppingLevel: 'none',
  clothingLevel: 'none',
  entertainmentLevel: 'none',

  // Health
  healthBasic: 'none',
  healthGym: 'none',
  healthClinic: 'none',
  healthPersonal: 'none',

  setVal: (key, val) => {
    set((s) => {
      const updated = { ...s, [key]: val } as any;

      // Auto-initialize custom amounts when checkboxes are enabled
      const planKey = (s.lifestylePlan === 'none' ? 'moderate' : s.lifestylePlan) as 'survival' | 'moderate' | 'comfortable';
      if (key === 'digitalSim' && val === true && s.amountSim === 0) {
        updated.amountSim = DIGITAL_DATA.types.sim_apps[planKey];
      }
      if (key === 'digitalSubs' && val === true && s.amountSubs === 0) {
        updated.amountSubs = DIGITAL_DATA.types.subscriptions[planKey];
      }
      if (key === 'digitalSaas' && val === true && s.amountSaas === 0) {
        updated.amountSaas = DIGITAL_DATA.types.saas_ai[planKey];
      }
      if (key === 'digitalCreator' && val === true && s.amountCreator === 0) {
        updated.amountCreator = DIGITAL_DATA.types.creator_stack[planKey];
      }

      return updated;
    });
  },

  applyPreset: (plan: LifestylePlan) => {
    if (plan === 'survival') {
      set({
        lifestylePlan: 'survival',
        useCustomFood: false,
        housingType: 'goshiwon',
        housingStyle: 'minimal',
        cookingFreq: 'survival',
        restaurantFreq: 'survival',
        deliveryFreq: 'survival',
        convenienceFreq: 'survival',
        cafeFreq: 'survival',
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
        useCustomFood: false,
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
        useCustomFood: false,
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

  resetAll: () => {
    set((s) => ({
      language: s.language,
      duration: 6,
      visaType: 'professional',
      lifestylePlan: 'none',
      currency: s.currency,
      proOptimized: false,
      housingType: 'none',
      housingLocation: 'central',
      housingStyle: 'standard',
      friendUtilitiesIncluded: true,
      cookingFreq: 'none',
      restaurantFreq: 'none',
      deliveryFreq: 'none',
      convenienceFreq: 'none',
      cafeFreq: 'none',
      useCustomFood: false,
      customHomeMeals: 0,
      customHomeMealCost: 6000,
      customRestaurantMeals: 0,
      customRestaurantMealCost: 11000,
      customDeliveryOrders: 0,
      customDeliveryOrderCost: 15000,
      customConvenienceBudget: 0,
      customCafeBudget: 0,
      transportType: 'none',
      digitalSim: false,
      digitalSubs: false,
      digitalSaas: false,
      digitalCreator: false,
      useCustomDigital: false,
      customDigitalAmount: 0,
      amountSim: 0,
      amountSubs: 0,
      amountSaas: 0,
      amountCreator: 0,
      socialLevel: 'none',
      shoppingLevel: 'none',
      clothingLevel: 'none',
      entertainmentLevel: 'none',
      healthBasic: 'none',
      healthGym: 'none',
      healthClinic: 'none',
      healthPersonal: 'none'
    }));
  },

  calculateTotals: () => {
    const s = get();

    const runCalculation = (proMode: boolean) => {
      const mode = (s.lifestylePlan === 'none' ? 'moderate' : s.lifestylePlan) as 'survival' | 'moderate' | 'comfortable';

      // 1. Housing Calculation
      let rent = 0;
      let deposit = 0;
      let utilities = 0;
      const locMult = HOUSING_DATA.locations[s.housingLocation]?.mult || 1.0;

      if (s.housingType && s.housingType !== 'none' && (HOUSING_DATA.types as any)[s.housingType]) {
        const housingConfig = (HOUSING_DATA.types as any)[s.housingType];
        const baseRent = housingConfig[mode] !== undefined ? housingConfig[mode] : housingConfig.moderate;
        rent = baseRent;
        utilities = s.housingType === 'friend' && s.friendUtilitiesIncluded
          ? 0
          : (HOUSING_DATA.usage_styles[s.housingStyle]?.util_add || 0) * locMult;

        if (proMode) {
          rent = rent * 0.90;
          utilities = utilities * 0.85;
        }
        deposit = housingConfig.deposit * locMult;
      }
      const housing_total = (rent * locMult) + utilities;

      // 2. Food Calculation
      const isPremiumLoc = s.housingLocation === 'premium';
      const locFoodMult = isPremiumLoc ? 1.15 : 1.0;

      const homeCost = s.useCustomFood ? s.customHomeMeals * s.customHomeMealCost : (FOOD_DATA.cooking[s.cookingFreq as keyof typeof FOOD_DATA.cooking]?.add || 0);
      const restCost = (s.useCustomFood ? s.customRestaurantMeals * s.customRestaurantMealCost : (FOOD_DATA.restaurant[s.restaurantFreq as keyof typeof FOOD_DATA.restaurant]?.add || 0)) * locFoodMult;
      const delCost = s.useCustomFood ? s.customDeliveryOrders * s.customDeliveryOrderCost : (FOOD_DATA.delivery[s.deliveryFreq as keyof typeof FOOD_DATA.delivery]?.add || 0);
      const cvsCost = s.useCustomFood ? s.customConvenienceBudget : (FOOD_DATA.convenience[s.convenienceFreq as keyof typeof FOOD_DATA.convenience]?.add || 0);
      const cafeCost = (s.useCustomFood ? s.customCafeBudget : (FOOD_DATA.cafe_snacks[s.cafeFreq as keyof typeof FOOD_DATA.cafe_snacks]?.add || 0)) * locFoodMult;
      const baseFood = homeCost + restCost + delCost + cvsCost + cafeCost;

      let food_monthly = baseFood;
      if (proMode && food_monthly > 0) {
        food_monthly = food_monthly * 0.85;
      }

      // 3. Transport
      let transport_monthly = 0;
      if (s.transportType && s.transportType !== 'none' && (TRANSPORT_DATA.types as any)[s.transportType]) {
        const transConfig = (TRANSPORT_DATA.types as any)[s.transportType];
        transport_monthly = transConfig[mode] !== undefined ? transConfig[mode] : transConfig.moderate;
        if (proMode) {
          transport_monthly = transport_monthly * 0.85;
        }
      }

      // 4. Health & Personal
      const visaInsuranceTiers = INSURANCE_BY_VISA[s.visaType] || INSURANCE_BY_VISA.professional;
      const basicCost = s.healthBasic !== 'none' ? (visaInsuranceTiers[s.healthBasic] || 0) : 0;
      const gymCost = s.healthGym !== 'none' ? (HEALTH_DATA.gym[s.healthGym] || 0) : 0;
      const clinicCost = s.healthClinic !== 'none' ? (HEALTH_DATA.healthcare[s.healthClinic] || 0) : 0;
      const personalCost = s.healthPersonal !== 'none' ? (HEALTH_DATA.personal[s.healthPersonal] || 0) : 0;
      let health_personal_monthly = basicCost + gymCost + clinicCost + personalCost;
      if (proMode && health_personal_monthly > 0) {
        health_personal_monthly = health_personal_monthly * 0.90;
      }

      // 5. Lifestyle & Social
      const locLifestyleMult = isPremiumLoc ? 1.15 : 1.0;
      const socCost = (s.socialLevel !== 'none' ? (LIFESTYLE_DATA.social[s.socialLevel] || 0) : 0) * locLifestyleMult;
      const shopCost = s.shoppingLevel !== 'none' ? (LIFESTYLE_DATA.shopping[s.shoppingLevel] || 0) : 0;
      const clothCost = s.clothingLevel !== 'none' ? (LIFESTYLE_DATA.clothing[s.clothingLevel] || 0) : 0;
      const entCost = s.entertainmentLevel !== 'none' ? (LIFESTYLE_DATA.entertainment[s.entertainmentLevel] || 0) : 0;
      let lifestyle_shopping_monthly = socCost + shopCost + clothCost + entCost;
      if (proMode && lifestyle_shopping_monthly > 0) {
        lifestyle_shopping_monthly = lifestyle_shopping_monthly * 0.90;
      }

      // 6. Digital Subscriptions
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
      if (proMode && digital_monthly > 0) {
        digital_monthly = Math.max(0, digital_monthly - 15000);
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
      let upfront = 0;
      const hasAnySelected = (s.housingType && s.housingType !== 'none') || monthlyBurn > 0 || s.lifestylePlan !== 'none';
      if (hasAnySelected) {
        const visa_extra = VISA_DATA[s.visaType]?.add || 0;
        const installationCost = s.lifestylePlan !== 'none' 
          ? (SETUP_DATA.installation_matrix[mode]?.amount || 0) 
          : (s.housingType !== 'none' ? 300000 : 0);
        
        upfront = monthlyBurn + SETUP_DATA.base_admin + installationCost + SETUP_DATA.emergency_cash + deposit + visa_extra;
        if (s.transportType === 'car') {
          upfront += 1500000;
        }
        if (proMode && installationCost > 0) {
          upfront = upfront - (installationCost * 0.15);
        }
      }

      const totalBudgetRequired = upfront > 0 ? (upfront + (monthlyBurn * Math.max(0, s.duration - 1))) : 0;

      // Stability Score logic
      let stabilityScore = 100;
      if (monthlyBurn > 0) {
        const survival_floor = 450000 + 160000 + 80000 + 100000;
        const flexible_spending = Math.max(0, monthlyBurn - survival_floor);
        stabilityScore = Math.min(100, Math.max(0, 100 - (flexible_spending / survival_floor) * 35));
      }

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
