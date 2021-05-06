import Link from 'next/link'
import React from 'react'

interface IProps {
  showAction?: boolean
}

export const LayoutHeader: React.FC<IProps> = () => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full shadow-md bg-white">
      <div className="omg-layout-container py-2 h-[var(--header-height)] flex justify-between items-center">
        <Link href="/">
          <img src={`/svg/omg-black.svg`} alt="logo" />
        </Link>

        <nav className="">
          <ul>
            <li>
              <Link href="/interviews">Interview</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <Link href="/login">Login</Link> / <Link href="/register">Register</Link>
        </div>
      </div>
    </header>
  )
}
