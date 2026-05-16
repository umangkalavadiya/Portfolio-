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
    // Loader timeline — two stages:
    //   0 → ~4.4s : TrueFocus walks every word (8 tokens × 0.55s)
    //   ~4.8s     : crossfade → FallingText drops the words
    //   ~4.8 → 8s : words tumble + settle (draggable meanwhile)
    //   7.9s      : content fades in behind the (still opaque) loader
    //   8.4s      : loader starts its 0.6s fade-out, then unmounts
    const t1 = setTimeout(() => setContentReady(true), 7900)
    const t2 = setTimeout(() => setLoaderGone(true), 8400)
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
