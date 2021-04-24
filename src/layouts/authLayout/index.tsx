import React from 'react'
import { LayoutHeader } from '../header'

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <>
      <LayoutHeader showAction={false} />
      <main className="container mx-auto">
        <p>Auth Layout</p>
        <div>{children}</div>
      </main>
    </>
  )
}
