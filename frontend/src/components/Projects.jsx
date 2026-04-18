import { ExternalLink, Github } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    featured: true,
    title: 'XRMeet — AR Video Conferencing',
    company: 'iBoson Innovations · 2022–2023',
    description:
      'A video-conferencing platform that composites real-time AR annotations directly onto the live call stream. Engineers on the floor draw, point, and tag in 3D space while remote experts guide them — no instruction lag, no screenshots. Cloud-based chat built on Firebase; crash telemetry streamed through AWS CloudWatch.',
    impact: 'Shipped to enterprise AR workflows with thousands of on-site field users.',
    tags: ['Android SDK', 'Kotlin', 'Jetpack Compose', 'WebRTC', 'Firebase', 'AWS'],
    image:
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    live: '#',
    github: '#',
  },
  {
    id: 2,
    featured: true,
    title: 'UNITEAR 3D Builder — HoloLens AR',
    company: 'iBoson Innovations · 2022–2023',
    description:
      'A cross-platform builder for shipping interactive 3D experiences straight into Microsoft HoloLens. I wrote the Android companion app, integrated AR functionality over the live video stream, and authored the data contracts that synchronise 3D scenes between desktop, mobile, and headset in real time.',
    impact: 'Part of the iBoson AR suite that crossed 20,000+ client installs.',
    tags: ['Unity 3D', 'C#', 'HoloLens', 'Android', 'MVVM', 'Clean Architecture'],
    image:
      'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=1200&q=80',
    live: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'On-prem → AWS Migration + CI/CD',
    company: 'iBoson Innovations · 2023',
    description:
      'Lifted a legacy on-prem backend onto AWS without a minute of user-facing downtime. Designed GitHub Actions pipelines for automated builds, tests, and deploys, then wired CloudWatch alarms into the team\'s chat so every anomaly surfaces before a user sees it.',
    impact: 'Cut deploy cycle from days to minutes; eliminated manual rollout errors.',
    tags: ['AWS', 'GitHub Actions', 'CI/CD', 'CloudWatch', 'Firebase'],
    image:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80',
    live: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Real-Estate Listings — Mobile + API',
    company: 'Global Retail Consulting · 2019–2020',
    description:
      'End-to-end ownership of a property-discovery Android app: RESTful integrations with live MLS data, a CI/CD pipeline that shipped nightly builds to the team, and a UX rework that lifted user engagement 20% in the first quarter post-launch.',
    impact: '+20% user engagement · shipped on full CI/CD from day one.',
    tags: ['Android', 'Java', 'REST APIs', 'MySQL', 'CI/CD'],
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    live: '#',
    github: '#',
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="py-24 md:py-32 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p
          data-testid="projects-label"
          className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4"
        >
          03 — Selected Work
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <h2
            data-testid="projects-heading"
            className="font-heading font-medium text-3xl md:text-5xl tracking-tight text-primary leading-[1.05]"
          >
            What I've shipped,<br />
            <span className="text-accent">and the dent it made.</span>
          </h2>
          <a
            href="https://www.linkedin.com/in/sreejithsnair"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="projects-github-link"
            className="font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary flex items-center gap-2 transition-colors duration-300"
          >
            <Github size={14} />
            See Full Experience
          </a>
        </div>

        <div
          data-testid="projects-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border bg-border"
        >
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              data-testid={`project-card-${project.id}`}
              className={`bg-bg-primary group ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <div className={`grid ${project.featured ? 'md:grid-cols-[1.1fr_1fr]' : ''} gap-0`}>
                {/* Image */}
                <div className={`overflow-hidden ${project.featured ? 'h-64 md:h-full min-h-[320px]' : 'h-52 md:h-60'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    data-testid={`project-image-${project.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">
                    {project.company}
                  </p>
                  <h3
                    data-testid={`project-title-${project.id}`}
                    className="font-heading font-medium text-xl md:text-2xl text-primary mb-4 leading-tight"
                  >
                    {project.title}
                  </h3>
                  <p className="font-body text-sm md:text-base leading-relaxed text-secondary mb-5">
                    {project.description}
                  </p>
                  <p
                    data-testid={`project-impact-${project.id}`}
                    className="font-mono text-xs text-primary border-l-2 border-accent pl-3 mb-6"
                  >
                    {project.impact}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        data-testid={`project-tag-${project.id}-${tag.toLowerCase().replace(/[\s/]/g, '-')}`}
                        className="font-mono text-xs px-3 py-1 border border-border text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a
                      href={project.live}
                      data-testid={`project-live-${project.id}`}
                      className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary hover:text-accent transition-colors duration-300"
                    >
                      <ExternalLink size={13} />
                      Case Study
                    </a>
                    <a
                      href={project.github}
                      data-testid={`project-github-${project.id}`}
                      className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300"
                    >
                      <Github size={13} />
                      Details
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
