import {WEBSITE_OFFSET} from '~/Global/Container'

import {cn} from '@/lib/utils'

import {H1, P} from '~/UI/Typography'
import HeroGallery from '~~/index/HeroGallery'

export default function Hero() {
  const SCREEN_HEIGHT = 'h-screen !h-svh'

  return (
    <section data-section="hero-index" className={cn('flex flex-col overflow-hidden', SCREEN_HEIGHT, WEBSITE_OFFSET)}>
      <div className={cn('flex flex-col items-center', 'gap-3.5 xl:gap-4 sm:gap-5', 'text-center')}>
        <H1 className="sm:hidden" offset={0}>
          Pu<span className="tracking-[0em]">f</span>ferz Are Flowing <br className="sm:hidden" /> Into Your Wallet
        </H1>

        <H1 className="hidden sm:inline" offset={0}>
          Pufferz Are Flowing Into Wallets
        </H1>

        <P by="word">
          Exclusive NFT collection on SUI. <br className="hidden sm:inline-block" /> Dive in, discover, collect.
        </P>
      </div>

      <HeroGallery className="-mt-10 xl:-mt-12 sm:-mt-4" />
    </section>
  )
}
