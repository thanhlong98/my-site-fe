import { ModalsType } from '@constants'
import { logout, setModal } from '@store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  currentUser: any
  mode?: 'light' | 'dark'
}

type ModalAuth = ModalsType.LOGIN | ModalsType.REGISTER

const HeaderLayout: React.FC<Props> = ({ currentUser, mode }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleClickAuth = (type: ModalAuth) => {
    dispatch(setModal({ modalName: type }))
  }

  const handleLogout = () => {
    dispatch(logout({}))
    window.location.href = '/'
  }

  return (
    <header>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link href="/">
            <a className={`navbar__logo__link`}>
              <Image
                src={mode === 'light' ? '/logo-black.png' : '/logo.png'}
                alt="logo"
                width={120}
                height={41}
              />
            </a>
          </Link>
        </div>

        <ul className={`navbar__menus`}></ul>

        <div className={`navbar__info`}>
          {currentUser ? (
            <>
              <button
                className="navbar__info__btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              <div
                className={`navbar__info__dropdown ${
                  showUserMenu ? 'active' : ''
                }`}
              >
                <div className="navbar__info__dropdown__menu">
                  <a>Action 1</a>
                  <a>Action 2</a>
                  <a>Action 3</a>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              </div>
            </>
          ) : (
            <Link href="/login">Đăng nhập</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default HeaderLayout
