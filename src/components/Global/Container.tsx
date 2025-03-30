import {cn} from '@/lib/utils'

export const WEBSITE_BOX = 'px-20 xl:px-14'
export const WEBSITE_OFFSET = 'pt-40 xl:pt-32'

export default function Container({children, className}: {children: React.ReactNode; className?: string}) {
  return <main className={cn(WEBSITE_BOX, className)}>{children}</main>
}
