import React, { forwardRef } from 'react'

const sizeClassnames = {
  large: 'px-4 py-3 text-sm rounded-lg',
  normal: 'px-2 py-3 text-sm rounded',
  small: 'px-2 py-1 text-sm rounded-sm'
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: keyof typeof sizeClassnames
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', size = 'normal', ...props }, ref) => {
    const cn = `w-full bg-gray-200 mt-2 border focus:border-blue-500
    focus:bg-white focus:outline-none ${sizeClassnames[size]} ${className} `

    return <input ref={ref} className={cn} data-testid="input" {...props} />
  }
)

Input.displayName = 'Input'
