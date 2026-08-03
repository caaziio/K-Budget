'use client'

import React from 'react'
import { motion } from 'framer-motion'
import BudgetCalculator from '@/components/BudgetCalculator'
import { useBudgetStore } from '@/store/useBudgetStore'
import { translations } from '@/lib/translations'
import styles from './page.module.css'

export default function Home() {
  const store = useBudgetStore()
  const t = translations[store.language]

  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      {/* Language Switcher */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.375rem', zIndex: 50 }}>
        <button 
          onClick={() => store.setVal('language', 'en')} 
          style={{ 
            padding: '0.375rem 0.75rem', 
            borderRadius: '0.5rem', 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            border: store.language === 'en' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.15)', 
            background: store.language === 'en' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
            color: store.language === 'en' ? '#60a5fa' : '#94a3b8',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)'
          }}
        >
          EN
        </button>
        <button 
          onClick={() => store.setVal('language', 'fr')} 
          style={{ 
            padding: '0.375rem 0.75rem', 
            borderRadius: '0.5rem', 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            border: store.language === 'fr' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.15)', 
            background: store.language === 'fr' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
            color: store.language === 'fr' ? '#60a5fa' : '#94a3b8',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)'
          }}
        >
          FR
        </button>
      </div>

      <header className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.heroContent}
        >
          <h1 className={styles.title}>
            {store.language === 'fr' ? (
              <>Votre Voyage en <span className={styles.highlight}>Corée</span> Commence par un Plan</>
            ) : (
              <>Your Journey to <span className={styles.highlight}>Korea</span> Starts with a Plan</>
            )}
          </h1>
          <p className={styles.subtitle}>
            {t.heroDescription}
          </p>
        </motion.div>
      </header>

      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={styles.calculatorSection}
      >
        <BudgetCalculator />
      </motion.section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <div className={styles.feature}>
            <h3>{t.feature1Title}</h3>
            <p>{t.feature1Desc}</p>
          </div>
          <div className={styles.feature}>
            <h3>{t.feature2Title}</h3>
            <p>{t.feature2Desc}</p>
          </div>
           <div className={styles.feature}>
            <h3>{t.feature3Title}</h3>
            <p>{t.feature3Desc}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
