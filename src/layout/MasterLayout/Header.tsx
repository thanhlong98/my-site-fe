import { ModalsType } from '@constants'
import { logout, setModal } from '@store'
import { Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  mode?: 'light' | 'dark'
  currentUser: any
}

type ModalAuth = ModalsType.LOGIN | ModalsType.REGISTER

const HeaderLayout: React.FC<Props> = ({ mode, currentUser }) => {
  const dispatch = useDispatch()
  const router = useRouter()

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

      {currentUser ? (
        <Button onClick={handleLogout}>Đăng xuất</Button>
      ) : (
        <>
          {!['/login', '/register'].includes(router.route) && (
            <Link href="/login">Đăng nhập</Link>
          )}
        </>
      )}
    </nav>
  )
}

export default HeaderLayout
