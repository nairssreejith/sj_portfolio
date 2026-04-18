/**
 * BackgroundLayer.jsx — Sky cross-fade + celestial bodies + star field.
 *
 * SCROLL TIMELINE
 * ───────────────
 *   0.00        Sunrise — clean cyan→peach CSS gradient (no baked sun)
 *   0.00–0.60   Sun traverses left-edge → top → right-edge
 *   0.22–0.72   Sunset photo cross-fades in and out
 *   0.55–1.00   Deep-navy night CSS gradient builds (no baked moon)
 *   0.60–1.00   Darkness booster fades to near-black
 *   0.68–1.00   Moon traverses left-edge → top → right-edge (mirror of sun)
 *   0.70–0.88   Star field fades in
 *
 * LAYER STACK (z-order, bottom → top)
 * ─────────────────────────────────────
 *   sky-day          (CSS gradient, 0 → 0.55)
 *   sky-sunset       (Unsplash photo, 0.22 → 0.72)
 *   sky-night        (CSS gradient — deep navy, 0.55 → 1.0)
 *   sky-dark-booster (pure black overlay, 0.60 → 1.0)
 *   star-field       (z 1,  0.70 → 1.0)
 *   Sun + Moon       (z 2, celestial bodies)
 */

import { useTransform, motion } from 'framer-motion'
import Sun from './Sun'
import Moon from './Moon'
import StarField from './StarField'

// ── Sunset photo — only remaining real image in the sky stack ───────
const SUNSET_SKY =
  'https://images.unsplash.com/photo-1730835438368-3b9115137cf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxzb2Z0JTIwd2FybSUyMGdvbGRlbiUyMHN1bnNldCUyMHNreSUyMGhvcml6b258ZW58MHx8fHwxNzc2NTAwNDQzfDA&ixlib=rb-4.1.0&q=85'

// Clean pastel dawn gradient (no sun)
const SUNRISE_GRADIENT =
  'linear-gradient(to bottom, ' +
  '#BFE4F2 0%, '   +
  '#D9ECF3 22%, '  +
  '#F5E3C8 55%, '  +
  '#FBD4A6 78%, '  +
  '#FDC78A 100%)'

// Deep-navy night gradient — plain sky, no stars, no moon baked in.
// Stars and Moon are now authored components on top.
const NIGHT_GRADIENT =
  'linear-gradient(to bottom, ' +
  '#05070F 0%, '   +  // near-black apex
  '#0A0E1E 38%, '  +
  '#0E1530 68%, '  +  // deep indigo mid
  '#121A3A 88%, '  +
  '#0B1028 100%)'     // cool horizon

export default function BackgroundLayer({ scrollYProgress }) {

  // ── Sunrise / day sky ─────────────────────────────────────────────
  const sunriseOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.50, 1.0],
    [1, 1,    0,    0]
  )

  // ── Sunset photo ──────────────────────────────────────────────────
  const sunsetOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.38, 0.55, 0.72, 1.0],
    [0, 0,    0.78, 0.78, 0,    0]
  )

  // ── Night sky (CSS gradient) ──────────────────────────────────────
  const nightOpacity = useTransform(
    scrollYProgress,
    [0, 0.50, 0.72, 0.88, 1.0],
    [0, 0,    0.92, 1.0,  1.0]
  )

  // ── Pure-black darkness booster ───────────────────────────────────
  const darkBooster = useTransform(
    scrollYProgress,
    [0, 0.60, 0.82, 1.0],
    [0, 0,    0.28, 0.40]
  )

  return (
    <div
      id="bg-layer"
      data-testid="background-layer"
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden"
    >
      {/* ── Sunrise / day sky (CSS gradient) ─────────────────────── */}
      <motion.div
        data-testid="sky-day"
        className="absolute inset-0"
        style={{
          background: SUNRISE_GRADIENT,
          opacity: sunriseOpacity,
        }}
      />

      {/* ── Sunset photo ─────────────────────────────────────────── */}
      <motion.div
        data-testid="sky-sunset"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${SUNSET_SKY})`,
          opacity: sunsetOpacity,
        }}
      />

      {/* ── Night sky (CSS gradient — no baked moon / stars) ─────── */}
      <motion.div
        data-testid="sky-night"
        className="absolute inset-0"
        style={{
          background: NIGHT_GRADIENT,
          opacity: nightOpacity,
        }}
      />

      {/* ── Darkness booster ─────────────────────────────────────── */}
      <motion.div
        data-testid="sky-dark-booster"
        className="absolute inset-0"
        style={{
          backgroundColor: '#000000',
          opacity: darkBooster,
        }}
      />

      {/* ── Star field (fades in during night phase) ─────────────── */}
      <StarField scrollYProgress={scrollYProgress} />

      {/* ── Celestial bodies ─────────────────────────────────────── */}
      <Sun  scrollYProgress={scrollYProgress} />
      <Moon scrollYProgress={scrollYProgress} />
    </div>
  )
}
