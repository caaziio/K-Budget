/**
 * K-Budget Behavior-Based Cost Engine
 * All costs in KRW (South Korean Won)
 * Structure supports future Admin UI integration
 */

export const HOUSING_DATA = {
  types: {
    goshiwon: { base: 450000, deposit: 100000, label: 'Goshiwon (고시원)', desc: 'Micro-room, rice/kimchi included.' },
    shared: { base: 600000, deposit: 1000000, label: 'Shared Apartment', desc: 'Private room in a shared house.' },
    studio: { base: 850000, deposit: 5000000, label: 'One-room (원룸)', desc: 'Standard private studio.' },
    officetel: { base: 1100000, deposit: 10000000, label: 'Officetel', desc: 'Modern high-ceiling studio, professional.' },
    apartment: { base: 1800000, deposit: 20000000, label: 'Apartment (1BR+)', desc: 'Full residential flat.' },
    luxury: { base: 4500000, deposit: 100000000, label: 'Luxury/High-end', desc: 'Premium residence in top tier areas.' }
  },
  locations: {
    outside_seoul: { mult: 0.7, label: 'Outside Seoul' },
    outskirts: { mult: 0.9, label: 'Seoul Outskirts' },
    central: { mult: 1.15, label: 'Seoul Central' },
    premium: { mult: 1.45, label: 'Premium Districts (Gangnam/Seocho)' }
  },
  usage_styles: {
    minimal: { util_add: 0, label: 'Minimal', desc: 'Strict AC/Heating use.' },
    standard: { util_add: 80000, label: 'Standard', desc: 'Normal daily usage.' },
    comfortable: { util_add: 160000, label: 'Comfortable', desc: 'Frequent AC/Heating.' },
    premium: { util_add: 300000, label: 'Premium', desc: 'High usage, air purifiers, tech.' }
  }
};

export const FOOD_DATA = {
  cooking: {
    mostly: { base_mod: 300000, label: 'Mostly Cooking' },
    balanced: { base_mod: 500000, label: 'Balanced' },
    eating_out: { base_mod: 850000, label: 'Mostly Eating Out' },
    none: { base_mod: 1200000, label: 'Almost No Cooking' }
  },
  preferences: {
    korean: { mult: 1.0, label: 'Mostly Korean' },
    mixed: { mult: 1.25, label: 'Mixed' },
    foreign: { mult: 1.6, label: 'Foreign Food Frequent' },
    premium: { mult: 2.2, label: 'Premium Dining' }
  },
  groceries: {
    budget: { mult: 0.8, label: 'Budget Supermarkets' },
    standard: { mult: 1.0, label: 'Standard Supermarkets' },
    imported: { mult: 1.7, label: 'Imported Food Heavy' },
    premium: { mult: 2.5, label: 'Premium Groceries' }
  },
  coffee: {
    rare: { add: 20000, label: 'Rare (0-4/mo)' },
    casual: { add: 60000, label: 'Casual (1-3/wk)' },
    frequent: { add: 150000, label: 'Frequent (Daily)' },
    heavy: { add: 280000, label: 'Heavy (2+ Daily)' }
  }
};

export const TRANSPORT_DATA = {
  main: {
    walking: { base: 30000, label: 'Walking / Minimal' },
    public: { base: 85000, label: 'Public Transport Only' },
    occasional_taxi: { base: 160000, label: 'Public + Occasional Taxi' },
    frequent_taxi: { base: 450000, label: 'Frequent Taxi' },
    car: { base: 850000, label: 'Car Owner (Gas/Insurance)' }
  },
  frequency: {
    rare: { mult: 0.8, label: 'Rare' },
    weekly: { mult: 1.0, label: 'Weekly Outings' },
    frequent: { mult: 1.4, label: 'Frequent Movement' },
    commuting: { mult: 1.8, label: 'Constant Commuting' }
  }
};

export const HEALTH_PERSONAL_DATA = {
  health: {
    minimal: { add: 150000, label: 'Minimal (Insurance)' },
    occasional: { add: 220000, label: 'Occasional Clinic' },
    regular: { add: 350000, label: 'Regular Care' },
    premium: { add: 800000, label: 'Premium / Private' }
  },
  personal: {
    basic: { add: 60000, label: 'Basic' },
    standard: { add: 150000, label: 'Standard (Hair/Skin)' },
    high: { add: 400000, label: 'High (Cosmetics/Grooming)' },
    premium: { add: 1200000, label: 'Premium (Derm/Treatments)' }
  }
};

