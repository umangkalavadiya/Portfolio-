import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Brain, Code2, Database, Server, GraduationCap, Award
} from 'lucide-react'
import { skills, certifications, education } from '../data/portfolio.js'

const ICONS = {
  sparkles: Sparkles,
  brain: Brain,
  code: Code2,
  database: Database,
  server: Server
}

export default function Skills() {
  const [active, setActive] = useState(skills[0].id)
  const current = skills.find((s) => s.id === active)
  const allItems = skills.flatMap((s) => s.items.map((i) => i.name))

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
              <span className="text-accent">04</span> &nbsp;/&nbsp; stack
            </span>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">
              The <span className="text-gradient">tools</span> in my orbit.
            </h2>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
              <span className="text-accent">{allItems.length}</span> · technologies &nbsp;
              <span className="text-accent">{skills.length}</span> · domains
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl border border-ink-800 bg-ink-900/30 backdrop-blur grain overflow-hidden"
        >
          {/* category tabs */}
          <div className="flex flex-wrap gap-1 border-b border-ink-800 p-2">
            {skills.map((s) => {
              const Icon = ICONS[s.icon]
              const isActive = s.id === active
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  data-cursor-hover
                  className={`group relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 font-mono text-[11px] uppercase tracking-widest transition-all md:flex-none md:px-5 ${
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-ink-400 hover:bg-ink-800/50 hover:text-ink-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="skill-tab-indicator"
                      className="absolute inset-0 rounded-lg border border-accent/40"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="relative h-3.5 w-3.5" />
                  <span className="relative hidden md:inline">{s.name}</span>
                  <span className="relative md:hidden">{s.name.split(' ')[0]}</span>
                  <span className="relative font-mono text-[9px] text-ink-500">
                    {s.items.length.toString().padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>

          {/* active category panel */}
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + '-side'}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="border-b border-ink-800 p-6 md:border-b-0 md:border-r md:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent/30 bg-accent/5">
                  {(() => {
                    const Icon = ICONS[current.icon]
                    return <Icon className="h-5 w-5 text-accent" />
                  })()}
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium text-ink-50">
                  {current.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {current.blurb}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink-800 pt-5">
                  <Stat label="entries" value={current.items.length} />
                  <Stat
                    label="avg level"
                    value={Math.round(
                      current.items.reduce((a, b) => a + b.level, 0) / current.items.length
                    )}
                    suffix="%"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + '-grid'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 md:p-6 lg:grid-cols-2 xl:grid-cols-3"
              >
                {current.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    data-cursor-hover
                    className="group relative overflow-hidden rounded-lg border border-ink-800 bg-ink-950/50 p-4 transition-all hover:border-accent/40 hover:bg-ink-900/60"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] text-ink-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500 transition-colors group-hover:text-accent">
                        {item.level}%
                      </span>
                    </div>
                    <div className="mt-2 font-display text-base font-medium text-ink-50">
                      {item.name}
                    </div>
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        transition={{ duration: 0.8, delay: 0.1 + i * 0.03, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent shadow-[0_0_8px_rgba(163,230,53,0.5)]"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* infinite scrolling stack marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mt-10 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <Marquee items={allItems} direction="left" />
          <Marquee items={[...allItems].reverse()} direction="right" />
        </motion.div>

        {/* education + certifications */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group rounded-xl border border-ink-800 bg-ink-900/30 p-6 backdrop-blur transition-all hover:border-ink-600 md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 bg-ink-950/50">
                <GraduationCap className="h-4 w-4 text-accent" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-200">
                education
              </h3>
            </div>
            <div className="space-y-5">
              {education.map((e) => (
                <div key={e.degree} className="border-l border-ink-700 pl-4 transition-colors group-hover:border-accent/40">
                  <div className="font-display text-base text-ink-50">{e.degree}</div>
                  <div className="font-mono text-xs text-ink-400">{e.school}</div>
                  <div className="mt-1 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-ink-500">
                    <span>{e.period}</span>
                    <span className="h-px w-3 bg-ink-700" />
                    <span className="text-accent">{e.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-xl border border-ink-800 bg-ink-900/30 p-6 backdrop-blur transition-all hover:border-ink-600 md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 bg-ink-950/50">
                <Award className="h-4 w-4 text-accent" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-200">
                certifications
              </h3>
            </div>
            <ul className="grid grid-cols-1 gap-2">
              {certifications.map((c, i) => (
                <li key={c} className="flex items-center gap-3 text-sm text-ink-300 transition-colors hover:text-ink-50">
                  <span className="font-mono text-[10px] text-ink-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px w-3 flex-shrink-0 bg-ink-700" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, suffix = '' }) {
  return (
    <div>
      <div className="font-display text-2xl font-light text-ink-50">
        {value}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
        {label}
      </div>
    </div>
  )
}

function Marquee({ items, direction = 'left' }) {
  return (
    <div className="flex overflow-hidden py-2">
      <motion.div
        className="flex flex-shrink-0 items-center gap-3 pr-3"
        animate={{ x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-ink-500"
          >
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-accent/40" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
