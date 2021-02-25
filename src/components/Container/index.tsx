import React from 'react'

type Props = {
  className?: string
}

const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`md:w-4/5 sm:w-full mx-auto px-2 ${className}`}>
      {children}
    </div>
  )
}

export default Container
