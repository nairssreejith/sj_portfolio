const SKILLS = [
  {
    category: 'Mobile',
    items: ['Android SDK', 'Kotlin', 'Java', 'Jetpack Compose', 'Coroutines', 'Room / Data Binding'],
  },
  {
    category: 'Architecture',
    items: ['MVVM', 'Clean Architecture', 'Live Data', 'Dependency Injection', 'Feature Modularisation'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EC2 · S3 · CloudWatch)', 'Firebase', 'GitHub Actions', 'CI/CD Pipelines', 'On-prem → Cloud Migration'],
  },
  {
    category: 'Full-Stack',
    items: ['JavaScript', 'REST APIs', 'MySQL', 'SQLite', 'WebRTC Streaming'],
  },
  {
    category: 'AR / 3D / Game',
    items: ['HoloLens AR', 'Unity 3D', 'Unreal Engine', 'C#', 'C++', 'Real-time Annotation Pipelines'],
  },
  {
    category: 'Ways of Working',
    items: ['Agile / Scrum', 'Jira', 'Code Review', 'Technical Mentoring', 'Problem Solving', 'Cross-team Collaboration'],
  },
]

import { motion } from 'framer-motion'

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

export default function Skills() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="py-24 md:py-32 border-b border-border"
    >
      <motion.div className="max-w-7xl mx-auto px-6 md:px-12" {...reveal}>
        <p
          data-testid="skills-label"
          className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4"
        >
          02 — Stack
        </p>
        <h2
          data-testid="skills-heading"
          className="font-heading font-medium text-3xl md:text-5xl tracking-tight text-primary mb-4 leading-[1.05]"
        >
          The tools behind<br />
          <span className="text-accent">five years of shipping.</span>
        </h2>
        <p className="font-body text-base md:text-lg text-secondary max-w-xl mb-14">
          Deep Android expertise layered with cloud, AR, and architectural range —
          the same kit that powers XRMeet and UNITEAR in production today.
        </p>

        <div
          data-testid="skills-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-l border-t border-border"
        >
          {SKILLS.map((group) => (
            <article
              key={group.category}
              data-testid={`skills-category-${group.category.toLowerCase().replace(/[\s/]/g, '-')}`}
              className="border-r border-b border-border p-8"
            >
              <h3 className="font-heading font-medium text-base uppercase tracking-widest text-primary mb-5 pb-4 border-b border-border">
                {group.category}
              </h3>
              <ul className="space-y-2" role="list">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    data-testid={`skill-item-${skill.toLowerCase().replace(/[\s/().·]/g, '-')}`}
                    className="font-mono text-sm text-secondary flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-accent flex-shrink-0 mt-2" />
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
