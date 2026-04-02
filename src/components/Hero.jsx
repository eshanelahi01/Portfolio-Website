import { useEffect, useRef, useState } from 'react'

const typedWords = [
  'Full-Stack Web Apps',
  'MERN & FastAPI Systems',
  'Scalable Backend APIs',
  'AI-Powered Web Products',
  'Business Website Builds',
  'Modern Digital Platforms',
]

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const indexRef = useRef({ word: 0, char: 0, deleting: false })
  const sectionRef = useRef(null)

  useEffect(() => {
    let timeout
    const tick = () => {
      const { word, char, deleting } = indexRef.current
      const currentWord = typedWords[word]

      if (!deleting && char < currentWord.length) {
        indexRef.current.char++
        setDisplayText(currentWord.slice(0, indexRef.current.char))
        timeout = setTimeout(tick, 65)
      } else if (!deleting && char >= currentWord.length) {
        indexRef.current.deleting = true
        timeout = setTimeout(tick, 1600)
      } else if (deleting && char > 0) {
        indexRef.current.char--
        setDisplayText(currentWord.slice(0, indexRef.current.char))
        timeout = setTimeout(tick, 35)
      } else {
        indexRef.current.deleting = false
        indexRef.current.word = (word + 1) % typedWords.length
        timeout = setTimeout(tick, 300)
      }
    }
    tick()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible')
        })
      },
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero-section container section" ref={sectionRef}>

      <div className="hero-copy reveal">
        <h1>
          <span className="headline-gradient">Full Stack Developer</span>
          building AI-powered web apps.
        </h1>
        <p className="hero-text">
          I build modern web applications, scalable backend APIs, and intelligent digital
          solutions with MERN, Python, and FastAPI for real-world products.
        </p>

        <div className="hero-type-row">
          <span className="type-label">Focused on</span>
          <span className="type-chip">
            <span>{displayText}</span>
            <span className="cursor-blink" />
          </span>
        </div>

        <div className="hero-actions">
          <a className="button" href="#projects">
            <i className="fa-solid fa-arrow-trend-up" />
            View Projects
          </a>
          <a className="button button-ghost" href="#contact">
            <i className="fa-regular fa-paper-plane" />
            Contact Me
          </a>
        </div>

        <div className="social-row">
          <a href="https://github.com/eshanelahi01" target="_blank" rel="noopener" aria-label="GitHub">
            <i className="fa-brands fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/eshan-elahi-3a7946357" target="_blank" rel="noopener" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in" />
          </a>
          <a href="mailto:elahieshan0@gmail.com" aria-label="Email">
            <i className="fa-regular fa-envelope" />
          </a>
        </div>
      </div>

      <div className="hero-visual reveal">
        <div className="visual-card profile-panel">
          <img src="/images/myphoto.png?v=3" alt="Portrait of Eshan Elahi" />
          <div className="profile-summary">
            <h2>ESHAN ELAHI</h2>
            <p>Software Engineer</p>
          </div>
        </div>
      </div>
    </section>
  )
}
