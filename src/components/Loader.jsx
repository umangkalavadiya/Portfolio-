import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAME = 'UMANG KALAVADIYA'
const ROLE = 'AI / ML ENGINEER'
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789█▓▒░<>{}/\\'

// ──────────────────────────────────────────────────────────────
// Scrambling text — letters cycle rapidly then lock in
// ──────────────────────────────────────────────────────────────
function Scramble({ text, start = 0, lockMs = 900, className = '' }) {
  const [out, setOut] = useState(' '.repeat(text.length))
  const startedRef = useRef(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      startedRef.current = true
      const begun = Date.now()
      const id = setInterval(() => {
        const elapsed = Date.now() - begun
        const t = elapsed / lockMs
        let s = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') { s += ' '; continue }
          const charLock = (i / text.length) * 0.55
          const localT = (t - charLock) / (1 - charLock)
          if (localT >= 1) s += text[i]
          else if (localT > 0) s += CHARS[Math.floor(Math.random() * CHARS.length)]
          else s += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        setOut(s)
        if (elapsed > lockMs + 200) {
          clearInterval(id)
          setOut(text)
        }
      }, 35)
      return () => clearInterval(id)
    }, start)
    return () => clearTimeout(startTimer)
  }, [text, start, lockMs])

  return <span className={className}>{out}</span>
}

// ──────────────────────────────────────────────────────────────
// Sparse bold "graph" — 8 big nodes around the title
// ──────────────────────────────────────────────────────────────
const NODES = [
  { x: 8, y: 14, label: 'GENAI', size: 'lg' },
  { x: 88, y: 12, label: 'NLP', size: 'md' },
  { x: 92, y: 38, label: 'RAG', size: 'lg' },
  { x: 6, y: 42, label: 'CV', size: 'md' },
  { x: 14, y: 78, label: 'PY', size: 'md' },
  { x: 86, y: 82, label: 'AGENTS', size: 'lg' },
  { x: 50, y: 8, label: 'LLM', size: 'sm' },
  { x: 50, y: 92, label: 'AWS', size: 'sm' }
]

