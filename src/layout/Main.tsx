import { modals } from '@components/UI'
import { useAuth } from '@hooks'
import { RootState, setModal } from '@store'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FooterLayout from './Footer'
import HeaderLayout from './Header'

type Props = {
  hasHeader?: boolean
  hasFooter?: boolean
  mode?: 'light' | 'dark'
}

export const MainLayout: React.FC<Props> = ({
  children,
  hasHeader = true,
  hasFooter = true,
  mode = 'light',
}) => {
  const { me } = useAuth()
  const { modalName } = useSelector((state: RootState) => state.share)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        {hasHeader && <HeaderLayout currentUser={me} mode={mode} />}
        <main className="">{children}</main>
        {hasFooter && <FooterLayout />}
      </div>

      <div
        className={`modal-global ${modalName ? 'active' : ''}`}
        onClick={() => dispatch(setModal({ modalName: '' }))}
      >
        <div className="modal__container" onClick={(e) => e.stopPropagation()}>
          {modals[modalName]}
        </div>
      </div>
    </>
  )
}
