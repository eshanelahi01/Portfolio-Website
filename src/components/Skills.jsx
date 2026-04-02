import { useEffect, useRef } from 'react'

const proficiency = [
  {
    name: 'React.js',
    level: 92,
    accent: 'linear-gradient(90deg, #62cfff 0%, #3d7df5 100%)',
  },
  {
    name: 'Python',
    level: 89,
    accent: 'linear-gradient(90deg, #f2cd6b 0%, #d89f22 100%)',
  },
  {
    name: 'Node.js',
    level: 88,
    accent: 'linear-gradient(90deg, #77dd8a 0%, #2ea95a 100%)',
  },
  {
    name: 'FastAPI',
    level: 86,
    accent: 'linear-gradient(90deg, #4be0cb 0%, #1e9f90 100%)',
  },
  {
    name: 'n8n',
    level: 84,
    accent: 'linear-gradient(90deg, #ff9f5a 0%, #f05a28 100%)',
  },
]

const categories = [
  {
    title: 'Frontend',
    tags: ['React.js', 'JavaScript', 'Responsive UI', 'Component Design', 'API Integration', 'Modern Web'],
  },
  {
    title: 'Backend & APIs',
    tags: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'MongoDB', 'MySQL', 'Authentication'],
  },
  {
    title: 'AI & Automation',
    tags: ['n8n', 'AI Agents', 'Workflow Automation', 'RAG Systems', 'LLM Integration', 'Agentic Workflows'],
  },
]

export default function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.1 }
    )

    const els = ref.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" className="container section" ref={ref}>
      <div className="section-head reveal">
        <p className="section-kicker">Technologies</p>
        <h2>A clearer view of the technologies I use across frontend, backend, and AI-powered product development.</h2>
      </div>

      <div className="tech-layout">
        <article className="tech-proficiency-card reveal">
          <div className="tech-proficiency-header">
            <h3>Technical Proficiency</h3>
            <p>Core tools I use most often to ship polished interfaces, scalable APIs, and production-ready products.</p>
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
          {categories.map((category, i) => (
            <article key={category.title} className={`tech-category-card reveal reveal-delay-${i + 1}`}>
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
