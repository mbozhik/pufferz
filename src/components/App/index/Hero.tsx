import {WEBSITE_OFFSET} from '~/Global/Container'
import {cn} from '@/lib/utils'

import {H1, P} from '~/UI/Typography'
import HeroGallery from './HeroGallery'

export default function Hero() {
  const SCREEN_HEIGHT = 'h-screen !h-svh'

  return (
    <section data-section="hero-index" className={cn('flex flex-col overflow-hidden', SCREEN_HEIGHT, WEBSITE_OFFSET)}>
      <div className={cn('relative z-20 text-center', 'flex flex-col items-center gap-3.5 xl:gap-4')}>
        <H1 offset={0}>
          Pu<span className="tracking-[0em]">f</span>ferz Are Drifting <br className="sm:hidden" /> Into Your Wallet
        </H1>

        <P className="sm:text-gray" by="word">
          Exclusive NFT collection on SUI. <br className="hidden sm:inline-block" /> Dive in, discover, collect.
        </P>
      </div>

      <HeroGallery className="-mt-10 xl:-mt-12 sm:-mt-12" />
    </section>
  )
}
