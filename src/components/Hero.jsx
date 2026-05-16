import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data/portfolio.js'
import NeuralBackground from './NeuralBackground.jsx'

const ROLES = [
  'AI/ML Engineer',
  'GenAI Architect',
  'RAG Specialist',
  'NLP Engineer',
  'Project Manager - AI'
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => {
    const role = ROLES[roleIdx]
    let charIdx = 0
    let deleting = false

    const tick = () => {
      if (!deleting) {
        if (charIdx <= role.length) {
          setTyped(role.slice(0, charIdx))
          charIdx++
          timeoutRef.current = setTimeout(tick, 80)
        } else {
          deleting = true
          timeoutRef.current = setTimeout(tick, 1600)
        }
      } else {
        if (charIdx >= 0) {
          setTyped(role.slice(0, charIdx))
          charIdx--
          timeoutRef.current = setTimeout(tick, 40)
        } else {
          setRoleIdx((i) => (i + 1) % ROLES.length)
        }
      }
    }
    tick()
    return () => clearTimeout(timeoutRef.current)
  }, [roleIdx])

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <NeuralBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-32 pb-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-accent" />
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
            <Sparkles className="h-3 w-3 text-accent" />
            available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-5xl font-light leading-[1.05] tracking-tight md:text-7xl lg:text-8xl text-balance"
        >
          <span className="text-ink-50">{profile.name.split(' ')[0]}</span>
          <span className="text-ink-500"> </span>
          <span className="text-gradient">{profile.name.split(' ')[1]}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 flex items-center gap-3 font-mono text-base text-ink-200 md:text-xl"
        >
          <span className="text-accent">{'>'}</span>
          <span className="min-h-[1.5em]">
            {typed}
            <span className="ml-0.5 inline-block h-5 w-2 -translate-y-0.5 animate-pulse bg-accent align-middle" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-3xl text-base leading-relaxed text-ink-300 md:text-lg"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#graph"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink-950 transition-all hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]"
          >
            <span className="relative z-10">Explore the graph</span>
            <ArrowDown className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-ink-700 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink-200 transition-all hover:border-ink-300 hover:text-ink-50"
          >
            View projects
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-ink-800 pt-8 md:grid-cols-4 md:gap-8"
        >
          {[
            { label: 'Projects shipped', value: '50+' },
            { label: 'Clients served', value: '30+' },
            { label: 'Years in AI', value: '3+' },
            { label: 'Team led', value: '15' }
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display text-3xl font-light text-ink-50 md:text-4xl">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-6 w-px bg-gradient-to-b from-accent to-transparent"
          />
        </div>
      </motion.div>

      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 [writing-mode:vertical-rl]">
          <MapPin className="mb-2 inline h-3 w-3" /> {profile.location}
        </span>
      </div>
    </section>
  )
}
