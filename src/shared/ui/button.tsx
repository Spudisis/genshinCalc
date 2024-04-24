import { ComponentProps, ElementType } from 'react'

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
export type ButtonPropsWithoutVariant<E extends ElementType> = Omit<ComponentProps<E>, 'component'> & {
  component?: E
}
type ButtonProps<E extends ElementType> = ButtonPropsWithoutVariant<E> & VariantProps<typeof Variants> & { isActive?: boolean }

export const Button = <E extends ElementType = 'button'>({
  children,
  component,
  isActive = false,
  className,
  color,
  bgColor,
  border,
  borderRadius,
  padding,
  ...rest
}: ButtonProps<E>) => {
  const TagName = component || 'button'
  return (
    <TagName
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
    </TagName>
  )
}
