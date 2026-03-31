import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'K-Budget | Korea Financial Entry Planner',
  description: 'Plan your budget for moving to Korea. K-Budget helps you calculate upfront costs, monthly expenses, and build a sustainable financial runway.',
  keywords: ['Korea budget', 'study in Korea', 'Korea move planner', 'cost of living Korea', 'Korean student budget'],
  authors: [{ name: 'K-Budget' }],
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout-wrapper">
          <nav className="header-nav">
             <div className="logo">K-Budget</div>
          </nav>
          <main className="main-content">
            {children}
          </main>
          <footer className="footer-nav">
             &copy; {new Date().getFullYear()} K-Budget - Your Korea Entry Partner
          </footer>
        </div>
      </body>
    </html>
  )
}
