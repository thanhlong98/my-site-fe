import React from 'react'

type Props = {
  className?: string
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return <div>{children}</div>
}