export const LIFESTYLE_SHOPPING_DATA = {
  behavior: {
    essentials: { add: 100000, label: 'Only Essentials' },
    occasional: { add: 300000, label: 'Occasional Purchases' },
    frequent: { add: 700000, label: 'Frequent Shopping' },
    lifestyle: { add: 1500000, label: 'Lifestyle-Driven' }
  },
  clothing: {
    minimal: { add: 80000, label: 'Minimal / Functional' },
    seasonal: { add: 250000, label: 'Seasonal Updates' },
    fashion: { add: 650000, label: 'Fashion-Conscious' },
    premium: { add: 2000000, label: 'Premium Brands' }
  }
};

export const SOCIAL_DATA = {
  frequency: {
    rare: { add: 80000, label: 'Rare' },
    weekly: { add: 250000, label: 'Weekly' },
    regular: { add: 600000, label: '2-3 Times/Week' },
    active: { add: 1200000, label: 'Very Active (4+)' }
  },
  nightlife: {
    none: { add: 0, label: 'None' },
    occasional: { add: 100000, label: 'Occasional' },
    regular: { add: 350000, label: 'Regular' },
    heavy: { add: 900000, label: 'Heavy Social Drinking' }
  },
  type: {
    home: { mult: 0.8, label: 'Home-based' },
    mixed: { mult: 1.0, label: 'Mixed' },
    active: { mult: 1.5, label: 'Active (Events/Cinema)' },
    premium: { mult: 2.5, label: 'Premium Experiences' }
  }
};

export const DEVELOPMENT_FITNESS_DATA = {
  learning: {
    none: { add: 0, label: 'None' },
    occasional: { add: 80000, label: 'Occasional Courses' },
    regular: { add: 250000, label: 'Regular Learning' },
    intensive: { add: 700000, label: 'Intensive Investment' }
  },
  fitness: {
    none: { add: 0, label: 'None' },
    basic: { add: 40000, label: 'Basic (Home/Cheap Gym)' },
    gym: { add: 120000, label: 'Gym Membership' },
    premium: { add: 500000, label: 'Premium Fitness / PT' }
  }
};

export const FOREIGNER_DATA = {
  international: {
    none: { add: 0, label: 'None' },
    occasional: { add: 150000, label: 'Occasional' },
    regular: { add: 450000, label: 'Regular Remittance' },
    heavy: { add: 1200000, label: 'Heavy International Life' }
  },
  admin: {
    minimal: { add: 10000, label: 'Minimal' },
    moderate: { add: 50000, label: 'Moderate' },
    high: { add: 150000, label: 'High (Frequent Docs)' }
  },
  dependency: {
    low: { mult: 1.0, label: 'Low Dependency' },
    medium: { mult: 1.25, label: 'Medium' },
    high: { mult: 1.6, label: 'High' },
    very_high: { mult: 2.2, label: 'Very High (Import-heavy)' }
  }
};

export const DIGITAL_DATA = {
  usage: {
    minimal: { add: 20000, label: 'Minimal (1-2)' },
    standard: { add: 55000, label: 'Standard (3-5)' },
    heavy: { add: 120000, label: 'Heavy (6-10)' },
    power: { add: 350000, label: 'Power User (10+)' }
  },
  type: {
    entertainment: { mult: 1.0, label: 'Entertainment Only' },
    mixed: { mult: 1.3, label: 'Mixed' },
    professional: { mult: 1.8, label: 'Professional Tools' },
    ai_saas: { mult: 2.5, label: 'Heavy AI / SaaS' }
  }
};

export const MISC_IRREGULAR_DATA = {
  internal_travel: {
    rare: { add: 50000, label: 'Rare' },
    occasional: { add: 150000, label: 'Occasional' },
    frequent: { add: 500000, label: 'Frequent' },
    very_frequent: { add: 1200000, label: 'Very Frequent' }
  },
  buffer: {
    none: { mult: 1.0, label: 'None' },
    low: { mult: 1.05, label: 'Low (5%)' },
    medium: { mult: 1.15, label: 'Medium (15%)' },
    high: { mult: 1.3, label: 'High (30%)' }
  },
  gifting: {
    rare: { add: 30000, label: 'Rare' },
    occasional: { add: 100000, label: 'Occasional' },
    regular: { add: 350000, label: 'Regular' },
    high: { add: 800000, label: 'High Social Obligations' }
  }
};

export const TRAVEL_LEISURE_DATA = {
  frequency: {
    rare: { add: 50000, label: 'Rare (Staycation)' },
    monthly: { add: 250000, label: 'Monthly Short Trips' },
    frequent: { add: 600000, label: 'Frequent Exploration' },
    luxury: { add: 1500000, label: 'Luxury Leisure / Resorts' }
  }
};

export const SETUP_DATA = {
  base_admin: 150000, // Arc, Visa, etc.
  arrival_essentials: 450000, // Bedding, kitchen, etc.
  emergency_cash: 800000
};
