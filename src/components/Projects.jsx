import ProjectCard from './ProjectCard'
import { featuredProjects, supportingProjects } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function Projects({ standalone = false }) {
  const ref = useReveal({ threshold: 0.08 })
  const projects = [...featuredProjects, ...supportingProjects]

  return (
    <section id="projects" className="container section" ref={ref} aria-labelledby="projects-title">
      <div className="section-head reveal">
        <p className="section-kicker">Projects</p>
        <h2 id="projects-title">
          {standalone
            ? 'Selected work across AI-integrated products, business websites, and responsive web development.'
            : 'Featured case studies that show full stack delivery, frontend execution, and AI-powered product thinking.'}
        </h2>
      </div>

      <div className="project-grid">
        {projects.map((project, index) => (
          <div key={project.slug} className={`project-link reveal reveal-delay-${(index % 4) + 1}`}>
            <ProjectCard project={project} featured={project.caseStudy} />
          </div>
        ))}
      </div>

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
