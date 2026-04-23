import { useEffect, useMemo, useState } from 'react'
import { siteConfig } from '../data/siteContent'
import { isHomePath, normalizePath } from '../lib/pathname'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  const onHomePage = isHomePath(pathname)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!onHomePage) {
      setActiveSection('')
      return undefined
    }

    const sections = ['home', 'summary', 'tech-stack', 'projects', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.08 }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [onHomePage])

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

  const navItems = useMemo(
    () => [
      { href: '/#summary', label: 'About', section: 'summary', route: '/' },
      { href: '/#tech-stack', label: 'Expertise', section: 'tech-stack', route: '/' },
      { href: '/services/', label: 'Services', route: '/services/' },
      { href: '/projects/', label: 'Projects', route: '/projects/' },
      { href: '/contact/', label: 'Contact', route: '/contact/' },
    ],
    []
  )

  const handleNavClick = () => setMobileOpen(false)

  const isActive = (item) => {
    if (item.route !== '/' && pathname.startsWith(item.route)) return true
    if (onHomePage && activeSection === 'home' && item.section === 'summary') return true
    if (onHomePage && item.section) return activeSection === item.section
    return pathname === item.route && !item.section
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-wrap">
          <a className="brand nav-profile-brand" href="/" aria-label="Go to homepage">
            <span className="nav-profile-avatar" aria-hidden="true">
              <img src={siteConfig.brandImage} alt="" width="56" height="56" />
            </span>
            <span className="brand-copy nav-profile-copy">
              <strong>{siteConfig.name}</strong>
              <small>{siteConfig.fullRole}</small>
            </span>
          </a>

          <nav className="main-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={isActive(item) ? 'is-active' : ''}
                aria-current={isActive(item) ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="button button-ghost nav-talk" href="/contact/" aria-label="Go to contact page">
            Let&apos;s Talk
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

      <div id="mobile-nav" className={`mobile-nav ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <i className="fa-solid fa-xmark" />
        </button>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={handleNavClick}>
            {item.label}
          </a>
        ))}
        <a className="button mobile-nav-cta" href="/contact/" onClick={handleNavClick}>
          Let&apos;s Talk
        </a>
      </div>
    </>
  )
}
