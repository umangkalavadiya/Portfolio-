import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const enter = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(true)
    }
    const leave = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(false)
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter)
    document.addEventListener('mouseout', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter)
      document.removeEventListener('mouseout', leave)
    }
  }, [])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference md:block"
        animate={{ x: pos.x, y: pos.y, scale: hovering ? 0 : 1 }}
        transition={{ type: 'spring', mass: 0.2, stiffness: 800, damping: 30 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[98] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 md:block"
        animate={{ x: pos.x, y: pos.y, scale: hovering ? 2 : 1 }}
        transition={{ type: 'spring', mass: 0.6, stiffness: 200, damping: 20 }}
      />
    </>
  )
}
