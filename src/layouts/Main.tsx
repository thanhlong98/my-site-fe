import { useAuth } from '@hooks'
import { useRouter } from 'next/router'
import React from 'react'
import FooterLayout from './Footer'
import HeaderLayout from './Header'

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

  return (
    <>
      {hasHeader && <HeaderLayout currentUser={me} />}
      <main>{children}</main>
      {hasFooter && <FooterLayout />}
    </>
  )
}
