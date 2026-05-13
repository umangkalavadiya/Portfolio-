import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { graphData } from '../data/portfolio.js'
import { Network, MousePointer2 } from 'lucide-react'

const TYPE_COLORS = {
  self: '#a3e635',
  domain: '#fafafa',
  tool: '#a1a1aa',
  company: '#fde047',
  project: '#67e8f9'
}

const TYPE_LABELS = {
  self: 'Core',
  domain: 'Domain',
  tool: 'Tool / Framework',
  company: 'Company',
  project: 'Project'
}

// Lightweight force-directed simulation
function buildSim(width, height) {
  const nodes = graphData.nodes.map((n, i) => ({
    ...n,
    x: width / 2 + (Math.random() - 0.5) * 200,
    y: height / 2 + (Math.random() - 0.5) * 200,
    vx: 0,
    vy: 0,
    fx: n.id === 'umang' ? width / 2 : null,
    fy: n.id === 'umang' ? height / 2 : null
  }))
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const links = graphData.links.map((l) => ({
    source: byId[l.source],
    target: byId[l.target]
  }))
  return { nodes, links, byId }
}

function step(sim, width, height) {
  const { nodes, links } = sim
  const REPEL = 1400
  const SPRING = 0.012
  const SPRING_LEN = 110
  const CENTER = 0.003
  const DAMPING = 0.85

  // repulsion
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      let d2 = dx * dx + dy * dy
      if (d2 < 1) d2 = 1
      const f = REPEL / d2
      const d = Math.sqrt(d2)
      const fx = (dx / d) * f
      const fy = (dy / d) * f
      a.vx -= fx
      a.vy -= fy
      b.vx += fx
      b.vy += fy
    }
  }

  // springs
  links.forEach((l) => {
    const dx = l.target.x - l.source.x
    const dy = l.target.y - l.source.y
    const d = Math.sqrt(dx * dx + dy * dy) || 1
    const diff = d - SPRING_LEN
    const fx = (dx / d) * diff * SPRING
    const fy = (dy / d) * diff * SPRING
    l.source.vx += fx
    l.source.vy += fy
    l.target.vx -= fx
    l.target.vy -= fy
  })

  // center gravity + integrate
  nodes.forEach((n) => {
    n.vx += (width / 2 - n.x) * CENTER
    n.vy += (height / 2 - n.y) * CENTER
    n.vx *= DAMPING
    n.vy *= DAMPING

    if (n.fx !== null) {
      n.x = n.fx
      n.y = n.fy
    } else {
      n.x += n.vx
      n.y += n.vy
      // bounds
      const pad = 40
      if (n.x < pad) { n.x = pad; n.vx = 0 }
      if (n.x > width - pad) { n.x = width - pad; n.vx = 0 }
      if (n.y < pad) { n.y = pad; n.vy = 0 }
      if (n.y > height - pad) { n.y = height - pad; n.vy = 0 }
    }
  })
}

