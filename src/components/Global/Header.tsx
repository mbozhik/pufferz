import {WEBSITE_BOX} from '~/Global/Container'
import {cn} from '@/lib/utils'

import Link from 'next/link'
import {P, SPAN} from '~/UI/Typography'
import Button from '~/UI/Button'

const HEADER_LINKS = ['about', 'roadmap', 'collection', 'faq']

export default function Header() {
  return (
    <header className={cn('fixed z-[99] inset-0 w-full h-fit pt-5 sm:pt-2', WEBSITE_BOX)}>
      <div className={cn('px-4 pr-1.5 py-1.5 grid grid-cols-3 sm:grid-cols-2 items-center', 'bg-background/85 backdrop-blur-sm border border-foreground-blue/30 rounded-xl')}>
        <P offset={0} className="text-foreground-blue">
          Pufferz
        </P>

        <nav className="flex items-center justify-center gap-6 sm:hidden">
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
