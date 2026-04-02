export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <h3>Eshan Elahi</h3>
          <p>
            Software engineering services focused on full-stack web development, scalable backend systems, and
            AI-powered features built for modern businesses.
          </p>
        </div>

        <div className="footer-links-block">
          <h3>Quick Links</h3>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="footer-contact-block">
          <h3>Contact</h3>
          <div className="footer-contact-list">
            <a href="mailto:elahieshan0@gmail.com">elahieshan0@gmail.com</a>
            <a href="https://github.com/eshanelahi01" target="_blank" rel="noopener">github.com/eshanelahi01</a>
            <a href="https://www.linkedin.com/in/eshan-elahi-3a7946357" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Eshan Elahi. All rights reserved.</p>
      </div>
    </footer>
  )
}
