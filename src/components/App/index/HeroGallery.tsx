'use client'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/useMediaQuery'

import CircularGallery from '~/Module/CircularGallery'

export default function HeroGallery({className}: {className?: string}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <div data-section="hero-gallery" className={cn('relative h-[700px] sm:scale-[1.1]', className)}>
      <CircularGallery bend={isDesktop ? 3 : 1} gap={isDesktop ? 2 : 2.25} borderRadius={0.05} />
    </div>
  )
}
