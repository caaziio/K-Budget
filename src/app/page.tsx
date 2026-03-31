'use client'

import React from 'react'
import { motion } from 'framer-motion'
import BudgetCalculator from '@/components/BudgetCalculator'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.heroContent}
        >
          <div className={styles.badge}>Student Edition</div>
          <h1 className={styles.title}>Your Journey to <span className={styles.highlight}>Korea</span> Starts with a Plan</h1>
          <p className={styles.subtitle}>
            K-Budget is the essential financial planner for students moving to South Korea. 
            Calculate costs, manage your runway, and optimize your stay.
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
            <h3>Local Market Data</h3>
            <p>Real-time estimates for rent, food, and utilities across major Korean cities.</p>
          </div>
          <div className={styles.feature}>
            <h3>Smart Multipliers</h3>
            <p>Automatic budget adjustments for your lifestyle, city, and stay duration.</p>
          </div>
           <div className={styles.feature}>
            <h3>Risk Indicator</h3>
            <p>Know exactly how long your savings will last with our burn rate calculations.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
