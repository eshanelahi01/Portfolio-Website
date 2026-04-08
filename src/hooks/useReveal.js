import { useEffect, useRef } from 'react'

export default function useReveal(options = {}) {
  const ref = useRef(null)
  const threshold = options.threshold ?? 0.12
  const rootMargin = options.rootMargin ?? '0px'

  useEffect(() => {
    const node = ref.current
    if (!node || typeof window === 'undefined') return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    const revealElements = node.querySelectorAll('.reveal')

    if (revealElements.length === 0 && node.classList.contains('reveal')) {
      observer.observe(node)
    } else {
      revealElements.forEach((element) => observer.observe(element))
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return ref
}
