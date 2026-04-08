import { professionalSummary } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function About() {
  const ref = useReveal({ threshold: 0.12 })

  return (
    <section id="summary" className="container section" ref={ref} aria-labelledby="summary-title">
      <div className="section-head reveal">
        <p className="section-kicker">{professionalSummary.title}</p>
        <h2 id="summary-title">A clear, recruiter-friendly summary of who I am, what I build, and where I add value.</h2>
      </div>

      <div className="about-grid">
        <div className="about-content">
          <article className="glass-card reveal">
            <p>{professionalSummary.intro}</p>
            {professionalSummary.body.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <ul className="summary-list" aria-label="Professional summary highlights">
              {professionalSummary.summaryList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <aside className="facts-card reveal">
            {professionalSummary.facts.map((item) => (
              <div key={item.label} className="fact-item">
                <span className="fact-label">{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </aside>
        </div>

        <div className="capability-grid about-signal-grid">
          {professionalSummary.signals.map((item, index) => (
            <article key={item.title} className={`capability-card reveal reveal-delay-${index + 1}`}>
              <span className="capability-index">{item.title}</span>
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
      </div>
    </section>
  )
}
