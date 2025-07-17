export {metadata} from '@/lib/layout-config'
import {manrope} from '@/lib/layout-config'

import './globals.css'

import Header from '~/Global/Header'
import Footer from '~/Global/Footer'
import Background from '~/Global/Background'

import {Analytics as YandexMetrika} from '~/Global/Analytics'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} relative text-foreground font-sans antialiased`}>
        <Header />
        {children}
        <Footer />

        <Background />

        {process.env.NODE_ENV === 'production' && <YandexMetrika />}
      </body>
    </html>
  )
}
