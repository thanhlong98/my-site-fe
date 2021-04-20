import { ModalsType } from '@constants'
import { logout, RootState, setModal } from '@store'
import { Avatar, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  mode?: 'light' | 'dark'
  currentUser: any
}

type ModalAuth = ModalsType.LOGIN | ModalsType.REGISTER

const HeaderLayout: React.FC<Props> = ({ mode, currentUser }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  }

  const handleClickAuth = (type: ModalAuth) => {
    dispatch(setModal({ modalName: type }))
  }

  const UserMenu = (
    <Menu className="user-menu">
      <Menu.Item key="0">
        <Link href="/profile">
          <div className="user-menu__item user-menu__info">
            <div className="user-menu__info-left">
              <Avatar
                size="default"
                src={currentUser?.avatar}
                style={{ cursor: 'pointer' }}
              >
                {currentUser?.firstName.charAt(0).toUpperCase()}
              </Avatar>
            </div>
            <div className="user-menu__info-right">
              <p>{currentUser?.firstName + ' ' + currentUser?.lastName}</p>
              <p>{currentUser?.email}</p>
            </div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">Cài đặt</Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

  const MainMenu = () => (
    <Menu mode="horizontal" defaultSelectedKeys={[router.pathname]}>
      <Menu.Item>ABC</Menu.Item>
      <Menu.Item key="/profile">
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="/todos">
        <Link href="/todos">Todo</Link>
      </Menu.Item>
    </Menu>
  )

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

      {currentUser && <MainMenu />}

      {currentUser ? (
        <Dropdown
          overlay={UserMenu}
          placement="bottomLeft"
          trigger={['click']}
          arrow
        >
          <Avatar
            size="default"
            src={currentUser.avatar}
            style={{ cursor: 'pointer' }}
          >
            {currentUser?.firstName?.charAt(0).toUpperCase()}
          </Avatar>
        </Dropdown>
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
