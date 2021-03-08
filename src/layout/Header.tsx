import { ModalsType } from '@constants'
import { setModal } from '@store'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'

type Props = {
  currentUser: any
}

type ModalAuth = ModalsType.LOGIN | ModalsType.REGISTER

const HeaderLayout: React.FC<Props> = ({ currentUser }) => {
  const dispatch = useDispatch()

  const handleClickAuth = (type: ModalAuth) => {
    dispatch(setModal({ modalName: type }))
  }

  return (
    <header>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link href="/">
            <a className={`navbar__logo__link`}>
              <Image src="/logo.png" alt="logo" width={120} height={41} />
            </a>
          </Link>
        </div>

        <ul className={`navbar__menus`}></ul>

        <div className={`navbar__info`}>
          {currentUser ? (
            <button className="navbar__info__btn">
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
          ) : (
            <Link href="/login">Đăng nhập</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default HeaderLayout
