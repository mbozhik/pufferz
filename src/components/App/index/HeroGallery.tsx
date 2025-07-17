'use client'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/utils/use-media-query'

import CircularGallery from '~/Module/CircularGallery'

export default function HeroGallery({className}: {className?: string}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <div data-section="hero-gallery" className={cn('relative h-[700px] sm:scale-[1.05]', className)}>
      <CircularGallery bend={isDesktop ? 3 : 1} gap={isDesktop ? 2 : 2.5} borderRadius={0.05} />
    </div>
  )
}
