import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/portfolio.js'

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
              <span className="text-accent">03</span> &nbsp;/&nbsp; projects
            </span>
          </div>
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">
            Selected <span className="text-gradient">experiments</span> &amp; products.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl border border-ink-800 bg-ink-900/30 p-6 backdrop-blur transition-all hover:border-ink-600 md:p-8"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/5 blur-3xl transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-150" />

              <div className="relative">
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
                    0{i + 1} / project
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                      {p.metric}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-medium leading-tight text-ink-50">
                  {p.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {p.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-ink-800 bg-ink-900/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-400 transition-colors group-hover:border-ink-700 group-hover:text-ink-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
