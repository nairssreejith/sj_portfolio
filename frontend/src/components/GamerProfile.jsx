/**
 * GamerProfile.jsx — Cyberpunk alter-ego section that appears AFTER Contact.
 *
 * STRUCTURE
 * ──────────
 *   1. Intro divider   — "Loading player 2..."
 *   2. Gamer hero      — 3D portrait + gamertag + rank + bio
 *   3. Stats grid      — K/D, win rate, hours, rank
 *   4. Top games       — skill bars
 *   5. Achievements    — recent wins / rankings
 *   6. Rig             — gaming setup
 *   7. Connect         — Twitch / YouTube / Discord / Steam
 *
 * DESIGN LANGUAGE
 * ────────────────
 *   · Primary neon  #00F0FF (cyan)
 *   · Secondary     #FF00E5 (magenta)
 *   · LIVE accent   #39FF14 (acid green)
 *   · Background    transparent — lets the fixed night sky + stars show
 *   · Neon grid     perspective floor drawn at bottom via CSS gradient
 *
 * ANIMATION
 * ──────────
 *   Each subsection fades + slides into view once (whileInView, once:true)
 *   keeping the reveal minimal — never distracts from content.
 *
 * SCROLL-BACK BEHAVIOUR
 * ──────────────────────
 *   Because this is just a section in the normal document flow, scrolling
 *   UP naturally transitions back to Contact with no custom handling.
 */

import { motion } from 'framer-motion'
import GamerPortrait from './GamerPortrait'
import {
  Twitch,
  Youtube,
  MessageCircle,
  Gamepad2,
  Trophy,
  Cpu,
  HardDrive,
  Monitor,
  Mouse,
  Keyboard,
  Headphones,
} from 'lucide-react'

// ── Reveal preset used across subsections ───────────────────────────
const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const STATS = [
  { label: 'Peak Rank',   value: 'Diamond II', sub: 'Valorant · Act 3' },
  { label: 'Win Rate',    value: '67%',        sub: 'Last 90 days'     },
  { label: 'Hours Played',value: '1,842',      sub: 'This season'      },
  { label: 'K/D Ratio',   value: '1.84',       sub: 'Ranked average'   },
]

const GAMES = [
  { name: 'Valorant',         role: 'Duelist · Jett main', skill: 92, tag: 'Primary' },
  { name: 'Apex Legends',     role: 'Wraith · Octane',     skill: 78, tag: 'Ranked'  },
  { name: 'Counter-Strike 2', role: 'Entry fragger',       skill: 74, tag: 'Weekly'  },
  { name: 'Rocket League',    role: 'Striker',             skill: 65, tag: 'Casual'  },
  { name: 'Dota 2',           role: 'Mid / Offlane',       skill: 58, tag: 'Stack'   },
]

const ACHIEVEMENTS = [
  { year: '2025', title: 'Top 500 — Valorant Episode 9',   badge: 'Radiant Adjacent' },
  { year: '2024', title: 'LAN Tournament — 2nd Place',     badge: 'Regional Finals' },
  { year: '2024', title: '1,000+ Twitch followers',        badge: 'Affiliate' },
  { year: '2023', title: 'Apex Predator — Split 1',        badge: 'Season 17' },
]

const RIG = [
  { icon: Cpu,        label: 'CPU',     value: 'Ryzen 7 7800X3D'    },
  { icon: HardDrive,  label: 'GPU',     value: 'RTX 4070 Ti Super'  },
  { icon: Monitor,    label: 'Display', value: '27" 1440p · 240Hz'  },
  { icon: Keyboard,   label: 'Board',   value: 'Wooting 60HE'       },
  { icon: Mouse,      label: 'Mouse',   value: 'Logitech G Pro X 2' },
  { icon: Headphones, label: 'Audio',   value: 'HyperX Cloud III'   },
]

