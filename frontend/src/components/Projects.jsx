import { ExternalLink, Github } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    title: 'DevFlow — Project Management Tool',
    description:
      'A real-time collaborative project management app with kanban boards, sprint planning, and team analytics. Built for developer teams.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image:
      'https://images.unsplash.com/photo-1549791084-5f78368b208b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc3NjQ1ODQ5M3ww&ixlib=rb-4.1.0&q=85',
    live: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'ShopNest — E-Commerce Platform',
    description:
      'Full-featured e-commerce platform with product catalog, cart, payments via Stripe, and an admin dashboard for inventory management.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    image:
      'https://images.unsplash.com/photo-1602128110234-2d11c0aaadfe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc3NjQ1ODQ5M3ww&ixlib=rb-4.1.0&q=85',
    live: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'WeatherMap — Climate Dashboard',
    description:
      'Interactive global weather dashboard with live data, 7-day forecasts, historical charts, and geolocation support.',
    tags: ['React', 'Python', 'FastAPI', 'OpenWeather API'],
    image:
      'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc3NjQ1ODQ5M3ww&ixlib=rb-4.1.0&q=85',
    live: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Scribe — AI Writing Assistant',
    description:
      'An AI-powered writing tool that helps users draft, refine, and summarize documents with real-time suggestions and version history.',
    tags: ['React', 'OpenAI API', 'Firebase', 'Tailwind CSS'],
    image:
      'https://images.unsplash.com/photo-1534094830444-3a1e21f7e3e7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHw0fHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc3NjQ1ODQ5M3ww&ixlib=rb-4.1.0&q=85',
    live: '#',
    github: '#',
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="py-24 md:py-32 bg-bg-secondary border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <p
          data-testid="projects-label"
          className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4"
        >
          03 — Projects
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <h2
            data-testid="projects-heading"
            className="font-heading font-medium text-3xl md:text-4xl tracking-tight text-primary"
          >
            Selected Work
          </h2>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="projects-github-link"
            className="font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary flex items-center gap-2 transition-colors duration-300"
          >
            <Github size={14} />
            View All on GitHub
          </a>
        </div>

        {/* Projects grid */}
        <div
          data-testid="projects-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border bg-border"
        >
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              data-testid={`project-card-${project.id}`}
              className="bg-bg-primary group"
            >
              {/* Image */}
              <div className="overflow-hidden h-52 md:h-60">
                <img
                  src={project.image}
                  alt={project.title}
                  data-testid={`project-image-${project.id}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3
                  data-testid={`project-title-${project.id}`}
                  className="font-heading font-medium text-xl md:text-2xl text-primary mb-3"
                >
                  {project.title}
                </h3>
                <p className="font-body text-sm md:text-base leading-relaxed text-secondary mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      data-testid={`project-tag-${tag.toLowerCase().replace(/\s/g, '-')}`}
                      className="font-mono text-xs px-3 py-1 border border-border text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.live}
                    data-testid={`project-live-${project.id}`}
                    className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary hover:text-accent transition-colors duration-300"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    data-testid={`project-github-${project.id}`}
                    className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300"
                  >
                    <Github size={13} />
                    Source Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
