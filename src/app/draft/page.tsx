'use client'

import {motion} from 'motion/react'
import Link from 'next/link'

const demoPages = [
  {
    title: 'Underwater Bubbles',
    description: 'Эффект пузырьков для фонового слоя сайта',
    href: '/draft/bubbles',
    color: 'bubble-light',
    bgGradient: 'from-ocean-shallow to-ocean-medium',
  },
  {
    title: 'Ocean Surface',
    description: 'Анимация волн и поверхности океана',
    href: '/draft/waves',
    color: 'ocean-surface',
    bgGradient: 'from-ocean-surface to-ocean-shallow',
  },
  {
    title: 'Underwater Garden',
    description: 'Анимированные водоросли и подводная флора',
    href: '/draft/seaweed',
    color: 'seaweed-light',
    bgGradient: 'from-ocean-deep to-ocean-abyss',
  },
  {
    title: 'Diving Experience',
    description: 'Эффект погружения управляемый скроллом',
    href: '/draft/dive',
    color: 'fish-puffer',
    bgGradient: 'from-ocean-medium to-background',
  },
]

export default function DraftPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-ocean-abyss to-ocean-deep relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Плавающие пузырьки */}
        {Array.from({length: 15}).map((_, i) => (
          <motion.div
            key={`bg-bubble-${i}`}
            className="absolute w-3 h-3 bg-bubble-dark/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Световые лучи */}
        <motion.div
          className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-bubble-light/5 to-transparent blur-xl"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Заголовок */}
        <motion.div className="text-center mb-16" initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
          <h1 className="text-5xl font-bold text-white mb-6">
            Pufferz <span className="text-fish-puffer">NFT</span>
          </h1>
          <h2 className="text-2xl text-ocean-surface mb-4">Underwater Theme Showcase</h2>
          <p className="text-gray max-w-3xl mx-auto leading-relaxed">Коллекция демонстрационных страниц с подводными эффектами и анимациями для веб-сайта Pufferz NFT. Каждая страница представляет отдельный компонент или эффект, который можно использовать в финальном дизайне.</p>
        </motion.div>

        {/* Сетка демо-страниц */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {demoPages.map((page, index) => (
            <motion.div key={page.href} initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: index * 0.2}}>
              <Link href={page.href}>
                <motion.div
                  className={`relative bg-gradient-to-br ${page.bgGradient} rounded-2xl p-8 border border-ocean-deep/50 backdrop-blur-sm overflow-hidden group cursor-pointer`}
                  whileHover={{
                    scale: 1.02,
                    transition: {duration: 0.2},
                  }}
                  whileTap={{scale: 0.98}}
                >
                  {/* Декоративные элементы */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <motion.div
                      className={`absolute top-4 right-4 w-8 h-8 bg-${page.color}/30 rounded-full`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{duration: 3, repeat: Infinity}}
                    />
                    <motion.div
                      className={`absolute bottom-6 left-6 w-4 h-4 bg-${page.color}/40 rounded-full`}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{duration: 2, repeat: Infinity, delay: 1}}
                    />
                  </div>

                  <div className="relative z-10">
                    <h3 className={`text-2xl font-bold text-${page.color} mb-3`}>{page.title}</h3>
                    <p className="text-white/80 mb-6 leading-relaxed">{page.description}</p>
                    <motion.div className={`inline-flex items-center text-${page.color} font-semibold group-hover:translate-x-2 transition-transform`}>
                      Посмотреть демо
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Hover эффект */}
                  <motion.div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <motion.div className="mt-16 text-center" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, delay: 1}}>
          <div className="bg-ocean-abyss/60 backdrop-blur-sm border border-ocean-deep/50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-fish-puffer mb-4">Техническая информация</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray">
              <div>
                <h4 className="text-white font-medium mb-2">Технологии:</h4>
                <ul className="space-y-1">
                  <li>• Next.js 14 + TypeScript</li>
                  <li>• Framer Motion для анимаций</li>
                  <li>• Tailwind CSS для стилизации</li>
                  <li>• Кастомная цветовая палитра</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Особенности:</h4>
                <ul className="space-y-1">
                  <li>• Оптимизировано для производительности</li>
                  <li>• Responsive дизайн</li>
                  <li>• Модульная архитектура</li>
                  <li>• Готово для продакшена</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
