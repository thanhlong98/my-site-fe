import { modals } from '@components/Modal'
import { useAuth } from '@hooks'
import { RootState, setModal } from '@store'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FooterLayout from './Footer'
import HeaderLayout from './Header'
import styles from './styles.module.scss'

type Props = {
  hasHeader?: boolean
  hasFooter?: boolean
}

export const MainLayout: React.FC<Props> = ({
  children,
  hasHeader = true,
  hasFooter = true,
}) => {
  const { me } = useAuth()
  const router = useRouter()
  const { modalName } = useSelector((state: RootState) => state.share)
  const dispatch = useDispatch()

  return (
    <>
      <div className={`${styles['container']}`}>
        {hasHeader && <HeaderLayout currentUser={me} />}
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
