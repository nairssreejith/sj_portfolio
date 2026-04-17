export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="min-h-[88vh] flex items-center bg-bg-primary border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text block */}
          <div>
            <p
              data-testid="hero-label"
              className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-6"
            >
              Full Stack Developer
            </p>
            <h1
              data-testid="hero-heading"
              className="font-heading font-light text-5xl md:text-6xl tracking-tighter text-primary leading-none mb-6"
            >
              Hi, I'm<br />
              <span className="text-accent">Alex Rivera</span>
            </h1>
            <p
              data-testid="hero-bio"
              className="font-body text-base md:text-lg leading-relaxed text-secondary max-w-md mb-10"
            >
              I build fast, accessible, and scalable web applications. 
              Passionate about clean code, thoughtful UX, and solving complex problems with simple solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                data-testid="hero-cta-projects"
                className="inline-flex items-center px-7 py-3 bg-primary text-white font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-300"
              >
                View Projects
              </a>
              <a
                href="#contact"
                data-testid="hero-cta-contact"
                className="inline-flex items-center px-7 py-3 border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Profile image */}
          <div className="flex justify-center md:justify-end">
            <div
              data-testid="hero-image-wrapper"
              className="overflow-hidden border border-border w-72 h-96 md:w-80 md:h-[28rem]"
            >
              <img
                src="https://images.unsplash.com/photo-1620122303020-87ec826cf70d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc2NDU4NDkzfDA&ixlib=rb-4.1.0&q=85"
                alt="Alex Rivera — Full Stack Developer"
                data-testid="hero-image"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
