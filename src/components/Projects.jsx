import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'
import { featuredProjects, supportingProjects } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

const HOME_PROJECT_ORDER = ['softgen-ai', 'freight-insurance-data', 'dynaboard']
const PROJECTS_PER_PAGE = 3

export default function Projects({ standalone = false }) {
  const ref = useReveal({ threshold: 0.08 })
  const [pageIndex, setPageIndex] = useState(0)
  const projects = useMemo(() => [...featuredProjects, ...supportingProjects], [])
  const homeProjects = useMemo(() => {
    const priorityProjects = HOME_PROJECT_ORDER.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean)
    const remainingProjects = projects.filter((project) => !HOME_PROJECT_ORDER.includes(project.slug))

    return [...priorityProjects, ...remainingProjects]
  }, [projects])
  const totalPages = Math.max(1, Math.ceil(homeProjects.length / PROJECTS_PER_PAGE))
  const carouselProjects = homeProjects.slice(pageIndex * PROJECTS_PER_PAGE, pageIndex * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE)
  const visibleProjects = standalone ? projects : carouselProjects
  const showCarouselControls = !standalone && totalPages > 1

  const showNextProjects = () => {
    setPageIndex((currentPage) => (currentPage + 1) % totalPages)
  }

  return (
    <section id="projects" className="container section" ref={ref} aria-labelledby="projects-title">
      <div className="section-head reveal">
        <h2 id="projects-title">
          Featured <span>Projects</span>
        </h2>
        <p>
          {standalone
            ? 'Selected work across AI-integrated products, business websites, and responsive web development.'
            : 'Featured case studies that show full stack delivery, frontend execution, and AI-powered product thinking.'}
        </p>
        <div className="project-filter-row" aria-hidden="true">
          <span>All Projects</span>
          <span>Featured</span>
        </div>
      </div>

      {standalone ? (
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <div key={project.slug} className={`project-link reveal reveal-delay-${(index % 4) + 1}`}>
              <ProjectCard project={project} featured={project.caseStudy} />
            </div>
          ))}
        </div>
      ) : (
        <div className="project-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageIndex}
              className="project-grid project-carousel-grid"
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -70 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  className={`project-link reveal reveal-delay-${(index % 4) + 1}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: index * 0.06, ease: 'easeOut' }}
                >
                  <ProjectCard project={project} featured={project.caseStudy} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {showCarouselControls ? (
            <button className="project-carousel-next" type="button" onClick={showNextProjects} aria-label="Show more projects">
              <i className="fa-solid fa-arrow-right" />
            </button>
          ) : null}
        </div>
      )}

      {!standalone ? (
        <div className="page-callout reveal">
          <p>Need deeper project detail? Explore the dedicated case studies or get in touch about building something similar.</p>
          <div className="page-callout-actions">
            <a className="button" href="/projects/">
              View All Projects
            </a>
            <a className="button button-ghost" href="/contact/">
              Contact Me
            </a>
          </div>
        </div>
      ) : null}
    </section>
  )
}
