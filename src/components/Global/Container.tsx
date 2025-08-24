import {cn} from '@/lib/utils'

export const BOX = {
  container: 'w-[80%] xl:w-[85%] sm:w-auto mx-auto sm:mx-1.5',
  content: 'w-[45vw] xl:w-[55vw] sm:w-auto mx-auto sm:mx-1.5',
}

export const CONTAINER = {
  paddings: 'py-[35vh] xl:py-[35vh] sm:py-[25vh] sm:pb-[10vh]',
  spacing: 'space-y-[30vh] xl:space-y-[30vh] sm:space-y-[20vh]',
}

export const CONTENT = {
  offset: 'pt-40 xl:pt-36 sm:pt-32',
}

export default function Container({children, className}: {children: React.ReactNode; className?: string}) {
  return <main className={cn(BOX.container, CONTAINER.paddings, CONTAINER.spacing, className)}>{children}</main>
}
