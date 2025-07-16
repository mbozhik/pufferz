'use client'

import {motion} from 'motion/react'

export default function WavesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-surface via-ocean-shallow to-ocean-medium overflow-hidden relative">
      {/* Заголовок */}
      <div className="relative z-10 p-8">
        <motion.h1 className="text-4xl font-bold text-white text-center mb-4" initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
          Ocean Surface
        </motion.h1>
        <motion.p className="text-white/80 text-center max-w-2xl mx-auto" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 0.5}}>
          Анимация поверхности океана для главной страницы. Пользователь видит поверхность воды перед погружением.
        </motion.p>
      </div>

      {/* Волны - верхний слой */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-ocean-surface/60 to-transparent"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Волновые слои */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4dd9ea" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2494c7" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2494c7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1a73a1" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="wave3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a73a1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0d4a6b" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Первая волна */}
        <motion.path
          d="M0,150 C300,120 600,180 900,150 C1050,135 1150,165 1200,150 L1200,0 L0,0 Z"
          fill="url(#wave1)"
          animate={{
            d: ['M0,150 C300,120 600,180 900,150 C1050,135 1150,165 1200,150 L1200,0 L0,0 Z', 'M0,170 C300,140 600,200 900,170 C1050,155 1150,185 1200,170 L1200,0 L0,0 Z', 'M0,150 C300,120 600,180 900,150 C1050,135 1150,165 1200,150 L1200,0 L0,0 Z'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Вторая волна */}
        <motion.path
          d="M0,200 C400,170 800,230 1200,200 L1200,0 L0,0 Z"
          fill="url(#wave2)"
          animate={{
            d: ['M0,200 C400,170 800,230 1200,200 L1200,0 L0,0 Z', 'M0,220 C400,190 800,250 1200,220 L1200,0 L0,0 Z', 'M0,200 C400,170 800,230 1200,200 L1200,0 L0,0 Z'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Третья волна */}
        <motion.path
          d="M0,280 C200,250 400,300 600,280 C800,260 1000,310 1200,280 L1200,0 L0,0 Z"
          fill="url(#wave3)"
          animate={{
            d: ['M0,280 C200,250 400,300 600,280 C800,260 1000,310 1200,280 L1200,0 L0,0 Z', 'M0,300 C200,270 400,320 600,300 C800,280 1000,330 1200,300 L1200,0 L0,0 Z', 'M0,280 C200,250 400,300 600,280 C800,260 1000,310 1200,280 L1200,0 L0,0 Z'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </svg>

      {/* Солнечные лучи в воде */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 6}).map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute bg-gradient-to-b from-white/20 to-transparent"
            style={{
              left: `${15 + i * 15}%`,
              top: '10%',
              width: '8px',
              height: '60%',
              transformOrigin: 'top center',
              transform: `rotate(${-10 + i * 4}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Рябь на поверхности */}
      <div className="absolute top-20 left-0 w-full h-32">
        {Array.from({length: 20}).map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
            }}
            initial={{scale: 0, opacity: 0}}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Кнопка для симуляции погружения */}
      <motion.div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 1, delay: 2}}>
        <motion.button className="px-8 py-4 bg-ocean-deep/80 backdrop-blur-sm border border-bubble-medium/50 rounded-full text-white font-semibold hover:bg-ocean-deep/90 transition-colors" whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} animate={{y: [0, -5, 0]}} transition={{duration: 2, repeat: Infinity}}>
          Dive Deeper ↓
        </motion.button>
      </motion.div>

      {/* Информация о компоненте */}
      <motion.div className="absolute bottom-8 left-8 right-8 bg-ocean-deep/80 backdrop-blur-sm border border-ocean-surface/30 rounded-lg p-6" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 1, delay: 1}}>
        <h3 className="text-lg font-semibold text-ocean-surface mb-2">Технические детали:</h3>
        <ul className="text-sm text-gray space-y-1">
          <li>• SVG анимация с тремя слоями волн</li>
          <li>• Солнечные лучи проникающие в воду</li>
          <li>• Анимированная рябь на поверхности</li>
          <li>• Плавные переходы цветов</li>
        </ul>
      </motion.div>
    </div>
  )
}
