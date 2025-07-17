import {WEBSITE_OFFSET} from '~/Global/Container'

import {cn} from '@/lib/utils'

import {H2, P} from '~/UI/Typography'

export default function Collection() {
  return (
    <section id="collection" data-section="collection-index">
      <div className={cn('relative z-20 text-center', 'flex flex-col items-center gap-3.5 xl:gap-4 sm:gap-5')}>
        <H2 offset={0}>Pufferz Collection</H2>

        <P className="max-w-[50ch]">
          Our collection features <span className="text-foreground-blue">3,333</span> unique puffer fish, digital treasures living deep within the blockchain. Explore their world and claim yours.
        </P>
      </div>
    </section>
  )
}
