'use client'

import {useMediaQuery} from '@/hooks/useMediaQuery'

import {useEffect, useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'

const BUBBLES = {
  count: 30,
  minSize: 25,
  maxSize: 80,
  minDuration: 4,
  maxDuration: 8,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  updateInterval: 150,
  mobileSizeMultiplier: 0.6,
}

type Bubble = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export default function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [lastUpdateTime, setLastUpdateTime] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    const now = Date.now()

    if (now - lastUpdateTime < BUBBLES.updateInterval) {
      return
    }

    setLastUpdateTime(now)

    const currentBubbles = bubbles.length

    if (currentBubbles < BUBBLES.count) {
      const newBubbles: Bubble[] = []
      const bubblesToAdd = Math.min(BUBBLES.count - currentBubbles, 4)

      for (let i = 0; i < bubblesToAdd; i++) {
        const baseSize = Math.random() * (BUBBLES.maxSize - BUBBLES.minSize) + BUBBLES.minSize
        const responsiveSize = isDesktop ? baseSize : baseSize * BUBBLES.mobileSizeMultiplier

        newBubbles.push({
          id: Date.now() + i + Math.random() * 1000,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + Math.random() * 100,
          size: responsiveSize,
          delay: Math.random() * 2,
          duration: Math.random() * (BUBBLES.maxDuration - BUBBLES.minDuration) + BUBBLES.minDuration,
          opacity: Math.random() * (BUBBLES.maxOpacity - BUBBLES.minOpacity) + BUBBLES.minOpacity,
        })
      }

      setBubbles((prev) => [...prev, ...newBubbles])
    }
  }, [bubbles.length, lastUpdateTime, isDesktop])

  return (
    <div data-background="bubbles" className="absolute inset-0">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: bubble.x,
              width: bubble.size,
              height: bubble.size,
              background: `
                radial-gradient(circle at 30% 30%, 
                  rgba(255, 255, 255, ${bubble.opacity * 0.8}) 0%, 
                  rgba(255, 255, 255, ${bubble.opacity * 0.4}) 40%, 
                  rgba(255, 255, 255, ${bubble.opacity * 0.1}) 70%, 
                  transparent 100%)
              `,
              boxShadow: `
                inset 0 0 ${bubble.size * 0.3}px rgba(255, 255, 255, ${bubble.opacity * 0.3}),
                0 0 ${bubble.size * 0.2}px rgba(255, 255, 255, ${bubble.opacity * 0.2}),
                inset 0 0 ${bubble.size * 0.1}px rgba(255, 255, 255, ${bubble.opacity * 0.5})
              `,
              backdropFilter: 'blur(2px)',
            }}
            initial={{
              y: bubble.y,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              y: -bubble.size - 150,
              opacity: [0, bubble.opacity, bubble.opacity * 0.6, 0],
              scale: [0, 1, 1.05, 0.95],
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {duration: 0.3},
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              ease: 'easeInOut',
            }}
            onAnimationComplete={() => {
              setBubbles((prev) => prev.filter((b) => b.id !== bubble.id))
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
