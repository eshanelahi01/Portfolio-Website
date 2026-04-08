import { faqItems } from '../data/siteContent'
import useReveal from '../hooks/useReveal'

export default function FaqSection() {
  const ref = useReveal({ threshold: 0.08 })

  return (
    <section id="faq" className="container section" ref={ref} aria-labelledby="faq-title">
      <div className="section-head reveal">
        <p className="section-kicker">FAQ</p>
        <h2 id="faq-title">
          Direct answers for recruiters, founders, agencies, and businesses evaluating Eshan Elahi for software
          engineering, full stack development, and AI integration work.
        </h2>
      </div>

      <div className="faq-grid">
        {faqItems.map((item, index) => (
          <details key={item.question} className={`faq-item reveal reveal-delay-${(index % 4) + 1}`}>
            <summary className="faq-question">{item.question}</summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

