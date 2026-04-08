import About from '../components/About'
import Contact from '../components/Contact'
import CoreExpertise from '../components/CoreExpertise'
import Experience from '../components/Experience'
import FaqSection from '../components/FaqSection'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import SchemaMarkup from '../components/SchemaMarkup'
import ServicesSection from '../components/ServicesSection'
import Skills from '../components/Skills'
import WhyWorkWithMe from '../components/WhyWorkWithMe'
import { getHomeSchemas } from '../lib/schema'

export default function HomePage() {
  return (
    <>
      <SchemaMarkup items={getHomeSchemas()} />
      <Hero />
      <About />
      <CoreExpertise />
      <ServicesSection />
      <Projects />
      <Experience />
      <Skills />
      <WhyWorkWithMe />
      <FaqSection />
      <Contact />
    </>
  )
}

