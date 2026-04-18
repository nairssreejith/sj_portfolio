/**
 * App.jsx — Portfolio root with background animation layer structure.
 *
 * LAYER ARCHITECTURE
 * ───────────────────
 * The page is composed of two stacked layers inside a shared root:
 *
 *   ┌─────────────────────────────────────────────┐
 *   │  #page-root  (position: relative)           │
 *   │                                             │
 *   │  ┌─────────────────────────────────────┐   │
 *   │  │  BackgroundLayer                    │   │
 *   │  │  position: fixed  |  z-index: 0     │   │
 *   │  │  inset: 0  (covers full viewport)   │   │
 *   │  │                                     │   │
 *   │  │  [sky gradient slots — empty now]   │   │
 *   │  └─────────────────────────────────────┘   │
 *   │                                             │
 *   │  ┌─────────────────────────────────────┐   │
 *   │  │  Content layer                      │   │
 *   │  │  position: relative  |  z-index: 10 │   │
 *   │  │  Scrolls normally on top of bg      │   │
 *   │  │                                     │   │
 *   │  │  Navbar  (sticky top-0  z-50)       │   │
 *   │  │  Hero → About → Skills →            │   │
 *   │  │  Projects → Contact → Footer        │   │
 *   │  └─────────────────────────────────────┘   │
 *   └─────────────────────────────────────────────┘
 *
 * SCROLL PROGRESS TRACKING
 * ─────────────────────────
 * useScroll() from Framer Motion tracks the window scroll position as a
 * MotionValue (0.0 at top → 1.0 at bottom). It updates every frame
 * without triggering re-renders, keeping animation hooks smooth.
 *
 * The scrollYProgress value is logged to the console for development
 * verification and will be passed to BackgroundLayer in a future phase
 * to drive the day-to-night sky gradient transition.
 */

import { useScroll, useMotionValueEvent } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundLayer from './components/BackgroundLayer'

export default function App() {
  // Tracks scroll progress across the entire page (0 = top, 1 = bottom).
  // MotionValue — no re-renders on scroll, pure frame-level updates.
  const { scrollYProgress } = useScroll()

  // Log scroll progress for dev verification.
  // In the animation phase, this value will be passed to BackgroundLayer
  // to drive the sky gradient transition.
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log(`Scroll Progress: ${Math.round(latest * 100)}%`)
  })

  return (
    /*
     * Page root — establishes a new stacking context so all z-index
     * values on BackgroundLayer (z-0) and the content layer (z-10)
     * are predictable and self-contained.
     */
    <div id="page-root" data-testid="page-root" className="relative">

      {/* ── Layer 1: Background ───────────────────────────────────── */}
      {/*
       * Fixed to the viewport. Stays in place while the content above
       * scrolls. Currently empty — sky gradient layers (dawn, day,
       * dusk, night) will be added here in the animation phase.
       */}
      <BackgroundLayer />

      {/* ── Layer 2: Content ──────────────────────────────────────── */}
      {/*
       * position: relative + z-10 ensures this layer renders on top of
       * BackgroundLayer. It is NOT a scroll container itself — the page
       * document handles scrolling, so the Navbar's sticky positioning
       * continues to work correctly relative to the viewport.
       */}
      <div id="content-layer" data-testid="content-layer" className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>

    </div>
  )
}
