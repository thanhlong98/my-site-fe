import React from 'react'
import { AuthLayout } from '@/layouts'

export const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="container mx-auto">
        <form>
          Email: <input />
          Password: <input />
        </form>
      </div>
    </AuthLayout>
  )
}
