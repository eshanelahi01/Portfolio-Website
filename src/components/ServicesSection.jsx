import { serviceOffers, siteConfig } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function ServicesSection({ standalone = false }) {
  const ref = useReveal({ threshold: 0.08 })

  return (
    <section
      id={standalone ? 'services' : 'services-overview'}
      className="container section"
      ref={ref}
      aria-labelledby="services-title"
    >
      <div className="section-head reveal">
        <p className="section-kicker">Services</p>
        <h2 id="services-title">
          Development services for teams and businesses that need strong frontend execution, dependable backend logic,
          and practical AI integration.
        </h2>
      </div>

      <div className="capability-grid">
        {serviceOffers.map((item, index) => (
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

      <div className="page-callout reveal">
        {siteConfig.availability ? <p>{siteConfig.availability}</p> : null}
        <div className="page-callout-actions">
          <a className="button" href="/contact/">
            Hire Me
          </a>
        </div>
      </div>
    </section>
  )
}
