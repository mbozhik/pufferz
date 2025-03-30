import {cn} from '@/lib/utils'
import Link from 'next/link'
import {P, SPAN} from '~/UI/Typography'

const HEADER_LINKS = ['about', 'roadmap', 'collection', 'faq']

export default function Header() {
  return (
    <header className="fixed z-[99] inset-0 w-full px-20 pt-5">
      <div className={cn('px-4 pr-1.5 py-1.5 grid grid-cols-3 items-center', 'bg-background border border-gray/20 rounded-xl')}>
        <P offset={0} className="text-white">
          Pufferz
        </P>

        <nav className="flex items-center justify-center gap-6">
          {HEADER_LINKS.map((link) => (
            <Link key={link} href={`/#${link}`}>
              <SPAN offset={0} className="capitalize duration-300 hover:text-white">
                {link}
              </SPAN>
            </Link>
          ))}
        </nav>

        <button className={cn('justify-self-end', 'px-4 py-1.5 bg-foreground text-background rounded-lg', 'hover:bg-gray duration-300')}>Mint now</button>
      </div>
    </header>
  )
}
