/**
 * BackgroundLayer.jsx — Sky cross-fade + celestial bodies + star field.
 *
 * Re-timed for the longer page that now includes GamerProfile.
 * The sky finishes its day → night transition by ~scroll 0.70 so the
 * entire GamerProfile (0.64 → 1.0) is rendered against a calm dark
 * sky with stars visible.
 *
 * PHASE TIMELINE
 * ───────────────
 *   0.00        Dawn — clean cyan→peach CSS gradient
 *   0.00–0.22   Bright day, sun arcing upward
 *   0.22–0.44   Sunset cross-fades in and back out
 *   0.44–0.70   Night sky builds to full darkness
 *   0.52–0.75   Moon traverses left → right edge
 *   0.56–0.70   Star field fades in
 *   0.70–1.00   Static cyberpunk night (gamer phase)
 */

import { useTransform, motion } from 'framer-motion'
import Sun from './Sun'
import Moon from './Moon'
import StarField from './StarField'

const SUNSET_SKY =
  'https://images.unsplash.com/photo-1730835438368-3b9115137cf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxzb2Z0JTIwd2FybSUyMGdvbGRlbiUyMHN1bnNldCUyMHNreSUyMGhvcml6b258ZW58MHx8fHwxNzc2NTAwNDQzfDA&ixlib=rb-4.1.0&q=85'

const SUNRISE_GRADIENT =
  'linear-gradient(to bottom, ' +
  '#BFE4F2 0%, '   +
  '#D9ECF3 22%, '  +
  '#F5E3C8 55%, '  +
  '#FBD4A6 78%, '  +
  '#FDC78A 100%)'

const NIGHT_GRADIENT =
  'linear-gradient(to bottom, ' +
  '#05070F 0%, '   +
  '#0A0E1E 38%, '  +
  '#0E1530 68%, '  +
  '#121A3A 88%, '  +
  '#0B1028 100%)'

export default function BackgroundLayer({ scrollYProgress }) {

  // ── Sunrise / day sky ─────────────────────────────────────────────
  const sunriseOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.38, 1.0],
    [1, 1,    0,    0]
  )

  // ── Sunset photo ──────────────────────────────────────────────────
  const sunsetOpacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.30, 0.42, 0.54, 1.0],
    [0, 0,    0.78, 0.78, 0,    0]
  )

  // ── Night sky ─────────────────────────────────────────────────────
  const nightOpacity = useTransform(
    scrollYProgress,
    [0, 0.40, 0.56, 0.68, 1.0],
    [0, 0,    0.92, 1.0,  1.0]
  )

  // ── Darkness booster ──────────────────────────────────────────────
  const darkBooster = useTransform(
    scrollYProgress,
    [0, 0.48, 0.68, 1.0],
    [0, 0,    0.32, 0.44]
  )

  return (
    <div
      id="bg-layer"
      data-testid="background-layer"
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden"
    >
      <motion.div
        data-testid="sky-day"
        className="absolute inset-0"
        style={{ background: SUNRISE_GRADIENT, opacity: sunriseOpacity }}
      />
      <motion.div
        data-testid="sky-sunset"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${SUNSET_SKY})`, opacity: sunsetOpacity }}
      />
      <motion.div
        data-testid="sky-night"
        className="absolute inset-0"
        style={{ background: NIGHT_GRADIENT, opacity: nightOpacity }}
      />
      <motion.div
        data-testid="sky-dark-booster"
        className="absolute inset-0"
        style={{ backgroundColor: '#000000', opacity: darkBooster }}
      />
      <StarField scrollYProgress={scrollYProgress} />
      <Sun  scrollYProgress={scrollYProgress} />
      <Moon scrollYProgress={scrollYProgress} />
    </div>
  )
}
