/**
 * Sun.jsx — Scroll-driven sun element that arcs across the sky.
 *
 * ARC PATH (7 keyframes → smooth parabola approximation)
 * ───────────────────────────────────────────────────────
 *
 *   scroll  0.000 → dawn   : left side,  low   (8vw,  65vh)
 *   scroll  0.125 → rising : left-mid,   mid   (22vw, 28vh)
 *   scroll  0.250 → noon   : center-left, high  (42vw,  7vh)
 *   scroll  0.375 → noon   : center-right, high (60vw,  7vh) ← plateau
 *   scroll  0.480 → dusk   : right-mid,  mid   (80vw, 28vh)
 *   scroll  0.530 → sunset : right side, low   (88vw, 65vh)
 *   scroll  0.600 → night  : off-screen         (110vw,110vh)
 *
 * The "noon plateau" (same Y at 0.25 and 0.375) makes the sun slow down
 * naturally at its peak, mirroring how the sun appears to hang at midday.
 *
 * MOTION VALUES
 * ──────────────
 *   sunX  — horizontal position via useTransform → vw unit string
 *   sunY  — vertical   position via useTransform → vh unit string
 *   sunTransform — composed via useMotionTemplate into translate(x, y)
 *   sunOpacity   — fades to 0 as sun sets, hidden during night
 *
 * CONSTRAINTS
 * ─────────────
 *   Only transform: translate() is used for movement — no left/top changes.
 *   The element base position is fixed at (0, 0) of the BackgroundLayer.
 */

import { useTransform, useMotionTemplate, motion } from 'framer-motion'

export default function Sun({ scrollYProgress }) {

  // ── X axis : left horizon → high arc → right horizon → off-screen ──
  const sunX = useTransform(
    scrollYProgress,
    [0,     0.125,  0.25,   0.375,  0.48,   0.53,   0.60],
    ['8vw', '22vw', '42vw', '60vw', '80vw', '88vw', '110vw']
  )

  // ── Y axis : low → high (noon plateau) → low → off-screen ──────────
  const sunY = useTransform(
    scrollYProgress,
    [0,      0.125,  0.25,  0.375,  0.48,   0.53,   0.60],
    ['65vh', '28vh', '7vh', '7vh',  '28vh', '65vh', '110vh']
  )

  // ── Compose translate string — only transform used, no positional CSS changes
  const sunTransform = useMotionTemplate`translate(${sunX}, ${sunY})`

  // ── Opacity : fully visible during day, fades at sunset, stays 0 at night
  // Full 0→1 range prevents framer-motion from extrapolating past 0.60
  const sunOpacity = useTransform(
    scrollYProgress,
    [0,   0.50, 0.60, 1.0],
    [1,   1,    0,    0]
  )

  return (
    <motion.div
      aria-hidden="true"
      data-testid="sun-element"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        // Bright core fading to warm orange edge — natural sun appearance
        background: 'radial-gradient(circle at 35% 35%, #FFFFF0 0%, #FFFACD 30%, #FFE566 60%, #FFB742 85%, #FF9500 100%)',
        // Multi-layer glow: tight inner ring, mid diffuse, outer atmospheric haze
        boxShadow: [
          '0 0 0 6px rgba(255, 220, 70, 0.18)',
          '0 0 28px 14px rgba(255, 200, 50, 0.46)',
          '0 0 70px 30px rgba(255, 155, 0, 0.28)',
          '0 0 140px 55px rgba(255, 100, 0, 0.12)',
        ].join(', '),
        transform: sunTransform,
        opacity: sunOpacity,
        pointerEvents: 'none',
        zIndex: 2,
        willChange: 'transform, opacity',
      }}
    />
  )
}
