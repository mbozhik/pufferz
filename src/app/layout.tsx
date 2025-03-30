export {metadata} from '@/lib/layout-config'
import {manrope} from '@/lib/layout-config'

import './globals.css'

import Header from '~/Global/Header'
import {Analytics as PostHog} from '~/Global/Analytics'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} relative antialiased`}>
        <Header />
        {children}

        {process.env.NODE_ENV === 'production' && <PostHog />}
      </body>
    </html>
  )
}
