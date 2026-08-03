/**
 * KCalc Behavior-Based Cost Engine
 * All costs in KRW (South Korean Won)
 * Incorporates the Korea Lifestyle Cost Engine reference dataset
 */

export const HOUSING_DATA = {
  types: {
    goshiwon: {
      survival: 450000,
      moderate: 450000,
      comfortable: 450000,
      deposit: 100000,
      label: 'Goshiwon (고시원)',
      desc: 'Micro-room, shared shower/laundry, no private kitchen.'
    },
    shared: {
      survival: 650000, // Fallback if selected
      moderate: 650000,
      comfortable: 850000,
      deposit: 1000000,
      label: 'Shared Apartment',
      desc: 'Private bedroom in a shared flat, kitchen access.'
    },
    studio: {
      survival: 900000, // Fallback if selected
      moderate: 900000,
      comfortable: 1200000,
      deposit: 5000000,
      label: 'One-room Studio (원룸)',
      desc: 'Standard private studio flat with kitchen.'
    },
    officetel: {
      survival: 1200000, // Fallback if selected
      moderate: 1200000,
      comfortable: 1500000,
      deposit: 10000000,
      label: 'Officetel (오피스텔)',
      desc: 'Premium high-ceiling studio, modern kitchen facilities.'
    },
    apartment: {
      survival: 1800000, // Fallback if selected
      moderate: 1800000,
      comfortable: 2500000,
      deposit: 20000000,
      label: 'Apartment (아파트)',
      desc: 'Luxury multi-room flat with large full-size kitchen.'
    },
    guesthouse: {
      survival: 400000,
      moderate: 700000,
      comfortable: 1100000,
      deposit: 0,
      label: 'Guest House / Hostel',
      desc: 'Short-stay hostel or guest house room. Fully furnished, flexible daily/monthly rates, zero deposit.'
    },
    friend: {
      survival: 0,
      moderate: 0,
      comfortable: 0,
      deposit: 0,
      label: 'Staying with Friend / Family',
      desc: 'Living at a friend or family member\'s place. No rental contract or security deposit required.'
    }
  },
  locations: {
    outside_seoul: { mult: 0.75, label: 'Outside Seoul' },
    outskirts: { mult: 0.90, label: 'Seoul Outskirts' },
    central: { mult: 1.00, label: 'Seoul Central (Baseline)' },
    premium: { mult: 1.25, label: 'Premium (Gangnam/Seocho)' }
  },
  usage_styles: {
    minimal: { util_add: 40000, label: 'Eco-conscious', desc: 'Minimal heating/AC.' },
    standard: { util_add: 80000, label: 'Standard', desc: 'Comfortable daily use.' },
    premium: { util_add: 160000, label: 'High Usage', desc: 'Frequent heating/AC, heavy appliances.' }
  }
};

export const FOOD_DATA = {
  cooking: {
    survival: { add: 120000, label: 'Survival Groceries', desc: 'Strict home cooking (KRW 4k per meal, 30 days).' },
    moderate: { add: 120000, label: 'Moderate Groceries', desc: 'Standard home cooking (KRW 4k per meal, 30 days).' },
    comfortable: { add: 80000, label: 'Minimal Groceries', desc: 'Basic grocery shopping (KRW 4k per meal, 20 days).' },
    none: { add: 0, label: 'Almost No Cooking', desc: '100% eating out / delivery.' }
  },
  restaurant: {
    survival: { add: 540000, label: 'Budget Eating Out', desc: 'Simple meals (KRW 9k × 2 × 30 days).' },
    moderate: { add: 330000, label: 'Balanced Dining', desc: 'Standard restaurant meals (KRW 11k × 1 × 30 days).' },
    comfortable: { add: 750000, label: 'Premium Dining', desc: 'High-end restaurants (KRW 12.5k × 2 × 30 days).' },
    none: { add: 0, label: 'Rarely Dine Out', desc: 'Home-cooked or delivery focus.' }
  },
  delivery: {
    survival: { add: 0, label: 'No Delivery', desc: 'Avoid food delivery apps entirely.' },
    moderate: { add: 130000, label: 'Moderate Delivery', desc: 'Occasional deliveries (KRW 13k × 10 orders).' },
    comfortable: { add: 300000, label: 'Heavy Delivery', desc: 'Frequent app delivery orders (KRW 15k × 20 orders).' }
  },
  convenience: {
    survival: { add: 40000, label: 'Basic CVS Spending', desc: 'Snacks, instant food (KRW 40k/mo).' },
    moderate: { add: 80000, label: 'Regular CVS Spending', desc: 'CVS meals, quick runs (KRW 80k/mo).' },
    comfortable: { add: 100000, label: 'Comfort CVS Spending', desc: 'Frequent CVS trips (KRW 100k/mo).' }
  },
  cafe_snacks: {
    survival: { add: 0, label: 'No Cafe Spend', desc: 'Stick to free/instant options.' },
    moderate: { add: 60000, label: 'Casual Cafe Visits', desc: 'Occasional cafe outings (KRW 60k/mo).' },
    comfortable: { add: 150000, label: 'Premium Cafe / Snacks', desc: 'Daily specialty coffee & dessert (KRW 150k/mo).' }
  }
};

