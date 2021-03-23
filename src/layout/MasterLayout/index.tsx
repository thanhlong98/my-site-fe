import { modals } from '@components/UI'
import { useAuth } from '@hooks'
import { RootState, setModal } from '@store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FooterLayout from './Footer'
import HeaderLayout from './Header'
import './styles.less'

type Props = {
  hasHeader?: boolean
  hasFooter?: boolean
  mode?: 'light' | 'dark'
}

export const MasterLayout: React.FC<Props> = ({
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
      {hasHeader && <HeaderLayout mode={mode} currentUser={me} />}

      <main className="">{children}</main>

      {hasFooter && <FooterLayout />}

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
