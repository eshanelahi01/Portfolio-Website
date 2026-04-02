import { useEffect, useRef } from 'react'
import abdanixImage from '../../assets/images/abdanix.jpeg'
import skylinkImage from '../../assets/images/skylink.jpeg'

export default function Projects() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.08 }
    )

    const els = ref.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="container section" ref={ref}>
      <div className="section-head reveal">
        <p className="section-kicker">Projects</p>
        <h2>Selected projects across full-stack platforms, business websites, and AI-powered digital products.</h2>
      </div>

      <div className="project-grid">
        <a className="project-link reveal" href="https://safar-bot.vercel.app" target="_blank" rel="noopener">
          <article className="project-card project-card-featured">
            <figure className="project-card-visual">
              <img src="/images/safarbot.png?v=1" alt="SafarBot Platform Architecture and UI Interface" />
            </figure>
            <div className="project-badge">
              <i className="fa-solid fa-star" style={{ fontSize: '0.6rem' }} /> Featured
            </div>
            <h3>SafarBot - AI Travel Booking Platform</h3>
            <p>
              Built a full-stack booking platform with MERN, Python, and AI-powered automation to support bilingual
              voice booking, fraud-aware workflows, and real-time travel intelligence for smoother user interaction.
            </p>
            <div className="tag-row">
              <span>React.js</span>
              <span>Node.js</span>
              <span>FastAPI</span>
              <span>MongoDB</span>
              <span>REST APIs</span>
            </div>
          </article>
        </a>

        <a className="project-link reveal" href="https://onyx-closings.vercel.app" target="_blank" rel="noopener">
          <article className="project-card">
            <figure className="project-card-visual">
              <img src="/images/onyx.jpeg?v=1" alt="Onyx Closings" />
            </figure>
            <h3>Onyx Closings</h3>
            <p>Built a polished business website focused on clear messaging, premium presentation, and a smooth client-facing experience.</p>
            <div className="tag-row">
              <span>Business Website</span>
              <span>Responsive UI</span>
              <span>Frontend</span>
            </div>
          </article>
        </a>

        <a className="project-link reveal" href="https://www.abdanixsolutions.com" target="_blank" rel="noopener">
          <article className="project-card">
            <figure className="project-card-visual">
              <img src={abdanixImage} alt="ABDANIX Solutions Website" />
            </figure>
            <h3>ABDANIX Solutions Website</h3>
            <p>Designed and built the company website to present services clearly, strengthen brand credibility, and deliver a modern responsive experience.</p>
            <div className="tag-row">
              <span>Corporate Website</span>
              <span>Responsive Design</span>
              <span>Frontend</span>
            </div>
          </article>
        </a>

        <a className="project-link reveal" href="https://skylinkmobileshop.netlify.app/" target="_blank" rel="noopener">
          <article className="project-card">
            <figure className="project-card-visual">
              <img src={skylinkImage} alt="Skylink Mobile Shop" />
            </figure>
            <h3>Skylink Mobile Shop</h3>
            <p>Built a responsive mobile shop website with a clean storefront layout to present products clearly and create a smooth browsing experience for customers.</p>
            <div className="tag-row">
              <span>E-commerce UI</span>
              <span>Responsive Design</span>
              <span>Frontend</span>
            </div>
          </article>
        </a>
      </div>
    </section>
  )
}
