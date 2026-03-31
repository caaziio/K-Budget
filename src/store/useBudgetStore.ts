import { create } from 'zustand'
import { 
  HOUSING_DATA, FOOD_DATA, TRANSPORT_DATA, HEALTH_PERSONAL_DATA, 
  LIFESTYLE_SHOPPING_DATA, SOCIAL_DATA, DEVELOPMENT_FITNESS_DATA, 
  FOREIGNER_DATA, DIGITAL_DATA, MISC_IRREGULAR_DATA, TRAVEL_LEISURE_DATA, SETUP_DATA 
} from '@/lib/constants'

// Types for all granular selections
export type HousingType = keyof typeof HOUSING_DATA.types;
export type HousingLocation = keyof typeof HOUSING_DATA.locations;
export type HousingStyle = keyof typeof HOUSING_DATA.usage_styles;

export type CookingFreq = keyof typeof FOOD_DATA.cooking;
export type FoodPreference = keyof typeof FOOD_DATA.preferences;
export type GroceryStyle = keyof typeof FOOD_DATA.groceries;
export type CoffeeHabit = keyof typeof FOOD_DATA.coffee;

export type TransportType = keyof typeof TRANSPORT_DATA.main;
export type TransportFreq = keyof typeof TRANSPORT_DATA.frequency;

export type HealthLevel = keyof typeof HEALTH_PERSONAL_DATA.health;
export type PersonalCareLevel = keyof typeof HEALTH_PERSONAL_DATA.personal;

export type ShoppingBehavior = keyof typeof LIFESTYLE_SHOPPING_DATA.behavior;
export type ClothingStyle = keyof typeof LIFESTYLE_SHOPPING_DATA.clothing;

export type SocialFreq = keyof typeof SOCIAL_DATA.frequency;
export type NightlifeLevel = keyof typeof SOCIAL_DATA.nightlife;
export type EntertainmentStyle = keyof typeof SOCIAL_DATA.type;

export type LearningLevel = keyof typeof DEVELOPMENT_FITNESS_DATA.learning;
export type FitnessLevel = keyof typeof DEVELOPMENT_FITNESS_DATA.fitness;

export type InternationalLife = keyof typeof FOREIGNER_DATA.international;
export type AdminLoad = keyof typeof FOREIGNER_DATA.admin;
export type ImportDependency = keyof typeof FOREIGNER_DATA.dependency;

export type DigitalUsage = keyof typeof DIGITAL_DATA.usage;
export type DigitalType = keyof typeof DIGITAL_DATA.type;

export type InternalTravel = keyof typeof MISC_IRREGULAR_DATA.internal_travel;
export type BufferLevel = keyof typeof MISC_IRREGULAR_DATA.buffer;
export type GiftingLevel = keyof typeof MISC_IRREGULAR_DATA.gifting;

export type TravelLeisureFreq = keyof typeof TRAVEL_LEISURE_DATA.frequency;

interface BudgetState {
  // Config
  duration: number
  isJeonse: boolean

  // Housing
  housingType: HousingType
  housingLocation: HousingLocation
  housingStyle: HousingStyle

  // Food
  cookingFreq: CookingFreq
  foodPref: FoodPreference
  groceryStyle: GroceryStyle
  coffeeHabit: CoffeeHabit

  // Transport
  transportType: TransportType
  transportFreq: TransportFreq

  // Health & Personal
  healthLevel: HealthLevel
  personalLevel: PersonalCareLevel

  // Lifestyle
  shoppingBehavior: ShoppingBehavior
  clothingStyle: ClothingStyle
  travelLeisure: TravelLeisureFreq

  // Social
  socialFreq: SocialFreq
  nightlifeLevel: NightlifeLevel
  entertainmentStyle: EntertainmentStyle

  // Development
  learningLevel: LearningLevel
  fitnessLevel: FitnessLevel

  // Foreigner
  internationalLife: InternationalLife
  adminLoad: AdminLoad
  importDependency: ImportDependency

  // Digital
  digitalUsage: DigitalUsage
  digitalType: DigitalType
  useCustomDigital: boolean
  customDigitalAmount: number

  // Misc
  internalTravel: InternalTravel
  bufferLevel: BufferLevel
  giftingLevel: GiftingLevel

  // Action
  setVal: (key: keyof BudgetState, val: any) => void
  
  calculateTotals: () => {
    monthlyBurn: number
    totalUpfront: number
    totalBudgetRequired: number
    stabilityScore: number
    breakdown: Record<string, number>
  }
}

