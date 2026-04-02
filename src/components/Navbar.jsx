import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['about', 'work', 'projects', 'experience', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false)
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#work', label: 'Work' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleNavClick = () => setMobileOpen(false)

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="Go to top">
            <span className="brand-mark">
              <img src="/images/myhero.png?v=2" alt="Eshan Elahi" />
            </span>
            <span className="brand-copy">
              <strong>Eshan Elahi</strong>
              <small>Software Engineer</small>
            </span>
          </a>

          <nav className="main-nav" aria-label="Primary navigation">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={activeSection === href.slice(1) ? 'is-active' : ''}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            className="button button-ghost button-nav desktop-only"
            href="/files/resume.pdf"
            target="_blank"
            rel="noopener"
          >
            Resume
          </a>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </header>

      <div id="mobile-nav" className={`mobile-nav ${mobileOpen ? 'is-open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <i className="fa-solid fa-xmark" />
        </button>
        {navItems.map(({ href, label }) => (
          <a key={href} href={href} onClick={handleNavClick}>
            {label}
          </a>
        ))}
        <a className="button" href="/files/resume.pdf" target="_blank" rel="noopener" onClick={handleNavClick}>
          Resume
        </a>
      </div>
    </>
  )
}
