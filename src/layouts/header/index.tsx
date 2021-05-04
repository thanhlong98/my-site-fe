import Link from 'next/link'
import React from 'react'
import styles from './header.module.scss'

interface IProps {
  showAction?: boolean
}

export const LayoutHeader: React.FC<IProps> = () => {
  return (
    <header className="">
      <div className="">
        <Link href="/">
          <img src={`/svg/omg-black.svg`} alt="logo" />
        </Link>
      </div>
    </header>
  )
}
