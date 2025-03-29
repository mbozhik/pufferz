import {cn} from '@/lib/utils'

export default function Hero() {
  const SCREEN_HEIGHT = 'h-screen !h-svh'

  return (
    <section data-section="hero-index" className={cn('grid place-items-center p-10', SCREEN_HEIGHT)}>
      <div className={cn('flex flex-col items-center', 'pt-20 size-full rounded-[30px]', 'bg-gradient-to-b from-section to-section/60')}>
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-[800] tracking-[-0.03em] text-8xl text-center !leading-[1]">
            Pu<span className="tracking-[0em]">f</span>ferz Are Falling <br /> Into Your Wallet
          </h1>

          <p className="text-2xl tracking-tight text-neutral-400">Exclusive NFT collection on SUI. Dive in, discover, collect.</p>
        </div>
      </div>
    </section>
  )
}
