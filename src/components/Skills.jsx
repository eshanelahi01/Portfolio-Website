import { proficiency, techCategories } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function Skills() {
  const ref = useReveal({ threshold: 0.1 })

  return (
    <section id="tech-stack" className="container section" ref={ref} aria-labelledby="tech-stack-title">
      <div className="section-head reveal">
        <p className="section-kicker">Tech Stack</p>
        <h2 id="tech-stack-title">
          Core technologies I use across React development, backend API engineering, and AI-oriented product work.
        </h2>
      </div>

      <div className="tech-layout">
        <article className="tech-proficiency-card reveal">
          <div className="tech-proficiency-header">
            <h3>Technical Proficiency</h3>
            <p>
              These are the tools I use most often to build recruiter-friendly interfaces, scalable backend systems, and
              AI-powered product features.
            </p>
          </div>

          <div className="tech-skill-list">
            {proficiency.map((skill) => (
              <div key={skill.name} className="tech-skill-item">
                <div className="tech-skill-head">
                  <h4>{skill.name}</h4>
                  <span>{skill.level}%</span>
                </div>
                <div className="tech-meter-track">
                  <div
                    className="tech-meter-fill"
                    style={{
                      '--skill-level': `${skill.level}%`,
                      '--skill-accent': skill.accent,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="tech-category-stack">
          {techCategories.map((category, index) => (
            <article key={category.title} className={`tech-category-card reveal reveal-delay-${index + 1}`}>
              <h3>{category.title}</h3>
              <div className="tech-chip-row">
                {category.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
