'use client'

import {RefreshCcw} from 'lucide-react'

import {BOX} from '~/Global/Container'
import {ITEMS} from '~/Module/CircularGallery'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/useMediaQuery'

import {useState} from 'react'
import {motion, AnimatePresence} from 'motion/react'

import {H2, P} from '~/UI/Typography'

function FloatingCards() {
  const [currentSet, setCurrentSet] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const itemsPerSet = isDesktop ? 4 : 2
  const totalSets = Math.ceil(ITEMS.length / itemsPerSet)

  const getCurrentItems = () => {
    const startIndex = currentSet * itemsPerSet
    const items = ITEMS.slice(startIndex, startIndex + itemsPerSet)

    if (items.length < itemsPerSet) {
      const remaining = itemsPerSet - items.length
      return [...items, ...ITEMS.slice(0, remaining)]
    }

    return items
  }

  const nextSet = () => {
    setCurrentSet((prev) => (prev + 1) % totalSets)
  }

  const CARD_STYLES = 'size-32 xl:size-28 sm:size-24 border-2 border-foreground-blue rounded-xl shadow-lg'

  const CARD_ANIMATION = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: [0, -8, 0],
      rotate: [0, 1, -1, 0],
    },
    exit: {
      scale: 0,
      opacity: 0,
    },
    transition: {
      duration: 3,

      repeat: Infinity,
      ease: 'easeInOut',
      layout: {
        duration: 0.5,
        ease: 'easeInOut',
      },
      scale: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
      opacity: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-2">
      <AnimatePresence mode="popLayout">
        {getCurrentItems().map((item, index) => (
          <motion.div
            key={`${item.image}-${currentSet}-${index}`}
            layout
            initial={CARD_ANIMATION.initial}
            animate={CARD_ANIMATION.animate}
            exit={CARD_ANIMATION.exit}
            transition={{...CARD_ANIMATION.transition, delay: index * 0.3}}
            className={CARD_STYLES}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </AnimatePresence>

      <motion.button
        initial={CARD_ANIMATION.initial}
        animate={CARD_ANIMATION.animate}
        exit={CARD_ANIMATION.exit}
        transition={{...CARD_ANIMATION.transition, delay: isDesktop ? 5 : 3 * 0.3}} // there are 4 nfts
        whileTap={{scale: 0.85}}
        onClick={nextSet}
        className={cn(CARD_STYLES, 'grid place-items-center', 'bg-background/20 backdrop-blur-sm', 'group cursor-pointer')}
      >
        <RefreshCcw className={cn('size-12 xl:size-10 sm:size-10 text-foreground-blue', 'group-hover:rotate-180 duration-500')} strokeWidth={1.5} />
      </motion.button>
    </div>
  )
}

export default function Collection() {
  return (
    <section id="collection" data-section="collection-index" className={cn('flex flex-col items-center gap-10', BOX.content)}>
      <div className={cn('flex flex-col items-center', 'gap-3.5 xl:gap-4 sm:gap-5', 'text-center')}>
        <H2 offset={0}>Pufferz Collection</H2>

        <P className="max-w-[50ch]">
          Our collection features <span className="text-foreground-blue">3,333</span> unique puffer fish, digital treasures living deep within the blockchain. Explore their world and claim yours.
        </P>
      </div>

      <FloatingCards />
    </section>
  )
}
