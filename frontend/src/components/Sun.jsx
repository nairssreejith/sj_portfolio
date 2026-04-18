/**
 * Sun.jsx — Scroll-driven sun traversing horizontally across the sky.
 *
 * NEW ARC PATH (left edge → top → right edge, no horizon descent)
 * ─────────────────────────────────────────────────────────────────
 *   scroll  0.000 → off-screen left     (-12vw, 55vh)
 *   scroll  0.100 → rising left         (10vw,  30vh)
 *   scroll  0.250 → high left           (32vw,  10vh)
 *   scroll  0.400 → peak                (55vw,   4vh)   ← apex
 *   scroll  0.520 → descending right    (78vw,  18vh)
 *   scroll  0.620 → exiting right edge  (104vw, 38vh)
 *   scroll  0.680 → fully off-screen    (120vw, 55vh)
 *
 * The sun now enters from the LEFT edge (not from below), arcs over the
 * top, and EXITS through the RIGHT edge (not below the horizon).
 * The Moon mirrors this — also entering from the left — giving the
 * two celestial bodies a consistent "horizontal passage" language.
 */

import { useTransform, useMotionTemplate, motion } from 'framer-motion'

export default function Sun({ scrollYProgress }) {

  // ── X axis : off-screen left → top → off-screen right ─────────────
  const sunX = useTransform(
    scrollYProgress,
    [0,       0.10,  0.25,  0.40,  0.52,  0.62,   0.68,   1.0],
    ['-12vw', '10vw','32vw','55vw','78vw','104vw','120vw','120vw']
  )

  // ── Y axis : mid-height → apex → mid-height (symmetric arc) ───────
  const sunY = useTransform(
    scrollYProgress,
    [0,      0.10,  0.25,  0.40, 0.52,  0.62,  0.68,  1.0],
    ['55vh', '30vh','10vh', '4vh','18vh','38vh','55vh','55vh']
  )

  const sunTransform = useMotionTemplate`translate(${sunX}, ${sunY})`

  // ── Opacity : fully visible while traversing, fades as it exits right
  const sunOpacity = useTransform(
    scrollYProgress,
    [0,   0.58, 0.66, 1.0],
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
        background:
          'radial-gradient(circle at 35% 35%, #FFFFF0 0%, #FFFACD 30%, #FFE566 60%, #FFB742 85%, #FF9500 100%)',
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
