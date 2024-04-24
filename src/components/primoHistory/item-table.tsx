import { ReactNode } from 'react'

import clsx from 'clsx'

export const ItemTable = ({ children, border = true }: { children: ReactNode; border?: boolean }) => {
  return (
    <div
      className={clsx('flex justify-center items-center  h-full dark:text-white', border && 'border-r border-black dark:border-555555 ')}
    >
      {children}
    </div>
  )
}
