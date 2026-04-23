import { useEffect, useState } from 'react'

export default function ProjectCard({ project, featured = false }) {
  const [open, setOpen] = useState(false)
  const articleClassName = `project-card ${featured ? 'project-card-featured' : ''}`
  const dialogTitleId = `${project.slug}-dialog-title`
  const dialogDescriptionId = `${project.slug}-dialog-description`

  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <>
      <article className={articleClassName}>
        <figure className="project-card-visual">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            width="1600"
            height="900"
          />
        </figure>

        <h3>{project.title}</h3>

        <div className="tag-row">
          {project.stack.slice(0, 5).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="project-actions">
          <button className="button" type="button" onClick={() => setOpen(true)}>
            Learn More
          </button>
          {project.liveUrl ? (
            <a className="button button-ghost" href={project.liveUrl} target="_blank" rel="noopener">
              Visit Site
            </a>
          ) : null}
        </div>
      </article>

      {open ? (
        <div
          className="project-modal-backdrop"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <article
            className="project-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescriptionId}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="project-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close">
              <span aria-hidden="true">X</span>
            </button>
            <p className="section-kicker">{project.category}</p>
            <h3 id={dialogTitleId}>{project.title}</h3>
            <p id={dialogDescriptionId}>{project.summary}</p>
            <div className="tag-row">
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="project-actions">
              <a className="button" href={`/projects/${project.slug}/`}>
                View Case Study
              </a>
              {project.liveUrl ? (
                <a className="button button-ghost" href={project.liveUrl} target="_blank" rel="noopener">
                  Visit Site
                </a>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </>
  )
}
