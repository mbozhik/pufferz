import {cn} from '@/lib/utils'

import {H1, P} from '~/UI/Typography'
import HeroFall from '~~/index/HeroFall'

export default function Hero() {
  const SCREEN_HEIGHT = 'h-screen !h-svh'

  return (
    <section data-section="hero-index" className={cn('grid place-items-center p-10', SCREEN_HEIGHT)}>
      <div className={cn('relative flex size-full')}>
        <div className={cn('relative z-20', 'pt-20 size-full')}>
          <div className="flex flex-col items-center gap-3">
            <H1 className="text-center" offset={0}>
              Pu<span className="tracking-[0em]">f</span>ferz Are Falling <br /> Into Your Wallet
            </H1>

            <P by="word">Exclusive NFT collection on SUI. Dive in, discover, collect.</P>
          </div>
        </div>

        <div className={cn('absolute inset-0 w-full h-full', 'rounded-[30px] bg-gradient-to-b from-section/80 to-section')}></div>

        <HeroFall />
      </div>
    </section>
  )
}
