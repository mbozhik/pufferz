'use client'

import {useScrollColor, BACKGROUND} from '@/hooks/useScrollColor'
import {cn} from '@/lib/utils'

import Bubbles from '~/Global/Background/Bubbles'

export default function Background() {
  // body -> background color
  useScrollColor({
    startColor: BACKGROUND.start,
    endColor: BACKGROUND.end,
    variableName: '--body-color',
  })

  return (
    <section data-section="background" className={cn('fixed inset-0 z-[999]', 'overflow-hidden pointer-events-none')}>
      <Bubbles />
    </section>
  )
}
