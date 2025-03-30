'use client'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/utils/use-media-query'

import CircularGallery from '~/Module/CircularGallery'

export default function HeroGallery({className}: {className?: string}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <div data-section="hero-gallery" className={cn('relative h-[700px]', className)}>
      <CircularGallery bend={isDesktop ? 3 : 1} textColor="#7f7f7f" borderRadius={0.05} />
    </div>
  )
}
