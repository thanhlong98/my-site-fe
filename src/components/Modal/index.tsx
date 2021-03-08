import { ModalsType } from '@constants'
import React, { ReactChild } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

export const modals: { [key in ModalsType]: ReactChild } = {
  LOGIN: <LoginModal />,
  REGISTER: <RegisterModal />,
}
