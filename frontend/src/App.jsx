/**
 * App.jsx — Portfolio root with Framer Motion scroll progress tracking.
 *
 * HOW SCROLL PROGRESS WORKS
 * ─────────────────────────
 * useScroll() (Framer Motion) attaches a passive scroll listener to the
 * browser window. It computes scrollYProgress as:
 *
 *   scrollYProgress = scrollTop / (scrollHeight - viewportHeight)
 *
 * The result is a MotionValue<number> that moves from 0.0 (page top) to
 * 1.0 (page bottom). Because it is a MotionValue — not React state — it
 * updates on every scroll frame WITHOUT triggering a re-render, keeping
 * the UI completely smooth.
 *
 * useMotionValueEvent(scrollYProgress, 'change', callback) subscribes to
 * those frame-level updates in a React-lifecycle-safe way (the subscription
 * is automatically cleaned up on unmount). We round the raw 0–1 value to a
 * percentage and log it to the console so you can verify the tracking live.
 */

import { useScroll, useMotionValueEvent } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // useScroll() with no options tracks the *window* scroll by default,
  // covering the entire page height — from the first pixel to the last.
  const { scrollYProgress } = useScroll()

  // useMotionValueEvent is the idiomatic Framer Motion way to subscribe to a
  // MotionValue. It fires on every scroll frame, never causes a re-render,
  // and cleans up automatically when the component unmounts.
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log(`Scroll Progress: ${Math.round(latest * 100)}%`)
  })

  return (
    <div className="bg-bg-primary min-h-screen">
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
  )
}
