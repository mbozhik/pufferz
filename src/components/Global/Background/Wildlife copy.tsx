'use client'

import FishLeftImage from '$/wildlife/fish-left.png'
import FishRightImage from '$/wildlife/fish-right.png'
import Weed1Image from '$/wildlife/weed-1.png'
import Weed2Image from '$/wildlife/weed-2.png'

import {useMediaQuery} from '@/hooks/useMediaQuery'

import {useEffect, useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'

import Image from 'next/image'

const WILDLIFE_CONFIG = {
  fish: {
    count: 5, // Уменьшил количество для меньшего захламления
    minDuration: 15,
    maxDuration: 25,
    minDelay: 0,
    maxDelay: 12,
    minY: 100, // Увеличил диапазон по вертикали
    maxY: 600,
    minSize: 1.2, // Увеличил размеры
    maxSize: 2.5,
    mobileSizeMultiplier: 0.8,
    waveAmplitude: 50, // Амплитуда волнообразного движения
    waveFrequency: 0.02, // Частота волн
    swayAmplitude: 8, // Амплитуда покачивания рыб
  },
  seaweed: {
    minCount: 2, // Минимальное количество водорослей в углу
    maxCount: 5, // Максимальное количество водорослей в углу
    minDuration: 3, // Увеличил скорость в 2 раза
    maxDuration: 5,
    minDelay: 0,
    maxDelay: 8,
    size: 150, // Фиксированный размер для всех водорослей
    mobileHeightMultiplier: 0.9,
    slideDistance: 30, // Уменьшил еще больше - теперь они остаются частично за пределами экрана
  },
}

type Fish = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  direction: 'left' | 'right'
  image: any
  waveOffset: number
  waveSpeed: number
  swayOffset: number
}

type Seaweed = {
  id: number
  height: number
  duration: number
  delay: number
  image: any
  position: 'left' | 'right'
  index: number
}

