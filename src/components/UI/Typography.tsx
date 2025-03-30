'use client'

import React from 'react'
import type {HTMLAttributes} from 'react'
import {cn} from '@/lib/utils'
import {AnimatePresence, motion, Variants, HTMLMotionProps, useInView} from 'motion/react'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
  animated?: boolean
  by?: 'word' | 'line'
  offset?: number
} & (HTMLAttributes<HTMLHeadingElement> | HTMLAttributes<HTMLParagraphElement> | HTMLAttributes<HTMLSpanElement>)

export type TypoTypes = keyof typeof typoClasses

export const typoClasses = {
  h1: 'text-8xl xl:text-7xl sm:text-[56px] font-extrabold !leading-[1] sm:!leading-[1.1] tracking-[-0.03em]',
  p: 'text-2xl xl:text-xl !leading-[1.1] tracking-[-0.025em] text-neutral-400',
  span: 'text-lg xl:text-base !leading-[1.1] tracking-[-0.025em] text-neutral-400',
} as const

export const H1 = createTypography('h1')
export const P = createTypography('p')
export const SPAN = createTypography('span')

const variants = {
  item: {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: (duration: number) => ({
      opacity: 1,
      y: 0,
      transition: {duration},
    }),
  },
  container: {
    hidden: {opacity: 0},
    visible: (stagger: number) => ({
      opacity: 1,
      transition: {staggerChildren: stagger},
    }),
  },
} as const

const variantConfigs = {
  default: {
    item: {
      ...variants.item,
      visible: variants.item.visible(0.4),
    },
    container: {
      ...variants.container,
      visible: variants.container.visible(0.2),
    },
  },
  word: {
    item: {
      ...variants.item,
      visible: variants.item.visible(0.2),
    },
    container: {
      ...variants.container,
      visible: variants.container.visible(0.1),
    },
  },
} as const

const {
  default: {item: defaultVariants, container: containerVariants},
  word: {item: wordVariants, container: wordContainerVariants},
} = variantConfigs

type ElementType = HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement

type MotionElementType = {
  [K in TypoTypes]: (typeof motion)[K]
}[TypoTypes]

function Typography({type, className, children, animated = true, by = 'line', offset = 250, ...props}: Props) {
  const Element = type
  const ref = React.useRef<ElementType>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: `${-offset}px 0px`,
  })

  if (!animated) {
    return (
      <Element className={cn(typoClasses[type], className)} {...props}>
        {children}
      </Element>
    )
  }

  const MotionElement = motion[type] as MotionElementType

  if (by === 'word') {
    const processContent = (child: React.ReactNode): React.ReactNode[] => {
      if (typeof child === 'string') {
        return child.split(/(\s+)/).map((part) => part)
      }
      if (React.isValidElement(child)) {
        return [child]
      }
      return []
    }

    const content = React.Children.toArray(children).flatMap(processContent)

    return (
      <AnimatePresence mode="wait">
        <MotionElement
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={wordContainerVariants} // Use word-specific container variants
          className={cn(typoClasses[type], className)}
          {...(props as any)}
        >
          {content.map((segment, index) => {
            if (React.isValidElement(segment)) {
              return segment
            }
            return (
              <span key={`word-${index}`} className="inline-block overflow-hidden">
                <motion.span variants={wordVariants} className="block whitespace-pre">
                  {segment}
                </motion.span>
              </span>
            )
          })}
        </MotionElement>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <MotionElement
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'} // trigger when in view
        variants={containerVariants}
        className={cn(typoClasses[type], className)}
        {...(props as any)}
      >
        <span className="block overflow-hidden">
          <motion.span variants={defaultVariants} className="block">
            {children}
          </motion.span>
        </span>
      </MotionElement>
    </AnimatePresence>
  )
}

function createTypography(type: TypoTypes) {
  const Component = ({className, children, animated, by, offset, ...props}: Omit<Props, 'type'>) => (
    <Typography type={type} className={className} animated={animated} by={by} offset={offset} {...props}>
      {children}
    </Typography>
  )
  Component.displayName = `Typography(${type.toUpperCase()})`
  return Component
}
