import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBudgetStore, HousingType, HousingLocation, HousingStyle, CookingFreq, FoodPreference, GroceryStyle, CoffeeHabit, TransportType, TransportFreq, HealthLevel, PersonalCareLevel, ShoppingBehavior, ClothingStyle, TravelLeisureFreq, SocialFreq, NightlifeLevel, EntertainmentStyle, LearningLevel, FitnessLevel, InternationalLife, AdminLoad, ImportDependency, DigitalUsage, DigitalType, InternalTravel, BufferLevel, GiftingLevel } from '@/store/useBudgetStore'
import { HOUSING_DATA, FOOD_DATA, TRANSPORT_DATA, HEALTH_PERSONAL_DATA, LIFESTYLE_SHOPPING_DATA, SOCIAL_DATA, DEVELOPMENT_FITNESS_DATA, FOREIGNER_DATA, DIGITAL_DATA, MISC_IRREGULAR_DATA, TRAVEL_LEISURE_DATA } from '@/lib/constants'
import styles from './BudgetCalculator.module.css'
import { Plane, Home, Utensils, Wallet, CheckCircle, ChevronLeft, ChevronRight, Info, Coffee, Car, Heart, ShoppingBag, Globe, Zap, AlertCircle, TrendingUp, Dumbbell, BookOpen, Music, Beer, Map } from 'lucide-react'

const STEPS = [
  { id: 1, title: 'Identity', icon: Plane },
  { id: 2, title: 'Housing', icon: Home },
  { id: 3, title: 'Dining', icon: Utensils },
  { id: 4, title: 'Wellness', icon: Heart },
  { id: 5, title: 'Lifestyle', icon: ShoppingBag },
  { id: 6, title: 'Result', icon: Wallet },
]

