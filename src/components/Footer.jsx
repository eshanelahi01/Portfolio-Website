import { footerLinks, projectFooterLinks, siteConfig } from '../data/siteContent'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <h3>{siteConfig.name}</h3>
          <p>
            {siteConfig.name} is a software engineer and full stack developer specializing in React, Node.js,
            Express.js, MongoDB, Python, FastAPI, REST APIs, AI automation, AI agents, and AI-powered web applications.
          </p>
          <p>{siteConfig.availability}</p>
        </div>

        <div className="footer-links-block">
          <h3>Explore</h3>
          <nav className="footer-links" aria-label="Footer navigation">
            {footerLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-contact-block">
          <h3>Featured Work</h3>
          <div className="footer-contact-list">
            {projectFooterLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('http') || item.href.endsWith('.pdf') ? '_blank' : undefined}
                rel={item.href.startsWith('http') || item.href.endsWith('.pdf') ? 'noopener' : undefined}
              >
                {item.label}
              </a>
            ))}
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
            <a href={siteConfig.github} target="_blank" rel="noopener">
              github.com/eshanelahi01
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{`\u00A9 ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}</p>
      </div>
    </footer>
  )
}
