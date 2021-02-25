import React from 'react'
import Link from 'next/link'
import { useAuth } from 'src/hooks'
import nookies from 'nookies'
import { ACCESS_TOKEN_NAME } from '@constants'
import { useRouter } from 'next/router'
import Container from '@components/Container'
import styles from './mainLayout.module.scss'

export const MainLayout: React.FC = ({ children }) => {
  const { me } = useAuth()
  const router = useRouter()

  return (
    <>
      <nav className={`${styles.navbar} w-full shadow`}>
        <Container className={`${styles.container} flex justify-between`}>
          <div className="navbar-logo">Coder</div>
          <ul className="navbar-menus flex flex-row">
            <li>
              <Link href="/">Home</Link>
            </li>
            {me ? (
              <>
                <li>
                  <Link href="/profile">Profile</Link>
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
          <div className="navbar-info">auth</div>
        </Container>
      </nav>
      <main>{children}</main>
      <footer>
        <Container>Đây là footer</Container>
      </footer>
    </>
  )
}
