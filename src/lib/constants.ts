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
      desc: 'Very small compact private room (3-6m²) with bed and desk. Shared bathroom, kitchen, and laundry. Highly flexible monthly stay, zero long-term lease commitment, and minimal deposit.'
    },
    shared: {
      survival: 650000,
      moderate: 650000,
      comfortable: 850000,
      deposit: 1000000,
      label: 'Shared Apartment (Sharehouse)',
      desc: 'Private furnished bedroom in a shared flat with common kitchen, living area, and bathroom. Great for community living with medium-to-low deposit.'
    },
    studio: {
      survival: 900000,
      moderate: 900000,
      comfortable: 1200000,
      deposit: 5000000,
      label: 'One-room Studio (원룸)',
      desc: 'Independent private studio with self-contained kitchenette and private bathroom. Korea\'s standard expat housing; typically requires a 1-year contract and a ₩5M-₩10M deposit.'
    },
    officetel: {
      survival: 1200000,
      moderate: 1200000,
      comfortable: 1500000,
      deposit: 10000000,
      label: 'Officetel (오피스텔)',
      desc: 'Modern studio in a commercial high-rise with elevator, 24/7 security, and built-in appliances. Requires high deposit (₩10M+) and monthly building management fees.'
    },
    apartment: {
      survival: 1800000,
      moderate: 1800000,
      comfortable: 2500000,
      deposit: 20000000,
      label: 'Apartment (아파트)',
      desc: 'Full-sized multi-room residential apartment complex with large kitchen and living room. Best for families and long stays; requires the highest key-money deposit.'
    },
    guesthouse: {
      survival: 400000,
      moderate: 700000,
      comfortable: 1100000,
      deposit: 0,
      label: 'Guest House / Hostel',
      desc: 'Furnished short-stay private room or dorm. Includes all utilities and Wi-Fi, flexible daily/monthly booking, with zero deposit required.'
    },
    friend: {
      survival: 0,
      moderate: 0,
      comfortable: 0,
      deposit: 0,
      label: 'Staying with Friend / Family',
      desc: 'Living with friends or family without rent or rental contract. You can choose below whether you pay ₩0 (all bills covered by host) or share household utilities.'
    }
  },
  locations: {
    outside_seoul: { mult: 0.75, label: 'Outside Seoul' },
    outskirts: { mult: 0.90, label: 'Seoul Outskirts' },
    central: { mult: 1.00, label: 'Seoul Central (Baseline)' },
    premium: { mult: 1.25, label: 'Premium (Gangnam/Seocho)' }
  },
  usage_styles: {
    minimal: { util_add: 40000, label: 'Eco-conscious', desc: 'Minimal heating/AC, thrifty electricity usage.' },
    standard: { util_add: 80000, label: 'Standard', desc: 'Comfortable daily AC in summer and floor heating (ondol) in winter.' },
    premium: { util_add: 160000, label: 'High Usage', desc: 'Continuous heating/AC, multiple heavy appliances, long showers.' }
  }
};

