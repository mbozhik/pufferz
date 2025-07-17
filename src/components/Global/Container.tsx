import {cn} from '@/lib/utils'

export const WEBSITE_BOX = 'px-40 xl:px-32 sm:px-1.5'
export const WEBSITE_OFFSET = 'pt-40 xl:pt-32'

export default function Container({children, className}: {children: React.ReactNode; className?: string}) {
  return <main className={cn(WEBSITE_BOX, 'py-[35vh] xl:py-[35vh] sm:py-[25vh] sm:pb-[10vh]', 'space-y-[30vh] xl:space-y-[30vh] sm:space-y-[20vh]', className)}>{children}</main>
}
