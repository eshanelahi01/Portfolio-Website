import { experienceTimeline } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function Experience() {
  const ref = useReveal({ threshold: 0.12 })

  return (
    <section id="experience" className="container section" ref={ref} aria-labelledby="experience-title">
      <div className="section-head reveal">
        <p className="section-kicker">Experience</p>
        <h2 id="experience-title">Academic and professional milestones shaping a stronger foundation in software engineering.</h2>
      </div>

      <div className="timeline">
        {experienceTimeline.map((item, index) => (
          <article key={item.title} className={`timeline-item reveal reveal-delay-${(index % 4) + 1}`}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
