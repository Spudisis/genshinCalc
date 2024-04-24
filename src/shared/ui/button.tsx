import { ComponentProps } from 'react'

import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const Variants = cva('', {
  variants: {
    color: {
      none: '',
      default: 'text-black hover:text-white dark:text-white'
    },
    border: {
      none: '',
      default: 'border border-black hover:border-gray dark:border-555555'
    },
    borderRadius: {
      none: '',
      default: 'rounded-lg'
    },
    padding: {
      none: '',
      default: 'px-3 py-1'
    },
    bgColor: {
      none: '',
      default: 'hover:bg-gray'
    }
  },
  defaultVariants: {
    color: 'default',
    bgColor: 'default',
    border: 'default',
    padding: 'default',
    borderRadius: 'default'
  }
})

type ButtonProps = ComponentProps<'button'> & { isActive?: boolean } & VariantProps<typeof Variants>

export const Button = ({ children, isActive = false, className, color, bgColor, border, borderRadius, padding, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        Variants({ border, borderRadius, bgColor, color, padding }),
        { 'border-grayDark bg-grayDark text-white': isActive },
        ' cursor-pointer transition',
        'focus:outline-none focus:ring focus:ring-grayLight',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