function BigNode({ node, visible, delay }) {
  const sizeMap = { lg: 64, md: 52, sm: 40 }
  const s = sizeMap[node.size]
  return (
    <motion.div
      className="absolute"
      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
      animate={visible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        className="flex items-center justify-center border-2 border-accent bg-ink-950 font-mono text-[10px] font-bold uppercase tracking-widest text-accent"
        style={{
          width: s,
          height: s,
          boxShadow: '0 0 24px rgba(163, 230, 53, 0.35), inset 0 0 12px rgba(163, 230, 53, 0.15)'
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          {node.label}
        </motion.span>
      </div>
      <div className="absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 bg-accent" />
    </motion.div>
  )
}

function GraphEdges({ visible }) {
  // central rect that the lines connect to
  const cx = 50
  const cy = 50
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {NODES.map((n, i) => (
        <motion.line
          key={i}
          x1={n.x}
          y1={n.y}
          x2={cx}
          y2={cy}
          stroke="rgba(163, 230, 53, 0.5)"
          strokeWidth="0.15"
          strokeDasharray="0.6 0.4"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.05 * i, ease: 'easeOut' }}
        />
      ))}
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────
// Bold industrial HUD pieces
// ──────────────────────────────────────────────────────────────
function HudFrame({ phase }) {
  return (
    <>
      {/* Top bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-px origin-left bg-accent"
        style={{ boxShadow: '0 0 12px rgba(163, 230, 53, 0.6)' }}
      />
      {/* Bottom bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-px origin-right bg-accent"
        style={{ boxShadow: '0 0 12px rgba(163, 230, 53, 0.6)' }}
      />
      {/* Heavy corner brackets */}
      {['tl', 'tr', 'bl', 'br'].map((corner, i) => {
        const pos = {
          tl: 'top-6 left-6 border-t-2 border-l-2',
          tr: 'top-6 right-6 border-t-2 border-r-2',
          bl: 'bottom-6 left-6 border-b-2 border-l-2',
          br: 'bottom-6 right-6 border-b-2 border-r-2'
        }[corner]
        return (
          <motion.div
            key={corner}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            className={`pointer-events-none absolute h-10 w-10 border-accent ${pos}`}
          />
        )
      })}
    </>
  )
}

// ──────────────────────────────────────────────────────────────
// Status feed — fast scrolling log on the side
// ──────────────────────────────────────────────────────────────
const LOG = [
  'PWR > ONLINE',
  'KERNEL > LOAD',
  'MEM > 247.8GB',
  'CORTEX > BOOT',
  'EMBED > 12288d',
  'ATTN > 12 HEADS',
  'KV_CACHE > OK',
  'AGENT > SPAWN [5]',
  'LANGCHAIN > UP',
  'RAG > UP',
  'VECTOR.DB > UP',
  'VISION > UP',
  'CODEGEN > UP',
  'INDEX > 2418 CHUNKS',
  'IDENTITY > LOCK',
  'SIGNATURE > VALID',
  'BUILD > 4.6.0',
  'CHECKSUM > ACK',
  'READY ◢'
]

function LogFeed({ phase, opening }) {
  const lines = Math.min(LOG.length, Math.floor(phase * 3.2) + (opening ? 4 : 1))
  const window = LOG.slice(Math.max(0, lines - 8), lines)
  return (
    <div className="flex flex-col-reverse gap-0.5 font-mono text-[10px] leading-tight">
      <AnimatePresence initial={false}>
        {window.map((line, i) => (
          <motion.div
            key={`${lines}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1 - i * 0.12, x: 0 }}
            transition={{ duration: 0.18 }}
            className={i === 0 ? 'font-bold text-accent' : 'text-ink-500'}
          >
            <span className="text-ink-700">{String(lines - window.length + i + 1).padStart(2, '0')} ▸ </span>
            {line}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// Main Loader
// ──────────────────────────────────────────────────────────────
const TIMELINE = {
  frame: 100,    // frame/brackets in
  name: 600,     // scrambling name
  role: 1500,    // role subtitle
  nodes: 2000,   // sparse graph nodes pop in
  edges: 2700,   // edges draw
  glitch: 4000,  // glitch flicker
  open: 4500     // doors fly apart
}
const TOTAL = 5800

export default function Loader() {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [opening, setOpening] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [bigCount, setBigCount] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), TIMELINE.frame),
      setTimeout(() => setPhase(2), TIMELINE.name),
      setTimeout(() => setPhase(3), TIMELINE.role),
      setTimeout(() => setPhase(4), TIMELINE.nodes),
      setTimeout(() => setPhase(5), TIMELINE.edges),
      setTimeout(() => { setGlitch(true); setTimeout(() => setGlitch(false), 200) }, TIMELINE.glitch),
      setTimeout(() => { setGlitch(true); setTimeout(() => setGlitch(false), 150) }, TIMELINE.glitch + 250),
      setTimeout(() => setPhase(6), TIMELINE.open - 200),
      setTimeout(() => setOpening(true), TIMELINE.open)
    ]

    const start = Date.now()
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / TIMELINE.open) * 100)
      setProgress(pct)
      setBigCount(Math.floor(pct * 999.99))
      if (pct >= 100) clearInterval(id)
    }, 24)

    return () => {
      timers.forEach(clearTimeout)
      clearInterval(id)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-ink-950"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* LEFT HALF */}
      <motion.div
        className="absolute inset-0 bg-ink-950"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
        animate={
          opening
            ? { x: '-105%', filter: 'blur(8px)' }
            : glitch
              ? { x: -3 }
              : { x: 0, filter: 'blur(0px)' }
        }
        transition={
          opening
            ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0.05 }
        }
      >
        <LoaderContent
          phase={phase}
          progress={progress}
          bigCount={bigCount}
          glitch={glitch}
          opening={opening}
        />
      </motion.div>

      {/* RIGHT HALF */}
      <motion.div
        className="absolute inset-0 bg-ink-950"
        style={{ clipPath: 'inset(0 0 0 50%)' }}
        animate={
          opening
            ? { x: '105%', filter: 'blur(8px)' }
            : glitch
              ? { x: 3 }
              : { x: 0, filter: 'blur(0px)' }
        }
        transition={
          opening
            ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0.05 }
        }
      >
        <LoaderContent
          phase={phase}
          progress={progress}
          bigCount={bigCount}
          glitch={glitch}
          opening={opening}
        />
      </motion.div>

      {/* Bright seam at center */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-[5] -translate-x-1/2"
        style={{ width: '2px' }}
        animate={{
          backgroundColor: phase >= 6 || opening ? '#a3e635' : 'rgba(163, 230, 53, 0.4)',
          boxShadow:
            opening
              ? '0 0 120px 8px #a3e635, 0 0 300px 30px rgba(163, 230, 53, 0.6)'
              : phase >= 5
                ? '0 0 30px 2px rgba(163, 230, 53, 0.8)'
                : '0 0 8px rgba(163, 230, 53, 0.4)'
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Flash at door-open */}
      <AnimatePresence>
        {opening && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[6] bg-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.4, times: [0, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function LoaderContent({ phase, progress, bigCount, glitch, opening }) {
  return (
    <div className={`absolute inset-0 ${glitch ? 'translate-x-px' : ''}`}>
      {/* dot grid backdrop */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      {/* radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,7,0.85)_100%)]" />

      {phase >= 1 && <HudFrame phase={phase} />}

      {/* MASSIVE BIG-NUMBER WATERMARK */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="font-display text-[28vw] font-bold leading-none tracking-tighter text-accent/[0.04]">
              {String(bigCount).padStart(5, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-[16/10] w-[min(92vw,1100px)]">

          {/* sparse big graph nodes around the text */}
          {NODES.map((n, i) => (
            <BigNode
              key={i}
              node={n}
              visible={phase >= 4}
              delay={i * 0.06}
            />
          ))}

          {/* edges */}
          {phase >= 5 && <GraphEdges visible={phase >= 5} />}

          {/* MASSIVE TITLE */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* tiny tag above */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-ink-500"
                >
                  <span className="h-px w-8 bg-accent" />
                  <span>portfolio.boot · v4.6</span>
                  <span className="h-px w-8 bg-accent" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* the name — scrambling, MASSIVE */}
            {phase >= 2 && (
              <h1
                className={`relative font-display text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[0.9] tracking-tighter text-ink-50 ${
                  glitch ? 'text-accent' : ''
                }`}
                style={{
                  textShadow: glitch
                    ? '2px 0 #f0f, -2px 0 #0ff, 0 0 60px rgba(163, 230, 53, 0.4)'
                    : '0 0 40px rgba(163, 230, 53, 0.25)'
                }}
              >
                <Scramble text={NAME} start={0} lockMs={900} />
              </h1>
            )}

            {/* heavy underline accent */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
                  style={{ boxShadow: '0 0 16px rgba(163, 230, 53, 0.7)' }}
                />
              )}
            </AnimatePresence>

            {/* role */}
            {phase >= 3 && (
              <div className="font-mono text-[clamp(0.65rem,1.2vw,0.9rem)] font-medium uppercase tracking-[0.6em] text-accent">
                <Scramble text={ROLE} start={0} lockMs={700} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOP-LEFT HUD */}
      <div className="absolute left-10 top-10 z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block h-2 w-2 bg-accent"
          />
          REC · LIVE
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-500">
          rec.id // {String(Math.floor(Date.now() / 1000) % 999999).padStart(6, '0')}
        </div>
      </div>

      {/* TOP-RIGHT HUD — big tick counter */}
      <div className="absolute right-10 top-10 z-10 flex flex-col items-end gap-1">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-ink-200">
          CH <span className="text-accent">04</span> / STREAM
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-500">
          {new Date().toISOString().split('T')[0]}
        </div>
      </div>

      {/* BOTTOM-LEFT — log feed */}
      <div className="absolute bottom-10 left-10 z-10 hidden w-56 md:block">
        <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-ink-600">
          // STREAM.LOG
        </div>
        <LogFeed phase={phase} opening={opening} />
      </div>

      {/* BOTTOM-RIGHT — MASSIVE percentage */}
      <div className="absolute bottom-10 right-10 z-10 flex flex-col items-end gap-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-500">
          LOAD //
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tighter tabular-nums text-ink-50">
            {progress.toFixed(0).padStart(3, '0')}
          </span>
          <span className="font-display text-2xl font-bold text-accent">%</span>
        </div>
        {/* hard progress bar */}
        <div className="relative h-1 w-48 overflow-hidden bg-ink-800">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(163, 230, 53, 0.8)' }}
          />
          <motion.div
            className="absolute inset-y-0 h-full w-10 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            animate={{ x: ['-2.5rem', '12rem'] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      {/* BOTTOM-CENTER — status text */}
      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase + '-' + opening}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-ink-300"
          >
            {opening && '◢ ENTERING SYSTEM ◣'}
            {!opening && phase >= 6 && '/// READY ///'}
            {!opening && phase === 5 && '/// LINKING NODES ///'}
            {!opening && phase === 4 && '/// SPAWNING AGENTS ///'}
            {!opening && phase === 3 && '/// IDENTITY LOCKED ///'}
            {!opening && phase === 2 && '/// DECRYPTING ///'}
            {!opening && phase < 2 && '/// HANDSHAKE ///'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Big chunky horizontal scan bars */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-accent/15 to-transparent"
        animate={{ y: ['-10vh', '110vh'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-px bg-accent/60"
        animate={{ y: ['-10vh', '110vh'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
        style={{ boxShadow: '0 0 20px rgba(163, 230, 53, 0.7)' }}
      />
    </div>
  )
}
