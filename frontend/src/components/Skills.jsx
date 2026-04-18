const SKILLS = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'Express.js', 'REST / GraphQL'] },
  { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Prisma ORM'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'CI/CD', 'Nginx', 'Linux'] },
  { category: 'Tools', items: ['Git / GitHub', 'Figma', 'Jest', 'Webpack', 'Vite'] },
  { category: 'Soft Skills', items: ['Agile / Scrum', 'Code Review', 'Mentoring', 'Technical Writing', 'Remote Collaboration'] },
]

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="py-24 md:py-32 bg-bg-primary border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <p
          data-testid="skills-label"
          className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4"
        >
          02 — Skills
        </p>
        <h2
          data-testid="skills-heading"
          className="font-heading font-medium text-3xl md:text-4xl tracking-tight text-primary mb-14"
        >
          Technologies &amp; Tools
        </h2>

        {/* Grid with borders */}
        <div
          data-testid="skills-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-l border-t border-border"
        >
          {SKILLS.map((group) => (
            <article
              key={group.category}
              data-testid={`skills-category-${group.category.toLowerCase().replace(/\s/g, '-')}`}
              className="border-r border-b border-border p-8"
            >
              <h3 className="font-heading font-medium text-base uppercase tracking-widest text-primary mb-5 pb-4 border-b border-border">
                {group.category}
              </h3>
              <ul className="space-y-2" role="list">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    data-testid={`skill-item-${skill.toLowerCase().replace(/[\s/]/g, '-')}`}
                    className="font-mono text-sm text-secondary flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
