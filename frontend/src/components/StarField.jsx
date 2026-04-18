/**
 * StarField.jsx — Subtle scroll-driven star layer for the night phase.
 *
 * PERFORMANCE CONTRACT
 * ─────────────────────
 *   · Exactly 72 stars as hand-generated static absolute-positioned
 *     <span> elements — total DOM cost ≈ 72 nodes (negligible).
 *   · Stars are generated ONCE (module-level array). No Math.random at
 *     render, no re-renders, no per-star animation beyond a CSS
 *     `twinkle` keyframe applied to ~12 of them.
 *   · Only the PARENT wrapper's opacity is driven by scroll — a single
 *     motion property. Individual stars have static opacity baked in.
 *
 * FADE TIMELINE
 * ──────────────
 *   scroll < 0.70   → wrapper opacity 0 (stars hidden)
 *   scroll 0.70–0.88 → wrapper opacity 0 → 1 (stars emerge)
 *   scroll > 0.88   → wrapper opacity 1 (fully visible)
 *
 * VISUAL RULES
 * ─────────────
 *   · Star size: 1–3 px (most 1 px for realism)
 *   · Per-star opacity: 0.25 – 0.95 (layered depth)
 *   · Colour: pure white with a cool tint for 20 % of stars
 *   · A small subset gently twinkles via CSS keyframes (no JS timers)
 */

import { useTransform, motion } from 'framer-motion'

