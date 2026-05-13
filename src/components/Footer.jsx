import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Phone, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/portfolio.js'

const socials = [
  { icon: Mail, label: 'Email', href: `mailto:${profile.email}`, value: profile.email },
  { icon: Github, label: 'GitHub', href: profile.github, value: 'umangkalavadiya' },
  { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin, value: 'umangkalavadiya' },
  { icon: Phone, label: 'Phone', href: `tel:${profile.phone}`, value: profile.phone }
]

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-800 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
              <span className="text-accent">05</span> &nbsp;/&nbsp; let's connect
            </span>
          </div>

          <h2 className="font-display text-4xl font-light leading-tight tracking-tight md:text-6xl lg:text-7xl text-balance">
            Have an <span className="text-gradient">AI problem</span><br />
            worth solving?
          </h2>

          <p className="mt-6 max-w-xl text-ink-400 md:text-lg">
            I'm always open to discussing new opportunities, freelance work, or just
            talking shop about RAG, agents, and applied ML.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-3 font-display text-2xl font-light text-ink-50 md:text-4xl"
          >
            <span className="border-b border-ink-700 pb-1 transition-colors group-hover:border-accent group-hover:text-accent">
              {profile.email}
            </span>
            <ArrowUpRight className="h-6 w-6 text-ink-400 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {socials.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex flex-col gap-2 rounded-xl border border-ink-800 bg-ink-900/30 p-5 transition-all hover:border-accent/40 hover:bg-ink-900/60"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-4 w-4 text-ink-400 transition-colors group-hover:text-accent" />
                  <ArrowUpRight className="h-3 w-3 text-ink-500 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">{s.label}</span>
                <span className="truncate text-sm text-ink-200">{s.value}</span>
              </a>
            )
          })}
        </motion.div>

        <div className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-ink-800 pt-6 font-mono text-[10px] uppercase tracking-widest text-ink-500 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} — Umang Kalavadiya</span>
          <span>built with React · framer motion · canvas</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            system online
          </span>
        </div>
      </div>
    </footer>
  )
}
