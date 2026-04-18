/**
 * Moon.jsx — Mirrors the Sun's arc, re-timed for longer page.
 *
 *   scroll  0.00–0.50 → invisible
 *   scroll  0.50        → emerges from LEFT (-12vw, 55vh)
 *   scroll  0.56        → rising left        (12vw, 32vh)
 *   scroll  0.63        → high left          (32vw, 14vh)
 *   scroll  0.70        → apex               (55vw,  8vh)
 *   scroll  0.74        → descending right   (78vw, 20vh)
 *   scroll  0.78        → exiting right edge (100vw, 38vh)
 *   scroll  0.78–1.00   → off-screen (cyberpunk phase runs without moon)
 */

import { useTransform, useMotionTemplate, motion } from 'framer-motion'

export default function Moon({ scrollYProgress }) {

  const moonX = useTransform(
    scrollYProgress,
    [0,       0.50,   0.56,  0.63,  0.70,  0.74,  0.78,   1.0],
    ['-12vw', '-12vw','12vw','32vw','55vw','78vw','100vw','100vw']
  )

  const moonY = useTransform(
    scrollYProgress,
    [0,      0.50,   0.56,  0.63,  0.70, 0.74,  0.78,  1.0],
    ['55vh', '55vh', '32vh','14vh', '8vh','20vh','38vh','38vh']
  )

  const moonTransform = useMotionTemplate`translate(${moonX}, ${moonY})`

  const moonOpacity = useTransform(
    scrollYProgress,
    [0,   0.50, 0.60, 0.76, 0.82, 1.0],
    [0,   0,    1,    1,    0,    0]
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
        background:
          'radial-gradient(circle at 38% 36%, #FFFEF4 0%, #F5F0DC 28%, #DDD4B8 58%, #B8B09A 80%, #949080 100%)',
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