export const useBudgetStore = create<BudgetState>((set, get) => ({
  duration: 6,
  isJeonse: false,
  housingType: 'studio',
  housingLocation: 'central',
  housingStyle: 'standard',
  cookingFreq: 'balanced',
  foodPref: 'mixed',
  groceryStyle: 'standard',
  coffeeHabit: 'frequent',
  transportType: 'public',
  transportFreq: 'weekly',
  healthLevel: 'occasional',
  personalLevel: 'standard',
  shoppingBehavior: 'occasional',
  clothingStyle: 'seasonal',
  travelLeisure: 'monthly',
  socialFreq: 'weekly',
  nightlifeLevel: 'occasional',
  entertainmentStyle: 'mixed',
  learningLevel: 'occasional',
  fitnessLevel: 'gym',
  internationalLife: 'occasional',
  adminLoad: 'moderate',
  importDependency: 'medium',
  digitalUsage: 'standard',
  digitalType: 'mixed',
  useCustomDigital: false,
  customDigitalAmount: 0,
  internalTravel: 'occasional',
  bufferLevel: 'medium',
  giftingLevel: 'occasional',

  setVal: (key, val) => set((s) => ({ ...s, [key]: val })),

  calculateTotals: () => {
    const s = get();

    // 1. Housing Calculation
    const locMult = HOUSING_DATA.locations[s.housingLocation].mult;
    const baseRent = HOUSING_DATA.types[s.housingType].base * locMult;
    const rent = s.isJeonse ? 0 : baseRent;
    const utilities = HOUSING_DATA.usage_styles[s.housingStyle].util_add * locMult;
    const housing_total = rent + utilities;

    // 2. Food Calculation
    const food_base = FOOD_DATA.cooking[s.cookingFreq].base_mod;
    const food_pref_mult = FOOD_DATA.preferences[s.foodPref].mult;
    const grocery_mult = FOOD_DATA.groceries[s.groceryStyle].mult;
    const food_monthly = (food_base * food_pref_mult * grocery_mult) + FOOD_DATA.coffee[s.coffeeHabit].add;

    // 3. Transport
    const trans_base = TRANSPORT_DATA.main[s.transportType].base;
    const trans_freq_mult = TRANSPORT_DATA.frequency[s.transportFreq].mult;
    const transport_monthly = trans_base * trans_freq_mult;

    // 4. Health & Personal
    const health_personal_monthly = HEALTH_PERSONAL_DATA.health[s.healthLevel].add + HEALTH_PERSONAL_DATA.personal[s.personalLevel].add;

    // 5. Lifestyle & Shopping (+Travel)
    const lifestyle_shopping_monthly = 
      LIFESTYLE_SHOPPING_DATA.behavior[s.shoppingBehavior].add + 
      LIFESTYLE_SHOPPING_DATA.clothing[s.clothingStyle].add +
      TRAVEL_LEISURE_DATA.frequency[s.travelLeisure].add;

    // 6. Social & Entertainment
    const social_base = SOCIAL_DATA.frequency[s.socialFreq].add + SOCIAL_DATA.nightlife[s.nightlifeLevel].add;
    const social_style_mult = SOCIAL_DATA.type[s.entertainmentStyle].mult;
    const social_monthly = social_base * social_style_mult;

    // 7. Development & Fitness
    const development_fitness_monthly = DEVELOPMENT_FITNESS_DATA.learning[s.learningLevel].add + DEVELOPMENT_FITNESS_DATA.fitness[s.fitnessLevel].add;

    // 8. Foreigner Costs
    const foreigner_base = FOREIGNER_DATA.international[s.internationalLife].add + FOREIGNER_DATA.admin[s.adminLoad].add;
    const import_mult = FOREIGNER_DATA.dependency[s.importDependency].mult;
    const foreigner_monthly = foreigner_base * import_mult;

    // 9. Digital Subscriptions (Categorical vs Custom)
    let digital_monthly = 0;
    if (s.useCustomDigital) {
      digital_monthly = s.customDigitalAmount;
    } else {
      const digital_base = DIGITAL_DATA.usage[s.digitalUsage].add;
      const digital_type_mult = DIGITAL_DATA.type[s.digitalType].mult;
      digital_monthly = digital_base * digital_type_mult;
    }

    // 10. Misc & Irregular
    const misc_monthly = MISC_IRREGULAR_DATA.internal_travel[s.internalTravel].add + MISC_IRREGULAR_DATA.gifting[s.giftingLevel].add;

    // Final Burn Calculation
    const preBufferBurn = housing_total + food_monthly + transport_monthly + health_personal_monthly + lifestyle_shopping_monthly + social_monthly + development_fitness_monthly + foreigner_monthly + digital_monthly + misc_monthly;
    const bufferMult = MISC_IRREGULAR_DATA.buffer[s.bufferLevel].mult;
    const monthlyBurn = Math.round(preBufferBurn * bufferMult);

    // Upfront Costs
    const deposit_base = HOUSING_DATA.types[s.housingType].deposit;
    const deposit = s.isJeonse ? deposit_base * 5 : deposit_base; // Rough Jeonse estimate if not specified
    const upfront = SETUP_DATA.base_admin + SETUP_DATA.arrival_essentials + SETUP_DATA.emergency_cash + deposit + monthlyBurn;

    const totalBudgetRequired = upfront + (monthlyBurn * (s.duration - 1));

    // Stability Score logic: Compare Fixed (Survival) Costs vs Flexible (Luxury) Costs
    const survival_floor = (HOUSING_DATA.types.goshiwon.base * 0.7) + 300000 + TRANSPORT_DATA.main.public.base;
    const flexible_spending = monthlyBurn - survival_floor;
    const stabilityScore = Math.min(100, Math.max(0, 100 - (flexible_spending / survival_floor) * 40));

    return {
      monthlyBurn,
      totalUpfront: upfront,
      totalBudgetRequired,
      stabilityScore,
      breakdown: {
        housing: housing_total,
        food: food_monthly,
        transport: transport_monthly,
        wellness: health_personal_monthly + development_fitness_monthly,
        lifestyle: lifestyle_shopping_monthly + social_monthly + digital_monthly,
        foreigner: foreigner_monthly,
        other: misc_monthly
      }
    };
  }
}))