export const FOOD_DATA = {
  cooking: {
    none: { add: 0, label: 'No Home Cooking (100% Out)', desc: 'Zero grocery shopping; rely entirely on dining out and delivery.' },
    survival: { add: 120000, label: 'Basic Grocery Essentials', desc: 'Rice, eggs, tofu, instant noodles, budget mart staples (~₩4,000/day).' },
    moderate: { add: 240000, label: 'Standard Varied Groceries', desc: 'Fresh vegetables, meat, dairy, fruits, regular home cooking (~₩8,000/day).' },
    comfortable: { add: 420000, label: 'Gourmet & Premium Groceries', desc: 'Imported products, premium beef, specialty organic ingredients (~₩14,000/day).' }
  },
  restaurant: {
    none: { add: 0, label: 'Rarely Dine Out', desc: 'Cook at home, university cafeteria, or convenience store meals.' },
    survival: { add: 120000, label: 'Occasional Budget Dining (2-3x/week)', desc: 'Affordable Korean bunsik, kimbap, street food, student cafeterias (~₩10,000 × 12 meals).' },
    moderate: { add: 330000, label: 'Daily Standard Dining (1 meal/day)', desc: '1 standard lunch/dinner at local neighborhood eateries (~₩11,000 × 30 meals).' },
    comfortable: { add: 750000, label: 'Frequent & Premium Dining (2 meals/day + BBQ)', desc: 'Two restaurant meals daily, weekend Korean BBQ (samgyeopsal), trendy hot spots (~₩25,000/day).' }
  },
  delivery: {
    none: { add: 0, label: 'No Delivery Spending', desc: 'Zero food delivery app orders.' },
    survival: { add: 0, label: 'No Delivery Spending', desc: 'Zero food delivery app orders.' },
    moderate: { add: 130000, label: 'Occasional Delivery (1-2x/week)', desc: 'Weekend comfort food, late-night fried chicken or pizza (~₩18,000 × 7 orders).' },
    comfortable: { add: 300000, label: 'Frequent Delivery (3-4x/week)', desc: 'Regular Baemin/Coupang Eats delivery meals (~₩22,000 × 14 orders).' }
  },
  convenience: {
    none: { add: 0, label: 'No Convenience Store Spend', desc: 'Zero convenience store spending.' },
    survival: { add: 40000, label: 'Basic Emergency Snacks', desc: 'Bottled water, ramen, quick convenience runs (~₩1,300/day).' },
    moderate: { add: 80000, label: 'Regular Convenience Meals', desc: 'Convenience lunch boxes (Dosirak), triangle kimbap, drinks (~₩2,700/day).' },
    comfortable: { add: 140000, label: 'Frequent CVS Lifestyle', desc: 'Daily ready-to-eat meals, premium ice cream, late-night convenience visits (~₩4,700/day).' }
  },
  cafe_snacks: {
    none: { add: 0, label: 'No Cafe & Drink Spend', desc: 'Free water or instant Maxim coffee at home / office.' },
    survival: { add: 0, label: 'No Cafe & Drink Spend', desc: 'Free water or instant Maxim coffee at home / office.' },
    moderate: { add: 60000, label: 'Budget Drinks & Coffee (Mega / Compose)', desc: 'Iced tea, Americano, Mega Coffee 3-4x/week (~₩2,000-₩3,000/drink).' },
    comfortable: { add: 150000, label: 'Specialty Cafes, Bubble Tea & Desserts', desc: 'Starbucks, Gong Cha bubble tea, matcha, aesthetic cafes & pastries (~₩5,000/day).' }
  }
};

export const TRANSPORT_DATA = {
  types: {
    metro: {
      survival: 80000,
      moderate: 100000,
      comfortable: 120000,
      label: 'Metro & Bus Only',
      desc: 'Base commute with public transport (Subway + Bus with transfer discount).'
    },
    mixed: {
      survival: 120000,
      moderate: 180000,
      comfortable: 300000,
      label: 'Mixed Transport',
      desc: 'Regular public transit + occasional KakaoTaxi rides.'
    },
    taxi: {
      survival: 200000,
      moderate: 350000,
      comfortable: 500000,
      label: 'Taxi Heavy',
      desc: 'Frequent private taxi rides and convenient late-night transit.'
    },
    car: {
      survival: 500000,
      moderate: 650000,
      comfortable: 800000,
      label: 'Car Owner',
      desc: 'Gas, insurance, toll, parking, maintenance (Premium).'
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

export const INSURANCE_BY_VISA = {
  tourist: {
    survival: 45000,
    moderate: 95000,
    comfortable: 180000
  },
  student: {
    survival: 75000,
    moderate: 110000,
    comfortable: 180000
  },
  working_holiday: {
    survival: 60000,
    moderate: 120000,
    comfortable: 190000
  },
  nomad: {
    survival: 90000,
    moderate: 160000,
    comfortable: 260000
  },
  professional: {
    survival: 100000,
    moderate: 150000,
    comfortable: 250000
  }
};

export const VISA_DATA = {
  nomad: { add: 0, label: 'Digital Nomad (F-1-D Workcation)' },
  student: { add: 30000, label: 'Student (D-2 / D-4)' },
  professional: { add: 20000, label: 'Professional (E-Series / F-Visa)' },
  working_holiday: { add: 50000, label: 'Working Holiday (H-1 Visa)' },
  tourist: { add: 100000, label: 'Tourist / Long-stay (> 1 month)' }
};

export const LIFESTYLE_PLAN_DATA = {
  survival: { mult: 1.0, label: 'Essential Budget Mode', desc: 'Focus on minimal living & strict saving.' },
  moderate: { mult: 1.0, label: 'Standard Mode', desc: 'Standard balanced lifestyle in a one-room.' },
  comfortable: { mult: 1.0, label: 'Comfortable Mode', desc: 'Premium lifestyle with high convenience.' }
};

export const SETUP_DATA = {
  base_admin: 150000, // ARC, Visa, etc.
  emergency_cash: 800000,
  installation_matrix: {
    survival: {
      amount: 150000,
      label: 'Essential Setup (Thrift/Daiso)',
      desc: 'Floor sleeping pad, basic Daiso kitchenware, minimal setup.'
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
