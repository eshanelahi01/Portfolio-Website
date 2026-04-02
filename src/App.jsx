import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import BackgroundGlow from './components/BackgroundGlow'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader visible={loading} />
      <div className={`page-shell ${loading ? 'is-loading' : 'is-loaded'}`}>
        <div className="noise-overlay" />
        <div className="grid-overlay" />
        <BackgroundGlow />
        <ParticleCanvas />
        <Navbar />
        <main id="home">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