export default function Wildlife() {
  const [fish, setFish] = useState<Fish[]>([])
  const [seaweed, setSeaweed] = useState<Seaweed[]>([])
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // Initialize fish
  useEffect(() => {
    const newFish: Fish[] = []

    for (let i = 0; i < WILDLIFE_CONFIG.fish.count; i++) {
      const direction = Math.random() > 0.5 ? 'left' : 'right'
      const baseSize = Math.random() * (WILDLIFE_CONFIG.fish.maxSize - WILDLIFE_CONFIG.fish.minSize) + WILDLIFE_CONFIG.fish.minSize
      const responsiveSize = isDesktop ? baseSize : baseSize * WILDLIFE_CONFIG.fish.mobileSizeMultiplier

      newFish.push({
        id: Date.now() + i + Math.random() * 1000,
        x: direction === 'left' ? window.innerWidth + 150 : -150,
        y: Math.random() * (WILDLIFE_CONFIG.fish.maxY - WILDLIFE_CONFIG.fish.minY) + WILDLIFE_CONFIG.fish.minY,
        size: responsiveSize,
        duration: Math.random() * (WILDLIFE_CONFIG.fish.maxDuration - WILDLIFE_CONFIG.fish.minDuration) + WILDLIFE_CONFIG.fish.minDuration,
        delay: Math.random() * (WILDLIFE_CONFIG.fish.maxDelay - WILDLIFE_CONFIG.fish.minDelay) + WILDLIFE_CONFIG.fish.minDelay,
        direction,
        image: direction === 'left' ? FishLeftImage : FishRightImage,
        waveOffset: Math.random() * Math.PI * 2, // Случайная фаза волны
        waveSpeed: 0.5 + Math.random() * 1, // Случайная скорость волны
        swayOffset: Math.random() * Math.PI * 2, // Случайная фаза покачивания
      })
    }

    setFish(newFish)
  }, [isDesktop])

  // Initialize seaweed
  useEffect(() => {
    const newSeaweed: Seaweed[] = []

    // Левая водоросль (Weed1Image)
    for (let i = 0; i < WILDLIFE_CONFIG.seaweed.minCount + Math.floor(Math.random() * (WILDLIFE_CONFIG.seaweed.maxCount - WILDLIFE_CONFIG.seaweed.minCount)); i++) {
      const baseHeight = WILDLIFE_CONFIG.seaweed.size
      const responsiveHeight = isDesktop ? baseHeight : baseHeight * WILDLIFE_CONFIG.seaweed.mobileHeightMultiplier

      newSeaweed.push({
        id: Date.now() + i + Math.random() * 1000,
        height: responsiveHeight,
        duration: Math.random() * (WILDLIFE_CONFIG.seaweed.maxDuration - WILDLIFE_CONFIG.seaweed.minDuration) + WILDLIFE_CONFIG.seaweed.minDuration,
        delay: Math.random() * (WILDLIFE_CONFIG.seaweed.maxDelay - WILDLIFE_CONFIG.seaweed.minDelay) + WILDLIFE_CONFIG.seaweed.minDelay,
        image: Weed1Image,
        position: 'left',
        index: i,
      })
    }

    // Правая водоросль (Weed2Image)
    for (let i = 0; i < WILDLIFE_CONFIG.seaweed.minCount + Math.floor(Math.random() * (WILDLIFE_CONFIG.seaweed.maxCount - WILDLIFE_CONFIG.seaweed.minCount)); i++) {
      const baseHeight = WILDLIFE_CONFIG.seaweed.size
      const responsiveHeight = isDesktop ? baseHeight : baseHeight * WILDLIFE_CONFIG.seaweed.mobileHeightMultiplier

      newSeaweed.push({
        id: Date.now() + (i + 100) + Math.random() * 1000,
        height: responsiveHeight,
        duration: Math.random() * (WILDLIFE_CONFIG.seaweed.maxDuration - WILDLIFE_CONFIG.seaweed.minDuration) + WILDLIFE_CONFIG.seaweed.minDuration,
        delay: Math.random() * (WILDLIFE_CONFIG.seaweed.maxDelay - WILDLIFE_CONFIG.seaweed.minDelay) + WILDLIFE_CONFIG.seaweed.minDelay,
        image: Weed2Image,
        position: 'right',
        index: i,
      })
    }

    setSeaweed(newSeaweed)
  }, [isDesktop])

  return (
    <div data-background="wildlife" className="absolute inset-0 overflow-hidden">
      {/* Fish */}
      <AnimatePresence>
        {fish.map((fishItem) => (
          <motion.div
            key={fishItem.id}
            className="absolute pointer-events-none"
            style={{
              left: fishItem.x,
              top: fishItem.y,
              width: `${fishItem.size * 80}px`, // Увеличил размер
              height: `${fishItem.size * 40}px`,
            }}
            initial={{
              x: fishItem.direction === 'left' ? 0 : 0,
              y: 0,
              opacity: 0,
              scale: 0.6,
              rotate: fishItem.direction === 'left' ? -5 : 5,
            }}
            animate={{
              x: fishItem.direction === 'left' ? -(window.innerWidth + 300) : window.innerWidth + 300,
              y: [0, WILDLIFE_CONFIG.fish.waveAmplitude * Math.sin(fishItem.waveOffset), -WILDLIFE_CONFIG.fish.waveAmplitude * Math.sin(fishItem.waveOffset + Math.PI), WILDLIFE_CONFIG.fish.waveAmplitude * Math.sin(fishItem.waveOffset + Math.PI * 2), 0],
              opacity: [0, 1, 1, 1, 0],
              scale: [0.6, 1, 1.1, 1, 0.8],
              rotate: [fishItem.direction === 'left' ? -5 : 5, fishItem.direction === 'left' ? -2 : 2, fishItem.direction === 'left' ? -8 : 8, fishItem.direction === 'left' ? -3 : 3, fishItem.direction === 'left' ? -5 : 5],
              // Добавляем покачивание
              rotateZ: [-WILDLIFE_CONFIG.fish.swayAmplitude * Math.sin(fishItem.swayOffset), WILDLIFE_CONFIG.fish.swayAmplitude * Math.sin(fishItem.swayOffset + Math.PI / 2), -WILDLIFE_CONFIG.fish.swayAmplitude * Math.sin(fishItem.swayOffset + Math.PI), WILDLIFE_CONFIG.fish.swayAmplitude * Math.sin(fishItem.swayOffset + Math.PI * 1.5), -WILDLIFE_CONFIG.fish.swayAmplitude * Math.sin(fishItem.swayOffset + Math.PI * 2)],
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: fishItem.duration,
              delay: fishItem.delay,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: Math.random() * 15 + 8, // Увеличил задержку между повторами
              times: [0, 0.1, 0.5, 0.9, 1], // Более плавные переходы
            }}
            onAnimationComplete={() => {
              // Reset fish position for infinite loop
              setFish((prev) =>
                prev.map((f) =>
                  f.id === fishItem.id
                    ? {
                        ...f,
                        x: f.direction === 'left' ? window.innerWidth + 150 : -150,
                        y: Math.random() * (WILDLIFE_CONFIG.fish.maxY - WILDLIFE_CONFIG.fish.minY) + WILDLIFE_CONFIG.fish.minY,
                        delay: Math.random() * 8 + 4,
                        waveOffset: Math.random() * Math.PI * 2,
                        swayOffset: Math.random() * Math.PI * 2,
                      }
                    : f,
                ),
              )
            }}
          >
            <Image
              src={fishItem.image}
              alt="Fish"
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Seaweed */}
      <AnimatePresence>
        {seaweed.map((weed) => (
          <motion.div
            key={weed.id}
            className="absolute pointer-events-none"
            style={{
              height: `${weed.height}px`,
              width: `${weed.height}px`, // Делаем квадратным
              bottom: 0,
              // Позиционирование по углам
              ...(weed.position === 'left' && {left: weed.index * 80}), // Увеличил промежутки между водорослями в левом углу
              ...(weed.position === 'right' && {right: weed.index * 80}), // Увеличил промежутки между водорослями в правом углу
            }}
            initial={{
              y: WILDLIFE_CONFIG.seaweed.slideDistance, // Начинаем снизу экрана
              opacity: 0,
            }}
            animate={{
              y: 0, // Выезжаем наверх
              opacity: [0, 1, 1, 0],
            }}
            exit={{
              opacity: 0,
              y: WILDLIFE_CONFIG.seaweed.slideDistance, // Уезжаем обратно вниз
            }}
            transition={{
              duration: weed.duration,
              delay: weed.delay,
              ease: 'easeOut',
              repeat: Infinity,
              repeatDelay: Math.random() * 15 + 10, // Увеличил задержку
              times: [0, 0.3, 0.7, 1], // Простые переходы без сжатия
            }}
            onAnimationComplete={() => {
              // Reset seaweed for infinite loop
              setSeaweed((prev) =>
                prev.map((w) =>
                  w.id === weed.id
                    ? {
                        ...w,
                        delay: Math.random() * 8 + 4,
                      }
                    : w,
                ),
              )
            }}
          >
            <Image
              src={weed.image}
              alt="Seaweed"
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3))',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
