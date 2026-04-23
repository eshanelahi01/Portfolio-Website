import { professionalSummary } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function About() {
  const ref = useReveal({ threshold: 0.12 })

  return (
    <section id="summary" className="container section" ref={ref} aria-labelledby="summary-title">
      <div className="section-head reveal">
        <h2 id="summary-title">
          About <span>Me</span>
        </h2>
        <p>Full-stack MERN development for SaaS, dashboards, APIs, and scalable web products.</p>
      </div>

      <div className="about-grid">
        <div className="about-content about-showcase">
          <article className="glass-card journey-card reveal">
            <h3>My Journey</h3>
            <p>{professionalSummary.intro}</p>
            {professionalSummary.body.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
        </div>
      </div>
    </section>
  )
}
