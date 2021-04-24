import React from 'react'
import { LayoutHeader } from '../header'

export const MasterLayout: React.FC = ({ children }) => {
  return (
    <>
      <LayoutHeader />
      <main className="container mx-auto">{children}</main>
    </>
  )
}
