import { motion } from 'framer-motion'
import TrueFocus from './TrueFocus'

// ──────────────────────────────────────────────────────────────
// Minimal, aesthetic loading screen.
// Just a soft glow + the TrueFocus headline + a thin scan bar.
// ──────────────────────────────────────────────────────────────
export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-12 overflow-hidden bg-ink-950 px-6 text-center text-ink-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* soft radial glow behind the text */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.10),transparent_65%)]" />

      <motion.div
        className="relative max-w-4xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
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
        />
      </motion.div>

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
