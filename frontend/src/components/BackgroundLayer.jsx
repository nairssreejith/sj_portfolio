/**
 * BackgroundLayer.jsx — Sky image cross-fade + sun element.
 *
 * THREE-LAYER IMAGE SYSTEM
 * ──────────────────────────
 * Three full-viewport sky photos are stacked (absolute, inset-0).
 * Each has a scroll-driven opacity that fades in/out smoothly:
 *
 *   Layer        Peak scroll   Image
 *   ─────────    ───────────   ───────────────────────────────
 *   Day          0.00 – 0.35   Clear blue sky (subtle, #1)
 *   Sunset       0.40 – 0.60   Golden clouds at dusk (#2)
 *   Night        0.75 – 1.00   Starry deep-blue sky (#3)
 *
 * Overlap zones create imperceptible dissolves between phases.
 * Max opacity is capped at 0.78 so backgrounds stay very subtle
 * and never compete with content readability.
 *
 * SUN ELEMENT
 * ────────────
 * The Sun component arcs from left (dawn) through the top-center (noon)
 * to the right (sunset), then fades off-screen during the night phase.
 * It receives scrollYProgress as a prop (same MotionValue, zero overhead).
 *
 * LAYERING CONTRACT (unchanged)
 * ──────────────────────────────
 *   z-0  — BackgroundLayer outer container (fixed to viewport)
 *   z-1  — sky image layers        (within BackgroundLayer)
 *   z-2  — Sun element             (within BackgroundLayer, above images)
 *   z-10 — Content layer           (scrolls normally on top)
 *   z-50 — Navbar                  (sticky, within content layer)
 */

import { useTransform, motion } from 'framer-motion'
import Sun from './Sun'

// ── Sky image URLs ───────────────────────────────────────────────────
const DAY_SKY    = 'https://images.unsplash.com/photo-1664702717663-5479b5d383a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxjbGVhciUyMGJsdWUlMjBza3klMjBtaW5pbWFsJTIwZGF5dGltZXxlbnwwfHx8fDE3NzY1MDA0NDN8MA&ixlib=rb-4.1.0&q=85'
const SUNSET_SKY = 'https://images.unsplash.com/photo-1730835438368-3b9115137cf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxzb2Z0JTIwd2FybSUyMGdvbGRlbiUyMHN1bnNldCUyMHNreSUyMGhvcml6b258ZW58MHx8fHwxNzc2NTAwNDQzfDA&ixlib=rb-4.1.0&q=85'
const NIGHT_SKY  = 'https://images.unsplash.com/photo-1772511988877-f29dc05295cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwzfHxkYXJrJTIwbmlnaHQlMjBza3klMjBzdGFycyUyMGRlZXAlMjBibHVlfGVufDB8fHx8MTc3NjUwMDQ0M3ww&ixlib=rb-4.1.0&q=85'

export default function BackgroundLayer({ scrollYProgress }) {

  // ── Day sky ── visible at scroll 0, fully faded by 0.55, stays 0 ────
  // Full 0→1 range prevents framer-motion from extrapolating past 0.55
  const dayOpacity = useTransform(
    scrollYProgress,
    [0,    0.30,  0.55,  1.0],
    [0.75, 0.75,  0,     0]
  )

  // ── Sunset sky ── peaks at 0.42–0.55, fully gone by 0.78, stays 0 ──
  const sunsetOpacity = useTransform(
    scrollYProgress,
    [0.20, 0.42,  0.55,  0.78, 1.0],
    [0,    0.70,  0.70,  0,    0]
  )

  // ── Night sky ── builds from 0.55, fully visible at 1.0 ─────────────
  const nightOpacity = useTransform(
    scrollYProgress,
    [0,   0.55,  0.78,  1.0],
    [0,   0,     0.65,  0.80]
  )

  return (
    <div
      id="bg-layer"
      data-testid="background-layer"
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden"
    >
      {/* ── Day sky image ─────────────────────────────────────────────── */}
      <motion.div
        data-testid="sky-day"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${DAY_SKY})`,
          opacity: dayOpacity,
        }}
      />

      {/* ── Sunset sky image ──────────────────────────────────────────── */}
      <motion.div
        data-testid="sky-sunset"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${SUNSET_SKY})`,
          opacity: sunsetOpacity,
        }}
      />

      {/* ── Night sky image ───────────────────────────────────────────── */}
      <motion.div
        data-testid="sky-night"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${NIGHT_SKY})`,
          opacity: nightOpacity,
        }}
      />

      {/* ── Sun element : arcs across all sky phases ──────────────────── */}
      <Sun scrollYProgress={scrollYProgress} />
    </div>
  )
}
