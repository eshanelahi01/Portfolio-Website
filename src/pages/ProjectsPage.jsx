import Breadcrumbs from '../components/Breadcrumbs'
import Projects from '../components/Projects'
import SchemaMarkup from '../components/SchemaMarkup'
import useReveal from '../hooks/useReveal'
import { getBreadcrumbSchema, getProjectsPageSchemas } from '../lib/schema'

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Projects', url: '/projects/' },
]

export default function ProjectsPage() {
  const ref = useReveal({ threshold: 0.08 })

  return (
    <div ref={ref}>
      <SchemaMarkup items={[...getProjectsPageSchemas(), getBreadcrumbSchema(breadcrumbItems)]} />

      <section className="container section page-hero" aria-labelledby="projects-page-title">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="page-hero-grid">
          <div className="page-hero-copy reveal">
            <p className="section-kicker">Project Portfolio</p>
            <h1 id="projects-page-title">
              Full stack and AI-focused project work that shows how I approach products, business websites, APIs, and
              practical automation.
            </h1>
            <p className="page-hero-text">
              These projects show the range of work I do across full stack MERN development, backend API
              implementation, AI integration, and business-focused frontend delivery.
            </p>
          </div>

          <div className="page-hero-card reveal">
            <h2>What you will find here</h2>
            <ul className="detail-list">
              <li>Project summaries written for recruiters, clients, and technical reviewers</li>
              <li>Clear role descriptions, stack details, and problem-solution framing</li>
              <li>Business-facing outcomes and proof of full stack development capability</li>
            </ul>
          </div>
        </div>
      </section>

      <Projects standalone />
    </div>
  )
}
