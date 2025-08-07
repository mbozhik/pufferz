'use client'

import {useScrollColor, BACKGROUND} from '@/hooks/useScrollColor'
import {cn} from '@/lib/utils'

import Bubbles from '~/Global/Background/Bubbles'
import Wildlife from '~/Global/Background/Wildlife'

export default function Background() {
  // body -> background color
  useScrollColor({
    startColor: BACKGROUND.start,
    endColor: BACKGROUND.end,
    variableName: '--body-color',
  })

  return (
    <section data-section="background" className={cn('fixed inset-0', 'w-screen h-screen', 'overflow-hidden pointer-events-none')}>
      <Bubbles />
      <Wildlife />
    </section>
  )
}
