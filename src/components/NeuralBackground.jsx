import { useEffect, useRef } from 'react'

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    setSize()

    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight

    const NUM = 60
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4
    }))

    let mx = -9999
    let my = -9999
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const onLeave = () => { mx = -9999; my = -9999 }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    const render = () => {
      ctx.clearRect(0, 0, w(), h())

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w()) p.vx *= -1
        if (p.y < 0 || p.y > h()) p.vy *= -1

        // mouse repel
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.hypot(dx, dy)
        if (dist < 120) {
          p.x += (dx / dist) * 0.4
          p.y += (dy / dist) * 0.4
        }
      })

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.35
            ctx.strokeStyle = `rgba(163, 230, 53, ${alpha * 0.4})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // particles
      particles.forEach((p) => {
        const dx = p.x - mx
        const dy = p.y - my
        const near = Math.hypot(dx, dy) < 140
        ctx.fillStyle = near ? 'rgba(163, 230, 53, 0.9)' : 'rgba(228, 228, 231, 0.5)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(render)
    }
    render()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: 'block' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/30 to-ink-950" />
    </div>
  )
}
