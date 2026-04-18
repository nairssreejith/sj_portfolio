import HeroPortrait from './HeroPortrait'
import { motion } from 'framer-motion'

export default function Hero({ scrollYProgress }) {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="min-h-[92vh] flex items-center border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* ── Text block ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p
              data-testid="hero-label"
              className="font-mono text-xs uppercase tracking-[0.22em] text-secondary mb-6 flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-accent" />
              Senior Software Engineer · Android · Full-Stack · AR
            </p>
            <h1
              data-testid="hero-heading"
              className="font-heading font-light text-5xl md:text-6xl lg:text-7xl tracking-tighter text-primary leading-[0.95] mb-8"
            >
              I build apps that<br />
              <span className="text-accent">millions feel,</span><br />
              not just use.
            </h1>
            <p
              data-testid="hero-bio"
              className="font-body text-base md:text-lg leading-relaxed text-secondary max-w-lg mb-10"
            >
              I'm <strong className="text-primary font-medium">Sreejith S Nair</strong> — a Senior Software
              Engineer with <strong className="text-primary font-medium">5+ years</strong> shipping Android,
              AR, and full-stack products. I led development on{' '}
              <strong className="text-primary font-medium">XRMeet</strong> and{' '}
              <strong className="text-primary font-medium">UNITEAR</strong>, reaching
              <strong className="text-primary font-medium"> 20,000+ users</strong>, and I migrated legacy
              on-prem stacks onto AWS with automated CI/CD.
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 mb-10 font-mono text-xs uppercase tracking-widest text-secondary">
              <span data-testid="hero-meta-location" className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent" />
                Trivandrum, IN
              </span>
              <span data-testid="hero-meta-status" className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Open to Opportunities
              </span>
              <span data-testid="hero-meta-experience">5+ yrs · Android / Kotlin / AWS</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                data-testid="hero-cta-projects"
                className="inline-flex items-center px-7 py-3 bg-primary text-white font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-300"
              >
                See My Work →
              </a>
              <a
                href="#contact"
                data-testid="hero-cta-contact"
                className="inline-flex items-center px-7 py-3 border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>

          {/* ── 3D Portrait ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
            className="flex justify-center md:justify-end"
          >
            <HeroPortrait scrollYProgress={scrollYProgress} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
