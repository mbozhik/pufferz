'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import {PlusIcon} from 'lucide-react'

import {cn} from '@/lib/utils'

import {motion} from 'motion/react'

import {H2, P, SPAN} from '~/UI/Typography'
import {Accordion, AccordionContent, AccordionItem} from '~/Module/Accordion'

const PROBLEMS = {
  1: {
    title: 'What is Pufferz NFT?',
    content: 'Pufferz is a unique collection of 3,333 distinct puffer fish, meticulously crafted and living securely on the blockchain. We aim to build a vibrant digital underwater ecosystem for collectors.',
  },
  2: {
    title: 'How do I mint a Pufferz NFT?',
    content: 'Minting is straightforward: simply connect your compatible crypto wallet (e.g., MetaMask) to our site during the active minting phases, then click "Mint" and confirm the transaction. Ensure sufficient funds for both the NFT and gas fees.',
  },
  3: {
    title: 'What is the total supply and what are the mint phases?',
    content: 'The Pufferz collection has a limited total supply of 3,333 unique NFTs. Minting will occur in three phases: VIP, Whitelist, and Public. Specific dates and pricing for each will be announced on our official Twitter and Discord channels.',
  },
  4: {
    title: 'How many Pufferz can I mint per wallet?',
    content: 'Mint limits per wallet will be established for each phase (VIP, Whitelist, Public) to ensure fair distribution for all collectors. Full details will be shared closer to the mint date on our Discord.',
  },
  5: {
    title: 'What are the future plans for Pufferz?',
    content: 'Our vision includes fostering a strong community, exploring unique utility for Pufferz holders (e.g., exclusive access, staking), and potential contributions to ocean conservation. Our detailed roadmap can be found in the Manifesto section of our website.',
  },
}

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.4,
    },
  }),
}

export default function Faq() {
  return (
    <section id="faq" data-section="faq-index" className={cn('flex flex-col items-center', 'gap-6')}>
      <H2 className="text-center" offset={0}>
        Your Pufferz Guide
      </H2>

      <div className={cn('relative', 'w-[45vw] xl:w-[55vw] sm:w-auto')}>
        <Accordion type="single" collapsible className="p-2 w-full bg-background/30 backdrop-blur-sm rounded-xl border border-foreground-blue/30" defaultValue="1">
          {Object.values(PROBLEMS).map((problem, idx) => (
            <motion.div custom={idx} variants={fadeInAnimationVariants} initial="initial" whileInView="animate" viewport={{once: true}} key={idx}>
              <AccordionItem value={problem.title} className={cn('my-1 pl-3 pr-2 overflow-hidden rounded-lg border-none bg-background/40 shadow-sm transition-all', 'data-[state=open]:bg-card/80 data-[state=open]:shadow-md')}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className={cn('group flex flex-1 items-center justify-between gap-4 py-4 text-left', 'outline-none transition-all duration-300 hover:text-primary cursor-pointer', 'focus-visible:ring-2 focus-visible:ring-primary/50', 'data-[state=open]:text-primary')}>
                    <P>{problem.title}</P>

                    <PlusIcon size={18} className={cn('shrink-0 text-primary transition-transform duration-300 ease-out', 'group-data-[state=open]:rotate-45')} aria-hidden="true" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>

                <AccordionContent className={cn('overflow-hidden pb-4 pt-0 text-foreground', 'data-[state=open]:animate-accordion-down', 'data-[state=closed]:animate-accordion-up')}>
                  <div className="border-t border-border/30 pt-3">
                    <SPAN className="!leading-[1.4] sm:!leading-[1.5]">{problem.content}</SPAN>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <div className="absolute -left-4 -top-4 -z-10 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-4 -right-4 -z-10 size-72 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  )
}
