import { expertiseAreas } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function CoreExpertise() {
  const ref = useReveal({ threshold: 0.08 })

  return (
    <section id="expertise" className="container section" ref={ref} aria-labelledby="expertise-title">
      <div className="section-head reveal">
        <p className="section-kicker">Core Expertise</p>
        <h2 id="expertise-title">
          Software engineering strengths across full stack development, backend APIs, and AI-powered product work.
        </h2>
      </div>

      <div className="capability-grid">
        {expertiseAreas.map((item, index) => (
          <article key={item.title} className={`capability-card reveal reveal-delay-${(index % 4) + 1}`}>
            <span className="capability-index">{item.index}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="capability-tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