// ── Hand-authored star positions ────────────────────────────────────
// Pre-computed to guarantee deterministic render and avoid layout
// reflows from runtime random generation.
//
// Each star: { x (vw), y (vh), s (px size), o (opacity), t (twinkle) }
const STARS = [
  // dense top band
  { x: 4,  y: 6,  s: 1, o: 0.72 },
  { x: 9,  y: 3,  s: 2, o: 0.92, t: true },
  { x: 13, y: 11, s: 1, o: 0.52 },
  { x: 17, y: 5,  s: 1, o: 0.80 },
  { x: 22, y: 15, s: 1, o: 0.42 },
  { x: 26, y: 8,  s: 2, o: 0.86 },
  { x: 30, y: 3,  s: 1, o: 0.70 },
  { x: 34, y: 13, s: 1, o: 0.55 },
  { x: 38, y: 6,  s: 1, o: 0.84, t: true },
  { x: 43, y: 2,  s: 2, o: 0.94 },
  { x: 47, y: 10, s: 1, o: 0.60 },
  { x: 52, y: 4,  s: 1, o: 0.75 },
  { x: 56, y: 14, s: 1, o: 0.48 },
  { x: 60, y: 7,  s: 2, o: 0.88, t: true },
  { x: 65, y: 3,  s: 1, o: 0.66 },
  { x: 69, y: 12, s: 1, o: 0.52 },
  { x: 74, y: 5,  s: 1, o: 0.82 },
  { x: 78, y: 9,  s: 2, o: 0.90 },
  { x: 83, y: 2,  s: 1, o: 0.70 },
  { x: 87, y: 14, s: 1, o: 0.46 },
  { x: 91, y: 7,  s: 1, o: 0.78, t: true },
  { x: 95, y: 11, s: 1, o: 0.58 },
  { x: 98, y: 4,  s: 2, o: 0.86 },

  // mid-sky band
  { x: 3,  y: 22, s: 1, o: 0.54 },
  { x: 8,  y: 28, s: 1, o: 0.72 },
  { x: 14, y: 20, s: 2, o: 0.88 },
  { x: 19, y: 32, s: 1, o: 0.46 },
  { x: 24, y: 24, s: 1, o: 0.62, t: true },
  { x: 29, y: 30, s: 1, o: 0.50 },
  { x: 33, y: 19, s: 1, o: 0.80 },
  { x: 37, y: 33, s: 2, o: 0.92 },
  { x: 41, y: 23, s: 1, o: 0.58 },
  { x: 46, y: 29, s: 1, o: 0.44 },
  { x: 50, y: 21, s: 1, o: 0.76 },
  { x: 54, y: 35, s: 1, o: 0.52, t: true },
  { x: 58, y: 26, s: 2, o: 0.88 },
  { x: 62, y: 31, s: 1, o: 0.48 },
  { x: 67, y: 20, s: 1, o: 0.70 },
  { x: 71, y: 34, s: 1, o: 0.56 },
  { x: 75, y: 25, s: 2, o: 0.84 },
  { x: 80, y: 30, s: 1, o: 0.42 },
  { x: 84, y: 22, s: 1, o: 0.74, t: true },
  { x: 89, y: 33, s: 1, o: 0.60 },
  { x: 93, y: 27, s: 1, o: 0.50 },
  { x: 97, y: 20, s: 2, o: 0.86 },

  // lower sky band (fainter, sparser — natural horizon fade)
  { x: 5,  y: 42, s: 1, o: 0.38 },
  { x: 12, y: 48, s: 1, o: 0.55 },
  { x: 18, y: 40, s: 1, o: 0.32 },
  { x: 25, y: 52, s: 1, o: 0.48, t: true },
  { x: 32, y: 44, s: 1, o: 0.36 },
  { x: 40, y: 50, s: 2, o: 0.68 },
  { x: 46, y: 41, s: 1, o: 0.40 },
  { x: 53, y: 47, s: 1, o: 0.54 },
  { x: 59, y: 43, s: 1, o: 0.34 },
  { x: 66, y: 51, s: 1, o: 0.50 },
  { x: 72, y: 45, s: 1, o: 0.38 },
  { x: 79, y: 42, s: 2, o: 0.60, t: true },
  { x: 85, y: 49, s: 1, o: 0.44 },
  { x: 92, y: 44, s: 1, o: 0.36 },

  // sparse upper-horizon dust
  { x: 6,  y: 60, s: 1, o: 0.24 },
  { x: 15, y: 64, s: 1, o: 0.30 },
  { x: 28, y: 58, s: 1, o: 0.26 },
  { x: 35, y: 63, s: 1, o: 0.32, t: true },
  { x: 48, y: 61, s: 1, o: 0.28 },
  { x: 62, y: 59, s: 1, o: 0.26 },
  { x: 70, y: 62, s: 1, o: 0.34 },
  { x: 82, y: 60, s: 1, o: 0.28 },
  { x: 90, y: 63, s: 1, o: 0.32 },

  // rare deep-sky accent (brighter "beacon" stars)
  { x: 20, y: 9,  s: 3, o: 1.00, t: true },
  { x: 48, y: 17, s: 3, o: 0.95 },
  { x: 72, y: 11, s: 3, o: 0.98, t: true },
  { x: 44, y: 38, s: 3, o: 0.88 },
  { x: 28, y: 46, s: 2, o: 0.80 },
  { x: 86, y: 36, s: 2, o: 0.84, t: true },
]

export default function StarField({ scrollYProgress }) {

  // Wrapper opacity — single motion value, negligible cost.
  const opacity = useTransform(
    scrollYProgress,
    [0,   0.70, 0.88, 1.0],
    [0,   0,    1,    1]
  )

  return (
    <motion.div
      aria-hidden="true"
      data-testid="star-field"
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: 'none',
        zIndex: 1, // below Sun/Moon (z 2) but above sky layers
        willChange: 'opacity',
      }}
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          data-testid={star.t ? 'star-twinkle' : 'star-static'}
          style={{
            position: 'absolute',
            left: `${star.x}vw`,
            top: `${star.y}vh`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            borderRadius: '50%',
            backgroundColor: i % 5 === 0 ? '#C8D8FF' : '#FFFFFF',
            opacity: star.o,
            // Bigger stars get a tiny glow for depth
            boxShadow:
              star.s >= 2
                ? `0 0 ${star.s * 2}px rgba(255,255,255,${star.o * 0.5})`
                : 'none',
            animation: star.t ? `star-twinkle ${2 + (i % 4)}s ease-in-out ${i * 0.17}s infinite` : undefined,
          }}
        />
      ))}

      {/* ── Keyframes (scoped via style tag — single declaration) ─── */}
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { filter: brightness(1); }
          50%      { filter: brightness(0.35); }
        }
      `}</style>
    </motion.div>
  )
}
