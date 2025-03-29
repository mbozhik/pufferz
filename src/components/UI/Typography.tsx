import type {HTMLAttributes} from 'react'
import {cn} from '@/lib/utils'

type Props = HTMLAttributes<HTMLHeadingElement> & {
  type: TypoTypes
  className?: string
  children: React.ReactNode
}

export type TypoTypes = keyof typeof typoClasses

export const typoClasses = {
  h1: 'text-8xl font-extrabold !leading-[1] tracking-[-0.03em]',
  p: 'text-2xl tracking-[-0.025em] text-neutral-400',
} as const

function Typography({type, className, children, ...props}: Props) {
  const Element = type
  return (
    <Element className={cn(typoClasses[type], className)} {...props}>
      {children}
    </Element>
  )
}

function createTypography(type: TypoTypes) {
  const Component = ({className, children, ...props}: Omit<Props, 'type'>) => (
    <Typography type={type} className={className} {...props}>
      {children}
    </Typography>
  )
  Component.displayName = `Typography(${type.toUpperCase()})`
  return Component
}

export const H1 = createTypography('h1')
export const P = createTypography('p')
