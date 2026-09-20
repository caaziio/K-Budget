'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useBudgetStore } from '@/store/useBudgetStore'
import { translations } from '@/lib/translations'
import styles from './pricing.module.css'
import KCalcLogo from '@/components/KCalcLogo'
import { 
  Check, 
  Sparkles, 
  Calendar, 
  Calculator, 
  MapPin, 
  FileText, 
  Database, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Home,
  MessageCircle,
  FileCheck
} from 'lucide-react'

import Navbar from '@/components/Navbar'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'vip'>('pro')
  const [showCalendar, setShowCalendar] = useState(false)
  const store = useBudgetStore()
  const t = translations[store.language]

  const handleBookClick = (plan: 'pro' | 'vip') => {
    setSelectedPlan(plan)
    setShowCalendar(true)
    const el = document.getElementById('booking-calendar')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.pricingContainer}>
      {/* Unified Global Navigation Bar */}
      <Navbar />

      {/* Hero Header */}
      <header className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.heroBadge}>
            <Sparkles size={14} />
            <span>{store.language === 'fr' ? 'Accompagnement & Optimisation des Coûts' : 'Expat Relocation & Settling Packages'}</span>
          </div>
          <h1 className={styles.title}>{t.pricingTitle}</h1>
          <p className={styles.subtitle}>{t.pricingSubtitle}</p>
        </motion.div>
      </header>

      {/* 3-Tier Pricing Grid */}
      <section className={styles.pricingGrid}>
        {/* Tier 1: Free */}
        <motion.div 
          className={styles.pricingCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.planName}>{t.planFreeTitle}</h3>
            <p className={styles.planDesc}>{t.planFreeDesc}</p>
            <div className={styles.priceBox}>
              <span className={styles.priceAmount}>{t.planFreePrice}</span>
              <span className={styles.pricePeriod}>{store.language === 'fr' ? '/ 100% gratuit' : '/ 100% free'}</span>
            </div>
          </div>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span>{store.language === 'fr' ? 'Calculateur comportemental illimité' : 'Full behavioral runway engine'}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span>{store.language === 'fr' ? 'Multiplicateurs de quartiers de Séoul' : 'Seoul district multipliers & rent indices'}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span>{store.language === 'fr' ? 'Conversion de devise temps réel (KRW/USD/EUR)' : 'Multi-currency conversion (KRW/USD/EUR)'}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span>{store.language === 'fr' ? 'Échéancier mensuel de réserve de trésorerie' : 'Month-by-month cashflow schedule'}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span>{store.language === 'fr' ? 'Guide indicatif des visas & règles NHIS' : 'General visa & NHIS insurance guidelines'}</span>
            </div>
          </div>

          <Link href="/" className={styles.planBtn}>
            {t.planFreeBtn} <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Tier 2: Relocation Pack ($229) - Featured */}
        <motion.div 
          className={styles.pricingCardFeatured}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.cardBadge}>
            <Sparkles size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {t.planProBadge}
          </div>

          <div className={styles.cardHeader}>
            <h3 className={styles.planName}>{t.planProTitle}</h3>
            <p className={styles.planDesc}>{t.planProDesc}</p>
            <div className={styles.priceBox}>
              <span className={styles.priceAmount}>{t.planProPrice}</span>
              <span className={styles.pricePeriod}>{store.language === 'fr' ? 'USD / session + pack' : 'USD / session + pack'}</span>
            </div>
          </div>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span><strong>{t.counselorLabel}:</strong> {t.counselorDesc}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span><strong>{t.optimizationLabel}:</strong> {t.optimizationDesc}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span><strong>{t.settlingKitLabel}:</strong> {t.settlingKitDesc}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span><strong>{t.hotlineLabel}:</strong> {t.hotlineDesc}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span>{store.language === 'fr' ? 'Négociation de bail direct sans commission d\'agence excessive' : 'Direct lease channels bypassing middleman markups'}</span>
            </div>
          </div>

          <button 
            className={styles.planBtnFeatured}
            onClick={() => handleBookClick('pro')}
          >
            <Calendar size={16} /> {t.planProBtn}
          </button>
        </motion.div>

        {/* Tier 3: VIP Concierge ($549) */}
        <motion.div 
          className={styles.pricingCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.planName}>{t.planVipTitle}</h3>
            <p className={styles.planDesc}>{t.planVipDesc}</p>
            <div className={styles.priceBox}>
              <span className={styles.priceAmount}>{t.planVipPrice}</span>
              <span className={styles.pricePeriod}>{store.language === 'fr' ? 'USD / service complet' : 'USD / full service'}</span>
            </div>
          </div>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span>{store.language === 'fr' ? 'Tout ce qui est inclus dans le Pack Relocation' : 'Everything in Relocation Pack'}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span><strong>{store.language === 'fr' ? 'Relecture de Bail Coréen' : 'Lease Contract Review'}:</strong> {store.language === 'fr' ? 'Audit juridique de la caution et clauses cachées' : 'Legal clause audit and key-money safety verification'}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span><strong>{store.language === 'fr' ? 'Visites Vidéo en Direct' : 'Video Housing Tours'}:</strong> {store.language === 'fr' ? 'Inspection sur place avant votre arrivée' : 'Pre-arrival on-the-ground property inspections'}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span><strong>{store.language === 'fr' ? 'Démarches Administratives' : 'ARC & Bank Account'}:</strong> {store.language === 'fr' ? 'Accompagnement ouverture compte & carte de séjour' : 'In-person bank opening & Alien Registration guidance'}</span>
            </div>
            <div className={styles.featureItem}>
              <Check size={16} className={styles.featureIcon} />
              <span><strong>{store.language === 'fr' ? 'Hotline VIP 90 Jours' : '90-Day VIP Hotline'}:</strong> {store.language === 'fr' ? 'Assistance prioritaire 7j/7 pour toutes urgences' : '7-day priority emergency settling messaging line'}</span>
            </div>
          </div>

          <button 
            className={styles.planBtn}
            onClick={() => handleBookClick('vip')}
          >
            <Calendar size={16} /> {t.planVipBtn}
          </button>
        </motion.div>
      </section>

      {/* Booking Calendar Anchor & Embed */}
      <div id="booking-calendar" className={styles.calendarSection}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#059669' }}>
            {store.language === 'fr' ? '📅 Réservation Immédiate' : '📅 Instant Scheduling'}
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', marginTop: '0.25rem' }}>
            {store.language === 'fr' 
              ? `Réserver votre Consultation ${selectedPlan === 'vip' ? 'VIP' : 'Relocation'}`
              : `Book Your ${selectedPlan === 'vip' ? 'VIP' : 'Relocation'} Consultation Slot`
            }
          </h2>
        </div>

        <div className={styles.calendarNotice}>
          <strong>{t.howBookingWorks}</strong><br />
          {t.howBookingDesc}
        </div>

        <div className={styles.iframeWrapper}>
          <iframe 
            src="https://appt.link/meet-with-foranet-NrvCv15i/kcal-budget-korea" 
            width="100%" 
            height="700px" 
            style={{ border: 'none', background: 'white' }}
            title="Book Relocation Consultation"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className={styles.faqGrid}>
          <div className={styles.faqCard}>
            <div className={styles.faqQuestion}>💡 {t.faqQ1}</div>
            <div className={styles.faqAnswer}>{t.faqA1}</div>
          </div>
          <div className={styles.faqCard}>
            <div className={styles.faqQuestion}>💰 {t.faqQ2}</div>
            <div className={styles.faqAnswer}>{t.faqA2}</div>
          </div>
          <div className={styles.faqCard}>
            <div className={styles.faqQuestion}>🛂 {t.faqQ3}</div>
            <div className={styles.faqAnswer}>{t.faqA3}</div>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid rgba(226, 232, 240, 0.8)', paddingTop: '2.5rem' }}>
        <KCalcLogo size={28} showText={true} />
        <div style={{ display: 'flex', gap: '1rem', color: '#64748b', fontWeight: 600 }}>
          <span>KCalc Korea</span>
          <span>•</span>
          <span>Relocation & Runway Engine</span>
          <span>•</span>
          <span>Seoul 2026</span>
        </div>
      </footer>
    </div>
  )
}
