/**
 * Moon.jsx — Scroll-driven moon that fades in during the night phase.
 *
 * OPACITY TIMELINE
 * ──────────────────
 *   scroll < 0.68  → invisible (day / sunset — sun still up)
 *   scroll 0.68–0.82 → graceful fade-in  (moonrise)
 *   scroll 0.82–1.0  → fully visible     (deep night)
 *
 * POSITION
 * ─────────
 * Fixed at (62vw, 11vh) — upper-right quadrant of the sky, the
 * natural position of a moon that has risen while you were scrolling
 * through the evening sections.
 *
 * CONSTRAINTS
 * ─────────────
 * Only opacity transitions are used for show/hide — no transform
 * animation. The moon appears to materialize out of the darkening sky.
 *
 * APPEARANCE
 * ───────────
 * Full moon rendered in pure CSS — off-centre radial gradient gives
 * a subtle depth shading (lighter top-left, darker bottom-right).
 * Four-layer box-shadow creates the atmospheric halo visible on clear
 * nights: a tight inner glow, a mid diffuse ring, and two outer
 * atmospheric hazes in cool silver-blue.
 */

import { useTransform, motion } from 'framer-motion'

export default function Moon({ scrollYProgress }) {

  // Fade in between 68% – 82% scroll, fully visible through 100%
  const moonOpacity = useTransform(
    scrollYProgress,
    [0,   0.68, 0.82, 1.0],
    [0,   0,    1,    1]
  )

  return (
    <motion.div
      aria-hidden="true"
      data-testid="moon-element"
      style={{
        position: 'absolute',
        left: '62vw',
        top: '11vh',
        width: '66px',
        height: '66px',
        borderRadius: '50%',
        // Off-centre gradient: brighter top-left → darker bottom-right
        // simulates sunlight reflected from the moon's surface
        background: 'radial-gradient(circle at 38% 36%, #FFFEF4 0%, #F5F0DC 28%, #DDD4B8 58%, #B8B09A 80%, #949080 100%)',
        // Layered atmospheric glow — cool silver-blue tones for night sky
        boxShadow: [
          '0 0 0 2px rgba(230, 225, 200, 0.18)',
          '0 0 18px 8px  rgba(200, 195, 170, 0.38)',
          '0 0 50px 22px rgba(180, 185, 210, 0.18)',
          '0 0 100px 45px rgba(160, 168, 200, 0.08)',
        ].join(', '),
        opacity: moonOpacity,
        pointerEvents: 'none',
        zIndex: 2,
        willChange: 'opacity',
      }}
    />
  )
}
