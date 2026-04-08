import { whyWorkWithMe } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function WhyWorkWithMe() {
  const ref = useReveal({ threshold: 0.08 })

  return (
    <section id="why-work-with-me" className="container section" ref={ref} aria-labelledby="why-work-title">
      <div className="section-head reveal">
        <p className="section-kicker">Why Work With Me</p>
        <h2 id="why-work-title">
          A product-focused way of working that combines technical depth, clear communication, and practical delivery.
        </h2>
      </div>

      <div className="capability-grid">
        {whyWorkWithMe.map((item, index) => (
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

