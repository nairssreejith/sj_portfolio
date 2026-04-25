/**
 * App.js — Portfolio root with background animation layer + gamer alter-ego.
 *
 * LAYER ARCHITECTURE
 * ───────────────────
 *   #page-root
 *   ├── BackgroundLayer  (fixed, z-0)    sky + sun + moon + stars
 *   └── content-layer    (relative, z-10)
 *        ├── Navbar
 *        ├── Hero        day phase
 *        ├── About       day phase
 *        ├── Skills      day → sunset
 *        ├── Projects    sunset
 *        ├── Contact     night onset
 *        ├── GamerProfile NIGHT / cyberpunk alter ego
 *        └── Footer
 *
 * SCROLL PHASES (adjusted for the longer page with GamerProfile)
 * ────────────────────────────────────────────────────────────────
 *   0.00 – 0.22  ☀  Day          (Hero + About)
 *   0.22 – 0.44  🌇 Sunset        (Skills + Projects)
 *   0.44 – 0.64  🌃 Night onset   (Contact)
 *   0.64 – 1.00  🕹  Cyberpunk    (GamerProfile — fully dark, neon)
 *
 *   · data-theme flips to 'dark' at 0.46 (around start of projects)
 *   · Sun exits right edge by ~0.46
 *   · Moon enters from left at ~0.52, exits right by ~0.75
 *   · Stars fade in 0.56 → 0.70 and stay visible through gamer section
 */

import { useRef, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import GamerProfile from './components/GamerProfile'
import Footer from './components/Footer'
import BackgroundLayer from './components/BackgroundLayer'
import './index.css'

// Scroll threshold at which the page flips to dark theme. Tuned to
// coincide with the sun starting its exit and night sky building.
const DARK_THRESHOLD = 0.46

export default function App() {
  const { scrollYProgress } = useScroll()

  const isDarkRef = useRef(false)
  const transitionTimeoutRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const shouldBeDark = latest >= DARK_THRESHOLD
    if (shouldBeDark !== isDarkRef.current) {
      isDarkRef.current = shouldBeDark
      document.documentElement.setAttribute(
        'data-theme',
        shouldBeDark ? 'dark' : 'light'
      )
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = setTimeout(() => {
        transitionTimeoutRef.current = null
      }, 800)
    }
  })

  return (
    <div id="page-root" data-testid="page-root" className="relative">
      <BackgroundLayer scrollYProgress={scrollYProgress} />

      <div id="content-layer" data-testid="content-layer" className="relative z-10">
        <Navbar />
        <main>
          <Hero scrollYProgress={scrollYProgress} />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <GamerProfile />
        </main>
        <Footer />
      </div>
    </div>
  )
}
