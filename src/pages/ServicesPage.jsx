import Breadcrumbs from '../components/Breadcrumbs'
import Contact from '../components/Contact'
import SchemaMarkup from '../components/SchemaMarkup'
import ServicesSection from '../components/ServicesSection'
import WhyWorkWithMe from '../components/WhyWorkWithMe'
import useReveal from '../hooks/useReveal'
import { getBreadcrumbSchema, getServicesPageSchemas } from '../lib/schema'

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services/' },
]

export default function ServicesPage() {
  const ref = useReveal({ threshold: 0.08 })

  return (
    <div ref={ref}>
      <SchemaMarkup items={[...getServicesPageSchemas(), getBreadcrumbSchema(breadcrumbItems)]} />

      <section className="container section page-hero" aria-labelledby="services-page-title">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="page-hero-grid">
          <div className="page-hero-copy reveal">
            <p className="section-kicker">Services</p>
            <h1 id="services-page-title">
              Full stack software development, backend API work, and AI automation services built around real product
              needs.
            </h1>
            <p className="page-hero-text">
              I help teams and businesses build web applications, API systems, business websites, and AI-powered
              workflows with React, Node.js, MongoDB, Python, and FastAPI.
            </p>
          </div>

          <div className="page-hero-card reveal">
            <h2>Good fit for</h2>
            <ul className="detail-list">
              <li>Recruiters hiring for software engineering, MERN, React, or backend roles</li>
              <li>Founders who need a product MVP, admin dashboard, or customer-facing web app</li>
              <li>Agencies and businesses looking for AI automation or website development support</li>
            </ul>
          </div>
        </div>
      </section>

      <ServicesSection standalone />
      <WhyWorkWithMe />
      <Contact
        standalone
        title="Start a conversation about your product, service, or engineering need."
        description="Share the kind of product, website, API, or AI workflow you need. I can review the scope and help you move toward the next practical step."
      />
    </div>
  )
}

