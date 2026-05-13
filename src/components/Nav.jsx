import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#graph', label: 'Graph' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' }
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-ink-950/70 border-b border-ink-800/60' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <div className="relative h-3 w-3">
            <div className="absolute inset-0 rounded-full bg-accent" />
            <div className="absolute inset-0 rounded-full bg-accent blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-mono text-sm tracking-tight text-ink-100">
            umang<span className="text-ink-400">.ai</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="group relative font-mono text-xs uppercase tracking-[0.2em] text-ink-300 transition-colors hover:text-ink-50"
            >
              <span className="text-accent">/</span>
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <a
          href="mailto:umang.kalavadiya@gmail.com"
          className="group relative overflow-hidden rounded-full border border-ink-700 bg-ink-900/50 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-100 backdrop-blur transition-all hover:border-accent hover:text-accent"
        >
          <span className="relative z-10">Get in touch</span>
        </a>
      </div>
    </motion.header>
  )
}
