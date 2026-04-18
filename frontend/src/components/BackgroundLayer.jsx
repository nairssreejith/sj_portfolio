/**
 * BackgroundLayer.jsx — Scroll-driven sky gradient.
 *
 * HOW GRADIENT INTERPOLATION WORKS
 * ──────────────────────────────────
 * scrollYProgress (MotionValue from App.jsx) moves 0 → 1 as the user
 * scrolls top to bottom. Three useTransform() calls each watch that
 * single value and map it to a hex colour for one gradient stop:
 *
 *   scrollY  0.0  →  Day    (clear blue sky)
 *   scrollY  0.5  →  Sunset (warm orange / golden horizon)
 *   scrollY  1.0  →  Night  (deep navy / purple)
 *
 * Framer Motion interpolates between the colour values on every scroll
 * frame using its built-in LAB colour mixing — no sudden jumps, no
 * React re-renders, just smooth per-frame CSS updates.
 *
 * useMotionTemplate composes the three live colour MotionValues into a
 * CSS gradient string, which is applied via a motion.div style prop.
 *
 * GRADIENT STOP MAP
 * ──────────────────
 *              top          mid          bottom
 *   Day:    #87CEEB      #B8DFFF      #D4EEFD
 *   Sunset: #FF6B35      #F4A261      #FFD580
 *   Night:  #0B1F4A      #1A2F6F      #2D1B69
 *
 * LAYERING CONTRACT (unchanged)
 * ──────────────────────────────
 *   z-0  — BackgroundLayer (this component, fixed to viewport)
 *   z-10 — Content layer   (scrolls normally on top)
 *   z-50 — Navbar          (sticky, within content layer)
 */

import { useTransform, useMotionTemplate, motion } from 'framer-motion'

export default function BackgroundLayer({ scrollYProgress }) {

  // ── Top gradient stop ────────────────────────────────────────────────
  // The highest point of the sky — from open blue to fiery orange to midnight.
  const topColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#87CEEB', '#FF6B35', '#0B1F4A']
  )

  // ── Mid gradient stop ────────────────────────────────────────────────
  // The mid-sky band — transitions through lighter blues, peachy orange,
  // then settles into a deep navy as night falls.
  const midColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#B8DFFF', '#F4A261', '#1A2F6F']
  )

  // ── Bottom gradient stop (horizon) ──────────────────────────────────
  // The horizon line — very pale blue by day, golden at sunset,
  // deep purple-indigo at night.
  const bottomColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#D4EEFD', '#FFD580', '#2D1B69']
  )

  // ── Compose the live gradient string ────────────────────────────────
  // useMotionTemplate subscribes to all three MotionValues and rebuilds
  // the CSS gradient string on every frame — zero React re-renders.
  const background = useMotionTemplate`linear-gradient(to bottom, ${topColor} 0%, ${midColor} 50%, ${bottomColor} 100%)`

  return (
    <motion.div
      id="bg-layer"
      data-testid="background-layer"
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden"
      style={{ background }}
    />
  )
}
