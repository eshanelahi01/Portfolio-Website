import { experienceTimeline } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function Experience() {
  const ref = useReveal({ threshold: 0.12 })

  return (
    <section id="experience" className="container section" ref={ref} aria-labelledby="experience-title">
      <div className="section-head reveal">
        <p className="section-kicker">Employment History</p>
        <h2 id="experience-title">Full-stack roles focused on shipping client products, stronger systems, and production-ready delivery.</h2>
      </div>

      <div className="timeline">
        {experienceTimeline.map((item, index) => (
          <article
            key={`${item.company}-${item.role}-${item.date}`}
            className={`timeline-item reveal reveal-delay-${(index % 4) + 1}`}
          >
            <div className="timeline-dot" />
            <div className="timeline-card">
              <span className="timeline-date">{item.date}</span>
              <div className="timeline-head">
                <h3>{item.role}</h3>
                <p className="timeline-company">{item.company}</p>
              </div>

              <div className="timeline-copy">
                {item.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="timeline-highlights">
                <span className="timeline-label">Key work</span>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
