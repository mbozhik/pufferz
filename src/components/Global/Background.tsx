'use client'

import {cn} from '@/lib/utils'
import {useScrollColor, BACKGROUND} from '@/hooks/useScrollColor'
import {useMediaQuery} from '@/hooks/useMediaQuery'

import {useEffect, useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'

const BUBBLES = {
  minCount: 15,
  maxCount: 60,
  minSize: 25,
  maxSize: 80,
  minDuration: 4,
  maxDuration: 8,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  maxBubblesOnScreen: 50,
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

export default function Background() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [lastUpdateTime, setLastUpdateTime] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // body -> background color
  useScrollColor({
    startColor: BACKGROUND.start,
    endColor: BACKGROUND.end,
    variableName: '--body-color',
  })

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / documentHeight, 1)
      setScrollProgress(progress)
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, {passive: true})

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  useEffect(() => {
    const now = Date.now()

    if (now - lastUpdateTime < BUBBLES.updateInterval) {
      return
    }

    setLastUpdateTime(now)

    const maxBubbles = Math.floor(scrollProgress * (BUBBLES.maxCount - BUBBLES.minCount)) + BUBBLES.minCount
    const limitedMaxBubbles = Math.min(maxBubbles, BUBBLES.maxBubblesOnScreen)
    const currentBubbles = bubbles.length

    if (currentBubbles < limitedMaxBubbles) {
      const newBubbles: Bubble[] = []
      const bubblesToAdd = Math.min(limitedMaxBubbles - currentBubbles, 8) // Добавляем максимум 8 за раз

      for (let i = 0; i < bubblesToAdd; i++) {
        const baseSize = Math.random() * (BUBBLES.maxSize - BUBBLES.minSize) + BUBBLES.minSize
        const responsiveSize = isDesktop ? baseSize : baseSize * BUBBLES.mobileSizeMultiplier

        newBubbles.push({
          id: Date.now() + i + Math.random(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + Math.random() * 200,
          size: responsiveSize,
          delay: Math.random() * 2,
          duration: Math.random() * (BUBBLES.maxDuration - BUBBLES.minDuration) + BUBBLES.minDuration,
          opacity: Math.random() * (BUBBLES.maxOpacity - BUBBLES.minOpacity) + BUBBLES.minOpacity,
        })
      }

      setBubbles((prev) => [...prev, ...newBubbles])
    } else if (currentBubbles > limitedMaxBubbles) {
      setBubbles((prev) => prev.slice(0, limitedMaxBubbles))
    }
  }, [scrollProgress, bubbles.length, lastUpdateTime])

  return (
    <div className={cn('fixed inset-0 z-[999]', 'overflow-hidden pointer-events-none')}>
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full"
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
