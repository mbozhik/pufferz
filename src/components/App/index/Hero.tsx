import {cn} from '@/lib/utils'

import {H1, P} from '~/UI/Typography'

export default function Hero() {
  const SCREEN_HEIGHT = 'h-screen !h-svh' // from-section/0 via-section/30 to-section

  return (
    <section data-section="hero-index" className={cn('grid place-items-center p-10', SCREEN_HEIGHT)}>
      <div className={cn('flex flex-col items-center', 'pt-20 size-full rounded-[30px]', 'bg-gradient-to-b from-section/80 to-section')}>
        <div className="flex flex-col items-center gap-3">
          <H1 className="text-center" offset={0}>
            Pu<span className="tracking-[0em]">f</span>ferz Are Falling <br /> Into Your Wallet
          </H1>

          <P by="word">Exclusive NFT collection on SUI. Dive in, discover, collect.</P>
        </div>
      </div>
    </section>
  )
}
