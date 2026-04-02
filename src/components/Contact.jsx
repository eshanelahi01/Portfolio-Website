import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const [formMsg, setFormMsg] = useState({ text: '', color: '' })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible')
        })
      },
      { threshold: 0.1 }
    )
    const els = ref.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormMsg({ text: 'Sending your message...', color: 'var(--platinum)' })

    try {
      const res = await fetch('https://formspree.io/f/mdalplgl', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })

      if (!res.ok) throw new Error('Failed')

      e.target.reset()
      setFormMsg({ text: 'Thanks for reaching out. I will get back to you soon.', color: '#86efac' })
    } catch {
      setFormMsg({ text: 'Something went wrong. Please try again.', color: '#fca5a5' })
    }
  }

  return (
    <section id="contact" className="container section contact-section" ref={ref}>
      <div className="contact-panel reveal">
        <div className="contact-layout">
          <div className="contact-copy">
            <div className="section-head">
              <p className="section-kicker">Contact</p>
              <h2>Let's build something exceptional together.</h2>
            </div>
            <p>
              If you're hiring, collaborating, or planning a product that needs full-stack development,
              scalable APIs, or AI integration, I'd be glad to connect.
            </p>
            <div className="contact-list">
              <a href="mailto:elahieshan0@gmail.com" aria-label="Email">
                <i className="fa-regular fa-envelope" />
              </a>
              <a href="https://github.com/eshanelahi01" target="_blank" rel="noopener" aria-label="GitHub">
                <i className="fa-brands fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/eshan-elahi-3a7946357" target="_blank" rel="noopener" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in" />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="Your email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="3" placeholder="Tell me about your project or opportunity" required />
            </label>
            <div className="form-actions">
              <button className="button" type="submit">
                <i className="fa-regular fa-paper-plane" />
                Send Message
              </button>
              <a className="button button-ghost" href="/files/resume.pdf" target="_blank" rel="noopener">
                Download Resume
              </a>
            </div>
            {formMsg.text && (
              <div className="form-message" style={{ color: formMsg.color }} aria-live="polite">
                {formMsg.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
