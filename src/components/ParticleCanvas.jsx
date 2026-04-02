import { useRef, useEffect } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animId
    let time = 0
    let isRunning = true
    let viewport = { width: 0, height: 0 }

    const mouse = {
      x: -999,
      y: -999,
      active: false,
      glow: 0,
      targetGlow: 0,
    }

    const particles = []

    const getSettings = (width) => {
      if (width <= 540) {
        return { particleCount: 42, connectionDistance: 92, mouseDistance: 120 }
      }

      if (width <= 900) {
        return { particleCount: 68, connectionDistance: 116, mouseDistance: 156 }
      }

      return { particleCount: 108, connectionDistance: 140, mouseDistance: 200 }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      viewport = {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
      }

      canvas.width = viewport.width * dpr
      canvas.height = viewport.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const createParticles = () => {
      particles.length = 0
      const { particleCount } = getSettings(viewport.width)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * viewport.width,
          y: Math.random() * viewport.height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          size: Math.random() * 1.8 + 0.45,
          opacity: Math.random() * 0.42 + 0.16,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const handleResize = () => {
      resize()
      createParticles()
    }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
      mouse.active = true
      mouse.targetGlow = 1
    }

    const handleMouseLeave = () => {
      mouse.active = false
      mouse.targetGlow = 0
      mouse.x = -999
      mouse.y = -999
    }

    const render = () => {
      if (!isRunning) return

      time += 0.008
      mouse.glow += (mouse.targetGlow - mouse.glow) * 0.08

      const { connectionDistance, mouseDistance } = getSettings(viewport.width)
      ctx.clearRect(0, 0, viewport.width, viewport.height)

      if (mouse.glow > 0.02) {
        const outerRadius = mouseDistance * (1 + mouse.glow * 0.18)
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, outerRadius)
        gradient.addColorStop(0, 'rgba(232, 212, 139, 0.18)')
        gradient.addColorStop(0.28, 'rgba(201, 168, 76, 0.12)')
        gradient.addColorStop(0.65, 'rgba(201, 168, 76, 0.05)')
        gradient.addColorStop(1, 'rgba(201, 168, 76, 0)')

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, outerRadius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        particle.x += particle.vx + Math.sin(time + particle.phase) * 0.14
        particle.y += particle.vy + Math.cos(time + particle.phase) * 0.1

        if (particle.x < -8) particle.x = viewport.width + 8
        if (particle.x > viewport.width + 8) particle.x = -8
        if (particle.y < -8) particle.y = viewport.height + 8
        if (particle.y > viewport.height + 8) particle.y = -8

        let mouseInfluence = 0

        if (mouse.active) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.hypot(dx, dy)

          if (distance < mouseDistance) {
            mouseInfluence = 1 - distance / mouseDistance
            particle.x -= dx * 0.0075
            particle.y -= dy * 0.0075
          }
        }

        const glow = particle.opacity + mouseInfluence * 0.55 + mouse.glow * 0.06

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size + mouseInfluence * 1.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${Math.min(glow, 0.9)})`
        ctx.fill()

        if (mouseInfluence > 0.16) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 4.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(201, 168, 76, ${mouseInfluence * 0.1})`
          ctx.fill()
        }

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.hypot(dx, dy)

          if (distance < connectionDistance) {
            const alpha = (1 - distance / connectionDistance) * (0.11 + mouse.glow * 0.06)
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    const handleVisibilityChange = () => {
      const shouldRun = !document.hidden

      if (shouldRun === isRunning) return

      isRunning = shouldRun

      if (isRunning) {
        animId = requestAnimationFrame(render)
      } else {
        cancelAnimationFrame(animId)
      }
    }

    resize()
    createParticles()

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
    />
  )
}
