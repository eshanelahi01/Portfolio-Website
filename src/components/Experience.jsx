import { useEffect, useRef } from 'react'

const timeline = [
  {
    date: 'Oct 2022 - Present',
    title: 'BS Software Engineering',
    description: 'PMAS Arid Agriculture University, Rawalpindi',
  },
  {
    date: 'Apr 2025 - Jul 2025',
    title: 'Full Stack Developer Intern at ABDANIX Solutions',
    description: 'Contributed to frontend and backend development, supported responsive web experiences, and helped deliver full-stack features for production-focused projects.',
  },
  {
    date: 'Jul 2025 - Present',
    title: 'Software Engineer at ABDANIX Solutions',
    description: 'Contributing to full-stack product development, API engineering, business websites, and AI-integrated features for production-ready solutions.',
  },
]

export default function Experience() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 }
    )

    const els = ref.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="container section" ref={ref}>
      <div className="section-head reveal">
        <p className="section-kicker">Journey</p>
        <h2>Academic and professional experience shaping strong foundations in software engineering.</h2>
      </div>

      <div className="timeline">
        {timeline.map((item, i) => (
          <article key={i} className={`timeline-item reveal reveal-delay-${i + 1}`}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
