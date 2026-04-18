/**
 * BackgroundLayer.jsx — Sky cross-fade + celestial bodies.
 *
 * SCROLL TIMELINE
 * ───────────────
 *   0.00        Sunrise — clean bright cyan→peach CSS gradient (no baked sun)
 *   0.00–0.35   Bright day, sun arcing upward
 *   0.35–0.55   Day fading, sunset bleeding in
 *   0.55–0.70   Sunset deepens, sky darkening, sun exits
 *   0.70–1.00   Night sky builds; moon fades in
 *
 * LAYER STACK (within BackgroundLayer)
 * ──────────────────────────────────────
 *   z auto  — sunrise sky gradient (bottom, visible 0 → 0.55)
 *   z auto  — sunset sky image    (mid, 0.22 → 0.72)
 *   z auto  — night sky image     (top, 0.50 → 1.0)
 *   z auto  — darkness booster    (pure black overlay, 0.60 → 1.0)
 *   z 2     — Sun (0 → 0.60)      /  Moon (0.68 → 1.0)
 */

import { useTransform, motion } from 'framer-motion'
import Sun from './Sun'
import Moon from './Moon'

// ── Sky image URLs ───────────────────────────────────────────────────
// Sunrise is a PURE CSS gradient — guarantees no baked-in sun so our
// animated <Sun /> element is the only sun on screen at page load.
const SUNSET_SKY  = 'https://images.unsplash.com/photo-1730835438368-3b9115137cf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxzb2Z0JTIwd2FybSUyMGdvbGRlbiUyMHN1bnNldCUyMHNreSUyMGhvcml6b258ZW58MHx8fHwxNzc2NTAwNDQzfDA&ixlib=rb-4.1.0&q=85'
const NIGHT_SKY   = 'https://images.unsplash.com/photo-1719820390502-e0823fcc739d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxibGFjayUyMHN0YXJyeSUyMG1pbGt5JTIwd2F5JTIwbmlnaHQlMjBza3klMjBkYXJrJTIwZHJhbWF0aWN8ZW58MHx8fHwxNzc2NTAxNDc0fDA&ixlib=rb-4.1.0&q=85'

// Clean pastel dawn gradient — soft cyan above, warm peach at horizon.
// No sun, no clouds, no distraction — lets the animated Sun own the sky.
const SUNRISE_GRADIENT =
  'linear-gradient(to bottom, ' +
  '#BFE4F2 0%, '   +  // high cool sky
  '#D9ECF3 22%, '  +
  '#F5E3C8 55%, '  +  // soft warm band
  '#FBD4A6 78%, '  +  // morning glow
  '#FDC78A 100%)'     // peach horizon

export default function BackgroundLayer({ scrollYProgress }) {

  // ── Sunrise / day sky (CSS gradient) ─────────────────────────────────
  const sunriseOpacity = useTransform(
    scrollYProgress,
    [0,    0.28,  0.50,  1.0],
    [1,    1,     0,     0]
  )

  // ── Sunset sky ───────────────────────────────────────────────────────
  const sunsetOpacity = useTransform(
    scrollYProgress,
    [0,    0.22, 0.38,  0.55,  0.72, 1.0],
    [0,    0,    0.78,  0.78,  0,    0]
  )

  // ── Night sky ─────────────────────────────────────────────────────────
  const nightOpacity = useTransform(
    scrollYProgress,
    [0,   0.50,  0.72,  0.88, 1.0],
    [0,   0,     0.78,  0.92, 0.94]
  )

  // ── Pure-black darkness booster ──────────────────────────────────────
  const darkBooster = useTransform(
    scrollYProgress,
    [0,   0.60,  0.82, 1.0],
    [0,   0,     0.32, 0.46]
  )

  return (
    <div
      id="bg-layer"
      data-testid="background-layer"
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden"
    >
      {/* ── Sunrise / day sky — clean CSS gradient (no sun) ─────────── */}
      <motion.div
        data-testid="sky-day"
        className="absolute inset-0"
        style={{
          background: SUNRISE_GRADIENT,
          opacity: sunriseOpacity,
        }}
      />

      {/* ── Sunset sky image ────────────────────────────────────────── */}
      <motion.div
        data-testid="sky-sunset"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${SUNSET_SKY})`,
          opacity: sunsetOpacity,
        }}
      />

      {/* ── Night sky image ─────────────────────────────────────────── */}
      <motion.div
        data-testid="sky-night"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${NIGHT_SKY})`,
          opacity: nightOpacity,
        }}
      />

      {/* ── Darkness booster ────────────────────────────────────────── */}
      <motion.div
        data-testid="sky-dark-booster"
        className="absolute inset-0"
        style={{
          backgroundColor: '#000000',
          opacity: darkBooster,
        }}
      />

      {/* ── Celestial bodies ────────────────────────────────────────── */}
      <Sun  scrollYProgress={scrollYProgress} />
      <Moon scrollYProgress={scrollYProgress} />
    </div>
  )
}
