import { useEffect, useMemo, useState } from 'react'
import Preloader from './components/Preloader'
import PageShell from './components/PageShell'
import { projects } from './data/siteContent'
import { normalizePath } from './lib/pathname'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ProjectCaseStudyPage from './pages/ProjectCaseStudyPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'

function getCurrentPath() {
  if (typeof window === 'undefined') return '/'
  return normalizePath(window.location.pathname)
}

function getProjectByPath(pathname) {
  return projects.find((project) => pathname === `/projects/${project.slug}/`) || null
}

function NotFoundPage() {
  return (
    <section className="container section page-hero" aria-labelledby="not-found-title">
      <div className="page-hero-grid">
        <div className="page-hero-copy reveal is-visible">
          <p className="section-kicker">Page Not Found</p>
          <h1 id="not-found-title">The page you are looking for is not available.</h1>
          <p className="page-hero-text">
            The strongest place to continue is the homepage, project collection, or contact page.
          </p>
          <div className="hero-actions page-actions">
            <a className="button" href="/">
              Go to Homepage
            </a>
            <a className="button button-ghost" href="/projects/">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const pathname = getCurrentPath()
  const [loading, setLoading] = useState(() => pathname === '/')

  useEffect(() => {
    if (pathname !== '/') {
      setLoading(false)
      return undefined
    }

    const hasSeenPreloader = window.sessionStorage.getItem('eshan-portfolio-preloader') === 'true'

    if (hasSeenPreloader) {
      setLoading(false)
      return undefined
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem('eshan-portfolio-preloader', 'true')
      setLoading(false)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [pathname])

  const pageContent = useMemo(() => {
    if (pathname === '/') return <HomePage />
    if (pathname === '/projects/') return <ProjectsPage />
    if (pathname === '/services/') return <ServicesPage />
    if (pathname === '/contact/') return <ContactPage />

    const project = getProjectByPath(pathname)
    if (project) return <ProjectCaseStudyPage project={project} />

    return <NotFoundPage />
  }, [pathname])

  return (
    <>
      <Preloader visible={loading} />
      <div className={`page-shell ${loading ? 'is-loading' : 'is-loaded'}`}>
        <PageShell showParticles={pathname === '/'}>{pageContent}</PageShell>
      </div>
    </>
  )
}
