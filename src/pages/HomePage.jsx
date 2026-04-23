import About from '../components/About'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import SchemaMarkup from '../components/SchemaMarkup'
import Skills from '../components/Skills'
import { getHomeSchemas } from '../lib/schema'

export default function HomePage() {
  return (
    <>
      <SchemaMarkup items={getHomeSchemas()} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  )
}