export default function BudgetCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const store = useBudgetStore()

  const handleNext = () => setCurrentStep((prev: number) => Math.min(prev + 1, STEPS.length))
  const handleBack = () => setCurrentStep((prev: number) => Math.max(prev - 1, 1))

  const totals = store.calculateTotals()

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Onboarding Core</h2>
            <div className={styles.formGrid}>
               <div className={styles.inputGroup}>
                <label>Stay Duration (Months)</label>
                <input type="number" value={store.duration} onChange={(e) => store.setVal('duration', parseInt(e.target.value) || 1)} />
              </div>
              <div className={styles.inputGroup}>
                <label>Target Neighborhood</label>
                <select value={store.housingLocation} onChange={(e) => store.setVal('housingLocation', e.target.value as HousingLocation)}>
                   {(Object.keys(HOUSING_DATA.locations) as HousingLocation[]).map(l => (
                     <option key={l} value={l}>{HOUSING_DATA.locations[l].label}</option>
                   ))}
                </select>
              </div>
               <div className={styles.inputGroupFull}>
                 <label>Main Mobility Type</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(TRANSPORT_DATA.main) as TransportType[]).map(t => (
                      <div key={t} className={store.transportType === t ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('transportType', t)}>
                        <h4>{TRANSPORT_DATA.main[t].label}</h4>
                      </div>
                    ))}
                 </div>
               </div>
               <div className={styles.inputGroupFull}>
                 <label>Admin & Visa Complexity</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOREIGNER_DATA.admin) as AdminLoad[]).map(a => (
                      <div key={a} className={store.adminLoad === a ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('adminLoad', a)}>
                        <h4>{FOREIGNER_DATA.admin[a].label}</h4>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Living Space</h2>
            <div className={styles.formGrid}>
               <div className={styles.inputGroupFull}>
                 <div className={styles.toggleRow}>
                   <label>Jeonse Model (Full Deposit)</label>
                   <input type="checkbox" checked={store.isJeonse} onChange={(e) => store.setVal('isJeonse', e.target.checked)} />
                 </div>
               </div>
               <div className={styles.inputGroupFull}>
                <label>Housing Type</label>
                <div className={styles.selectionGrid}>
                  {(Object.keys(HOUSING_DATA.types) as HousingType[]).map(h => (
                    <div key={h} className={store.housingType === h ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('housingType', h)}>
                      <h4>{HOUSING_DATA.types[h].label}</h4>
                      <p>{HOUSING_DATA.types[h].desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.inputGroupFull}>
                 <label>Utility Usage Style</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(HOUSING_DATA.usage_styles) as HousingStyle[]).map(s => (
                      <div key={s} className={store.housingStyle === s ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('housingStyle', s)}>
                        <h4>{HOUSING_DATA.usage_styles[s].label}</h4>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Food & Behavioral Dining</h2>
            <div className={styles.behavioralCluster}>
               <section>
                 <h3><Utensils size={14} /> Cooking & Groceries</h3>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOOD_DATA.cooking) as CookingFreq[]).map(c => (
                      <div key={c} className={store.cookingFreq === c ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('cookingFreq', c)}>
                        <span>{FOOD_DATA.cooking[c].label}</span>
                      </div>
                    ))}
                 </div>
               </section>
               <section style={{ marginTop: '1.5rem' }}>
                 <h3>Grocery Behavior</h3>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOOD_DATA.groceries) as GroceryStyle[]).map(g => (
                      <div key={g} className={store.groceryStyle === g ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('groceryStyle', g)}>
                        <span>{FOOD_DATA.groceries[g].label}</span>
                      </div>
                    ))}
                 </div>
               </section>
               <section style={{ marginTop: '1.5rem' }}>
                 <h3><Coffee size={14} /> Coffee Habit</h3>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(FOOD_DATA.coffee) as CoffeeHabit[]).map(c => (
                      <div key={c} className={store.coffeeHabit === c ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('coffeeHabit', c)}>
                        <span>{FOOD_DATA.coffee[c].label}</span>
                      </div>
                    ))}
                 </div>
               </section>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Wellness & Care</h2>
            <div className={styles.formGrid}>
               <div className={styles.inputGroupFull}>
                 <label>Healthcare Level</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(HEALTH_PERSONAL_DATA.health) as HealthLevel[]).map(h => (
                      <div key={h} className={store.healthLevel === h ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('healthLevel', h)}>
                        <h4>{HEALTH_PERSONAL_DATA.health[h].label}</h4>
                      </div>
                    ))}
                 </div>
               </div>
               <div className={styles.inputGroupFull}>
                 <label><Dumbbell size={14} /> Fitness Behavior</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(DEVELOPMENT_FITNESS_DATA.fitness) as FitnessLevel[]).map(f => (
                      <div key={f} className={store.fitnessLevel === f ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('fitnessLevel', f)}>
                        <h4>{DEVELOPMENT_FITNESS_DATA.fitness[f].label}</h4>
                      </div>
                    ))}
                 </div>
               </div>
               <div className={styles.inputGroupFull}>
                 <label><BookOpen size={14} /> Learning Investment</label>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(DEVELOPMENT_FITNESS_DATA.learning) as LearningLevel[]).map(l => (
                      <div key={l} className={store.learningLevel === l ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('learningLevel', l)}>
                        <h4>{DEVELOPMENT_FITNESS_DATA.learning[l].label}</h4>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </motion.div>
        )
      case 5:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Lifestyle & Social</h2>
            <div className={styles.behavioralCluster}>
               <section>
                 <h3><ShoppingBag size={14} /> Shopping & Clothing</h3>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(LIFESTYLE_SHOPPING_DATA.behavior) as ShoppingBehavior[]).map(s => (
                      <div key={s} className={store.shoppingBehavior === s ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('shoppingBehavior', s)}>
                        <span>{LIFESTYLE_SHOPPING_DATA.behavior[s].label}</span>
                      </div>
                    ))}
                 </div>
               </section>
               <section style={{ marginTop: '1.5rem' }}>
                 <h3><Beer size={14} /> Social Frequency</h3>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(SOCIAL_DATA.frequency) as SocialFreq[]).map(f => (
                      <div key={f} className={store.socialFreq === f ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('socialFreq', f)}>
                        <span>{SOCIAL_DATA.frequency[f].label}</span>
                      </div>
                    ))}
                 </div>
               </section>
               <section style={{ marginTop: '1.5rem' }}>
                 <h3><Map size={14} /> Travel & Leisure</h3>
                 <div className={styles.selectionGrid}>
                    {(Object.keys(TRAVEL_LEISURE_DATA.frequency) as TravelLeisureFreq[]).map(t => (
                      <div key={t} className={store.travelLeisure === t ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('travelLeisure', t)}>
                        <span>{TRAVEL_LEISURE_DATA.frequency[t].label}</span>
                      </div>
                    ))}
                 </div>
               </section>
               <section style={{ marginTop: '1.5rem' }}>
                 <h3><Zap size={14} /> Digital & Subscriptions</h3>
                 <div className={styles.selectionGrid}>
                    <div className={!store.useCustomDigital ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('useCustomDigital', false)}>
                       <span>Plan-based</span>
                    </div>
                    <div className={store.useCustomDigital ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('useCustomDigital', true)}>
                       <span>Custom Amount</span>
                    </div>
                 </div>

                 {store.useCustomDigital ? (
                   <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                     <label>Current Monthly Total (KRW)</label>
                     <input type="number" placeholder="Enter amount..." value={store.customDigitalAmount || ''} onChange={(e) => store.setVal('customDigitalAmount', parseInt(e.target.value) || 0)} />
                   </div>
                 ) : (
                    <div className={styles.selectionGrid} style={{ marginTop: '1rem' }}>
                      {(Object.keys(DIGITAL_DATA.usage) as DigitalUsage[]).map(d => (
                        <div key={d} className={store.digitalUsage === d ? styles.selectionCardActive : styles.selectionCard} onClick={() => store.setVal('digitalUsage', d)}>
                          <span>{DIGITAL_DATA.usage[d].label}</span>
                        </div>
                      ))}
                    </div>
                 )}
               </section>
            </div>
          </motion.div>
        )
      case 6:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className={styles.summaryContent}>
            <div className={styles.stabilityMeter}>
               <div className={styles.meterHeader}>
                  <h3>Financial Stability Check</h3>
                  <span>{Math.round(totals.stabilityScore)}%</span>
               </div>
               <div className={styles.meterTrack}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${totals.stabilityScore}%` }} className={styles.meterFill} style={{ backgroundColor: totals.stabilityScore > 75 ? '#10b981' : totals.stabilityScore > 45 ? '#f59e0b' : '#ef4444' }} />
               </div>
               <p className={styles.meterDesc}>
                 {totals.stabilityScore > 75 ? 'Behaviorally Conservative. High budget resilience.' : 
                  totals.stabilityScore > 45 ? 'Lifestyle Balanced. Occasional buffers needed.' : 
                  'High Luxury Dependency. Budget is sensitive to lifestyle drops.'}
               </p>
            </div>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <h3>Immediate Cash</h3>
                <div className={styles.amount}>₩{totals.totalUpfront.toLocaleString()}</div>
                <p>Deposit + Arrival Setup</p>
              </div>
              <div className={styles.summaryCard}>
                <h3>Burn Rate</h3>
                <div className={styles.amount}>₩{totals.monthlyBurn.toLocaleString()}</div>
                <p>Est. Monthly Behavioral Cost</p>
              </div>
               <div className={styles.summaryCardPrimary}>
                <h3>Runway Buffer</h3>
                <div className={styles.amountIndicator}>₩{totals.totalBudgetRequired.toLocaleString()}</div>
                <p>{store.duration} mo plan requirement</p>
              </div>
            </div>

            <div className={styles.breakdownBox}>
               <div className={styles.barChart}>
                  {Object.entries(totals.breakdown).map(([name, val]) => (
                    <div key={name} className={styles.barItem}>
                       <div className={styles.barLabel}><span>{name}</span> <span>₩{( (val as number) / 1000).toFixed(0)}k</span></div>
                       <div className={styles.barLine}><div style={{ width: `${((val as number) / totals.monthlyBurn) * 100}%` }} /></div>
                    </div>
                  ))}
               </div>
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
          <div key={step.id} className={`${styles.stepIndicator} ${currentStep === step.id ? styles.active : ''} ${currentStep > step.id ? styles.completed : ''}`}>
            <div className={styles.iconCircle}>{<step.icon size={16} />}</div>
            <span>{step.title}</span>
          </div>
        ))}
      </div>
      <div className={styles.contentArea}><AnimatePresence mode="wait">{renderStep()}</AnimatePresence></div>
      <div className={styles.controls}>
        <button onClick={handleBack} disabled={currentStep === 1} className={styles.backBtn}><ChevronLeft size={20} /> Back</button>
        <button onClick={handleNext} className={styles.nextBtn}>{currentStep === STEPS.length ? 'Get Full Analysis' : 'Identify Behavior'} <ChevronRight size={20} /></button>
      </div>
    </div>
  )
}
