import Breadcrumbs from '../components/Breadcrumbs'
import SchemaMarkup from '../components/SchemaMarkup'
import useReveal from '../hooks/useReveal'
import { getBreadcrumbSchema, getProjectPageSchemas } from '../lib/schema'

export default function ProjectCaseStudyPage({ project }) {
  const ref = useReveal({ threshold: 0.08 })
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects/' },
    { name: project.name, url: `/projects/${project.slug}/` },
  ]

  return (
    <div ref={ref}>
      <SchemaMarkup items={[...getProjectPageSchemas(project), getBreadcrumbSchema(breadcrumbItems)]} />

      <section className="container section page-hero" aria-labelledby={`${project.slug}-title`}>
        <Breadcrumbs items={breadcrumbItems} />
        <div className="page-hero-grid page-hero-grid-project">
          <div className="page-hero-copy reveal">
            <p className="section-kicker">{project.category}</p>
            <h1 id={`${project.slug}-title`}>{project.title}</h1>
            <p className="page-hero-text">{project.summary}</p>
            <div className="hero-actions page-actions">
              {project.liveUrl ? (
                <a className="button" href={project.liveUrl} target="_blank" rel="noopener">
                  Visit Live Project
                </a>
              ) : null}
              <a className={`button${project.liveUrl ? ' button-ghost' : ''}`} href="/contact/">
                Start a Similar Project
              </a>
            </div>
          </div>

          <div className="page-hero-visual reveal">
            <div className="visual-card profile-panel case-study-panel">
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="eager"
                decoding="async"
                width="1600"
                height="900"
              />
              <div className="profile-summary">
                <h2>{project.name}</h2>
                <p>{project.category}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section section-condensed" aria-labelledby={`${project.slug}-overview`}>
        <div className="section-head reveal">
          <p className="section-kicker">Case Study Overview</p>
          <h2 id={`${project.slug}-overview`}>Problem, solution, role, and business value at a glance.</h2>
        </div>

        <div className="project-overview-grid">
          <article className="glass-card reveal">
            <h3>Problem</h3>
            <p>{project.problem}</p>
          </article>

          <article className="glass-card reveal">
            <h3>Solution</h3>
            <p>{project.solution}</p>
          </article>

          <article className="glass-card reveal">
            <h3>My Role</h3>
            <p>{project.role}</p>
          </article>

          <article className="glass-card reveal">
            <h3>Outcome and Value</h3>
            <ul className="detail-list">
              {project.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="container section section-condensed" aria-labelledby={`${project.slug}-details`}>
        <div className="section-head reveal">
          <p className="section-kicker">Technical Detail</p>
          <h2 id={`${project.slug}-details`}>Core technologies, feature scope, and implementation signals.</h2>
        </div>

        <div className="capability-grid">
          <article className="capability-card reveal">
            <span className="capability-index">Stack</span>
            <h3>Technologies Used</h3>
            <div className="capability-tags capability-tags-compact">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <article className="capability-card reveal">
            <span className="capability-index">Features</span>
            <h3>Key Features</h3>
            <ul className="detail-list">
              {project.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="capability-card reveal">
            <span className="capability-index">Project Type</span>
            <h3>What This Project Demonstrates</h3>
            <ul className="detail-list">
              {project.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="capability-card reveal">
            <span className="capability-index">Next Step</span>
            <h3>Looking for similar work?</h3>
            <p>
              If you need a product, business website, API platform, or AI-powered workflow with similar depth, I am
              open to discussing the scope.
            </p>
            <div className="project-actions project-actions-inline">
              <a className="button" href="/contact/">
                Hire Me
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
