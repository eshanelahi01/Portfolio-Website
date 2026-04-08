export default function ProjectCard({ project, featured = false }) {
  const articleClassName = `project-card ${featured ? 'project-card-featured' : ''}`
  const caseStudyHref = project.caseStudy ? `/projects/${project.slug}/` : project.liveUrl

  return (
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

      {featured ? (
        <div className="project-badge">
          <i className="fa-solid fa-star" style={{ fontSize: '0.6rem' }} /> Featured Case Study
        </div>
      ) : null}

      <div className="project-meta-row">
        <span>{project.category}</span>
        <span>{project.proof[0]}</span>
      </div>

      <h3>{project.title}</h3>
      <p>{project.teaser}</p>

      <ul className="project-points" aria-label={`${project.title} key proof points`}>
        {project.proof.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="tag-row">
        {project.stack.slice(0, 5).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-actions">
        <a
          className="button"
          href={caseStudyHref}
          target={project.caseStudy ? undefined : '_blank'}
          rel={project.caseStudy ? undefined : 'noopener'}
        >
          {project.caseStudy ? 'View Case Study' : 'View Project'}
        </a>
        <a className="button button-ghost" href={project.liveUrl} target="_blank" rel="noopener">
          Visit Live Site
        </a>
      </div>
    </article>
  )
}
