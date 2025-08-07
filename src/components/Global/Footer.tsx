import XIcon from '$/icons/x.svg'
import DiscordIcon from '$/icons/discord.svg'

import {BOX} from '~/Global/Container'

import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {SPAN} from '~/UI/Typography'

const SOCIALS = {
  x: {
    link: 'https://x.com/pufferz',
    icon: XIcon,
  },
  discord: {
    link: 'https://discord.gg/pufferz',
    icon: DiscordIcon,
  },
}

export default function Footer() {
  return (
    <footer className={cn(BOX.content, 'sm:mx-4', 'relative z-20', 'pb-6 xl:pb-4', 'flex items-center justify-between')}>
      <SPAN className="!leading-[1.3] text-foreground-blue/50" offset={0}>
        © 2025 Pufferz <span className="sm:hidden">– All Rights Reserved.</span>
      </SPAN>

      <div className="flex gap-3 sm:gap-3.5">
        {Object.values(SOCIALS).map((social) => (
          <Link href={social.link} target="_blank" rel="noopener noreferrer" key={social.link}>
            <Image quality={100} className={cn('size-7 sm:size-6.5 object-contain', 'hover:opacity-80 hover:scale-[1.07] duration-300')} src={social.icon} alt={`${social.link} pufferz socials`} />
          </Link>
        ))}
      </div>
    </footer>
  )
}
