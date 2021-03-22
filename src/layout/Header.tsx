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
    <nav className="navbar">
      <div className="navbar__logo">
        <Link href="/">
          <a className={`navbar__logo__link`}>
            <img
              src={mode === 'light' ? '/omg-black.png' : '/omg-white.png'}
              alt="logo"
            />
          </a>
        </Link>
      </div>

      {!['/login', '/register'].includes(router.route) && (
        <>
          <Link href="/login">Đăng nhập</Link>
        </>
      )}
    </nav>
  )
}

export default HeaderLayout
