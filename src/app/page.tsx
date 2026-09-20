'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BudgetCalculator from '@/components/BudgetCalculator'
import Navbar from '@/components/Navbar'
import { useBudgetStore } from '@/store/useBudgetStore'
import { translations } from '@/lib/translations'
import styles from './page.module.css'
import KCalcLogo from '@/components/KCalcLogo'
import { 
  Sparkles, 
  Database, 
  SlidersHorizontal, 
  ShieldCheck, 
  Heart
} from 'lucide-react'

export default function Home() {
  const store = useBudgetStore()
  const t = translations[store.language]

  return (
    <div className={styles.container}>
      {/* Unified Global Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <header className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.heroContent}
        >
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>{store.language === 'fr' ? 'Optimisé pour Nomades, Étudiants & Expats' : 'Calibrated for Nomads, Students & Expats'}</span>
          </div>
          <h1 className={styles.title}>
            {t.journeyTitle}
          </h1>
          <p className={styles.subtitle}>
            {t.heroDescription}
          </p>
        </motion.div>
      </header>

      {/* Calculator Core */}
      <main id="calculator" className={styles.main}>
        <BudgetCalculator />
      </main>

      {/* Value Proposition / Methodology Section */}
      <section id="features" className={styles.aboutSection}>
        <div className={styles.aboutHeader}>
          <h2>
            {store.language === 'fr'
              ? 'Pourquoi KCalc est plus précis qu\'une simple moyenne'
              : 'Why KCalc is Different from Generic Cost-of-Living Estimators'
            }
          </h2>
          <p>
            {store.language === 'fr'
              ? 'Des estimations réelles et prédictives adaptées aux visas, quartiers et modes de vie réels.'
              : 'Real, predictive budgeting calibrated for expat visas, neighborhoods, and actual spending habits.'
            }
          </p>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <Database size={22} />
            </div>
            <h3>{t.feature1Title}</h3>
            <p>{t.feature1Desc}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <SlidersHorizontal size={22} />
            </div>
            <h3>{t.feature2Title}</h3>
            <p>{t.feature2Desc}</p>
          </div>
           <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <ShieldCheck size={22} />
            </div>
            <h3>{t.feature3Title}</h3>
            <p>{t.feature3Desc}</p>
          </div>
        </div>
      </section>

      {/* Target Anchor for Relocation Pack */}
      <div id="relocation" />

      <footer className={styles.footer}>
        <div style={{ marginBottom: '0.75rem' }}>
          <KCalcLogo size={30} showText={true} />
        </div>
        <div className={styles.footerLinks}>
          <span>KCalc Korea</span>
          <span>•</span>
          <span>Seoul Relocation Engine</span>
          <span>•</span>
          <span>Expat Budget Simulator</span>
        </div>
        <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted for digital nomads, students & expats moving to South Korea <Heart size={12} color="#ef4444" fill="#ef4444" />
        </p>
      </footer>
    </div>
  )
}
