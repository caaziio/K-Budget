'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useBudgetStore } from '@/store/useBudgetStore'
import { translations } from '@/lib/translations'
import styles from './Navbar.module.css'
import KCalcLogo from './KCalcLogo'
import { 
  Calculator, 
  MapPin, 
  FileText, 
  Database, 
  Compass, 
  Calendar, 
  Menu, 
  X, 
  Building, 
  GraduationCap, 
  Briefcase, 
  Plane 
} from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDistrictsModal, setShowDistrictsModal] = useState(false)
  const [showVisasModal, setShowVisasModal] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()
  const store = useBudgetStore()
  const t = translations[store.language]

  const isPricing = pathname === '/pricing'

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false)
    if (pathname === '/') {
      const el = document.getElementById(targetId)
      if (el) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
        const navOffset = isMobile ? 12 : 20;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - navOffset),
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      router.push(`/#${targetId}`)
    }
  }

  const openDistricts = () => {
    setMobileMenuOpen(false)
    setShowDistrictsModal(true)
  }

  const openVisas = () => {
    setMobileMenuOpen(false)
    setShowVisasModal(true)
  }

  return (
    <>
      <nav className={styles.navBar}>
        {/* Crisp Vector KCalc Logo */}
        <Link 
          href="/" 
          className={styles.logoArea} 
          onClick={() => { if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <KCalcLogo size={34} showText={true} />
        </Link>

        {/* Desktop Menu Items */}
        <div className={styles.navCenter}>
          <button 
            type="button" 
            className={!isPricing ? styles.navLinkActive : styles.navLink} 
            onClick={() => handleNavClick('calculator')}
          >
            <Calculator size={14} />
            {t.navCalculator}
          </button>
          
          <button 
            type="button" 
            className={styles.navLink} 
            onClick={openDistricts}
          >
            <MapPin size={14} />
            {t.navDistricts}
          </button>
          
          <button 
            type="button" 
            className={styles.navLink} 
            onClick={openVisas}
          >
            <FileText size={14} />
            {t.navVisas}
          </button>
          
          <Link 
            href="/pricing" 
            className={isPricing ? styles.navLinkActive : styles.navLink}
          >
            <Compass size={14} />
            {t.navRelocation}
          </Link>
        </div>

        {/* Right Actions: Lang Switcher + CTA + Mobile Toggle */}
        <div className={styles.navRight}>
          <div className={styles.langSegmented}>
            <button 
              type="button"
              onClick={() => store.setVal('language', 'en')}
              className={store.language === 'en' ? styles.langBtnActive : styles.langBtn}
            >
              EN
            </button>
            <button 
              type="button"
              onClick={() => store.setVal('language', 'fr')}
              className={store.language === 'fr' ? styles.langBtnActive : styles.langBtn}
            >
              FR
            </button>
          </div>

          <Link href="/pricing" className={styles.navCtaBtn}>
            <Calendar size={13} />
            <span>{t.bookConsultationBtn}</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button" 
            className={styles.mobileToggle} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className={styles.mobileDrawer}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                type="button"
                className={!isPricing ? styles.mobileNavLinkActive : styles.mobileNavLink}
                onClick={() => handleNavClick('calculator')}
              >
                <Calculator size={16} />
                <span>{t.navCalculator}</span>
              </button>

              <button 
                type="button"
                className={styles.mobileNavLink}
                onClick={openDistricts}
              >
                <MapPin size={16} />
                <span>{t.navDistricts}</span>
              </button>

              <button 
                type="button"
                className={styles.mobileNavLink}
                onClick={openVisas}
              >
                <FileText size={16} />
                <span>{t.navVisas}</span>
              </button>

              <Link 
                href="/pricing"
                className={isPricing ? styles.mobileNavLinkActive : styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Compass size={16} />
                <span>{t.navRelocation}</span>
              </Link>

              <div className={styles.mobileDrawerDivider} />

              <div className={styles.mobileBottomRow}>
                <div className={styles.langSegmented}>
                  <button 
                    type="button"
                    onClick={() => store.setVal('language', 'en')}
                    className={store.language === 'en' ? styles.langBtnActive : styles.langBtn}
                  >
                    English
                  </button>
                  <button 
                    type="button"
                    onClick={() => store.setVal('language', 'fr')}
                    className={store.language === 'fr' ? styles.langBtnActive : styles.langBtn}
                  >
                    Français
                  </button>
                </div>

                <Link 
                  href="/pricing" 
                  className={styles.mobileCtaBtn}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar size={14} />
                  <span>{t.bookConsultationBtn}</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Seoul Districts Overview Modal */}
      {showDistrictsModal && (
        <div className={styles.infoModalOverlay} onClick={() => setShowDistrictsModal(false)}>
          <div className={styles.infoModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.infoModalHeader}>
              <h3>
                {store.language === 'fr' ? '🏙️ Guide & Coût des Quartiers de Séoul' : '🏙️ Seoul Neighborhoods & Cost Index'}
              </h3>
              <button 
                type="button"
                onClick={() => setShowDistrictsModal(false)} 
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h4><Building size={16} color="#059669" /> {store.language === 'fr' ? 'Centre de Séoul (Mapo / Yongsan / Jongno)' : 'Seoul Central (Mapo / Yongsan / Jongno)'}</h4>
                <p>
                  {store.language === 'fr'
                    ? 'Quartiers culturels et étudiants vibrants (Hongdae, Sinchon, Itaewon). Loyers standards de référence (Indice 1.0x). Préféré par les étudiants et jeunes professionnels.'
                    : 'Vibrant cultural and student hubs (Hongdae, Sinchon, Itaewon). Standard baseline cost index (1.0x). Ideal for university students and expats.'
                  }
                </p>
              </div>
              <div className={styles.infoCard}>
                <h4><Building size={16} color="#d97706" /> {store.language === 'fr' ? 'Quartiers Premium (Gangnam / Seocho / Songpa)' : 'Premium Districts (Gangnam / Seocho / Songpa)'}</h4>
                <p>
                  {store.language === 'fr'
                    ? 'Le cœur économique moderne et résidentiel chic au sud du fleuve Han. Majoration loyers & restos (+25% loyer, +15% dining). Proximité des sièges d\'entreprises.'
                    : 'The modern tech and luxury corporate hub south of the Han river. Cost multiplier (+25% rent, +15% dining). Walking distance to major tech HQs.'
                  }
                </p>
              </div>
              <div className={styles.infoCard}>
                <h4><Building size={16} color="#16a34a" /> {store.language === 'fr' ? 'Périphérie de Séoul (Gyeonggi / Banlieues)' : 'Seoul Outskirts (Gyeonggi / Suburbs)'}</h4>
                <p>
                  {store.language === 'fr'
                    ? 'Quartiers résidentiels calmes reliés directement par le métro (Suwon, Bundang, Goyang). Économie de -10% sur les loyers avec de plus grands espaces.'
                    : 'Peaceful residential areas with direct subway access into central Seoul. Average 10% rent discount with larger living space.'
                  }
                </p>
              </div>
              <div className={styles.infoCard}>
                <h4><Building size={16} color="#0891b2" /> {store.language === 'fr' ? 'Hors de Séoul (Busan / Daegu / Incheon)' : 'Outside Seoul (Busan / Daegu / Incheon)'}</h4>
                <p>
                  {store.language === 'fr'
                    ? 'Grandes métropoles régionales et villes côtières. Économie significative de -25% sur les loyers et coût de la vie détendu.'
                    : 'Major coastal and metropolitan regional cities. Substantial 25% rent discount with relaxed seaside or mountain lifestyle.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visas & Entry Rules Modal */}
      {showVisasModal && (
        <div className={styles.infoModalOverlay} onClick={() => setShowVisasModal(false)}>
          <div className={styles.infoModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.infoModalHeader}>
              <h3>
                {store.language === 'fr' ? '📋 Guide des Visas & Assurance Santé en Corée' : '📋 Korea Visa & Health Insurance Guide'}
              </h3>
              <button 
                type="button"
                onClick={() => setShowVisasModal(false)} 
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h4><GraduationCap size={16} color="#059669" /> {store.language === 'fr' ? 'Visa Étudiant (D-2 / D-4)' : 'Student Visa (D-2 / D-4)'}</h4>
                <p>
                  {store.language === 'fr'
                    ? 'Éligible à la sécurité sociale coréenne (NHIS) subventionnée à 50% (~75 000 ₩/mois). Permet de louer facilement un One-room ou une chambre étudiante.'
                    : 'Eligible for 50% subsidized mandatory Korean National Health Insurance (~₩75,000/mo). Easy access to standard One-room studios and sharehouses.'
                  }
                </p>
              </div>
              <div className={styles.infoCard}>
                <h4><Briefcase size={16} color="#7c3aed" /> {store.language === 'fr' ? 'Visa Nomade Digital (F-1-D Workcation)' : 'Digital Nomad (F-1-D Workcation)'}</h4>
                <p>
                  {store.language === 'fr'
                    ? 'Nécessite une assurance médicale internationale conforme couvrant au minimum 100M ₩. Permet de télétravailler jusqu\'à 2 ans.'
                    : 'Requires valid international travel health insurance covering min. ₩100M. Allows remote employment up to 2 years with overseas income.'
                  }
                </p>
              </div>
              <div className={styles.infoCard}>
                <h4><Compass size={16} color="#d97706" /> {store.language === 'fr' ? 'Visa Vacances-Travail (H-1 / WHV)' : 'Working Holiday (H-1 / WHV)'}</h4>
                <p>
                  {store.language === 'fr'
                    ? 'Assurance voyage obligatoire lors de l\'entrée. Possibilité d\'adhérer au NHIS après obtention de la carte de résident (ARC).'
                    : 'Mandatory comprehensive repatriation & medical travel insurance required upon entry. Can transition to NHIS after obtaining ARC.'
                  }
                </p>
              </div>
              <div className={styles.infoCard}>
                <h4><Plane size={16} color="#059669" /> {store.language === 'fr' ? 'Touriste Long Séjour (> 1 mois)' : 'Tourist / Long Stay (> 1 month)'}</h4>
                <p>
                  {store.language === 'fr'
                    ? 'Non éligible au NHIS coréen. Assurance voyage privée indispensable. Privilégiez les goshiwons, hébergements chez un proche ou baux de courte durée.'
                    : 'Ineligible for Korean NHIS subsidies. Private expat/travel policy required. Recommended to stay in goshiwons, guest houses, or short-term rentals.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
