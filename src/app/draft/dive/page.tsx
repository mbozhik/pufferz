'use client'

import {motion, useScroll, useTransform} from 'motion/react'
import {useRef} from 'react'

export default function DivePage() {
  const containerRef = useRef(null)
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Трансформации для эффекта погружения
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const depthOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.8, 1])
  const surfaceOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const bubblesY = useTransform(scrollYProgress, [0, 1], ['100vh', '-50vh'])

  return (
    <div ref={containerRef} className="h-[300vh]">
      {/* Фиксированный контейнер для анимации */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Поверхность океана */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-ocean-surface via-ocean-shallow to-ocean-medium"
          style={{
            scale: backgroundScale,
            opacity: surfaceOpacity,
          }}
        >
          {/* Солнечные лучи на поверхности */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Глубинные слои */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-ocean-medium via-ocean-deep to-ocean-abyss" style={{opacity: depthOpacity}} />

        {/* Пузырьки во время погружения */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({length: 20}).map((_, i) => (
            <motion.div
              key={`dive-bubble-${i}`}
              className="absolute w-4 h-4 bg-bubble-medium/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                y: bubblesY,
              }}
              animate={{
                x: [0, 20, -10, 15, 0],
                scale: [1, 1.2, 0.8, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Контент с информацией */}
        <div className="relative z-10 h-screen flex flex-col justify-center items-center text-center p-8">
          <motion.h1 className="text-5xl font-bold text-white mb-6" initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 1.5}}>
            Dive Into Pufferz
          </motion.h1>

          <motion.p className="text-xl text-bubble-light mb-8 max-w-2xl" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 1.5, delay: 0.5}}>
            Прокрутите вниз, чтобы погрузиться в подводный мир Pufferz NFT коллекции
          </motion.p>

          <motion.div className="text-white/60 text-sm" animate={{y: [0, 10, 0]}} transition={{duration: 2, repeat: Infinity}}>
            ↓ Scroll to dive deeper ↓
          </motion.div>
        </div>

        {/* Переходные элементы на разных глубинах */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0]),
          }}
        >
          <div className="text-center">
            <motion.h2 className="text-3xl font-bold text-ocean-surface mb-4" animate={{scale: [1, 1.05, 1]}} transition={{duration: 3, repeat: Infinity}}>
              Entering the Blue Zone
            </motion.h2>
            <p className="text-bubble-light">Здесь обитают самые яркие Pufferz</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 0]),
          }}
        >
          <div className="text-center">
            <motion.h2
              className="text-3xl font-bold text-seaweed-light mb-4"
              animate={{
                rotate: [0, 2, -2, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{duration: 4, repeat: Infinity}}
            >
              The Deep Gardens
            </motion.h2>
            <p className="text-gray">Среди водорослей плавают редкие виды</p>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]),
          }}
        >
          <div className="text-center">
            <motion.h2
              className="text-3xl font-bold text-fish-puffer mb-4"
              animate={{
                textShadow: ['0 0 10px rgba(251, 191, 36, 0.5)', '0 0 20px rgba(251, 191, 36, 0.8)', '0 0 10px rgba(251, 191, 36, 0.5)'],
              }}
              transition={{duration: 2, repeat: Infinity}}
            >
              The Abyss Dwellers
            </motion.h2>
            <p className="text-white/80">Самые мистические и ценные Pufferz</p>
          </div>
        </motion.div>

        {/* Плавающие Pufferz на разных глубинах */}
        <motion.div
          className="absolute w-16 h-16 bg-fish-puffer rounded-full"
          style={{
            left: '20%',
            top: '30%',
            opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 1, 0]),
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        >
          {/* Глаза Pufferz */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full">
            <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full" />
          </div>
          <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full">
            <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full" />
          </div>
        </motion.div>

        <motion.div
          className="absolute w-12 h-12 bg-seaweed-light rounded-full"
          style={{
            right: '25%',
            top: '60%',
            opacity: useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 0]),
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 2,
          }}
        />

        {/* Информация о странице */}
        <motion.div className="absolute bottom-8 left-8 right-8 bg-background/80 backdrop-blur-sm border border-ocean-deep/50 rounded-lg p-6 z-20" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 1, delay: 2}}>
          <h3 className="text-lg font-semibold text-fish-puffer mb-2">Scroll-controlled Diving Effect:</h3>
          <ul className="text-sm text-gray space-y-1">
            <li>• Эффект погружения управляется скроллом</li>
            <li>• Градиентные переходы между глубинами</li>
            <li>• Контекстный контент на разных уровнях</li>
            <li>• Анимированные персонажи Pufferz</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
