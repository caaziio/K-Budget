import React from 'react'

interface KCalcLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export default function KCalcLogo({ size = 36, showText = true, className }: KCalcLogoProps) {
  // Height proportional to width
  const height = size
  const iconWidth = size

  return (
    <div 
      className={className} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: size > 32 ? '0.75rem' : '0.5rem',
        textDecoration: 'none',
        userSelect: 'none'
      }}
    >
      {/* SVG Icon embodying the exact dual-color K + calculator design */}
      <svg 
        width={iconWidth} 
        height={height} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="kcalcNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08223e" />
            <stop offset="100%" stopColor="#0a2f52" />
          </linearGradient>
          <linearGradient id="kcalcGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c888" />
            <stop offset="50%" stopColor="#05b274" />
            <stop offset="100%" stopColor="#04945e" />
          </linearGradient>
          <filter id="calcShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#08223e" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* --- Upper Green Arm of 'K' --- */}
        <path 
          d="M 54 48 L 86 14 C 88 12 91 12 94 12 L 109 12 C 113 12 115 17 112 20 L 78 58 Z" 
          fill="url(#kcalcGreenGrad)" 
        />

        {/* --- Lower Navy Leg of 'K' --- */}
        <path 
          d="M 64 54 L 107 101 C 109 104 107 108 103 108 L 87 108 C 84 108 82 107 80 105 L 48 68 Z" 
          fill="url(#kcalcNavyGrad)" 
        />

        {/* --- Main Vertical Navy Stem of 'K' (Top part) --- */}
        <rect 
          x="12" 
          y="12" 
          width="20" 
          height="96" 
          rx="5" 
          fill="url(#kcalcNavyGrad)" 
        />

        {/* Horizontal connector bar of K */}
        <path 
          d="M 30 46 L 62 46 C 65 46 68 49 68 52 C 68 55 65 58 62 58 L 30 58 Z" 
          fill="url(#kcalcNavyGrad)" 
        />

        {/* --- Calculator Overlay Icon (Sharp white card with rounded borders) --- */}
        <g filter="url(#calcShadow)">
          {/* Card Body */}
          <rect 
            x="20" 
            y="32" 
            width="46" 
            height="62" 
            rx="10" 
            fill="#ffffff" 
            stroke="#08223e" 
            strokeWidth="3.5" 
          />

          {/* Calculator Screen */}
          <rect 
            x="27" 
            y="40" 
            width="32" 
            height="11" 
            rx="3.5" 
            fill="url(#kcalcNavyGrad)" 
          />

          {/* Keypad Grid (Rows of buttons) */}
          {/* Row 1 */}
          <rect x="27" y="56" width="8" height="6.5" rx="1.5" fill="#08223e" />
          <rect x="39" y="56" width="8" height="6.5" rx="1.5" fill="#08223e" />
          <rect x="51" y="56" width="8" height="6.5" rx="1.5" fill="#08223e" />

          {/* Row 2 */}
          <rect x="27" y="66" width="8" height="6.5" rx="1.5" fill="#08223e" />
          <rect x="39" y="66" width="8" height="6.5" rx="1.5" fill="#08223e" />
          {/* Tall Green Equals/Enter Button spanning row 2 & 3 */}
          <rect x="51" y="66" width="8" height="17" rx="2" fill="url(#kcalcGreenGrad)" />

          {/* Row 3 */}
          <rect x="27" y="76.5" width="8" height="6.5" rx="1.5" fill="#08223e" />
          <rect x="39" y="76.5" width="8" height="6.5" rx="1.5" fill="#08223e" />
        </g>
      </svg>

      {/* Typography: KCALC */}
      {showText && (
        <div style={{ display: 'flex', alignItems: 'baseline', letterSpacing: '-0.02em', lineHeight: 1 }}>
          <span 
            style={{ 
              fontSize: size > 32 ? '1.35rem' : '1.15rem', 
              fontWeight: 900, 
              color: '#08223e',
              fontFamily: 'var(--font-outfit, sans-serif)',
              letterSpacing: '0.02em'
            }}
          >
            K
          </span>
          <span 
            style={{ 
              fontSize: size > 32 ? '1.35rem' : '1.15rem', 
              fontWeight: 900, 
              color: '#059669',
              fontFamily: 'var(--font-outfit, sans-serif)',
              letterSpacing: '0.04em'
            }}
          >
            CALC
          </span>
        </div>
      )}
    </div>
  )
}
