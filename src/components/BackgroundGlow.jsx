import { useEffect, useRef } from 'react'

export default function BackgroundGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const glow = glowRef.current
    if (!glow) return undefined

    const current = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.28,
      opacity: 0.18,
      scale: 1,
    }

    const target = { ...current }
    let rafId

    const render = () => {
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      current.opacity += (target.opacity - current.opacity) * 0.08
      current.scale += (target.scale - current.scale) * 0.08

      glow.style.setProperty('--glow-x', `${current.x}px`)
      glow.style.setProperty('--glow-y', `${current.y}px`)
      glow.style.setProperty('--glow-opacity', current.opacity.toFixed(3))
      glow.style.setProperty('--glow-scale', current.scale.toFixed(3))

      rafId = requestAnimationFrame(render)
    }

    const handleMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      target.opacity = 0.72
      target.scale = 1.06
    }

    const handleLeave = () => {
      target.opacity = 0.16
      target.scale = 1
    }

    const handleWindowMouseOut = (event) => {
      if (!event.relatedTarget) handleLeave()
    }

    const handleTouchStart = () => {
      target.opacity = 0
    }

    render()

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('blur', handleLeave)
    window.addEventListener('mouseout', handleWindowMouseOut)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('blur', handleLeave)
      window.removeEventListener('mouseout', handleWindowMouseOut)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return <div ref={glowRef} className="ambient-glow" aria-hidden="true" />
}
