import { AuthLayout } from '@/layouts'
import React from 'react'

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <form>
        Email: <input />
        Password: <input />
      </form>
    </AuthLayout>
  )
}
