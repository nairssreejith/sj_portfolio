const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: '40+', label: 'Projects Shipped' },
  { value: '15+', label: 'Happy Clients' },
  { value: '99%', label: 'Uptime Average' },
]

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 bg-bg-secondary border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <p
          data-testid="about-label"
          className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4"
        >
          01 — About
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <h2
              data-testid="about-heading"
              className="font-heading font-medium text-3xl md:text-4xl tracking-tight text-primary mb-8"
            >
              Building things that<br />
              <span className="text-accent">matter on the web.</span>
            </h2>
            <div className="space-y-4">
              <p className="font-body text-base md:text-lg leading-relaxed text-secondary">
                I'm a Full Stack Developer with 5+ years of experience crafting robust, 
                user-friendly web applications. I specialize in the JavaScript ecosystem — 
                React on the frontend, Node.js and Python on the backend.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-secondary">
                I believe great software is more than working code — it's about user 
                experience, performance, and maintainability. I work closely with teams 
                and clients to deliver products that are both technically sound and 
                genuinely useful.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-secondary">
                When I'm not coding, I'm contributing to open-source, writing technical 
                articles, or exploring new tools and frameworks.
              </p>
            </div>
            <a
              href="/resume.pdf"
              data-testid="about-resume-btn"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
            >
              Download Resume
            </a>
          </div>

          {/* Stats */}
          <div
            data-testid="about-stats"
            className="grid grid-cols-2 border-l border-t border-border"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}
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
        </div>
      </div>
    </section>
  )
}