const SOCIALS = [
  { label: 'Twitch',  handle: '/nighthawk_sn',  href: '#', icon: Twitch        },
  { label: 'YouTube', handle: '@nighthawk_sn',  href: '#', icon: Youtube       },
  { label: 'Discord', handle: 'nighthawk_sn',   href: '#', icon: MessageCircle },
  { label: 'Steam',   handle: 'nighthawk_sn',   href: '#', icon: Gamepad2      },
]

export default function GamerProfile() {
  return (
    <section
      id="gamer"
      data-testid="gamer-section"
      className="relative overflow-hidden"
    >
      {/* ────────────────────────────────────────────────────────────
         Cyberpunk background overlays — additive on top of the fixed
         night sky. All pointer-events:none. Contained by the section's
         overflow-hidden so they don't bleed into Contact.
         ──────────────────────────────────────────────────────────── */}

      {/* Neon perspective floor (bottom third of the section) */}
      <div
        aria-hidden="true"
        data-testid="gamer-bg-grid"
        className="absolute inset-x-0 bottom-0 h-[60vh] pointer-events-none"
        style={{
          perspective: '500px',
          perspectiveOrigin: 'center top',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 28%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 28%, black 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(62deg) translateZ(-40px)',
            transformOrigin: 'center top',
            backgroundImage:
              'linear-gradient(rgba(0,240,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,229,0.25) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            animation: 'gamer-grid-slide 7s linear infinite',
          }}
        />
      </div>

      {/* Magenta haze top-left */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-20 w-[520px] h-[520px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,0,229,0.22) 0%, rgba(255,0,229,0) 65%)',
          filter: 'blur(30px)',
        }}
      />
      {/* Cyan haze right */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-28 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,240,255,0.18) 0%, rgba(0,240,255,0) 65%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Subtle scanlines over the whole section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen"
        style={{
          background:
            'repeating-linear-gradient(to bottom, rgba(0,240,255,0.6) 0px, rgba(0,240,255,0.6) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* ════════════════════════════════════════════════════════════
         1. TRANSITION DIVIDER — "Loading player 2"
         ════════════════════════════════════════════════════════════ */}
      <motion.div
        data-testid="gamer-divider"
        className="relative z-10 py-14 border-y border-cyan-500/20 flex items-center justify-center"
        {...reveal}
      >
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.35em]" style={{ color: '#00F0FF' }}>
          <span className="inline-block w-10 h-px bg-cyan-400/50" />
          Loading Player 2
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#39FF14', boxShadow: '0 0 8px #39FF14' }} />
          <span className="inline-block w-10 h-px bg-pink-400/50" />
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════
         2. GAMER HERO
         ════════════════════════════════════════════════════════════ */}
      <div
        data-testid="gamer-hero"
        className="relative z-10 min-h-[92vh] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-14 items-center">

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <GamerPortrait />
            </motion.div>

            {/* Info */}
            <motion.div {...reveal} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>
              <p
                data-testid="gamer-eyebrow"
                className="font-mono text-xs uppercase tracking-[0.3em] mb-5 flex items-center gap-3"
                style={{ color: '#FF00E5', textShadow: '0 0 10px rgba(255,0,229,0.55)' }}
              >
                <span className="inline-block w-8 h-px" style={{ backgroundColor: '#FF00E5' }} />
                Player 2 — Identity
              </p>

              <h2
                data-testid="gamer-gamertag"
                className="font-heading font-light text-5xl md:text-7xl tracking-tighter leading-[0.95] mb-6"
                style={{
                  color: '#E8FCFF',
                  textShadow: '0 0 18px rgba(0,240,255,0.55), 0 0 42px rgba(0,240,255,0.30)',
                }}
              >
                NIGHTHAWK<span style={{ color: '#00F0FF' }}>_SN</span>
              </h2>

              {/* Rank badge row */}
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <span
                  data-testid="gamer-rank-badge"
                  className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,0,229,0.15))',
                    border: '1px solid rgba(0,240,255,0.50)',
                    color: '#00F0FF',
                    boxShadow: 'inset 0 0 12px rgba(0,240,255,0.25)',
                  }}
                >
                  <Trophy size={13} /> Diamond II · Valorant
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-widest text-pink-300 border border-pink-500/40">
                  Stacked with IRL Senior Engineer
                </span>
              </div>

              <p
                data-testid="gamer-bio"
                className="font-body text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                style={{ color: 'rgba(232, 252, 255, 0.78)' }}
              >
                Off the clock, the laptop is swapped for a keyboard and the
                deploy pipeline for a ranked queue. Competitive Valorant,
                experimental builds in Apex, and occasional co-stream sessions
                — same obsession for iteration, different arena.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#gamer-connect"
                  data-testid="gamer-cta-twitch"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: '#9146FF',
                    color: '#FFFFFF',
                    boxShadow: '0 0 20px rgba(145,70,255,0.55)',
                  }}
                >
                  <Twitch size={14} /> Follow on Twitch
                </a>
                <a
                  href="#gamer-connect"
                  data-testid="gamer-cta-discord"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300"
                  style={{
                    border: '1px solid rgba(0, 240, 255, 0.6)',
                    color: '#00F0FF',
                    background: 'rgba(5,6,15,0.5)',
                  }}
                >
                  <MessageCircle size={14} /> Join the Discord
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
         3. STATS GRID
         ════════════════════════════════════════════════════════════ */}
      <motion.div
        data-testid="gamer-stats"
        className="relative z-10 py-20 md:py-28"
        {...reveal}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#00F0FF' }}>
            05 — Season Stats
          </p>
          <h3 className="font-heading font-medium text-3xl md:text-4xl text-white mb-12 leading-tight">
            The current run.
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cyan-500/20">
            {STATS.map((s) => (
              <div
                key={s.label}
                data-testid={`gamer-stat-${s.label.toLowerCase().replace(/\s/g, '-')}`}
                className="p-7 md:p-9 relative"
                style={{ background: 'rgba(5, 6, 15, 0.85)' }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/70 mb-3">
                  {s.label}
                </p>
                <p
                  className="font-heading font-light text-4xl md:text-5xl tracking-tighter mb-2"
                  style={{
                    color: '#00F0FF',
                    textShadow: '0 0 14px rgba(0,240,255,0.55)',
                  }}
                >
                  {s.value}
                </p>
                <p className="font-mono text-xs text-white/50">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════
         4. TOP GAMES
         ════════════════════════════════════════════════════════════ */}
      <motion.div
        data-testid="gamer-games"
        className="relative z-10 py-20 md:py-24"
        {...reveal}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#FF00E5' }}>
            06 — Library
          </p>
          <h3 className="font-heading font-medium text-3xl md:text-4xl text-white mb-12 leading-tight">
            Top 5 in rotation.
          </h3>
          <div className="space-y-5">
            {GAMES.map((g) => (
              <div
                key={g.name}
                data-testid={`gamer-game-${g.name.toLowerCase().replace(/[\s-]/g, '-')}`}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-5 md:p-6"
                style={{
                  background: 'rgba(10, 8, 28, 0.7)',
                  border: '1px solid rgba(255, 0, 229, 0.18)',
                }}
              >
                <div className="md:w-1/3">
                  <p
                    className="font-heading font-medium text-xl text-white"
                    style={{ textShadow: '0 0 12px rgba(255,0,229,0.30)' }}
                  >
                    {g.name}
                  </p>
                  <p className="font-mono text-xs text-white/50 mt-1">{g.role}</p>
                </div>

                <div className="flex-1">
                  <div className="h-2 w-full bg-white/5 overflow-hidden rounded-full">
                    <motion.div
                      className="h-full"
                      style={{
                        background:
                          'linear-gradient(90deg, #00F0FF 0%, #FF00E5 100%)',
                        boxShadow: '0 0 10px rgba(0,240,255,0.55)',
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${g.skill}%` }}
                      viewport={{ once: true, margin: '-10% 0px' }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 md:w-auto">
                  <span className="font-mono text-sm" style={{ color: '#00F0FF' }}>
                    {g.skill}%
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-white/15 text-white/70">
                    {g.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════
         5. ACHIEVEMENTS
         ════════════════════════════════════════════════════════════ */}
      <motion.div
        data-testid="gamer-achievements"
        className="relative z-10 py-20 md:py-24"
        {...reveal}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#00F0FF' }}>
            07 — Trophy Shelf
          </p>
          <h3 className="font-heading font-medium text-3xl md:text-4xl text-white mb-12 leading-tight">
            Receipts from the battlefield.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                data-testid={`gamer-achievement-${i}`}
                className="p-6 md:p-7 flex items-start gap-5"
                style={{
                  background: 'rgba(10, 8, 28, 0.6)',
                  border: '1px solid rgba(0, 240, 255, 0.22)',
                }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                  style={{
                    background: 'rgba(0, 240, 255, 0.08)',
                    border: '1px solid rgba(0, 240, 255, 0.45)',
                    color: '#00F0FF',
                  }}
                >
                  <Trophy size={20} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: '#FF00E5' }}>
                    {a.year} · {a.badge}
                  </p>
                  <p className="font-heading font-medium text-lg text-white mt-1">
                    {a.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════
         6. RIG
         ════════════════════════════════════════════════════════════ */}
      <motion.div
        data-testid="gamer-rig"
        className="relative z-10 py-20 md:py-24"
        {...reveal}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#FF00E5' }}>
            08 — Workstation
          </p>
          <h3 className="font-heading font-medium text-3xl md:text-4xl text-white mb-12 leading-tight">
            The rig that runs both jobs.
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-pink-500/15">
            {RIG.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                data-testid={`gamer-rig-${label.toLowerCase()}`}
                className="p-6 flex items-center gap-4"
                style={{ background: 'rgba(5, 6, 15, 0.85)' }}
              >
                <div
                  className="flex-shrink-0 w-11 h-11 flex items-center justify-center"
                  style={{
                    color: '#FF00E5',
                    border: '1px solid rgba(255, 0, 229, 0.4)',
                    background: 'rgba(255, 0, 229, 0.06)',
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                    {label}
                  </p>
                  <p className="font-body text-sm text-white mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════
         7. CONNECT
         ════════════════════════════════════════════════════════════ */}
      <motion.div
        id="gamer-connect"
        data-testid="gamer-connect"
        className="relative z-10 py-20 md:py-28"
        {...reveal}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#00F0FF' }}>
            09 — Friend Request
          </p>
          <h3 className="font-heading font-medium text-3xl md:text-4xl text-white mb-12 leading-tight">
            Queue up. Or just say hi.
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {SOCIALS.map(({ label, handle, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                data-testid={`gamer-social-${label.toLowerCase()}`}
                className="group p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(10, 8, 28, 0.6)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                }}
              >
                <div className="flex items-center justify-between">
                  <Icon size={22} className="text-cyan-300" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-pink-300/70">
                    {label}
                  </span>
                </div>
                <p
                  className="font-heading text-lg text-white group-hover:text-cyan-300 transition-colors"
                  style={{ textShadow: '0 0 10px rgba(0,240,255,0.25)' }}
                >
                  {handle}
                </p>
              </a>
            ))}
          </div>

          {/* ── Sign-off ─────────────────────────────────────────── */}
          <div
            className="mt-16 pt-10 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            style={{ borderColor: 'rgba(0, 240, 255, 0.15)' }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50">
              End of line. Thanks for scrolling.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: '#39FF14' }}>
              GG
            </p>
          </div>
        </div>
      </motion.div>

      {/* Keyframes */}
      <style>{`
        @keyframes gamer-grid-slide {
          0%   { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
      `}</style>
    </section>
  )
}
