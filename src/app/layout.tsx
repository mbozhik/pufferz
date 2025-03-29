export {metadata} from '@/lib/layout-config'
import {manrope} from '@/lib/layout-config'

import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>{children}</body>
    </html>
  )
}
