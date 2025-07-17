'use client'

import {useScrollColor, BACKGROUND} from '@/hooks/useScrollColor'

export default function Background() {
  useScrollColor({
    startColor: BACKGROUND.start,
    endColor: BACKGROUND.end,
    variableName: '--body-color',
  })

  return null
}
