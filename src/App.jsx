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
    // Loader timeline:
    //   0 → 4.5s : title/HUD build + scramble + glitch flickers
    //   4.5 → 5.4s : doors slam apart (0.9s)
    // Content fades in mid-open at ~5.0s, loader unmounts at 5.6s.
    const t1 = setTimeout(() => setContentReady(true), 5000)
    const t2 = setTimeout(() => setLoaderGone(true), 5600)
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
