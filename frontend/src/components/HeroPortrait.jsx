/**
 * HeroPortrait.jsx — 3D-feeling portrait of Sreejith.
 *
 * DEPTH EFFECTS
 * ─────────────
 *   · Mouse-tilt parallax (perspective + rotateX/rotateY) — the portrait
 *     leans toward the cursor, giving it a physical presence.
 *   · Scroll-tied gentle float (translateY follows a soft curve).
 *   · Layered drop shadows (close + mid + ambient) to separate the
 *     portrait from the page, mimicking studio lighting.
 *   · Soft gradient "pedestal" blob behind the portrait that breathes
 *     a coloured halo as light from below.
 *   · Inset highlight along the top-left edge — fakes a light source.
 *
 * IMPLEMENTATION NOTES
 * ────────────────────
 *   · Uses Framer Motion's `useMotionValue` + `useSpring` for buttery
 *     tilt tracking (no React re-renders on mousemove).
 *   · Portrait clipped with an organic `border-radius` blob shape —
 *     no boxy 2D rectangle frame.
 *   · `transform-style: preserve-3d` + `perspective` on the wrapper
 *     ensures the rotateX/Y reads as real depth.
 */

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function HeroPortrait({ scrollYProgress }) {

  const wrapperRef = useRef(null)

  // ── Raw mouse-tilt motion values (−0.5 … 0.5) ────────────────────────
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // Soft-spring them so the tilt decelerates naturally
  const springCfg = { stiffness: 180, damping: 22, mass: 0.4 }
  const sx = useSpring(mx, springCfg)
  const sy = useSpring(my, springCfg)

  // Compose rotation: horizontal mouse → rotateY, vertical → rotateX (flipped)
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10])

  // Parallax inner-image shift (moves opposite to tilt to enhance depth)
  const imgX = useTransform(sx, [-0.5, 0.5], [8, -8])
  const imgY = useTransform(sy, [-0.5, 0.5], [6, -6])

  // Always call useMotionValue unconditionally (rules of hooks)
  const fallbackScroll = useMotionValue(0)
  const scroll = scrollYProgress ?? fallbackScroll

  // ── Scroll-tied gentle float (over the whole hero) ─────────────────
  // Rises slightly as user starts scrolling, keeping portrait feeling alive.
  const floatY = useTransform(scroll, [0, 0.15], [0, -18])

  // Glow pedestal opacity — strongest at hero, fades as day advances
  const pedestalOpacity = useTransform(
    scroll,
    [0, 0.2, 0.5, 1],
    [0.9, 0.7, 0.25, 0.25]
  )

  // ── Mouse handlers ─────────────────────────────────────────────────
  const handleMove = (e) => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={wrapperRef}
      data-testid="hero-portrait-3d"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-[300px] h-[380px] md:w-[360px] md:h-[460px] mx-auto md:ml-auto"
      style={{
        perspective: 1200,
        y: floatY,
      }}
    >
      {/* ── Ambient pedestal glow (soft coloured halo behind portrait) ── */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-10 pointer-events-none"
        style={{
          opacity: pedestalOpacity,
          background:
            'radial-gradient(ellipse 65% 55% at 50% 65%, rgba(255, 140, 66, 0.42) 0%, rgba(255, 86, 48, 0.22) 35%, rgba(255, 86, 48, 0) 72%)',
          filter: 'blur(24px)',
        }}
      />

      {/* ── Secondary cool halo from top-right (sky-light fill) ─────── */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-6 pointer-events-none"
        style={{
          opacity: pedestalOpacity,
          background:
            'radial-gradient(circle at 78% 18%, rgba(140, 200, 255, 0.38) 0%, rgba(140, 200, 255, 0) 55%)',
          filter: 'blur(18px)',
        }}
      />

      {/* ── 3D Tilt Card ──────────────────────────────────────────────── */}
      <motion.div
        data-testid="hero-portrait-card"
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          // Organic blob mask: rounded but asymmetric — no 2D rectangle
          borderRadius: '46% 54% 48% 52% / 40% 44% 56% 60%',
          overflow: 'hidden',
          // Layered drop shadows for studio depth
          boxShadow: [
            '0 2px 4px rgba(10, 10, 10, 0.10)',
            '0 14px 30px rgba(10, 10, 10, 0.18)',
            '0 40px 80px rgba(255, 86, 48, 0.22)',
            '0 80px 140px rgba(10, 10, 10, 0.28)',
            // Top-left inner highlight — fakes key light
            'inset 2px 3px 0 rgba(255, 255, 255, 0.35)',
            // Bottom-right inner shadow — fakes fill shadow
            'inset -3px -6px 14px rgba(0, 0, 0, 0.22)',
          ].join(', '),
          background: '#0A0A0A',
        }}
      >
        {/* Portrait image with counter-parallax */}
        <motion.img
          src="/sreejith.jpg"
          alt="Sreejith S Nair — Senior Software Engineer"
          data-testid="hero-portrait-image"
          className="w-full h-full object-cover"
          style={{
            x: imgX,
            y: imgY,
            scale: 1.08, // allows parallax room without edge gaps
            transformStyle: 'preserve-3d',
            translateZ: 40, // pushes image forward inside perspective
          }}
          draggable={false}
        />

        {/* ── Glass-sheen highlight sweeping top-left → bottom-right ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(125deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 62%, rgba(10,10,10,0.28) 100%)',
          }}
        />

        {/* ── Subtle grain noise for filmic feel ─────────────────── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
          }}
        />
      </motion.div>

      {/* ── Floating accent tag (adds a "UI layer" 3D feel) ──────────── */}
      <motion.div
        aria-hidden="true"
        data-testid="hero-portrait-tag"
        className="absolute -left-4 bottom-8 md:-left-8 md:bottom-10 bg-primary text-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{
          rotateX: useTransform(rotateX, v => v * 0.4),
          rotateY: useTransform(rotateY, v => v * 0.4),
          boxShadow: '0 14px 30px rgba(10, 10, 10, 0.35)',
          transformStyle: 'preserve-3d',
          translateZ: 60,
        }}
      >
        <span className="inline-block w-1.5 h-1.5 bg-accent mr-2 align-middle" />
        Available for Hire
      </motion.div>
    </motion.div>
  )
}
