import BackgroundGlow from './BackgroundGlow'
import Footer from './Footer'
import Navbar from './Navbar'
import ParticleCanvas from './ParticleCanvas'

export default function PageShell({ children, showParticles = true }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="noise-overlay" />
      <div className="grid-overlay" />
      <BackgroundGlow />
      {showParticles ? <ParticleCanvas /> : null}
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

