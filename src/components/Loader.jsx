import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TrueFocus from './TrueFocus'
import FallingText from './FallingText'

// ──────────────────────────────────────────────────────────────
// Loading screen — two-stage:
//   1. TrueFocus walks the focus frame across every word.
//   2. Once the full focus pass finishes, the words drop with the
//      FallingText physics effect (and stay draggable).
// ──────────────────────────────────────────────────────────────
export default function Loader() {
  const [showFall, setShowFall] = useState(false)

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 overflow-hidden bg-ink-950 px-6 text-center text-ink-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* soft radial glow behind the text */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.10),transparent_65%)]" />

      {/* shared sized stage for both effects */}
      <div className="relative h-[58vh] w-[min(92vw,860px)] font-display font-bold">
        <AnimatePresence mode="wait">
          {!showFall ? (
            <motion.div
              key="focus"
              className="flex h-full w-full items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <TrueFocus
                sentence="Oh|Yeah,|Finally|You|Have|Landed|At|Right Destination!"
                separator="|"
                manualMode={false}
                blurAmount={5}
                borderColor="#a3e635"
                glowColor="rgba(163, 230, 53, 0.6)"
                lastWordColor="#22c55e"
                lastWordGlow="rgba(34, 197, 94, 0.65)"
                lastWordCount={1}
                animationDuration={0.35}
                pauseBetweenAnimations={0.2}
                onComplete={() => setShowFall(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="fall"
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FallingText
                text="Oh Yeah, Finally You Have Landed At Right Destination!"
                highlightWords={['Right', 'Destination!']}
                trigger="auto"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.9}
                mouseConstraintStiffness={0.9}
                fontSize="clamp(1.75rem, 5vw, 3.25rem)"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* minimal indeterminate progress bar */}
      <div className="relative h-px w-44 overflow-hidden bg-ink-800">
        <motion.div
          className="absolute inset-y-0 left-0 w-1/3 bg-accent"
          style={{ boxShadow: '0 0 12px rgba(163, 230, 53, 0.8)' }}
          animate={{ x: ['-110%', '330%'] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