export const TRANSPORT_DATA = {
  types: {
    metro: {
      survival: 80000,
      moderate: 100000,
      comfortable: 120000,
      label: 'Metro & Bus Only',
      desc: 'Base commute with public transport.'
    },
    mixed: {
      survival: 120000, // Forced base if selected
      moderate: 180000,
      comfortable: 300000,
      label: 'Mixed Transport',
      desc: 'Metro + occasional taxi rides.'
    },
    taxi: {
      survival: 200000, // Forced base if selected
      moderate: 350000,
      comfortable: 500000,
      label: 'Taxi Heavy',
      desc: 'Frequent private taxi rides, active social life.'
    },
    car: {
      survival: 500000, // Forced base if selected
      moderate: 650000,
      comfortable: 800000,
      label: 'Car Owner',
      desc: 'Gas, insurance, toll, maintenance (Premium).'
    }
  }
};

export const DIGITAL_DATA = {
  types: {
    sim_apps: {
      survival: 30000,
      moderate: 50000,
      comfortable: 80000,
      label: 'SIM Card & Basic Apps'
    },
    subscriptions: {
      survival: 0,
      moderate: 70000,
      comfortable: 150000,
      label: 'Entertainment Subscriptions'
    },
    saas_ai: {
      survival: 0,
      moderate: 0,
      comfortable: 300000,
      label: 'SaaS & AI Productivity Tools'
    },
    creator_stack: {
      survival: 0,
      moderate: 0,
      comfortable: 500000,
      label: 'Creative Professional Stack'
    }
  }
};

export const LIFESTYLE_DATA = {
  social: {
    survival: 80000,
    moderate: 300000,
    comfortable: 1200000,
    label: 'Social Life & Outings'
  },
  shopping: {
    survival: 100000,
    moderate: 300000,
    comfortable: 700000,
    label: 'Shopping & Consumption'
  },
  clothing: {
    survival: 80000,
    moderate: 250000,
    comfortable: 650000,
    label: 'Fashion & Clothing updates'
  },
  entertainment: {
    survival: 40000,
    moderate: 150000,
    comfortable: 500000,
    label: 'Entertainment, cinema, and events'
  }
};

export const HEALTH_DATA = {
  basic: {
    survival: 100000,
    moderate: 150000,
    comfortable: 250000,
    label: 'Basic Care & Insurance'
  },
  gym: {
    survival: 40000,
    moderate: 120000,
    comfortable: 500000,
    label: 'Fitness & Gym Membership'
  },
  healthcare: {
    survival: 150000,
    moderate: 220000,
    comfortable: 800000,
    label: 'Private Healthcare & Clinics'
  },
  personal: {
    survival: 60000,
    moderate: 150000,
    comfortable: 400000,
    label: 'Personal Care & Grooming'
  }
};

export const VISA_DATA = {
  nomad: { add: 0, label: 'Digital Nomad / F-Visa' },
  student: { add: 30000, label: 'Student (D-2 / D-4)' },
  professional: { add: 20000, label: 'Professional / E-Visa' },
  working_holiday: { add: 50000, label: 'Working Holiday' },
  tourist: { add: 100000, label: 'Tourist / Short-stay' }
};

export const LIFESTYLE_PLAN_DATA = {
  survival: { mult: 1.0, label: 'Survival Mode', desc: 'Focus on minimal living & strict saving.' },
  moderate: { mult: 1.0, label: 'Moderate Mode', desc: 'Standard balanced lifestyle in a one-room.' },
  comfortable: { mult: 1.0, label: 'Comfortable Mode', desc: 'Premium lifestyle with high convenience.' }
};

export const SETUP_DATA = {
  base_admin: 150000, // ARC, Visa, etc.
  emergency_cash: 800000,
  installation_matrix: {
    survival: {
      amount: 150000,
      label: 'Survival Setup (Thrift/Daiso)',
      desc: 'Floor sleeping pad, basic Daiso kitchenware, no furniture.'
    },
    moderate: {
      amount: 600000,
      label: 'Standard Setup (Today\'s House/IKEA)',
      desc: 'Bed topper/duvet, full cooking starter pack, basic folding desk/chair.'
    },
    comfortable: {
      amount: 1800000,
      label: 'Premium Setup (Premium furniture)',
      desc: 'Brand spring mattress, complete kitchen appliances (air fryer/microwave), full ergonomic desk set.'
    }
  }
};
