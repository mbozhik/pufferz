'use client'

import {motion} from 'motion/react'

export default function SeaweedPage() {
  const seaweedData = Array.from({length: 12}, (_, i) => ({
    id: i,
    height: Math.random() * 300 + 150,
    x: i * 8 + Math.random() * 5,
    segments: Math.floor(Math.random() * 4) + 4,
    color: Math.random() > 0.5 ? 'seaweed-light' : 'seaweed-dark',
    delay: Math.random() * 3,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-deep via-ocean-abyss to-background overflow-hidden relative">
      {/* Заголовок */}
      <div className="relative z-10 p-8">
        <motion.h1 className="text-4xl font-bold text-white text-center mb-4" initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
          Underwater Garden
        </motion.h1>
        <motion.p className="text-seaweed-light text-center max-w-2xl mx-auto" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 0.5}}>
          Анимированные водоросли для создания атмосферы подводного мира. Мягкие колебания имитируют движение под водой.
        </motion.p>
      </div>

      {/* Дно океана */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Песчаное дно с неровностями */}
      <svg className="absolute bottom-0 left-0 w-full h-40" viewBox="0 0 1200 160">
        <defs>
          <linearGradient id="sand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a5568" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2d3748" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,120 C200,100 400,140 600,110 C800,130 1000,90 1200,120 L1200,160 L0,160 Z"
          fill="url(#sand)"
          animate={{
            d: ['M0,120 C200,100 400,140 600,110 C800,130 1000,90 1200,120 L1200,160 L0,160 Z', 'M0,110 C200,130 400,100 600,140 C800,100 1000,120 1200,110 L1200,160 L0,160 Z', 'M0,120 C200,100 400,140 600,110 C800,130 1000,90 1200,120 L1200,160 L0,160 Z'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {/* Водоросли */}
      <div className="absolute bottom-32 left-0 w-full">
        {seaweedData.map((seaweed) => (
          <div key={seaweed.id} className="absolute bottom-0" style={{left: `${seaweed.x}%`}}>
            {/* Основной стебель */}
            <motion.div
              className={`relative bg-${seaweed.color}`}
              style={{
                width: '8px',
                height: `${seaweed.height}px`,
                borderRadius: '4px',
              }}
              animate={{
                rotate: [0, 5, -3, 2, 0],
                scaleX: [1, 1.1, 0.9, 1.05, 1],
              }}
              transition={{
                duration: 6 + seaweed.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: seaweed.delay,
              }}
            >
              {/* Сегменты водорослей */}
              {Array.from({length: seaweed.segments}).map((_, segmentIndex) => (
                <motion.div
                  key={segmentIndex}
                  className={`absolute bg-${seaweed.color}/80 rounded-full`}
                  style={{
                    width: `${12 + segmentIndex * 2}px`,
                    height: `${8 + segmentIndex}px`,
                    top: `${segmentIndex * (seaweed.height / seaweed.segments)}px`,
                    left: `${-2 - segmentIndex}px`,
                  }}
                  animate={{
                    rotate: [0, -8, 6, -4, 0],
                    x: [0, 3, -2, 1, 0],
                  }}
                  transition={{
                    duration: 4 + segmentIndex * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: seaweed.delay + segmentIndex * 0.2,
                  }}
                />
              ))}

              {/* Листья водорослей */}
              {Array.from({length: 3}).map((_, leafIndex) => (
                <motion.div
                  key={`leaf-${leafIndex}`}
                  className={`absolute bg-${seaweed.color}/60`}
                  style={{
                    width: '16px',
                    height: '32px',
                    borderRadius: '8px 8px 16px 16px',
                    top: `${leafIndex * (seaweed.height / 4) + 20}px`,
                    left: leafIndex % 2 === 0 ? '8px' : '-16px',
                    transformOrigin: 'bottom center',
                  }}
                  animate={{
                    rotate: [0, 15, -10, 8, 0],
                    scaleY: [1, 1.2, 0.8, 1.1, 1],
                  }}
                  transition={{
                    duration: 5 + leafIndex * 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: seaweed.delay + leafIndex * 0.5,
                  }}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Плавающие частицы планктона */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 15}).map((_, i) => (
          <motion.div
            key={`plankton-${i}`}
            className="absolute w-2 h-2 bg-seaweed-light/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -30, 20, 0],
              y: [0, -20, 15, -10, 0],
              opacity: [0.2, 0.8, 0.3, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Световые лучи пробивающиеся сквозь воду */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 4}).map((_, i) => (
          <motion.div
            key={`light-ray-${i}`}
            className="absolute bg-gradient-to-b from-bubble-light/10 to-transparent blur-sm"
            style={{
              left: `${20 + i * 20}%`,
              top: '0%',
              width: '40px',
              height: '80%',
              transformOrigin: 'top center',
              transform: `rotate(${-5 + i * 3}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Маленькие рыбки между водорослями */}
      <div className="absolute inset-0">
        {Array.from({length: 6}).map((_, i) => (
          <motion.div
            key={`fish-${i}`}
            className="absolute w-3 h-2 bg-fish-puffer rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              x: [0, 100, -50, 80, 0],
              y: [0, -20, 10, -15, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 3,
            }}
          >
            {/* Хвост рыбки */}
            <motion.div
              className="absolute w-2 h-1 bg-fish-accent rounded-full -left-1"
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Информация о компоненте */}
      <motion.div className="absolute bottom-8 left-8 right-8 bg-ocean-abyss/80 backdrop-blur-sm border border-seaweed-dark/30 rounded-lg p-6" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 1, delay: 1}}>
        <h3 className="text-lg font-semibold text-seaweed-light mb-2">Технические детали:</h3>
        <ul className="text-sm text-gray space-y-1">
          <li>• 12 анимированных водорослей с уникальными параметрами</li>
          <li>• Многослойная структура с сегментами и листьями</li>
          <li>• Плавающий планктон и мелкие рыбки</li>
          <li>• Световые лучи проникающие в глубину</li>
        </ul>
      </motion.div>
    </div>
  )
}
