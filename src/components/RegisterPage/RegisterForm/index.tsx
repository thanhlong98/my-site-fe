import { useMutation } from '@apollo/client'
import { LOGIN } from '@graphql/mutations'
import React, { useState } from 'react'

export const RegisterForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: 'long1@gmail.com',
    password: '123456',
  })
  const [loginLocal] = useMutation(LOGIN)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await loginLocal({
        variables: {
          ...userInfo,
        },
      })

      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form>
      <div>
        <label>Email</label>
        <input
          id="email"
          name="email"
          placeholder="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Đăng nhập
      </button>
    </form>
  )
}
