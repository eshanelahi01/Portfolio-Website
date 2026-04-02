import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 }
    )
    const els = ref.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="container section" ref={ref}>
      <div className="section-head reveal">
        <p className="section-kicker">About</p>
        <h2>
          Building modern web products with strong engineering foundations and practical AI features.
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-content">
          <article className="glass-card reveal">
            <p>
              I am Eshan Elahi, a Software Engineer and Full Stack Developer focused on building modern web applications
              with MERN stack, Python, and FastAPI. I create responsive frontend interfaces, scalable backend systems,
              and AI-powered features for real-world digital products.
            </p>
            <p>
              My goal is to build products that are technically strong, user-friendly, and business-focused. Whether it
              is a custom website, admin dashboard, REST API, or AI-enhanced platform, I enjoy turning ideas into
              practical working solutions.
            </p>
          </article>

          <aside className="facts-card reveal">
            <div className="fact-item">
              <span className="fact-label">Location</span>
              <strong>Pakistan</strong>
            </div>
            <div className="fact-item">
              <span className="fact-label">University</span>
              <strong>PMAS UAAR Rawalpindi</strong>
            </div>
            <div className="fact-item">
              <span className="fact-label">Current role</span>
              <strong>Junior Software Engineer</strong>
            </div>
            <div className="fact-item">
              <span className="fact-label">Focus</span>
              <strong>Full Stack Web Apps with AI</strong>
            </div>
          </aside>
        </div>

      </div>
    </section>
  )
}
