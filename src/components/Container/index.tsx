import React from 'react'

type Props = {
  className?: string
}

const Container: React.FC<Props> = ({ children, className }) => {
  return <div>{children}</div>
}

export default Container
