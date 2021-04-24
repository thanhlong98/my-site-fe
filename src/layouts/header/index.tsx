import React from 'react'
import Link from 'next/link'

import styles from './Header.module.scss'

interface IProps {
  showAction?: boolean
}

export const LayoutHeader: React.FC<IProps> = ({ showAction = true }) => {
  return (
    <header className="sticky shadow-md">
      <div className={`${styles['contain']} container mx-auto flex justify-between py-2`}>
        <Link href="/">
          <img className="cursor-pointer" src="/svg/omg-black.svg" alt="logo" />
        </Link>

        {showAction && (
          <div>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  )
}