export default function KnowledgeGraph() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const simRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const dragRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, inside: false })

  const connectedIds = useMemo(() => {
    const active = selected || hovered
    if (!active) return null
    const set = new Set([active])
    graphData.links.forEach((l) => {
      if (l.source === active || l.target === active) {
        set.add(l.source)
        set.add(l.target)
      }
    })
    return set
  }, [hovered, selected])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    let raf

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = wrap.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      if (!simRef.current) {
        simRef.current = buildSim(rect.width, rect.height)
      } else {
        // re-anchor center node
        const umang = simRef.current.byId['umang']
        umang.fx = rect.width / 2
        umang.fy = rect.height / 2
      }
    }
    setSize()

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.inside = true

      if (dragRef.current) {
        dragRef.current.node.fx = mouseRef.current.x
        dragRef.current.node.fy = mouseRef.current.y
        return
      }

      const sim = simRef.current
      if (!sim) return
      let nearest = null
      let nd = 30
      sim.nodes.forEach((n) => {
        const d = Math.hypot(n.x - mouseRef.current.x, n.y - mouseRef.current.y)
        if (d < n.size + 6 && d < nd) {
          nd = d
          nearest = n
        }
      })
      setHovered(nearest)
      canvas.style.cursor = nearest ? 'pointer' : 'default'
    }

    const handleLeave = () => {
      mouseRef.current.inside = false
      setHovered(null)
    }

    const handleDown = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const sim = simRef.current
      const target = sim.nodes.find((n) => Math.hypot(n.x - mx, n.y - my) < n.size + 6)
      if (target) {
        dragRef.current = {
          node: target,
          wasFixed: target.fx !== null
        }
        if (target.id !== 'umang') {
          target.fx = mx
          target.fy = my
        }
      }
    }

    const handleUp = (e) => {
      if (dragRef.current) {
        const { node, wasFixed } = dragRef.current
        const dragged = node._dragged
        if (!wasFixed && node.id !== 'umang') {
          node.fx = null
          node.fy = null
        }
        if (!dragged) {
          // treat as click
          setSelected((s) => (s === node ? null : node))
        }
        node._dragged = false
        dragRef.current = null
      }
    }

    const handleMoveDrag = () => {
      if (dragRef.current) dragRef.current.node._dragged = true
    }

    canvas.addEventListener('mousemove', handleMove)
    canvas.addEventListener('mousemove', handleMoveDrag)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('resize', setSize)

    const render = () => {
      const sim = simRef.current
      const rect = wrap.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      step(sim, w, h)

      ctx.clearRect(0, 0, w, h)

      // subtle radial backdrop
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) / 1.4)
      grad.addColorStop(0, 'rgba(163, 230, 53, 0.04)')
      grad.addColorStop(1, 'rgba(5, 5, 7, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // links
      sim.links.forEach((l) => {
        const active = connectedIds && (connectedIds.has(l.source) && connectedIds.has(l.target))
        const dim = connectedIds && !active
        const grad = ctx.createLinearGradient(l.source.x, l.source.y, l.target.x, l.target.y)
        const color1 = TYPE_COLORS[l.source.type]
        const color2 = TYPE_COLORS[l.target.type]
        const a1 = dim ? 0.04 : active ? 0.55 : 0.18
        const a2 = dim ? 0.04 : active ? 0.55 : 0.18
        grad.addColorStop(0, hexToRgba(color1, a1))
        grad.addColorStop(1, hexToRgba(color2, a2))
        ctx.strokeStyle = grad
        ctx.lineWidth = active ? 1.2 : 0.6
        ctx.beginPath()
        ctx.moveTo(l.source.x, l.source.y)
        ctx.lineTo(l.target.x, l.target.y)
        ctx.stroke()
      })

      // nodes
      sim.nodes.forEach((n) => {
        const isHovered = hovered === n
        const isSelected = selected === n
        const isSelf = n.id === 'umang'
        const visible = !filter || filter === 'all' || n.type === filter || isSelf
        const inConnected = connectedIds ? connectedIds.has(n) : true
        const dim = (!visible || (connectedIds && !inConnected))
        const color = TYPE_COLORS[n.type]
        const r = n.size

        // glow
        if (isHovered || isSelected || isSelf) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3)
          glow.addColorStop(0, hexToRgba(color, 0.5))
          glow.addColorStop(1, hexToRgba(color, 0))
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // outer ring
        ctx.strokeStyle = hexToRgba(color, dim ? 0.15 : 0.7)
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.stroke()

        // inner fill
        ctx.fillStyle = hexToRgba(color, dim ? 0.05 : isSelf ? 0.85 : 0.18)
        ctx.beginPath()
        ctx.arc(n.x, n.y, r - 2, 0, Math.PI * 2)
        ctx.fill()

        // center dot
        ctx.fillStyle = hexToRgba(color, dim ? 0.2 : 1)
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2)
        ctx.fill()

        // label
        const showLabel = !dim && (isHovered || isSelected || isSelf || n.size >= 13)
        if (showLabel) {
          ctx.font = `${isSelf ? '600' : '500'} ${isSelf ? 12 : 10}px JetBrains Mono, monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          const text = n.label
          const padX = 6
          const padY = 3
          const metrics = ctx.measureText(text)
          const tw = metrics.width + padX * 2
          const th = (isSelf ? 12 : 10) + padY * 2
          const tx = n.x - tw / 2
          const ty = n.y + r + 6

          ctx.fillStyle = 'rgba(5, 5, 7, 0.85)'
          ctx.strokeStyle = hexToRgba(color, 0.4)
          ctx.lineWidth = 0.5
          roundRect(ctx, tx, ty, tw, th, 4)
          ctx.fill()
          ctx.stroke()

          ctx.fillStyle = isSelf ? '#a3e635' : '#fafafa'
          ctx.fillText(text, n.x, ty + padY)
        }
      })

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', handleMove)
      canvas.removeEventListener('mousemove', handleMoveDrag)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('resize', setSize)
    }
  }, [hovered, selected, filter, connectedIds])

  const active = selected || hovered
  const filters = ['all', 'domain', 'tool', 'company', 'project']

  return (
    <section id="graph" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-12 bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
                <span className="text-accent">01</span> &nbsp;/&nbsp; knowledge graph
              </span>
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">
              An interactive map of <span className="text-gradient">what I build with</span>.
            </h2>
            <p className="mt-4 max-w-xl text-ink-400">
              Hover, drag, or click any node to inspect connections. Each edge is a real
              relationship from my work across NLP, GenAI, and Computer Vision.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all ${
                  filter === f
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-ink-800 text-ink-400 hover:border-ink-600 hover:text-ink-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/30 backdrop-blur grain"
        >
          <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-500">
            <Network className="h-3 w-3 text-accent" />
            graph.render()
          </div>

          <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-500">
            <MousePointer2 className="h-3 w-3" />
            drag · hover · click
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ink-500">
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <span key={key} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: TYPE_COLORS[key], boxShadow: `0 0 8px ${TYPE_COLORS[key]}` }}
                />
                {label}
              </span>
            ))}
          </div>

          <div
            ref={wrapRef}
            className="relative aspect-[16/11] w-full md:aspect-[16/9]"
          >
            <canvas ref={canvasRef} className="absolute inset-0" />
            <AnimatePresence>
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="pointer-events-none absolute bottom-16 right-4 z-10 max-w-xs rounded-lg border border-ink-700 bg-ink-950/90 p-4 backdrop-blur"
                >
                  <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest" style={{ color: TYPE_COLORS[active.type] }}>
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TYPE_COLORS[active.type] }} />
                    {TYPE_LABELS[active.type]}
                  </div>
                  <div className="font-display text-lg text-ink-50">{active.label}</div>
                  <div className="mt-2 font-mono text-[10px] text-ink-400">
                    {graphData.links.filter((l) => l.source === active.id || l.target === active.id || l.source === active || l.target === active).length} connections
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
