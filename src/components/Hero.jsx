import { useEffect, useRef, useState } from 'react'
import { heroHighlights, heroTypedWords, siteConfig } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const indexRef = useRef({ word: 0, char: 0, deleting: false })
  const sectionRef = useReveal({ threshold: 0.1 })

  useEffect(() => {
    let timeout

    const tick = () => {
      const { word, char, deleting } = indexRef.current
      const currentWord = heroTypedWords[word]

      if (!deleting && char < currentWord.length) {
        indexRef.current.char += 1
        setDisplayText(currentWord.slice(0, indexRef.current.char))
        timeout = setTimeout(tick, 65)
      } else if (!deleting && char >= currentWord.length) {
        indexRef.current.deleting = true
        timeout = setTimeout(tick, 1600)
      } else if (deleting && char > 0) {
        indexRef.current.char -= 1
        setDisplayText(currentWord.slice(0, indexRef.current.char))
        timeout = setTimeout(tick, 35)
      } else {
        indexRef.current.deleting = false
        indexRef.current.word = (word + 1) % heroTypedWords.length
        timeout = setTimeout(tick, 300)
      }
    }

    tick()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section id="home" className="hero-section container section" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <p className="section-kicker">Software Engineer | Full Stack Developer | AI Automation Developer</p>
        <h1 id="hero-title">
          <span className="headline-gradient">Software Engineer and Full Stack Developer</span>
          building AI-powered web applications and scalable APIs.
        </h1>
        <p className="hero-text">
          I build modern products with React, Node.js, Express.js, MongoDB, Python, and FastAPI for recruiters,
          founders, agencies, and businesses that need strong frontend execution, reliable backend systems, and
          practical AI integration.
        </p>

        <div className="hero-type-row">
          <span className="type-label">Focused on</span>
          <span className="type-chip">
            <span>{displayText}</span>
            <span className="cursor-blink" />
          </span>
        </div>

        <div className="hero-actions">
          <a className="button" href="/projects/">
            <i className="fa-solid fa-arrow-trend-up" />
            View Projects
          </a>
          <a className="button button-ghost" href="/contact/">
            <i className="fa-regular fa-paper-plane" />
            Hire Me
          </a>
          <a className="button button-ghost" href={siteConfig.resumePath} target="_blank" rel="noopener">
            <i className="fa-regular fa-file-lines" />
            Download Resume
          </a>
        </div>

        <div className="hero-proof-row" aria-label="Core specialties">
          {heroHighlights.map((item) => (
            <span key={item} className="hero-proof-chip">
              {item}
            </span>
          ))}
        </div>

        <p className="hero-note">{siteConfig.availability}</p>

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

      <div className="hero-visual reveal">
        <div className="visual-card profile-panel">
          <img
            src={siteConfig.portraitImage}
            srcSet="/images/myphoto-720.jpg 720w, /images/og-cover.jpg 1200w"
            sizes="(max-width: 1024px) 70vw, 320px"
            alt="Portrait of Eshan Elahi, software engineer and full stack developer."
            width="720"
            height="1280"
            decoding="async"
            fetchPriority="high"
          />
          <div className="profile-summary">
            <h2>{siteConfig.name.toUpperCase()}</h2>
            <p>{siteConfig.fullRole}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
