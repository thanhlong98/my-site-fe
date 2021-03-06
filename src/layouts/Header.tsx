import Container from '@components/Container'
import { ACCESS_TOKEN_NAME } from '@constants'
import Link from 'next/link'
import React from 'react'
import styles from './mainLayout.module.scss'
import nookies from 'nookies'

type Props = {
  currentUser: any
}

const HeaderLayout: React.FC<Props> = ({ currentUser }) => {
  return (
    <nav className={`${styles.navbar}`}>
      <Container className={`${styles.container} flex justify-between`}>
        <div className="navbar-logo">Coder</div>

        <ul className="navbar-menus">
          <li>
            <Link href="/">Home</Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    nookies.destroy(null, ACCESS_TOKEN_NAME)
                    window.location.href = '/'
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-info">
          Hello World
        </div>
      </Container>
    </nav>
  )
}

export default HeaderLayout
