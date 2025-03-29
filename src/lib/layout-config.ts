import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'

export const metadata: Metadata = {
  title: 'Pufferz',
  description: 'Exclusive NFT collection on the SUI blockchain featuring unique digital pufferfish artwork. Discover, collect, and trade rare Pufferz NFTs.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export const manrope = Manrope({
  variable: '--font-manrope',
  preload: true,
  subsets: ['latin'],
})
