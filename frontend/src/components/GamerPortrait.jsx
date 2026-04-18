/**
 * GamerPortrait.jsx — 3D-feeling portrait of the gamer alter ego.
 *
 * Sibling of HeroPortrait but re-skinned for night / cyberpunk:
 *   · Neon cyan + magenta pedestal halo (not warm orange)
 *   · Scan-line overlay baked into the card
 *   · LIVE badge with pulsing green dot instead of "Available for Hire"
 *
 * Same interaction physics: mouse-tilt via springed motion values,
 * counter-parallax on the inner image, perspective wrapper.
 */

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function GamerPortrait() {

  const wrapperRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const springCfg = { stiffness: 180, damping: 22, mass: 0.4 }
  const sx = useSpring(mx, springCfg)
  const sy = useSpring(my, springCfg)

  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10])
  const imgX    = useTransform(sx, [-0.5, 0.5], [8, -8])
  const imgY    = useTransform(sy, [-0.5, 0.5], [6, -6])

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
      data-testid="gamer-portrait-3d"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-[300px] h-[380px] md:w-[360px] md:h-[460px] mx-auto md:mx-0"
      style={{ perspective: 1200 }}
    >
      {/* ── Neon cyan pedestal halo ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute -inset-12 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 68%, rgba(0, 240, 255, 0.45) 0%, rgba(0, 240, 255, 0.12) 38%, rgba(0, 240, 255, 0) 72%)',
          filter: 'blur(30px)',
        }}
      />
      {/* ── Magenta rim from top-right ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 82% 18%, rgba(255, 0, 229, 0.40) 0%, rgba(255, 0, 229, 0) 55%)',
          filter: 'blur(22px)',
        }}
      />

      {/* ── 3D tilt card ────────────────────────────────────────── */}
      <motion.div
        data-testid="gamer-portrait-card"
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          borderRadius: '46% 54% 48% 52% / 40% 44% 56% 60%',
          overflow: 'hidden',
          boxShadow: [
            '0 2px 4px rgba(0, 0, 0, 0.35)',
            '0 18px 32px rgba(0, 0, 0, 0.55)',
            '0 40px 80px rgba(0, 240, 255, 0.32)',
            '0 80px 140px rgba(255, 0, 229, 0.22)',
            'inset 2px 3px 0 rgba(0, 240, 255, 0.40)',
            'inset -3px -6px 14px rgba(0, 0, 0, 0.55)',
          ].join(', '),
          background: '#05060F',
        }}
      >
        <motion.img
          src="/sreejith_gamer.jpg"
          alt="Sreejith — gamer alter ego"
          data-testid="gamer-portrait-image"
          className="w-full h-full object-cover"
          style={{
            x: imgX,
            y: imgY,
            scale: 1.08,
            transformStyle: 'preserve-3d',
            translateZ: 40,
            filter: 'saturate(1.15) contrast(1.05)',
          }}
          draggable={false}
        />

        {/* Scan lines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
          style={{
            background:
              'repeating-linear-gradient(to bottom, rgba(0,240,255,0.12) 0px, rgba(0,240,255,0.12) 1px, transparent 1px, transparent 3px)',
          }}
        />
        {/* Diagonal glass sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(125deg, rgba(0,240,255,0.18) 0%, rgba(255,0,229,0) 35%, rgba(255,0,229,0) 65%, rgba(255,0,229,0.20) 100%)',
          }}
        />
        {/* Grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
          }}
        />
      </motion.div>

      {/* ── LIVE badge ──────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        data-testid="gamer-portrait-live"
        className="absolute -right-3 top-8 md:-right-6 md:top-10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] flex items-center gap-2"
        style={{
          rotateX: useTransform(rotateX, v => v * 0.4),
          rotateY: useTransform(rotateY, v => v * 0.4),
          transformStyle: 'preserve-3d',
          translateZ: 60,
          background: 'rgba(5, 6, 15, 0.92)',
          color: '#39FF14',
          border: '1px solid rgba(57, 255, 20, 0.55)',
          boxShadow:
            '0 0 12px rgba(57, 255, 20, 0.55), 0 14px 30px rgba(0, 0, 0, 0.55)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: '#39FF14',
            boxShadow: '0 0 8px #39FF14',
            animation: 'live-pulse 1.4s ease-in-out infinite',
          }}
        />
        LIVE
      </motion.div>

      <style>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(0.85); }
        }
      `}</style>
    </motion.div>
  )
}
