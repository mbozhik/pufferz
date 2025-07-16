'use client'

import {motion} from 'motion/react'
import {useMemo} from 'react'

// Генерируем случайные данные для пузырьков
const generateBubbles = (count: number) => {
  return Array.from({length: count}, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 40 + 10,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.3,
  }))
}

export default function BubblesPage() {
  const bubbles = useMemo(() => generateBubbles(25), [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-shallow via-ocean-medium to-ocean-deep overflow-hidden relative">
      {/* Заголовок */}
      <div className="relative z-10 p-8">
        <motion.h1 className="text-4xl font-bold text-white text-center mb-4" initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
          Underwater Bubbles
        </motion.h1>
        <motion.p className="text-bubble-light text-center max-w-2xl mx-auto" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 0.5}}>
          Эффект пузырьков для фонового слоя сайта. Пузырьки медленно поднимаются вверх, создавая атмосферу погружения под воду.
        </motion.p>
      </div>

      {/* Пузырьки */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: bubble.size > 25 ? '#b8e6ff' : bubble.size > 15 ? '#7dd3fc' : '#38bdf8',
            opacity: bubble.opacity,
          }}
          initial={{
            y: '100vh',
            scale: 0,
          }}
          animate={{
            y: '-20vh',
            scale: [0, 1, 1, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Дополнительные декоративные пузырьки */}
      <div className="absolute inset-0">
        {Array.from({length: 8}).map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute rounded-full bg-bubble-light/20 border border-bubble-medium/30"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Световые блики в воде */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-1/4 w-32 h-32 bg-bubble-light/10 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-32 right-1/3 w-24 h-24 bg-ocean-surface/15 rounded-full blur-lg"
          animate={{
            x: [0, -30, 0],
            y: [0, 15, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>

      {/* Информация о компоненте */}
      <motion.div className="absolute bottom-8 left-8 right-8 bg-ocean-deep/80 backdrop-blur-sm border border-bubble-dark/30 rounded-lg p-6" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 1, delay: 1}}>
        <h3 className="text-lg font-semibold text-bubble-light mb-2">Технические детали:</h3>
        <ul className="text-sm text-gray space-y-1">
          <li>• 25 анимированных пузырьков с случайными параметрами</li>
          <li>• Градиентный фон имитирующий глубину океана</li>
          <li>• Световые блики для реалистичности</li>
          <li>• Оптимизировано для производительности</li>
        </ul>
      </motion.div>
    </div>
  )
}
