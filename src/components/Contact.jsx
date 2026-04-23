import { useState } from 'react'
import { siteConfig } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function Contact({
  standalone = false,
  title = "Let's build something exceptional together.",
  description = "If you're hiring, collaborating, or planning a product that needs full-stack development, scalable APIs, or AI integration, I'd be glad to connect.",
}) {
  const ref = useReveal({ threshold: 0.1 })
  const [formMsg, setFormMsg] = useState({ text: '', color: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setFormMsg({ text: 'Sending your message...', color: 'var(--platinum)' })

    try {
      const response = await fetch('https://formspree.io/f/mdalplgl', {
        method: 'POST',
        body: new FormData(event.target),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Failed')

      event.target.reset()
      setFormMsg({ text: 'Thanks for reaching out. I will get back to you soon.', color: '#86efac' })
    } catch {
      setFormMsg({ text: 'Something went wrong. Please try again.', color: '#fca5a5' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="container section contact-section" ref={ref} aria-labelledby="contact-title">
      <div className="contact-panel reveal">
        <div className="contact-layout">
          <div className="contact-copy">
            <div className="section-head">
              <p className="section-kicker">Contact</p>
              <h2 id="contact-title">{title}</h2>
            </div>
            <p>{description}</p>
            {siteConfig.availability ? <p className="contact-trust-note">{siteConfig.availability}</p> : null}
            {standalone ? (
              <ul className="contact-helper-list">
                <li>Full stack web applications and recruiter-facing portfolios</li>
                <li>React, Node.js, Express.js, MongoDB, Python, and FastAPI work</li>
                <li>Backend APIs, AI integrations, automation flows, and business websites</li>
              </ul>
            ) : null}
            <div className="contact-list">
              <a href={siteConfig.emailHref} aria-label="Email Eshan Elahi">
                <i className="fa-regular fa-envelope" />
              </a>
              <a href={siteConfig.github} target="_blank" rel="noopener" aria-label="Visit GitHub profile">
                <i className="fa-brands fa-github" />
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener" aria-label="Visit LinkedIn profile">
                <i className="fa-brands fa-linkedin-in" />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} action="https://formspree.io/f/mdalplgl" method="POST">
            <input type="hidden" name="_subject" value="Portfolio inquiry from eshanelahi.netlify.app" />

            <label htmlFor="contact-name">
              Name
              <input id="contact-name" type="text" name="name" placeholder="Your name" autoComplete="name" required />
            </label>

            <label htmlFor="contact-email">
              Email
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Your email"
                autoComplete="email"
                required
              />
            </label>

            <label htmlFor="contact-company">
              Company or team
              <input
                id="contact-company"
                type="text"
                name="company"
                placeholder="Optional"
                autoComplete="organization"
              />
            </label>

            <label htmlFor="contact-message">
              Project or role details
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="Tell me about the product, website, API, AI workflow, or hiring opportunity."
                required
              />
            </label>

            <div className="form-actions">
              <button className="button" type="submit" disabled={submitting}>
                <i className="fa-regular fa-paper-plane" />
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {formMsg.text ? (
              <div className="form-message" style={{ color: formMsg.color }} aria-live="polite" id="contact-status">
                {formMsg.text}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}
