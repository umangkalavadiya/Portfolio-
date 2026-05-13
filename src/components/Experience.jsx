import { motion } from 'framer-motion'
import { experience } from '../data/portfolio.js'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
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
              <span className="text-accent">02</span> &nbsp;/&nbsp; experience
            </span>
          </div>
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">
            A timeline of <span className="text-gradient">shipped systems</span>.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-ink-700 to-transparent md:left-[7.5rem]" />

          <div className="space-y-12 md:space-y-16">
            {experience.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative grid grid-cols-[auto_1fr] gap-6 md:grid-cols-[8rem_auto_1fr] md:gap-8"
              >
                <div className="hidden font-mono text-xs uppercase tracking-widest text-ink-400 md:block md:pt-1">
                  {job.period}
                </div>

                <div className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-accent/40" />
                  <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(163,230,53,0.6)]" />
                </div>

                <div className="group rounded-xl border border-ink-800 bg-ink-900/30 p-6 backdrop-blur transition-all hover:border-ink-600 hover:bg-ink-900/50 md:p-8">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 md:hidden">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">
                      {job.period}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-medium text-ink-50 md:text-2xl">
                      {job.role}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-wider text-accent">
                      @ {job.company}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {job.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm leading-relaxed text-ink-300"
                      >
                        <span className="mt-2 inline-block h-px w-3 flex-shrink-0 bg-ink-600" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
