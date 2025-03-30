import {cn} from '@/lib/utils'
import Link from 'next/link'

type Props = {
  text: string | undefined
  className?: string
  to?: string
  target?: '_blank' | '_self'
}

export const BUTTON_STYLES = cn('w-fit px-4 sm:px-3 py-1.5 cursor-pointer', 'text-base font-medium', 'bg-foreground text-background rounded-lg', 'hover:bg-gray duration-300')

export default function Button({text, className, to, target = '_self'}: Props) {
  if (to) {
    return (
      <Link href={to} className={cn(BUTTON_STYLES, className)} target={target}>
        {text}
      </Link>
    )
  }

  return <button className={cn(BUTTON_STYLES, className)}>{text}</button>
}
