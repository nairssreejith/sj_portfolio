/**
 * BackgroundLayer.jsx — Sky image cross-fade + sun element.
 *
 * SCROLL TIMELINE
 * ───────────────
 *   0.00        Sunrise — warm golden morning sky (hero)
 *   0.00–0.35   Bright day, sun arcing upward
 *   0.35–0.55   Day fading, sunset bleeding in
 *   0.55–0.70   Sunset deepens, sky darkening
 *   0.70–1.00   Night sky builds to full black-star darkness (contact)
 *
 * LAYER STACK (within BackgroundLayer)
 * ──────────────────────────────────────
 *   z auto  — sunrise sky image  (bottom, always visible 0→0.55)
 *   z auto  — sunset sky image   (mid, 0.25→0.70)
 *   z auto  — night sky image    (top, 0.50→1.0, very dark)
 *   z auto  — darkness booster   (pure black overlay, 0.60→1.0)
 *   z 2     — Sun element        (above all sky layers)
 */

import { useTransform, motion } from 'framer-motion'
import Sun from './Sun'

// ── Sky image URLs ───────────────────────────────────────────────────
// Sunrise: warm amber/orange sky with sun at the horizon
const SUNRISE_SKY = 'https://images.unsplash.com/photo-1630007091971-5478f698b157?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHw0fHx3YXJtJTIwZ29sZGVuJTIwc3VucmlzZSUyMHNreSUyMGJyaWdodCUyMG1vcm5pbmclMjBob3Jpem9ufGVufDB8fHx8MTc3NjUwMTQ3NHww&ixlib=rb-4.1.0&q=85'
// Sunset: golden clouds glowing at dusk
const SUNSET_SKY  = 'https://images.unsplash.com/photo-1730835438368-3b9115137cf8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxzb2Z0JTIwd2FybSUyMGdvbGRlbiUyMHN1bnNldCUyMHNreSUyMGhvcml6b258ZW58MHx8fHwxNzc2NTAwNDQzfDA&ixlib=rb-4.1.0&q=85'
// Night: very dark sky dense with stars — dramatically dark
const NIGHT_SKY   = 'https://images.unsplash.com/photo-1719820390502-e0823fcc739d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxibGFjayUyMHN0YXJyeSUyMG1pbGt5JTIwd2F5JTIwbmlnaHQlMjBza3klMjBkYXJrJTIwZHJhbWF0aWN8ZW58MHx8fHwxNzc2NTAxNDc0fDA&ixlib=rb-4.1.0&q=85'

export default function BackgroundLayer({ scrollYProgress }) {

  // ── Sunrise / day sky ────────────────────────────────────────────────
  // Starts bright (0.88), holds through early scroll, fades out by 0.55
  const sunriseOpacity = useTransform(
    scrollYProgress,
    [0,    0.28,  0.50,  1.0],
    [0.88, 0.88,  0,     0]
  )

  // ── Sunset sky ───────────────────────────────────────────────────────
  // Blends in from 0.22, peaks during skills/projects, gone by 0.72
  const sunsetOpacity = useTransform(
    scrollYProgress,
    [0,    0.22, 0.38,  0.55,  0.72, 1.0],
    [0,    0,    0.75,  0.75,  0,    0]
  )

  // ── Night sky ─────────────────────────────────────────────────────────
  // Starts appearing at 0.50, reaches full darkness at contact (0.88+)
  const nightOpacity = useTransform(
    scrollYProgress,
    [0,   0.50,  0.72,  0.88, 1.0],
    [0,   0,     0.75,  0.90, 0.92]
  )

  // ── Pure-black darkness booster ──────────────────────────────────────
  // Deepens the night beyond the photo's natural darkness, ensuring the
  // contact section feels truly black-and-stars rather than just dark-blue.
  const darkBooster = useTransform(
    scrollYProgress,
    [0,   0.60,  0.82, 1.0],
    [0,   0,     0.28, 0.42]
  )

  return (
    <div
      id="bg-layer"
      data-testid="background-layer"
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden"
    >
      {/* ── Sunrise / day sky image ─────────────────────────────────── */}
      <motion.div
        data-testid="sky-day"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${SUNRISE_SKY})`,
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

      {/* ── Darkness booster: pure black overlay fading in at night ─── */}
      <motion.div
        data-testid="sky-dark-booster"
        className="absolute inset-0"
        style={{
          backgroundColor: '#000000',
          opacity: darkBooster,
        }}
      />

      {/* ── Sun element: arcs from dawn through noon to sunset ─────── */}
      <Sun scrollYProgress={scrollYProgress} />
    </div>
  )
}
