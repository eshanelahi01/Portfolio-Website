import { siteConfig } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function Hero() {
  const sectionRef = useReveal({ threshold: 0.1 })

  return (
    <section id="home" className="hero-section container section" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <p className="section-kicker">I am {siteConfig.name}</p>
        <h1 id="hero-title">
          I build <span className="headline-gradient">AI-powered web applications</span> and scalable MERN products.
        </h1>
        <p className="hero-role">Full Stack Developer | MERN Developer</p>
        <p className="hero-text">{siteConfig.headline}</p>

        <div className="hero-actions">
          <a className="button" href="/contact/">
            Let's Talk
          </a>
          <a className="button button-ghost" href="/projects/">
            View Projects
          </a>
        </div>

        <div className="social-row">
          <a href={siteConfig.github} target="_blank" rel="noopener" aria-label="Visit Eshan Elahi GitHub profile">
            <i className="fa-brands fa-github" />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener" aria-label="Visit Eshan Elahi LinkedIn profile">
            <i className="fa-brands fa-linkedin-in" />
          </a>
          <a href={siteConfig.emailHref} aria-label="Email Eshan Elahi">
            <i className="fa-regular fa-envelope" />
          </a>
        </div>
      </div>

      <aside className="hero-profile-card reveal reveal-delay-2" aria-label={`${siteConfig.name} profile card`}>
        <img
          src={siteConfig.portraitImage}
          srcSet="/images/myphoto-720.jpg 720w, /images/og-cover.jpg 1200w"
          sizes="(max-width: 900px) 78vw, 320px"
          alt="Portrait of Eshan Elahi, full stack MERN developer."
          width="720"
          height="1280"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-profile-copy">
          <h2>{siteConfig.name}</h2>
          <p>{siteConfig.fullRole}</p>
        </div>
      </aside>
    </section>
  )
}
