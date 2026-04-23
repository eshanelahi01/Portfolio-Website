import Breadcrumbs from '../components/Breadcrumbs'
import Contact from '../components/Contact'
import SchemaMarkup from '../components/SchemaMarkup'
import useReveal from '../hooks/useReveal'
import { getBreadcrumbSchema, getContactPageSchemas } from '../lib/schema'

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact/' },
]

export default function ContactPage() {
  const ref = useReveal({ threshold: 0.08 })

  return (
    <div ref={ref}>
      <SchemaMarkup items={[...getContactPageSchemas(), getBreadcrumbSchema(breadcrumbItems)]} />

      <section className="container section page-hero" aria-labelledby="contact-page-title">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="page-hero-grid">
          <div className="page-hero-copy reveal">
            <p className="section-kicker">Contact</p>
            <h1 id="contact-page-title">
              Hire Eshan Elahi for full stack MERN development, backend APIs, and AI-powered web
              product work.
            </h1>
            <p className="page-hero-text">
              Whether you are hiring, planning a freelance build, or exploring a product idea, this is the best place
              to start the conversation.
            </p>
          </div>

          <div className="page-hero-card reveal">
            <h2>Helpful details to share</h2>
            <ul className="detail-list">
              <li>What you are building or hiring for</li>
              <li>The stack, features, or integrations involved</li>
              <li>Whether you need a website, full stack app, API, or AI workflow</li>
            </ul>
          </div>
        </div>
      </section>

      <Contact
        standalone
        title="Tell me about your project, role, or collaboration opportunity."
        description="I work across React, Node.js, Express.js, MongoDB, Python, FastAPI, backend APIs, and AI-integrated web products. Use the form below or reach out directly."
      />
    </div>
  )
}
