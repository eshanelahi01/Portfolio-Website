import { techCategories } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function Skills() {
  const ref = useReveal({ threshold: 0.1 })

  return (
    <section id="tech-stack" className="container section tech-stack-section" ref={ref} aria-labelledby="tech-stack-title">
      <div className="section-head reveal">
        <p className="section-kicker">Tech Stack</p>
        <h2 id="tech-stack-title">Tools and technologies I use to build scalable products.</h2>
      </div>

      <div className="tech-card-grid">
        {techCategories.map((category, index) => (
          <article key={category.title} className={`tech-stack-card reveal reveal-delay-${(index % 4) + 1}`}>
            <h3 className="tech-card-title">
              <i className={category.icon} aria-hidden="true" />
              {category.title}
            </h3>
            <div className="tech-chip-row">
              {category.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
