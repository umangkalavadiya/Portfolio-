import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import KnowledgeGraph from './components/KnowledgeGraph.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'

export default function App() {
  const [contentReady, setContentReady] = useState(false)
  const [loaderGone, setLoaderGone] = useState(false)

  useEffect(() => {
    // Loader timeline — TrueFocus advances 1 word every 0.55s
    // (animationDuration 0.35 + pauseBetweenAnimations 0.2) across the
    // 9 words, so one full focus pass finishes in ~4.95s.
    //   0 → ~5s : every word gets focused once
    //   4.6s    : content fades in behind the (still opaque) loader
    //   5.0s    : loader starts its 0.6s fade-out, then unmounts
    const t1 = setTimeout(() => setContentReady(true), 4600)
    const t2 = setTimeout(() => setLoaderGone(true), 5000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {!loaderGone && <Loader key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentReady ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <KnowledgeGraph />
          <Experience />
          <Projects />
          <Skills />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}
