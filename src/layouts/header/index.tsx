import Link from 'next/link'
import React from 'react'

interface IProps {
  showAction?: boolean
}

export const LayoutHeader: React.FC<IProps> = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <img src={`/svg/omg-black.svg`} alt="logo" />
        </Link>
      </div>
    </header>
  )
}
