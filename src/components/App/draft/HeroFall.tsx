import FallImage1 from '$/fall/1.jpg'
import FallImage2 from '$/fall/2.jpg'
import FallImage3 from '$/fall/3.jpg'
import FallImage4 from '$/fall/4.jpg'
import FallImage5 from '$/fall/5.jpg'
import FallImage6 from '$/fall/6.jpg'
import FallImage7 from '$/fall/7.jpg'
import FallImage8 from '$/fall/8.jpg'
import FallImage9 from '$/fall/9.jpg'
import FallImage10 from '$/fall/10.jpg'
import Image from 'next/image'
import type {StaticImageData} from 'next/image'

import Gravity, {MatterBody} from '~/Module/Gravity'

interface FallingImageProps {
  src: StaticImageData
  x: string
  y: string
  angle?: number
}

const FALLING_CONFIG = {
  matterBody: {
    friction: 0.5,
    restitution: 0.2,
  },
  imageSize: 'size-[25vh]',
} as const

const FALLING_IMAGES: FallingImageProps[] = [
  {src: FallImage1, x: '15%', y: '5%', angle: -15},
  {src: FallImage2, x: '25%', y: '15%', angle: 10},
  {src: FallImage3, x: '45%', y: '5%', angle: 5},
  {src: FallImage4, x: '65%', y: '10%', angle: -10},
  {src: FallImage5, x: '85%', y: '5%', angle: 15},
  {src: FallImage6, x: '20%', y: '25%', angle: -5},
  {src: FallImage7, x: '40%', y: '30%', angle: 20},
  {src: FallImage8, x: '60%', y: '25%', angle: -20},
  {src: FallImage9, x: '80%', y: '30%', angle: 8},
  {src: FallImage10, x: '90%', y: '15%', angle: -12},
]

function FallingImage({src, x, y, angle = 0}: FallingImageProps) {
  return (
    <MatterBody matterBodyOptions={FALLING_CONFIG.matterBody} x={x} y={y} angle={angle}>
      <div className={`relative overflow-hidden rounded-2xl ${FALLING_CONFIG.imageSize}`}>
        <Image src={src} alt="Falling NFT" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
    </MatterBody>
  )
}

export default function HeroFall() {
  return (
    <Gravity data-block="hero-fall" gravity={{x: 0, y: 1}} className="absolute inset-0 size-full">
      {FALLING_IMAGES.map((props, index) => (
        <FallingImage key={index} {...props} />
      ))}
    </Gravity>
  )
}
