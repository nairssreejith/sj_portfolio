const STATS = [
  { value: '5+',     label: 'Years in Industry',   testKey: 'years' },
  { value: '20K+',   label: 'Users Reached',       testKey: 'users' },
  { value: '3',      label: 'Companies Shipped For', testKey: 'companies' },
  { value: '2',      label: 'Flagship AR Apps',    testKey: 'apps' },
]

const JOURNEY = [
  { year: '2014', label: 'Co-founded Leprotech — Android dev from day one' },
  { year: '2017', label: 'Moved to Toronto → Advanced Diploma, Centennial College' },
  { year: '2019', label: 'Built real-estate listing app @ Global Retail Consulting' },
  { year: '2022', label: 'Senior Engineer @ iBoson — XRMeet + UNITEAR shipped' },
]

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p
          data-testid="about-label"
          className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4"
        >
          01 — About
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Narrative */}
          <div>
            <h2
              data-testid="about-heading"
              className="font-heading font-medium text-3xl md:text-5xl tracking-tight text-primary mb-8 leading-[1.05]"
            >
              Engineer by craft.<br />
              <span className="text-accent">Product thinker</span> by habit.
            </h2>
            <div className="space-y-5">
              <p className="font-body text-base md:text-lg leading-relaxed text-secondary">
                My path started in Trivandrum, Kerala, where I co-founded{' '}
                <strong className="text-primary font-medium">Leprotech</strong> at 22 and
                shipped my first Android apps. A cross-continent move to Toronto for an
                Advanced Diploma at <strong className="text-primary font-medium">Centennial College</strong>{' '}
                sharpened my fundamentals — mobile architecture, game engines, and databases.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-secondary">
                At <strong className="text-primary font-medium">iBoson Innovations</strong> I led the
                Android team building <strong className="text-primary font-medium">XRMeet</strong> — a
                video-conferencing app with real-time AR annotations streamed over WebRTC — and{' '}
                <strong className="text-primary font-medium">UNITEAR 3D Builder</strong>, which ships AR
                content to HoloLens. Together those products crossed{' '}
                <strong className="text-primary font-medium">20,000+ users</strong>.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-secondary">
                Along the way I migrated a legacy on-prem backend to AWS, wrote the CI/CD
                pipelines that keep it green on every commit, and rebuilt half the UI in
                Jetpack Compose because MVVM + Clean Architecture is how I sleep at night.
              </p>
            </div>
            <a
              href="/resume.pdf"
              data-testid="about-resume-btn"
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
            >
              Download Resume ↓
            </a>
          </div>

          {/* Stats + Journey */}
          <div>
            <div
              data-testid="about-stats"
              className="grid grid-cols-2 border-l border-t border-border"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.testKey}
                  data-testid={`stat-${stat.testKey}`}
                  className="border-r border-b border-border p-8 md:p-10"
                >
                  <p className="font-heading font-light text-4xl md:text-5xl tracking-tighter text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Journey timeline */}
            <div className="mt-10" data-testid="about-journey">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-5">
                The Arc
              </p>
              <ol className="space-y-4 border-l border-border pl-6">
                {JOURNEY.map((row) => (
                  <li
                    key={row.year}
                    data-testid={`journey-${row.year}`}
                    className="relative"
                  >
                    <span className="absolute -left-[29px] top-2 w-2 h-2 bg-accent" />
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                      <span className="font-mono text-xs tracking-widest text-accent">
                        {row.year}
                      </span>
                      <span className="font-body text-sm md:text-base text-secondary">
                        {row.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
