/**
 * Moon.jsx — Scroll-driven moon that mirrors the Sun's horizontal arc.
 *
 * ARC + OPACITY TIMELINE
 * ───────────────────────
 *   scroll  0.00–0.68 → invisible (day / sunset)
 *   scroll  0.68        → emerges from LEFT edge (-12vw, 55vh)
 *   scroll  0.75        → rising left        (12vw, 32vh)
 *   scroll  0.82        → high left          (32vw, 14vh)
 *   scroll  0.90        → moon apex          (55vw,  8vh)
 *   scroll  0.96        → descending right   (78vw, 20vh)
 *   scroll  1.00        → exiting right edge (100vw, 38vh)
 *
 * The moon enters from the LEFT like a new day begins, traverses
 * symmetrically to the Sun, and starts easing toward the right edge.
 * Only fade-in is opacity-driven during 0.68 → 0.78 to keep its
 * appearance gentle and atmospheric.
 */

import { useTransform, useMotionTemplate, motion } from 'framer-motion'

export default function Moon({ scrollYProgress }) {

  // ── X axis : off-screen left → top → right edge ──────────────────
  const moonX = useTransform(
    scrollYProgress,
    [0,       0.68,   0.75,  0.82,  0.90,  0.96,  1.0],
    ['-12vw', '-12vw','12vw','32vw','55vw','78vw','100vw']
  )

  // ── Y axis : mid-height → apex → mid-height ──────────────────────
  const moonY = useTransform(
    scrollYProgress,
    [0,      0.68,   0.75,  0.82,  0.90, 0.96,  1.0],
    ['55vh', '55vh', '32vh','14vh', '8vh','20vh','38vh']
  )

  const moonTransform = useMotionTemplate`translate(${moonX}, ${moonY})`

  // ── Opacity : invisible during day, gentle fade-in during night ───
  const moonOpacity = useTransform(
    scrollYProgress,
    [0,   0.68, 0.78, 1.0],
    [0,   0,    1,    1]
  )

  return (
    <motion.div
      aria-hidden="true"
      data-testid="moon-element"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '66px',
        height: '66px',
        borderRadius: '50%',
        // Off-centre gradient — sunlight reflected from the moon's surface
        background:
          'radial-gradient(circle at 38% 36%, #FFFEF4 0%, #F5F0DC 28%, #DDD4B8 58%, #B8B09A 80%, #949080 100%)',
        // Layered atmospheric glow — cool silver-blue
        boxShadow: [
          '0 0 0 2px rgba(230, 225, 200, 0.18)',
          '0 0 18px 8px  rgba(200, 195, 170, 0.38)',
          '0 0 50px 22px rgba(180, 185, 210, 0.18)',
          '0 0 100px 45px rgba(160, 168, 200, 0.08)',
        ].join(', '),
        transform: moonTransform,
        opacity: moonOpacity,
        pointerEvents: 'none',
        zIndex: 2,
        willChange: 'transform, opacity',
      }}
    />
  )
}
