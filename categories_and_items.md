# K-Budget Categories and Items

This document outlines all behavioral categories and logic tiers used in the K-Budget calculation engine.

## 🏢 1. Housing
Calculates base rent and utility usage, adjusted by location multipliers.

### Housing Types
*   **Goshiwon**: ₩450,000 baseline. Inclusive of basic food.
*   **Shared Apartment**: ₩600,000 base. Private room in a shared set.
*   **One-room (Studio)**: ₩850,000 base. Standard private unit.
*   **Officetel**: ₩1,100,000 base. Modern, high-end studio.
*   **Apartment (1BR+)**: ₩1,800,000 base. Full residential flat.
*   **Luxury/High-end**: ₩4,500,000 base. Premium districts.

### Location Multipliers
*   **Outside Seoul**: 0.7x
*   **Seoul Outskirts**: 0.9x
*   **Seoul Central**: 1.15x
*   **Premium Districts**: 1.45x (Gangnam/Seocho)

### Utility Usage Styles
*   **Minimal**: ₩0 addition. Strict control.
*   **Standard**: ₩80,000 addition.
*   **Comfortable**: ₩160,000 addition. Frequent AC/Heating.
*   **Premium**: ₩300,000 addition. High tech/constant use.

---

## 🍜 2. Dining & Groceries
Calculates monthly food costs based on behavior, preference, and shopping habits.

### Cooking Frequency
*   **Mostly Cooking**: ₩300,000 base mod.
*   **Balanced**: ₩500,000 base mod.
*   **Mostly Eating Out**: ₩850,000 base mod.
*   **Almost No Cooking**: ₩1,200,000 base mod.

### Food Preferences
*   **Mostly Korean**: 1.0x
*   **Mixed**: 1.25x
*   **Foreign Food Frequent**: 1.6x
*   **Premium Dining**: 2.2x

### Grocery Behavior
*   **Budget Supermarkets**: 0.8x
*   **Standard Supermarkets**: 1.0x
*   **Imported Food Heavy**: 1.7x
*   **Premium Groceries**: 2.5x

### Coffee Habits
*   **Rare (0-4/mo)**: +₩20,000
*   **Casual (1-3/wk)**: +₩60,000
*   **Frequent (Daily)**: +₩150,000
*   **Heavy (2+ Daily)**: +₩280,000

---

## 🚍 3. Transport
Calculates mobility costs based on mode and movement frequency.

### Transport Modes
*   **Walking / Minimal**: ₩30,000 base.
*   **Public Transport Only**: ₩85,000 base.
*   **Public + Occasional Taxi**: ₩160,000 base.
*   **Frequent Taxi**: ₩450,000 base.
*   **Car Owner**: ₩850,000 base.

### Movement Frequency
*   **Rare**: 0.8x
*   **Weekly Outings**: 1.0x
*   **Frequent Movement**: 1.4x
*   **Constant Commuting**: 1.8x

---

## 🏥 4. Health & Personal Care
Fixed additions for maintenance and wellness.

### Healthcare Level
*   **Minimal**: +₩150,000 (Insurance focused)
*   **Occasional**: +₩220,000 (Clinic visits)
*   **Regular Care**: +₩350,000
*   **Premium / Private**: +₩800,000

### Personal Care
*   **Basic**: +₩60,000
*   **Standard**: +₩150,000 (Hair/Skin)
*   **High**: +₩400,000
*   **Premium**: +₩1,200,000

---

## 🧘 5. Wellness & Development
Investments in self-growth and physical health.

### Learning Investment
*   **None**: ₩0
*   **Occasional Courses**: +₩80,000
*   **Regular Learning**: +₩250,000
*   **Intensive Investment**: +₩700,000

### Fitness Behavior
*   **None**: ₩0
*   **Basic (Home/Cheap Gym)**: +₩40,000
*   **Gym Membership**: +₩120,000
*   **Premium Fitness / PT**: +₩500,000

---

## 🛍️ 6. Lifestyle & Social
Flexible spending components.

### Shopping Behavior
*   **Only Essentials**: +₩100,000
*   **Occasional Purchases**: +₩300,000
*   **Frequent Shopping**: +₩700,000
*   **Lifestyle-Driven**: +₩1,500,000

### Clothing Style
*   **Minimal / Functional**: +₩80,000
*   **Seasonal Updates**: +₩250,000
*   **Fashion-Conscious**: +₩650,000
*   **Premium Brands**: +₩2,000,000

### Social Frequency
*   **Rare**: +₩80,000
*   **Weekly**: +₩250,000
*   **2-3 Times/Week**: +₩600,000
*   **Very Active (4+)**: +₩1,200,000

### Entertainment Style
*   **Home-based**: 0.8x
*   **Mixed**: 1.0x
*   **Active (Events/Cinema)**: 1.5x
*   **Premium Experiences**: 2.5x

---

## 📱 7. Digital & SaaS
Costs for subscriptions and digital tools.

### Digital Usage
*   **Minimal**: +₩20,000
*   **Standard**: +₩55,000
*   **Heavy**: +₩120,000
*   **Power User**: +₩350,000

### SaaS/Sub Type
*   **Entertainment Only**: 1.0x
*   **Mixed**: 1.3x
*   **Professional Tools**: 1.8x
*   **Heavy AI / SaaS**: 2.5x

---

## 🌍 8. Foreigner Specifics
Adjustments for international living and administrative needs.

### International Living
*   **None**: ₩0
*   **Occasional**: +₩150,000
*   **Regular Remittance**: +₩450,000
*   **Heavy International Life**: +₩1,200,000 (Imports/Regular flights)

### Import Dependency
*   **Low Dependency**: 1.0x
*   **Medium**: 1.25x
*   **High**: 1.6x
*   **Very High**: 2.2x

---

## 🧭 9. Identity & Global Modifiers
High-level planning variables that scale the entire model.

### Visa Status
*   **Digital Nomad**: +₩0
*   **Professional**: +₩20,000
*   **Working Holiday**: +₩50,000
*   **Tourist**: +₩100,000 (Reflects no local health subsidy)

### Lifestyle Planning Mode (Global Multiplier)
*   **Survival Mode**: 0.8x (Budget focused)
*   **Moderate**: 1.0x (Balanced)
*   **Comfortable**: 1.4x (High discretionary)

### Buffer Level (Misc Safety)
*   **None**: 1.0x
*   **Low (5%)**: 1.05x
*   **Medium (15%)**: 1.15x
*   **High (30%)**: 1.3x

---

## 📦 10. Upfront Costs (Initial Setup)
*   **Base Admin**: ₩150,000 (Visa/Docs)
*   **Arrival Essentials**: ₩450,000 (Bedding/Kitchen)
*   **Emergency Cash**: ₩800,000
*   **Housing Deposit**: Varies by housing type choice.
