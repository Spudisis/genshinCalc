import { ComponentProps, forwardRef } from 'react'

import clsx from 'clsx'

type InputProps = ComponentProps<'input'> & { label: string; wFull?: boolean; error?: string }

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, wFull, error, ...rest }, ref) => {
  return (
    <div className='flex flex-col gap-0.5'>
      <label className='relative group '>
        <span className='text-black font-medium bg-white dark:bg-[#141414] group-hover:dark:text-white dark:text-white text-xs absolute -top-2 left-2'>
          {label}
        </span>
        <input
          ref={ref}
          {...rest}
          className={clsx(
            'text-sm text-black focus-visible:ring border border-black dark:border-555555 border-solid dark:bg-inherit rounded-md p-2 dark:text-white ',
            {
              'w-full': wFull
            }
          )}
        />
      </label>
      {error && <span className='text-red-700 dark:text-red-400 text-xs'>{error}</span>}
    </div>
  )
})
