import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 768) return

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const down = () => setClicking(true)
    const up = () => setClicking(false)

    const over = (e) => {
      if (e.target.closest('a, button, .project-card, .capability-card, input, textarea, .social-row a, .contact-list a')) {
        setHovering(true)
      }
    }
    const out = (e) => {
      if (e.target.closest('a, button, .project-card, .capability-card, input, textarea, .social-row a, .contact-list a')) {
        setHovering(false)
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    let raf
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px'
        dotRef.current.style.top = pos.current.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'is-hovering' : ''} ${clicking ? 'is-clicking' : ''}`}
      />
    </>
  )
}
