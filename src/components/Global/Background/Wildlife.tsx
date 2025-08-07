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
    count: 5,
    minDuration: 15,
    maxDuration: 25,
    minDelay: 0,
    maxDelay: 12,
    minY: 100,
    maxY: 600,
    minSize: 1.2,
    maxSize: 2.5,
    mobileSizeMultiplier: 0.8,
    waveAmplitude: 50,
    waveFrequency: 0.02,
    swayAmplitude: 8,
  },
  seaweed: {
    left: {
      minCount: 2,
      maxCount: 3,
      image: Weed1Image,
      rotations: [-10, 5, -7, 3],
      spacing: 100,
    },
    right: {
      minCount: 1,
      maxCount: 2,
      image: Weed2Image,
      rotations: [8, -6, 8, -4],
      spacing: 120,
    },
    size: 150,
    mobileSizeMultiplier: 0.9,
    hoverSlideDistance: 100,
    hoverTransitionDuration: 0.3,
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

export default function Wildlife() {
  const [fish, setFish] = useState<Fish[]>([])
  const [isHovered, setIsHovered] = useState(false)
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

      {/* Static Seaweed */}
      <div className="absolute inset-0 pointer-events-none" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Left seaweed */}
        {Array.from({length: Math.floor(Math.random() * (WILDLIFE_CONFIG.seaweed.left.maxCount - WILDLIFE_CONFIG.seaweed.left.minCount + 1)) + WILDLIFE_CONFIG.seaweed.left.minCount}).map((_, index) => {
          const baseSize = WILDLIFE_CONFIG.seaweed.size
          const responsiveSize = isDesktop ? baseSize : baseSize * WILDLIFE_CONFIG.seaweed.mobileSizeMultiplier
          const rotation = WILDLIFE_CONFIG.seaweed.left.rotations[index % WILDLIFE_CONFIG.seaweed.left.rotations.length]

          return (
            <motion.div
              key={`left-weed-${index}`}
              className="absolute pointer-events-none"
              style={{
                height: `${responsiveSize}px`,
                width: `${responsiveSize}px`,
                bottom: 0,
                left: index * WILDLIFE_CONFIG.seaweed.left.spacing,
                transform: `rotate(${rotation}deg)`,
              }}
              animate={{
                y: isHovered ? WILDLIFE_CONFIG.seaweed.hoverSlideDistance : 0,
                opacity: isHovered ? 0 : 1,
              }}
              transition={{
                duration: WILDLIFE_CONFIG.seaweed.hoverTransitionDuration,
                ease: 'easeInOut',
              }}
            >
              <Image
                src={WILDLIFE_CONFIG.seaweed.left.image}
                alt="Seaweed"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3))',
                }}
              />
            </motion.div>
          )
        })}

        {/* Right seaweed */}
        {Array.from({length: Math.floor(Math.random() * (WILDLIFE_CONFIG.seaweed.right.maxCount - WILDLIFE_CONFIG.seaweed.right.minCount + 1)) + WILDLIFE_CONFIG.seaweed.right.minCount}).map((_, index) => {
          const baseSize = WILDLIFE_CONFIG.seaweed.size
          const responsiveSize = isDesktop ? baseSize : baseSize * WILDLIFE_CONFIG.seaweed.mobileSizeMultiplier
          const rotation = WILDLIFE_CONFIG.seaweed.right.rotations[index % WILDLIFE_CONFIG.seaweed.right.rotations.length]

          return (
            <motion.div
              key={`right-weed-${index}`}
              className="absolute pointer-events-none"
              style={{
                height: `${responsiveSize}px`,
                width: `${responsiveSize}px`,
                bottom: 0,
                right: index * WILDLIFE_CONFIG.seaweed.right.spacing,
                transform: `rotate(${rotation}deg)`,
              }}
              animate={{
                y: isHovered ? WILDLIFE_CONFIG.seaweed.hoverSlideDistance : 0,
                opacity: isHovered ? 0 : 1,
              }}
              transition={{
                duration: WILDLIFE_CONFIG.seaweed.hoverTransitionDuration,
                ease: 'easeInOut',
              }}
            >
              <Image
                src={WILDLIFE_CONFIG.seaweed.right.image}
                alt="Seaweed"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3))',
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
