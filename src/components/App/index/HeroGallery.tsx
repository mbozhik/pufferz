import {cn} from '@/lib/utils'
import CircularGallery from '~/Module/CircularGallery'

export default function HeroGallery({className}: {className?: string}) {
  return (
    <div data-section="hero-gallery" className={cn('relative h-[700px]', className)}>
      <CircularGallery bend={3} textColor="#7f7f7f" borderRadius={0.05} />
    </div>
  )
}
