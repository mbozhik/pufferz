'use client'

import {BOX} from '~/Global/Container'

import {cn} from '@/lib/utils'
import {useScrollColor, BACKGROUND} from '@/hooks/useScrollColor'

import Link from 'next/link'
import {P, SPAN} from '~/UI/Typography'
import Button from '~/UI/Button'

const HEADER_LINKS = ['collection', 'manifesto', 'mint', 'faq', 'contact']

export default function Header() {
  useScrollColor({
    startColor: BACKGROUND.start,
    endColor: BACKGROUND.end,
    variableName: '--header-color',
    opacity: 0.7,
  })

  return (
    <header className={cn('fixed z-[99] inset-0 w-full h-fit pt-5 sm:pt-2', BOX.container)}>
      <div
        style={{
          backgroundColor: 'var(--header-color)',
        }}
        className={cn('px-4 pr-1.5 py-1.5', 'grid grid-cols-3 sm:grid-cols-2 items-center', 'backdrop-blur-sm border border-foreground-blue/30 rounded-xl')}
      >
        <P offset={0} className="text-foreground-blue">
          Pufferz
        </P>

        <nav className="flex items-center justify-center gap-6.5 sm:hidden">
          {HEADER_LINKS.map((link) => (
            <Link key={link} href={`/#${link}`}>
              <SPAN offset={0} className="font-medium capitalize duration-300 text-foreground-blue hover:text-foreground">
                {link}
              </SPAN>
            </Link>
          ))}
        </nav>

        <Button to="https://sui.io/" target="_blank" className="justify-self-end" text="Connect wallet" />
      </div>
    </header>
  )
}
